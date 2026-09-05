/**
 * Generates an official WordPress Theme Screenshot (1200x900 PNG)
 * Conforms to WordPress Theme Review standards for Appearance > Themes display.
 */
export function generateWordPressScreenshotBlob(): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 900;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Canvas context not available');
      }

      // 1. Deep Luxury Navy Gradient Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1200, 900);
      bgGrad.addColorStop(0, '#060B18');
      bgGrad.addColorStop(0.5, '#0B132B');
      bgGrad.addColorStop(1, '#1C2541');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1200, 900);

      // 2. Decorative Golden Grid Pattern & Geometric Accents
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.07)';
      ctx.lineWidth = 1;
      for (let x = 40; x < 1200; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 900);
        ctx.stroke();
      }
      for (let y = 40; y < 900; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1200, y);
        ctx.stroke();
      }

      // Outer Golden Border Frame
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
      ctx.lineWidth = 3;
      ctx.strokeRect(30, 30, 1140, 840);

      // Inner Subtle Border
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(45, 45, 1110, 810);

      // Corner Ornaments
      const drawCorner = (cx: number, cy: number) => {
        ctx.fillStyle = '#D4AF37';
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
      };
      drawCorner(30, 30);
      drawCorner(1170, 30);
      drawCorner(30, 870);
      drawCorner(1170, 870);

      // 3. Central Scales of Justice Emblem
      const centerX = 600;
      const centerY = 260;

      // Glow behind icon
      const glowGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 140);
      glowGrad.addColorStop(0, 'rgba(212, 175, 55, 0.25)');
      glowGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 140, 0, Math.PI * 2);
      ctx.fill();

      // Scales Circle Badge
      ctx.fillStyle = 'rgba(11, 19, 43, 0.9)';
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Justice Icon (Scale SVG drawn on canvas)
      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 54px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⚖️', centerX, centerY);

      // 4. Persian Brand Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 52px Tahoma, "Vazirmatn", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText('دفتر وکالت و مشاوره حقوقی سید رضوی', centerX, 410);

      // English Subtitle
      ctx.fillStyle = '#D4AF37';
      ctx.font = '600 24px Georgia, serif';
      ctx.letterSpacing = '4px';
      ctx.fillText('SEDRAZAVI LAW FIRM — LUXURY WORDPRESS THEME', centerX, 460);

      // Divider Line
      const lineGrad = ctx.createLinearGradient(centerX - 250, 0, centerX + 250, 0);
      lineGrad.addColorStop(0, 'rgba(212, 175, 55, 0)');
      lineGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.8)');
      lineGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX - 250, 490);
      ctx.lineTo(centerX + 250, 490);
      ctx.stroke();

      // Description text
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '400 22px Tahoma, "Vazirmatn", sans-serif';
      ctx.fillText('پوسته اختصاصی، مستقل و فوق‌پیشرفته برای وکلا و مشاوران حقوقی', centerX, 535);

      // 5. Feature Badges (Pills)
      const badges = [
        '✨ مستقل و بدون نیاز به ACF',
        '⚡ سازگاری کامل با المنتور',
        '📊 سامانه مدیریت پرونده و موکل',
        '📅 رزرواسیون آنلاین مشاوره',
      ];

      const badgeWidth = 240;
      const totalWidth = badges.length * badgeWidth + (badges.length - 1) * 20;
      const startX = (1200 - totalWidth) / 2;

      badges.forEach((text, i) => {
        const bx = startX + i * (badgeWidth + 20);
        const by = 600;
        const bw = badgeWidth;
        const bh = 50;

        ctx.fillStyle = 'rgba(28, 37, 65, 0.7)';
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
        ctx.lineWidth = 1.5;

        // Rounded rect
        ctx.beginPath();
        ctx.roundRect(bx, by, bw, bh, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#F3E5AB';
        ctx.font = 'bold 16px Tahoma, "Vazirmatn", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, bx + bw / 2, by + bh / 2);
      });

      // 6. Bottom Metadata Card
      ctx.fillStyle = 'rgba(6, 11, 24, 0.9)';
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(100, 700, 1000, 110, 16);
      ctx.fill();
      ctx.stroke();

      // 3 metadata columns
      const metaCols = [
        { label: 'نسخه پوسته', val: 'Version 2.5.0' },
        { label: 'سازگاری PHP', val: 'PHP 7.4 - 8.3+' },
        { label: 'سازگاری وردپرس', val: 'WordPress 5.8 - 6.7+' },
      ];

      metaCols.forEach((col, i) => {
        const colX = 100 + (1000 / 3) * i + 1000 / 6;
        ctx.fillStyle = '#94A3B8';
        ctx.font = '400 16px Tahoma, "Vazirmatn", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.fillText(col.label, colX, 745);

        ctx.fillStyle = '#D4AF37';
        ctx.font = 'bold 20px Georgia, serif';
        ctx.fillText(col.val, colX, 780);
      });

      // Bottom copyright
      ctx.fillStyle = '#64748B';
      ctx.font = '14px Tahoma, "Vazirmatn", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('© SedRazavi Law Firm Theme — 100% GPL Compliant', centerX, 845);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create Blob from Canvas'));
        }
      }, 'image/png');
    } catch (err) {
      reject(err);
    }
  });
}

export function generateWordPressScreenshotDataUrl(): Promise<string> {
  return new Promise((resolve, reject) => {
    generateWordPressScreenshotBlob()
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
}
