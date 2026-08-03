<?php
/**
 * admin/_db.php — Single PDO connection manager for Hotel CRM
 *
 * Resolves DB credentials from:
 *   1. /home/u.../private/db.php (outside web root)
 *   2. __DIR__/../../../private/db.php (relative private directory)
 *   3. Environment variables (DB_HOST, DB_NAME, DB_USER, DB_PASS)
 */

declare(strict_types=1);

// Prevent direct web access
if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === '_db.php') {
    http_response_code(403);
    exit('Forbidden');
}

/** @return PDO */
function db(): PDO {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $candidates = [
        '/home/u138607075/private/db.php',
        __DIR__ . '/../../../private/db.php',
        __DIR__ . '/../../private/db.php',
    ];
    foreach ($candidates as $cfg) {
        if (is_file($cfg)) {
            require_once $cfg;
            break;
        }
    }

    $host = defined('DB_HOST') ? DB_HOST : (getenv('DB_HOST') ?: 'localhost');
    $name = defined('DB_NAME') ? DB_NAME : (getenv('DB_NAME') ?: 'u138607075_CRM');
    $user = defined('DB_USER') ? DB_USER : (getenv('DB_USER') ?: 'u138607075_CRM');
    $pass = defined('DB_PASS') ? DB_PASS : (getenv('DB_PASS') ?: 'Essenceofvaranasi@1234');

    if (!defined('MAIL_TO'))   define('MAIL_TO',   getenv('MAIL_TO')   ?: 'info@essenceofvaranasi.com');
    if (!defined('MAIL_FROM')) define('MAIL_FROM', getenv('MAIL_FROM') ?: 'no-reply@essenceofvaranasi.com');

    if ($name === '' || $user === '') {
        throw new RuntimeException(
            'Database not configured. Create private/db.php with DB_HOST, DB_NAME, DB_USER, DB_PASS constants.'
        );
    }

    $dsn = "mysql:host={$host};dbname={$name};charset=utf8mb4";
    try {
        $pdo = new PDO($dsn, $user, $pass, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
        return $pdo;
    } catch (Throwable $e1) {
        if ($user !== strtolower($user)) {
            try {
                $pdo = new PDO("mysql:host={$host};dbname={$name};charset=utf8mb4", strtolower($user), $pass, [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]);
                return $pdo;
            } catch (Throwable $e2) {}
        }
        throw $e1;
    }
}
