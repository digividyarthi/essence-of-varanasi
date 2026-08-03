<?php
/**
 * admin/index.php — Hotel CRM Overview Dashboard
 */

declare(strict_types=1);

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/_layout.php';

require_login();

// Metrics queries
$totalBookings   = (int)db()->query("SELECT COUNT(*) FROM bookings")->fetchColumn();
$newToday        = (int)db()->query("SELECT COUNT(*) FROM bookings WHERE DATE(created_at) = CURDATE()")->fetchColumn();
$upcomingCheckIn = (int)db()->query("SELECT COUNT(*) FROM bookings WHERE check_in >= CURDATE() AND status != 'cancelled'")->fetchColumn();
$confirmedCount  = (int)db()->query("SELECT COUNT(*) FROM bookings WHERE status = 'confirmed'")->fetchColumn();

// Recent 10 Bookings
$stmt = db()->query("SELECT id, created_at, guest_name, email, phone, check_in, check_out, room_type, guests, status FROM bookings ORDER BY created_at DESC LIMIT 10");
$recent = $stmt->fetchAll();

render_header('Dashboard Overview', 'dashboard');
?>

<!-- Metric Cards -->
<div class="metrics-grid">
  <div class="metric-card">
    <div class="metric-title">Total Bookings</div>
    <div class="metric-value"><?= number_format($totalBookings) ?></div>
  </div>
  <div class="metric-card">
    <div class="metric-title">New Inquiries Today</div>
    <div class="metric-value" style="color: #2563eb;"><?= number_format($newToday) ?></div>
  </div>
  <div class="metric-card">
    <div class="metric-title">Upcoming Check-Ins</div>
    <div class="metric-value" style="color: #d97706;"><?= number_format($upcomingCheckIn) ?></div>
  </div>
  <div class="metric-card">
    <div class="metric-title">Confirmed Reservations</div>
    <div class="metric-value" style="color: #16a34a;"><?= number_format($confirmedCount) ?></div>
  </div>
</div>

<!-- Recent Inquiries Table -->
<div class="admin-card">
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
    <h2 style="font-size: 1.15rem; font-weight: 700;">Recent Booking Inquiries</h2>
    <a href="/admin/bookings.php" class="btn btn-outline btn-sm">View All Bookings →</a>
  </div>

  <?php if (!$recent): ?>
    <p style="color: var(--color-muted); padding: 12px 0;">No guest room bookings recorded yet. Form submissions will appear here.</p>
  <?php else: ?>
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Guest Name</th>
            <th>Contact</th>
            <th>Room Type</th>
            <th>Stay Dates</th>
            <th>Nights</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($recent as $b): 
            $nights = calculate_nights($b['check_in'], $b['check_out']);
          ?>
            <tr>
              <td style="white-space: nowrap; font-size: 0.85rem; color: var(--color-muted);">
                <?= e(fmt_dt($b['created_at'])) ?>
              </td>
              <td>
                <a href="/admin/bookings-view.php?id=<?= (int)$b['id'] ?>">
                  <strong><?= e($b['guest_name']) ?></strong>
                </a>
              </td>
              <td>
                <a href="tel:<?= e($b['phone']) ?>"><?= e($b['phone']) ?></a><br>
                <a href="mailto:<?= e($b['email']) ?>" style="color: var(--color-muted); font-size: 0.8rem;"><?= e($b['email']) ?></a>
              </td>
              <td><strong style="color: var(--color-primary);"><?= e($b['room_type']) ?></strong></td>
              <td style="white-space: nowrap; font-size: 0.85rem;">
                <?= e(fmt_date($b['check_in'])) ?> → <?= e(fmt_date($b['check_out'])) ?>
              </td>
              <td><span class="pill pill-archived"><?= $nights ?> night<?= $nights === 1 ? '' : 's' ?></span></td>
              <td><span class="pill pill-<?= e($b['status']) ?>"><?= e(fmt_status($b['status'])) ?></span></td>
              <td style="white-space: nowrap;">
                <a href="/admin/bookings-view.php?id=<?= (int)$b['id'] ?>" class="btn btn-ghost btn-sm">Manage</a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  <?php endif; ?>
</div>

<?php render_footer(); ?>
