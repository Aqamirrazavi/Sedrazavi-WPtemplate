import React, { useState } from 'react';
import {
  X,
  Scale,
  Sparkles,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Shield,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  Building,
  Lock,
  ArrowRight
} from 'lucide-react';
import { ATTORNEY_INFO } from '../data/mockData';

interface LiveConsultationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onBookConsultation: () => void;
  onOpenCaseTracker?: () => void;
}

interface TriageOption {
  id: string;
  label: string;
  category: string;
  description: string;
  recommendedDocs: string[];
  urgencyDefault: 'NORMAL' | 'URGENT' | 'CRITICAL';
}

const TRIAGE_TOPICS: TriageOption[] = [
  {
    id: 'property',
    label: 'دعاوی ملکی، اراضی و سرقفلی',
    category: 'حقوقی و ثبتی',
    description: 'الزام به سند رسمی، خلع ید، تصرف عدوانی، پیش‌فروش، کمیسیون ماده ۱۰۰ و سرقفلی',
    recommendedDocs: ['سند مالکیت تک‌برگ یا بنچاق', 'مبایعه‌نامه با کد رهگیری', 'گواهی عدم حضور دفترخانه', 'استعلام ثبتی ملک'],
    urgencyDefault: 'URGENT',
  },
  {
    id: 'commercial',
    label: 'اسناد تجاری، چک صیادی و امور بانکی',
    category: 'تجاری و مالی',
    description: 'مطالبه وجه چک صیادی، خسارت تاخیر تادیه، ابطال ضمانت‌نامه، سود مازاد بانکی',
    recommendedDocs: ['گواهی عدم پرداخت بانک', 'تصویر روی و پشت چک صیادی', 'قرارداد تسهیلات بانکی', 'پرینت تراکنش‌های واریز'],
    urgencyDefault: 'URGENT',
  },
  {
    id: 'corporate_arbitration',
    label: 'شرکت‌های تجاری، قراردادها و داوری',
    category: 'شرکتی و بین‌الملل',
    description: 'اختلاف شرکا، ابطال رای داوری، قراردادهای EPC و پیمانکاری، واردات و صادرات',
    recommendedDocs: ['اساسنامه و روزنامه رسمی شرکت', 'قرارداد اصلی و الحاقیه‌ها', 'صورتجلسات مجمع و هیئت مدیره', 'موافقت‌نامه داوری'],
    urgencyDefault: 'NORMAL',
  },
  {
    id: 'family_inheritance',
    label: 'خانواده، مهریه و تقسیم ماترک',
    category: 'امور خانواده و ارث',
    description: 'مطالبه مهریه، طلاق توافقی، حضانت، انحصار وراثت، تحریر و تقسیم ترکه و ماترک',
    recommendedDocs: ['عقدنامه رسمی ازدواج', 'شناسنامه‌ها و کارت‌های ملی', 'گواهی فوت متوفی', 'سیاهه اموال و استشهادیه وراث'],
    urgencyDefault: 'NORMAL',
  },
  {
    id: 'criminal_cyber',
    label: 'دعاوی کیفری، کلاهبرداری و جرایم سایبری',
    category: 'کیفری و اقتصادی',
    description: 'کلاهبرداری اینترنتی، خیانت در امانت، اختلاس، انتقال مال غیر و جرایم اقتصادی',
    recommendedDocs: ['پرینت درگاه پرداخت یا رمزارز', 'شکواییه اولیه ثبت‌شده', 'اسناد جعلی ادعایی', 'پیامک‌ها و مستندات چت'],
    urgencyDefault: 'CRITICAL',
  },
];

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export const LiveConsultationDrawer: React.FC<LiveConsultationDrawerProps> = ({
  isOpen,
  onClose,
  onBookConsultation,
  onOpenCaseTracker,
}) => {
  const [activeTab, setActiveTab] = useState<'triage' | 'channels' | 'chat'>('triage');

  // Triage state
  const [triageStep, setTriageStep] = useState<number>(1);
  const [selectedTopic, setSelectedTopic] = useState<TriageOption>(TRIAGE_TOPICS[0]);
  const [caseStage, setCaseStage] = useState<string>('ablaghieh');
  const [urgencyLevel, setUrgencyLevel] = useState<'NORMAL' | 'URGENT' | 'CRITICAL'>('URGENT');
  const [clientMobile, setClientMobile] = useState<string>('');
  const [triageSubmitted, setTriageSubmitted] = useState<boolean>(false);

  // Chat state
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'درود و احترام. به پرتال ارتباط مستقیم دفتر وکالت دکتر سیده مریم رضوی خوش آمدید. لطفاً موضوع اختلاف یا شماره پرونده خود را بفرمایید تا مستندات قانونی و نزدیک‌ترین زمان مشاوره را به شما اعلام کنیم.',
      timestamp: 'هم‌اکنون',
    },
  ]);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: chatInput,
      timestamp: 'چند لحظه پیش',
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = chatInput;
    setChatInput('');

    // Automated smart legal response simulation
    setTimeout(() => {
      let botReply = 'پیام شما در سامانه دفتر وکالت ثبت شد. با توجه به موضوع معنونه، پیشنهاد می‌شود اصل اسناد را در جلسه حضوری دفتر ونک یا از طریق ایتا/تلگرام ارسال فرمایید تا توسط وکیل سرپرست بررسی شود.';
      
      if (currentInput.includes('ملک') || currentInput.includes('سند') || currentInput.includes('قولنامه')) {
        botReply = 'در خصوص موضوع ملکی و الزام به تنظیم سند، استعلام ثبتی و ارسال اظهارنامه رسمی پیش‌نیاز اساسی است. دادگاه صلاحیت‌دار، دادگاه عمومی محل وقوع ملک می‌باشد.';
      } else if (currentInput.includes('چک') || currentInput.includes('پول') || currentInput.includes('حساب')) {
        botReply = 'مطابق قانون اصلاحی صدور چک، با اخذ گواهی عدم پرداخت می‌توانید مستقیماً از اجرای ثبت یا دادگاه حقوقی تقاضای صدور اجرائیه فرمایید بدون نیاز به طی فرآیند طولانی دادرسی ماهوی.';
      } else if (currentInput.includes('ارث') || currentInput.includes('فوت') || currentInput.includes('ترکه')) {
        botReply = 'در امور انحصار وراثت، گواهی فوت و استشهادیه ۳ نفره در شورای حل اختلاف آخرین اقامتگاه متوفی مورد نیاز است. صدور گواهی حصر وراثت معمولاً ۳۰ روز کاری به طول می‌انجامد.';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'bot',
          text: botReply,
          timestamp: 'هم‌اکنون',
        },
      ]);
    }, 800);
  };

  const handleTriageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTriageSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn text-right font-persian">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white dark:bg-[#070D1E] shadow-2xl border-r border-[#D4AF37]/30 flex flex-col justify-between overflow-hidden relative">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#060B18] via-[#0B132B] to-[#060B18] text-white p-5 border-b border-[#D4AF37]/30 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="بستن دالان مشاوره"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  وکیل آماده پاسخگویی
                </span>
                <span className="p-1.5 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                  <Scale className="w-4 h-4" />
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold font-serif text-white flex items-center gap-2">
                <span>دالان ارتباط مستقیم و تریاژ حقوقی</span>
              </h3>
              <p className="text-xs text-gray-300">
                دفتر وکالت {ATTORNEY_INFO.name} (ونک، تهران)
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-3 gap-1.5 mt-4 bg-[#070D1E]/80 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setActiveTab('triage')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'triage'
                    ? 'bg-[#D4AF37] text-[#060B18] shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                تریاژ پرونده
              </button>
              <button
                onClick={() => setActiveTab('channels')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'channels'
                    ? 'bg-[#D4AF37] text-[#060B18] shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                ارتباط سریع
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-[#D4AF37] text-[#060B18] shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                مشاوره متنی
              </button>
            </div>
          </div>

          {/* Main Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* TAB 1: TRIAGE WIZARD */}
            {activeTab === 'triage' && (
              <div className="space-y-5">
                {!triageSubmitted ? (
                  <form onSubmit={handleTriageSubmit} className="space-y-5">
                    {/* Stepper Header */}
                    <div className="flex items-center justify-between text-xs border-b border-gray-200 dark:border-gray-800 pb-3">
                      <span className="font-bold text-[#0B132B] dark:text-white">
                        گام {triageStep} از ۳: {
                          triageStep === 1 ? 'موضوع دعوا' : triageStep === 2 ? 'مرحله و فوریت' : 'نتیجه و هماهنگی'
                        }
                      </span>
                      <span className="text-gray-400 font-mono">
                        {triageStep === 1 ? '۳۳٪' : triageStep === 2 ? '۶۶٪' : '۱۰۰٪'}
                      </span>
                    </div>

                    {/* Step 1: Select Topic */}
                    {triageStep === 1 && (
                      <div className="space-y-3">
                        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                          دسته‌بندی اصلی موضوع یا اختلاف حقوقی خود را انتخاب فرمایید:
                        </label>

                        <div className="space-y-2.5">
                          {TRIAGE_TOPICS.map((topic) => (
                            <div
                              key={topic.id}
                              onClick={() => {
                                setSelectedTopic(topic);
                                setUrgencyLevel(topic.urgencyDefault);
                              }}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-right ${
                                selectedTopic.id === topic.id
                                  ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-sm ring-1 ring-[#D4AF37]/50'
                                  : 'bg-gray-50 dark:bg-[#0B132B] border-gray-200 dark:border-gray-800 hover:border-gray-400'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <h4 className="font-bold text-xs text-[#0B132B] dark:text-white">
                                  {topic.label}
                                </h4>
                                <span className="text-[10px] px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold">
                                  {topic.category}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                                {topic.description}
                              </p>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setTriageStep(2)}
                          className="btn-gold w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 mt-4 shadow-md"
                        >
                          <span>ادامه به مرحله بعد</span>
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Step 2: Stage & Urgency */}
                    {triageStep === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                            وضعیت کنونی پرونده یا مناقشه:
                          </label>
                          <div className="space-y-2">
                            {[
                              { id: 'pre_court', label: 'پیش از طرح دعوا (مذاکره، صلح یا تنظیم قرارداد)' },
                              { id: 'ablaghieh', label: 'ابلاغیه ثنا یا اخطاریه دادگاه دریافت شده است (مهلت ۱۰ یا ۲۰ روزه)' },
                              { id: 'hearing', label: 'جلسه رسیدگی دادگاه تعیین شده است' },
                              { id: 'decided', label: 'رای دادگاه بدوی صادر شده و نیاز به تجدیدنظرخواهی دارد' },
                              { id: 'execution', label: 'پرونده به مرحله اجرای احکام و توقیف اموال رسیده است' },
                            ].map((stage) => (
                              <label
                                key={stage.id}
                                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                                  caseStage === stage.id
                                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#0B132B] dark:text-white font-bold'
                                    : 'bg-gray-50 dark:bg-[#0B132B] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="caseStage"
                                  checked={caseStage === stage.id}
                                  onChange={() => setCaseStage(stage.id)}
                                  className="accent-[#D4AF37]"
                                />
                                <span>{stage.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                            میزان فوریت زمانی:
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 'NORMAL', label: 'عادی (۱ الی ۳ روز)' },
                              { id: 'URGENT', label: 'فوری (تا ۲۴ ساعت)' },
                              { id: 'CRITICAL', label: 'اضطراری (همین امروز)' },
                            ].map((lvl) => (
                              <button
                                key={lvl.id}
                                type="button"
                                onClick={() => setUrgencyLevel(lvl.id as any)}
                                className={`p-2 rounded-xl text-center text-xs font-bold border transition-all ${
                                  urgencyLevel === lvl.id
                                    ? 'bg-[#D4AF37] text-[#060B18] border-[#D4AF37] shadow-sm'
                                    : 'bg-gray-50 dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-800'
                                }`}
                              >
                                {lvl.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setTriageStep(1)}
                            className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300"
                          >
                            بازگشت
                          </button>
                          <button
                            type="button"
                            onClick={() => setTriageStep(3)}
                            className="btn-gold flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                          >
                            <span>مشاهده تحلیل و مدارک مورد نیاز</span>
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Analysis & Contact details */}
                    {triageStep === 3 && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-[#AA820A] dark:text-[#F3E5AB]">
                            <Sparkles className="w-4 h-4" />
                            <span>نتیجه تریاژ هوشمند دفتر وکالت:</span>
                          </div>
                          <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed">
                            موضوع شما در صلاحیت <strong>{selectedTopic.category}</strong> قرار دارد. توصیه تخصصی دفتر وکالت، بررسی فوری پیش از انقضای مهلت‌های قانونی است.
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                            مدارک الزامی که باید آماده همراه داشته باشید:
                          </label>
                          <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                            {selectedTopic.recommendedDocs.map((doc, idx) => (
                              <li key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span>{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                            شماره تماس همراه جهت تماس مستقیم وکیل یا منشی دفتر:
                          </label>
                          <input
                            type="tel"
                            required
                            value={clientMobile}
                            onChange={(e) => setClientMobile(e.target.value)}
                            placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                            className="w-full px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#0B132B] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setTriageStep(2)}
                            className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300"
                          >
                            بازگشت
                          </button>
                          <button
                            type="submit"
                            className="btn-gold flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                          >
                            <span>ثبت درخواست مشاوره فوری با این پرونده</span>
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4 animate-fadeIn">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-bold text-[#0B132B] dark:text-white">
                      درخواست تریاژ پرونده با موفقیت ثبت گردید
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs mx-auto">
                      همکاران دفتر وکالت دکتر سیده مریم رضوی در سریع‌ترین زمان ممکن (اولویت: {urgencyLevel === 'CRITICAL' ? 'اضطراری' : 'فوری'}) با شماره {clientMobile} تماس حاصل خواهند نمود.
                    </p>

                    <div className="pt-4 flex flex-col gap-2">
                      <button
                        onClick={onBookConsultation}
                        className="btn-gold w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>رزرو وقت ملاقات حضوری در دفتر ونک</span>
                      </button>
                      <button
                        onClick={() => setTriageSubmitted(false)}
                        className="px-4 py-2 rounded-xl text-xs text-gray-500 hover:text-gray-300"
                      >
                        ثبت تریاژ پرونده جدید
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: INSTANT COMMUNICATION CHANNELS */}
            {activeTab === 'channels' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0B132B] to-[#1C2541] border border-[#D4AF37]/30 text-white space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-bold">
                    <Shield className="w-4 h-4" />
                    <span>ارتباط مستقیم و محرمانه با وکیل پایه یک</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    می‌توانید پیام، عکس اسناد یا دادخواست خود را مستقیماً از طریق پیام‌رسان‌های زیر به شناسه رسمی وکیل ارسال فرمایید:
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Eitaa Gateway */}
                  <a
                    href="https://eitaa.com/sedrazavi"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-500/30 hover:border-amber-500 flex items-center justify-between gap-3 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-sm">
                        ایتا
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                          کانال و پیام مستقیم در پیام‌رسان ایتا
                        </h4>
                        <span className="text-[11px] font-mono text-gray-500">@sedrazavi</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-amber-500 group-hover:translate-x-[-2px] transition-transform" />
                  </a>

                  {/* Telegram Gateway */}
                  <a
                    href="https://t.me/sedrazavi"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/20 border border-sky-500/30 hover:border-sky-500 flex items-center justify-between gap-3 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-black text-sm">
                        تلگرام
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                          پشتیبانی و ارسال مدارک در تلگرام
                        </h4>
                        <span className="text-[11px] font-mono text-gray-500">@sedrazavi</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-sky-500 group-hover:translate-x-[-2px] transition-transform" />
                  </a>

                  {/* WhatsApp Gateway */}
                  <a
                    href="https://wa.me/989123456789?text=سلام%20خانم%20دکتر%20رضوی،%20درخواست%20مشاوره%20حقوقی%20دارم"
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500 flex items-center justify-between gap-3 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-sm">
                        واتساپ
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                          ارتباط سریع از طریق واتساپ
                        </h4>
                        <span className="text-[11px] font-mono text-gray-500">۰۹۱۲۳۴۵۶۷۸۹</span>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-emerald-500 group-hover:translate-x-[-2px] transition-transform" />
                  </a>

                  {/* Direct Phone Call */}
                  <a
                    href="tel:02188990011"
                    className="p-4 rounded-2xl bg-gray-50 dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 hover:border-[#D4AF37] flex items-center justify-between gap-3 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white">
                          تماس مستقیم با دفتر ونک
                        </h4>
                        <span className="text-[11px] font-mono text-gray-500">۰۲۱-۸۸۹۹۰۰۱۱</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#D4AF37]">برقراری تماس</span>
                  </a>
                </div>
              </div>
            )}

            {/* TAB 3: LIVE TEXT CONSULTATION CHAT */}
            {activeTab === 'chat' && (
              <div className="space-y-4 flex flex-col h-[400px]">
                <div className="flex-1 overflow-y-auto space-y-3 p-1">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#D4AF37] text-[#060B18] font-bold rounded-tl-none'
                            : 'bg-gray-100 dark:bg-[#0B132B] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-800 rounded-tr-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="پرسش حقوقی یا خلاصه پرونده خود را بنویسید..."
                    className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-gray-50 dark:bg-[#0B132B] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-[#D4AF37] text-[#060B18] hover:bg-[#c49f2f] transition-all cursor-pointer shrink-0"
                    title="ارسال پیام"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-gray-50 dark:bg-[#060B18] border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 shrink-0">
            <span>حقوق مادی و معنوی محفوظ است</span>
            <span className="font-mono">طراحی و توسعه: @sedrazavi</span>
          </div>
        </div>
      </div>
    </div>
  );
};
