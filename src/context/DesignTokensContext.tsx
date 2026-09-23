import React, { createContext, useContext, useState, useEffect } from 'react';

export interface TokenItem {
  key: string;
  label: string;
  category: 'personal' | 'contact' | 'pricing' | 'brand' | 'social' | 'legal';
  value: string;
  defaultValue: string;
  type: 'text' | 'textarea' | 'number' | 'color' | 'url' | 'email' | 'tel';
  helper: string;
}

export const DEFAULT_DESIGN_TOKENS: Record<string, TokenItem> = {
  // Category 1: Personal (5)
  'lawyer.name': {
    key: 'lawyer.name',
    label: 'نام وکیل (مختصر)',
    category: 'personal',
    value: 'دکتر سیده مریم رضوی',
    defaultValue: 'دکتر سیده مریم رضوی',
    type: 'text',
    helper: 'نام نمایشی در هدر، فوتر، مقالات و عنوان صفحات',
  },
  'lawyer.full_name': {
    key: 'lawyer.full_name',
    label: 'نام و عنوان رسمی کامل',
    category: 'personal',
    value: 'سرکار خانم دکتر سیده مریم رضوی (SedRazavi)',
    defaultValue: 'سرکار خانم دکتر سیده مریم رضوی (SedRazavi)',
    type: 'text',
    helper: 'عناوین تشریفاتی در سربرگ وکالت‌نامه‌ها و رزومه',
  },
  'lawyer.title': {
    key: 'lawyer.title',
    label: 'سمت تخصصی و حرفه‌ای',
    category: 'personal',
    value: 'وکیل پایه یک دادگستری و مشاور ارشد داوری بین‌المللی',
    defaultValue: 'وکیل پایه یک دادگستری و مشاور ارشد داوری بین‌المللی',
    type: 'text',
    helper: 'زیرعنوان نمایش در اسلایدر، بنر و متاتگ‌های سئو',
  },
  'lawyer.license': {
    key: 'lawyer.license',
    label: 'شماره پروانه وکالت',
    category: 'personal',
    value: '۱۸۴۵۲ / ک.و.م',
    defaultValue: '۱۸۴۵۲ / ک.و.م',
    type: 'text',
    helper: 'ثبت در اسکیما JSON-LD و فوتر رسمی کانون وکلا',
  },
  'lawyer.experience': {
    key: 'lawyer.experience',
    label: 'سال‌های سابقه وکالت (عدد)',
    category: 'personal',
    value: '۲۰',
    defaultValue: '۲۰',
    type: 'number',
    helper: 'شمارنده‌های صفحه اصلی و افتخارات',
  },

  // Category 2: Contact (5)
  'contact.phone': {
    key: 'contact.phone',
    label: 'شماره تلفن ثابت دفتر',
    category: 'contact',
    value: '۰۲۱-۸۸۹۹۰۰۱۱',
    defaultValue: '۰۲۱-۸۸۹۹۰۰۱۱',
    type: 'tel',
    helper: 'لینک tel: در بالای هدر و بخش تماس',
  },
  'contact.mobile': {
    key: 'contact.mobile',
    label: 'شماره همراه امور فوری و واتساپ',
    category: 'contact',
    value: '۰۹۱۲۳۴۵۶۷۸۹',
    defaultValue: '۰۹۱۲۳۴۵۶۷۸۹',
    type: 'tel',
    helper: 'پشتیبانی برخط و مشاوره اورژانسی',
  },
  'contact.email': {
    key: 'contact.email',
    label: 'پست الکترونیکی رسمی دفتر',
    category: 'contact',
    value: 'info@sedrazavi.law',
    defaultValue: 'info@sedrazavi.law',
    type: 'email',
    helper: 'گیرنده فرم‌های تماس و اعلان‌های سیستمی',
  },
  'contact.address': {
    key: 'contact.address',
    label: 'نشانی پستی دفتر وکالت',
    category: 'contact',
    value: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi، طبقه ۸',
    defaultValue: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج حقوقی SedRazavi، طبقه ۸',
    type: 'textarea',
    helper: 'آدرس برای سئوی محلی (Local SEO) و برگه‌های تماس',
  },
  'contact.hours': {
    key: 'contact.hours',
    label: 'ساعات کاری و پذیرش',
    category: 'contact',
    value: 'شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰ | پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰',
    defaultValue: 'شنبه تا چهارشنبه: ۹:۰۰ الی ۱۹:۰۰ | پنج‌شنبه: ۹:۰۰ الی ۱۳:۰۰',
    type: 'text',
    helper: 'نمایش زمان رزرو و حضور وکیل',
  },

  // Category 3: Pricing (3)
  'pricing.consultation': {
    key: 'pricing.consultation',
    label: 'حق‌المشاوره پایه (تومان)',
    category: 'pricing',
    value: '۱,۵۰۰,۰۰۰',
    defaultValue: '۱,۵۰۰,۰۰۰',
    type: 'text',
    helper: 'مبلغ پایه جلسه ۳۰ دقیقه‌ای در برگه‌های خدمات',
  },
  'pricing.service': {
    key: 'pricing.service',
    label: 'هزینه نگارش لایحه پایه (تومان)',
    category: 'pricing',
    value: '۵,۰۰۰,۰۰۰',
    defaultValue: '۵,۰۰۰,۰۰۰',
    type: 'text',
    helper: 'تعرفه مبنا برای قراردادهای تنظیم سند',
  },
  'pricing.currency': {
    key: 'pricing.currency',
    label: 'واحد پولی پیش‌فرض',
    category: 'pricing',
    value: 'تومان',
    defaultValue: 'تومان',
    type: 'text',
    helper: 'واحد مالی در فاکتورها و مبالغ',
  },

  // Category 4: Brand (4)
  'brand.name': {
    key: 'brand.name',
    label: 'نام برند و موسسه حقوقی',
    category: 'brand',
    value: 'SedRazavi',
    defaultValue: 'SedRazavi',
    type: 'text',
    helper: 'لوگوتایپ و برچسب‌های برندینگ',
  },
  'brand.slogan': {
    key: 'brand.slogan',
    label: 'شعار راهبردی',
    category: 'brand',
    value: 'عدالت با دقت، حرفه‌ای‌گری با تعهد',
    defaultValue: 'عدالت با دقت، حرفه‌ای‌گری با تعهد',
    type: 'textarea',
    helper: 'تیتر الهام‌بخش در فوتر و سربرگ‌های رسمی',
  },
  'brand.logo': {
    key: 'brand.logo',
    label: 'نشانی تصویر لوگو',
    category: 'brand',
    value: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200',
    defaultValue: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=200',
    type: 'url',
    helper: 'لوگوی پیش‌فرض هدر و فاکتورها',
  },
  'brand.color': {
    key: 'brand.color',
    label: 'رنگ سازمانی طلایی کهنه (Gold)',
    category: 'brand',
    value: '#D4AF37',
    defaultValue: '#D4AF37',
    type: 'color',
    helper: 'تزریق متغیر اصلی --sedrazavi-gold در سراسر CSS',
  },

  // Category 5: Social (4)
  'social.telegram': {
    key: 'social.telegram',
    label: 'کانال تلگرام حقوقی',
    category: 'social',
    value: 'https://t.me/sedrazavi',
    defaultValue: 'https://t.me/sedrazavi',
    type: 'url',
    helper: 'لینک شبکه‌های اجتماعی در هدر و فوتر',
  },
  'social.ita': {
    key: 'social.ita',
    label: 'پیام‌رسان ایتا',
    category: 'social',
    value: 'https://eitaa.com/sedrazavi',
    defaultValue: 'https://eitaa.com/sedrazavi',
    type: 'url',
    helper: 'شبکه بومی ارتباط با موکلین داخلی',
  },
  'social.instagram': {
    key: 'social.instagram',
    label: 'صفحه رسمی اینستاگرام',
    category: 'social',
    value: 'https://instagram.com/sedrazavi',
    defaultValue: 'https://instagram.com/sedrazavi',
    type: 'url',
    helper: 'آموزش‌های ویدیویی حقوقی',
  },
  'social.linkedin': {
    key: 'social.linkedin',
    label: 'پروفایل لینکدین وکیل',
    category: 'social',
    value: 'https://linkedin.com/company/sedrazavi',
    defaultValue: 'https://linkedin.com/company/sedrazavi',
    type: 'url',
    helper: 'سوابق آکادمیک و شبکه کاری بین‌المللی',
  },

  // Category 6: Legal (3)
  'legal.court': {
    key: 'legal.court',
    label: 'حوزه قضایی صلاحیت‌دار',
    category: 'legal',
    value: 'دادگستری کل استان تهران و مراجع تجدیدنظر',
    defaultValue: 'دادگستری کل استان تهران و مراجع تجدیدنظر',
    type: 'text',
    helper: 'درج در قراردادهای الکترونیک وکالت',
  },
  'legal.bar': {
    key: 'legal.bar',
    label: 'کانون متبوع وکلا',
    category: 'legal',
    value: 'کانون وکلای دادگستری مرکز (تهران)',
    defaultValue: 'کانون وکلای دادگستری مرکز (تهران)',
    type: 'text',
    helper: 'اطلاعات هویت صنفی',
  },
  'legal.terms_url': {
    key: 'legal.terms_url',
    label: 'پیوند شرایط و قوانین',
    category: 'legal',
    value: '/terms/',
    defaultValue: '/terms/',
    type: 'url',
    helper: 'ارجاع شرایط عمومی خدمات حقوقی',
  },
};

interface DesignTokensContextType {
  tokens: Record<string, TokenItem>;
  updateToken: (key: string, value: string) => void;
  updateTokens: (newTokens: Record<string, TokenItem>) => void;
  resetToken: (key: string) => void;
  resetAllTokens: () => void;
  getTokenValue: (key: string, fallback?: string) => string;
  uiMode: 'public' | 'admin';
  setUiMode: (mode: 'public' | 'admin') => void;
  toggleUiMode: () => void;
}

const DesignTokensContext = createContext<DesignTokensContextType | undefined>(undefined);

const LOCAL_STORAGE_TOKENS_KEY = 'sedrazavi_design_tokens_v2';
const LOCAL_STORAGE_UI_MODE_KEY = 'sedrazavi_ui_mode_v2';

export const DesignTokensProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokens, setTokens] = useState<Record<string, TokenItem>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_TOKENS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...DEFAULT_DESIGN_TOKENS, ...parsed };
        }
      } catch (e) {
        console.error('Error loading design tokens from localStorage', e);
      }
    }
    return DEFAULT_DESIGN_TOKENS;
  });

  const [uiMode, setUiModeState] = useState<'public' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const modeParam = urlParams.get('mode');
        if (modeParam === 'admin' || modeParam === 'public') {
          return modeParam;
        }
        const saved = localStorage.getItem(LOCAL_STORAGE_UI_MODE_KEY);
        if (saved === 'admin' || saved === 'public') {
          return saved;
        }
      } catch (e) {
        console.error('Error reading ui mode', e);
      }
    }
    return 'admin';
  });

  // Apply CSS Variables to :root and document title dynamically
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      const brandColor = tokens['brand.color']?.value || '#D4AF37';
      root.style.setProperty('--sedrazavi-gold', brandColor);
      root.style.setProperty('--primary-gold', brandColor);
    }
  }, [tokens]);

  const updateToken = (key: string, value: string) => {
    setTokens((prev) => {
      const updated = {
        ...prev,
        [key]: {
          ...(prev[key] || DEFAULT_DESIGN_TOKENS[key]),
          value,
        },
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_TOKENS_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const updateTokens = (newTokens: Record<string, TokenItem>) => {
    setTokens(newTokens);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_TOKENS_KEY, JSON.stringify(newTokens));
    }
  };

  const resetToken = (key: string) => {
    if (DEFAULT_DESIGN_TOKENS[key]) {
      updateToken(key, DEFAULT_DESIGN_TOKENS[key].defaultValue);
    }
  };

  const resetAllTokens = () => {
    setTokens(DEFAULT_DESIGN_TOKENS);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_TOKENS_KEY, JSON.stringify(DEFAULT_DESIGN_TOKENS));
    }
  };

  const getTokenValue = (key: string, fallback?: string): string => {
    return tokens[key]?.value || fallback || DEFAULT_DESIGN_TOKENS[key]?.defaultValue || '';
  };

  const setUiMode = (mode: 'public' | 'admin') => {
    setUiModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_UI_MODE_KEY, mode);
      const url = new URL(window.location.href);
      url.searchParams.set('mode', mode);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const toggleUiMode = () => {
    setUiMode(uiMode === 'admin' ? 'public' : 'admin');
  };

  return (
    <DesignTokensContext.Provider
      value={{
        tokens,
        updateToken,
        updateTokens,
        resetToken,
        resetAllTokens,
        getTokenValue,
        uiMode,
        setUiMode,
        toggleUiMode,
      }}
    >
      {children}
    </DesignTokensContext.Provider>
  );
};

const fallbackContext: DesignTokensContextType = {
  tokens: DEFAULT_DESIGN_TOKENS,
  updateToken: () => {},
  updateTokens: () => {},
  resetToken: () => {},
  resetAllTokens: () => {},
  getTokenValue: (key: string, fallback?: string) => DEFAULT_DESIGN_TOKENS[key]?.defaultValue || fallback || '',
  uiMode: 'admin',
  setUiMode: () => {},
  toggleUiMode: () => {},
};

export const useDesignTokens = () => {
  const context = useContext(DesignTokensContext);
  if (!context) {
    return fallbackContext;
  }
  return context;
};
