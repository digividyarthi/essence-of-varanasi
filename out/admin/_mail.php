<?php
/**
 * admin/_mail.php — Dispatch email notification for new hotel booking
 */

declare(strict_types=1);

require_once __DIR__ . '/_db.php';
require_once __DIR__ . '/_helpers.php';

function notify_new_booking(array $booking): bool {
    $to = MAIL_TO;
    $from = MAIL_FROM;
    
    if (empty($to) || $to === 'reservations@hotel.com') {
        return false; // Skip if default mock mail
    }

    $subject = "🏨 New Room Booking #" . $booking['id'] . " - " . ($booking['guest_name'] ?? 'Guest');
    
    $checkIn = fmt_date($booking['check_in'] ?? '');
    $checkOut = fmt_date($booking['check_out'] ?? '');
    $nights = calculate_nights($booking['check_in'] ?? '', $booking['check_out'] ?? '');
    
    $body = "A new room reservation request was submitted on the hotel website.\n\n";
    $body .= "--------------------------------------------------------\n";
    $body .= "Booking ID : #" . $booking['id'] . "\n";
    $body .= "Guest Name : " . ($booking['guest_name'] ?? '') . "\n";
    $body .= "Email      : " . ($booking['email'] ?? '') . "\n";
    $body .= "Phone      : " . ($booking['phone'] ?? '') . "\n";
    $body .= "--------------------------------------------------------\n";
    $body .= "Room Type  : " . ($booking['room_type'] ?? 'Standard Room') . "\n";
    $body .= "Check-in   : " . $checkIn . "\n";
    $body .= "Check-out  : " . $checkOut . " (" . $nights . " Night" . ($nights === 1 ? '' : 's') . ")\n";
    $body .= "Guests     : " . ($booking['guests'] ?? 1) . "\n";
    $body .= "Special Req: " . ($booking['special_requests'] ?: 'None') . "\n";
    $body .= "Source Page: " . ($booking['source_page'] ?? '/') . "\n";
    $body .= "Submitted  : " . date('Y-m-d H:i:s') . "\n";
    $body .= "--------------------------------------------------------\n\n";
    $body .= "Log in to the Admin CRM to manage this booking:\n";
    $body .= ($_SERVER['HTTP_HOST'] ?? 'localhost') . "/admin/bookings-view.php?id=" . $booking['id'] . "\n";

    $headers = [
        'From: Hotel Reservations <' . $from . '>',
        'Reply-To: ' . ($booking['email'] ?? $from),
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=utf-8',
    ];

    return @mail($to, $subject, $body, implode("\r\n", $headers));
}
