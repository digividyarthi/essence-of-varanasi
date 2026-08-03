<?php
/**
 * admin/_auth.php — Session authentication & rate limiting for Hotel CRM
 */

declare(strict_types=1);

require_once __DIR__ . '/_db.php';
require_once __DIR__ . '/_helpers.php';

function session_start_session(): void {
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    ini_set('session.use_only_cookies', '1');
    ini_set('session.use_strict_mode', '1');
    
    $isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ($_SERVER['SERVER_PORT'] ?? 80) == 443;
    session_set_cookie_params([
        'lifetime' => 28800, // 8 hours
        'path'     => '/',
        'domain'   => '',
        'secure'   => $isHttps,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function current_user(): ?array {
    session_start_session();
    if (empty($_SESSION['user_id'])) {
        return null;
    }
    static $cached = null;
    if ($cached !== null) return $cached;

    try {
        $stmt = db()->prepare('SELECT id, username, role, display_name FROM users WHERE id = :id LIMIT 1');
        $stmt->execute([':id' => $_SESSION['user_id']]);
        $u = $stmt->fetch();
        if ($u) {
            $cached = $u;
            return $u;
        }
    } catch (Throwable $e) {
        // Fallback
    }
    return null;
}

function require_login(): void {
    $u = current_user();
    if (!$u) {
        flash_set('error', 'Please log in to access the admin dashboard.');
        redirect('/admin/login.php');
    }
}

/** Check bruteforce attempts for username & IP */
function check_login_throttle(string $username): bool {
    $ip = client_ip();
    try {
        $stmt = db()->prepare(
            'SELECT COUNT(*) FROM login_attempts 
             WHERE (username = :u OR ip_address = :ip) 
               AND success = 0 
               AND attempted_at > DATE_SUB(NOW(), INTERVAL 10 MINUTE)'
        );
        $stmt->execute([':u' => $username, ':ip' => $ip]);
        $fails = (int)$stmt->fetchColumn();
        return $fails < 5; // allow up to 5 failed attempts in 10 minutes
    } catch (Throwable $e) {
        return true;
    }
}

/** Record login attempt */
function record_login_attempt(string $username, bool $success): void {
    $ip = client_ip();
    try {
        $stmt = db()->prepare(
            'INSERT INTO login_attempts (username, attempted_at, ip_address, success) VALUES (:u, NOW(), :ip, :s)'
        );
        $stmt->execute([':u' => $username, ':ip' => $ip, ':s' => $success ? 1 : 0]);
    } catch (Throwable $e) {
        // Log silently
    }
}
