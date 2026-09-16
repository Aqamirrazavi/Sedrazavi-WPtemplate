import React, { useState } from 'react';
import {
  Lock,
  Shield,
  FileCheck2,
  FileText,
  Upload,
  Search,
  KeyRound,
  CheckCircle2,
  Download,
  Eye,
  Trash2,
  Fingerprint,
  Sparkles,
  Printer,
  Copy,
  Check,
  FolderLock,
  FileCode,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import { CLIENT_VAULT_DOCUMENTS_DATA } from '../../data/mockData';
import { ClientVaultDocument } from '../../types/theme';

export const EncryptedLegalVault: React.FC = () => {
  const [documents, setDocuments] = useState<ClientVaultDocument[]>(CLIENT_VAULT_DOCUMENTS_DATA);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const [selectedDoc, setSelectedDoc] = useState<ClientVaultDocument | null>(documents[0] || null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // وضعیت فرم آپلود سریع سند جدید
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<ClientVaultDocument['category']>('اسناد مالکیت');
  const [newConfidentiality, setNewConfidentiality] = useState<ClientVaultDocument['confidentialityLevel']>('محرمانه موکل');
  const [newCaseCode, setNewCaseCode] = useState<string>('CASE-1403-');
  const [newNotes, setNewNotes] = useState<string>('');

  const categories = ['همه', 'اسناد مالکیت', 'اسناد تجاری و چک', 'قراردادها', 'ادله صوتی و دیجیتال', 'آراء و اوراق قضایی'];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'همه' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.includes(searchQuery) ||
      doc.caseTrackingCode.includes(searchQuery) ||
      doc.sha256Hash.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    // ایجاد یک هش SHA-256 شبیه‌سازی‌شده تصادفی
    const randomHex = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');

    const newDoc: ClientVaultDocument = {
      id: `doc-v-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      fileType: newCategory === 'ادله صوتی و دیجیتال' ? 'audio' : 'pdf',
      fileSize: '۳.۱ مگابایت',
      uploadDate: 'امروز - ثبت سیستمی',
      sha256Hash: randomHex,
      confidentialityLevel: newConfidentiality,
      caseTrackingCode: newCaseCode || 'CASE-1403-AUTO',
      lawyerCertified: true,
      notes: newNotes || 'سند جدید با موفقیت رمزنگاری و به گاوصندوق امن موکل الصاق گردید.',
    };

    setDocuments([newDoc, ...documents]);
    setSelectedDoc(newDoc);
    setIsUploading(false);
    setNewTitle('');
    setNewNotes('');
  };

  const getConfidentialityBadge = (level: ClientVaultDocument['confidentialityLevel']) => {
    switch (level) {
      case 'فوق‌سری دادگاه':
        return 'bg-rose-500/10 text-rose-500 border-rose-500/30';
      case 'امتیاز محرمانگی دفاع':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      case 'محرمانه موکل':
        return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/30';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* هدر بخش گاوصندوق اسناد */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <FolderLock className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-black font-serif text-slate-900 dark:text-white">
                گاوصندوق دیجیتال و رمزنگاری‌شده اسناد و اوراق قضایی (Legal Vault)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              نگهداری امن اسناد مالکیت، چک‌های تضمین و ادله اثباتی با تولید اثر انگشت دیجیتال SHA-256 تحت استانداردهای Chain of Custody جهت ارائه به دادگاه.
            </p>
          </div>

          {/* دکمه بارگذاری سند جدید */}
          <button
            onClick={() => setIsUploading(!isUploading)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#D4AF37] hover:bg-[#b8952b] text-slate-950 font-black text-xs shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Upload className="w-4 h-4" /> بارگذاری سند امن در گاوصندوق
          </button>
        </div>

        {/* جستجوگر و فیلترهای موضوعی */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="جستجو بر اساس عنوان سند، کد پیگیری پرونده یا هش SHA-256..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070D1E] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* فرم بازشونده آپلود */}
        {isUploading && (
          <form
            onSubmit={handleUploadSubmit}
            className="p-5 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border-2 border-dashed border-[#D4AF37]/50 space-y-4 animate-in fade-in duration-300"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#D4AF37]" /> مشخصات سند جدید جهت رمزنگاری و ثبت در زنجیره ادله:
              </span>
              <button
                type="button"
                onClick={() => setIsUploading(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                انصراف
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">عنوان سند:</label>
                <input
                  type="text"
                  required
                  placeholder="مثلاً: سند تک‌برگ ملک فرمانیه"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">دسته‌بندی:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-xs font-bold"
                >
                  <option value="اسناد مالکیت">اسناد مالکیت</option>
                  <option value="اسناد تجاری و چک">اسناد تجاری و چک</option>
                  <option value="قراردادها">قراردادها</option>
                  <option value="ادله صوتی و دیجیتال">ادله صوتی و دیجیتال</option>
                  <option value="آراء و اوراق قضایی">آراء و اوراق قضایی</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">سطح محرمانگی:</label>
                <select
                  value={newConfidentiality}
                  onChange={(e) => setNewConfidentiality(e.target.value as any)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-xs font-bold"
                >
                  <option value="عادی">عادی</option>
                  <option value="محرمانه موکل">محرمانه موکل</option>
                  <option value="امتیاز محرمانگی دفاع">امتیاز محرمانگی دفاع</option>
                  <option value="فوق‌سری دادگاه">فوق‌سری دادگاه</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-500">کلاسه / کد پیگیری پرونده:</label>
                <input
                  type="text"
                  placeholder="CASE-1403-..."
                  value={newCaseCode}
                  onChange={(e) => setNewCaseCode(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-xs font-bold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500">توضیحات و نکات استنادی وکیل:</label>
              <textarea
                rows={2}
                placeholder="توضیح وضعیت اصالت سند، تاییدیه ثنا یا استعلامات مربوطه..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B132B] text-xs"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                تولید هش SHA-256 و ذخیره در گاوصندوق
              </button>
            </div>
          </form>
        )}
      </div>

      {/* دو ستون: فهرست اسناد + کارنامه اصالت سند انتخاب‌شده */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ستون راست: لیست اسناد */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-bold text-slate-500 block px-1">
            اسناد ثبت‌شده در گاوصندوق ({filteredDocs.length} فقره سند):
          </span>

          <div className="space-y-3">
            {filteredDocs.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-500/5 dark:bg-indigo-500/10 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                      : 'bg-white dark:bg-[#0B132B] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="p-2.5 rounded-xl bg-slate-100 dark:bg-[#070D1E] text-slate-700 dark:text-slate-300 shrink-0">
                        {doc.fileType === 'audio' ? (
                          <Fingerprint className="w-5 h-5 text-purple-500" />
                        ) : (
                          <FileText className="w-5 h-5 text-[#D4AF37]" />
                        )}
                      </span>
                      <div className="space-y-1">
                        <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                          {doc.title}
                        </h5>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                          <span>{doc.category}</span>
                          <span>•</span>
                          <span className="font-mono">{doc.fileSize}</span>
                          <span>•</span>
                          <span>{doc.uploadDate}</span>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-md border text-[10px] font-bold shrink-0 ${getConfidentialityBadge(
                        doc.confidentialityLevel
                      )}`}
                    >
                      {doc.confidentialityLevel}
                    </span>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="truncate max-w-[240px]">هش: {doc.sha256Hash}</span>
                    <span className="text-emerald-500 flex items-center gap-1 font-sans font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> تایید وکیل
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ستون چپ: گواهی اصالت و جزئیات سند انتخاب‌شده */}
        <div className="lg:col-span-6">
          {selectedDoc ? (
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 sticky top-24">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-bold text-emerald-500">
                      گواهی اصالت سند و زنجیره حفاظت از ادله (Chain of Custody)
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">
                    {selectedDoc.title}
                  </h4>
                </div>

                <button
                  onClick={() => window.print()}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="چاپ گواهی اصالت"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>

              {/* کارت هش SHA-256 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Fingerprint className="w-4 h-4 text-[#D4AF37]" />
                    اثر انگشت رمزنگاری‌شده (SHA-256 Hash Digest):
                  </span>
                  <button
                    onClick={() => handleCopyHash(selectedDoc.sha256Hash)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-500 hover:text-indigo-600"
                  >
                    {copiedHash === selectedDoc.sha256Hash ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" /> کپی شد
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> کپی هش
                      </>
                    )}
                  </button>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs break-all leading-relaxed dir-ltr text-left select-all">
                  {selectedDoc.sha256Hash}
                </div>
                <span className="text-[11px] text-slate-400 block">
                  این شناسه یکتای ریاضیاتی ضامن عدم تغییر حتی یک بایت از محتوای سند از زمان بارگذاری تا ارائه به کارشناسی است.
                </span>
              </div>

              {/* مشخصات امنیتی و ثبتی سند */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-400 block">کد پرونده ثنا:</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    {selectedDoc.caseTrackingCode}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-400 block">سطح محرمانگی:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {selectedDoc.confidentialityLevel}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-400 block">تاریخ ثبت در گاوصندوق:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {selectedDoc.uploadDate}
                  </span>
                </div>
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-slate-400 block">تاییدیه اصالت وکیل:</span>
                  <span className="font-bold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> مهر دیجیتال فعال
                  </span>
                </div>
              </div>

              {/* یادداشت تخصصی وکیل */}
              <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                <span className="font-bold text-amber-700 dark:text-[#D4AF37] block">
                  نظریه حقوقی سرکار خانم دکتر سیده مریم رضوی:
                </span>
                <p className="leading-relaxed">{selectedDoc.notes}</p>
              </div>

              {/* دکمه‌های اقدام */}
              <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => {
                    alert(`سند "${selectedDoc.title}" به صورت رمزنگاری‌شده بازگشایی شد.`);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 transition-all active:scale-95"
                >
                  <Eye className="w-4 h-4" /> پیش‌نمایش امن سند
                </button>
                <button
                  onClick={() => {
                    alert(`گواهی رسمی عدم دستکاری و زنجیره اعتبار (E-Discovery) برای پرونده ${selectedDoc.caseTrackingCode} صادر گردید.`);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all active:scale-95"
                >
                  <Download className="w-4 h-4" /> دریافت گواهی E-Discovery
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center text-slate-400 text-xs">
              یک سند را از فهرست انتخاب کنید تا مشخصات رمزنگاری و اصالت آن نمایش یابد.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
