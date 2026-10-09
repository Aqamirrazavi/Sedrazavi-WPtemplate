import React, { useState, useMemo } from 'react';
import { ServiceItem } from '../types/theme';
import { ServiceDetailModal } from './ServiceDetailModal';
import { 
  ArrowLeft, 
  Sparkles, 
  Scale, 
  Shield, 
  Home, 
  Building, 
  Gavel, 
  Scroll, 
  Search, 
  X, 
  Filter, 
  CheckCircle2,
  Users,
  Briefcase
} from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onBookService: (serviceTitle: string) => void;
}

export type LegalCategoryType = 'all' | 'real-estate' | 'criminal' | 'family' | 'commercial';

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onBookService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [filterType, setFilterType] = useState<LegalCategoryType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'handshake':
        return Scale;
      case 'shield':
        return Shield;
      case 'home':
        return Home;
      case 'building':
        return Building;
      case 'gavel':
        return Gavel;
      case 'scroll':
      default:
        return Scroll;
    }
  };

  // Helper to categorize services accurately
  const matchesCategory = (srv: ServiceItem, cat: LegalCategoryType): boolean => {
    if (cat === 'all') return true;
    const s = (srv.slug + ' ' + srv.title + ' ' + srv.summary).toLowerCase();
    if (cat === 'real-estate') {
      return s.includes('ملک') || s.includes('زمین') || s.includes('سند') || s.includes('سرقفلی') || s.includes('real-estate') || s.includes('ساخت');
    }
    if (cat === 'criminal') {
      return s.includes('کیفر') || s.includes('جرم') || s.includes('اقتصادی') || s.includes('کلاهبرداری') || s.includes('criminal') || s.includes('دادگاه');
    }
    if (cat === 'family') {
      return s.includes('خانواده') || s.includes('مهریه') || s.includes('طلاق') || s.includes('ارث') || s.includes('ترکه') || s.includes('family') || s.includes('کار');
    }
    if (cat === 'commercial') {
      return s.includes('تجارت') || s.includes('شرکت') || s.includes('قرارداد') || s.includes('داوری') || s.includes('commercial') || s.includes('arbitration');
    }
    return true;
  };

  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchCat = matchesCategory(srv, filterType);
      const query = searchQuery.trim().toLowerCase();
      const matchQuery = !query || 
        srv.title.toLowerCase().includes(query) || 
        srv.summary.toLowerCase().includes(query) ||
        (srv.detailedDescription && srv.detailedDescription.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });
  }, [services, filterType, searchQuery]);

  const categoryCounts = useMemo(() => {
    return {
      all: services.length,
      'real-estate': services.filter(s => matchesCategory(s, 'real-estate')).length,
      criminal: services.filter(s => matchesCategory(s, 'criminal')).length,
      family: services.filter(s => matchesCategory(s, 'family')).length,
      commercial: services.filter(s => matchesCategory(s, 'commercial')).length,
    };
  }, [services]);

  return (
    <section id="services" className="py-20 bg-[#F4F6F9] dark:bg-[#070D1E] relative transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            حوزه‌های تخصصی وکالت و داوری
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#0B132B] dark:text-white">
            خدمات حقوقی با استانداردهای بین‌المللی
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            تمرکز بر تسلط علمی، تنظیم قراردادهای بازدارنده و دفاع قاطعانه از حقوق شما در محاکم دادگستری و مراجع داوری.
          </p>

          {/* Advanced Search & Filter Bar */}
          <div className="pt-4 max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجوی سریع خدمات (مثال: ملکی، چک صیادی، طلاق توافقی، داوری)..."
                className="w-full pl-10 pr-12 py-3.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 shadow-sm transition-all"
                dir="rtl"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4 text-[#D4AF37]" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="پاک کردن جستجو"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  filterType === 'all'
                    ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>همه خدمات</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-mono">
                  {categoryCounts.all}
                </span>
              </button>

              <button
                onClick={() => setFilterType('real-estate')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  filterType === 'real-estate'
                    ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>دعاوی ملکی و ثبتی</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-mono">
                  {categoryCounts['real-estate']}
                </span>
              </button>

              <button
                onClick={() => setFilterType('criminal')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  filterType === 'criminal'
                    ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Gavel className="w-3.5 h-3.5" />
                <span>دعاوی کیفری و اقتصادی</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-mono">
                  {categoryCounts.criminal}
                </span>
              </button>

              <button
                onClick={() => setFilterType('family')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  filterType === 'family'
                    ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>حقوق خانواده و ارث</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-mono">
                  {categoryCounts.family}
                </span>
              </button>

              <button
                onClick={() => setFilterType('commercial')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  filterType === 'commercial'
                    ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>دعاوی تجاری و داوری</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 font-mono">
                  {categoryCounts.commercial}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-6 px-1">
          <span>نمایش {filteredServices.length} از {services.length} خدمت تخصصی</span>
          {(filterType !== 'all' || searchQuery) && (
            <button
              onClick={() => { setFilterType('all'); setSearchQuery(''); }}
              className="text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
            >
              <span>حذف فیلترها</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Services Grid (3 Columns) */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const Icon = getIconComponent(service.iconName);
              return (
                <div
                  key={service.id}
                  className="group relative bg-white dark:bg-[#0B132B] rounded-2xl p-7 border border-gray-200/80 dark:border-gray-800 shadow-lg shadow-black/5 hover:shadow-2xl hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Top bar with icon & featured tag */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37]/15 to-[#AA820A]/25 border border-[#D4AF37]/30 flex items-center justify-center text-[#AA820A] dark:text-[#F3E5AB] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>

                      {service.isFeatured && (
                        <span className="text-[11px] px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] font-bold border border-[#D4AF37]/30">
                          خدمت برگزیده
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold font-serif text-[#0B132B] dark:text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-6">
                      {service.summary}
                    </p>
                  </div>

                  {/* Card Footer Details */}
                  <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>تعرفه حدودی:</span>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{service.estimatedFee}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-800 dark:text-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>شرح و مدارک</span>
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onBookService(service.title)}
                        className="py-2.5 px-4 rounded-xl bg-[#0B132B] hover:bg-[#D4AF37] text-white hover:text-[#0B132B] transition-all text-xs font-bold"
                      >
                        رزرو
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white dark:bg-[#0B132B] rounded-3xl border border-dashed border-gray-300 dark:border-gray-800 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">هیچ خدمتی مطابق با جستجوی شما یافت نشد</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              لطفاً کلمات کلیدی دیگری را جستجو کنید یا فیلترهای اعمال‌شده را پاک نمایید.
            </p>
            <button
              onClick={() => { setFilterType('all'); setSearchQuery(''); }}
              className="px-5 py-2.5 rounded-xl bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] text-xs font-bold shadow-md hover:brightness-110 transition-all"
            >
              نمایش همه خدمات
            </button>
          </div>
        )}

      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={onBookService}
      />
    </section>
  );
};
