import React, { useState } from 'react';
import {
  Shield,
  Building2,
  Briefcase,
  Gavel,
  Users,
  Globe2,
  FileCheck2,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  ChevronLeft,
  Search,
  Filter,
  Sparkles,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';

interface ServicesPageViewProps {
  onBookService: (serviceTitle: string) => void;
  onBackToHome: () => void;
  onOpenSingleService?: (serviceId: string) => void;
}

export const ServicesPageView: React.FC<ServicesPageViewProps> = ({
  onBookService,
  onBackToHome,
  onOpenSingleService,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'همه حوزه‌های وکالت' },
    { id: 'commercial', label: 'دعاوی تجاری و قراردادها' },
    { id: 'family', label: 'حقوق خانواده و ترکه' },
    { id: 'criminal', label: 'کیفری و اقتصادی' },
  ];

  const filteredServices = SERVICES_DATA.filter((srv) => {
    const matchesSearch =
      srv.title.includes(searchQuery) ||
      srv.summary.includes(searchQuery) ||
      srv.fullDescription.includes(searchQuery);
    return matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-persian">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            <button
              onClick={onBackToHome}
              className="hover:text-[#D4AF37] transition-colors"
            >
              صفحه اصلی
            </button>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-[#0B132B] dark:text-[#F3E5AB] font-bold">
              خدمات حقوقی، وکالت و داوری تخصصی
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#D4AF37] hover:text-[#0B132B] transition-all"
          >
            بازگشت به صفحه اصلی &rarr;
          </button>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>برگه اختصاصی کلیه خدمات حقوقی</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#0B132B] dark:text-white">
            دفاع مستدل و خدمات جامع حقوقی در کلیه مراجع قضایی
          </h1>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            از تدوین قراردادهای بین‌المللی تا دفاع در دعاوی پیچیده ملکی، دیوان عالی کشور و داوری‌های اتاق بازرگانی
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-md">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#D4AF37] text-[#0B132B] shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-[#D4AF37]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجوی عنوان خدمت، مهریه، ملکی..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-gray-50 dark:bg-[#070D1E] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:border-[#D4AF37]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-3xl p-6 bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 hover:border-[#D4AF37]/60 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-right group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-gray-800 text-[#0B132B] dark:text-gray-300 text-[11px] font-bold border border-gray-200 dark:border-gray-700">
                    {service.isFeatured ? 'ویژه و فوری' : 'وکالت تخصصی'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {service.summary}
                </p>

                {/* Scope features */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-gray-400">
                    شامل اقدامات:
                  </span>
                  <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />
                      <span>تنظیم دادخواست، شکواییه و لوایح دفاعیه</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />
                      <span>حضور مستقیم وکیل در جلسات رسیدگی</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2A9D8F] shrink-0" />
                      <span>ثبت در سامانه آنلاین پیگیری پرونده موکل</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
                {onOpenSingleService ? (
                  <button
                    onClick={() => onOpenSingleService(service.id)}
                    className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
                  >
                    <span>جزئیات خدمت</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-[#D4AF37]">
                    امکان تقسیط حق‌الوکاله
                  </span>
                )}
                <button
                  onClick={() => onBookService(service.title)}
                  className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>درخواست وکالت</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Legal Fee Transparency Guarantee Box */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-[#0B132B] to-[#1C2541] border border-[#D4AF37]/40 shadow-xl text-white text-right space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
              ⚖️
            </div>
            <h3 className="text-lg font-bold">
              تضمین شفافیت مالی و تعرفه قانونی کانون وکلای دادگستری
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            در مؤسسه حقوقی دکتر رضوی، هیچ هزینه پنهان یا غیرشفافی وجود ندارد. حق‌الوکاله با در نظر گرفتن پیچیدگی پرونده، ساعات رسیدگی و مصوبه رسمی تعرفه کانون وکلا تعیین شده و امکان پرداخت اقساطی متناسب با پیشرفت مراحل دادرسی در قرارداد مکتوب الکترونیک منظور می‌گردد.
          </p>
        </div>
      </div>
    </div>
  );
};
