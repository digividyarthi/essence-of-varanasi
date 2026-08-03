<?php
/**
 * api/bookings.php — Capture tour & experience booking inquiries from public web forms
 *
 * Method: POST
 * Body: JSON or Form URL-encoded { guest_name, email, phone, check_in?, check_out?, room_type?, guests?, pickup_location?, special_requests?, _gotcha?, source_page? }
 *
 * Responses:
 *   200 { "ok": true, "id": <id>, "message": "Tour inquiry received." }
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
    echo json_encode(['ok' => true, 'id' => null, 'message' => 'Tour inquiry received.']);
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
    echo json_encode(['ok' => false, 'error' => 'Too many booking inquiries. Please try again in an hour or contact us directly via WhatsApp/Phone.']);
    exit;
}

// 3. Extract & Validate Fields (flexible for tour inquiries)
$guestName       = trim((string)($data['guest_name'] ?? $data['full_name'] ?? $data['name'] ?? ''));
$email           = trim((string)($data['email'] ?? ''));
$phone           = trim((string)($data['phone'] ?? ''));
$checkIn         = trim((string)($data['check_in'] ?? $data['travel_date'] ?? $data['date'] ?? $data['start_date'] ?? ''));
$checkOut        = trim((string)($data['check_out'] ?? $data['end_date'] ?? ''));
$tourName        = trim((string)($data['room_type'] ?? $data['tour_name'] ?? $data['service_type'] ?? $data['tour'] ?? 'General Inquiry'));
$guests          = (int)($data['guests'] ?? $data['travelers'] ?? $data['persons'] ?? 1);
$pickupLocation  = trim((string)($data['pickup_location'] ?? $data['hotel'] ?? ''));
$specialRequests = trim((string)($data['special_requests'] ?? $data['message'] ?? $data['requirements'] ?? ''));
$source          = trim((string)($data['source_page'] ?? $data['source'] ?? ''));

if ($tourName === '') {
    $tourName = 'General Inquiry';
}
$tourName = substr($tourName, 0, 120);

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
    if (strtotime($checkIn) === false) {
        $errors['check_in'] = 'Please select a valid travel date (YYYY-MM-DD).';
    } else {
        $checkIn = date('Y-m-d', strtotime($checkIn));
    }
}
if ($checkOut !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $checkOut)) {
    if (strtotime($checkOut) !== false) {
        $checkOut = date('Y-m-d', strtotime($checkOut));
    } else {
        $errors['check_out'] = 'Please select a valid end date (YYYY-MM-DD).';
    }
}
if ($guests < 1 || $guests > 100) {
    $errors['guests'] = 'Please specify a valid number of travelers.';
}
if (mb_strlen($specialRequests) > 2000) {
    $errors['special_requests'] = 'Message is too long (max 2000 characters).';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'errors' => $errors]);
    exit;
}

// 4. Save to DB
try {
    $stmt = db()->prepare(
        'INSERT INTO bookings (guest_name, email, phone, check_in, check_out, room_type, guests, pickup_location, special_requests, source_page, user_agent, ip_address)
         VALUES (:name, :email, :phone, :cin, :cout, :room, :guests, :pickup, :req, :source, :ua, :ip)'
    );

    $stmt->execute([
        ':name'   => $guestName,
        ':email'  => $email,
        ':phone'  => $phone,
        ':cin'    => $checkIn !== '' ? $checkIn : null,
        ':cout'   => $checkOut !== '' ? $checkOut : null,
        ':room'   => $tourName,
        ':guests' => $guests,
        ':pickup' => $pickupLocation !== '' ? substr($pickupLocation, 0, 255) : null,
        ':req'    => $specialRequests !== '' ? $specialRequests : null,
        ':source' => $source !== '' ? $source : '/',
        ':ua'     => substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 255),
        ':ip'     => substr($ip, 0, 45),
    ]);

    $id = (int)db()->lastInsertId();

    // 5. Send notification email to tour admin
    try {
        notify_new_booking([
            'id'               => $id,
            'guest_name'       => $guestName,
            'email'            => $email,
            'phone'            => $phone,
            'check_in'         => $checkIn,
            'check_out'        => $checkOut,
            'room_type'        => $tourName,
            'guests'           => $guests,
            'pickup_location'  => $pickupLocation,
            'special_requests' => $specialRequests,
            'source_page'      => $source,
        ]);
    } catch (Throwable $eMail) {
        error_log('Tour booking notification email failed: ' . $eMail->getMessage());
    }

    echo json_encode([
        'ok'      => true,
        'id'      => $id,
        'message' => 'Thank you! Your tour inquiry has been received. Our travel specialist will contact you shortly via WhatsApp/Phone.',
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'ok'    => false,
        'error' => 'Unable to process your tour inquiry at this moment. Please contact us directly on WhatsApp or call.',
    ]);
}
