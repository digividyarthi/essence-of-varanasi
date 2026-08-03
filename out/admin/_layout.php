<?php
/**
 * admin/_layout.php — Shared layout header and footer for Essence of Varanasi Tour CRM
 */

declare(strict_types=1);

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_helpers.php';

function render_header(string $title = 'Dashboard', string $activeTab = 'dashboard'): void {
    $user = current_user();
    $flashes = flash_get();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= e($title) ?> · Essence Tour CRM</title>
  <link rel="stylesheet" href="/admin/admin.css">
  <script src="/admin/admin.js" defer></script>
</head>
<body>
<div class="admin-wrapper">
  <!-- Sidebar -->
  <aside class="admin-sidebar">
    <div class="admin-brand">
      🛺 Essence <span>Tour CRM</span>
    </div>
    <ul class="admin-nav">
      <li>
        <a href="/admin/index.php" class="<?= $activeTab === 'dashboard' ? 'active' : '' ?>">
          📊 Dashboard
        </a>
      </li>
      <li>
        <a href="/admin/bookings.php" class="<?= $activeTab === 'bookings' ? 'active' : '' ?>">
          🧳 Tour Inquiries
        </a>
      </li>
    </ul>
    <div class="admin-sidebar-footer">
      Logged in as:<br>
      <strong style="color: #fff;"><?= e($user['display_name'] ?? 'Travel Admin') ?></strong>
    </div>
  </aside>

  <!-- Main Area -->
  <div class="admin-main">
    <header class="admin-topbar">
      <h1 class="admin-page-title"><?= e($title) ?></h1>
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="color: var(--color-muted); font-weight: 500;">Namaste, <?= e($user['display_name'] ?? 'Admin') ?></span>
        <a href="/admin/logout.php" class="btn btn-outline btn-sm">Logout</a>
      </div>
    </header>

    <main class="admin-content">
      <?php foreach ($flashes as $type => $msg): ?>
        <div class="alert alert-<?= e($type) ?>"><?= e($msg) ?></div>
      <?php endforeach; ?>
<?php
}

function render_footer(): void {
?>
    </main>
  </div>
</div>
</body>
</html>
<?php
}
