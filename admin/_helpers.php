<?php
/**
 * admin/_helpers.php — Utility functions for Essence of Varanasi Tour CRM
 */

declare(strict_types=1);

require_once __DIR__ . '/_db.php';

/** HTML Escaping helper */
function e(?string $str): string {
    return htmlspecialchars($str ?? '', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Format Date Time for display */
function fmt_dt(?string $dtStr): string {
    if (!$dtStr) return '—';
    $time = strtotime($dtStr);
    if ($time === false) return $dtStr;
    return date('d M Y, h:i A', $time);
}

/** Format Date only (e.g. Travel Date) */
function fmt_date(?string $dStr): string {
    if (!$dStr) return '—';
    $time = strtotime($dStr);
    if ($time === false) return $dStr;
    return date('d M Y', $time);
}

/** Format Status Label */
function fmt_status(string $st): string {
    $map = [
        'new'        => 'New Inquiry',
        'contacted'  => 'Contacted',
        'quote_sent' => 'Quote Sent',
        'confirmed'  => 'Confirmed Tour',
        'completed'  => 'Completed',
        'cancelled'  => 'Cancelled',
        'archived'   => 'Archived',
    ];
    return $map[$st] ?? ucfirst($st);
}

/** Get client IP address accurately */
function client_ip(): string {
    $keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    foreach ($keys as $k) {
        if (!empty($_SERVER[$k])) {
            $ip = trim(explode(',', $_SERVER[$k])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

/** Flash Messages handler */
function flash_set(string $type, string $msg): void {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        @session_start();
    }
    $_SESSION['flash'][$type] = $msg;
}

function flash_get(): array {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        @session_start();
    }
    $flashes = $_SESSION['flash'] ?? [];
    unset($_SESSION['flash']);
    return $flashes;
}

/** Redirect helper */
function redirect(string $url): void {
    header('Location: ' . $url);
    exit;
}

/** Calculate duration of trip in days */
function calculate_days(?string $checkIn, ?string $checkOut): int {
    if (!$checkIn || !$checkOut) return 1;
    $tIn = strtotime($checkIn);
    $tOut = strtotime($checkOut);
    if ($tIn === false || $tOut === false || $tOut < $tIn) return 1;
    $diff = (int)round(($tOut - $tIn) / 86400);
    return max(1, $diff + 1);
}
