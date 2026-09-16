import { StoryItem } from '../types/theme';
import { SocialAccountItem, ATTORNEY_SOCIAL_ACCOUNTS } from '../components/AttorneySocialAccounts';
import { ATTORNEY_INFO, STORIES_DATA } from '../data/mockData';
import { BannerSlide, DEFAULT_BANNER_SLIDES } from '../components/TextBannerSlider';

export interface LawyerSlideItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface LawyerSiteProfile {
  // Brand & Identity
  siteTitle: string;
  siteSubtitle: string;
  lawyerName: string;
  lawyerTitle: string;
  degree: string;
  experienceYears: number;
  licenseNumber: string;
  slogan: string;
  subSlogan: string;
  bioSummary: string;
  
  // Contact & Office
  phone: string;
  mobile: string;
  email: string;
  officeAddress: string;
  workingHours: string;
  
  // Media Assets
  portraitImage: string;
  heroBannerImage: string;
  galleryImages: {
    id: string;
    url: string;
    title: string;
    category: string;
    caption: string;
  }[];

  // Social Channels
  socialAccounts: SocialAccountItem[];

  // Lawyer Hero Carousel / Showcase Slider (Under Stories)
  heroSlider: LawyerSlideItem[];

  // Interactive Stories
  stories: StoryItem[];

  // Religious & Literary Text Banner Slider (SPEC Part 3 Section 4)
  bannerSlides?: BannerSlide[];
  showBannerSlider?: boolean;

  // Floating Icon Scrollbar & Quick Access (SPEC Part 3 Section 5)
  showFloatingScrollbar?: boolean;

  // Phase 3 Admin Panel Additions
  // 1. Appearance Customization (6 tabs)
  appearance?: {
    lightPalette: {
      bg: string;
      text: string;
      goldPrimary: string;
      goldSecondary: string;
      border: string;
    };
    darkPalette: {
      bg: string;
      text: string;
      cardBg: string;
      goldPrimary: string;
      goldGlow: string;
    };
    typography: {
      headingFont: string;
      bodyFont: string;
      baseFontSize: number;
      lineHeight: number;
    };
    advanced: {
      borderRadius: number;
      enableAnimations: boolean;
      buttonPulse: boolean;
      hoverLift: boolean;
    };
  };

  // 2. Banner Settings (Auto-rotate, pause on hover, copy button)
  bannerSettings?: {
    autoRotateSeconds: number;
    pauseOnHover: boolean;
    enableCopyButton: boolean;
  };

  // 3. Focal Point for Attorney Portrait (Crop precision)
  focalPoint?: {
    x: number;
    y: number;
  };

  // 4. Team / Associate Lawyers Cards
  teamMembers?: Array<{
    id: string;
    name: string;
    title: string;
    licenseNumber: string;
    photo: string;
    phone: string;
    email: string;
    bio: string;
    specialties: string[];
  }>;

  // 5. Map & Navigation Details
  mapDetails?: {
    lat: number;
    lng: number;
    zoom: number;
    addressNotes: string;
    metroStation: string;
    busStation: string;
    neshanLink: string;
    baladLink: string;
    googleMapsLink: string;
  };

  // 6. Instagram & Media Gallery Settings
  instagramIntegration?: {
    username: string;
    accessToken: string;
    isConnected: boolean;
    autoSync: boolean;
    columnsDesktop: number;
    columnsMobile: number;
    showLikes: boolean;
    posts: Array<{
      id: string;
      imageUrl: string;
      caption: string;
      likes: number;
      views: number;
      postUrl: string;
      isVideo: boolean;
      date: string;
    }>;
  };

  // SEO & Meta
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
}

const STORAGE_KEY = 'sedrazavi_lawyer_custom_profile_v1';

export const DEFAULT_LAWYER_PROFILE: LawyerSiteProfile = {
  siteTitle: 'دفتر وکالت و داوری دکتر سیده مریم رضوی (SedRazavi)',
  siteSubtitle: 'وکیل پایه یک دادگستری و داور بین‌المللی در تهران (میدان ونک)',
  lawyerName: ATTORNEY_INFO.name,
  lawyerTitle: ATTORNEY_INFO.title,
  degree: ATTORNEY_INFO.degree,
  experienceYears: ATTORNEY_INFO.experienceYears,
  licenseNumber: ATTORNEY_INFO.licenseNumber,
  slogan: ATTORNEY_INFO.slogan,
  subSlogan: ATTORNEY_INFO.subSlogan,
  bioSummary: 'دکتر سیده مریم رضوی پس از اخذ دکترای حقوق خصوصی و بین‌الملل، بیش از دو دهه به دفاع تخصصی در دعاوی بازرگانی، ملکی و داوری مشغول بوده است.',
  
  phone: ATTORNEY_INFO.phone,
  mobile: ATTORNEY_INFO.mobile,
  email: ATTORNEY_INFO.email,
  officeAddress: ATTORNEY_INFO.officeAddress,
  workingHours: ATTORNEY_INFO.workingHours,
  
  portraitImage: ATTORNEY_INFO.portraitImage,
  heroBannerImage: ATTORNEY_INFO.heroBannerImage,

  galleryImages: [
    {
      id: 'gal-1',
      url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
      title: 'دفتر مرکزی ونک و کتابخانه تخصصی حقوقی',
      category: 'دفتر وکالت',
      caption: 'محیطی آرام، امن و استاندارد جهت برگزاری جلسات مشاوره محرمانه',
    },
    {
      id: 'gal-2',
      url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
      title: 'اتاق داوری و حل‌وفصل اختلافات تجاری',
      category: 'داوری',
      caption: 'میز مذاکرات و جلسات رسمی داوری مرضی‌الطرفین تجاری',
    },
    {
      id: 'gal-3',
      url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
      title: 'جلسات دفاع در محاکم و مراجع عالی قضایی',
      category: 'دادگاه و دادرسی',
      caption: 'حضور مستمر در محاکم تجدیدنظر، دیوان عالی کشور و داوری',
    },
    {
      id: 'gal-4',
      url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
      title: 'کارگاه‌های آموزشی و سمینارهای حقوق قراردادها',
      category: 'آموزش و پژوهش',
      caption: 'تدریس دوره‌های تخصصی نگارش قراردادهای ملکی و شرکتی',
    },
  ],

  socialAccounts: ATTORNEY_SOCIAL_ACCOUNTS,

  heroSlider: [
    {
      id: 'slide-1',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
      title: 'حفاظت استراتژیک از منافع مالی و تجاری شما',
      subtitle: 'داوری تخصصی و تنظیم قراردادهای کلان سرمایه‌گذاری با تضمین حقوقی',
      badge: 'دعاوی ملکی و تجاری',
      description: 'پیشگیری از اختلافات قراردادی با تدوین شرط داوری دقیق و مستندسازی تعهدات متقابل طبق آخرین رویه قضایی کشور.',
      ctaText: 'رزرو وقت مشاوره حضوری',
      ctaLink: '#booking',
    },
    {
      id: 'slide-2',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200',
      title: 'دکتر سیده مریم رضوی؛ وکیل پایه یک و داور ارشد',
      subtitle: 'بیش از ۲۰ سال تجربه درخشان در بیش از ۱۲۸۰ پرونده حقوقی سنگین',
      badge: 'پروانه کانون وکلای مرکز',
      description: 'دفاع هوشمندانه، تخصص علمی در حقوق خصوصی و نظارت مستقیم بر کلیه مراحل دادرسی از بدوی تا دیوان عالی کشور.',
      ctaText: 'مشاهده سوابق و مدارک علمی',
      ctaLink: '#about',
    },
    {
      id: 'slide-3',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200',
      title: 'حل و فصل سریع دعاوی ملکی و اسناد معارض',
      subtitle: 'الزام به تنظیم سند رسمی، خلع ید، سرقفلی و ابطال اسناد غیرقانونی',
      badge: 'تخصص در اراضی و املاک',
      description: 'بررسی دقیق مدارک ثبتی، استعلامات شهرداری و اسناد مالکیت قبل از طرح دعوا برای تسریع در روند صدور رأی قطعی.',
      ctaText: 'تماس تلفنی سریع با وکیل',
      ctaLink: '#booking',
    },
  ],

  stories: STORIES_DATA,

  bannerSlides: DEFAULT_BANNER_SLIDES,
  showBannerSlider: true,
  showFloatingScrollbar: true,

  appearance: {
    lightPalette: {
      bg: '#F4F6F9',
      text: '#0B132B',
      goldPrimary: '#D4AF37',
      goldSecondary: '#AA820A',
      border: '#E2E8F0',
    },
    darkPalette: {
      bg: '#070D1E',
      text: '#F8FAFC',
      cardBg: '#0B132B',
      goldPrimary: '#D4AF37',
      goldGlow: 'rgba(212, 175, 55, 0.25)',
    },
    typography: {
      headingFont: 'Vazirmatn',
      bodyFont: 'Vazirmatn',
      baseFontSize: 16,
      lineHeight: 1.6,
    },
    advanced: {
      borderRadius: 16,
      enableAnimations: true,
      buttonPulse: true,
      hoverLift: true,
    },
  },

  bannerSettings: {
    autoRotateSeconds: 5,
    pauseOnHover: true,
    enableCopyButton: true,
  },

  focalPoint: {
    x: 50,
    y: 25,
  },

  teamMembers: [
    {
      id: 'team-1',
      name: 'دکتر علیرضا کاظمی',
      title: 'وکیل پایه یک دادگستری و مشاور ارشد دعاوی تجاری',
      licenseNumber: '۲۱۴۸۵',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      phone: '۰۲۱۸۸۸۸۱۱۲۲',
      email: 'kazemi@sedrazavi.law',
      bio: 'متخصص در امور داوری بین‌المللی و دعاوی تجاری با ۱۰ سال سابقه وکالت در پرونده‌های کلان شرکت‌ها.',
      specialties: ['داوری تجاری', 'حقوق شرکت‌ها', 'قراردادهای بین‌المللی'],
    },
    {
      id: 'team-2',
      name: 'سرکار خانم نسترن افشار',
      title: 'وکیل پایه یک دادگستری و پژوهشگر ارشد اراضی و املاک',
      licenseNumber: '۲۸۹۳۰',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
      phone: '۰۲۱۸۸۸۸۱۱۲۳',
      email: 'afshar@sedrazavi.law',
      bio: 'متخصص حل‌وفصل دعاوی سرقفلی، حق کسب و پیشه، مصادره اراضی و الزام به تنظیم اسناد رسمی.',
      specialties: ['دعاوی ملکی', 'سرقفلی', 'شهرداری'],
    },
    {
      id: 'team-3',
      name: 'جناب آقای مهدی سهرابی',
      title: 'کارشناس ارشد حقوق جزا و جرم‌شناسی و پیگیری امور محاکم',
      licenseNumber: '۳۱۲۵۵',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
      phone: '۰۲۱۸۸۸۸۱۱۲۴',
      email: 'sohrabi@sedrazavi.law',
      bio: 'پیگیری لوایح کیفری، چک و کلاهبرداری‌های مالی و امور دادرسی در شعب بدوی و تجدیدنظر تهران.',
      specialties: ['دعاوی کیفری', 'جرایم اقتصادی', 'اسناد تجاری'],
    },
  ],

  mapDetails: {
    lat: 35.7592,
    lng: 51.4116,
    zoom: 16,
    addressNotes: 'تهران، میدان ونک، خیابان ملاصدرا، نرسیده به پل کردستان، پلاک ۵۴، طبقه چهارم، واحد ۸',
    metroStation: 'ایستگاه مترو میدان حقانی (خط ۱) + خط تاکسی‌های ونک',
    busStation: 'خط اتوبوس تندرو (BRT) راه‌آهن - تجریش، ایستگاه میدان ونک',
    neshanLink: 'https://neshan.org/maps',
    baladLink: 'https://balad.ir',
    googleMapsLink: 'https://maps.google.com/?q=35.7592,51.4116',
  },

  instagramIntegration: {
    username: 'Dr_SedRazavi_Law',
    accessToken: 'IGQVJYeE9...',
    isConnected: true,
    autoSync: true,
    columnsDesktop: 4,
    columnsMobile: 2,
    showLikes: true,
    posts: [
      {
        id: 'post-1',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=500',
        caption: 'نکات کلیدی در تنظیم شرط داوری در قراردادهای تجاری و ملکی. حتماً قبل از امضا از مشاور حقوقی راهنمایی بخواهید.',
        likes: 1240,
        views: 8500,
        postUrl: 'https://instagram.com/Dr_SedRazavi_Law',
        isVideo: false,
        date: '۱۴۰۳/۰۶/۱۰',
      },
      {
        id: 'post-2',
        imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=500',
        caption: 'جلسه رسیدگی امروز در شعبه تجدیدنظر پیرامون ابطال سند صوری انتقال ملک و دفاع مستند از حقوق موکل.',
        likes: 980,
        views: 6400,
        postUrl: 'https://instagram.com/Dr_SedRazavi_Law',
        isVideo: true,
        date: '۱۴۰۳/۰۶/۰۸',
      },
      {
        id: 'post-3',
        imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=500',
        caption: 'سمینار تخصصی حقوق ثبت و بررسی چالش‌های الزام به سند رسمی طبق قانون جدید ثبت اسناد.',
        likes: 1450,
        views: 11200,
        postUrl: 'https://instagram.com/Dr_SedRazavi_Law',
        isVideo: false,
        date: '۱۴۰۳/۰۵/۲۸',
      },
      {
        id: 'post-4',
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=500',
        caption: 'پاسخ به یک پرسش شایع: آیا چک صیادی قدیمی بدون ثبت در سامانه پیچک قابل وصول در دادگاه است؟',
        likes: 2150,
        views: 18400,
        postUrl: 'https://instagram.com/Dr_SedRazavi_Law',
        isVideo: true,
        date: '۱۴۰۳/۰۵/۱۵',
      },
    ],
  },

  metaDescription: 'وب‌سایت رسمی دفتر وکالت و داوری تخصصی دکتر سیده مریم رضوی، وکیل پایه یک دادگستری در تهران محدوده ونک. مشاوره تخصصی ملکی، تجاری، شرکت‌ها و تنظیم قرارداد.',
  metaKeywords: 'وکیل ملکی تهران, وکیل ونک, داوری تجاری, دکتر سیده مریم رضوی, وکیل قراردادها, وکیل پایه یک دادگستری',
  canonicalUrl: 'https://sedrazavi.law',
};

// Retrieve from localStorage or fallback
export function getStoredLawyerProfile(): LawyerSiteProfile {
  if (typeof window === 'undefined') return DEFAULT_LAWYER_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_LAWYER_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_LAWYER_PROFILE,
      ...parsed,
      heroSlider: parsed.heroSlider || DEFAULT_LAWYER_PROFILE.heroSlider,
      galleryImages: parsed.galleryImages || DEFAULT_LAWYER_PROFILE.galleryImages,
      stories: parsed.stories || DEFAULT_LAWYER_PROFILE.stories,
      socialAccounts: parsed.socialAccounts || DEFAULT_LAWYER_PROFILE.socialAccounts,
      bannerSlides: parsed.bannerSlides || DEFAULT_LAWYER_PROFILE.bannerSlides,
      showBannerSlider: parsed.showBannerSlider ?? DEFAULT_LAWYER_PROFILE.showBannerSlider,
      showFloatingScrollbar: parsed.showFloatingScrollbar ?? DEFAULT_LAWYER_PROFILE.showFloatingScrollbar,
      appearance: parsed.appearance || DEFAULT_LAWYER_PROFILE.appearance,
      bannerSettings: parsed.bannerSettings || DEFAULT_LAWYER_PROFILE.bannerSettings,
      focalPoint: parsed.focalPoint || DEFAULT_LAWYER_PROFILE.focalPoint,
      teamMembers: parsed.teamMembers || DEFAULT_LAWYER_PROFILE.teamMembers,
      mapDetails: parsed.mapDetails || DEFAULT_LAWYER_PROFILE.mapDetails,
      instagramIntegration: parsed.instagramIntegration || DEFAULT_LAWYER_PROFILE.instagramIntegration,
    };
  } catch (err) {
    console.error('Error loading lawyer profile:', err);
    return DEFAULT_LAWYER_PROFILE;
  }
}

// Save profile to localStorage and dispatch event for immediate reactivity
export function saveLawyerProfile(profile: LawyerSiteProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent('lawyer-profile-updated', { detail: profile }));
  } catch (err) {
    console.error('Error saving lawyer profile:', err);
  }
}

// Reset to default
export function resetLawyerProfile(): LawyerSiteProfile {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('lawyer-profile-updated', { detail: DEFAULT_LAWYER_PROFILE }));
  }
  return DEFAULT_LAWYER_PROFILE;
}
