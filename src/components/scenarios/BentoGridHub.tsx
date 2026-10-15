import React, { useState } from 'react';
import {
  Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Volume2,
  Navigation, Compass, PhoneCall, Headphones, MapPin, Radio,
  Clock, ShieldCheck, ArrowUpRight, Gauge, Layers, Sparkles
} from 'lucide-react';
import { MOCK_TRACKS } from '../../data/scenarioData';

interface BentoGridHubProps {
  onOpenActionDrawer?: (mode?: 'slide-over' | 'docked-media' | 'in-page') => void;
}

export const BentoGridHub: React.FC<BentoGridHubProps> = ({ onOpenActionDrawer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'D' | 'P' | 'R' | 'N'>('D');
  const [sliderProgress, setSliderProgress] = useState(65);

  const currentTrack = MOCK_TRACKS[activeTrackIndex] || MOCK_TRACKS[0];

  return (
    <div className="w-full bg-[#07090E] text-slate-100 p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-6">
      {/* Top Header Row inspired by Car HUD / Mandate Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 pb-5">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] animate-pulse" />
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
              <span>۱۱:۴۸</span>
              <span className="text-xs uppercase text-slate-400 font-sans tracking-wider px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/50">
                شبکه زنده پرونده‌ها
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              پنج‌شنبه ۲۴ مهر ۱۴۰۳ · سامانه هوشمند رصد وضعیت و چندرسانه‌ای
            </p>
          </div>
        </div>

        {/* Quick Micro-Telemetry Badges */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
            <span className="text-cyan-400">●</span>
            <span>سرور مرکزی: پایدار</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono">۸:۳۳ بعدازظهر</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-medium font-mono">
            <span>٪۷۳ ظرفیت آزاد</span>
          </div>
        </div>
      </div>

      {/* Main Bento Grid Container (Directly mirroring Image 1 proportions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column (lg:col-span-4): Media Audio Player + 4-Grid Launcher */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Tile 1: Music & Podcast Audio Scrub Player */}
          <div className="bg-[#0D111A] rounded-2xl p-5 border border-slate-800/90 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-start gap-3.5">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/30 via-slate-800 to-cyan-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
                <Headphones className="w-8 h-8 text-amber-400" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  پادکست و فایل صوتی فعال
                </span>
                <h4 className="text-sm font-bold text-white truncate mt-0.5" title={currentTrack.title}>
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  {currentTrack.artistOrHost}
                </p>
              </div>
            </div>

            {/* Scrub Progress Bar */}
            <div className="mt-5 space-y-1.5">
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden cursor-pointer">
                <div
                  className="bg-gradient-to-r from-amber-400 to-cyan-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${sliderProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>۳:۳۵</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            {/* Player Transport Controls */}
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-slate-800/50">
              <button
                type="button"
                onClick={() => setSliderProgress(Math.max(10, sliderProgress - 15))}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                title="پخش تصادفی"
              >
                <Shuffle className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setActiveTrackIndex((prev) => (prev > 0 ? prev - 1 : MOCK_TRACKS.length - 1))}
                className="p-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
                title="قطعه قبلی"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-11 h-11 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
                title={isPlaying ? 'توقف' : 'پخش'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
              </button>
              <button
                type="button"
                onClick={() => setActiveTrackIndex((prev) => (prev < MOCK_TRACKS.length - 1 ? prev + 1 : 0))}
                className="p-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
                title="قطعه بعدی"
              >
                <SkipForward className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setSliderProgress(0)}
                className="p-1.5 text-slate-400 hover:text-white transition-colors"
                title="تکرار قطعه"
              >
                <Repeat className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tile 2: 4-Grid Quick Action Matrix (Phone, Music, Maps, Live) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onOpenActionDrawer?.('slide-over')}
              className="p-4 rounded-2xl bg-[#0D111A] hover:bg-[#131926] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col items-center justify-center gap-2 text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-cyan-500/20 text-slate-300 group-hover:text-cyan-400 flex items-center justify-center transition-colors">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">مشاوره فوری</span>
              <span className="text-[10px] text-slate-500">استعلام تلفنی</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenActionDrawer?.('docked-media')}
              className="p-4 rounded-2xl bg-[#0D111A] hover:bg-[#131926] border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col items-center justify-center gap-2 text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-amber-500/20 text-slate-300 group-hover:text-amber-400 flex items-center justify-center transition-colors">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">آرشیو صوتی</span>
              <span className="text-[10px] text-slate-500">پادکست‌ها</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenActionDrawer?.('in-page')}
              className="p-4 rounded-2xl bg-[#0D111A] hover:bg-[#131926] border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col items-center justify-center gap-2 text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-emerald-500/20 text-slate-300 group-hover:text-emerald-400 flex items-center justify-center transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">مسیر شعب دادگاه</span>
              <span className="text-[10px] text-slate-500">مسیریابی دفاتر</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenActionDrawer?.('slide-over')}
              className="p-4 rounded-2xl bg-[#0D111A] hover:bg-[#131926] border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col items-center justify-center gap-2 text-center group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 group-hover:bg-violet-500/20 text-slate-300 group-hover:text-violet-400 flex items-center justify-center transition-colors">
                <Radio className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-slate-200">ارتباط زنده موکل</span>
              <span className="text-[10px] text-slate-500">پشتیبانی آنلاین</span>
            </button>
          </div>
        </div>

        {/* Center Column (lg:col-span-5): Dynamic Navigation Map & Step Telemetry */}
        <div className="lg:col-span-5 bg-[#0D111A] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Turn-by-Turn Instruction Header */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-lg">
                <Navigation className="w-6 h-6 rotate-45" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-medium">مرحله بعدی فرآیند دادرسی</span>
                <h3 className="text-lg font-bold text-white">تسلیم لایحه تجدیدنظر دیوان عالی</h3>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex flex-col bg-slate-900/80 rounded-lg border border-slate-800 text-slate-300 text-xs">
              <button
                type="button"
                className="px-2 py-1 hover:bg-slate-800 transition-colors border-b border-slate-800"
                onClick={() => setSliderProgress(Math.min(100, sliderProgress + 5))}
              >
                +
              </button>
              <button
                type="button"
                className="px-2 py-1 hover:bg-slate-800 transition-colors"
                onClick={() => setSliderProgress(Math.max(0, sliderProgress - 5))}
              >
                -
              </button>
            </div>
          </div>

          {/* Center Map Visual with Glowing Direction Arrow */}
          <div className="relative z-10 my-8 flex flex-col items-center justify-center py-6">
            <div className="relative">
              {/* Outer Pulsing Ring */}
              <div className="w-24 h-24 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center animate-pulse" />
              {/* Arrow */}
              <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
                <Compass className="w-12 h-12" />
              </div>
            </div>
            <div className="text-3xl font-extrabold font-mono text-white mt-4 tracking-tight">
              ۵۲۰ متر
            </div>
            <p className="text-xs text-slate-400 mt-1">فاصله تا نزدیک‌ترین شعبه مجتمع قضایی شهید بهشتی</p>
          </div>

          {/* Bottom Milestone Strip */}
          <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">زمان تخمینی اقدام</span>
              <span className="text-white font-bold font-mono text-sm">۴۵ دقیقه (۳۲ کیلومتر)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenActionDrawer?.('slide-over')}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 font-semibold transition-all flex items-center gap-1.5"
              >
                <span>مشاهده پرونده</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (lg:col-span-3): Speedometer & System Telemetry Gauge */}
        <div className="lg:col-span-3 bg-[#0D111A] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">شاخص سلامت پرونده‌ها</span>
              <span className="text-cyan-400 font-mono font-bold">۹۸.۴٪</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="w-[98%] bg-cyan-400 h-full rounded-full" />
            </div>
          </div>

          {/* Central Circular Gauge Simulation */}
          <div className="my-6 flex flex-col items-center justify-center relative">
            <div className="w-36 h-36 rounded-full border-4 border-slate-800 border-t-cyan-400 border-r-amber-400 flex flex-col items-center justify-center relative shadow-[0_0_24px_rgba(34,211,238,0.15)]">
              <Gauge className="w-5 h-5 text-slate-500 mb-1" />
              <div className="text-4xl font-extrabold font-mono text-white tracking-tight">
                ۶۷
              </div>
              <span className="text-[10px] text-slate-400 font-mono uppercase">امتیاز دادرسی</span>
            </div>
          </div>

          {/* Transmission / Phase Selector (P R N D) */}
          <div className="pt-4 border-t border-slate-800">
            <span className="text-[10px] text-slate-500 block text-center mb-2 font-mono">وضعیت حقوقی (PRND)</span>
            <div className="flex items-center justify-center gap-3 bg-slate-900/90 py-2 px-3 rounded-xl border border-slate-800">
              {(['P', 'R', 'N', 'D'] as const).map((gear) => (
                <button
                  key={gear}
                  type="button"
                  onClick={() => setActiveTab(gear)}
                  className={`w-8 h-8 rounded-lg font-bold font-mono text-sm transition-all ${
                    activeTab === gear
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {gear}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
