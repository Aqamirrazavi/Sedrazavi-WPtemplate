import React, { useState, useMemo } from 'react';
import {
  Heart,
  Users,
  Scale,
  Calculator,
  FileText,
  DollarSign,
  Calendar,
  Sparkles,
  ShieldAlert,
  Info,
  CheckCircle2,
  Printer,
  Copy,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  Landmark,
  Baby,
  UserCheck,
} from 'lucide-react';
import { ATTORNEY_INFO } from '../../data/mockData';

// Central Bank Inflation Index Mock (Official historical benchmark for Article 1082)
const CBI_INFLATION_INDICES: Record<number, number> = {
  1360: 0.12,
  1365: 0.28,
  1370: 1.05,
  1375: 4.31,
  1380: 9.88,
  1385: 18.52,
  1390: 44.80,
  1395: 104.2,
  1396: 114.2,
  1397: 154.5,
  1398: 218.4,
  1399: 310.2,
  1400: 442.8,
  1401: 651.9,
  1402: 985.4,
  1403: 1390.0,
};

export type FamilySuiteTab =
  | 'inheritance_calc'
  | 'mehrieh_index'
  | 'ojrat_al_mesl'
  | 'divorce_agreement';

export const FamilyInheritanceSuite: React.FC<{
  onBackToHome?: () => void;
  onOpenBooking?: () => void;
}> = ({ onBackToHome, onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<FamilySuiteTab>('inheritance_calc');

  // ==========================================
  // TAB 1: INHERITANCE CALCULATOR STATE
  // ==========================================
  const [deceasedGender, setDeceasedGender] = useState<'male' | 'female'>('male');
  const [estateTotalToman, setEstateTotalToman] = useState<number>(12000000000); // 12 Billion Toman
  const [funeralAndDebtsToman, setFuneralAndDebtsToman] = useState<number>(800000000); // 800M
  const [willAmountToman, setWillAmountToman] = useState<number>(1000000000); // 1B (up to 1/3)
  const [hasSpouse, setHasSpouse] = useState<boolean>(true);
  const [spouseCount, setSpouseCount] = useState<number>(1); // if male deceased
  const [fatherAlive, setFatherAlive] = useState<boolean>(true);
  const [motherAlive, setMotherAlive] = useState<boolean>(true);
  const [sonCount, setSonCount] = useState<number>(2);
  const [daughterCount, setDaughterCount] = useState<number>(1);

  // Inheritance Calculation Logic
  const inheritanceCalculation = useMemo(() => {
    // 1. Net Estate after debts
    const estateAfterDebts = Math.max(0, estateTotalToman - funeralAndDebtsToman);
    // 2. Validate Will (max 1/3 without heirs consent - Article 843)
    const maxPermissibleWill = estateAfterDebts / 3;
    const effectiveWill = Math.min(willAmountToman, maxPermissibleWill);
    const distributableEstate = Math.max(0, estateAfterDebts - effectiveWill);

    const hasChildren = sonCount > 0 || daughterCount > 0;
    const heirs: {
      relation: string;
      fractionStr: string;
      percentage: number;
      amountToman: number;
      legalBasis: string;
    }[] = [];

    // Spouse Share
    let spouseTotalAmount = 0;
    if (hasSpouse) {
      if (deceasedGender === 'male') {
        // Wife inherits 1/8 if children exist, 1/4 if no children (Article 901)
        const fraction = hasChildren ? 1 / 8 : 1 / 4;
        spouseTotalAmount = distributableEstate * fraction;
        heirs.push({
          relation: spouseCount > 1 ? `زوجه‌ها (${spouseCount} همسر مشترکاً)` : 'زوجه (همسر دائمی متوفی)',
          fractionStr: hasChildren ? '۱/۸ (یک‌هشتم ماترک)' : '۱/۴ (یک‌چهارم ماترک)',
          percentage: (hasChildren ? 12.5 : 25),
          amountToman: spouseTotalAmount,
          legalBasis: hasChildren
            ? 'ماده ۹۰۰ و ۹۴۶ ق.م (به علت وجود فرزند، سهم زوجه از یک‌چهارم به یک‌هشتم تقلیل می‌یابد)'
            : 'ماده ۹۰۰ ق.م (یک‌چهارم ترکه به دلیل فقدان اولاد)',
        });
      } else {
        // Husband inherits 1/4 if children exist, 1/2 if no children
        const fraction = hasChildren ? 1 / 4 : 1 / 2;
        spouseTotalAmount = distributableEstate * fraction;
        heirs.push({
          relation: 'زوج (شوهر متوفی)',
          fractionStr: hasChildren ? '۱/۴ (یک‌چهارم ماترک)' : '۱/۲ (یک‌دوم ماترک)',
          percentage: hasChildren ? 25 : 50,
          amountToman: spouseTotalAmount,
          legalBasis: hasChildren
            ? 'ماده ۹۰۰ ق.م (یک‌چهارم ترکه به علت وجود اولاد)'
            : 'ماده ۸۹۹ ق.م (نصف ترکه به علت فقدان اولاد)',
        });
      }
    }

    let remainingAfterSpouse = distributableEstate - spouseTotalAmount;

    // Parents Share
    let fatherAmount = 0;
    let motherAmount = 0;

    if (fatherAlive && motherAlive) {
      if (hasChildren) {
        // Both parents get 1/6 (Article 908)
        fatherAmount = distributableEstate * (1 / 6);
        motherAmount = distributableEstate * (1 / 6);
        heirs.push({
          relation: 'پدر متوفی',
          fractionStr: '۱/۶ (یک‌ششم ماترک)',
          percentage: (1 / 6) * 100,
          amountToman: fatherAmount,
          legalBasis: 'ماده ۹۰۸ قانون مدنی (فرض پدر با وجود اولاد یک‌ششم است)',
        });
        heirs.push({
          relation: 'مادر متوفی',
          fractionStr: '۱/۶ (یک‌ششم ماترک)',
          percentage: (1 / 6) * 100,
          amountToman: motherAmount,
          legalBasis: 'ماده ۹۰۸ قانون مدنی (فرض مادر با وجود اولاد سدس است)',
        });
        remainingAfterSpouse -= (fatherAmount + motherAmount);
      } else {
        // No children: Mother gets 1/3 (unless hajab by brothers/sisters)
        motherAmount = distributableEstate * (1 / 3);
        fatherAmount = remainingAfterSpouse - motherAmount;
        heirs.push({
          relation: 'مادر متوفی',
          fractionStr: '۱/۳ (یک‌سوم ماترک)',
          percentage: 33.33,
          amountToman: motherAmount,
          legalBasis: 'ماده ۹۰۶ ق.م (فرض مادر در صورت نبود اولاد ثلث ترکه است)',
        });
        heirs.push({
          relation: 'پدر متوفی',
          fractionStr: 'باقیمانده ترکه (قرابت)',
          percentage: (fatherAmount / distributableEstate) * 100,
          amountToman: fatherAmount,
          legalBasis: 'ماده ۹۰۶ ق.م (پدر مازاد ترکه را به قرابت به ارث می‌برد)',
        });
        remainingAfterSpouse = 0;
      }
    } else if (fatherAlive && !motherAlive) {
      if (hasChildren) {
        fatherAmount = distributableEstate * (1 / 6);
        heirs.push({
          relation: 'پدر متوفی',
          fractionStr: '۱/۶ (یک‌ششم ماترک)',
          percentage: (1 / 6) * 100,
          amountToman: fatherAmount,
          legalBasis: 'ماده ۹۰۸ قانون مدنی',
        });
        remainingAfterSpouse -= fatherAmount;
      } else {
        fatherAmount = remainingAfterSpouse;
        heirs.push({
          relation: 'پدر متوفی',
          fractionStr: 'کل باقیمانده به قرابت',
          percentage: (fatherAmount / distributableEstate) * 100,
          amountToman: fatherAmount,
          legalBasis: 'ماده ۹۰۶ قانون مدنی',
        });
        remainingAfterSpouse = 0;
      }
    } else if (!fatherAlive && motherAlive) {
      if (hasChildren) {
        motherAmount = distributableEstate * (1 / 6);
        heirs.push({
          relation: 'مادر متوفی',
          fractionStr: '۱/۶ (یک‌ششم ماترک)',
          percentage: (1 / 6) * 100,
          amountToman: motherAmount,
          legalBasis: 'ماده ۹۰۸ قانون مدنی',
        });
        remainingAfterSpouse -= motherAmount;
      } else {
        motherAmount = remainingAfterSpouse;
        heirs.push({
          relation: 'مادر متوفی',
          fractionStr: 'فرض و رد قانونی',
          percentage: (motherAmount / distributableEstate) * 100,
          amountToman: motherAmount,
          legalBasis: 'ماده ۹۰۶ ق.م (ثلث را فرضاً و مابقی را رداً مالک می‌شود)',
        });
        remainingAfterSpouse = 0;
      }
    }

    // Children Share (للذکر مثل حظ الانثیین - Article 907)
    if (hasChildren && remainingAfterSpouse > 0) {
      const totalUnits = (sonCount * 2) + (daughterCount * 1);
      if (totalUnits > 0) {
        const unitValue = remainingAfterSpouse / totalUnits;
        if (sonCount > 0) {
          const totalSonsAmount = unitValue * 2 * sonCount;
          heirs.push({
            relation: `پسران (${sonCount} فرزند ذکور - هرکدام ${(unitValue * 2).toLocaleString('fa-IR')} تومان)`,
            fractionStr: `۲ سهم از هر واحد (مجموعاً ${((totalSonsAmount / distributableEstate) * 100).toFixed(1)}٪)`,
            percentage: (totalSonsAmount / distributableEstate) * 100,
            amountToman: totalSonsAmount,
            legalBasis: 'ماده ۹۰۷ ق.م (سهم هر پسر دو برابر سهم دختر خواهد بود)',
          });
        }
        if (daughterCount > 0) {
          const totalDaughtersAmount = unitValue * 1 * daughterCount;
          heirs.push({
            relation: `دختران (${daughterCount} فرزند اناث - هرکدام ${unitValue.toLocaleString('fa-IR')} تومان)`,
            fractionStr: `۱ سهم از هر واحد (مجموعاً ${((totalDaughtersAmount / distributableEstate) * 100).toFixed(1)}٪)`,
            percentage: (totalDaughtersAmount / distributableEstate) * 100,
            amountToman: totalDaughtersAmount,
            legalBasis: 'ماده ۹۰۷ ق.م',
          });
        }
      }
    }

    return {
      distributableEstate,
      effectiveWill,
      heirs,
    };
  }, [
    deceasedGender,
    estateTotalToman,
    funeralAndDebtsToman,
    willAmountToman,
    hasSpouse,
    spouseCount,
    fatherAlive,
    motherAlive,
    sonCount,
    daughterCount,
  ]);

  // ==========================================
  // TAB 2: MEHRIEH CENTRAL BANK CALCULATOR STATE
  // ==========================================
  const [marriageYear, setMarriageYear] = useState<number>(1385);
  const [claimYear, setClaimYear] = useState<number>(1403);
  const [nominalMehriehToman, setNominalMehriehToman] = useState<number>(5000000); // 5 Million Toman in 1385
  const [isDeceasedHusband, setIsDeceasedHusband] = useState<boolean>(false);
  const [husbandDeathYear, setHusbandDeathYear] = useState<number>(1402);

  const mehriehCalculation = useMemo(() => {
    const startIdx = CBI_INFLATION_INDICES[marriageYear] || 18.52;
    // If husband passed away, index of the death year is used (Article 3 Executive By-law)
    const effectiveYear = isDeceasedHusband ? husbandDeathYear : claimYear;
    // Formula: (Index of year before claim / Index of marriage year) * Nominal amount
    // In CBI practice, Year-1 index is used for standard claims
    const endIdxYear = effectiveYear <= 1360 ? 1360 : effectiveYear;
    const endIdx = CBI_INFLATION_INDICES[endIdxYear] || 1390.0;

    const multiplier = endIdx / startIdx;
    const calculatedCurrentValue = nominalMehriehToman * multiplier;

    // Golden Bahar Azadi coin equivalence estimation (~43 million toman per coin in 1403)
    const goldCoinsEquiv = Math.round(calculatedCurrentValue / 43000000);

    return {
      startIdx,
      endIdx,
      multiplier,
      calculatedCurrentValue,
      goldCoinsEquiv,
      statutoryRule: isDeceasedHusband
        ? 'ماده ۳ آیین‌نامه اجرایی قانون الحاق یک تبصره به ماده ۱۰۸۲ ق.م: در صورت فوت زوج، شاخص سال فوت ملاک محاسبه قرار می‌گیرد.'
        : 'تبصره الحاقی به ماده ۱۰۸۲ قانون مدنی مصوب ۱۳۷۶ و آیین‌نامه اجرایی شماره ۶۳۷۶۳ مورخ ۱۳۷۷/۰۲/۲۹ هیأت وزیران.',
    };
  }, [marriageYear, claimYear, nominalMehriehToman, isDeceasedHusband, husbandDeathYear]);

  // ==========================================
  // TAB 3: OJRAT AL-MESL CALCULATOR
  // ==========================================
  const [yearsOfMarriage, setYearsOfMarriage] = useState<number>(14);
  const [childrenCount, setChildrenCount] = useState<number>(2);
  const [educationLevel, setEducationLevel] = useState<'دیپلم' | 'لیسانس' | 'فوق‌لیسانس و بالاتر'>('لیسانس');
  const [hadMaid, setHadMaid] = useState<boolean>(false);
  const [nursingSickRelatives, setNursingSickRelatives] = useState<boolean>(true);

  const ojratAlMeslEstimate = useMemo(() => {
    // Base annual benchmark estimation by expert courts in Tehran (1403)
    let annualBase = 22000000; // 22M Toman/year base
    if (educationLevel === 'لیسانس') annualBase += 4000000;
    if (educationLevel === 'فوق‌لیسانس و بالاتر') annualBase += 8000000;
    if (childrenCount > 2) annualBase += 5000000;
    if (nursingSickRelatives) annualBase += 7000000;
    if (hadMaid) annualBase -= 8000000;

    const totalEstimate = Math.max(10000000, annualBase * yearsOfMarriage);
    const minRange = Math.round(totalEstimate * 0.85);
    const maxRange = Math.round(totalEstimate * 1.2);

    return {
      annualBase,
      totalEstimate,
      minRange,
      maxRange,
    };
  }, [yearsOfMarriage, childrenCount, educationLevel, hadMaid, nursingSickRelatives]);

  // ==========================================
  // TAB 4: MUTUAL DIVORCE GENERATOR
  // ==========================================
  const [wifeName, setWifeName] = useState('زهرا کریمی');
  const [husbandName, setHusbandName] = useState('امیررضا صابری');
  const [mehriehCondition, setMehriehCondition] = useState<'bazol_all' | 'bazol_partial' | 'paid'>('bazol_partial');
  const [partialMehriehText, setPartialMehriehText] = useState('بذل ۱۰۰ سکه تمام بهار آزادی و دریافت ۲۰ سکه نقداً');
  const [custodyHolder, setCustodyHolder] = useState<'mother' | 'father'>('mother');
  const [childVisitSchedule, setChildVisitSchedule] = useState('از ساعت ۱۰ پنج‌شنبه لغایت ۲۰ روز جمعه هر هفته');
  const [childAlimonyAmount, setChildAlimonyAmount] = useState('ماهیانه مبلغ ۶,۰۰۰,۰۰۰ تومان به عنوان نفقه فرزند');
  const [isCopiedAgreement, setIsCopiedAgreement] = useState(false);

  const agreementText = useMemo(() => {
    return `بسمه تعالی
صورت‌جلسه توافقات رسمی و قطعی زوجین جهت طلاق توافقی (خلع نوبه‌ای)

طرف اول (زوجه): خانم ${wifeName}
طرف دوم (زوج): آقای ${husbandName}

مقدمه:
طرفین پس از بررسی‌های لازم و عدم امکان ادامه زندگی مشترک، توافق نمودند با شرایط ذیل درخواست صدور گواهی عدم امکان سازش (طلاق توافقی) را به دادگاه محترم خانواده تقدیم نمایند:

بند ۱ - مهریه و صداق:
${
  mehriehCondition === 'bazol_all'
    ? 'زوجه در قبال اجرای صیغه طلاق خلع، کلیه حقوق مالی ناشی از مهریه مافی‌القباله را به زوج بذل نموده و حق رجوع به مابذل را از خود سلب و ساقط می‌نماید.'
    : mehriehCondition === 'bazol_partial'
    ? `زوجه از کل مهریه خود، بخش ${partialMehriehText} را بذل نموده و مابقی مورد توافق طرفین تادیه یا اسقاط می‌گردد.`
    : 'کلیه حقوق مهریه قبلاً به زوجه پرداخت گردیده و زوجه ادعایی در این خصوص ندارد.'
}

بند ۲ - نفقه و اجرت‌المثل ایام زوجیت:
زوجه نسبت به نفقه گذشته و معوقه، نفقه ایام عده و اجرت‌المثل کارهای منزل اعلام رضایت و سازش نموده و ادعای مالی نخواهد داشت.

بند ۳ - جهیزیه:
زوجه جهیزیه خود را وفق سیاهه استرداد نموده یا زوج متعهد است ظرف مدت ۷۲ ساعت پس از ثبت دادنامه طلاق عین اقلام را تحویل نماید.

بند ۴ - حضانت و ملاقات فرزندان:
حضانت فرزند/فرزندان مشترک تا رسیدن به سن بلوغ شرعی با ${custodyHolder === 'mother' ? 'مادر' : 'پدر'} خواهد بود.
ملاقات طرف دیگر: ${childVisitSchedule}.
هزینه نگهداری و نفقه فرزند: زوج متعهد گردید ${childAlimonyAmount} به حساب زوجه واریز نماید.

بند ۵ - اسقاط تجدیدنظر و فرجام‌خواهی:
طرفین با امضای این سند، حق هرگونه اعتراض به دادنامه صادره، تجدیدنظرخواهی و فرجام‌خواهی را از خود سلب و ساقط نموده و به وکلای خود وکالت در اسقاط حق تجدیدنظرخواهی اعطا می‌نمایند.

امضای زوجه: .......................        امضای زوج: .......................
امضای وکیل زوجه: دکتر سیده مریم رضوی     امضای وکیل زوج: .......................`;
  }, [
    wifeName,
    husbandName,
    mehriehCondition,
    partialMehriehText,
    custodyHolder,
    childVisitSchedule,
    childAlimonyAmount,
  ]);

  const handleCopyAgreement = () => {
    navigator.clipboard?.writeText(agreementText);
    setIsCopiedAgreement(true);
    setTimeout(() => setIsCopiedAgreement(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] dark:bg-[#070D1E] py-8 sm:py-12 text-[#0B132B] dark:text-gray-100 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#16223F] to-[#0B132B] text-white shadow-xl border border-[#D4AF37]/30">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                حقوق خانواده، ارث و انحصار وراثت (Phase 13)
              </span>
              <span className="text-xs text-gray-400">سامانه محاسبات شرعی و قوانین موضوعه مدنی</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-white">
              میز تخصصی حقوق خانواده، تقسیم هوشمند ترکه و محاسبات مالی زناشویی
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
              محاسبه سهم‌الارث شرعی طبقات وراث و حجب، تعیین ارزش روز مهریه بر مبنای شاخص تورم بانک مرکزی (ماده ۱۰۸۲ ق.م)، برآورد کارشناسی اجرت‌المثل ایام زوجیت و مولد توافق‌نامه طلاق توافقی.
            </p>
          </div>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 shrink-0 self-start md:self-auto"
            >
              بازگشت به پیشخوان اصلی
            </button>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('inheritance_calc')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'inheritance_calc'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>محاسبه‌گر تخصصی سهم‌الارث و حجب ترکه</span>
          </button>

          <button
            onClick={() => setActiveTab('mehrieh_index')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'mehrieh_index'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>محاسبه مهریه به نرخ روز بانک مرکزی</span>
          </button>

          <button
            onClick={() => setActiveTab('ojrat_al_mesl')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'ojrat_al_mesl'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>برآورد اجرت‌المثل ایام زوجیت و نحله</span>
          </button>

          <button
            onClick={() => setActiveTab('divorce_agreement')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
              activeTab === 'divorce_agreement'
                ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>مولد توافق‌نامه رسمی طلاق توافقی</span>
          </button>
        </div>

        {/* TAB 1: INHERITANCE CALCULATOR */}
        {activeTab === 'inheritance_calc' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Parameters */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-sm text-[#0B132B] dark:text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#D4AF37]" />
                    <span>مشخصات متوفی و ارزش ماترک</span>
                  </h3>
                  <span className="text-[11px] text-gray-400">طبقه اول وراث</span>
                </div>

                {/* Deceased Gender */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">جنسیت متوفی:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeceasedGender('male')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        deceasedGender === 'male'
                          ? 'bg-[#0B132B] text-[#D4AF37] dark:bg-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      مرد (دارای زوجه)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeceasedGender('female')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        deceasedGender === 'female'
                          ? 'bg-[#0B132B] text-[#D4AF37] dark:bg-[#D4AF37] dark:text-[#0B132B] shadow-sm'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      زن (دارای زوج)
                    </button>
                  </div>
                </div>

                {/* Total Estate Value */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    کل ارزش دارایی‌ها و ترکه (تومان):
                  </label>
                  <input
                    type="number"
                    value={estateTotalToman}
                    onChange={(e) => setEstateTotalToman(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <div className="text-[11px] text-gray-400">
                    {(estateTotalToman / 10000000).toLocaleString('fa-IR')} میلیون تومان
                  </div>
                </div>

                {/* Debts & Funeral */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">
                      بدهی و دیون متوفی (تومان):
                    </label>
                    <input
                      type="number"
                      value={funeralAndDebtsToman}
                      onChange={(e) => setFuneralAndDebtsToman(Number(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">
                      مبلغ وصیت تملیکی (تا ۱/۳):
                    </label>
                    <input
                      type="number"
                      value={willAmountToman}
                      onChange={(e) => setWillAmountToman(Number(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs font-mono"
                    />
                  </div>
                </div>

                {/* Heirs Status */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      همسر در قید حیات:
                    </span>
                    <input
                      type="checkbox"
                      checked={hasSpouse}
                      onChange={(e) => setHasSpouse(e.target.checked)}
                      className="w-4 h-4 accent-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                      <span className="text-xs text-gray-600 dark:text-gray-400">پدر متوفی:</span>
                      <input
                        type="checkbox"
                        checked={fatherAlive}
                        onChange={(e) => setFatherAlive(e.target.checked)}
                        className="w-4 h-4 accent-[#D4AF37]"
                      />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                      <span className="text-xs text-gray-600 dark:text-gray-400">مادر متوفی:</span>
                      <input
                        type="checkbox"
                        checked={motherAlive}
                        onChange={(e) => setMotherAlive(e.target.checked)}
                        className="w-4 h-4 accent-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">
                        تعداد فرزندان پسر:
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={sonCount}
                        onChange={(e) => setSonCount(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs font-mono text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">
                        تعداد فرزندان دختر:
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={daughterCount}
                        onChange={(e) => setDaughterCount(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs font-mono text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partition Results & Legal Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-bold text-sm text-[#0B132B] dark:text-white">
                    جدول تسهیم قانونی و شرعی ترکه (مطابق قانون مدنی ایران)
                  </h3>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    ماترک خالص قابل تقسیم: {(inheritanceCalculation.distributableEstate / 10000000).toLocaleString('fa-IR')} میلیون تومان
                  </div>
                </div>

                {/* Heirs Table */}
                <div className="space-y-3">
                  {inheritanceCalculation.heirs.map((heir, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-gray-50 dark:bg-[#101b38] border border-gray-200/70 dark:border-gray-800 space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#D4AF37]/20 text-[#AA820A] dark:text-[#D4AF37] flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-xs text-[#0B132B] dark:text-white">
                            {heir.relation}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold">
                            {heir.fractionStr}
                          </span>
                          <span className="font-mono font-black text-sm text-[#0B132B] dark:text-white">
                            {Math.round(heir.amountToman).toLocaleString('fa-IR')} تومان
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed border-t border-gray-200/40 dark:border-gray-800/60 pt-1.5">
                        <span className="font-bold text-[#AA820A] dark:text-[#D4AF37]">مستند قانونی: </span>
                        {heir.legalBasis}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Judicial Advise Card */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/30 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#AA820A] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed space-y-1">
                    <div className="font-bold text-[#AA820A] dark:text-[#D4AF37]">
                      نکات کلیدی تحریر و افراز ترکه:
                    </div>
                    <p>
                      مطابق ماده ۹۴۶ اصلاحی قانون مدنی، زوجه هم از قیمت عرصه (زمین) و هم از قیمت اعیان (ساختمان) ارث می‌برد. تقسیم نهایی ترکه نیازمند صدور گواهی حصر وراثت از شورای حل اختلاف و در صورت عدم تراضی، طرح دادخواست «دستور فروش ملک مشاع» یا «تقسیم ترکه» در دادگاه عمومی حقوقی می‌باشد.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEHRIEH CALCULATOR */}
        {activeTab === 'mehrieh_index' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  محاسبه ارزش روز مهریه وجه رایج بر اساس شاخص تورم بانک مرکزی
                </h3>
                <p className="text-xs text-gray-500">
                  مستند به تبصره الحاقی به ماده ۱۰۸۲ قانون مدنی مصوب ۱۳۷۶ و آیین‌نامه اجرایی مصوب هیأت وزیران
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    مبلغ مهریه مندرج در سند ازدواج (تومان):
                  </label>
                  <input
                    type="number"
                    value={nominalMehriehToman}
                    onChange={(e) => setNominalMehriehToman(Number(e.target.value) || 0)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <div className="text-[11px] text-gray-400">
                    {nominalMehriehToman.toLocaleString('fa-IR')} تومان
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    سال وقوع عقد ازدواج (شمسی):
                  </label>
                  <select
                    value={marriageYear}
                    onChange={(e) => setMarriageYear(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs text-gray-700 dark:text-gray-200"
                  >
                    {[1360, 1365, 1370, 1375, 1380, 1385, 1390, 1395, 1398, 1400, 1401].map((yr) => (
                      <option key={yr} value={yr}>
                        سال {yr} (شاخص: {CBI_INFLATION_INDICES[yr]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Husband Deceased Toggle */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-gray-800 dark:text-white">
                    آیا مهریه پس از فوت زوج از ماترک مطالبه می‌شود؟
                  </div>
                  <div className="text-[11px] text-gray-400">
                    طبق ماده ۳ آیین‌نامه اجرایی، در صورت فوت شوهر، شاخص سال فوت ملاک است نه سال مطالبه.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isDeceasedHusband}
                  onChange={(e) => setIsDeceasedHusband(e.target.checked)}
                  className="w-5 h-5 accent-[#D4AF37]"
                />
              </div>

              {/* Result Box */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#D4AF37]/15 to-amber-500/10 border border-[#D4AF37]/40 text-center space-y-3">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  ارزش روز محاسبه‌شده مهریه در سال ۱۴۰۳:
                </div>
                <div className="text-3xl sm:text-4xl font-black text-[#AA820A] dark:text-[#D4AF37] font-serif">
                  {Math.round(mehriehCalculation.calculatedCurrentValue).toLocaleString('fa-IR')} تومان
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-300">
                  ضریب رشد برابری ارزش پول: <span className="font-bold text-[#0B132B] dark:text-white">{mehriehCalculation.multiplier.toFixed(2)} برابر</span>
                  {' | '}
                  معادل تقریبی: <span className="font-bold text-[#0B132B] dark:text-white">{mehriehCalculation.goldCoinsEquiv} سکه تمام بهار آزادی</span>
                </div>
                <div className="text-[11px] text-gray-500 max-w-xl mx-auto pt-2 border-t border-[#D4AF37]/20">
                  {mehriehCalculation.statutoryRule}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OJRAT AL-MESL */}
        {activeTab === 'ojrat_al_mesl' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white">
                  محاسبه‌گر برآورد اجرت‌المثل ایام زوجیت و نحله (ماده ۳۳۶ قانون مدنی)
                </h3>
                <p className="text-xs text-gray-500">
                  ارزیابی کارهای غیرواجب شرعی زوجه در منزل مشترک به دستور زوج و با قصد عدم تبرع
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    مدت زندگی مشترک (سال):
                  </label>
                  <input
                    type="number"
                    value={yearsOfMarriage}
                    onChange={(e) => setYearsOfMarriage(Number(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    سطح تحصیلات زوجه:
                  </label>
                  <select
                    value={educationLevel}
                    onChange={(e: any) => setEducationLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                  >
                    <option value="دیپلم">دیپلم یا پایین‌تر</option>
                    <option value="لیسانس">کارشناسی (لیسانس)</option>
                    <option value="فوق‌لیسانس و بالاتر">کارشناسی ارشد و دکتری</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    تعداد فرزندان مشترک:
                  </label>
                  <input
                    type="number"
                    value={childrenCount}
                    onChange={(e) => setChildrenCount(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-xs text-gray-700 dark:text-gray-300">نگهداری یا پرستاری از والدین بیمار زوج:</span>
                  <input
                    type="checkbox"
                    checked={nursingSickRelatives}
                    onChange={(e) => setNursingSickRelatives(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40">
                  <span className="text-xs text-gray-700 dark:text-gray-300">حضور مستخدم یا خدمتکار دائمی در منزل:</span>
                  <input
                    type="checkbox"
                    checked={hadMaid}
                    onChange={(e) => setHadMaid(e.target.checked)}
                    className="w-4 h-4 accent-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Estimate Output */}
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 text-center space-y-2">
                <div className="text-xs text-gray-500">محدوده برآورد نظریه کارشناسی رسمی دادگستری در پرونده‌های مشابه:</div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-serif">
                  {ojratAlMeslEstimate.minRange.toLocaleString('fa-IR')} الی {ojratAlMeslEstimate.maxRange.toLocaleString('fa-IR')} تومان
                </div>
                <div className="text-xs text-gray-400">
                  میانگین برآورد سالیانه: {(ojratAlMeslEstimate.annualBase).toLocaleString('fa-IR')} تومان به ازای هر سال زوجیت
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MUTUAL DIVORCE GENERATOR */}
        {activeTab === 'divorce_agreement' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <h4 className="font-bold text-sm text-[#0B132B] dark:text-white">تنظیم شروط و توافقات زوجین</h4>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">نام زوجه:</label>
                  <input
                    type="text"
                    value={wifeName}
                    onChange={(e) => setWifeName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">نام زوج:</label>
                  <input
                    type="text"
                    value={husbandName}
                    onChange={(e) => setHusbandName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">وضعیت مهریه:</label>
                  <select
                    value={mehriehCondition}
                    onChange={(e: any) => setMehriehCondition(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                  >
                    <option value="bazol_all">بذل تمام مهریه در قبال طلاق خلع</option>
                    <option value="bazol_partial">بذل بخشی از مهریه و تادیه مابقی</option>
                    <option value="paid">مهریه تماماً قبلاً تادیه شده است</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 dark:text-gray-400">حضانت فرزندان:</label>
                  <select
                    value={custodyHolder}
                    onChange={(e: any) => setCustodyHolder(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-xs"
                  >
                    <option value="mother">مادر (زوجه)</option>
                    <option value="father">پدر (زوج)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                  <h4 className="font-bold text-sm text-[#0B132B] dark:text-white">
                    پیش‌نمایش توافق‌نامه آماده امضا و ثبت در دادگاه
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyAgreement}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-200 flex items-center gap-1.5 transition-colors"
                    >
                      {isCopiedAgreement ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopiedAgreement ? 'کپی شد' : 'کپی متن'}</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-3 py-1.5 rounded-xl bg-[#D4AF37] text-[#0B132B] text-xs font-bold hover:bg-[#c29f2e] flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>چاپ رسمی (A4)</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/70 dark:border-gray-800 font-serif text-xs leading-relaxed whitespace-pre-line text-gray-800 dark:text-gray-200 select-all min-h-[280px]">
                  {agreementText}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
