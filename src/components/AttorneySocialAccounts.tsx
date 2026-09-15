import React, { useState } from 'react';
import {
  Instagram,
  Linkedin,
  Send,
  Phone,
  Video,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Users,
  Sparkles,
} from 'lucide-react';

export interface SocialAccountItem {
  id: string;
  name: string;
  nameEn: string;
  handle: string;
  url: string;
  icon: 'instagram' | 'linkedin' | 'telegram' | 'whatsapp' | 'aparat' | 'eitaa';
  followers: string;
  badge: string;
  description: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    badgeBg: string;
  };
}

export const ATTORNEY_SOCIAL_ACCOUNTS: SocialAccountItem[] = [
  {
    id: 'instagram',
    name: 'اینستاگرام رسمی',
    nameEn: 'Instagram',
    handle: '@Dr_SedRazavi_Law',
    url: 'https://instagram.com/Dr_SedRazavi_Law',
    icon: 'instagram',
    followers: '۴۲.۵K دنبال‌کننده',
    badge: 'تایید رسمی (Verified)',
    description: 'آموزش‌های کاربردی حقوقی، استوری‌های روز و پاسخ به پرسش‌های رایج در پرونده‌های ملکی و قراردادها',
    colorScheme: {
      bg: 'from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#FCB045]/10 dark:from-[#833AB4]/20 dark:via-[#FD1D1D]/20 dark:to-[#FCB045]/20',
      border: 'border-pink-500/30 hover:border-pink-500',
      text: 'text-pink-600 dark:text-pink-400',
      accent: 'bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045]',
      badgeBg: 'bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300',
    },
  },
  {
    id: 'linkedin',
    name: 'لینکدین تخصصی',
    nameEn: 'LinkedIn',
    handle: 'dr-maryam-sedrazavi',
    url: 'https://linkedin.com/in/dr-maryam-sedrazavi',
    icon: 'linkedin',
    followers: '۸.۹K مخاطب حرفه‌ای',
    badge: 'پژوهشگر ارشد حقوق تجارت',
    description: 'تحلیل علمی قوانین، داوری تجاری بین‌المللی، قراردادهای نفت و گاز و مقالات پژوهشی ISI',
    colorScheme: {
      bg: 'from-[#0077B5]/10 to-transparent dark:from-[#0077B5]/20',
      border: 'border-[#0077B5]/30 hover:border-[#0077B5]',
      text: 'text-[#0077B5] dark:text-[#38a9e4]',
      accent: 'bg-[#0077B5]',
      badgeBg: 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300',
    },
  },
  {
    id: 'telegram',
    name: 'کانال تلگرام حقوقی',
    nameEn: 'Telegram',
    handle: '@SedRazavi_Law',
    url: 'https://t.me/SedRazavi_Law',
    icon: 'telegram',
    followers: '۱۶.۲K عضو',
    badge: 'کانال رسمی رویه قضایی',
    description: 'انتشار سریع جدیدترین آراء وحدت رویه دیوان عالی کشور، متن لوایح برگزیده و بخشنامه‌های ثبتی',
    colorScheme: {
      bg: 'from-[#229ED9]/10 to-transparent dark:from-[#229ED9]/20',
      border: 'border-[#229ED9]/30 hover:border-[#229ED9]',
      text: 'text-[#229ED9] dark:text-[#52bcf0]',
      accent: 'bg-[#229ED9]',
      badgeBg: 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300',
    },
  },
  {
    id: 'whatsapp',
    name: 'واتساپ پذیرش و مدارک',
    nameEn: 'WhatsApp',
    handle: '+98 912 345 6789',
    url: 'https://wa.me/989123456789',
    icon: 'whatsapp',
    followers: 'پاسخگویی سریع منشی',
    badge: 'دریافت فوری اسناد',
    description: 'ارسال تصویر قراردادها و اوراق قضایی جهت بررسی اولیه توسط کارگروه وکلای دفتر',
    colorScheme: {
      bg: 'from-[#25D366]/10 to-transparent dark:from-[#25D366]/20',
      border: 'border-[#25D366]/30 hover:border-[#25D366]',
      text: 'text-[#25D366] dark:text-[#4ee689]',
      accent: 'bg-[#25D366]',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300',
    },
  },
  {
    id: 'aparat',
    name: 'کانال آپارات (ویدیوها)',
    nameEn: 'Aparat',
    handle: 'sedrazavi_law',
    url: 'https://aparat.com/sedrazavi_law',
    icon: 'aparat',
    followers: '۱۲۵+ ویدیو آموزشی',
    badge: 'کیفیت 4K و وبینارها',
    description: 'آرشیو کامل تحلیل ویدئویی دادگاه‌ها، شبیه‌سازی دفاع در دعاوی ملکی و مصاحبه‌های تخصصی',
    colorScheme: {
      bg: 'from-[#EA1D5D]/10 to-transparent dark:from-[#EA1D5D]/20',
      border: 'border-[#EA1D5D]/30 hover:border-[#EA1D5D]',
      text: 'text-[#EA1D5D] dark:text-[#ff477e]',
      accent: 'bg-[#EA1D5D]',
      badgeBg: 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300',
    },
  },
  {
    id: 'eitaa',
    name: 'پیام‌رسان ایتا',
    nameEn: 'Eitaa',
    handle: '@SedRazavi_Legal',
    url: 'https://eitaa.com/SedRazavi_Legal',
    icon: 'eitaa',
    followers: 'کانال ارتباط داخلی',
    badge: 'پاسخگویی مراجعین',
    description: 'دریافت ابلاغیه‌ها و پیگیری وضعیت وقت مشاوره برای هموطنان با دسترسی به پیام‌رسان‌های ملی',
    colorScheme: {
      bg: 'from-[#EA650D]/10 to-transparent dark:from-[#EA650D]/20',
      border: 'border-[#EA650D]/30 hover:border-[#EA650D]',
      text: 'text-[#EA650D] dark:text-[#f8853b]',
      accent: 'bg-[#EA650D]',
      badgeBg: 'bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300',
    },
  },
];

interface AttorneySocialAccountsProps {
  layout?: 'grid' | 'compact' | 'bar';
  title?: string;
  subtitle?: string;
}

export const AttorneySocialAccounts: React.FC<AttorneySocialAccountsProps> = ({
  layout = 'grid',
  title = 'کانال‌های رسمی و شبکه‌های اجتماعی دکتر سیده مریم رضوی',
  subtitle = 'جهت دریافت تازه‌ترین تحلیل‌های حقوقی، مشاهده ویدیوها و ارسال مدارک پرونده',
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, handle: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(handle);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const renderIcon = (iconType: SocialAccountItem['icon']) => {
    switch (iconType) {
      case 'instagram':
        return <Instagram className="w-5 h-5 text-white" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5 text-white" />;
      case 'telegram':
        return <Send className="w-5 h-5 text-white" />;
      case 'whatsapp':
        return <Phone className="w-5 h-5 text-white" />;
      case 'aparat':
        return <Video className="w-5 h-5 text-white" />;
      case 'eitaa':
        return <MessageCircle className="w-5 h-5 text-white" />;
    }
  };

  if (layout === 'compact') {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {ATTORNEY_SOCIAL_ACCOUNTS.map((account) => (
          <a
            key={account.id}
            href={account.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 hover:border-[#D4AF37] text-xs font-medium text-gray-700 dark:text-gray-300 hover:text-[#D4AF37] transition-all shadow-sm"
            title={`${account.name}: ${account.handle}`}
          >
            <span className={`w-5 h-5 rounded-full ${account.colorScheme.accent} flex items-center justify-center`}>
              {renderIcon(account.icon)}
            </span>
            <span className="font-semibold">{account.nameEn}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 text-right" id="sedrazavi-social-channels">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>پل‌های ارتباطی مستقیم و رسمی</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#0B132B] dark:text-white">
            {title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>تمامی اکانت‌ها تحت نظارت مستقیم دفتر وکالت می‌باشند</span>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ATTORNEY_SOCIAL_ACCOUNTS.map((account) => (
          <div
            key={account.id}
            className={`p-5 rounded-3xl bg-gradient-to-br ${account.colorScheme.bg} bg-white dark:bg-[#0B132B] border ${account.colorScheme.border} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group`}
          >
            <div className="space-y-3">
              {/* Card Header: Icon, Name & Verified Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl ${account.colorScheme.accent} flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform`}>
                    {renderIcon(account.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B132B] dark:text-white">
                      {account.name}
                    </h4>
                    <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                      {account.nameEn}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${account.colorScheme.badgeBg}`}>
                  {account.badge}
                </span>
              </div>

              {/* Handle Bar with One-Click Copy */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/60 text-xs">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Users className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="font-mono font-bold text-gray-800 dark:text-gray-200 text-xs truncate dir-ltr">
                    {account.handle}
                  </span>
                </div>

                <button
                  onClick={(e) => handleCopy(account.id, account.handle, e)}
                  className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-[#D4AF37] border border-gray-200 dark:border-gray-600 transition-colors shrink-0"
                  title="کپی آدرس یا شناسه"
                >
                  {copiedId === account.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span className="text-emerald-500 font-bold">کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>کپی</span>
                    </>
                  )}
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed min-h-[36px]">
                {account.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                {account.followers}
              </span>

              <a
                href={account.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#AA820A] dark:text-[#F3E5AB] hover:text-[#0B132B] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span>مشاهده و عضویت</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
