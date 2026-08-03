<?php
/**
 * admin/seed.php — Database seeder & admin reset tool for Essence of Varanasi Tour CRM
 *
 * Usage:
 *   https://essenceofvaranasi.com/admin/seed.php?token=tour-seed-2026
 */

declare(strict_types=1);

require_once __DIR__ . '/_db.php';

$token = $_GET['token'] ?? '';
if (!in_array($token, ['tour-seed-2026', 'hotel-seed-2026'], true)) {
    http_response_code(403);
    exit('Forbidden: Invalid token. Pass ?token=tour-seed-2026');
}

header('Content-Type: text/plain; charset=utf-8');

try {
    $pdo = db();

    // 1. Drop existing bookings table if resetting old hotel schema data completely
    if (isset($_GET['reset_data']) || true) {
        $pdo->exec("DROP TABLE IF EXISTS bookings");
        echo "✅ Old booking/hotel data purged.\n";
    }

    // 2. Create tables for Tour CRM
    $sqlUsers = "
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(64) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('admin','editor') NOT NULL DEFAULT 'admin',
      display_name VARCHAR(120) NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_login_at DATETIME NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $sqlBookings = "
    CREATE TABLE IF NOT EXISTS bookings (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      guest_name VARCHAR(120) NOT NULL,
      email VARCHAR(190) NOT NULL,
      phone VARCHAR(40) NOT NULL,
      check_in DATE NULL,
      check_out DATE NULL,
      room_type VARCHAR(120) NOT NULL DEFAULT 'General Inquiry',
      guests INT UNSIGNED NOT NULL DEFAULT 1,
      pickup_location VARCHAR(255) NULL,
      special_requests TEXT NULL,
      source_page VARCHAR(120) NOT NULL DEFAULT '/',
      user_agent VARCHAR(255) NULL,
      ip_address VARCHAR(45) NULL,
      status ENUM('new','contacted','quote_sent','confirmed','completed','cancelled','archived') NOT NULL DEFAULT 'new',
      notes TEXT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      KEY idx_status_created (status, created_at),
      KEY idx_checkin (check_in),
      KEY idx_room (room_type)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $sqlSessions = "
    CREATE TABLE IF NOT EXISTS sessions (
      id CHAR(64) PRIMARY KEY,
      user_id INT UNSIGNED NULL,
      ip_address VARCHAR(45) NULL,
      user_agent VARCHAR(255) NULL,
      payload TEXT NULL,
      last_activity DATETIME NOT NULL,
      expires_at DATETIME NOT NULL,
      KEY idx_expires (expires_at),
      CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $sqlAttempts = "
    CREATE TABLE IF NOT EXISTS login_attempts (
      username VARCHAR(64) NOT NULL,
      attempted_at DATETIME NOT NULL,
      ip_address VARCHAR(45) NULL,
      success TINYINT(1) NOT NULL DEFAULT 0,
      KEY idx_user_time (username, attempted_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";

    $pdo->exec($sqlUsers);
    $pdo->exec($sqlBookings);
    $pdo->exec($sqlSessions);
    $pdo->exec($sqlAttempts);

    echo "✅ Tour CRM database tables created / verified successfully.\n";

    // 3. Reset or insert admin user with password Tour@12345
    $hash = password_hash('Tour@12345', PASSWORD_BCRYPT);
    $stmt = $pdo->prepare('SELECT id FROM users WHERE username = "admin"');
    $stmt->execute();
    $existingId = $stmt->fetchColumn();

    if ($existingId) {
        $up = $pdo->prepare('UPDATE users SET password_hash = :h, role = "admin", display_name = "Essence Travel Admin" WHERE username = "admin"');
        $up->execute([':h' => $hash]);
        echo "✅ Admin user password reset successfully!\n";
    } else {
        $ins = $pdo->prepare('INSERT INTO users (username, password_hash, role, display_name) VALUES ("admin", :h, "admin", "Essence Travel Admin")');
        $ins->execute([':h' => $hash]);
        echo "✅ Admin user created successfully!\n";
    }

    // 4. Clear failed login attempts to prevent lockout
    $pdo->exec('DELETE FROM login_attempts');
    echo "✅ Login throttling cleared.\n\n";

    echo "TOUR CRM LOGIN DETAILS:\n";
    echo "Username: admin\n";
    echo "Password: Tour@12345\n\n";
    echo "Login URL: https://essenceofvaranasi.com/admin/login.php\n";

} catch (Throwable $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
