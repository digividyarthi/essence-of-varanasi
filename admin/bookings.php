<?php
/**
 * admin/bookings.php — List, filter, search, & export hotel room bookings
 */

declare(strict_types=1);

require_once __DIR__ . '/_auth.php';
require_once __DIR__ . '/_helpers.php';
require_once __DIR__ . '/_csrf.php';
require_once __DIR__ . '/_layout.php';

require_login();
session_start_session();

// Filter params
$status   = in_array($_GET['status'] ?? '', ['new','contacted','confirmed','cancelled','completed','archived'], true) ? $_GET['status'] : '';
$roomType = trim((string)($_GET['room_type'] ?? ''));
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
    if ($roomType !== '') { $where[] = 'room_type = :room';    $params[':room']     = $roomType; }
    if ($from !== '')     { $where[] = 'check_in >= :from';    $params[':from']     = $from; }
    if ($to !== '')       { $where[] = 'check_in <= :to';      $params[':to']       = $to; }
    if ($search !== '')   { 
        $where[] = '(guest_name LIKE :s OR email LIKE :s OR phone LIKE :s)'; 
        $params[':s'] = '%' . $search . '%'; 
    }

    $sql = 'SELECT id, created_at, guest_name, email, phone, check_in, check_out, room_type, guests, special_requests, source_page, status, notes, ip_address FROM bookings';
    if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
    $sql .= ' ORDER BY created_at DESC';

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    $fname = 'hotel-bookings-' . date('Ymd-His') . '.csv';
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="' . $fname . '"');
    $out = fopen('php://output', 'w');
    fputcsv($out, ['ID', 'Created', 'Guest Name', 'Email', 'Phone', 'Check-In', 'Check-Out', 'Nights', 'Room Type', 'Guests', 'Special Requests', 'Source Page', 'Status', 'Notes', 'IP']);
    
    while ($row = $stmt->fetch()) {
        $nights = calculate_nights($row['check_in'], $row['check_out']);
        fputcsv($out, [
            $row['id'],
            $row['created_at'],
            $row['guest_name'],
            $row['email'],
            $row['phone'],
            $row['check_in'],
            $row['check_out'],
            $nights,
            $row['room_type'],
            $row['guests'],
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

// Fetch distinct room types for dropdown
$roomTypes = db()->query("SELECT DISTINCT room_type FROM bookings WHERE room_type<>'' ORDER BY room_type")->fetchAll(PDO::FETCH_COLUMN);

// Build SQL query for table display
$where = []; $params = [];
if ($status !== '')   { $where[] = 'status = :status';     $params[':status']   = $status; }
if ($roomType !== '') { $where[] = 'room_type = :room';    $params[':room']     = $roomType; }
if ($from !== '')     { $where[] = 'check_in >= :from';    $params[':from']     = $from; }
if ($to !== '')       { $where[] = 'check_in <= :to';      $params[':to']       = $to; }
if ($search !== '')   { 
    $where[] = '(guest_name LIKE :s OR email LIKE :s OR phone LIKE :s)'; 
    $params[':s'] = '%' . $search . '%'; 
}

$sql = 'SELECT id, created_at, guest_name, email, phone, check_in, check_out, room_type, guests, source_page, status FROM bookings';
if ($where) $sql .= ' WHERE ' . implode(' AND ', $where);
$sql .= ' ORDER BY created_at DESC LIMIT 200';

$stmt = db()->prepare($sql);
$stmt->execute($params);
$rows = $stmt->fetchAll();

render_header('Room Bookings', 'bookings');
?>

<!-- Filter Form -->
<form method="get" class="admin-filters">
  <div>
    <label>Status</label>
    <select name="status">
      <option value="">All Statuses</option>
      <?php foreach (['new','contacted','confirmed','cancelled','completed','archived'] as $opt): ?>
        <option value="<?= $opt ?>" <?= $status===$opt?'selected':'' ?>><?= fmt_status($opt) ?></option>
      <?php endforeach; ?>
    </select>
  </div>

  <div>
    <label>Room Type</label>
    <select name="room_type">
      <option value="">All Room Types</option>
      <?php foreach ($roomTypes as $r): ?>
        <option value="<?= e($r) ?>" <?= $roomType===$r?'selected':'' ?>><?= e($r) ?></option>
      <?php endforeach; ?>
    </select>
  </div>

  <div>
    <label>Check-in From</label>
    <input type="date" name="from" value="<?= e($from) ?>">
  </div>

  <div>
    <label>Check-in To</label>
    <input type="date" name="to" value="<?= e($to) ?>">
  </div>

  <div>
    <label>Search Guest / Contact</label>
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
    <p style="color: var(--color-muted); text-align: center; padding: 24px;">No hotel room bookings match your filter criteria.</p>
  </div>
<?php else: ?>
  <div class="admin-card" style="padding: 0; overflow: hidden;">
    <div class="admin-table-wrap" style="margin-top: 0;">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Submitted</th>
            <th>Guest Name</th>
            <th>Contact Details</th>
            <th>Room Type</th>
            <th>Check-In → Check-Out</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($rows as $b): 
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
                <div style="font-size: 0.75rem; color: var(--color-muted);"><?= $nights ?> night<?= $nights === 1 ? '' : 's' ?></div>
              </td>
              <td><?= (int)$b['guests'] ?> Guest<?= (int)$b['guests'] === 1 ? '' : 's' ?></td>
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
    Showing <?= count($rows) ?> booking reservation<?= count($rows) === 1 ? '' : 's' ?> (max 200 shown). Use CSV Export for full records.
  </p>
<?php endif; ?>

<?php render_footer(); ?>
