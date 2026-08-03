<?php
/**
 * admin/bookings-view.php — Single tour inquiry detail, status workflow, and staff notes
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
    flash_set('error', 'Invalid inquiry ID.');
    redirect('/admin/bookings.php');
}

// POST = update status / staff notes
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_verify();
    $newStatus = $_POST['status'] ?? '';
    $notes = trim((string)($_POST['notes'] ?? ''));

    if (!in_array($newStatus, ['new','contacted','quote_sent','confirmed','completed','cancelled','archived'], true)) {
        $newStatus = 'new';
    }

    $stmt = db()->prepare('UPDATE bookings SET status = :s, notes = :n WHERE id = :id');
    $stmt->execute([
        ':s'  => $newStatus,
        ':n'  => $notes !== '' ? $notes : null,
        ':id' => $id,
    ]);

    flash_set('success', 'Tour inquiry #' . $id . ' updated successfully.');
    redirect('/admin/bookings-view.php?id=' . $id);
}

// GET = fetch detail
$stmt = db()->prepare(
    'SELECT id, created_at, updated_at, guest_name, email, phone, check_in, check_out, room_type, guests,
            pickup_location, special_requests, source_page, user_agent, ip_address, status, notes
     FROM bookings WHERE id = :id LIMIT 1'
);
$stmt->execute([':id' => $id]);
$row = $stmt->fetch();

if (!$row) {
    flash_set('error', 'Tour inquiry #' . $id . ' not found.');
    redirect('/admin/bookings.php');
}

$cleanPhone = preg_replace('/[^0-9]/', '', $row['phone']);
$waText = "Namaste " . $row['guest_name'] . "! Thank you for inquiring about '" . $row['room_type'] . "' with Essence of Varanasi. We are happy to help plan your trip. Shall we share the customized itinerary and quote?";

render_header('Inquiry #' . $row['id'] . ' · ' . $row['guest_name'], 'bookings');
?>

<div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
  <a href="/admin/bookings.php" class="btn btn-ghost btn-sm">← Back to Inquiries</a>
  <div style="display: flex; gap: 8px;">
    <?php if ($cleanPhone): ?>
      <a href="https://wa.me/<?= e($cleanPhone) ?>?text=<?= urlencode($waText) ?>" 
         target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="background-color: #25D366; color: #fff; border-color: #25D366;">
        💬 Chat on WhatsApp
      </a>
    <?php endif; ?>
    <a href="tel:<?= e($row['phone']) ?>" class="btn btn-outline btn-sm">📞 Call Traveler</a>
  </div>
</div>

<!-- Tour Inquiry Details -->
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
    <div class="detail-label">Traveler Name</div>
    <div class="detail-value"><strong><?= e($row['guest_name']) ?></strong></div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Selected Tour / Package</div>
    <div class="detail-value">
      <strong style="color: var(--color-primary); font-size: 1.1rem;"><?= e($row['room_type']) ?></strong>
    </div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Travel Date</div>
    <div class="detail-value">
      <strong><?= e(fmt_date($row['check_in'])) ?></strong>
      <?php if (!empty($row['check_out']) && $row['check_out'] !== $row['check_in']): ?>
        <span style="color: var(--color-muted); font-size: 0.85rem;"> (to <?= e(fmt_date($row['check_out'])) ?>)</span>
      <?php endif; ?>
    </div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Number of Travelers</div>
    <div class="detail-value"><?= (int)$row['guests'] ?> Person<?= (int)$row['guests'] === 1 ? '' : 's' ?></div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Pickup Hotel / Location</div>
    <div class="detail-value"><?= e($row['pickup_location'] ?: 'Not specified') ?></div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Email Address</div>
    <div class="detail-value">
      <a href="mailto:<?= e($row['email']) ?>"><?= e($row['email']) ?></a>
    </div>
  </div>

  <div class="detail-row">
    <div class="detail-label">Phone / WhatsApp</div>
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
      <div class="detail-label">Special Requirements / Message from Traveler</div>
      <div class="detail-value" style="margin-top: 8px; white-space: pre-wrap; font-style: italic;">
        "<?= e($row['special_requests']) ?>"
      </div>
    </div>
  <?php endif; ?>
</div>

<!-- Update Status & Staff Notes Form -->
<div class="admin-card">
  <h2 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 16px;">Update Inquiry Status &amp; Staff Notes</h2>
  
  <form method="post" class="form-grid">
    <?= csrf_field() ?>
    <div>
      <label for="status">Inquiry / Booking Status</label>
      <select id="status" name="status">
        <?php foreach (['new','contacted','quote_sent','confirmed','completed','cancelled','archived'] as $opt): ?>
          <option value="<?= $opt ?>" <?= $row['status']===$opt?'selected':'' ?>><?= fmt_status($opt) ?></option>
        <?php endforeach; ?>
      </select>
    </div>

    <div>
      <label for="notes">Internal Staff Notes <span style="color: var(--color-muted); font-weight: 400;">(Private - visible only to travel team)</span></label>
      <textarea id="notes" name="notes" placeholder="e.g. Quoted ₹12,000 for 4 adults. Advance payment of ₹3,000 received via UPI. Assigned English guide Rajesh for 15th Oct."><?= e($row['notes'] ?? '') ?></textarea>
    </div>

    <div>
      <button type="submit" class="btn btn-primary">Save Tour Inquiry Changes</button>
    </div>
  </form>
</div>

<?php render_footer(); ?>
