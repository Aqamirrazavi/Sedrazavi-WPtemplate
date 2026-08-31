import React, { useState } from 'react';
import { FaqItem } from '../types/theme';
import { Sparkles, ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');

  const categories = ['همه', 'مشاوره', 'حق‌الوکاله', 'روند دادرسی', 'اسناد و مدارک'];

  const filteredFaqs = faqs.filter((f) => {
    if (selectedCategory === 'همه') return true;
    return f.category === selectedCategory;
  });

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-[#F4F6F9] dark:bg-[#070D1E] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            پرسش‌های متداول موکلین
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#0B132B] dark:text-white">
            پاسخ شفاف به سوالات پرتکرار حقوقی
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            نحوه عقد قرارداد، شفافیت مالی، مراحل دادرسی و مدارک مورد نیاز برای آغاز همکاری.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0B132B] dark:text-white hover:text-[#D4AF37] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-xs">
                      {idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#D4AF37]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800/60 pr-14">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Ask Question Box */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            سوال دیگری دارید که در لیست بالا نبود؟{' '}
            <a href="#booking" className="text-[#D4AF37] font-bold hover:underline">
              ارسال پیام مستقیم به وکیل در فرم رزرو
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
