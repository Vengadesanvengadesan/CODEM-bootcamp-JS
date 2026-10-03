const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const indexSrc = path.join(__dirname, '..', 'index.html');
const frequenzaSrc = path.join(__dirname, '..', 'Frequenza_26_GCE_Tirunelveli-1.html');

if (fs.existsSync(indexSrc)) {
  fs.copyFileSync(indexSrc, path.join(distDir, 'index.html'));
  console.log('Copied index.html to dist/index.html');
}

if (fs.existsSync(frequenzaSrc)) {
  fs.copyFileSync(frequenzaSrc, path.join(distDir, 'Frequenza_26_GCE_Tirunelveli-1.html'));
  console.log('Copied Frequenza_26_GCE_Tirunelveli-1.html to dist/Frequenza_26_GCE_Tirunelveli-1.html');
}

console.log('Build completed successfully!');
