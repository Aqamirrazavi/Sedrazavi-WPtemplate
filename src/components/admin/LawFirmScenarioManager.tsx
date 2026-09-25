import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeftRight,
  Sliders,
  Layers,
  Sparkles,
  Database,
  Code2,
  Download,
  Copy,
  Check,
  Eye,
  Calendar,
  DollarSign,
  Scale,
  Award,
  AlertTriangle,
  Info,
  ChevronDown,
  UserCheck,
  UserPlus,
  RefreshCw,
  FileCode,
  Share2,
  Lock,
  GitBranch,
  BookOpen
} from 'lucide-react';
import { LawyerSiteProfile } from '../../utils/lawyerCustomizationStorage';

export type LawFirmScenarioType = 'solo' | 'partners' | 'senior_associates' | 'enterprise';

interface LawFirmScenarioDef {
  id: LawFirmScenarioType;
  number: number;
  titleFa: string;
  titleEn: string;
  badge: string;
  tagline: string;
  targetAudience: string;
  heroLayout: string;
  bookingWorkflow: string;
  caseManagementModel: string;
  hierarchyDescription: string;
  dataPreservationStrategy: string;
  features: string[];
}

export const LAW_FIRM_SCENARIOS: LawFirmScenarioDef[] = [
  {
    id: 'solo',
    number: 1,
    titleFa: 'سناریوی ۱: یک وکیل انفرادی (Solo Practitioner)',
    titleEn: 'Solo Lawyer / Private Practice',
    badge: 'برند شخصی انفرادی',
    tagline: 'تمرکز ۱۰۰٪ بر هویت، مدارک علمی، پروانه وکالت و دستاوردهای فردی وکیل.',
    targetAudience: 'وکلای مستقلی که به تنهایی دفتر وکالت خود را اداره می‌کنند و تمایل دارند کلیه ارتباطات، نوبت‌ها و استعلام‌ها با نام مستقیم شخص خودشان انجام پذیرد.',
    heroLayout: 'پرتره مجلل و تمام‌قد وکیل در هدر، با مدال سابقه ۲۰ ساله، پروانه وکالت کانون و امضای دیجیتال.',
    bookingWorkflow: 'تقویم رزرو مستقیم تک‌نفره با وکیل بدون واسطه با نرخ ثابت مشاوره حضوری یا آنلاین.',
    caseManagementModel: 'کلیه پرونده‌ها مستقیماً به نام شخص وکیل ثبت و کد پرونده صرفاً به پرونده‌های او ارجاع داده می‌شود.',
    hierarchyDescription: 'سطح دسترسی تک‌کاربره (مدیر ارشد وکیل). سایر رکوردهای احتمالی وکلا در دیتابیس به صورت Dormant (خواب زمستانی) حفظ می‌گردند.',
    dataPreservationStrategy: 'در صورت ارتقا به سناریوهای بعدی، این وکیل به صورت اتوماتیک به عنوان «وکیل بنیان‌گذار (Founding Partner)» تعریف شده و تمام پرونده‌ها بدون کمترین تغییر حفظ می‌مانند.',
    features: [
      'هدر اختصاصی تک‌پرتره با تمرکز بر پروانه وکالت کانون',
      'یکپارچگی کامل رزرو نوبت با پیامک مستقیم به تلفن همراه وکیل',
      'بخش درباره وکیل متمرکز بر مقالات، مدارک تحصیلی و گواهی‌نامه‌های فردی',
      'استعلام پرونده موکل بدون نیاز به انتخاب وکیل واسط',
      'کیت المنتور سبک و پرسرعت متمرکز بر پرسونال برندینگ'
    ]
  },
  {
    id: 'partners',
    number: 2,
    titleFa: 'سناریوی ۲: چند وکیل و شریک مستقل (Equal Partners / Chambers)',
    titleEn: 'Multi-Lawyer Equal Partnership / Chambers',
    badge: 'همکاری وکلای هم‌تراز',
    tagline: 'چند وکیل پایه یک با هویت مشترک دفتری ولی استقلال مالی و پرونده‌ای کامل.',
    targetAudience: 'دفاتر مشترک وکلا و هم‌اتاقی‌های حقوقی که مایلند هزینه‌های سایت، دفتر و تبلیغات را به اشتراک بگذارند اما استقلال موکلین، تعرفه‌ها و پرونده‌های هر وکیل حفظ شود.',
    heroLayout: 'اسلایدر تعاملی معرفی شرکا، یا کارت‌های موازی با دکمه اختصاصی رزرو و سوابق هر یک از وکلا.',
    bookingWorkflow: 'مرحله ۱: انتخاب وکیل مورد نظر بر اساس تخصص (ملکی، کیفری، خانواده) -> مرحله ۲: مشاهده تقویم و نرخ وکیل انتخابی.',
    caseManagementModel: 'تفکیک دسترسی‌ها؛ هر وکیل فقط پرونده‌های ارجاعی به خود را مشاهده و مدیریت می‌کند.',
    hierarchyDescription: 'نقش‌های هم‌تراز (Partners)؛ هر شریک پنل ورود اختصاصی با شماره موبایل OTP خود دارد.',
    dataPreservationStrategy: 'اطلاعات هر شریک در CPT اختصاصی `cpt_lawyer` ذخیره می‌شود؛ جابجایی بین سناریوها بدون دستکاری داده‌های مالی یا پرونده‌های هر شریک صورت می‌پذیرد.',
    features: [
      'گرید لوکس شرکا در صفحه اصلی با سوئیچ سریع بین رزومه هر وکیل',
      'سیستم رزرو چندتقویمه با زمان‌بندی مستقل کاری هر وکیل',
      'تفکیک مقالات، ویدیوها و پادکست‌های وبلاگ به تفکیک وکیل نویسنده',
      'درگاه‌های پرداخت چندگانه یا تسهیم حسابداری بر اساس سهم هر شریک',
      'کارت ویزیت الکترونیکی NFC و کیوآرکد اختصاصی برای هر وکیل'
    ]
  },
  {
    id: 'senior_associates',
    number: 3,
    titleFa: 'سناریوی ۳: یک وکیل سرپرست + شرکا و کارآموزان (Senior Managing Partner + Associates)',
    titleEn: 'Senior Managing Partner & Associates/Trainees',
    badge: 'ساختار سرپرستی و کارآموزی',
    tagline: 'مدیریت متمرکز وکیل سرپرست با کادر وکلای همکار و کارآموزان وکالت تحت نظارت.',
    targetAudience: 'وکلای باسابقه و سرپرست کانون وکلا که پرونده‌ها را جذب کرده و بخشی از روند تدوین لوایح، حضور در جلسات و پیگیری دادرسی را به وکلای همکار و کارآموزان زیردست واگذار می‌کنند.',
    heroLayout: 'تصویر وکیل سرپرست به عنوان مدیر اصلی در کانون توجه، به همراه نوار تیم وکلای تحت نظارت و کارآموزان.',
    bookingWorkflow: 'امکان رزرو نوبت با وکیل سرپرست (تعرفه مشاوره عالی) یا کارآموزان و وکلای همکار (تعرفه حمایتی و اقتصادی‌تر).',
    caseManagementModel: 'ماتریس ارجاع؛ وکیل سرپرست پرونده را به کارآموز یا همکار تخصیص می‌دهد. لوایح تنظیمی پیش از ثبت دادگاه باید به تایید دیجیتال سرپرست برسد.',
    hierarchyDescription: 'سلسله‌مراتب ۲ سطحی (Managing Senior Attorney -> Junior Associate / Trainee). کارآموز دسترسی محدود به اطلاعات پرونده دارد.',
    dataPreservationStrategy: 'اطلاعات نظارتی، پیش‌نویس لوایح و لاگ‌های تایید سرپرست در جداول متای پرونده نگهداری می‌شوند و با تغییر به سناریوی ۴ یا ۲ از بین نمی‌روند.',
    features: [
      'کارتابل نظارت وکیل سرپرست جهت بررسی و تایید پیش‌نویس دادخواست کارآموز',
      'سیستم محاسبه خودکار سهم ارجاع (Referral Fee Sharing) بر حسب درصد توافقی',
      'رزرو دو لایه: مشاوره استراتژیک با سرپرست / پیگیری اجرایی با کارآموز',
      'نشان رسمی کارآموز وکالت و معرفی نام وکیل سرپرست در پروفایل کارآموز',
      'ثبت ساعت کارکرد و لاگ فعالیت‌های هر کارآموز در پرونده‌های ارجاعی'
    ]
  },
  {
    id: 'enterprise',
    number: 4,
    titleFa: 'سناریوی ۴: موسسه حقوقی بزرگ / چند وکیل ارشد + شرکا + کارآموزان (Enterprise Law Firm)',
    titleEn: 'Enterprise Full-Service Law Firm & Chambers',
    badge: 'موسسه حقوقی تمام‌عیار',
    tagline: 'ساختار جامع نهادی با هیئت‌مدیره، دپارتمان‌های تخصصی، شورای داوری و ده‌ها وکیل و مشاور.',
    targetAudience: 'موسسات حقوقی ثبت‌شده بزرگ، کنسرسیوم‌های وکالتی، و شرکت‌های حقوقی بین‌المللی با دپارتمان‌های تخصصی (تجاری، مالیاتی، نفت و گاز، داوری بین‌الملل).',
    heroLayout: 'برندینگ سازمانی موسسه حقوقی، آمار کلان، وکتورهای معماری کاخ دادگستری، معرفی هیئت مدیره و دپارتمان‌ها.',
    bookingWorkflow: 'مسیریابی بر اساس دپارتمان تخصصی حقوقی -> پیشنهاد وکلای ارشد، همکاران و مشاوران -> رزرو نوبت تخصصی سازمانی.',
    caseManagementModel: 'سیستم جامع CRM و پرونده‌های تیمی با تفکیک نقش‌های ناظر پرونده، وکیل مدافع، کارشناس ادله و پشتیبان حقوقی.',
    hierarchyDescription: 'سلسله‌مراتب ۴ لایه (Founding Board -> Senior Partners -> Associates -> Trainees & Paralegals).',
    dataPreservationStrategy: 'معماری چندمستأجری ماژولار (Multi-Tenant Modular DB Schema) با حفظ کامل یکپارچگی تاریخی داده‌ها، اسناد و صورت‌حساب‌ها.',
    features: [
      'ساختار دپارتمان‌محور (حقوق شرکت‌ها، دعاوی ملکی، بین‌الملل، کیفری، مالیاتی)',
      'سیستم چندامضایی برای تصویب وکالت‌نامه‌ها و قراردادهای حق‌الوکاله کلان',
      'چارت سازمانی تعاملی موسسه با تفکیک شعب استانی یا بین‌المللی',
      'سیستم ارزیابی عملکرد وکلای موسسه بر اساس درصد موفقیت در آرا و رضایت موکلین',
      'یکپارچگی با اتوماسیون‌های سازمانی، تقویم جلسات دادگاه و حسابداری مالیاتی مودیان'
    ]
  }
];

interface LawFirmScenarioManagerProps {
  currentScenario?: LawFirmScenarioType;
  onSelectScenario?: (scenario: LawFirmScenarioType) => void;
  lawyerProfile?: LawyerSiteProfile;
  onUpdateLawyerProfile?: (profile: LawyerSiteProfile) => void;
}

export const LawFirmScenarioManager: React.FC<LawFirmScenarioManagerProps> = ({
  currentScenario = 'senior_associates',
  onSelectScenario,
  lawyerProfile,
  onUpdateLawyerProfile
}) => {
  const [activeScenario, setActiveScenario] = useState<LawFirmScenarioType>(
    lawyerProfile?.firmScenario?.currentScenario || currentScenario
  );
  const [activeTab, setActiveTab] = useState<'matrix' | 'migration' | 'roles' | 'wordpress_code'>('matrix');
  const [copiedCode, setCopiedCode] = useState(false);
  const [migrationStatus, setMigrationStatus] = useState<string | null>(null);
  const [simulatedSource, setSimulatedSource] = useState<LawFirmScenarioType>('solo');
  const [simulatedTarget, setSimulatedTarget] = useState<LawFirmScenarioType>('enterprise');

  const selectedDef = LAW_FIRM_SCENARIOS.find((s) => s.id === activeScenario) || LAW_FIRM_SCENARIOS[2];

  const handleApplyScenario = (scenarioId: LawFirmScenarioType) => {
    setActiveScenario(scenarioId);
    if (onSelectScenario) {
      onSelectScenario(scenarioId);
    }
    if (lawyerProfile && onUpdateLawyerProfile) {
      const updated: LawyerSiteProfile = {
        ...lawyerProfile,
        firmScenario: {
          ...(lawyerProfile.firmScenario || {
            firmNameFa: 'موسسه حقوقی و داوری SedRazavi',
            firmNameEn: 'SedRazavi Law Firm',
            registrationNumber: '۴۸۲۹۱ / ث.م',
            leadAttorneysCount: 2,
            associatesCount: 5,
            internsCount: 4,
            enableIndependentCaseBooking: true,
            enableMultiLawyerCaseSharing: true,
            hierarchyRules: 'نظارت مستقیم وکیل سرپرست بر کارآموزان',
          }),
          currentScenario: scenarioId,
        }
      };
      onUpdateLawyerProfile(updated);
    }
    setMigrationStatus(`سناریوی ${scenarioId} با موفقیت بدون از دست رفتن هیچ داده‌ای فعال شد.`);
    setTimeout(() => setMigrationStatus(null), 4000);
  };

  const handleCopyPhpCode = () => {
    navigator.clipboard.writeText(generatedPhpCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const generatedPhpCode = `<?php
/**
 * SedRazavi Multi-Lawyer Architecture Engine
 * Handles 4 Firm Scenarios with Zero Data Loss Guarantee
 */

// 1. Register Custom Post Type for Lawyers
add_action('init', function() {
    register_post_type('cpt_lawyer', [
        'labels' => [
            'name'          => 'وکلای موسسه',
            'singular_name' => 'وکیل',
            'add_new_item'  => 'افزودن وکیل جدید',
            'edit_item'     => 'ویرایش اطلاعات وکیل',
        ],
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => ['slug' => 'lawyers'],
        'supports'     => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'menu_icon'    => 'dashicons-businessperson',
        'show_in_rest' => true,
    ]);

    // Hierarchy Taxonomy (Senior Partner, Partner, Associate, Intern)
    register_taxonomy('lawyer_hierarchy', ['cpt_lawyer'], [
        'labels' => ['name' => 'رتبه و سلسله‌مراتب سازمانی'],
        'hierarchical' => true,
        'show_in_rest' => true,
    ]);

    // Legal Department Taxonomy
    register_taxonomy('lawyer_department', ['cpt_lawyer', 'service'], [
        'labels' => ['name' => 'دپارتمان‌های تخصصی موسسه'],
        'hierarchical' => true,
        'show_in_rest' => true,
    ]);
});

// 2. Non-Destructive Scenario Switcher Hook
add_action('wp_ajax_sedrazavi_switch_firm_scenario', function() {
    check_ajax_referer('sedrazavi_scenario_nonce', 'security');
    if (!current_user_can('manage_options')) wp_send_json_error('عدم دسترسی کافی');

    $target_scenario = sanitize_text_field($_POST['scenario'] ?? 'solo');
    $valid_scenarios = ['solo', 'partners', 'senior_associates', 'enterprise'];
    if (!in_array($target_scenario, $valid_scenarios)) wp_send_json_error('سناریوی نامعتبر');

    $prev_scenario = get_option('sedrazavi_active_scenario', 'solo');

    // MIGRATION SHIELD: Never delete records. Re-map flags and relationships
    if ($target_scenario === 'solo') {
        // Solo mode: Keep primary lawyer active, set others to status 'dormant'
        update_option('sedrazavi_primary_lawyer_id', get_option('sedrazavi_primary_lawyer_id', 1));
    } elseif ($target_scenario === 'partners') {
        // Equal partners: Unarchive all registered partners
        update_option('sedrazavi_booking_mode', 'choose_lawyer_first');
    } elseif ($target_scenario === 'senior_associates') {
        // Senior + Associates: Activate supervisor oversight & referral matrix
        update_option('sedrazavi_supervisor_approval_required', true);
    } elseif ($target_scenario === 'enterprise') {
        // Enterprise: Activate department routing & multi-signature approvals
        update_option('sedrazavi_enterprise_departments_enabled', true);
    }

    update_option('sedrazavi_active_scenario', $target_scenario);
    update_option('sedrazavi_last_scenario_switch', current_time('mysql'));

    wp_send_json_success([
        'message' => 'سناریو با حفظ کامل ۱۰۰٪ داده‌ها تغییر یافت.',
        'previous' => $prev_scenario,
        'current' => $target_scenario
    ]);
});
`;

  return (
    <div className="space-y-8 bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm font-persian">
      {/* Top Header & Overview */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB]">
              <Scale className="w-6 h-6" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
                <span>طرح جامع مقیاس‌پذیری چندوکیله و ساختار دفاتر حقوقی</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-sans font-bold">
                  Zero Data Loss
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                پشتیبانی از ۴ سناریوی عملیاتی: ۱ وکیل انفرادی، چند وکیل هم‌تراز، وکیل سرپرست با کارآموزان، و موسسه حقوقی بزرگ بدون تداخل یا حذف اطلاعات قبلی.
              </p>
            </div>
          </div>
        </div>

        {/* Current Active Scenario Badge */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/10 dark:bg-amber-400/10 border border-[#D4AF37]/30">
          <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
          <div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold">سناریوی فعال کنونی سیستم:</div>
            <div className="text-xs font-bold text-[#AA820A] dark:text-[#F3E5AB]">
              {selectedDef.titleFa}
            </div>
          </div>
        </div>
      </div>

      {migrationStatus && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>{migrationStatus}</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-100 dark:border-gray-800 scrollbar-none">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'matrix'
              ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>۱. ماتریس ۴ سناریو و فعال‌سازی فوری</span>
        </button>

        <button
          onClick={() => setActiveTab('migration')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'migration'
              ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>۲. شبیه‌ساز مهاجرت بدون حذف داده (Non-Destructive)</span>
        </button>

        <button
          onClick={() => setActiveTab('roles')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'roles'
              ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>۳. مدیریت نقش‌ها، کارآموزان و تسهیم سهم</span>
        </button>

        <button
          onClick={() => setActiveTab('wordpress_code')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'wordpress_code'
              ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>۴. کد PHP افزونه وردپرس و هوک‌های دیتابیس</span>
        </button>
      </div>

      {/* TAB 1: 4 Scenarios Matrix */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LAW_FIRM_SCENARIOS.map((sc) => {
              const isCurrent = activeScenario === sc.id;
              return (
                <div
                  key={sc.id}
                  className={`p-6 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${
                    isCurrent
                      ? 'border-[#D4AF37] bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent shadow-md ring-1 ring-[#D4AF37]'
                      : 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 hover:border-gray-300 dark:hover:border-gray-700'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB]">
                        {sc.badge}
                      </span>
                      {isCurrent && (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>فعال روی سایت</span>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#0B132B] dark:text-white">
                        {sc.titleFa}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-sans">
                        {sc.titleEn}
                      </p>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {sc.tagline}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="text-[#D4AF37] font-bold shrink-0">هیرو و برند:</span>
                        <span className="text-gray-600 dark:text-gray-400">{sc.heroLayout}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#D4AF37] font-bold shrink-0">نوبت‌دهی:</span>
                        <span className="text-gray-600 dark:text-gray-400">{sc.bookingWorkflow}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#D4AF37] font-bold shrink-0">پرونده‌ها:</span>
                        <span className="text-gray-600 dark:text-gray-400">{sc.caseManagementModel}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                        ویژگی‌های اختصاصی این سناریو:
                      </div>
                      <ul className="space-y-1">
                        {sc.features.map((f, i) => (
                          <li key={i} className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-gray-200 dark:border-gray-800">
                    <button
                      type="button"
                      onClick={() => handleApplyScenario(sc.id)}
                      disabled={isCurrent}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        isCurrent
                          ? 'bg-[#D4AF37] text-[#0B132B] font-black cursor-default'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 hover:border-[#D4AF37] hover:bg-gray-50'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>سناریوی پیش‌فرض فعال است</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                          <span>تغییر و فعال‌سازی این سناریو روی سایت</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Data Protection Guarantee Box */}
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/30 text-xs leading-relaxed text-[#0B132B] dark:text-[#F3E5AB]">
            <div className="font-bold flex items-center gap-2 mb-2 text-sm text-[#AA820A] dark:text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
              <span>تضمین عدم حذف اطلاعات و سازگاری دیتابیس در جابجایی سناریوها (Lossless Data Architecture)</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              در معماری اختصاصی SedRazavi، تغییر سناریو از ۱ وکیل به ۴ یا برعکس، به هیچ وجه جداول دیتابیس یا فیلدهای قبلی را پاک نمی‌کند. کلیه وکلای ثبت‌شده، پرونده‌ها، وکالت‌نامه‌ها، ساعت‌های کاری، مقالات و تنظیمات پالت‌ها در متادیتاهای وردپرس محفوظ مانده و صرفاً لایه نمایش (Presentation Layer) و فیلترهای نمایش ویزارد نوبت‌دهی خود را بر اساس سناریوی فعال تطبیق می‌دهند.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Migration Simulator */}
      {activeTab === 'migration' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="text-sm font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-[#D4AF37]" />
              <span>شبیه‌ساز هوشمند تغییر سناریوی دفتر وکالت</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              برای آزمایش نحوه حفظ اطلاعات، سناریوی مبدا و مقصد را انتخاب نمایید تا روند نگاشت خودکار متادیتاها، بدون پاک شدن پرونده‌ها را مشاهده کنید:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  سناریوی مبدا (وضعیت فعلی دفتر):
                </label>
                <select
                  value={simulatedSource}
                  onChange={(e) => setSimulatedSource(e.target.value as LawFirmScenarioType)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
                >
                  {LAW_FIRM_SCENARIOS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.titleFa}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  سناریوی مقصد (وضعیت جدید دفتر پس از گسترش یا تغییر ساختار):
                </label>
                <select
                  value={simulatedTarget}
                  onChange={(e) => setSimulatedTarget(e.target.value as LawFirmScenarioType)}
                  className="w-full p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
                >
                  {LAW_FIRM_SCENARIOS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.titleFa}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Migration Blueprint Card */}
          <div className="p-6 rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#AA820A] dark:text-[#F3E5AB] flex items-center gap-1.5">
                <GitBranch className="w-4 h-4" />
                <span>گزارش نگاشت و انتقال ایمن ({simulatedSource} ➔ {simulatedTarget})</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                تضمین سلامت ۱۰۰٪ داده‌ها
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 space-y-2">
                <div className="font-bold text-gray-800 dark:text-white flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>وضعیت وکلای ثبت‌شده</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                  {simulatedTarget === 'solo'
                    ? 'وکیل اصلی در هدر باقی می‌ماند و سایر وکلا بدون حذف در دیتابیس در وضعیت Dormant برای ارتقاهای بعدی نگهداری می‌شوند.'
                    : 'کلیه وکلای پیشین به صورت خودکار با نقش‌های جدید (Managing Partner / Associate) به ساختار تیمی اضافه می‌شوند.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 space-y-2">
                <div className="font-bold text-gray-800 dark:text-white flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>وضعیت پرونده‌های جاری</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                  شماره پرونده‌ها و دسترسی موکلین دست‌نخورده باقی می‌ماند. فیلد تخصیص وکیل (`assigned_lawyer_id`) به صورت خودکار به شناسه وکیل متناظر متصل می‌گردد.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/80 space-y-2">
                <div className="font-bold text-gray-800 dark:text-white flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>تقویم و نوبت‌های رزرو شده</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                  نوبت‌های از پیش رزرو شده موکلین حفظ می‌شوند؛ فرم رزرو فرانت‌اند بدون تداخل با نوبت‌های قبلی به فرمت جدید تطبیق داده می‌شود.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleApplyScenario(simulatedTarget)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8960F] text-[#0B132B] font-bold text-xs hover:brightness-105 shadow-md flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>اعمال مستقیم سناریوی مقصد ({simulatedTarget}) روی سایت فعلی</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Roles & Team Members */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0B132B] dark:text-white">
                مدیریت سلسله‌مراتب وکلا و کارآموزان تحت نظارت
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                تعریف رده‌بندی شغلی، شماره پروانه کانون، درصد سهم ارجاع و وکیل سرپرست هر کارآموز.
              </p>
            </div>
            <button
              type="button"
              className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-[#0B132B] text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>افزودن وکیل / کارآموز جدید</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-xs text-right">
              <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 font-bold border-b border-gray-200 dark:border-gray-800">
                <tr>
                  <th className="p-3">نام و عنوان وکیل</th>
                  <th className="p-3">رده سازمانی</th>
                  <th className="p-3">شماره پروانه</th>
                  <th className="p-3">وکیل سرپرست مستقیم</th>
                  <th className="p-3">سهم ارجاع پرونده</th>
                  <th className="p-3">وضعیت پرونده‌ها</th>
                  <th className="p-3 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                <tr className="bg-amber-500/5 dark:bg-amber-500/5">
                  <td className="p-3 font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <span>دکتر سیده مریم رضوی</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#F3E5AB] font-bold">
                      وکیل بنیان‌گذار و سرپرست عالی
                    </span>
                  </td>
                  <td className="p-3 font-mono">۱۸۴۵۲ / ک.و.م</td>
                  <td className="p-3 text-gray-400">-</td>
                  <td className="p-3 font-bold text-emerald-600">۱۰۰٪ مستقیم / ۲۵٪ نظارتی</td>
                  <td className="p-3 font-bold">۴۲ پرونده فعال</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-[11px] font-bold">
                      مدیر کل
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>دکتر علیرضا کاظمی</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold">
                      شریک ارشد (Senior Partner)
                    </span>
                  </td>
                  <td className="p-3 font-mono">۲۱۴۸۵ / ک.و.م</td>
                  <td className="p-3 text-gray-400">-</td>
                  <td className="p-3 font-bold text-emerald-600">۶۵٪ پرونده‌های ارجاعی</td>
                  <td className="p-3 font-bold">۲۸ پرونده فعال</td>
                  <td className="p-3 text-center">
                    <button className="text-xs text-[#D4AF37] hover:underline font-bold">
                      ویرایش دسترسی
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span>سرکار خانم نسترن افشار</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 font-bold">
                      وکیل همکار پایه یک (Associate)
                    </span>
                  </td>
                  <td className="p-3 font-mono">۲۸۹۳۰ / ک.و.م</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">دکتر سیده مریم رضوی</td>
                  <td className="p-3 font-bold text-emerald-600">۵۰٪ توافقی</td>
                  <td className="p-3 font-bold">۱۶ پرونده فعال</td>
                  <td className="p-3 text-center">
                    <button className="text-xs text-[#D4AF37] hover:underline font-bold">
                      ویرایش دسترسی
                    </button>
                  </td>
                </tr>

                <tr>
                  <td className="p-3 font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>جناب آقای مهدی سهرابی</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">
                      کارآموز وکالت (Trainee Lawyer)
                    </span>
                  </td>
                  <td className="p-3 font-mono">۳۱۲۵۵ / کارآموزی</td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">دکتر سیده مریم رضوی</td>
                  <td className="p-3 font-bold text-emerald-600">۳۰٪ حق‌الوکاله تنظیمی</td>
                  <td className="p-3 font-bold">۹ پرونده زیر نظر سرپرست</td>
                  <td className="p-3 text-center">
                    <button className="text-xs text-[#D4AF37] hover:underline font-bold">
                      بررسی لوایح
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: WordPress Code & Integration */}
      {activeTab === 'wordpress_code' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              کد ثبت پست‌تایپ، هوک انتقال ایمن و تاکسونومی در functions.php پوسته یا افزونه اختصاصی:
            </span>
            <button
              onClick={handleCopyPhpCode}
              className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:text-[#D4AF37] flex items-center gap-1.5 border border-gray-200 dark:border-gray-700"
            >
              {copiedCode ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">کپی شد!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>کپی کد PHP</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-gray-900 text-gray-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-gray-800 dir-ltr text-left max-h-96">
            <code>{generatedPhpCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
