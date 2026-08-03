<?php
/**
 * admin/login.php — Admin login form with authentication throttling
 */

declare(strict_types=1);

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_csrf.php';

session_start_session();

// If already logged in, redirect to dashboard
if (current_user()) {
    redirect('/admin/index.php');
}

$error = '';
$username = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_verify();
    $username = trim((string)($_POST['username'] ?? ''));
    $password = (string)($_POST['password'] ?? '');

    if ($username === '' || $password === '') {
        $error = 'Please enter both username and password.';
    } elseif (!check_login_throttle($username)) {
        $error = 'Too many failed login attempts. Please wait 10 minutes.';
    } else {
        try {
            $stmt = db()->prepare('SELECT id, username, password_hash, role, display_name FROM users WHERE username = :u LIMIT 1');
            $stmt->execute([':u' => $username]);
            $user = $stmt->fetch();

            if ($user && password_verify($password, $user['password_hash'])) {
                record_login_attempt($username, true);
                
                // Regenerate session ID for security
                session_regenerate_id(true);
                $_SESSION['user_id'] = (int)$user['id'];
                
                // Update last login
                $up = db()->prepare('UPDATE users SET last_login_at = NOW() WHERE id = :id');
                $up->execute([':id' => $user['id']]);

                flash_set('success', 'Welcome back, ' . $user['display_name'] . '!');
                redirect('/admin/index.php');
            } else {
                record_login_attempt($username, false);
                $error = 'Invalid username or password.';
            }
        } catch (Throwable $e) {
            $error = 'System error. Please check database configuration.';
        }
    }
}

$flashes = flash_get();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Login · Hotel CRM</title>
  <link rel="stylesheet" href="/admin/admin.css">
</head>
<body class="login-body">
  <div class="login-card">
    <div class="login-brand">🏨 Hotel <span>CRM</span></div>
    <div class="login-sub">Sign in to manage guest room reservations</div>

    <?php foreach ($flashes as $type => $msg): ?>
      <div class="alert alert-<?= e($type) ?>"><?= e($msg) ?></div>
    <?php endforeach; ?>

    <?php if ($error): ?>
      <div class="alert alert-error"><?= e($error) ?></div>
    <?php endif; ?>

    <form method="post" class="form-grid">
      <?= csrf_field() ?>
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" value="<?= e($username) ?>" required autofocus autocomplete="username">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required autocomplete="current-password">
      </div>
      <div>
        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 8px;">Sign In</button>
      </div>
    </form>
  </div>
</body>
</html>
