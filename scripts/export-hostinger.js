const fs = require('fs');
const path = require('path');

function copyExportToRoot() {
  const outDir = path.join(__dirname, '..', 'out');
  const rootDir = path.join(__dirname, '..');

  if (!fs.existsSync(outDir)) {
    console.error('out directory does not exist. Run next build first.');
    process.exit(1);
  }

  console.log('Copying static export files from out/ to project root for Hostinger deployment...');
  fs.cpSync(outDir, rootDir, { recursive: true, force: true });
  console.log('Successfully prepared static files for Hostinger!');
}

copyExportToRoot();
