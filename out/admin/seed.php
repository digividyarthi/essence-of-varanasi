<?php
/**
 * admin/seed.php — One-time database seeder for Hotel CRM administrator
 *
 * Usage:
 *   https://yourhotel.com/admin/seed.php?token=hotel-seed-2026
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

    echo "✅ Tables created / verified successfully.\n";

    // 2. Insert default admin user if missing
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM users WHERE username = "admin"');
    $stmt->execute();
    if ((int)$stmt->fetchColumn() === 0) {
        $hash = password_hash('Hotel@12345', PASSWORD_BCRYPT);
        $ins = $pdo->prepare('INSERT INTO users (username, password_hash, role, display_name) VALUES ("admin", :h, "admin", "Hotel Administrator")');
        $ins->execute([':h' => $hash]);
        echo "✅ Admin user created: username='admin', password='Hotel@12345'\n";
    } else {
        echo "ℹ️ Admin user already exists.\n";
    }

    // 3. Rename seed file so it cannot be called again
    $currentFile = __FILE__;
    $doneFile    = __DIR__ . '/seed.php.done';
    if (file_exists($currentFile)) {
        @rename($currentFile, $doneFile);
        echo "🔒 Security: seed.php renamed to seed.php.done\n";
    }

    echo "\nSetup completed! You can now log in at /admin/login.php\n";

} catch (Throwable $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
