<?php
/**
 * admin/logout.php — Destroy session and log out
 */

declare(strict_types=1);

require_once __DIR__ . '/_auth.php';

session_start_session();
$_SESSION = [];

if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params['path'], $params['domain'],
        $params['secure'], $params['httponly']
    );
}

session_destroy();
redirect('/admin/login.php');
