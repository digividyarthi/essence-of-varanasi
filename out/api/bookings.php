<?php
/**
 * api/bookings.php — Capture hotel room booking submissions from public web forms
 *
 * Method: POST
 * Body: JSON or Form URL-encoded { guest_name, email, phone, check_in?, check_out?, room_type?, guests?, special_requests?, _gotcha?, source_page? }
 *
 * Responses:
 *   200 { "ok": true, "id": <id>, "message": "Reservation request received." }
 *   200 { "ok": true, "id": null }         ← Honeypot triggered
 *   422 { "ok": false, "errors": { field: msg, ... } }
 *   429 { "ok": false, "error": "Too many submissions. Please try again later." }
 *   405 { "ok": false, "error": "POST only" }
 */

declare(strict_types=1);

require_once __DIR__ . '/../admin/_db.php';
require_once __DIR__ . '/../admin/_helpers.php';
require_once __DIR__ . '/../admin/_mail.php';

// Method check
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    http_response_code(405);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['ok' => false, 'error' => 'POST method required']);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Input parsing (JSON fallback to $_POST)
$rawInput = file_get_contents('php://input') ?: '';
$data = json_decode($rawInput, true);
if (!is_array($data)) {
    $data = $_POST;
}

// 1. Honeypot check
$honeypot = trim((string)($data['_gotcha'] ?? ''));
if ($honeypot !== '') {
    echo json_encode(['ok' => true, 'id' => null, 'message' => 'Reservation received.']);
    exit;
}

// 2. IP Rate Limit: 10 per hour per IP
$ip = client_ip();
try {
    $stmt = db()->prepare(
        'SELECT COUNT(*) FROM bookings WHERE ip_address = :ip AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)'
    );
    $stmt->execute([':ip' => substr($ip, 0, 45)]);
    $count = (int)$stmt->fetchColumn();
} catch (Throwable $e) {
    $count = 0;
}

if ($count >= 10) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'Too many reservation requests. Please try again in an hour or contact us directly by phone.']);
    exit;
}

// 3. Extract & Validate Fields
$guestName       = trim((string)($data['guest_name'] ?? $data['name'] ?? ''));
$email           = trim((string)($data['email'] ?? ''));
$phone           = trim((string)($data['phone'] ?? ''));
$checkIn         = trim((string)($data['check_in'] ?? ''));
$checkOut        = trim((string)($data['check_out'] ?? ''));
$roomType        = trim((string)($data['room_type'] ?? 'Standard Room'));
$guests          = (int)($data['guests'] ?? 1);
$specialRequests = trim((string)($data['special_requests'] ?? $data['message'] ?? ''));
$source          = trim((string)($data['source_page'] ?? $data['source'] ?? ''));

if ($roomType === '') {
    $roomType = 'Standard Room';
}
$roomType = substr($roomType, 0, 120);

if ($source === '') {
    $ref = $_SERVER['HTTP_REFERER'] ?? '';
    if ($ref) {
        $path = parse_url($ref, PHP_URL_PATH) ?: '';
        if (is_string($path) && $path !== '') {
            $source = $path;
        }
    }
}
$source = substr($source, 0, 120);

$errors = [];

if ($guestName === '' || mb_strlen($guestName) > 120) {
    $errors['guest_name'] = 'Please enter your full name.';
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 190) {
    $errors['email'] = 'Please enter a valid email address.';
}
if ($phone === '' || strlen($phone) < 7 || strlen($phone) > 40) {
    $errors['phone'] = 'Please enter a valid phone number.';
}
if ($checkIn !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $checkIn)) {
    $errors['check_in'] = 'Please select a valid check-in date (YYYY-MM-DD).';
}
if ($checkOut !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $checkOut)) {
    $errors['check_out'] = 'Please select a valid check-out date (YYYY-MM-DD).';
}
if ($checkIn !== '' && $checkOut !== '' && strtotime($checkOut) <= strtotime($checkIn)) {
    $errors['check_out'] = 'Check-out date must be after check-in date.';
}
if ($guests < 1 || $guests > 50) {
    $errors['guests'] = 'Please specify a valid number of guests.';
}
if (mb_strlen($specialRequests) > 2000) {
    $errors['special_requests'] = 'Special requests message is too long (max 2000 characters).';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'errors' => $errors]);
    exit;
}

// 4. Save to DB
try {
    $stmt = db()->prepare(
        'INSERT INTO bookings (guest_name, email, phone, check_in, check_out, room_type, guests, special_requests, source_page, user_agent, ip_address)
         VALUES (:name, :email, :phone, :cin, :cout, :room, :guests, :req, :source, :ua, :ip)'
    );

    $stmt->execute([
        ':name'   => $guestName,
        ':email'  => $email,
        ':phone'  => $phone,
        ':cin'    => $checkIn !== '' ? $checkIn : null,
        ':cout'   => $checkOut !== '' ? $checkOut : null,
        ':room'   => $roomType,
        ':guests' => $guests,
        ':req'    => $specialRequests !== '' ? $specialRequests : null,
        ':source' => $source !== '' ? $source : '/',
        ':ua'     => substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255),
        ':ip'     => substr($ip, 0, 45),
    ]);

    $id = (int)db()->lastInsertId();

    // 5. Send notification email to admin
    try {
        notify_new_booking([
            'id'               => $id,
            'guest_name'       => $guestName,
            'email'            => $email,
            'phone'            => $phone,
            'check_in'         => $checkIn,
            'check_out'        => $checkOut,
            'room_type'        => $roomType,
            'guests'           => $guests,
            'special_requests' => $specialRequests,
            'source_page'      => $source,
        ]);
    } catch (Throwable $eMail) {
        error_log('Booking notification email failed: ' . $eMail->getMessage());
    }

    echo json_encode([
        'ok'      => true,
        'id'      => $id,
        'message' => 'Thank you! Your room reservation request has been received. Our team will contact you shortly.',
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'ok'    => false,
        'error' => 'Unable to process your reservation at this moment. Please try again or call us directly.',
    ]);
}
