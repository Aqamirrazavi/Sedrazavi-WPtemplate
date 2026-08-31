import React, { useState, useEffect } from 'react';
import { Award, CheckCircle, Scale, Briefcase } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const [counts, setCounts] = useState({
    cases: 0,
    satisfaction: 0,
    experience: 0,
    contracts: 0,
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        cases: Math.floor(1280 * progress),
        satisfaction: Math.floor(98 * progress),
        experience: Math.floor(20 * progress),
        contracts: Math.floor(450 * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          cases: 1280,
          satisfaction: 98,
          experience: 20,
          contracts: 450,
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      id: 'stat-1',
      icon: Scale,
      value: `${counts.cases.toLocaleString('fa-IR')}+`,
      label: 'پرونده موفق دادگستری',
      sub: 'آرای قطعی در دیوان و دادگاه‌های تجدیدنظر',
    },
    {
      id: 'stat-2',
      icon: CheckCircle,
      value: `${counts.satisfaction.toLocaleString('fa-IR')}٪`,
      label: 'رضایت کامل موکلین',
      sub: 'بر اساس نظرسنجی مکتوب انتهای پرونده',
    },
    {
      id: 'stat-3',
      icon: Award,
      value: `${counts.experience.toLocaleString('fa-IR')}+`,
      label: 'سال سابقه حقوقی مستمر',
      sub: 'عضو رسمی کانون وکلای دادگستری مرکز',
    },
    {
      id: 'stat-4',
      icon: Briefcase,
      value: `${counts.contracts.toLocaleString('fa-IR')}+`,
      label: 'قرارداد کلان تجاری',
      sub: 'مشاوره شرکت‌های دانش‌بنیان و هلدینگ‌ها',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-[#0B132B] to-[#1C2541] text-white relative border-y border-[#D4AF37]/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`text-center space-y-2 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 ${
                  idx < stats.length - 1 ? 'lg:border-l lg:border-white/10' : ''
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] mb-2 border border-[#D4AF37]/30">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#D4AF37] tracking-tight">
                  {stat.value}
                </div>
                <h4 className="text-sm md:text-base font-bold text-gray-100">
                  {stat.label}
                </h4>
                <p className="text-xs text-gray-400 max-w-[200px] mx-auto">
                  {stat.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
