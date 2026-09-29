import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const themeDir = path.resolve('wordpress-theme');
const outputZip = path.resolve('sedrazavi-theme.zip');

async function addDirectoryToZip(zip, currentDir, rootDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const filePath = path.join(currentDir, file);
    const relPath = path.relative(rootDir, filePath);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await addDirectoryToZip(zip, filePath, rootDir);
    } else {
      const content = fs.readFileSync(filePath);
      zip.file(relPath, content);
    }
  }
}

async function main() {
  console.log('Packaging WordPress theme from:', themeDir);
  const zip = new JSZip();
  await addDirectoryToZip(zip, themeDir, themeDir);

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(outputZip, buffer);
  const sizeMb = (buffer.length / (1024 * 1024)).toFixed(2);
  console.log(`Successfully generated ${outputZip} (${sizeMb} MB)`);
}

main().catch((err) => {
  console.error('Error generating theme zip:', err);
  process.exit(1);
});
