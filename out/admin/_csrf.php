<?php
/**
 * admin/_csrf.php — CSRF token helper functions
 */

declare(strict_types=1);

function csrf_token(): string {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        @session_start();
    }
    if (empty($_SESSION['_csrf_token'])) {
        $_SESSION['_csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['_csrf_token'];
}

function csrf_field(): string {
    $tok = csrf_token();
    return '<input type="hidden" name="_csrf" value="' . htmlspecialchars($tok, ENT_QUOTES, 'UTF-8') . '">';
}

function csrf_verify(): void {
    if (session_status() !== PHP_SESSION_ACTIVE) {
        @session_start();
    }
    $submitted = $_POST['_csrf'] ?? $_GET['_csrf'] ?? '';
    $stored    = $_SESSION['_csrf_token'] ?? '';
    if ($submitted === '' || $stored === '' || !hash_equals($stored, $submitted)) {
        http_response_code(403);
        exit('CSRF token validation failed.');
    }
}
