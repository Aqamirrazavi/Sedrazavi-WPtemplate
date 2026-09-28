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
  Eye,
  Monitor,
  Smartphone
} from 'lucide-react';
import {
  HTML_CSS_SNIPPETS_CATALOG,
  SnippetItem,
  INTEGRATION_GUIDE_MARKDOWN,
} from '../data/htmlCssSnippetsCatalog';

export const HtmlCssExportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'snippets' | 'integration_guide'>('snippets');
  const [selectedSnippet, setSelectedSnippet] = useState<SnippetItem>(HTML_CSS_SNIPPETS_CATALOG[0]);
  const [copiedType, setCopiedType] = useState<'combined' | 'html' | 'css' | 'guide' | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('همه');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const categories = ['همه', 'هیرو و سربرگ', 'استعلام و رهگیری پرونده', 'کارتابل موکل و دسترسی سریع', 'محاسبه‌گر و ابزار قضایی', 'رزرو و تماس'];

  const filteredSnippets = HTML_CSS_SNIPPETS_CATALOG.filter((s) => {
    const matchesCat = activeCategory === 'همه' || s.category === activeCategory;
    const matchesSearch = s.name.includes(searchTerm) || s.description.includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  const getCombinedCode = (s: SnippetItem) => {
    return `<!-- ==========================================
  بلاک اختصاصی: ${s.name}
  بهینه‌شده برای المنتور (Custom HTML) و گوتنبرگ وردپرس
========================================== -->
${s.cssSnippet}

${s.htmlSnippet}
${s.jsOptional ? `\n${s.jsOptional}` : ''}`;
  };

  const copyToClipboard = (text: string, type: 'combined' | 'html' | 'css' | 'guide') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const downloadGuideFile = () => {
    const blob = new Blob([INTEGRATION_GUIDE_MARKDOWN], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SedRazavi-WordPress-REST-API-Integration-Guide.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAllSnippetsBundle = () => {
    let bundle = `/* ==========================================================================
   مجموعه کدهای استخراج‌شده HTML/CSS قالـب سـید رضـوی
   ویژه بارگذاری در ویجت‌های المنتور و گوتنبرگ وردپرس
========================================================================== */\n\n`;

    HTML_CSS_SNIPPETS_CATALOG.forEach((s) => {
      bundle += `\n/****************************************************************************\n * ${s.name} (${s.category})\n ****************************************************************************/\n`;
      bundle += getCombinedCode(s) + '\n\n';
    });

    const blob = new Blob([bundle], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SedRazavi-Elementor-HTML-CSS-Snippets.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fadeIn text-right font-persian">
      <div className="bg-white dark:bg-[#0B132B] w-full max-w-6xl max-h-[92vh] rounded-3xl border border-[#D4AF37]/50 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-[#0E1736] dark:via-[#0B132B] dark:to-[#070D1E]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] text-[#0B132B] shadow-md shadow-[#D4AF37]/30">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-serif text-[#0B132B] dark:text-white">
                  ابزار استخراج کدهای HTML و CSS ویژه المنتور و گوتنبرگ وردپرس
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                  حل ۱۰۰٪ مشکل نصب
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                کپی-پیست مستقیم اجزای بصری به عنوان ویجت HTML در المنتور + سند راهنمای اتصال به REST API و WP-GraphQL
              </p>
            </div>
          </div>

          {/* Action Tabs & Close */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-800">
              <button
                onClick={() => setActiveTab('snippets')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'snippets'
                    ? 'bg-[#D4AF37] text-[#0B132B] shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>کدهای آماده HTML / CSS</span>
              </button>

              <button
                onClick={() => setActiveTab('integration_guide')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'integration_guide'
                    ? 'bg-[#0B132B] dark:bg-[#1E293B] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>سند راهنمای REST API & GraphQL</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {activeTab === 'snippets' ? (
            <div className="space-y-6">
              
              {/* Category Filter & Global Download */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-gray-50 dark:bg-[#070D1E]/80 p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        activeCategory === cat
                          ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B]'
                          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={downloadAllSnippetsBundle}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-xs font-bold hover:brightness-110 flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>دانلود تمام اسنیپت‌ها (یک فایل HTML)</span>
                  </button>
                </div>
              </div>

              {/* Two Column Layout: Snippet List & Live Preview/Code */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Sidebar: Snippet Cards List (4 Cols) */}
                <div className="lg:col-span-4 space-y-3 max-h-[550px] overflow-y-auto pr-1">
                  {filteredSnippets.map((s) => {
                    const isSelected = selectedSnippet.id === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setSelectedSnippet(s)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#D4AF37]/15 dark:bg-[#D4AF37]/20 border-[#D4AF37] ring-2 ring-[#D4AF37]/30 shadow-md'
                            : 'bg-white dark:bg-[#0E1736] border-gray-200 dark:border-gray-800 hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold">
                            {s.category}
                          </span>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            المنتور + گوتنبرگ
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                          {s.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Right Area: Selected Snippet Code & Previews (8 Cols) */}
                <div className="lg:col-span-8 space-y-4">
                  
                  {/* Selected Card Header */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0E1736] border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-3">
                      <div>
                        <h4 className="text-base font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                          <span>{selectedSnippet.name}</span>
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {selectedSnippet.description}
                        </p>
                      </div>

                      {/* Primary Quick Copy Button */}
                      <button
                        onClick={() => copyToClipboard(getCombinedCode(selectedSnippet), 'combined')}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-black text-xs hover:brightness-110 shadow-md shadow-[#D4AF37]/30 flex items-center gap-2 shrink-0 transition-all cursor-pointer"
                      >
                        {copiedType === 'combined' ? (
                          <>
                            <Check className="w-4 h-4 stroke-[3]" />
                            <span>کد کپی شد! آماده چسباندن در وردپرس</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>کپی کل کد یکجا (HTML + CSS)</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Instructions for Elementor & Gutenberg */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-300">
                        <strong className="block mb-1 font-bold">نحوه استفاده در المنتور (Elementor):</strong>
                        <span>{selectedSnippet.elementorGuide}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-900 dark:text-blue-300">
                        <strong className="block mb-1 font-bold">نحوه استفاده در گوتنبرگ (Gutenberg):</strong>
                        <span>{selectedSnippet.gutenbergGuide}</span>
                      </div>
                    </div>
                  </div>

                  {/* Live Render Preview Box */}
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-100 dark:bg-[#070D1E]">
                    <div className="p-3 bg-gray-200/70 dark:bg-[#0A1024] border-b border-gray-300 dark:border-gray-800 flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="font-bold">پیش‌نمایش زنده در مرورگر (Live HTML Sandbox)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPreviewMode('desktop')}
                          className={`p-1.5 rounded-lg ${previewMode === 'desktop' ? 'bg-white dark:bg-gray-800 text-[#D4AF37]' : 'text-gray-400'}`}
                          title="نمای دسکتاپ"
                        >
                          <Monitor className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setPreviewMode('mobile')}
                          className={`p-1.5 rounded-lg ${previewMode === 'mobile' ? 'bg-white dark:bg-gray-800 text-[#D4AF37]' : 'text-gray-400'}`}
                          title="نمای موبایل"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 overflow-x-auto flex justify-center">
                      <div
                        className={`w-full transition-all ${previewMode === 'mobile' ? 'max-w-sm border border-gray-400 dark:border-gray-700 rounded-2xl p-2 bg-white dark:bg-[#0B132B]' : 'max-w-full'}`}
                        dangerouslySetInnerHTML={{
                          __html: `${selectedSnippet.cssSnippet}\n${selectedSnippet.htmlSnippet}\n${selectedSnippet.jsOptional || ''}`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Code Viewer Accordion / Display */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
                      <span>کدهای تفکیک‌شده:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(selectedSnippet.htmlSnippet, 'html')}
                          className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:text-[#D4AF37] text-[11px] transition-colors"
                        >
                          {copiedType === 'html' ? '✓ کپی شد' : 'کپی فقط HTML'}
                        </button>
                        <button
                          onClick={() => copyToClipboard(selectedSnippet.cssSnippet, 'css')}
                          className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:text-[#D4AF37] text-[11px] transition-colors"
                        >
                          {copiedType === 'css' ? '✓ کپی شد' : 'کپی فقط CSS'}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#0B132B] border border-gray-800 p-4 font-mono text-xs text-gray-200 dir-ltr max-h-56 overflow-y-auto scrollbar-thin">
                      <pre className="whitespace-pre-wrap leading-relaxed">
                        {getCombinedCode(selectedSnippet)}
                      </pre>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          ) : (
            /* Integration Guide View */
            <div className="space-y-6">
              
              {/* Guide Header Banner */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#0E1736] to-[#070D1E] text-white border border-[#D4AF37]/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/40">
                    <Database className="w-3.5 h-3.5" />
                    <span>مستند فنی اتصال فرانت‌اند ری‌اکت به وردپرس</span>
                  </div>
                  <h3 className="text-xl font-bold font-serif text-[#F3E5AB]">
                    سند جامع اتصال فرانت‌اند ری‌اکت به REST API و WP-GraphQL وردپرس
                  </h3>
                  <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                    این مستند شامل هوک‌های سفارشی ری‌اکت (Custom React Hooks)، اندپوینت‌های پرونده‌ها و مقالات، رفع خطای CORS و کوئری‌های GraphQL برای معماری Headless است.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={downloadGuideFile}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-bold text-xs hover:brightness-110 flex items-center gap-2 shadow-md transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>دانلود فایل راهنما (Markdown)</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(INTEGRATION_GUIDE_MARKDOWN, 'guide')}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5"
                  >
                    {copiedType === 'guide' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedType === 'guide' ? 'متن کپی شد' : 'کپی متن'}</span>
                  </button>
                </div>
              </div>

              {/* Guide Contents */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0E1736] border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200 space-y-6 leading-relaxed">
                
                {/* Step 1 */}
                <div className="space-y-3 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#D4AF37] text-[#0B132B] font-black text-sm flex items-center justify-center">۱</span>
                    <h4 className="text-base font-bold text-[#0B132B] dark:text-white">
                      اندپوینت‌های فعال REST API در قالب و افزونه وردپرس
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    افزونه مکمل <code className="font-mono text-emerald-500">sedrazavi-addons.php</code> به صورت پیش‌فرض اندپوینت‌های زیر را در هسته وردپرس فعال می‌کند:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono dir-ltr">
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <span className="text-emerald-500 font-bold">POST</span> /wp-json/sedrazavi/v1/track-case
                      <p className="font-sans text-[11px] text-gray-500 mt-1 dir-rtl">استعلام آنی پرونده با کلاسه و شماره موبایل</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <span className="text-blue-500 font-bold">GET</span> /wp-json/wp/v2/posts?_embed
                      <p className="font-sans text-[11px] text-gray-500 mt-1 dir-rtl">دریافت آخرین مقالات و دسته‌بندی‌ها</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <span className="text-emerald-500 font-bold">POST</span> /wp-json/sedrazavi/v1/book-appointment
                      <p className="font-sans text-[11px] text-gray-500 mt-1 dir-rtl">ثبت رزرو نوبت مشاوره حقوقی حضوری یا تلفنی</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                      <span className="text-purple-500 font-bold">POST</span> /graphql
                      <p className="font-sans text-[11px] text-gray-500 mt-1 dir-rtl">پشتیبانی از افزونه رسمی WP-GraphQL</p>
                    </div>
                  </div>
                </div>

                {/* Step 2: Custom React Hooks */}
                <div className="space-y-3 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-sm flex items-center justify-center">۲</span>
                    <h4 className="text-base font-bold text-[#0B132B] dark:text-white">
                      هوک‌های سفارشی ری‌اکت (Custom React Hooks)
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    برای اتصال مستقیم اپلیکیشن ری‌اکت خود به دیتابیس وردپرس بدون درگیر شدن با کدهای پیچیده، این هوک آماده را استفاده نمایید:
                  </p>

                  <div className="rounded-2xl bg-[#0B132B] border border-gray-800 p-4 font-mono text-xs text-gray-200 dir-ltr max-h-72 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">{`// src/hooks/useWordPressApi.ts
import { useState, useEffect } from 'react';

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
}`}</pre>
                  </div>
                </div>

                {/* Step 3: WP-GraphQL Query */}
                <div className="space-y-3 pb-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-500 text-white font-black text-sm flex items-center justify-center">۳</span>
                    <h4 className="text-base font-bold text-[#0B132B] dark:text-white">
                      اتصال با WP-GraphQL در حالت Headless
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    اگر افزونه رایگان <strong>WP-GraphQL</strong> را روی وردپرس نصب دارید، کوئری زیر تمامی پرونده‌ها و جلسات را یکجا با بیشترین سرعت دریافت می‌کند:
                  </p>

                  <div className="rounded-2xl bg-[#0B132B] border border-gray-800 p-4 font-mono text-xs text-gray-200 dir-ltr">
                    <pre className="whitespace-pre-wrap">{`query GetLawyerCases {
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
}`}</pre>
                  </div>
                </div>

                {/* Step 4: CORS Support */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-blue-500 text-white font-black text-sm flex items-center justify-center">۴</span>
                    <h4 className="text-base font-bold text-[#0B132B] dark:text-white">
                      پشتیبانی خودکار از CORS در پوسته
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    هدرهای مجاز CORS در فایل <code className="font-mono text-[#D4AF37]">functions.php</code> به صورت پیش‌فرض فعال هستند تا ریکوئست‌های ری‌اکت از دامنه‌های دیگر هرگز با خطای بلاک مواجه نشوند.
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#070D1E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>تمامی کدهای HTML و CSS بر اساس متغیرهای پالت و استانداردهای وردپرس تمیز شده‌اند.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold hover:bg-gray-300 transition-colors"
            >
              بستن پنجره
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
