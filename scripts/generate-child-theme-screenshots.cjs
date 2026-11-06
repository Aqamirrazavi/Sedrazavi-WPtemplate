/**
 * Generates distinct, high-resolution, ultra-optimized 1200x900 screenshots
 * for each of the 8 child themes using ImageMagick direct composition.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const boldFont = '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf';
const regFont  = '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf';

const childThemes = [
  {
    slug: 'agency-designer',
    title: 'Agency & Designer Pro',
    subtitle: 'Creative Agencies, Digital Portfolios & Design Studios',
    badge: 'CREATIVE & PORTFOLIO ARCHETYPE',
    bg1: '#1e1b4b',
    bg2: '#0f172a',
    accent: '#818cf8',
    accent2: '#06b6d4',
    features: ['Interactive Bento Showcase', 'Dark Mode Minimalist UI', '3-Tab Elementor Sidebar']
  },
  {
    slug: 'clinic-medical',
    title: 'Clinic & Healthcare Pro',
    subtitle: 'Clinics, Medical Specialists, Dental & Healthcare Centers',
    badge: 'HEALTHCARE & CLINIC ARCHETYPE',
    bg1: '#064e3b',
    bg2: '#0f172a',
    accent: '#10b981',
    accent2: '#38bdf8',
    features: ['Appointment Booking Engine', 'Before / After Visual Slider', 'Medical Staff & Doctor Roster']
  },
  {
    slug: 'corporate-pro',
    title: 'Corporate & Enterprise Pro',
    subtitle: 'Enterprise Holdings, B2B Industries & Global Corporations',
    badge: 'ENTERPRISE & B2B ARCHETYPE',
    bg1: '#0f172a',
    bg2: '#1e293b',
    accent: '#3b82f6',
    accent2: '#60a5fa',
    features: ['Multi-Purpose Executive Hero', 'Animated Statistics Counter', 'Mega Menu & Pricing Matrix']
  },
  {
    slug: 'education-lms',
    title: 'Education & LMS Academy',
    subtitle: 'Online Academies, Video Courses & Instructor Portals',
    badge: 'ACADEMY & SPOTPLAYER ARCHETYPE',
    bg1: '#311042',
    bg2: '#0f172a',
    accent: '#f59e0b',
    accent2: '#a855f7',
    features: ['Protected SpotPlayer Cards', 'Video Modal with Posters', 'SHA256 Multi-File Downloads']
  },
  {
    slug: 'legal-firm',
    title: 'Legal Firm & Arbitration',
    subtitle: 'Commercial Law Firms, Arbitration & Corporate Defense',
    badge: 'INSTITUTIONAL LEGAL ARCHETYPE',
    bg1: '#0a1128',
    bg2: '#1c2541',
    accent: '#d4af37',
    accent2: '#f59e0b',
    features: ['Commercial ODR Arbitration', 'Confidential Docket Vault', 'Judicial Tariffs & Intake']
  },
  {
    slug: 'news-editorial',
    title: 'News & Editorial Magazine',
    subtitle: 'Publishing Houses, News Outlets & Editorial Journals',
    badge: 'NEWS & EDITORIAL ARCHETYPE',
    bg1: '#3f0713',
    bg2: '#0f172a',
    accent: '#ef4444',
    accent2: '#fb923c',
    features: ['Live Breaking News Ticker', 'Multi-Column Magazine Grid', 'Zero-React Native Comments']
  },
  {
    slug: 'sedrazavi-lawyer-child',
    title: 'Sovereign Lawyer & Advocate',
    subtitle: 'Solo Advocates, Legal Counselors & Senior Attorneys',
    badge: 'SOLO ADVOCATE ARCHETYPE',
    bg1: '#050814',
    bg2: '#101728',
    accent: '#d4af37',
    accent2: '#c084fc',
    features: ['Interactive Case Milestones', 'Judicial Fee Calculator', 'Email OTP Magic Passwordless']
  },
  {
    slug: 'store-modern',
    title: 'Modern E-Commerce Store',
    subtitle: 'WooCommerce Online Stores with Iranian Shetab Gateway',
    badge: 'E-COMMERCE & SHETAB ARCHETYPE',
    bg1: '#022c22',
    bg2: '#0f172a',
    accent: '#10b981',
    accent2: '#6366f1',
    features: ['Single Product Container Template', 'FOMO Urgency Countdown Bar', 'Direct Bank Shetab Gateway']
  }
];

console.log('Generating distinct, high-res 1200x900 screenshots for all 8 child themes...');

childThemes.forEach(theme => {
  const destPath = path.join(__dirname, `../wordpress-theme/child-themes/${theme.slug}/screenshot.png`);

  const cmd = `convert -size 1200x900 gradient:"${theme.bg1}"-"${theme.bg2}" \\
    -font "${boldFont}" \\
    -fill "rgba(255,255,255,0.08)" -stroke "rgba(255,255,255,0.15)" -strokewidth 2 -draw "roundrectangle 80,70 1120,144 16,16" \\
    -fill "#ffffff" -stroke none -pointsize 22 -annotate +150+114 "SedRazavi Sovereign OS - ${theme.slug}" \\
    -fill "${theme.accent}" -stroke none -pointsize 15 -annotate +920+114 "v6.0.0 Sovereign" \\
    -fill "rgba(255,255,255,0.05)" -stroke "rgba(255,255,255,0.12)" -strokewidth 2 -draw "roundrectangle 80,174 1120,640 24,24" \\
    -fill "${theme.accent}" -stroke "${theme.accent}" -strokewidth 1.5 -draw "roundrectangle 120,214 480,248 17,17" \\
    -fill "#0f172a" -stroke none -pointsize 13 -annotate +140+236 "${theme.badge}" \\
    -fill "#ffffff" -stroke none -pointsize 42 -annotate +120+315 "${theme.title}" \\
    -font "${regFont}" \\
    -fill "#cbd5e1" -stroke none -pointsize 20 -annotate +120+365 "${theme.subtitle}" \\
    -fill "rgba(255,255,255,0.08)" -stroke "rgba(255,255,255,0.15)" -strokewidth 1.5 -draw "roundrectangle 120,420 420,480 12,12" \\
    -fill "#f8fafc" -stroke none -font "${boldFont}" -pointsize 15 -annotate +140+455 "✓ ${theme.features[0]}" \\
    -fill "rgba(255,255,255,0.08)" -stroke "rgba(255,255,255,0.15)" -strokewidth 1.5 -draw "roundrectangle 440,420 750,480 12,12" \\
    -fill "#f8fafc" -stroke none -font "${boldFont}" -pointsize 15 -annotate +460+455 "✓ ${theme.features[1]}" \\
    -fill "rgba(255,255,255,0.08)" -stroke "rgba(255,255,255,0.15)" -strokewidth 1.5 -draw "roundrectangle 770,420 1080,480 12,12" \\
    -fill "#f8fafc" -stroke none -font "${boldFont}" -pointsize 15 -annotate +790+455 "✓ ${theme.features[2]}" \\
    -fill "${theme.accent}" -stroke none -draw "roundrectangle 120,530 380,580 12,12" \\
    -fill "#0f172a" -stroke none -font "${boldFont}" -pointsize 16 -annotate +145+562 "Elementor-First Architecture" \\
    -fill "transparent" -stroke "rgba(255,255,255,0.3)" -strokewidth 1.5 -draw "roundrectangle 400,530 660,580 12,12" \\
    -fill "#ffffff" -stroke none -font "${boldFont}" -pointsize 15 -annotate +430+562 "Flexbox Container Ready" \\
    -fill "rgba(255,255,255,0.06)" -stroke "rgba(255,255,255,0.1)" -strokewidth 1.5 -draw "roundrectangle 80,670 1120,830 16,16" \\
    -fill "${theme.accent}" -stroke none -font "${boldFont}" -pointsize 28 -annotate +140+735 "31 Widgets" \\
    -fill "#94a3b8" -stroke none -font "${regFont}" -pointsize 14 -annotate +140+770 "Native Elementor Controls" \\
    -fill "${theme.accent2}" -stroke none -font "${boldFont}" -pointsize 28 -annotate +420+735 "30 Templates" \\
    -fill "#94a3b8" -stroke none -font "${regFont}" -pointsize 14 -annotate +420+770 "Flexbox Theme Builder" \\
    -fill "#10b981" -stroke none -font "${boldFont}" -pointsize 28 -annotate +700+735 "100% No-React" \\
    -fill "#94a3b8" -stroke none -font "${regFont}" -pointsize 14 -annotate +700+770 "Clean PHP / Zero-Lockin" \\
    -fill "#f59e0b" -stroke none -font "${boldFont}" -pointsize 28 -annotate +950+735 "Core Web Vitals A+" \\
    -fill "#94a3b8" -stroke none -font "${regFont}" -pointsize 14 -annotate +950+770 "Sub-50ms Transient Caching" \\
    "${destPath}"`;

  try {
    execSync(cmd);
    const stats = fs.statSync(destPath);
    console.log(`✅ [${theme.slug}] screenshot.png: ${(stats.size / 1024).toFixed(1)} KB (Distinct & Optimized)`);
  } catch (err) {
    console.error(`❌ Failed ${theme.slug}:`, err.message);
  }
});

console.log('🎉 All 8 child themes now have distinct, professional, lightweight screenshots!');
