import React, { useState } from 'react';
import { ServiceItem } from '../types/theme';
import { ServiceDetailModal } from './ServiceDetailModal';
import { ArrowLeft, Sparkles, Scale, Shield, Home, Building, Gavel, Scroll, CheckCircle2 } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onBookService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ services, onBookService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'commercial' | 'family' | 'criminal'>('all');

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

  const filteredServices = services.filter((srv) => {
    if (filterType === 'all') return true;
    if (filterType === 'commercial') return srv.slug.includes('commercial') || srv.slug.includes('arbitration');
    if (filterType === 'family') return srv.slug.includes('family') || srv.slug.includes('labor');
    if (filterType === 'criminal') return srv.slug.includes('criminal') || srv.slug.includes('real-estate');
    return true;
  });

  return (
    <section id="services" className="py-20 bg-[#F4F6F9] dark:bg-[#070D1E] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
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

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'all'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              همه خدمات ({services.length})
            </button>
            <button
              onClick={() => setFilterType('commercial')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'commercial'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              دعاوی تجاری و داوری
            </button>
            <button
              onClick={() => setFilterType('criminal')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'criminal'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              کیفری و ملکی
            </button>
            <button
              onClick={() => setFilterType('family')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterType === 'family'
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              خانواده، ارث و کار
            </button>
          </div>
        </div>

        {/* Services Grid (3 Columns) */}
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
