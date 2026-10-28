import React, { useState, useMemo } from 'react';
import {
  X,
  Layers,
  Palette,
  Code2,
  Copy,
  Check,
  Search,
  Sparkles,
  Download,
  Eye,
  Sliders,
  ExternalLink,
  Shield,
  Activity,
  Cpu,
  RefreshCw,
  Box,
  Crown,
  Share2,
  Award,
  Play,
  Flame,
  Layout,
  Scissors,
  BookmarkCheck,
  Zap,
} from 'lucide-react';
import {
  VECTOR_BACKGROUND_PRESETS,
  VectorBackgroundPreset,
} from '../../data/vectorBackgroundPresets';
import {
  SOVEREIGN_WIDGETS_BANK,
  SOVEREIGN_WIDGETS_CATEGORIES,
  SovereignWidgetDefinition,
} from '../../data/sovereignWidgetsBank';
import {
  SOVEREIGN_SHAPE_DIVIDERS,
  SOVEREIGN_TRUST_BADGES,
  SOVEREIGN_SECTION_BLUEPRINTS,
  SOVEREIGN_MOTION_PRESETS,
  SvgShapeDivider,
  TrustBadgeItem,
  SectionBlueprint,
  MotionPreset,
} from '../../data/sovereignAssetsBank';
import {
  SOVEREIGN_ICONS_BANK,
  SovereignSvgIcon,
} from '../../data/sovereignIconsBank';

export interface SovereignDesignerToolboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePresetId: string;
  onSelectBackgroundPreset: (presetId: string) => void;
  bgOpacity: number;
  onChangeBgOpacity: (opacity: number) => void;
  bgSpeed: 'slow' | 'normal' | 'fast';
  onChangeBgSpeed: (speed: 'slow' | 'normal' | 'fast') => void;
  bgMode: 'animated' | 'static';
  onChangeBgMode: (mode: 'animated' | 'static') => void;
  bgBlendMode: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light';
  onChangeBgBlendMode: (blend: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light') => void;
}

export const SovereignDesignerToolboxModal: React.FC<SovereignDesignerToolboxModalProps> = ({
  isOpen,
  onClose,
  activePresetId,
  onSelectBackgroundPreset,
  bgOpacity,
  onChangeBgOpacity,
  bgSpeed,
  onChangeBgSpeed,
  bgMode,
  onChangeBgMode,
  bgBlendMode,
  onChangeBgBlendMode,
}) => {
  const [activeTab, setActiveTab] = useState<
    'vectors' | 'widgets' | 'icons' | 'dividers' | 'badges' | 'sections' | 'motions' | 'templates' | 'generator'
  >('vectors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBgCategory, setSelectedBgCategory] = useState<string>('all');
  const [selectedWidgetCategory, setSelectedWidgetCategory] = useState<string>('all');
  const [selectedIconCategory, setSelectedIconCategory] = useState<string>('all');
  const [selectedDividerCategory, setSelectedDividerCategory] = useState<string>('all');
  const [selectedBadgeCategory, setSelectedBadgeCategory] = useState<string>('all');
  const [selectedSectionCategory, setSelectedSectionCategory] = useState<string>('all');
  const [selectedMotionTrigger, setSelectedMotionTrigger] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inspectingWidget, setInspectingWidget] = useState<SovereignWidgetDefinition | null>(null);
  const [playingMotionId, setPlayingMotionId] = useState<string | null>(null);

  // Generator state
  const [genWidgetId, setGenWidgetId] = useState<string>(SOVEREIGN_WIDGETS_BANK[0].id);
  const [genCustomClass, setGenCustomClass] = useState<string>('my-custom-sovereign-block');
  const [genShowTitle, setGenShowTitle] = useState<boolean>(true);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  // Filtered vector background presets (66)
  const filteredPresets = useMemo(() => {
    return VECTOR_BACKGROUND_PRESETS.filter((p) => {
      const matchCat = selectedBgCategory === 'all' || p.category === selectedBgCategory;
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedBgCategory, searchQuery]);

  // Filtered widgets (72)
  const filteredWidgets = useMemo(() => {
    return SOVEREIGN_WIDGETS_BANK.filter((w) => {
      const matchCat = selectedWidgetCategory === 'all' || w.category === selectedWidgetCategory;
      const matchSearch =
        searchQuery === '' ||
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.shortcode.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedWidgetCategory, searchQuery]);

  // Filtered SVG Icons (66)
  const filteredIcons = useMemo(() => {
    return SOVEREIGN_ICONS_BANK.filter((icon) => {
      const matchCat = selectedIconCategory === 'all' || icon.category === selectedIconCategory;
      const matchSearch =
        searchQuery === '' ||
        icon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        icon.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        icon.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        icon.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedIconCategory, searchQuery]);

  // Filtered Shape Dividers (66)
  const filteredDividers = useMemo(() => {
    return SOVEREIGN_SHAPE_DIVIDERS.filter((d) => {
      const matchCat = selectedDividerCategory === 'all' || d.category === selectedDividerCategory;
      const matchSearch =
        searchQuery === '' ||
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.recommendedUse.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedDividerCategory, searchQuery]);

  // Filtered Trust Badges (66)
  const filteredBadges = useMemo(() => {
    return SOVEREIGN_TRUST_BADGES.filter((b) => {
      const matchCat = selectedBadgeCategory === 'all' || b.category === selectedBadgeCategory;
      const matchSearch =
        searchQuery === '' ||
        b.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.labelEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedBadgeCategory, searchQuery]);

  // Filtered Section Blueprints (66)
  const filteredSections = useMemo(() => {
    return SOVEREIGN_SECTION_BLUEPRINTS.filter((s) => {
      const matchCat = selectedSectionCategory === 'all' || s.category === selectedSectionCategory;
      const matchSearch =
        searchQuery === '' ||
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.badge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedSectionCategory, searchQuery]);

  // Filtered Motion Presets (66)
  const filteredMotions = useMemo(() => {
    return SOVEREIGN_MOTION_PRESETS.filter((m) => {
      const matchTrigger = selectedMotionTrigger === 'all' || m.type === selectedMotionTrigger;
      const matchSearch =
        searchQuery === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.recommendedUse.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.cssClass.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTrigger && matchSearch;
    });
  }, [selectedMotionTrigger, searchQuery]);

  // Categories for vector backgrounds
  const bgCategories = [
    { id: 'all', label: 'همه دسته‌ها (۶۶ مدل)' },
    { id: 'waves', label: 'امواج و الیاف روان' },
    { id: 'contours', label: 'تراز و خطوط توپوگرافی' },
    { id: 'guilloche', label: 'گیلوش و امنیت اسناد' },
    { id: 'constellation', label: 'صور فلکی و شبکه داده' },
    { id: 'cyber', label: 'سایبر، مدار و ماتریس' },
    { id: 'geometric', label: 'هندسه زرین اسلامی' },
    { id: 'architectural', label: 'ستون‌ها و پرسپکتیو' },
    { id: 'minimal', label: 'صوت، نطق و فرکانس' },
  ];

  // Active preset object
  const activePreset =
    VECTOR_BACKGROUND_PRESETS.find((p) => p.id === activePresetId) || VECTOR_BACKGROUND_PRESETS[0];

  // Selected generator widget
  const selectedGenWidget =
    SOVEREIGN_WIDGETS_BANK.find((w) => w.id === genWidgetId) || SOVEREIGN_WIDGETS_BANK[0];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      dir="rtl"
    >
      <div className="relative w-full max-w-7xl h-[92vh] flex flex-col bg-[#0d1117] border border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 overflow-hidden text-neutral-100 font-sans">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-neutral-950 font-bold shadow-lg shadow-amber-500/20">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-black text-amber-400">
                  جعبه‌ابزار ۶۶گانه طراح بدون کدنویسی وردپرس (Sovereign Suite)
                </h2>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  سوئیت کامل ۴۰۲ دارایی (۶۶×۵ + ۷۲ ویجت و بلوک)
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                طراحی شده توسط سید امیر حسین رضوی فردویی (<span className="text-amber-400 font-mono">@sedrazavi</span>) برای المنتور و گوتنبرگ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
              title="بستن پنجره"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-neutral-950/90 border-b border-neutral-800 text-xs md:text-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('vectors')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'vectors'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>وکتور پس‌زمینه</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">۶۶</span>
          </button>

          <button
            onClick={() => setActiveTab('widgets')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'widgets'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>ویجت و بلوک</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">۷۲</span>
          </button>

          <button
            onClick={() => setActiveTab('icons')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'icons'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>آیکون و نشان SVG</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">۶۶</span>
          </button>

          <button
            onClick={() => setActiveTab('dividers')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'dividers'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Scissors className="w-4 h-4" />
            <span>دیوایدر و کانتینر SVG</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">۶۶</span>
          </button>

          <button
            onClick={() => setActiveTab('badges')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'badges'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>نشان و مهر اعتماد</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">۶۶</span>
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'sections'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>سکشن و بنر آماده</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">۶۶</span>
          </button>

          <button
            onClick={() => setActiveTab('motions')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'motions'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>موشن و انیمیشن</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">۶۶</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'templates'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Box className="w-4 h-4" />
            <span>تمپلیت‌ها</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30 font-mono">۸</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
              activeTab === 'generator'
                ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>ژنراتور شورتکد</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-neutral-950/60">
          {/* TAB 1: VECTOR BACKGROUNDS BANK (66 MODELS) */}
          {activeTab === 'vectors' && (
            <div className="space-y-6">
              {/* Active Background Control & Inspection Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-neutral-900/90 to-amber-950/30 border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 font-mono font-black text-lg">
                    #{activePreset.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                        بک‌گراند فعال وب‌سایت
                      </span>
                      <h4 className="text-base font-black text-white">{activePreset.title}</h4>
                    </div>
                    <p className="text-xs text-neutral-400 line-clamp-1">{activePreset.desc}</p>
                  </div>
                </div>

                {/* Live Adjusters */}
                <div className="flex flex-wrap items-center gap-3 bg-neutral-950/80 p-2.5 rounded-xl border border-neutral-800 text-xs">
                  {/* Opacity slider */}
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400">شفافیت:</span>
                    <input
                      type="range"
                      min="0.05"
                      max="0.95"
                      step="0.05"
                      value={bgOpacity}
                      onChange={(e) => onChangeBgOpacity(parseFloat(e.target.value))}
                      className="w-20 accent-amber-500 cursor-pointer"
                    />
                    <span className="font-mono text-amber-400">{Math.round(bgOpacity * 100)}%</span>
                  </div>

                  <div className="h-4 w-px bg-neutral-800" />

                  {/* Mode */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onChangeBgMode('animated')}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${
                        bgMode === 'animated'
                          ? 'bg-amber-500 text-neutral-950'
                          : 'bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      متحرک پویا
                    </button>
                    <button
                      onClick={() => onChangeBgMode('static')}
                      className={`px-2 py-1 rounded text-[11px] font-bold ${
                        bgMode === 'static'
                          ? 'bg-amber-500 text-neutral-950'
                          : 'bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      برداری ثابت
                    </button>
                  </div>

                  <div className="h-4 w-px bg-neutral-800" />

                  {/* Speed */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onChangeBgSpeed('slow')}
                      className={`px-2 py-1 rounded text-[11px] ${
                        bgSpeed === 'slow' ? 'bg-amber-500/30 text-amber-300 font-bold' : 'text-neutral-400'
                      }`}
                    >
                      کند
                    </button>
                    <button
                      onClick={() => onChangeBgSpeed('normal')}
                      className={`px-2 py-1 rounded text-[11px] ${
                        bgSpeed === 'normal' ? 'bg-amber-500/30 text-amber-300 font-bold' : 'text-neutral-400'
                      }`}
                    >
                      عادی
                    </button>
                    <button
                      onClick={() => onChangeBgSpeed('fast')}
                      className={`px-2 py-1 rounded text-[11px] ${
                        bgSpeed === 'fast' ? 'bg-amber-500/30 text-amber-300 font-bold' : 'text-neutral-400'
                      }`}
                    >
                      سریع
                    </button>
                  </div>

                  <div className="h-4 w-px bg-neutral-800" />

                  {/* Copy active CSS */}
                  <button
                    onClick={() =>
                      handleCopy(
                        `/* SedRazavi Vector Background #${activePreset.number} */\n.sr-vector-bg {\n  background-image: var(--sr-bg-pattern-uri);\n  opacity: ${bgOpacity};\n  animation: sr-${activePreset.animationStyle} 24s ease-in-out infinite;\n}`,
                        'active-css'
                      )
                    }
                    className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded font-bold transition-colors"
                  >
                    {copiedId === 'active-css' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>کپی استایل CSS</span>
                  </button>
                </div>
              </div>

              {/* Category Pills & Search */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full md:w-auto">
                  {bgCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedBgCategory(c.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        selectedBgCategory === c.id
                          ? 'bg-amber-500 text-neutral-950 font-black'
                          : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجو در ۶۶ مدل وکتور..."
                    className="w-full pl-3 pr-9 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                  />
                  <Search className="w-4 h-4 text-neutral-500 absolute right-3 top-2.5" />
                </div>
              </div>

              {/* Grid of 66 Models */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPresets.map((preset) => {
                  const isActive = preset.id === activePresetId;
                  return (
                    <div
                      key={preset.id}
                      className={`relative group rounded-2xl border transition-all p-4 flex flex-col justify-between ${
                        isActive
                          ? 'bg-neutral-900/90 border-amber-500 shadow-lg shadow-amber-500/10'
                          : 'bg-neutral-900/50 border-neutral-800/80 hover:border-amber-500/40 hover:bg-neutral-900/80'
                      }`}
                    >
                      <div>
                        {/* Top row */}
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded bg-neutral-800 text-amber-400 border border-neutral-700">
                            #{preset.number}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
                            {preset.badge}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                          {preset.title}
                        </h4>
                        <p className="text-[11px] font-mono text-neutral-500 mb-2">{preset.titleEn}</p>
                        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-3">
                          {preset.desc}
                        </p>

                        <div className="text-[11px] text-neutral-500 bg-neutral-950/60 p-2 rounded-lg border border-neutral-800/60 mb-3">
                          <span className="text-amber-400/90 font-bold">کاربرد پیشنهادی: </span>
                          {preset.recommendedUse}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                        <button
                          onClick={() => onSelectBackgroundPreset(preset.id)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-amber-500 text-neutral-950 font-black'
                              : 'bg-neutral-800 text-neutral-200 hover:bg-amber-500 hover:text-neutral-950'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{isActive ? '✓ فعال در سایت' : 'اعمال بر روی سایت'}</span>
                        </button>

                        <button
                          onClick={() =>
                            handleCopy(
                              `[sedrazavi_bg preset="${preset.id}" opacity="${bgOpacity}"]`,
                              `sc-${preset.id}`
                            )
                          }
                          className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
                          title="کپی شورت‌کد المنتور"
                        >
                          {copiedId === `sc-${preset.id}` ? (
                            <Check className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: WIDGETS & BLOCKS BANK (72 WIDGETS) */}
          {activeTab === 'widgets' && (
            <div className="space-y-6">
              {/* Category Pills & Search */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto w-full md:w-auto">
                  {SOVEREIGN_WIDGETS_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedWidgetCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                        selectedWidgetCategory === cat.id
                          ? 'bg-amber-500 text-neutral-950 font-black'
                          : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-72">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجو در ۷۲ ویجت و بلوک..."
                    className="w-full pl-3 pr-9 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
                  />
                  <Search className="w-4 h-4 text-neutral-500 absolute right-3 top-2.5" />
                </div>
              </div>

              {/* Grid of 72 Widgets */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWidgets.map((widget) => {
                  return (
                    <div
                      key={widget.id}
                      className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-900 hover:border-amber-500/40 transition-all p-4 flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              #{widget.number}
                            </span>
                            <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                              {widget.categoryLabel}
                            </span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                            {widget.badge}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                          {widget.title}
                        </h4>
                        <p className="text-[11px] font-mono text-neutral-500 mb-2">{widget.titleEn}</p>
                        <p className="text-xs text-neutral-400 leading-relaxed mb-3">{widget.desc}</p>

                        {/* Feature bullets */}
                        <div className="space-y-1 mb-3">
                          {widget.features.map((f, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>

                        {/* Specs badge bar */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-neutral-950/70 p-2 rounded-lg border border-neutral-800/60 mb-3">
                          <div>
                            <span className="text-neutral-500">المنتور: </span>
                            <span className="text-amber-400 font-bold">{widget.elementorWidgetSlug}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">آپشن‌ها: </span>
                            <span className="text-emerald-400 font-bold">{widget.optionsCount} کنترل</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-neutral-500">اسکیما سئو: </span>
                            <span className="text-cyan-400 font-bold">{widget.schemaType}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom actions */}
                      <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleCopy(widget.shortcode, `wc-${widget.id}`)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 transition-all"
                        >
                          {copiedId === `wc-${widget.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>کپی شد!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>کپی شورت‌کد</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => setInspectingWidget(widget)}
                          className="px-2.5 py-1.5 bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs transition-colors flex items-center gap-1"
                          title="مشاهده مشخصات فنی و JSON"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>بازبینی</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: SOVEREIGN SVG ICONS BANK (66 MODELS - ZERO CDN) */}
          {activeTab === 'icons' && (
            <div className="space-y-6">
              {/* Header Info Banner */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>بانک ۶۶ آیکون و نشان اختصاصی برداری SVG (Zero External CDN)</span>
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    ۱۰۰٪ کد برداری درون‌برنامه‌ای بدون هیچ‌گونه وابستگی به FontAwesome، سرورهای خارجی یا CDN؛ کاملاً خوانا، تغییرپذیر در رنگ و سایز
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 font-bold font-mono">
                    تعداد: {filteredIcons.length} از ۶۶ آیکون
                  </span>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
                  {[
                    { id: 'all', label: 'همه (۶۶)' },
                    { id: 'legal', label: 'عدالت و قضاوت' },
                    { id: 'tech', label: 'فناوری و وب' },
                    { id: 'finance', label: 'مالی و فین‌تک' },
                    { id: 'security', label: 'امنیت و سایبر' },
                    { id: 'islamic', label: 'هندسه اسلامی' },
                    { id: 'ui', label: 'المان‌های UI' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedIconCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedIconCategory === cat.id
                          ? 'bg-amber-500 text-neutral-950 shadow-md'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 absolute right-3 top-2.5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="جستجو در ۶۶ آیکون SVG..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Icons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIcons.map((icon) => {
                  const svgRaw = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" width="24" height="24" fill="none" stroke="#D4AF37" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icon.svgPath}</svg>`;
                  const shortcode = `[sedrazavi_icon name="${icon.id}" size="24" color="#D4AF37"]`;
                  const phpCode = `<?php echo do_shortcode('[sedrazavi_icon name="${icon.id}"]'); ?>`;

                  return (
                    <div
                      key={icon.id}
                      className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-900 hover:border-amber-500/40 transition-all p-4 flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        {/* Top Meta */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            #{icon.number}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-bold border border-neutral-700">
                            {icon.categoryLabel}
                          </span>
                        </div>

                        {/* Visual SVG Icon Preview */}
                        <div className="p-4 rounded-xl bg-gradient-to-tr from-neutral-950 via-neutral-900 to-amber-950/20 border border-amber-500/30 mb-3 flex items-center justify-center min-h-[90px] group-hover:border-amber-500/60 transition-colors">
                          <svg
                            viewBox={icon.viewBox}
                            className="w-12 h-12 text-amber-400 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            dangerouslySetInnerHTML={{ __html: icon.svgPath }}
                          />
                        </div>

                        {/* Title and ID */}
                        <h4 className="text-xs font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1 mb-0.5">
                          {icon.title}
                        </h4>
                        <p className="text-[11px] font-mono text-neutral-500 line-clamp-1 mb-2">{icon.titleEn}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {icon.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-950 text-neutral-400 border border-neutral-800"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-3 border-t border-neutral-800/80 flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(svgRaw, `${icon.id}-svg`)}
                          className="flex-1 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                          title="کپی مستقیم کد SVG"
                        >
                          {copiedId === `${icon.id}-svg` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">کپی شد</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>کپی SVG</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(shortcode, `${icon.id}-sc`)}
                          className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                          title="کپی شورت‌کد المنتور و گوتنبرگ"
                        >
                          {copiedId === `${icon.id}-sc` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <BookmarkCheck className="w-3.5 h-3.5" />
                          )}
                          <span>شورت‌کد</span>
                        </button>

                        <button
                          onClick={() => handleCopy(phpCode, `${icon.id}-php`)}
                          className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                          title="کپی توابع PHP"
                        >
                          {copiedId === `${icon.id}-php` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Code2 className="w-3.5 h-3.5" />
                          )}
                          <span>PHP</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: SVG SHAPE DIVIDERS & CONTAINERS BANK (66 MODELS) */}
          {activeTab === 'dividers' && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Scissors className="w-4 h-4" />
                    <span>بانک ۶۶ مدل دیوایدر و کانتینر برش SVG (Sovereign Shape Dividers)</span>
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    طراحی اختصاصی بدون نیاز به افزونه‌های سنگین؛ قابلیت تغییر رنگ، معکوس‌سازی (Flip) و ماسک CSS
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 font-bold font-mono">
                    تعداد: {filteredDividers.length} از ۶۶ مدل
                  </span>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
                  {[
                    { id: 'all', label: 'همه (۶۶)' },
                    { id: 'wave', label: 'امواج و الیاف' },
                    { id: 'geometric', label: 'زاویه‌دار و اسلنت' },
                    { id: 'islamic', label: 'مقرنس و شمسه' },
                    { id: 'cyber', label: 'سایبر و مدار' },
                    { id: 'architectural', label: 'ستون و عمق' },
                    { id: 'minimal', label: 'مینیمال' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedDividerCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedDividerCategory === cat.id
                          ? 'bg-amber-500 text-neutral-950 shadow-md'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 absolute right-3 top-2.5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="جستجو در دیوایدرها..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Dividers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDividers.map((div) => {
                  const svgRaw = `<svg viewBox="${div.viewBox}" fill="currentColor" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-12 text-amber-500"><path d="${div.svgPath}" /></svg>`;
                  const cssMask = `mask-image: url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg viewBox='${div.viewBox}' fill='black' xmlns='http://www.w3.org/2000/svg'><path d='${div.svgPath}'/></svg>`)}");`;
                  const shortcode = `[sedrazavi_divider id="${div.id}" flip="${div.flipSupport ? 'no' : 'none'}"]`;

                  return (
                    <div
                      key={div.id}
                      className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-900 hover:border-amber-500/40 transition-all p-4 flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        {/* Top Meta */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              #{div.number}
                            </span>
                            <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                              {div.categoryLabel}
                            </span>
                          </div>
                          {div.flipSupport && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">
                              پشتیبانی از Flip
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                          {div.title}
                        </h4>
                        <p className="text-[11px] font-mono text-neutral-500 mb-2">{div.titleEn}</p>

                        {/* Live SVG Curve Preview */}
                        <div className="my-3 p-2 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-center overflow-hidden">
                          <svg
                            viewBox={div.viewBox}
                            fill="currentColor"
                            preserveAspectRatio="none"
                            className="w-full h-12 text-amber-400/90 group-hover:text-amber-300 transition-colors"
                          >
                            <path d={div.svgPath} />
                          </svg>
                        </div>

                        <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                          <span className="text-amber-400/80 font-bold">کاربرد پیشنهادی: </span>
                          {div.recommendedUse}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-3 border-t border-neutral-800/80 flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(svgRaw, `${div.id}-svg`)}
                          className="flex-1 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                        >
                          {copiedId === `${div.id}-svg` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">کپی شد</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>کپی SVG</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(cssMask, `${div.id}-mask`)}
                          className="px-2.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                          title="کپی به عنوان CSS Mask Image"
                        >
                          {copiedId === `${div.id}-mask` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Code2 className="w-3.5 h-3.5" />
                          )}
                          <span>ماسک</span>
                        </button>

                        <button
                          onClick={() => handleCopy(shortcode, `${div.id}-sc`)}
                          className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                          title="کپی شورت‌کد المنتور"
                        >
                          {copiedId === `${div.id}-sc` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <BookmarkCheck className="w-3.5 h-3.5" />
                          )}
                          <span>شورت‌کد</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: TRUST BADGES & SEALS BANK (66 MODELS) */}
          {activeTab === 'badges' && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    <span>بانک ۶۶ نشان، مدال و مهر اعتبار رسمی (Sovereign Trust Badges & Seals)</span>
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    افزایش نرخ تبدیل و ایجاد اعتماد حداکثری با مهر زمانی، هش رمزنگاری، اسکیمای JSON-LD و استانداردهای بانکی
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 font-bold font-mono">
                    تعداد: {filteredBadges.length} از ۶۶ نشان
                  </span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
                  {[
                    { id: 'all', label: 'همه (۶۶)' },
                    { id: 'security', label: 'امنیت و سایبر' },
                    { id: 'judicial', label: 'قضایی و عدلیه' },
                    { id: 'audit', label: 'حسابرسی و لاگ' },
                    { id: 'iso', label: 'ایزو و استاندارد' },
                    { id: 'encryption', label: 'رمزنگاری SHA' },
                    { id: 'payment', label: 'بانکی و مالی' },
                    { id: 'guarantee', label: 'تضامین و بیمه' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedBadgeCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedBadgeCategory === cat.id
                          ? 'bg-amber-500 text-neutral-950 shadow-md'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 absolute right-3 top-2.5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="جستجو در نشان‌ها..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Badges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBadges.map((badge) => {
                  const badgeHtml = `<div class="sr-badge sr-badge-${badge.id}"><span class="sr-badge-icon">${badge.icon}</span><strong>${badge.label}</strong><small>${badge.tag}</small><code>${badge.desc}</code></div>`;
                  const shortcode = `[sedrazavi_badge id="${badge.id}"]`;

                  return (
                    <div
                      key={badge.id}
                      className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-900 hover:border-amber-500/40 transition-all p-4 flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        {/* Meta */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            #{badge.number}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30">
                            {badge.tag}
                          </span>
                        </div>

                        {/* Visual Badge Card */}
                        <div className="p-4 rounded-xl bg-gradient-to-tr from-neutral-950 via-neutral-900 to-amber-950/20 border border-amber-500/30 mb-3 flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl shrink-0 font-bold text-amber-400">
                            ⭐
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-black text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                              {badge.label}
                            </h4>
                            <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">{badge.labelEn}</p>
                            <span className="inline-block mt-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                              {badge.desc}
                            </span>
                          </div>
                        </div>

                        {/* Schema Meta */}
                        <div className="text-[11px] text-neutral-400 space-y-1 mb-3">
                          <div>
                            <span className="text-neutral-500">دسته‌بندی: </span>
                            <span className="text-cyan-400 font-mono">{badge.categoryLabel}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-3 border-t border-neutral-800/80 flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(badgeHtml, `${badge.id}-html`)}
                          className="flex-1 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          {copiedId === `${badge.id}-html` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">کپی شد</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>کپی HTML</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(shortcode, `${badge.id}-sc`)}
                          className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                        >
                          {copiedId === `${badge.id}-sc` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <BookmarkCheck className="w-3.5 h-3.5" />
                          )}
                          <span>شورت‌کد</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: SECTION BLUEPRINTS & BANNERS (66 MODELS) */}
          {activeTab === 'sections' && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Layout className="w-4 h-4" />
                    <span>بانک ۶۶ بلوپرینت سکشن و بنر آماده (Sovereign Section Blueprints)</span>
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    ساختارهای مهندسی‌شده با تناسب طلایی، ارتفاع واکنش‌گرا و اتصال چند ویجتی برای المنتور و گوتنبرگ
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 font-bold font-mono">
                    تعداد: {filteredSections.length} از ۶۶ سکشن
                  </span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
                  {[
                    { id: 'all', label: 'همه (۶۶)' },
                    { id: 'hero', label: 'هیرو و سربرگ' },
                    { id: 'features', label: 'امکانات و خدمات' },
                    { id: 'trust', label: 'اعتماد و مدارک' },
                    { id: 'conversion', label: 'فرم و تبدیل' },
                    { id: 'media', label: 'ویدیو و مدیا' },
                    { id: 'footer', label: 'فوتر و مگا' },
                    { id: 'portal', label: 'پرتال و کنسول' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedSectionCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedSectionCategory === cat.id
                          ? 'bg-amber-500 text-neutral-950 shadow-md'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 absolute right-3 top-2.5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="جستجو در سکشن‌ها..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Sections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSections.map((sec) => {
                  return (
                    <div
                      key={sec.id}
                      className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-900 hover:border-amber-500/40 transition-all p-4 flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        {/* Meta */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              #{sec.number}
                            </span>
                            <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                              {sec.categoryLabel}
                            </span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-neutral-800 text-neutral-300">
                            {sec.previewHeight}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                          {sec.title}
                        </h4>
                        <p className="text-[11px] font-mono text-neutral-500 mb-2">{sec.titleEn}</p>

                        {/* Badge Tag */}
                        <div className="mb-2.5">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                            {sec.badge}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-300 leading-relaxed mb-3">{sec.desc}</p>

                        {/* Recommended Widgets */}
                        <div className="space-y-1 mb-3">
                          <span className="text-[10px] text-neutral-500">ویجت‌های ادغام‌شده:</span>
                          <div className="flex flex-wrap gap-1">
                            {sec.recommendedWidgets.map((w, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-950 text-neutral-300 border border-neutral-800"
                              >
                                {w}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="pt-3 border-t border-neutral-800/80">
                        <button
                          onClick={() => handleCopy(sec.shortcodeCode, `${sec.id}-bundle`)}
                          className="w-full py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          {copiedId === `${sec.id}-bundle` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">پکیج سکشن کپی شد</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>کپی پکیج شورت‌کدهای سکشن</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: MOTION & ANIMATION PRESETS (66 MODELS) */}
          {activeTab === 'motions' && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>بانک ۶۶ پریست موشن و انیمیشن روان (Sovereign Motion & Animation Presets)</span>
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1">
                    انیمیشن‌های شتاب‌یافته با GPU، ۶۰ فریم بدون لکنت؛ سازگار با کلاس‌های CSS المنتور و هوک‌های موشن
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400 font-bold font-mono">
                    تعداد: {filteredMotions.length} از ۶۶ موشن
                  </span>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
                  {[
                    { id: 'all', label: 'همه (۶۶)' },
                    { id: 'entrance', label: 'ورود به صفحه (Entrance)' },
                    { id: 'hover', label: 'هاور ماوس (Hover)' },
                    { id: 'scroll', label: 'وابسته به اسکرول' },
                    { id: 'continuous', label: 'لوپ پیوسته' },
                    { id: 'gesture', label: 'لمس و ژست' },
                  ].map((trig) => (
                    <button
                      key={trig.id}
                      onClick={() => setSelectedMotionTrigger(trig.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        selectedMotionTrigger === trig.id
                          ? 'bg-amber-500 text-neutral-950 shadow-md'
                          : 'bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {trig.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 absolute right-3 top-2.5 text-neutral-500" />
                  <input
                    type="text"
                    placeholder="جستجو در موشن‌ها..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Motions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMotions.map((mot) => {
                  const isPlaying = playingMotionId === mot.id;

                  return (
                    <div
                      key={mot.id}
                      className="rounded-2xl border border-neutral-800/80 bg-neutral-900/60 hover:bg-neutral-900 hover:border-amber-500/40 transition-all p-4 flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        {/* Meta */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-mono font-black px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              #{mot.number}
                            </span>
                            <span className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                              {mot.typeLabel}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            GPU ۶۰fps
                          </span>
                        </div>

                        {/* Name */}
                        <h4 className="text-sm font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">
                          {mot.name}
                        </h4>
                        <p className="text-[11px] font-mono text-neutral-500 mb-2">{mot.nameEn}</p>

                        {/* Interactive Animation Demo Box */}
                        <div className="my-3 p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-7 h-7 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-xs transition-transform ${
                                isPlaying ? 'scale-125 rotate-12 shadow-lg shadow-amber-500/50' : ''
                              }`}
                            >
                              ⚡
                            </div>
                            <span className="text-[11px] font-mono text-neutral-300">.{mot.cssClass}</span>
                          </div>

                          <button
                            onClick={() => {
                              setPlayingMotionId(mot.id);
                              setTimeout(() => setPlayingMotionId(null), 1200);
                            }}
                            className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] font-bold flex items-center gap-1"
                          >
                            <Play className="w-3 h-3 text-amber-400" />
                            <span>تست زنده</span>
                          </button>
                        </div>

                        <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                          <span className="text-amber-400 font-bold">کاربرد: </span>
                          {mot.recommendedUse}
                        </p>
                      </div>

                      {/* Action */}
                      <div className="pt-3 border-t border-neutral-800/80 flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(mot.cssClass, `${mot.id}-cls`)}
                          className="flex-1 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                        >
                          {copiedId === `${mot.id}-cls` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">کلاس کپی شد</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>کپی نام کلاس</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(mot.keyframes, `${mot.id}-css`)}
                          className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"
                        >
                          {copiedId === `${mot.id}-css` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Code2 className="w-3.5 h-3.5" />
                          )}
                          <span>کد Keyframes</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 7: PRE-BUILT TEMPLATES & ARCHITECTURES */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                <span className="font-bold text-amber-400">معماری‌های تمپلیت آماده وردپرس: </span>
                این تمپلیت‌ها ترکیب‌های طلایی از ویجت‌های فوق برای سناریوهای صفر تا صد وب‌سایت‌های سازمانی،
                حقوقی، آموزشی و فروشگاهی بدون نیاز به کدنویسی هستند.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    id: 'tpl-law-sovereign',
                    title: '۱. لندینگ‌پیج حاکمیت وکالت و دعاوی ملکی (Sovereign Law Chamber)',
                    desc: 'شامل هدر جزیره‌ای شناور، هیرو سه‌بعدی Motionsites، رادار پیش‌بینی ریسک، ماشین حساب تخمین هزینه دادرسی و پرتال موکلین Level C.',
                    widgets: ['#1 هدر جزیره‌ای', '#7 هیرو سه‌بعدی', '#16 رادار ریسک', '#32 هزینه دادرسی', '#49 پرتال Level C'],
                    shortcodeSnippet: '[sedrazavi_island_navbar]\n[sedrazavi_hero mode="3d"]\n[sedrazavi_cases filter_bar="yes"]\n[sedrazavi_calculator mode="judicial_fee"]\n[sedrazavi_matter_portal mode="full"]',
                  },
                  {
                    id: 'tpl-corporate-arbitration',
                    title: '۲. وب‌سایت داوری تجاری و قراردادهای بین‌المللی (Corporate Arbitration)',
                    desc: 'طراحی مینیمالیست با گرید ۴ ستونه خدمات، مقایسه سطوح وکالت، شبیه‌ساز ROI احیای اسناد تجاری و لاگ اعتبارسنجی SHA-256.',
                    widgets: ['#2 هدر شرکتی', '#8 هیرو وودمارت', '#20 خدمات شیشه‌ای', '#31 شبیه‌ساز ROI', '#37 لاگ تراکنش'],
                    shortcodeSnippet: '[sedrazavi_split_header]\n[sedrazavi_hero mode="woodmart"]\n[sedrazavi_services layout="grid_4"]\n[sedrazavi_roi_simulator]\n[sedrazavi_transactions limit="5"]',
                  },
                  {
                    id: 'tpl-academy-spotplayer',
                    title: '۳. آکادمی حقوقی و کارآموزی وکالت با اسپات‌پلیر (Legal Academy & SpotPlayer)',
                    desc: 'ویترین دوره‌های آموزشی، پلیر ویدیویی با فصل‌بندی، پلیر ضدسرقت اسپات‌پلیر، پادکست تحلیل آرا و درگاه پرداخت ووکامرس.',
                    widgets: ['#1 هدر شناور', '#43 ویدیو با فصول', '#44 پادکست رادیو عدالت', '#47 اسپات‌پلیر امن', '#61 سبد خرید کشویی'],
                    shortcodeSnippet: '[sedrazavi_island_navbar]\n[sedrazavi_video chapters="yes"]\n[sedrazavi_podcast episode="12"]\n[sedrazavi_spotplayer course_id="102"]\n[sedrazavi_drawer_cart]',
                  },
                  {
                    id: 'tpl-cyber-terminal',
                    title: '۴. پرتال جرایم رایانه‌ای و قراردادهای رمزنگاری (Cyber Law & Crypto)',
                    desc: 'طراحی تیره سایبری با ترمینال هوشمند، بج PGP، سد دفاعی Anti-IDOR، تایم‌لاین دادرسی و والت اسناد ۱۵ دقیقه‌ای HMAC.',
                    widgets: ['#11 هیرو ترمینال', '#50 سد دفاعی IDOR', '#51 والت HMAC', '#53 فینگرپرینت PGP', '#70 اسکنر لیزر'],
                    shortcodeSnippet: '[sedrazavi_terminal_hero]\n[sedrazavi_idor_guard]\n[sedrazavi_hmac_vault]\n[sedrazavi_pgp_badge]\n[sedrazavi_preloader style="laser"]',
                  },
                ].map((tpl) => (
                  <div
                    key={tpl.id}
                    className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-amber-400 mb-2">{tpl.title}</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed mb-3">{tpl.desc}</p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tpl.widgets.map((w, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                      <button
                        onClick={() => handleCopy(tpl.shortcodeSnippet, tpl.id)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-neutral-950 rounded-xl text-xs font-bold hover:bg-amber-400 transition-colors"
                      >
                        {copiedId === tpl.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>کپی پکیج شورت‌کدهای تمپلیت</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WORDPRESS CODE & SHORTCODE GENERATOR */}
          {activeTab === 'generator' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Control Column */}
                <div className="lg:col-span-1 p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Sliders className="w-4 h-4" />
                    <span>پیکربندی ویجت هدف</span>
                  </h4>

                  {/* Widget Selector */}
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1.5">انتخاب ویجت از بانک ۷۲ عددی:</label>
                    <select
                      value={genWidgetId}
                      onChange={(e) => setGenWidgetId(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500"
                    >
                      {SOVEREIGN_WIDGETS_BANK.map((w) => (
                        <option key={w.id} value={w.id}>
                          #{w.number} - {w.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Custom CSS Class */}
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1.5">کلاس CSS سفارشی (اختیاری):</label>
                    <input
                      type="text"
                      value={genCustomClass}
                      onChange={(e) => setGenCustomClass(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>

                  {/* Options */}
                  <div className="pt-2 border-t border-neutral-800 space-y-2">
                    <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={genShowTitle}
                        onChange={(e) => setGenShowTitle(e.target.checked)}
                        className="rounded accent-amber-500"
                      />
                      <span>نمایش هدر و عنوان رسمی ویجت</span>
                    </label>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-400">
                    <span className="text-amber-400 font-bold">سازگاری ۱۰۰٪: </span>
                    تمامی خروجی‌ها بدون وابستگی به تم یا افزونه شخص ثالث، روی هر وردپرس ۵.۸+ و PHP ۷.۴+ به بالا
                    کامپایل و رندر می‌شوند.
                  </div>
                </div>

                {/* Generated Code Previews */}
                <div className="lg:col-span-2 space-y-4">
                  {/* 1. WordPress Shortcode */}
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-400">۱. شورت‌کد وردپرس (Elementor & Gutenberg)</span>
                      <button
                        onClick={() =>
                          handleCopy(
                            `[${selectedGenWidget.shortcode.replace('[', '').replace(']', '')} class="${genCustomClass}"]`,
                            'gen-sc'
                          )
                        }
                        className="flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white px-2 py-1 bg-neutral-800 rounded"
                      >
                        {copiedId === 'gen-sc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>کپی شورت‌کد</span>
                      </button>
                    </div>
                    <pre className="p-3 bg-neutral-950 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto border border-neutral-800/80" dir="ltr">
                      {`[${selectedGenWidget.shortcode.replace('[', '').replace(']', '')} class="${genCustomClass}"]`}
                    </pre>
                  </div>

                  {/* 2. PHP Template Hook */}
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-400">۲. کد فایل‌های قالب PHP (functions.php / page.php)</span>
                      <button
                        onClick={() =>
                          handleCopy(
                            `<?php echo do_shortcode('[${selectedGenWidget.shortcode.replace('[', '').replace(']', '')} class="${genCustomClass}"]'); ?>`,
                            'gen-php'
                          )
                        }
                        className="flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white px-2 py-1 bg-neutral-800 rounded"
                      >
                        {copiedId === 'gen-php' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>کپی PHP</span>
                      </button>
                    </div>
                    <pre className="p-3 bg-neutral-950 rounded-xl text-xs font-mono text-cyan-400 overflow-x-auto border border-neutral-800/80" dir="ltr">
                      {`<?php echo do_shortcode('[${selectedGenWidget.shortcode.replace('[', '').replace(']', '')} class="${genCustomClass}"]'); ?>`}
                    </pre>
                  </div>

                  {/* 3. REST API Endpoint */}
                  <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-400">۳. اندپوینت REST API وب‌سایت</span>
                      <button
                        onClick={() =>
                          handleCopy(`/wp-json/sedrazavi/v1/widgets-bank`, 'gen-rest')
                        }
                        className="flex items-center gap-1 text-[11px] text-neutral-300 hover:text-white px-2 py-1 bg-neutral-800 rounded"
                      >
                        {copiedId === 'gen-rest' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>کپی اندپوینت</span>
                      </button>
                    </div>
                    <pre className="p-3 bg-neutral-950 rounded-xl text-xs font-mono text-purple-400 overflow-x-auto border border-neutral-800/80" dir="ltr">
                      GET /wp-json/sedrazavi/v1/widgets-bank
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-neutral-800 bg-neutral-900/90 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>پلاگین و تم متصل به بک‌اند و فرانت‌اند با امنیت، سئو و سرعت ۱۰۰٪</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-neutral-500">طراح: سید امیر حسین رضوی فردویی</span>
            <span className="text-amber-400 font-mono">sedrazavi.ir</span>
          </div>
        </div>
      </div>

      {/* Inspect Widget Modal Popover */}
      {inspectingWidget && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-neutral-900 border border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                  #{inspectingWidget.number}
                </span>
                <h4 className="font-bold text-white text-sm">{inspectingWidget.title}</h4>
              </div>
              <button
                onClick={() => setInspectingWidget(null)}
                className="p-1 rounded bg-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">{inspectingWidget.desc}</p>

            <div className="space-y-2 text-xs bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-mono">
              <div>
                <span className="text-neutral-500">اسکیما سئو: </span>
                <span className="text-cyan-400 font-bold">{inspectingWidget.schemaType}</span>
              </div>
              <div>
                <span className="text-neutral-500">اسلاگ المنتور: </span>
                <span className="text-amber-400">{inspectingWidget.elementorWidgetSlug}</span>
              </div>
              <div>
                <span className="text-neutral-500">نام بلوک گوتنبرگ: </span>
                <span className="text-emerald-400">{inspectingWidget.gutenbergBlockName}</span>
              </div>
              <div>
                <span className="text-neutral-500">کنترل‌های طراحی: </span>
                <span className="text-purple-400">{inspectingWidget.optionsCount} کنترل تعاملی</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  handleCopy(inspectingWidget.sampleCode, 'inspect-copy');
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 text-neutral-950 font-bold rounded-xl text-xs hover:bg-amber-400"
              >
                {copiedId === 'inspect-copy' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>کپی کد کامل نمونه</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
