<?php
/**
 * admin/_mail.php — Dispatch email notification for new tour inquiry
 */

declare(strict_types=1);

require_once __DIR__ . '/_db.php';
require_once __DIR__ . '/_helpers.php';

function notify_new_booking(array $booking): bool {
    $to = MAIL_TO;
    $from = MAIL_FROM;
    
    if (empty($to) || $to === 'reservations@hotel.com') {
        return false;
    }

    $tourName = $booking['room_type'] ?? 'General Tour Inquiry';
    $subject = "🧳 New Tour Inquiry #" . $booking['id'] . " - " . ($booking['guest_name'] ?? 'Traveler') . " (" . $tourName . ")";
    
    $travelDate = fmt_date($booking['check_in'] ?? '');
    $endDate = fmt_date($booking['check_out'] ?? '');
    
    $body = "A new tour booking inquiry was submitted on Essence of Varanasi website.\n\n";
    $body .= "--------------------------------------------------------\n";
    $body .= "Inquiry ID    : #" . $booking['id'] . "\n";
    $body .= "Traveler Name : " . ($booking['guest_name'] ?? '') . "\n";
    $body .= "Email         : " . ($booking['email'] ?? '') . "\n";
    $body .= "Phone         : " . ($booking['phone'] ?? '') . "\n";
    $body .= "--------------------------------------------------------\n";
    $body .= "Selected Tour : " . $tourName . "\n";
    $body .= "Travel Date   : " . $travelDate . ($endDate !== '—' ? (" to " . $endDate) : '') . "\n";
    $body .= "Travelers     : " . ($booking['guests'] ?? 1) . " Person(s)\n";
    $body .= "Pickup Hotel  : " . ($booking['pickup_location'] ?: 'Not specified') . "\n";
    $body .= "Message / Req : " . ($booking['special_requests'] ?: 'None') . "\n";
    $body .= "Source Page   : " . ($booking['source_page'] ?? '/') . "\n";
    $body .= "Submitted     : " . date('Y-m-d H:i:s') . "\n";
    $body .= "--------------------------------------------------------\n\n";
    $body .= "Log in to Essence Tour CRM to manage & send quote:\n";
    $body .= ($_SERVER['HTTP_HOST'] ?? 'localhost') . "/admin/bookings-view.php?id=" . $booking['id'] . "\n";

    $headers = [
        'From: Essence of Varanasi CRM <' . $from . '>',
        'Reply-To: ' . ($booking['email'] ?? $from),
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=utf-8',
    ];

    return @mail($to, $subject, $body, implode("\r\n", $headers));
}
