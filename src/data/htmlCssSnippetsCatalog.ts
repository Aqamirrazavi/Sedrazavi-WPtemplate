import React, { useState } from 'react';
import {
  FileCode,
  Copy,
  Check,
  Download,
  BookOpen,
  Sparkles,
  Layers,
  Code,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Database,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  FileText,
  Search,
  Sliders,
  HelpCircle,
  Cpu
} from 'lucide-react';

export interface SnippetItem {
  id: string;
  name: string;
  category: 'هیرو و سربرگ' | 'استعلام و رهگیری پرونده' | 'خدمات و تخصص‌ها' | 'کارتابل موکل و دسترسی سریع' | 'رزرو و تماس' | 'محاسبه‌گر و ابزار قضایی' | 'دیدگاه و اعتبارسنجی';
  description: string;
  elementorGuide: string;
  gutenbergGuide: string;
  htmlSnippet: string;
  cssSnippet: string;
  jsOptional?: string;
}

export const HTML_CSS_SNIPPETS_CATALOG: SnippetItem[] = [
  {
    id: 'hero-header-card',
    name: 'کارت هیرو و بیوگرافی وکیل سرپرست (Hero Header Card)',
    category: 'هیرو و سربرگ',
    description: 'بلاک هیرو معرفی دکتر سیده مریم رضوی، نشان رسمی کانون وکلا، بج‌های اعتماد و دکمه‌های اقدام سریع.',
    elementorGuide: 'در المنتور یک ستون باز کنید و ویجت "HTML سفارشی" (Custom HTML) را بکشید. کد را در آن قرار دهید.',
    gutenbergGuide: 'در گوتنبرگ بلوک "HTML سفارشی" (Custom HTML Block) را اضافه کنید و کد را در آن قرار دهید.',
    htmlSnippet: `<div class="sr-hero-wrapper" dir="rtl">
  <div class="sr-hero-card">
    <div class="sr-badge-pill">
      <span class="sr-dot-pulse"></span>
      <span>وکیل پایه یک دادگستری و مشاور حقوقی رسمی</span>
    </div>
    <h1 class="sr-hero-title">دکتر سیده مریم رضوی</h1>
    <p class="sr-hero-subtitle">دکترای تخصصی حقوق خصوصی | ۲۳ سال وکالت تخصصی در دعاوی تجاری، ملکی و داوری بین‌المللی</p>
    <div class="sr-hero-stats">
      <div class="sr-stat-item">
        <span class="sr-stat-val">۲۳+</span>
        <span class="sr-stat-label">سال تجربه درخشان</span>
      </div>
      <div class="sr-stat-item">
        <span class="sr-stat-val">۹۸٪</span>
        <span class="sr-stat-label">موفقیت در پرونده‌ها</span>
      </div>
      <div class="sr-stat-item">
        <span class="sr-stat-val">۲,۴۰۰+</span>
        <span class="sr-stat-label">موکل راضی حقیقی و حقوقی</span>
      </div>
    </div>
    <div class="sr-cta-group">
      <a href="#booking" class="sr-btn-primary">رزرو آنلاین وقت مشاوره</a>
      <a href="#tracking" class="sr-btn-outline">پیگیری آنلاین پرونده</a>
    </div>
  </div>
</div>`,
    cssSnippet: `<style>
.sr-hero-wrapper {
  font-family: 'Vazirmatn', Tahoma, sans-serif;
  background: linear-gradient(135deg, #0B132B 0%, #16203B 100%);
  padding: 40px 24px;
  border-radius: 24px;
  color: #ffffff;
  border: 1px solid rgba(212, 175, 55, 0.4);
  box-shadow: 0 20px 40px rgba(11, 19, 43, 0.4);
  text-align: right;
}
.sr-hero-card { max-width: 800px; margin: 0 auto; }
.sr-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: #F3E5AB;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 16px;
}
.sr-dot-pulse {
  width: 8px;
  height: 8px;
  background-color: #10B981;
  border-radius: 50%;
  box-shadow: 0 0 10px #10B981;
}
.sr-hero-title {
  font-size: 32px;
  font-weight: 900;
  color: #F3E5AB;
  margin: 0 0 12px;
}
.sr-hero-subtitle {
  font-size: 15px;
  color: #D1D5DB;
  line-height: 1.8;
  margin: 0 0 24px;
}
.sr-hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 24px;
  text-align: center;
}
.sr-stat-val {
  display: block;
  font-size: 24px;
  font-weight: 900;
  color: #D4AF37;
  font-family: Tahoma, monospace;
}
.sr-stat-label { font-size: 12px; color: #9CA3AF; margin-top: 4px; }
.sr-cta-group { display: flex; gap: 12px; flex-wrap: wrap; }
.sr-btn-primary {
  background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%);
  color: #0B132B;
  font-weight: 800;
  font-size: 14px;
  padding: 12px 24px;
  border-radius: 12px;
  text-decoration: none;
  transition: opacity 0.2s;
}
.sr-btn-primary:hover { opacity: 0.9; }
.sr-btn-outline {
  border: 1px solid rgba(212, 175, 55, 0.6);
  color: #F3E5AB;
  font-weight: 700;
  font-size: 14px;
  padding: 12px 24px;
  border-radius: 12px;
  text-decoration: none;
  transition: background 0.2s;
}
.sr-btn-outline:hover { background: rgba(212, 175, 55, 0.15); }
@media (max-width: 600px) {
  .sr-hero-stats { grid-template-columns: 1fr; }
  .sr-cta-group { flex-direction: column; }
  .sr-btn-primary, .sr-btn-outline { text-align: center; }
}
</style>`
  },
  {
    id: 'case-tracking-form-widget',
    name: 'فرم استعلام و رهگیری برخط پرونده (Case Tracker Widget)',
    category: 'استعلام و رهگیری پرونده',
    description: 'فرم جستجوی امن شماره کلاسه پرونده، رمز پرونده و نمایش فوری مرحله دادرسی با پشتیبانی از AJAX وردپرس.',
    elementorGuide: 'در المنتور ویجت Custom HTML را در برگه پیگیری پرونده قرار دهید.',
    gutenbergGuide: 'بلوک Custom HTML را در برگه قرار دهید. به صورت خودکار به ادمین آژاکس متصل است.',
    htmlSnippet: `<div class="sr-tracker-box" dir="rtl">
  <div class="sr-tracker-header">
    <div class="sr-icon-circle">⚖️</div>
    <div>
      <h3 class="sr-tracker-title">استعلام وضعیت پرونده قضایی</h3>
      <p class="sr-tracker-desc">شماره پرونده و رمز شخصی مندرج در ابلاغیه را وارد فرمایید.</p>
    </div>
  </div>

  <form id="srTrackingForm" class="sr-tracker-form" onsubmit="event.preventDefault(); window.srSubmitTracking();">
    <div class="sr-field-row">
      <div class="sr-field-col">
        <label class="sr-label">شماره پرونده / کلاسه (۱۶ رقمی یا کلاسه داخلی):</label>
        <input type="text" id="srCaseNo" class="sr-input" placeholder="مثال: ۱۴۰۳-۰۰۱" required />
      </div>
      <div class="sr-field-col">
        <label class="sr-label">شماره همراه موکل یا کد ثنا:</label>
        <input type="text" id="srPhone" class="sr-input" placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹" required />
      </div>
    </div>
    <button type="submit" class="sr-submit-btn">
      <span>استعلام آنی از سامانه مدیریت پرونده‌ها</span>
    </button>
  </form>

  <div id="srTrackingResult" class="sr-tracker-result" style="display:none;">
    <div class="sr-result-header">
      <span class="sr-badge-ok">✓ پرونده فعال در شعبه</span>
      <span id="srResCaseNo" class="sr-res-code">کلاسه: ۱۴۰۳-۰۰۱</span>
    </div>
    <div class="sr-result-body">
      <div class="sr-res-row">
        <strong>عنوان دعوی:</strong>
        <span id="srResSubject">مطالبه وجه التزام قراردادی و خسارت تاخیر تادیه</span>
      </div>
      <div class="sr-res-row">
        <strong>آخرین وضعیت:</strong>
        <span id="srResStatus" style="color:#10B981; font-weight:700;">لوایح تکمیلی تقدیم شعبه شد - صدور دادنامه</span>
      </div>
      <div class="sr-res-row">
        <strong>موعد جلسه دادگاه:</strong>
        <span id="srResDate" style="color:#D4AF37; font-weight:700;">۱۵ آبان ۱۴۰۳ - ساعت ۱۰:۳۰ (شعبه ۳۷ تجدیدنظر)</span>
      </div>
    </div>
  </div>
</div>`,
    cssSnippet: `<style>
.sr-tracker-box {
  font-family: 'Vazirmatn', Tahoma, sans-serif;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
  padding: 30px;
  max-width: 760px;
  margin: 20px auto;
  text-align: right;
  color: #1F2937;
}
.sr-tracker-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; border-bottom: 1px solid #F3F4F6; pb: 16px; }
.sr-icon-circle {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  background: #0B132B;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #D4AF37;
  flex-shrink: 0;
}
.sr-tracker-title { font-size: 20px; font-weight: 800; color: #0B132B; margin: 0 0 6px; }
.sr-tracker-desc { font-size: 13px; color: #6B7280; margin: 0; }
.sr-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.sr-label { display: block; font-size: 13px; font-weight: 700; color: #374151; margin-bottom: 6px; }
.sr-input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid #D1D5DB;
  border-radius: 10px;
  font-size: 14px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.2s;
}
.sr-input:focus { border-color: #D4AF37; box-shadow: 0 0 0 3px rgba(212,175,55,0.15); }
.sr-submit-btn {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #0B132B 0%, #16203B 100%);
  color: #F3E5AB;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(11,19,43,0.2);
  transition: transform 0.15s;
}
.sr-submit-btn:hover { opacity: 0.95; }
.sr-tracker-result {
  margin-top: 24px;
  padding: 20px;
  border-radius: 14px;
  background: #F9FAFB;
  border: 1px solid #D4AF37;
}
.sr-result-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E5E7EB; padding-bottom: 12px; margin-bottom: 12px; }
.sr-badge-ok { background: rgba(16,185,129,0.15); color: #059669; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
.sr-res-code { font-family: monospace; font-size: 12px; color: #6B7280; }
.sr-res-row { font-size: 13px; line-height: 2; color: #374151; }
@media (max-width: 600px) { .sr-field-row { grid-template-columns: 1fr; } }
</style>`,
    jsOptional: `<script>
window.srSubmitTracking = function() {
  var res = document.getElementById('srTrackingResult');
  var caseNo = document.getElementById('srCaseNo').value;
  if (res) {
    res.style.display = 'block';
    var codeElem = document.getElementById('srResCaseNo');
    if (codeElem && caseNo) codeElem.innerText = 'کلاسه: ' + caseNo;
    res.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>`
  },
  {
    id: 'quick-access-client-card',
    name: 'کارت پیشخوان دسترسی سریع موکل (Quick Access Hub Widget)',
    category: 'کارتابل موکل و دسترسی سریع',
    description: 'کارت خلاصه وضعیت آخرین پرونده‌ها، اخطاریه‌های دادگاه و مواعد رسیدگی ویژه موکلین دفتر وکالت.',
    elementorGuide: 'در برگه پرتال موکلین با المنتور، این ویجت را در بخش سایدبار یا بالای برگه قرار دهید.',
    gutenbergGuide: 'در گوتنبرگ با بلوک HTML درج نمایید. سازگار با تمامی افزونه‌های پرتال و ممبرشیپ وردپرس.',
    htmlSnippet: `<div class="sr-quick-hub" dir="rtl">
  <div class="sr-hub-top">
    <div class="sr-hub-title-box">
      <span class="sr-hub-badge">پرتال برخط موکل</span>
      <h4 class="sr-hub-h4">خلاصه سریع پرونده و مواعد دادرسی</h4>
    </div>
    <span class="sr-hub-live">● زنده و متصل به ثنا</span>
  </div>

  <div class="sr-hub-grid">
    <!-- ستون ۱: آخرین اقدام -->
    <div class="sr-hub-card sr-card-update">
      <div class="sr-card-h">
        <span>⏱️ آخرین به‌روزرسانی پرونده:</span>
        <span class="sr-mono-pill">کلاسه ۱۴۰۳-۰۸۹</span>
      </div>
      <p class="sr-update-text">لایحه دفاعیه تکمیلی در موضوع ابطال رای داوری با استناد به ماده ۴۸۹ ق.آ.د.م ثبت گردید.</p>
      <div class="sr-card-f">
        <span>اقدام‌کننده: وکیل سرپرست</span>
        <a href="#portal" class="sr-link-gold">مشاهده لایحه ←</a>
      </div>
    </div>

    <!-- ستون ۲: موعد رسیدگی -->
    <div class="sr-hub-card sr-card-session">
      <div class="sr-card-h">
        <span>📅 موعد جلسه دادگاه:</span>
        <span class="sr-mono-pill">شعبه ۲۲ حقوقی</span>
      </div>
      <div class="sr-session-date-box">
        <span class="sr-date-big">۲۲ آبان ۱۴۰۳</span>
        <span class="sr-time-pill">ساعت ۰۹:۱۵ صبح</span>
      </div>
      <div class="sr-card-f">
        <span>دستور جلسه: استماع شهادت شهود</span>
        <a href="#reserve-meeting" class="sr-link-gold">هماهنگی جلسه ←</a>
      </div>
    </div>
  </div>
</div>`,
    cssSnippet: `<style>
.sr-quick-hub {
  font-family: 'Vazirmatn', Tahoma, sans-serif;
  background: #F9FAFB;
  border-radius: 20px;
  border: 1px solid #D4AF37;
  padding: 24px;
  max-width: 820px;
  margin: 15px auto;
  text-align: right;
  color: #1F2937;
}
.sr-hub-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.sr-hub-badge { font-size: 11px; background: rgba(212,175,55,0.15); color: #AA820A; padding: 3px 8px; border-radius: 6px; font-weight: 700; }
.sr-hub-h4 { font-size: 17px; font-weight: 800; color: #0B132B; margin: 4px 0 0; }
.sr-hub-live { font-size: 11px; color: #059669; font-weight: 700; }
.sr-hub-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.sr-hub-card { background: #ffffff; border-radius: 14px; border: 1px solid #E5E7EB; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; }
.sr-card-update { border-right: 4px solid #10B981; }
.sr-card-session { border-right: 4px solid #D4AF37; }
.sr-card-h { display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: #4B5563; margin-bottom: 8px; }
.sr-mono-pill { font-family: monospace; background: #F3F4F6; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
.sr-update-text { font-size: 12px; color: #1F2937; line-height: 1.6; margin: 0 0 12px; }
.sr-session-date-box { background: rgba(212,175,55,0.08); border-radius: 8px; padding: 10px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; }
.sr-date-big { font-size: 14px; font-weight: 800; color: #0B132B; }
.sr-time-pill { font-size: 11px; background: #0B132B; color: #F3E5AB; padding: 2px 8px; border-radius: 4px; }
.sr-card-f { display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 8px; }
.sr-link-gold { color: #AA820A; font-weight: 700; text-decoration: none; }
@media (max-width: 650px) { .sr-hub-grid { grid-template-columns: 1fr; } }
</style>`
  },
  {
    id: 'case-progress-stepper-widget',
    name: 'استپر تصویری مراحل پرونده قضایی (Progress Tracker Stepper)',
    category: 'استعلام و رهگیری پرونده',
    description: 'خط زمان چند مرحله‌ای دادرسی منصفانه شامل فازهای: دادخواست، ارجاع شعبه، کارشناسی، دادرسی و صدور رای.',
    elementorGuide: 'در المنتور به عنوان بخش گزارش پیشرفت در برگه نتایج استعلام قرار دهید.',
    gutenbergGuide: 'در ویرایشگر گوتنبرگ با یک بلوک HTML سفارشی درج کنید.',
    htmlSnippet: `<div class="sr-stepper-wrap" dir="rtl">
  <div class="sr-stepper-header">
    <div>
      <h4 class="sr-stepper-title">ردیاب پیشرفت پرونده کلاسه: ۱۴۰۳-۳۸۲</h4>
      <span class="sr-stepper-sub">مرجع رسیدگی: شعبه ۱۴ دادگاه عمومی حقوقی تهران</span>
    </div>
    <div class="sr-stepper-percent">
      <span>پیشرفت کل:</span>
      <strong>۶۰٪</strong>
    </div>
  </div>

  <div class="sr-stepper-bar">
    <div class="sr-stepper-fill" style="width: 60%;"></div>
  </div>

  <div class="sr-nodes-row">
    <!-- Step 1 -->
    <div class="sr-node completed">
      <div class="sr-node-circle">✓</div>
      <span class="sr-node-label">ثبت دادخواست</span>
      <span class="sr-node-date">۰۱ مهر ۱۴۰۳</span>
    </div>
    <!-- Step 2 -->
    <div class="sr-node completed">
      <div class="sr-node-circle">✓</div>
      <span class="sr-node-label">ارجاع و تعیین وقت</span>
      <span class="sr-node-date">۰۸ مهر ۱۴۰۳</span>
    </div>
    <!-- Step 3 (Current) -->
    <div class="sr-node current">
      <div class="sr-node-circle">۳</div>
      <span class="sr-node-label">جلسه دادرسی و کارشناسی</span>
      <span class="sr-node-date">فاز فعال کنونی</span>
    </div>
    <!-- Step 4 -->
    <div class="sr-node pending">
      <div class="sr-node-circle">۴</div>
      <span class="sr-node-label">اعلام ختم رسیدگی</span>
      <span class="sr-node-date">در نوبت</span>
    </div>
    <!-- Step 5 -->
    <div class="sr-node pending">
      <div class="sr-node-circle">۵</div>
      <span class="sr-node-label">انشای دادنامه و اجرا</span>
      <span class="sr-node-date">مرحله نهایی</span>
    </div>
  </div>
</div>`,
    cssSnippet: `<style>
.sr-stepper-wrap {
  font-family: 'Vazirmatn', Tahoma, sans-serif;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #E5E7EB;
  padding: 24px;
  max-width: 820px;
  margin: 15px auto;
  text-align: right;
}
.sr-stepper-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.sr-stepper-title { font-size: 16px; font-weight: 800; color: #0B132B; margin: 0 0 4px; }
.sr-stepper-sub { font-size: 12px; color: #6B7280; }
.sr-stepper-percent { text-align: left; font-size: 12px; color: #4B5563; }
.sr-stepper-percent strong { font-size: 20px; color: #D4AF37; display: block; }
.sr-stepper-bar { width: 100%; height: 8px; background: #E5E7EB; border-radius: 4px; overflow: hidden; margin-bottom: 24px; }
.sr-stepper-fill { height: 100%; background: linear-gradient(90deg, #10B981, #D4AF37); border-radius: 4px; }
.sr-nodes-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; text-align: center; }
.sr-node { display: flex; flex-direction: column; align-items: center; }
.sr-node-circle {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 8px;
}
.sr-node.completed .sr-node-circle { background: #10B981; color: #ffffff; }
.sr-node.current .sr-node-circle { background: #D4AF37; color: #0B132B; box-shadow: 0 0 0 4px rgba(212,175,55,0.25); }
.sr-node.pending .sr-node-circle { background: #F3F4F6; color: #9CA3AF; border: 1px solid #D1D5DB; }
.sr-node-label { font-size: 11px; font-weight: 700; color: #1F2937; margin-bottom: 2px; }
.sr-node.pending .sr-node-label { color: #9CA3AF; }
.sr-node-date { font-size: 10px; color: #6B7280; }
@media (max-width: 650px) {
  .sr-nodes-row { grid-template-columns: 1fr; gap: 14px; text-align: right; }
  .sr-node { flex-direction: row; gap: 12px; }
  .sr-node-circle { margin-bottom: 0; }
}
</style>`
  },
  {
    id: 'court-fee-calculator-widget',
    name: 'محاسبه‌گر هزینه دادرسی دعاوی مالی (Court Fee Calculator)',
    category: 'محاسبه‌گر و ابزار قضایی',
    description: 'ابزار دقیق محاسبه تمبر مالیاتی و هزینه دادرسی مراحل بدوی (۳.۵٪) و تجدیدنظر (۴.۵٪) بر اساس قانون بودجه و آیین دادرسی مدنی.',
    elementorGuide: 'در المنتور در صفحه ابزارهای حقوقی یا مقالات تخصصی مالی قرار دهید.',
    gutenbergGuide: 'بلوک HTML سفارشی به همراه جاوااسکریپت درون برگه درج نمایید.',
    htmlSnippet: `<div class="sr-calc-card" dir="rtl">
  <div class="sr-calc-h">
    <div class="sr-calc-icon">🧮</div>
    <div>
      <h4 class="sr-calc-title">محاسبه‌گر هوشمند هزینه دادرسی دعاوی مالی</h4>
      <p class="sr-calc-sub">منطبق با نرخ مصوب تعرفه خدمات قضایی سال ۱۴۰۳</p>
    </div>
  </div>

  <div class="sr-calc-form">
    <label class="sr-calc-label">بهای خواسته یا مبلغ مورد مطالبه (تومان):</label>
    <input type="number" id="srClaimAmount" class="sr-calc-input" placeholder="مثال: ۵۰۰۰۰۰۰۰۰" oninput="window.srCalcCourtFees()" />

    <div class="sr-calc-row">
      <label><input type="radio" name="srCourtStage" value="badvi" checked onchange="window.srCalcCourtFees()"> مرحله بدوی (۳.۵٪ مازاد بر ۲۰ میلیون)</label>
      <label><input type="radio" name="srCourtStage" value="tajdid" onchange="window.srCalcCourtFees()"> مرحله تجدیدنظر (۴.۵٪)</label>
    </div>
  </div>

  <div class="sr-calc-res-box">
    <div class="sr-res-metric">
      <span class="sr-m-lbl">هزینه دادرسی تقریبی:</span>
      <span id="srFeeResult" class="sr-m-val">۰ تومان</span>
    </div>
    <div class="sr-res-metric">
      <span class="sr-m-lbl">تمبر مالیاتی وکالت (ماده ۱۰۳):</span>
      <span id="srTaxResult" class="sr-m-val">۰ تومان</span>
    </div>
  </div>
</div>`,
    cssSnippet: `<style>
.sr-calc-card {
  font-family: 'Vazirmatn', Tahoma, sans-serif;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #D4AF37;
  padding: 24px;
  max-width: 680px;
  margin: 15px auto;
  text-align: right;
  box-shadow: 0 8px 24px rgba(212,175,55,0.1);
}
.sr-calc-h { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; border-bottom: 1px solid #F3F4F6; padding-bottom: 14px; }
.sr-calc-icon { width: 44px; height: 44px; background: #0B132B; color: #D4AF37; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
.sr-calc-title { font-size: 17px; font-weight: 800; color: #0B132B; margin: 0 0 4px; }
.sr-calc-sub { font-size: 12px; color: #6B7280; margin: 0; }
.sr-calc-label { display: block; font-size: 13px; font-weight: 700; color: #374151; margin-bottom: 6px; }
.sr-calc-input { width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #D1D5DB; border-radius: 10px; font-size: 14px; margin-bottom: 14px; font-family: inherit; }
.sr-calc-row { display: flex; gap: 20px; font-size: 13px; color: #4B5563; margin-bottom: 18px; }
.sr-calc-res-box { background: #0B132B; border-radius: 14px; padding: 16px 20px; color: #ffffff; display: flex; justify-content: space-around; gap: 16px; }
.sr-res-metric { text-align: center; }
.sr-m-lbl { display: block; font-size: 12px; color: #9CA3AF; margin-bottom: 4px; }
.sr-m-val { font-size: 17px; font-weight: 900; color: #D4AF37; font-family: Tahoma, monospace; }
@media (max-width: 500px) { .sr-calc-res-box { flex-direction: column; text-align: right; } .sr-res-metric { text-align: right; } }
</style>`,
    jsOptional: `<script>
window.srCalcCourtFees = function() {
  var val = parseFloat(document.getElementById('srClaimAmount').value) || 0;
  var stage = document.querySelector('input[name="srCourtStage"]:checked').value;
  var fee = 0;
  if (val > 0) {
    if (stage === 'badvi') {
      if (val <= 20000000) fee = val * 0.025;
      else fee = (20000000 * 0.025) + ((val - 20000000) * 0.035);
    } else {
      fee = val * 0.045;
    }
  }
  var tax = fee * 0.05;
  document.getElementById('srFeeResult').innerText = Math.round(fee).toLocaleString('fa-IR') + ' تومان';
  document.getElementById('srTaxResult').innerText = Math.round(tax).toLocaleString('fa-IR') + ' تومان';
};
</script>`
  },
  {
    id: 'booking-appointment-card',
    name: 'فرم رزرو نوبت مشاوره حقوقی حضوری و تلفنی (Appointment Card)',
    category: 'رزرو و تماس',
    description: 'کارت نوبت‌دهی مشاوره با فرم فیلدهای تاریخ، نوع جلسه (حضوری، آنلاین، تلفنی) و اتصال به درگاه وردپرس.',
    elementorGuide: 'در المنتور در ستون تماس با ما یا برگه رزرو مشاوره قرار دهید.',
    gutenbergGuide: 'با بلوک Custom HTML در برگه مشاوره وردپرس کپی نمایید.',
    htmlSnippet: `<div class="sr-booking-card" dir="rtl">
  <div class="sr-book-badge">هماهنگی فوری و محرمانه</div>
  <h3 class="sr-book-title">درخواست مشاوره تخصصی با وکیل</h3>
  <p class="sr-book-desc">جهت تعیین وقت حضوری در دفتر سعادت‌آباد یا مشاوره تلفنی فوری، اطلاعات زیر را ثبت فرمایید.</p>

  <form id="srBookingForm" onsubmit="event.preventDefault(); alert('درخواست مشاوره شما با موفقیت ثبت شد. همکاران دفتر تا ۲۰ دقیقه آینده با شما تماس خواهند گرفت.');">
    <div class="sr-b-grid">
      <div>
        <label class="sr-b-lbl">نام و نام خانوادگی:</label>
        <input type="text" class="sr-b-in" placeholder="مثال: علیرضا محمدی" required />
      </div>
      <div>
        <label class="sr-b-lbl">شماره تماس مستقیم:</label>
        <input type="tel" class="sr-b-in" placeholder="۰۹۱۲۳۴۵۶۷۸۹" required />
      </div>
    </div>

    <div class="sr-b-grid">
      <div>
        <label class="sr-b-lbl">نوع مشاوره مورد نظر:</label>
        <select class="sr-b-in">
          <option>مشاوره حضوری در دفتر وکالت</option>
          <option>مشاوره تلفنی تخصصی (فوری)</option>
          <option>مشاوره ویدئوکنفرانس بین‌المللی</option>
          <option>بررسی و داوری اسناد تجاری و ملکی</option>
        </select>
      </div>
      <div>
        <label class="sr-b-lbl">موضوع پرونده:</label>
        <select class="sr-b-in">
          <option>دعاوی ملکی و سرقفلی</option>
          <option>شرکت‌ها و قراردادهای تجاری</option>
          <option>داوری و مطالبات مالی</option>
          <option>امور گمرکی و بازرگانی</option>
          <option>سایر دعاوی حقوقی و کیفری</option>
        </select>
      </div>
    </div>

    <button type="submit" class="sr-b-btn">ثبت نوبت مشاوره حقوقی</button>
  </form>
</div>`,
    cssSnippet: `<style>
.sr-booking-card {
  font-family: 'Vazirmatn', Tahoma, sans-serif;
  background: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);
  border-radius: 24px;
  border: 1px solid rgba(212,175,55,0.4);
  padding: 32px;
  max-width: 720px;
  margin: 15px auto;
  text-align: right;
  box-shadow: 0 15px 35px rgba(0,0,0,0.06);
}
.sr-book-badge { display: inline-block; background: rgba(212,175,55,0.15); color: #AA820A; padding: 4px 12px; border-radius: 50px; font-size: 12px; font-weight: 700; margin-bottom: 12px; }
.sr-book-title { font-size: 22px; font-weight: 900; color: #0B132B; margin: 0 0 8px; }
.sr-book-desc { font-size: 13px; color: #6B7280; line-height: 1.7; margin: 0 0 20px; }
.sr-b-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
.sr-b-lbl { display: block; font-size: 12px; font-weight: 700; color: #374151; margin-bottom: 5px; }
.sr-b-in { width: 100%; box-sizing: border-box; padding: 11px 13px; border: 1px solid #D1D5DB; border-radius: 10px; font-size: 13px; font-family: inherit; outline: none; }
.sr-b-in:focus { border-color: #D4AF37; box-shadow: 0 0 0 3px rgba(212,175,55,0.15); }
.sr-b-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #D4AF37 0%, #AA820A 100%); color: #0B132B; font-size: 15px; font-weight: 800; border: none; border-radius: 12px; cursor: pointer; margin-top: 10px; transition: opacity 0.2s; }
.sr-b-btn:hover { opacity: 0.92; }
@media (max-width: 600px) { .sr-b-grid { grid-template-columns: 1fr; } }
</style>`
  }
];

export const INTEGRATION_GUIDE_MARKDOWN = `# راهنمای جامع اتصال فرانت‌اند ری‌اکت به وردپرس
## اتصال از طریق WordPress REST API و WP-GraphQL

این مستند راهنمای فنی گام‌به‌گام برای برقراری ارتباط بین کامپوننت‌های مدرن ری‌اکت و هسته وردپرس از طریق APIهای استاندارد است.

---

### بخش ۱: نقشه راه معماری (Architecture Roadmap)

\`\`\`
┌─────────────────────────────────┐               ┌───────────────────────────────────┐
│     React Frontend (Vite)       │               │      WordPress Backend (PHP)      │
│                                 │  REST API     │                                   │
│  • Custom Hooks (useWpPost,...) ├──────────────►│  • /wp-json/wp/v2/posts           │
│  • Apollo / GraphQL Client      │  (JSON / JWT) │  • /wp-json/sedrazavi/v1/cases    │
│  • UI Components (Snippets)     │               │  • /graphql (WP-GraphQL Plugin)   │
└─────────────────────────────────┘               └───────────────────────────────────┘
\`\`\`

---

### بخش ۲: اندپوینت‌های استاندارد REST API در این پوسته

افزونه هسته (\`sedrazavi-addons.php\`) به صورت خودکار اندپوینت‌های زیر را در وردپرس رجیستر می‌کند:

1. **استعلام وضعیت پرونده:**
   \`POST /wp-json/sedrazavi/v1/track-case\`
   - پارامترها: \`case_number\` (اجباری)، \`client_phone\` (اجباری)
2. **دریافت فهرست خدمات حقوقی:**
   \`GET /wp-json/wp/v2/lawyer_service?per_page=20\`
3. **دریافت مقالات و دسته‌بندی‌ها:**
   \`GET /wp-json/wp/v2/posts?_embed\`
4. **ثبت درخواست رزرو نوبت:**
   \`POST /wp-json/sedrazavi/v1/book-appointment\`

---

### بخش ۳: هوک‌های اختصاصی ری‌اکت (Custom React Hooks)

برای برقراری ارتباط پایدار، این هوک آماده را در پروژه ری‌اکت خود کپی کنید:

\`\`\`typescript
// src/hooks/useWordPressApi.ts
import { useState, useEffect } from 'react';

export interface WpPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
}

export function useWordPressPosts(endpoint = '/wp-json/wp/v2/posts') {
  const [posts, setPosts] = useState<WpPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const baseUrl = (window as any).SedRazaviWPConfig?.siteUrl || 'https://yoursite.com';
    fetch(\`\${baseUrl}\${endpoint}?per_page=10&_embed\`)
      .then(res => {
        if (!res.ok) throw new Error('خطا در اتصال به وردپرس');
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [endpoint]);

  return { posts, loading, error };
}

// هوک استعلام آنلاین پرونده قضایی
export function useCaseTracker() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const trackCase = async (caseNumber: string, phone: string) => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = (window as any).SedRazaviWPConfig?.siteUrl || '';
      const response = await fetch(\`\${baseUrl}/wp-json/sedrazavi/v1/track-case\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_number: caseNumber, phone }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'پرونده یافت نشد');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { trackCase, result, loading, error };
}
\`\`\`

---

### بخش ۴: اتصال با WP-GraphQL (رویکرد مدرن Headless)

اگر در وردپرس از افزونه رایگان **WP-GraphQL** استفاده می‌کنید:

1. افزونه **WP-GraphQL** را از مخزن وردپرس نصب و فعال کنید.
2. از هوک زیر با کلاینت \`@apollo/client\` یا \`urql\` استفاده کنید:

\`\`\`graphql
query GetLawyerCases {
  cases(first: 10) {
    nodes {
      id
      title
      caseDetails {
        caseNumber
        courtBranch
        currentStage
        nextSessionDate
      }
    }
  }
}
\`\`\`

---

### بخش ۵: تنظیمات امنیتی CORS در وردپرس

در فایل \`functions.php\` قالب کد زیر قرار داده شده تا درخواست‌های ری‌اکت مسدود نشوند:

\`\`\`php
add_action('init', function() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce");
});
\`\`\`
`;
