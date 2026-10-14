import React from 'react';
import {
  Edit3,
  Sliders,
  Check,
  X,
  Palette,
  Eye,
  Settings,
  Sparkles,
  GitBranch,
} from 'lucide-react';

interface FrontendQuickEditBarProps {
  isActive: boolean;
  onToggleActive: () => void;
  onOpenPortal: () => void;
  onOpenGitHubSync: () => void;
  onOpenPaletteModal?: () => void;
  activeArchetype: 'lawyer' | 'wp-designer' | 'ecommerce' | 'video-media';
  onChangeArchetype: (archetype: 'lawyer' | 'wp-designer' | 'ecommerce' | 'video-media') => void;
}

export const FrontendQuickEditBar: React.FC<FrontendQuickEditBarProps> = ({
  isActive,
  onToggleActive,
  onOpenPortal,
  onOpenGitHubSync,
  onOpenPaletteModal,
  activeArchetype,
  onChangeArchetype,
}) => {
  if (!isActive) return null;

  return (
    <div
      dir="rtl"
      className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-2xl shadow-2xl font-sans"
    >
      <div className="bg-[#1E1E2F]/95 backdrop-blur-md text-white rounded-2xl border border-[#4F46E5]/40 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white shrink-0">
            <Edit3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>نوار ویرایشگر دیداری زنده</span>
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            </div>
            <div className="text-[11px] text-[#94A3B8]">
              امکان تغییر صنف، پالت رنگی، متن‌ها و همگام‌سازی مستقیم با گیت‌هاب
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Archetype Quick Switcher */}
          <div className="flex items-center bg-[#0F172A] p-1 rounded-xl border border-[#334155] text-xs">
            <button
              type="button"
              onClick={() => onChangeArchetype('wp-designer')}
              className={`px-2 py-1 rounded-lg transition font-medium cursor-pointer ${
                activeArchetype === 'wp-designer' ? 'bg-[#6366F1] text-white font-bold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              طراح سایت
            </button>
            <button
              type="button"
              onClick={() => onChangeArchetype('lawyer')}
              className={`px-2 py-1 rounded-lg transition font-medium cursor-pointer ${
                activeArchetype === 'lawyer' ? 'bg-[#D4AF37] text-black font-bold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              وکیل
            </button>
            <button
              type="button"
              onClick={() => onChangeArchetype('ecommerce')}
              className={`px-2 py-1 rounded-lg transition font-medium cursor-pointer ${
                activeArchetype === 'ecommerce' ? 'bg-[#10B981] text-white font-bold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              فروشگاه
            </button>
            <button
              type="button"
              onClick={() => onChangeArchetype('video-media')}
              className={`px-2 py-1 rounded-lg transition font-medium cursor-pointer ${
                activeArchetype === 'video-media' ? 'bg-[#F59E0B] text-black font-bold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              ویدئو
            </button>
          </div>

          {/* Palette Modal Button */}
          {onOpenPaletteModal && (
            <button
              type="button"
              onClick={onOpenPaletteModal}
              className="px-2.5 py-1.5 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0B132B] text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-[#D4AF37]/40"
              title="تغییر پالت رنگ و استایل"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>پالت رنگ</span>
            </button>
          )}

          {/* Open Full Portal Modal */}
          <button
            type="button"
            onClick={onOpenPortal}
            className="px-3 py-1.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>تنظیمات</span>
          </button>

          {/* GitHub Sync Button */}
          <button
            type="button"
            onClick={onOpenGitHubSync}
            className="px-2.5 py-1.5 rounded-xl bg-[#21262D] hover:bg-[#30363D] border border-[#30363D] text-[#58A6FF] text-xs transition cursor-pointer"
            title="همگام‌سازی گیت‌هاب"
          >
            <GitBranch className="w-3.5 h-3.5" />
          </button>

          {/* Close Toolbar */}
          <button
            type="button"
            onClick={onToggleActive}
            className="p-1.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#334155] transition cursor-pointer"
            title="بستن نوار"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
