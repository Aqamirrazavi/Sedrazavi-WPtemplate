import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Scale,
  Copy,
  Check,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Bookmark,
  FileCheck2,
  Filter,
} from 'lucide-react';
import { SUPREME_COURT_PRECEDENTS_DATA } from '../../data/mockData';
import { SupremeCourtPrecedent } from '../../types/theme';

export const SupremeCourtPrecedentsHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedPrecedentId, setCopiedPrecedentId] = useState<string | null>(null);
  const [activePrecedent, setActivePrecedent] = useState<SupremeCourtPrecedent>(SUPREME_COURT_PRECEDENTS_DATA[0]);

  const categories = [
    { id: 'all', label: 'همه آراء' },
    { id: 'ملکی و ثبتی', label: 'ملکی و ثبتی' },
    { id: 'حقوق بانکی و خسارت تاخیر', label: 'بانکی و تاخیر تادیه' },
    { id: 'اسناد تجاری و تعهدات', label: 'اسناد تجاری و چک' },
    { id: 'خانواده و ارث', label: 'خانواده و ارث' },
    { id: 'کیفری و جرایم رایانه‌ای', label: 'کیفری و اقتصادی' },
  ];

  const filteredPrecedents = SUPREME_COURT_PRECEDENTS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      p.title.includes(searchTerm) ||
      p.number.includes(searchTerm) ||
      p.shortSummary.includes(searchTerm) ||
      p.keyTakeaway.includes(searchTerm) ||
      p.legalCitations.some((c) => c.includes(searchTerm));
    return matchesCategory && matchesSearch;
  });

  const handleCopyCitation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrecedentId(id);
    setTimeout(() => setCopiedPrecedentId(null), 2000);
  };

  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-100">
      {/* هدر پایگاه آراء وحدت رویه */}
      <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
                <Scale className="w-5 h-5" />
              </span>
              <h3 className="text-lg sm:text-xl font-black font-serif text-slate-900 dark:text-white">
                بانک تنقیح‌شده آراء وحدت رویه هیات عمومی دیوان عالی کشور
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              استخراج، تحلیل و فرمول‌سازی استنادی آراء وحدت رویه لازم‌الاتباع جهت استفاده وکلا و کارآموزان در لوایح دادرسی.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4" /> لازم‌الاتباع طبق اصل ۱۶۱ قانون اساسی
          </span>
        </div>

        {/* فیلتر و جستجوی چندمعیاره */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در متن آراء (مانند: مستحق‌للغیر، وجه التزام، تاخیر تادیه، سود بانکی، ۸۱۱)..."
              className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
            />
          </div>

          {/* دسته‌بندی‌ها */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-sm font-bold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* شبکه کارت‌های آراء وحدت رویه */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ستون لیست فشرده سمت راست */}
        <div className="lg:col-span-1 space-y-3">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block px-1">
            فهرست نتایج ({filteredPrecedents.length} دادنامه):
          </span>
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredPrecedents.map((item) => {
              const isSelected = activePrecedent.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActivePrecedent(item)}
                  className={`p-4 rounded-2xl border text-right cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-[#0B132B] border-[#D4AF37] ring-2 ring-[#D4AF37]/40 shadow-lg'
                      : 'bg-white dark:bg-[#0B132B]/70 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-black text-[#D4AF37] font-mono">{item.number}</span>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-relaxed">
                    {item.title}
                  </h4>
                  <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {item.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ستون نمایش تفصیلی و فرمول استناد سمت چپ */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            {/* عنوان و مشخصات */}
            <div className="space-y-3 border-b border-slate-100 dark:border-slate-800/80 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {activePrecedent.number} • مورخ {activePrecedent.date}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  هیأت عمومی دیوان عالی کشور
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black font-serif text-slate-900 dark:text-white leading-relaxed">
                {activePrecedent.title}
              </h3>
            </div>

            {/* چکیده کاربردی و پیام رأی */}
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> پیام محوری و کاربرد در دادگاه:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-semibold">
                {activePrecedent.keyTakeaway}
              </p>
            </div>

            {/* متن رأی وحدت رویه */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                متن کامل حکم هیأت عمومی دیوان عالی کشور:
              </span>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070D1E] border border-slate-200 dark:border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-mono text-justify">
                {activePrecedent.fullRuling}
              </div>
            </div>

            {/* مواد قانونی مورد استناد */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                قوانین و مستندات موضوع رأی:
              </span>
              <div className="flex flex-wrap gap-2">
                {activePrecedent.legalCitations.map((cite, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium"
                  >
                    ⚖️ {cite}
                  </span>
                ))}
              </div>
            </div>

            {/* فرمول استناد در لایحه قضایی با دکمه کپی */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-slate-900/10 to-indigo-500/10 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-indigo-400" />
                  فرمول رسمی استناد در لایحه دفاعیه / دادخواست:
                </span>
                <button
                  onClick={() => handleCopyCitation(activePrecedent.id, activePrecedent.citationTemplate)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
                >
                  {copiedPrecedentId === activePrecedent.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> کپی شد
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> کپی متن استناد
                    </>
                  )}
                </button>
              </div>
              <p className="font-mono text-xs leading-relaxed text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-[#070D1E]/80 p-3.5 rounded-xl border border-indigo-500/20">
                « {activePrecedent.citationTemplate} »
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
