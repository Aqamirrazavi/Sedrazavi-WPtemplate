import React, { useState, useEffect } from 'react';
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  RotateCw,
  Wifi,
  ExternalLink,
  ShieldCheck,
  Maximize2,
  RefreshCw,
  Check,
  Globe,
  Sliders,
  Sparkles,
} from 'lucide-react';

interface PrototypeSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeviceType = 'desktop' | 'laptop' | 'tablet' | 'mobile';

interface DevicePreset {
  id: DeviceType;
  name: string;
  nameFa: string;
  width: number;
  height: number;
  icon: any;
  userScale: number;
}

const PRESETS: Record<DeviceType, DevicePreset> = {
  desktop: {
    id: 'desktop',
    name: 'iMac 27" / UltraWide',
    nameFa: 'دسکتاپ وسیع (1440px)',
    width: 1440,
    height: 900,
    icon: Monitor,
    userScale: 0.7,
  },
  laptop: {
    id: 'laptop',
    name: 'MacBook Pro 14"',
    nameFa: 'لپ‌تاپ استاندارد (1280px)',
    width: 1280,
    height: 800,
    icon: Monitor,
    userScale: 0.75,
  },
  tablet: {
    id: 'tablet',
    name: 'iPad Pro 11"',
    nameFa: 'تبلت آی‌پد (768px)',
    width: 768,
    height: 1024,
    icon: Tablet,
    userScale: 0.8,
  },
  mobile: {
    id: 'mobile',
    name: 'iPhone 15 Pro',
    nameFa: 'موبایل هوشمند (390px)',
    width: 390,
    height: 844,
    icon: Smartphone,
    userScale: 0.9,
  },
};

export const PrototypeSimulatorModal: React.FC<PrototypeSimulatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop');
  const [isLandscape, setIsLandscape] = useState(false);
  const [networkSpeed, setNetworkSpeed] = useState<'fiber' | '4g' | '3g'>('fiber');
  const [zoomLevel, setZoomLevel] = useState<number>(0.75);
  const [isReloading, setIsReloading] = useState(false);
  const [url, setUrl] = useState('https://sedrazavi.ir/prototype/live');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPreset = PRESETS[selectedDevice];
  const activeWidth = isLandscape && (selectedDevice === 'tablet' || selectedDevice === 'mobile')
    ? currentPreset.height
    : currentPreset.width;
  const activeHeight = isLandscape && (selectedDevice === 'tablet' || selectedDevice === 'mobile')
    ? currentPreset.width
    : currentPreset.height;

  const handleReload = () => {
    setIsReloading(true);
    setTimeout(() => setIsReloading(false), 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl text-white font-sans overflow-hidden">
      {/* Top Controller Bar */}
      <header className="h-16 px-6 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-cyan-500/20">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base text-white">
                شبیه‌ساز ویوپورت و چنددستگاهی
              </span>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono">
                v17.0 Master Viewport
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              ارزیابی زنده ریسپانسیو و UX بدون تغییر ابعاد نمایشگر مرورگر
            </p>
          </div>
        </div>

        {/* Device Switcher Pills */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800">
          {(Object.keys(PRESETS) as DeviceType[]).map((devKey) => {
            const dev = PRESETS[devKey];
            const Icon = dev.icon;
            const isActive = selectedDevice === devKey;
            return (
              <button
                key={devKey}
                type="button"
                onClick={() => {
                  setSelectedDevice(devKey);
                  setZoomLevel(dev.userScale);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{dev.nameFa}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls & Close */}
        <div className="flex items-center gap-3">
          {/* Orientation Toggle (Tablet & Mobile only) */}
          {(selectedDevice === 'tablet' || selectedDevice === 'mobile') && (
            <button
              type="button"
              onClick={() => setIsLandscape(!isLandscape)}
              title="چرخش جهت صفحه (Landscape/Portrait)"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
              <span className="hidden sm:inline">{isLandscape ? 'افقی' : 'عمودی'}</span>
            </button>
          )}

          {/* Network Throttling simulator */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 text-xs">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={networkSpeed}
              onChange={(e) => setNetworkSpeed(e.target.value as any)}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer text-xs"
            >
              <option value="fiber" className="bg-slate-900">فیبر نوری (بدون تاخیر)</option>
              <option value="4g" className="bg-slate-900">4G LTE (تاخیر ۵۰ms)</option>
              <option value="3g" className="bg-slate-900">3G معمولی (تاخیر ۲۰۰ms)</option>
            </select>
          </div>

          {/* Scale Slider */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>مقیاس:</span>
            <input
              type="range"
              min="0.3"
              max="1.1"
              step="0.05"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="w-20 accent-cyan-500 cursor-pointer"
            />
            <span className="font-mono text-[11px] text-cyan-400 w-8">
              {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
            aria-label="بستن شبیه‌ساز"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Simulated Browser Address Bar */}
      <div className="h-11 px-6 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between shrink-0 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <button
            type="button"
            onClick={handleReload}
            className="p-1 hover:text-cyan-400 transition-colors cursor-pointer"
            title="بارگذاری مجدد فریم"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isReloading ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>

        {/* Simulated URL input */}
        <div className="flex-1 max-w-xl mx-4 bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-1 flex items-center justify-between text-slate-300 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-transparent focus:outline-none w-72 text-slate-200"
            />
          </div>
          <span className="text-[10px] text-slate-500 hidden sm:inline">
            {activeWidth} × {activeHeight} px
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span className="hidden sm:inline">موتور رندرینگ:</span>
          <span className="text-cyan-400 font-bold">SedRazavi Core 6.6</span>
        </div>
      </div>

      {/* Main Viewport Stage */}
      <main className="flex-1 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-auto p-8 flex items-center justify-center">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'width 0.3s ease, height 0.3s ease, transform 0.2s ease',
          }}
          className="relative transition-all duration-300 shadow-2xl rounded-3xl border-8 border-slate-800/90 bg-slate-900 overflow-hidden flex flex-col"
        >
          {/* Hardware Frame Mockup Bezel */}
          <div className="h-6 bg-slate-800 flex items-center justify-center relative shrink-0">
            {selectedDevice === 'mobile' && (
              <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></span>
              </div>
            )}
            <div className="absolute left-3 flex items-center gap-1">
              <span className="text-[9px] text-slate-400 font-mono">
                {currentPreset.name} {isLandscape ? '(Landscape)' : ''}
              </span>
            </div>
          </div>

          {/* Device Screen Body */}
          <div
            style={{ width: `${activeWidth}px`, height: `${activeHeight}px` }}
            className="relative bg-white overflow-y-auto overflow-x-hidden"
          >
            {/* Embedded Live Web Application Viewport */}
            <iframe
              src="/"
              className="w-full h-full border-none"
              title="پیش‌نمایش زنده وب‌سایت"
            />
          </div>

          {/* Mobile Bottom Home Bar */}
          {selectedDevice === 'mobile' && (
            <div className="h-5 bg-slate-900 flex items-center justify-center shrink-0">
              <span className="w-28 h-1 bg-slate-600 rounded-full"></span>
            </div>
          )}
        </div>
      </main>

      {/* Footer Info Strip */}
      <footer className="h-10 px-6 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>توسعه‌دهنده ارشد: سید امیر حسین رضوی فردویی</span>
          <span className="text-slate-600">|</span>
          <span className="font-mono text-cyan-400">@sedrazavi</span>
        </div>
        <div className="flex items-center gap-4">
          <span>شبیه‌ساز ویوپورت گوتنبرگ و المنتور پرو</span>
          <span className="text-emerald-400 font-bold">سازگار با PHP 8.x و WP 6.x</span>
        </div>
      </footer>
    </div>
  );
};
