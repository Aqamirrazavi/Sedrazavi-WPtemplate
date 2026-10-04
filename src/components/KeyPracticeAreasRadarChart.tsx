import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';
import { Scale, Award, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';

export interface PracticeAreaMetric {
  subject: string;
  shortLabel: string;
  score: number;
  caseCount: number;
  winRate: number;
  description: string;
}

const PRACTICE_AREAS_DATA: PracticeAreaMetric[] = [
  {
    subject: 'قراردادهای تجاری و داوری',
    shortLabel: 'قراردادها و داوری',
    score: 96,
    caseCount: 380,
    winRate: 97,
    description: 'تنظیم قراردادهای چندجانبه، داوری اتاق بازرگانی و کنوانسیون‌های تجاری بین‌المللی',
  },
  {
    subject: 'دعاوی ملکی، ثبتی و سرقفلی',
    shortLabel: 'املاک و اراضی',
    score: 94,
    caseCount: 340,
    winRate: 95,
    description: 'اثبات مالکیت، خلع ید، افراز و دستور فروش، سرقفلی و حق کسب و پیشه',
  },
  {
    subject: 'فرجام‌خواهی در دیوان عالی',
    shortLabel: 'دیوان عالی کشور',
    score: 92,
    caseCount: 165,
    winRate: 91,
    description: 'اعاده دادرسی موضوع ماده ۴۷۴ و اعتراض به آرای خلاف بین شرع و قانون',
  },
  {
    subject: 'جرایم اقتصادی، بانکی و مالیاتی',
    shortLabel: 'جرایم مالی و بانکی',
    score: 88,
    caseCount: 140,
    winRate: 89,
    description: 'دفاع در دادگاه‌های ویژه مفاسد اقتصادی، دعاوی تسهیلات بانکی و مالیات بر عملکرد',
  },
  {
    subject: 'حقوق شرکت‌ها و استارتاپ‌ها',
    shortLabel: 'حقوق شرکت‌ها',
    score: 90,
    caseCount: 210,
    winRate: 94,
    description: 'ادغام و تملیک، ساختار سهامداری، ثبت برند و موافقت‌نامه‌های محرمانگی',
  },
  {
    subject: 'دعاوی کار و تأمین اجتماعی',
    shortLabel: 'کار و بیمه',
    score: 85,
    caseCount: 125,
    winRate: 93,
    description: 'حل اختلافات کارگر و کارفرما در هیئت‌های تشخیص و حل اختلاف اداره کار',
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomRadarTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data: PracticeAreaMetric = payload[0].payload;
    return (
      <div className="bg-[#0B132B]/95 text-white p-3 rounded-xl border border-[#D4AF37]/50 shadow-xl text-right text-xs max-w-xs space-y-1.5 backdrop-blur-md">
        <div className="font-bold text-[#F3E5AB] flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{data.subject}</span>
        </div>
        <div className="flex items-center justify-between text-gray-300">
          <span>شاخص تسلط و تمرکز:</span>
          <span className="font-mono font-bold text-[#D4AF37]">{data.score}٪</span>
        </div>
        <div className="flex items-center justify-between text-gray-300">
          <span>تعداد پرونده‌های ارجاعی:</span>
          <span className="font-mono">{data.caseCount} پرونده</span>
        </div>
        <div className="flex items-center justify-between text-gray-300">
          <span>نرخ پیروزی نهایی:</span>
          <span className="font-mono text-emerald-400">{data.winRate}٪</span>
        </div>
        <p className="text-[11px] text-gray-400 pt-1 border-t border-gray-700 leading-relaxed">
          {data.description}
        </p>
      </div>
    );
  }
  return null;
};

export const KeyPracticeAreasRadarChart: React.FC = () => {
  const [metricMode, setMetricMode] = useState<'score' | 'caseCount' | 'winRate'>('score');

  const chartData = PRACTICE_AREAS_DATA.map((item) => ({
    ...item,
    chartValue:
      metricMode === 'score'
        ? item.score
        : metricMode === 'winRate'
        ? item.winRate
        : Math.round((item.caseCount / 400) * 100),
  }));

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm text-right space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#AA820A] dark:text-[#D4AF37] font-bold">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>تحلیل آماری و توزیع تخصص</span>
            <span aria-hidden="true" className="text-gray-300 dark:text-gray-600">·</span>
            <span className="text-gray-500 dark:text-gray-400 font-normal">نمودار راداری ۶ حوزه محوری وکالت</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-serif text-[#0B132B] dark:text-white mt-1">
            ماتریس حوزه‌های تخصصی و سهم تمرکز وکیل (Key Practice Areas)
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            نمایش متوازن میزان تسلط، فراوانی پرونده‌ها و درصد موفقیت در شش دپارتمان تخصصی دفتر وکالت.
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMetricMode('score')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              metricMode === 'score'
                ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-[#D4AF37] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            ضریب تخصص
          </button>
          <button
            type="button"
            onClick={() => setMetricMode('caseCount')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              metricMode === 'caseCount'
                ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-[#D4AF37] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            حجم پرونده‌ها
          </button>
          <button
            type="button"
            onClick={() => setMetricMode('winRate')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              metricMode === 'winRate'
                ? 'bg-white dark:bg-[#0B132B] text-[#0B132B] dark:text-[#D4AF37] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            نرخ پیروزی
          </button>
        </div>
      </div>

      {/* Grid: Radar Chart + Details Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Radar Chart (7 Cols) */}
        <div className="lg:col-span-7 h-[360px] w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
              <PolarGrid stroke="#E2E8F0" strokeDasharray="3 3" opacity={0.6} />
              <PolarAngleAxis
                dataKey="shortLabel"
                tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#94A3B8', fontSize: 10 }}
                stroke="#E2E8F0"
              />
              <Tooltip content={<CustomRadarTooltip />} />
              <Radar
                name="شاخص وکالت"
                dataKey="chartValue"
                stroke="#D4AF37"
                fill="#D4AF37"
                fillOpacity={0.4}
                strokeWidth={2.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend / Practice Areas Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center justify-between pb-1 border-b border-gray-100 dark:border-gray-800">
            <span>دپارتمان تخصصی</span>
            <span>شاخص / پرونده‌ها</span>
          </div>

          {PRACTICE_AREAS_DATA.map((area, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 text-xs hover:border-[#D4AF37]/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {area.shortLabel}
                </span>
              </div>
              <div className="flex items-center gap-2 text-left font-mono">
                <span className="font-bold text-[#AA820A] dark:text-[#F3E5AB]">
                  {metricMode === 'score'
                    ? `${area.score}٪`
                    : metricMode === 'winRate'
                    ? `${area.winRate}٪`
                    : `${area.caseCount} پرونده`}
                </span>
                <span className="text-[10px] text-gray-400">({area.winRate}٪ پیروزی)</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
