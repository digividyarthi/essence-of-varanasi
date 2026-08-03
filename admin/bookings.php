<?php
/**
 * admin/bookings.php — List, filter, search, & export tour inquiries & travel bookings
 */

declare(strict_types=1);

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/_csrf.php';
require_once __DIR__ . '/_layout.php';

require_login();
session_start_session();

// Filter params
$status   = in_array($_GET['status'] ?? '', ['new','contacted','quote_sent','confirmed','cancelled','completed','archived'], true) ? $_GET['status'] : '';
$tourName = trim((string)($_GET['tour_name'] ?? $_GET['room_type'] ?? ''));
$search   = trim((string)($_GET['search'] ?? ''));
$from     = trim((string)($_GET['from'] ?? ''));
$to       = trim((string)($_GET['to'] ?? ''));
$export   = $_GET['export'] ?? '';

// Handle CSV export
if ($export === 'csv') {
    csrf_verify();
    $pdo = db();
    $where = []; $params = [];
    if ($status !== '')   { $where[] = 'status = :status';     $params[':status']   = $status; }
    if ($tourName !== '') { $where[] = 'room_type = :tour';    $params[':tour']     = $tourName; }
    if ($from !== '')     { $where[] = 'check_in >= :from';    $params[':from']     = $from; }
    if ($to !== '')       { $where[] = 'check_in <= :to';      $params[':to']       = $to; }
    if ($search !== '')   { 
        $where[] = '(guest_name LIKE :s OR email LIKE :s OR phone LIKE :s)'; 
        $params[':s'] = '%' . $search . '%'; 
    }

    $sql = 'SELECT id, created_at, guest_name, email, phone, check_in, check_out, room_type, guests, pickup_location, special_requests, source_page, status, notes, ip_address FROM bookings';
    if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
    $sql .= ' ORDER BY created_at DESC';

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    $fname = 'varanasi-tour-inquiries-' . date('Ymd-His') . '.csv';
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $fname . '"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['ID', 'Date Submitted', 'Traveler Name', 'Email', 'Phone', 'Selected Tour / Package', 'Travel Date', 'Return Date', 'Travelers', 'Pickup Location', 'Special Requests', 'Source Page', 'Status', 'Staff Notes', 'IP Address']);
    
    while ($row = $stmt->fetch()) {
        fputcsv($out, [
            $row['id'],
            $row['created_at'],
            $row['guest_name'],
            $row['email'],
            $row['phone'],
            $row['room_type'],
            $row['check_in'],
            $row['check_out'],
            $row['guests'],
            $row['pickup_location'],
            $row['special_requests'],
            $row['source_page'],
            $row['status'],
            $row['notes'],
            $row['ip_address'],
        ]);
    }
    fclose($out);
    exit;
}

$rows = [];
$tourTypes = [];

try {
    // Fetch distinct tour / service names for dropdown
    $tourTypes = db()->query("SELECT DISTINCT room_type FROM bookings WHERE room_type<>'' ORDER BY room_type")->fetchAll(PDO::FETCH_COLUMN);

    // Build SQL query for table display
    $where = []; $params = [];
    if ($status !== '')   { $where[] = 'status = :status';     $params[':status']   = $status; }
    if ($tourName !== '') { $where[] = 'room_type = :tour';    $params[':tour']     = $tourName; }
    if ($from !== '')     { $where[] = 'check_in >= :from';    $params[':from']     = $from; }
    if ($to !== '')       { $where[] = 'check_in <= :to';      $params[':to']       = $to; }
    if ($search !== '')   { 
        $where[] = '(guest_name LIKE :s OR email LIKE :s OR phone LIKE :s)'; 
        $params[':s'] = '%' . $search . '%'; 
    }

    $sql = 'SELECT id, created_at, guest_name, email, phone, check_in, check_out, room_type, guests, pickup_location, source_page, status FROM bookings';
    if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
    $sql .= ' ORDER BY created_at DESC LIMIT 200';

    $stmt = db()->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();
} catch (Throwable $e) {
    render_header('Tour Inquiries', 'bookings');
    echo '<div class="admin-card" style="border-left: 4px solid #ef4444; background: #fff8f8;">';
    echo '<h3 style="color: #dc2626; margin-bottom: 8px;">Database Setup Required</h3>';
    echo '<p style="margin-bottom: 16px;">The database query failed: <em>' . e($e->getMessage()) . '</em></p>';
    echo '<a href="/admin/seed.php?token=tour-seed-2026" class="btn btn-primary">Run Database Setup & Seed Admin User →</a>';
    echo '</div>';
    render_footer();
    exit;
}

render_header('Tour Inquiries', 'bookings');
?>

<!-- Filter Form -->
<form method="get" class="admin-filters">
  <div>
    <label>Status</label>
    <select name="status">
      <option value="">All Statuses</option>
      <?php foreach (['new','contacted','quote_sent','confirmed','completed','cancelled','archived'] as $opt): ?>
        <option value="<?= $opt ?>" <?= $status===$opt?'selected':'' ?>><?= fmt_status($opt) ?></option>
      <?php endforeach; ?>
    </select>
  </div>

  <div>
    <label>Tour / Package</label>
    <select name="tour_name">
      <option value="">All Tours / Services</option>
      <?php foreach ($tourTypes as $r): ?>
        <option value="<?= e($r) ?>" <?= $tourName===$r?'selected':'' ?>><?= e($r) ?></option>
      <?php endforeach; ?>
    </select>
  </div>

  <div>
    <label>Travel Date From</label>
    <input type="date" name="from" value="<?= e($from) ?>">
  </div>

  <div>
    <label>Travel Date To</label>
    <input type="date" name="to" value="<?= e($to) ?>">
  </div>

  <div>
    <label>Search Traveler / Contact</label>
    <input type="text" name="search" placeholder="Name, Email, Phone..." value="<?= e($search) ?>" style="min-width: 180px;">
  </div>

  <div style="align-self: end; display: flex; gap: 8px;">
    <button type="submit" class="btn btn-primary btn-sm">Filter</button>
    <a href="/admin/bookings.php" class="btn btn-ghost btn-sm">Reset</a>
  </div>

  <div style="align-self: end; margin-left: auto;">
    <a href="/admin/bookings.php?<?= e(http_build_query(array_merge($_GET, ['export' => 'csv', '_csrf' => csrf_token()]))) ?>" class="btn btn-outline btn-sm">📊 Export CSV</a>
  </div>
</form>

<?php if (!$rows): ?>
  <div class="admin-card">
    <p style="color: var(--color-muted); text-align: center; padding: 24px;">No tour inquiries match your filter criteria.</p>
  </div>
<?php else: ?>
  <div class="admin-card" style="padding: 0; overflow: hidden;">
    <div class="admin-table-wrap" style="margin-top: 0;">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Submitted</th>
            <th>Traveler Name</th>
            <th>Contact Details</th>
            <th>Selected Package</th>
            <th>Travel Date</th>
            <th>Travelers</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($rows as $b): ?>
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
                <?= e(fmt_date($b['check_in'])) ?>
              </td>
              <td><?= (int)$b['guests'] ?> Person<?= (int)$b['guests'] === 1 ? '' : 's' ?></td>
              <td><span class="pill pill-<?= e($b['status']) ?>"><?= e(fmt_status($b['status'])) ?></span></td>
              <td style="white-space: nowrap;">
                <a href="/admin/bookings-view.php?id=<?= (int)$b['id'] ?>" class="btn btn-ghost btn-sm">View Details</a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>
  </div>

  <p style="color: var(--color-muted); font-size: 0.85rem; margin-top: 12px;">
    Showing <?= count($rows) ?> tour inquiry record<?= count($rows) === 1 ? '' : 's' ?> (max 200 shown). Use CSV Export for full records.
  </p>
<?php endif; ?>

<?php render_footer(); ?>
