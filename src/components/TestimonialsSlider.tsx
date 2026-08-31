import React, { useState } from 'react';
import { TestimonialItem } from '../types/theme';
import { Star, ChevronRight, ChevronLeft, Quote, Sparkles, CheckCircle } from 'lucide-react';

interface TestimonialsSliderProps {
  testimonials: TestimonialItem[];
}

export const TestimonialsSlider: React.FC<TestimonialsSliderProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-[#F4F6F9] dark:bg-[#070D1E] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            اعتماد و رضایت موکلین
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#0B132B] dark:text-white">
            روایت تجربه همراهی با دفتر وکالت دادمان
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            دیدگاه موکلین گرامی پیرامون دقت نظر، پیگیری پرونده و حصول نتایج حقوقی.
          </p>
        </div>

        {/* Featured Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-[#0B132B] rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-gray-800 shadow-xl shadow-black/5">
            
            {/* Top Bar with rating & service tag */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-1 text-[#D4AF37]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37]" />
                ))}
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A9D8F]/10 text-[#2A9D8F] text-xs font-bold border border-[#2A9D8F]/30">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{current.serviceUsed}</span>
              </div>
            </div>

            {/* Testimonial Quote Text */}
            <div className="relative mb-8">
              <Quote className="w-12 h-12 text-[#D4AF37]/20 absolute -top-4 -right-2 pointer-events-none" />
              <p className="text-base sm:text-lg lg:text-xl font-serif text-gray-800 dark:text-gray-200 leading-relaxed relative z-10">
                «{current.text}»
              </p>
            </div>

            {/* Author Profile Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.clientName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]"
                />
                <div>
                  <h4 className="font-bold text-base text-[#0B132B] dark:text-white">
                    {current.clientName}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {current.role} • <span className="text-[#D4AF37]">{current.date}</span>
                  </p>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                  aria-label="نظر قبلی"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-[#0B132B] text-white hover:bg-[#D4AF37] hover:text-[#0B132B] transition-all"
                  aria-label="نظر بعدی"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={`اسلاید ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
