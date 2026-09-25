import React, { useState } from 'react';
import { ATTORNEY_INFO, SERVICES_DATA, CASES_INITIAL_DATA } from '../data/mockData';
import { CaseItem } from '../types/theme';
import { LawyerSiteProfile } from '../utils/lawyerCustomizationStorage';
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  Search,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Sparkles,
  Users,
  Award,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface ContactAndBookingSectionProps {
  preselectedService?: string;
  profile?: LawyerSiteProfile;
  preselectedLawyer?: string;
}

export const ContactAndBookingSection: React.FC<ContactAndBookingSectionProps> = ({
  preselectedService,
  profile,
  preselectedLawyer,
}) => {
  const scenario = profile?.firmScenario?.currentScenario || 'senior_associates';

  // Booking Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [serviceType, setServiceType] = useState(preselectedService || SERVICES_DATA[0].title);
  const [consultationMode, setConsultationMode] = useState<'in_person' | 'phone' | 'online'>('in_person');
  const [selectedLawyer, setSelectedLawyer] = useState(preselectedLawyer || 'دکتر سیده مریم رضوی (وکیل سرپرست)');
  const [counselRole, setCounselRole] = useState<'principal' | 'partner' | 'associate' | 'trainee'>('principal');
  const [selectedDate, setSelectedDate] = useState('۱۴۰۳/۰۶/۱۵');
  const [selectedTime, setSelectedTime] = useState('۱۶:۰۰ الی ۱۷:۰۰');
  const [notes, setNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingSubmitting, setBookingSubmitting] = useState(false);

  // Case Tracker State
  const [searchCaseNo, setSearchCaseNo] = useState('');
  const [searchedCase, setSearchedCase] = useState<CaseItem | null>(null);
  const [searchError, setSearchError] = useState('');

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) {
      alert('لطفاً نام و شماره تماس خود را وارد نمایید.');
      return;
    }

    setBookingSubmitting(true);
    setTimeout(() => {
      setBookingSubmitting(false);
      setBookingSuccess(true);
    }, 800);
  };

  const handleCaseSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');
    setSearchedCase(null);

    const term = searchCaseNo.trim();
    if (!term) {
      setSearchError('لطفاً شماره پرونده یا شماره همراه خود را وارد کنید.');
      return;
    }

    const found = CASES_INITIAL_DATA.find(
      (c) => c.caseNumber.includes(term) || c.clientPhone.includes(term) || c.clientName.includes(term)
    );

    if (found) {
      setSearchedCase(found);
    } else {
      setSearchError(`پرونده‌ای با شناسه "${term}" یافت نشد. جهت راهنمایی با دفتر تماس حاصل فرمایید.`);
    }
  };

  const calculateEstimatedFee = () => {
    let base = 3000000;
    if (consultationMode === 'phone') base = 1500000;
    if (consultationMode === 'online') base = 2000000;

    if (counselRole === 'trainee') {
      const discounted = Math.round(base * 0.5);
      return `${discounted.toLocaleString('fa-IR')} تومان (تعرفه اقتصادی ۵۰٪ تخفیف - کارآموز وکالت با نظارت سرپرست)`;
    } else if (counselRole === 'associate') {
      const discounted = Math.round(base * 0.75);
      return `${discounted.toLocaleString('fa-IR')} تومان (تعرفه وکیل پایه یک همکار)`;
    }
    return `${base.toLocaleString('fa-IR')} تومان (تعرفه مشاوره راهبردی وکیل سرپرست / شریک ارشد)`;
  };

  return (
    <section id="booking" className="py-20 bg-white dark:bg-[#0B132B] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            ارتباط مستقیم و دریافت نوبت
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#0B132B] dark:text-white">
            رزرو هوشمند وقت مشاوره و پیگیری پرونده
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            امکان رزرو نوبت مشاوره حضوری/آنلاین و استعلام وضعیت دادرسی در سامانه یکپارچه SedRazavi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Interactive Booking Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#F4F6F9] dark:bg-gray-900/90 rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800 shadow-xl">
            <h3 className="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
              فرم آنلاین تعیین وقت مشاوره
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              اطلاعات شما با رعایت ۱۰۰٪ اصل محرمانگی در بایگانی دفتر حقوقی ثبت می‌گردد.
            </p>

            {bookingSuccess ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-2xl shadow-lg">
                  ✓
                </div>
                <h4 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 font-serif">
                  درخواست رزرو نوبت شما با موفقیت ثبت شد!
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                  پیامک تأیید رزرو به همراه شناسه نوبت و لوکیشن دفتر برای شماره{' '}
                  <span className="font-mono font-bold text-[#0B132B] dark:text-white">{clientPhone}</span> ارسال گردید. همکاران ما جهت هماهنگی نهایی ظرف کمتر از ۲ ساعت کاری با شما تماس خواهند گرفت.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setBookingSuccess(false);
                      setClientName('');
                      setClientPhone('');
                      setNotes('');
                    }}
                    className="btn-gold text-xs px-6 py-2.5 rounded-xl"
                  >
                    ثبت نوبت جدید
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      نام و نام خانوادگی <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="مثال: علی رضایی"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-[#D4AF37] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      شماره تماس همراه (جهت دریافت پیامک) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      dir="ltr"
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-[#D4AF37] dark:text-white font-mono"
                    />
                  </div>
                </div>

                {/* Multi-Lawyer / Counsel Selection (Dynamic based on Scenario) */}
                {scenario !== 'solo' && (
                  <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-400/5 border border-[#D4AF37]/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#D4AF37]" />
                        <span>انتخاب وکیل و رده مشاوره:</span>
                      </label>
                      <span className="text-[10px] text-[#AA820A] dark:text-[#F3E5AB] font-bold">
                        {scenario === 'partners' && 'دفتر همکاران و شرکا'}
                        {scenario === 'senior_associates' && 'تعرفه دو سطحی سرپرست / کارآموز'}
                        {scenario === 'enterprise' && 'کادر وکلای دپارتمانی'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLawyer('دکتر سیده مریم رضوی (وکیل سرپرست و ارشد)');
                          setCounselRole('principal');
                        }}
                        className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between text-xs ${
                          counselRole === 'principal'
                            ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] border-transparent shadow-sm font-bold'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#D4AF37]" />
                          <div>
                            <div className="font-bold">دکتر سیده مریم رضوی</div>
                            <div className="text-[10px] opacity-80">وکیل سرپرست • مشاوره استراتژیک</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold">عالی</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLawyer('دکتر علیرضا کاظمی (وکیل پایه یک همکار)');
                          setCounselRole('associate');
                        }}
                        className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between text-xs ${
                          counselRole === 'associate'
                            ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] border-transparent shadow-sm font-bold'
                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-blue-500" />
                          <div>
                            <div className="font-bold">دکتر علیرضا کاظمی</div>
                            <div className="text-[10px] opacity-80">وکیل پایه یک • دعاوی تجاری</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold">تخصصی</span>
                      </button>

                      {scenario === 'senior_associates' && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLawyer('جناب آقای مهدی سهرابی (کارآموز وکالت)');
                            setCounselRole('trainee');
                          }}
                          className={`sm:col-span-2 p-2.5 rounded-xl border text-right transition-all flex items-center justify-between text-xs ${
                            counselRole === 'trainee'
                              ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] border-transparent shadow-sm font-bold'
                              : 'bg-white dark:bg-gray-800 border-emerald-500/40 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-emerald-500" />
                            <div>
                              <div className="font-bold">جناب آقای مهدی سهرابی (کارآموز وکالت تحت نظارت سرپرست)</div>
                              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                                تعرفه حمایتی اقتصادی (۵۰٪ تخفیف) • بررسی و امضای لوایح توسط سرپرست
                              </div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                            اقتصادی
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Consultation Mode Selector */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                    نوع جلسه مشاوره
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setConsultationMode('in_person')}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                        consultationMode === 'in_person'
                          ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] border-transparent shadow-md'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      🏢 مشاوره حضوری در دفتر
                    </button>

                    <button
                      type="button"
                      onClick={() => setConsultationMode('phone')}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                        consultationMode === 'phone'
                          ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] border-transparent shadow-md'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      📞 مشاوره تلفنی فوری
                    </button>

                    <button
                      type="button"
                      onClick={() => setConsultationMode('online')}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                        consultationMode === 'online'
                          ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] border-transparent shadow-md'
                          : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      💻 مشاوره آنلاین تصویری
                    </button>
                  </div>
                </div>

                {/* Service Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    موضوع و حوزه دعوای حقوقی
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-[#D4AF37] dark:text-white"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      انتخاب روز ملاقات
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-[#D4AF37] dark:text-white"
                    >
                      <option value="۱۴۰۳/۰۶/۱۵">پنج‌شنبه ۱۵ شهریور</option>
                      <option value="۱۴۰۳/۰۶/۱۷">شنبه ۱۷ شهریور</option>
                      <option value="۱۴۰۳/۰۶/۱۸">یکشنبه ۱۸ شهریور</option>
                      <option value="۱۴۰۳/۰۶/۱۹">دوشنبه ۱۹ شهریور</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                      انتخاب سانس ساعت
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-[#D4AF37] dark:text-white"
                    >
                      <option value="۱۱:۰۰ الی ۱۲:۰۰">۱۱:۰۰ الی ۱۲:۰۰ (صبح)</option>
                      <option value="۱۴:۰۰ الی ۱۵:۰۰">۱۴:۰۰ الی ۱۵:۰۰ (عصر)</option>
                      <option value="۱۶:۰۰ الی ۱۷:۰۰">۱۶:۰۰ الی ۱۷:۰۰ (عصر)</option>
                      <option value="۱۸:۰۰ الی ۱۹:۰۰">۱۸:۰۰ الی ۱۹:۰۰ (غروب)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    شرح مختصر پرونده یا سوال حقوقی (اختیاری)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="جهت آمادگی بیشتر وکیل برای جلسه، خلاصه موضوع را ذکر فرمایید..."
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:outline-none focus:border-[#D4AF37] dark:text-white"
                  />
                </div>

                {/* Fee Calculation Badge */}
                <div className="p-3.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-between text-xs sm:text-sm text-[#0B132B] dark:text-[#F3E5AB]">
                  <span className="font-medium">هزینه مصوب جلسه مشاوره:</span>
                  <span className="font-bold">{calculateEstimatedFee()}</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={bookingSubmitting}
                  className="btn-gold w-full py-3.5 text-sm sm:text-base font-bold flex items-center justify-center gap-2 rounded-xl"
                >
                  {bookingSubmitting ? (
                    <span>در حال پردازش و ثبت...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>تأیید و ثبت نهایی نوبت مشاوره</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* Right: Case Status Tracker & Office Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Case Status Tracker Card */}
            <div id="cases" className="bg-[#0B132B] text-white rounded-3xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-lg sm:text-xl font-bold font-serif text-[#D4AF37] mb-2 flex items-center gap-2">
                <Search className="w-5 h-5" />
                سامانه استعلام آنلاین پرونده
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                موکلین محترم می‌توانند با وارد کردن شماره پرونده (مثال: ۱۴۰۳-۰۰۱) از آخرین وضعیت دادرسی مطلع شوند.
              </p>

              <form onSubmit={handleCaseSearch} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchCaseNo}
                    onChange={(e) => setSearchCaseNo(e.target.value)}
                    placeholder="شماره پرونده (مثال: ۱۴۰۳-۰۰۱)"
                    className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="btn-gold px-5 py-3 text-xs font-bold rounded-xl"
                  >
                    استعلام
                  </button>
                </div>

                {searchError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{searchError}</span>
                  </div>
                )}
              </form>

              {/* Searched Case Result Card */}
              {searchedCase && (
                <div className="mt-6 p-5 rounded-2xl bg-white/5 border border-[#D4AF37]/40 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-700">
                    <span className="text-xs text-gray-400">شناسه پرونده:</span>
                    <span className="font-mono font-bold text-[#D4AF37]">{searchedCase.caseNumber}</span>
                  </div>

                  <div className="text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-gray-400">نام موکل:</span>
                      <span className="font-bold text-white">{searchedCase.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">موضوع دعوا:</span>
                      <span className="text-white font-medium">{searchedCase.caseType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">وضعیت فعلی:</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#2A9D8F]/20 text-[#2A9D8F] font-bold">
                        {searchedCase.status}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-gray-800">
                      <span className="block text-gray-400 mb-1">جلسه بعدی دادگاه / گزارش کار:</span>
                      <span className="block text-[#D4AF37] font-semibold">{searchedCase.nextCourtSession}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 pt-1 leading-relaxed bg-black/30 p-2.5 rounded-lg">
                      {searchedCase.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Office Contact Info Card */}
            <div className="bg-[#F4F6F9] dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 space-y-4">
              <h4 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                اطلاعات نشانی و ساعات کاری دفتر
              </h4>

              <ul className="space-y-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span>{ATTORNEY_INFO.officeAddress}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>تلفن تماس: <span dir="ltr" className="font-mono font-bold">{ATTORNEY_INFO.phone}</span></span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                  <span>{ATTORNEY_INFO.workingHours}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
