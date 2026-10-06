const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

function addDirectoryToZip(zip, folderPath, rootFolderName = '') {
  const items = fs.readdirSync(folderPath);
  for (const item of items) {
    if (item === '.git' || item === 'node_modules' || item.endsWith('.DS_Store')) continue;
    const fullPath = path.join(folderPath, item);
    const stat = fs.statSync(fullPath);
    const zipPath = rootFolderName ? `${rootFolderName}/${item}` : item;
    if (stat.isDirectory()) {
      addDirectoryToZip(zip, fullPath, zipPath);
    } else {
      const content = fs.readFileSync(fullPath);
      zip.file(zipPath, content);
    }
  }
}

async function buildZips() {
  console.log('Packaging WordPress Theme ZIP...');
  const themeZip = new JSZip();
  addDirectoryToZip(themeZip, path.join(__dirname, '../wordpress-theme'), 'sedrazavi-theme');
  const themeBuffer = await themeZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(__dirname, '../public/sedrazavi-theme.zip'), themeBuffer);
  fs.writeFileSync(path.join(__dirname, '../public/sedrazavi-law-firm-wordpress-theme.zip'), themeBuffer);
  console.log('Theme ZIP created successfully (' + (themeBuffer.length / 1024 / 1024).toFixed(2) + ' MB)');

  console.log('Packaging Elementor Addon Plugin ZIP...');
  const pluginZip = new JSZip();
  addDirectoryToZip(pluginZip, path.join(__dirname, '../elementor-addon-suite'), 'sedrazavi-addons');
  const pluginBuffer = await pluginZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(__dirname, '../public/sedrazavi-addons.zip'), pluginBuffer);
  console.log('Plugin ZIP created successfully (' + (pluginBuffer.length / 1024 / 1024).toFixed(2) + ' MB)');

  console.log('Packaging Complete 2-in-1 Suite ZIP...');
  const suiteZip = new JSZip();
  suiteZip.file('1-پوسته-اصلی-sedrazavi-theme.zip', themeBuffer);
  suiteZip.file('2-افزونه-المنتور-sedrazavi-addons.zip', pluginBuffer);
  suiteZip.file('راهنمای_سریع_نصب.txt', `راهنمای نصب پکیج حقوقی دکتر سیده مریم رضوی (نسخه 3.0.0):
۱. در پیشخوان وردپرس وارد بخش «نمایش > پوسته‌ها > افزودن پوسته جدید > بارگذاری پوسته» شوید و فایل 1-پوسته-اصلی-sedrazavi-theme.zip را نصب و فعال کنید.
۲. در بخش «افزونه‌ها > افزودن افزونه جدید > بارگذاری افزونه» فایل 2-افزونه-المنتور-sedrazavi-addons.zip را نصب و فعال فرمایید.
۳. در منوی «تنظیمات > خواندن» برگه نخست را بر روی یک برگه با قالب «صفحه اصلی» یا پیش‌فرض قرار دهید.
۴. پیشخوان مدیریت وکیل در آدرس /dashboard یا برگه با قالب «پنل مدیریت وکیل و ادمین» در دسترس خواهد بود.
پشتیبانی: دفتر وکالت دکتر سیده مریم رضوی
`);
  const suiteBuffer = await suiteZip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  fs.writeFileSync(path.join(__dirname, '../public/sedrazavi-complete-suite.zip'), suiteBuffer);
  console.log('Suite ZIP created successfully (' + (suiteBuffer.length / 1024 / 1024).toFixed(2) + ' MB)');
}

buildZips().catch(console.error);
