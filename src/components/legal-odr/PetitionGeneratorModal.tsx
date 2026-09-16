import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Download,
  QrCode,
  ShieldCheck,
  Scale,
  Sparkles,
  BookOpen,
  Send,
  Building,
  User,
} from 'lucide-react';
import { PETITION_TEMPLATES_DATA, ATTORNEY_INFO } from '../../data/mockData';
import { PetitionTemplate } from '../../types/theme';

export const PetitionGeneratorModal: React.FC = () => {
  const [templates] = useState<PetitionTemplate[]>(PETITION_TEMPLATES_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<PetitionTemplate>(templates[0]);

  // Form states
  const [claimantName, setClaimantName] = useState('شرکت تجارت الکترونیک آرمان داده');
  const [claimantNationalId, setClaimantNationalId] = useState('۱۰۱۰۲۸۳۷۴۶۱');
  const [respondentName, setRespondentName] = useState('شرکت فناوری‌های پیشرفته نوآوران وب');
  const [respondentNationalId, setRespondentNationalId] = useState('۱۰۳۸۴۷۲۶۱۹۰');
  const [claimValueText, setClaimValueText] = useState('۴۵۰,۰۰۰,۰۰۰ ریال');
  const [petitionBody, setPetitionBody] = useState(selectedTemplate.defaultText);
  const [copied, setCopied] = useState(false);
  const [petitionBarcode] = useState(() => `1403-ADL-${Math.floor(10000000 + Math.random() * 90000000)}`);

  const handleSelectTemplate = (tpl: PetitionTemplate) => {
    setSelectedTemplate(tpl);
    setPetitionBody(tpl.defaultText);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(petitionBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Top Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#060B18] via-[#0B132B] to-[#060B18] border-2 border-[#D4AF37]/40 shadow-xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>سامانه هوشمند تنظیم دادخواست و لوایح قضایی عدل‌ایران</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-serif">
            تنظیم مستند و استاندارد لوایح و دادخواست‌های قضایی
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
            بر اساس قالب رسمی دادگستری جمهوری اسلامی ایران با درج کدهای رهگیری ثنا، مواد استنادی قانونی و امضای الکترونیک وکیل پایه یک دادگستری.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'کپی شد' : 'کپی متن لایحه'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2f] text-[#060B18] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ برگه دادخواست رسمی</span>
          </button>
        </div>
      </div>

      {/* Templates Selector Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {templates.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => handleSelectTemplate(tpl)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer shrink-0 ${
              selectedTemplate.id === tpl.id
                ? 'bg-[#D4AF37] text-[#060B18] border-[#D4AF37] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-400'
            }`}
          >
            {tpl.title}
          </button>
        ))}
      </div>

      {/* Main Grid: Customizer (5 cols) & Printable Formal Sheet (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Form (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#D4AF37]" />
              <span>مشخصات طرفین و دعوا</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                  نام و مشخصات خواهان:
                </label>
                <input
                  type="text"
                  value={claimantName}
                  onChange={(e) => setClaimantName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                  کد ملی / شناسه ملی خواهان:
                </label>
                <input
                  type="text"
                  value={claimantNationalId}
                  onChange={(e) => setClaimantNationalId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-700 font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                  نام و مشخصات خوانده:
                </label>
                <input
                  type="text"
                  value={respondentName}
                  onChange={(e) => setRespondentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                  تعیین خواسته و بهای آن:
                </label>
                <input
                  type="text"
                  value={claimValueText}
                  onChange={(e) => setClaimValueText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                  متن دادخواست / لایحه دفاعیه:
                </label>
                <textarea
                  rows={8}
                  value={petitionBody}
                  onChange={(e) => setPetitionBody(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-700 font-serif leading-relaxed focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Legal Articles Box */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#060B18]/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
              <span className="font-bold text-[#D4AF37] block">مواد قانونی استنادی:</span>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                {selectedTemplate.legalArticles.map((art, idx) => (
                  <li key={idx}>{art}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Formal Printable Petition Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            id="formal-petition-print"
            className="p-6 sm:p-8 rounded-2xl bg-white text-slate-900 border-2 border-slate-300 shadow-xl space-y-5 text-right font-serif relative"
          >
            {/* Top Judicial Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
              <div className="text-right">
                <span className="block text-xs font-sans text-slate-500">جمهوری اسلامی ایران</span>
                <span className="block text-sm font-bold font-serif text-slate-900">قوه قضائیه - برگه رسمی دادخواست</span>
                <span className="block text-[11px] font-sans text-slate-500">سامانه خدمات الکترونیک قضایی (عدل‌ایران)</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full border-2 border-slate-800 flex items-center justify-center p-1">
                  <Scale className="w-6 h-6 text-slate-800" />
                </div>
                <span className="text-[10px] font-mono mt-1 text-slate-600">ثبت رسمی</span>
              </div>

              <div className="text-left text-xs font-mono space-y-0.5 text-slate-600">
                <p>شماره: {petitionBarcode}</p>
                <p>تاریخ: {new Date().toLocaleDateString('fa-IR')}</p>
                <p>مرجع: {selectedTemplate.targetCourt}</p>
              </div>
            </div>

            {/* Official Table Layout */}
            <div className="border border-slate-400 text-xs divide-y divide-slate-300">
              {/* Row 1: Claimant */}
              <div className="grid grid-cols-12 divide-x divide-x-reverse divide-slate-300">
                <div className="col-span-3 p-2 font-bold bg-slate-100">خواهان:</div>
                <div className="col-span-9 p-2">
                  {claimantName} - شناسه/کد ملی: <span className="font-mono font-bold">{claimantNationalId}</span>
                </div>
              </div>

              {/* Row 2: Respondent */}
              <div className="grid grid-cols-12 divide-x divide-x-reverse divide-slate-300">
                <div className="col-span-3 p-2 font-bold bg-slate-100">خوانده:</div>
                <div className="col-span-9 p-2">
                  {respondentName} - شناسه/کد ملی: <span className="font-mono font-bold">{respondentNationalId}</span>
                </div>
              </div>

              {/* Row 3: Lawyer */}
              <div className="grid grid-cols-12 divide-x divide-x-reverse divide-slate-300">
                <div className="col-span-3 p-2 font-bold bg-slate-100">وکیل دادگستری:</div>
                <div className="col-span-9 p-2">
                  {ATTORNEY_INFO.name} (پروانه وکالت: {ATTORNEY_INFO.licenseNumber})
                </div>
              </div>

              {/* Row 4: Claim Title */}
              <div className="grid grid-cols-12 divide-x divide-x-reverse divide-slate-300">
                <div className="col-span-3 p-2 font-bold bg-slate-100">خواسته و بهای آن:</div>
                <div className="col-span-9 p-2 font-bold text-slate-900">
                  {selectedTemplate.subjectTitle} (ارزش ریالی: {claimValueText})
                </div>
              </div>

              {/* Row 5: Required Docs */}
              <div className="grid grid-cols-12 divide-x divide-x-reverse divide-slate-300">
                <div className="col-span-3 p-2 font-bold bg-slate-100">دلایل و منضمات:</div>
                <div className="col-span-9 p-2">
                  {selectedTemplate.requiredDocuments.join(' - ')}
                </div>
              </div>
            </div>

            {/* Petition Narrative Body */}
            <div className="space-y-2 pt-2">
              <span className="block font-bold text-sm text-slate-900 border-b border-slate-200 pb-1">
                شرح و ادله دادخواست:
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line text-justify font-serif">
                {petitionBody}
              </p>
            </div>

            {/* Signature & Seal Footer */}
            <div className="pt-6 border-t border-slate-300 flex items-end justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 border border-slate-400 rounded-lg">
                  <QrCode className="w-12 h-12 text-slate-800" />
                </div>
                <div className="text-[10px] text-slate-500 space-y-0.5 font-mono">
                  <p>امضای دیجیتال وکیل ثبت گردید</p>
                  <p>SHA-256: 9F8A...3B21</p>
                  <p>تصدیق اصالت در عدل‌ایران</p>
                </div>
              </div>

              <div className="text-center space-y-1">
                <span className="block text-xs font-bold text-slate-900">محل امضا و اثر انگشت وکیل</span>
                <span className="block text-xs text-[#060B18] font-bold font-serif">
                  {ATTORNEY_INFO.name}
                </span>
                <div className="inline-block px-3 py-1 rounded border-2 border-emerald-600 text-emerald-800 font-bold text-[10px] -rotate-6">
                  مهر وکالت و تمبر مالیاتی ابطال شد
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
