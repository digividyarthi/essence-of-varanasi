<?php
/**
 * admin/seed.php — One-time database seeder and admin password reset tool
 *
 * Usage:
 *   https://essenceofvaranasi.com/admin/seed.php?token=hotel-seed-2026
 */

declare(strict_types=1);

require_once __DIR__ . '/_db.php';

$token = $_GET['token'] ?? '';
if ($token !== 'hotel-seed-2026') {
    http_response_code(403);
    exit('Forbidden: Invalid token. Pass ?token=hotel-seed-2026');
}

header('Content-Type: text/plain; charset=utf-8');

try {
    $pdo = db();

    // 1. Create tables if not exists
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
      room_type VARCHAR(120) NOT NULL DEFAULT 'Standard Room',
      guests INT UNSIGNED NOT NULL DEFAULT 1,
      special_requests TEXT NULL,
      source_page VARCHAR(120) NOT NULL DEFAULT '/',
      user_agent VARCHAR(255) NULL,
      ip_address VARCHAR(45) NULL,
      status ENUM('new','contacted','confirmed','cancelled','completed','archived') NOT NULL DEFAULT 'new',
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

    // Auto-repair missing columns in 'bookings' table if old schema exists
    try {
        $cols = $pdo->query("SHOW COLUMNS FROM bookings")->fetchAll(PDO::FETCH_COLUMN);
        $colMap = array_flip($cols);

        if (!isset($colMap['guest_name'])) {
            if (isset($colMap['name'])) {
                @$pdo->exec("ALTER TABLE bookings CHANGE COLUMN `name` `guest_name` VARCHAR(120) NOT NULL");
            } else {
                @$pdo->exec("ALTER TABLE bookings ADD COLUMN `guest_name` VARCHAR(120) NOT NULL AFTER `id`");
            }
        }
        if (!isset($colMap['check_in'])) {
            @$pdo->exec("ALTER TABLE bookings ADD COLUMN `check_in` DATE NULL AFTER `phone`");
        }
        if (!isset($colMap['check_out'])) {
            @$pdo->exec("ALTER TABLE bookings ADD COLUMN `check_out` DATE NULL AFTER `check_in`");
        }
        if (!isset($colMap['room_type'])) {
            @$pdo->exec("ALTER TABLE bookings ADD COLUMN `room_type` VARCHAR(120) NOT NULL DEFAULT 'Standard Room' AFTER `check_out`");
        }
        if (!isset($colMap['guests'])) {
            @$pdo->exec("ALTER TABLE bookings ADD COLUMN `guests` INT UNSIGNED NOT NULL DEFAULT 1 AFTER `room_type`");
        }
        if (!isset($colMap['special_requests'])) {
            if (isset($colMap['message'])) {
                @$pdo->exec("ALTER TABLE bookings CHANGE COLUMN `message` `special_requests` TEXT NULL");
            } else {
                @$pdo->exec("ALTER TABLE bookings ADD COLUMN `special_requests` TEXT NULL AFTER `guests`");
            }
        }
        if (!isset($colMap['source_page'])) {
            @$pdo->exec("ALTER TABLE bookings ADD COLUMN `source_page` VARCHAR(120) NOT NULL DEFAULT '/' AFTER `special_requests`");
        }
        if (!isset($colMap['status'])) {
            @$pdo->exec("ALTER TABLE bookings ADD COLUMN `status` ENUM('new','contacted','confirmed','cancelled','completed','archived') NOT NULL DEFAULT 'new' AFTER `ip_address`");
        }
        if (!isset($colMap['notes'])) {
            @$pdo->exec("ALTER TABLE bookings ADD COLUMN `notes` TEXT NULL AFTER `status`");
        }
        echo "✅ Bookings table schema auto-repaired and verified.\n";
    } catch (Throwable $eCols) {
        echo "⚠️ Schema check warning: " . $eCols->getMessage() . "\n";
    }

    echo "✅ Tables created / verified successfully.\n";

    // 2. Reset or insert admin user with password Hotel@12345
    $hash = password_hash('Hotel@12345', PASSWORD_BCRYPT);
    $stmt = $pdo->prepare('SELECT id FROM users WHERE username = "admin"');
    $stmt->execute();
    $existingId = $stmt->fetchColumn();

    if ($existingId) {
        $up = $pdo->prepare('UPDATE users SET password_hash = :h, role = "admin", display_name = "Hotel Administrator" WHERE username = "admin"');
        $up->execute([':h' => $hash]);
        echo "✅ Admin user password reset successfully!\n";
    } else {
        $ins = $pdo->prepare('INSERT INTO users (username, password_hash, role, display_name) VALUES ("admin", :h, "admin", "Hotel Administrator")');
        $ins->execute([':h' => $hash]);
        echo "✅ Admin user created successfully!\n";
    }

    // 3. Clear failed login attempts to prevent lockout
    $pdo->exec('DELETE FROM login_attempts');
    echo "✅ Login throttling cleared.\n\n";

    echo "LOGIN DETAILS:\n";
    echo "Username: admin\n";
    echo "Password: Hotel@12345\n\n";
    echo "Login URL: https://essenceofvaranasi.com/admin/login.php\n";

} catch (Throwable $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}

