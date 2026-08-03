<?php
/**
 * admin/bookings-view.php — Single guest reservation detail, status workflow, and staff notes
 */

declare(strict_types=1);

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/_csrf.php';
require_once __DIR__ . '/_layout.php';

require_login();
session_start_session();

$id = (int)($_GET['id'] ?? 0);
if ($id <= 0) {
    flash_set('error', 'Invalid booking ID.');
    redirect('/admin/bookings.php');
}

// POST = update status / staff notes
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_verify();
    $newStatus = $_POST['status'] ?? '';
    $notes = trim((string)($_POST['notes'] ?? ''));

    if (!in_array($newStatus, ['new','contacted','confirmed','cancelled','completed','archived'], true)) {
        $newStatus = 'new';
    }

    $stmt = db()->prepare('UPDATE bookings SET status = :s, notes = :n WHERE id = :id');
    $stmt->execute([
        ':s'  => $newStatus,
        ':n'  => $notes !== '' ? $notes : null,
        ':id' => $id,
    ]);

    flash_set('success', 'Booking #' . $id . ' updated successfully.');
    redirect('/admin/bookings-view.php?id=' . $id);
}

// GET = fetch detail
$stmt = db()->prepare(
    'SELECT id, created_at, updated_at, guest_name, email, phone, check_in, check_out, room_type, guests,
            special_requests, source_page, user_agent, ip_address, status, notes
     FROM bookings WHERE id = :id LIMIT 1'
);
$stmt->execute([':id' => $id]);
$row = $stmt->fetch();

if (!$row) {
    flash_set('error', 'Booking #' . $id . ' not found.');
    redirect('/admin/bookings.php');
}

$nights = calculate_nights($row['check_in'], $row['check_out']);
$cleanPhone = preg_replace('/[^0-9]/', '', $row['phone']);

render_header('Booking #' . $row['id'] . ' · ' . $row['guest_name'], 'bookings');
?>

<div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
  <a href="/admin/bookings.php" class="btn btn-ghost btn-sm">← Back to Bookings</a>
  <div style="display: flex; gap: 8px;">
    <?php if ($cleanPhone): ?>
      <a href="https://wa.me/<?= e($cleanPhone) ?>?text=Hello%20<?= urlencode($row['guest_name']) ?>!%20Regarding%20your%20reservation%20at%20our%20hotel..." 
         target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="background-color: #25D366; color: #fff; border-color: #25D366;">
        💬 Chat on WhatsApp
      </a>
    <?php endif; ?>
    <a href="tel:<?= e($row['phone']) ?>" class="btn btn-outline btn-sm">📞 Call Guest</a>
  </div>
</div>

<!-- Reservation Details -->
<div class="detail-grid">
  <div class="detail-row">
    <div class="detail-label">Status</div>
    <div class="detail-value">
      <span class="pill pill-<?= e($row['status']) ?>"><?= e(fmt_status($row['status'])) ?></span>
    </div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Submitted On</div>
    <div class="detail-value"><?= e(fmt_dt($row['created_at'])) ?></div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Guest Name</div>
    <div class="detail-value"><strong><?= e($row['guest_name']) ?></strong></div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Selected Room Type</div>
    <div class="detail-value">
      <strong style="color: var(--color-primary); font-size: 1.1rem;"><?= e($row['room_type']) ?></strong>
    </div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Check-In Date</div>
    <div class="detail-value"><strong><?= e(fmt_date($row['check_in'])) ?></strong></div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Check-Out Date</div>
    <div class="detail-value">
      <strong><?= e(fmt_date($row['check_out'])) ?></strong> 
      <span style="color: var(--color-muted); font-size: 0.85rem;">(<?= $nights ?> night<?= $nights === 1 ? '' : 's' ?>)</span>
    </div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Number of Guests</div>
    <div class="detail-value"><?= (int)$row['guests'] ?> Guest<?= (int)$row['guests'] === 1 ? '' : 's' ?></div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Email Address</div>
    <div class="detail-value">
      <a href="mailto:<?= e($row['email']) ?>"><?= e($row['email']) ?></a>
    </div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Phone / Mobile</div>
    <div class="detail-value">
      <a href="tel:<?= e($row['phone']) ?>"><?= e($row['phone']) ?></a>
    </div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Source Page</div>
    <div class="detail-value">
      <?php if ($row['source_page']): ?>
        <a href="<?= e($row['source_page']) ?>" target="_blank" rel="noopener"><?= e($row['source_page']) ?></a>
      <?php else: ?>—<?php endif; ?>
    </div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Visitor Device / IP</div>
    <div class="detail-value" style="font-size: 0.85rem; color: var(--color-muted);">
      IP: <?= e($row['ip_address'] ?? '—') ?><br>
      <?= e($row['user_agent'] ?? '') ?>
    </div>
  </div>

  <?php if (!empty($row['special_requests'])): ?>
    <div class="detail-row detail-message">
      <div class="detail-label">Special Requests / Notes from Guest</div>
      <div class="detail-value" style="margin-top: 8px; white-space: pre-wrap; font-style: italic;">
        "<?= e($row['special_requests']) ?>"
      </div>
    </div>
  <?php endif; ?>
</div>

<!-- Update Status & Staff Notes Form -->
<div class="admin-card">
  <h2 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 16px;">Update Reservation Status &amp; Staff Notes</h2>
  
  <form method="post" class="form-grid">
    <?= csrf_field() ?>
    <div>
      <label for="status">Reservation Status</label>
      <select id="status" name="status">
        <?php foreach (['new','contacted','confirmed','cancelled','completed','archived'] as $opt): ?>
          <option value="<?= $opt ?>" <?= $row['status']===$opt?'selected':'' ?>><?= fmt_status($opt) ?></option>
        <?php endforeach; ?>
      </select>
    </div>

    <div>
      <label for="notes">Internal Staff Notes <span style="color: var(--color-muted); font-weight: 400;">(Private - visible only to hotel staff)</span></label>
      <textarea id="notes" name="notes" placeholder="e.g. Spoke to guest. Advance payment of ₹2,000 received via UPI. Arranged airport transfer for 10th Sept at 2 PM."><?= e($row['notes'] ?? '') ?></textarea>
    </div>

    <div>
      <button type="submit" class="btn btn-primary">Save Reservation Changes</button>
    </div>
  </form>
</div>

<?php render_footer(); ?>
