import React, { useState } from 'react';
import {
  X,
  Package,
  ShieldCheck,
  CheckCircle2,
  Download,
  RotateCcw,
  Search,
  Filter,
  Layers,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Cpu,
  Clock,
  AlertTriangle,
  Lock,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface SedRazaviLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PackageItem {
  package_id: string;
  version: string;
  type: string;
  title: string;
  title_en: string;
  publisher: string;
  publisher_handle: string;
  license: string;
  trust_level: 'first_party_signed' | 'reviewed_partner' | 'community';
  description: string;
  requires: {
    wordpress: string;
    php: string;
    plugins: string[];
  };
  editor_parity: {
    gutenberg: 'native' | 'adapter' | 'fallback';
    elementor: 'native' | 'adapter' | 'fallback';
  };
  artifact: {
    url: string;
    sha256: string;
    size_kb: number;
  };
  tags: string[];
}

const PACKAGES_CATALOG: PackageItem[] = [
  {
    package_id: 'sedrazavi.legal.level-a',
    version: '25.0.0',
    type: 'vertical-pack',
    title: 'سامانه حقوقی جامع وکلا و دفاتر حقوقی (سطح A - پرچم‌دار)',
    title_en: 'Legal Firm Sovereign Suite Level-A',
    publisher: 'SedRazavi (سید امیر حسین رضوی فردویی)',
    publisher_handle: '@sedrazavi',
    license: 'GPL-3.0-or-later',
    trust_level: 'first_party_signed',
    description: 'پکیج مرجع وکالت: صفحات عمومی، فرم اینتیک با حداقل‌سازی داده، نوبت‌دهی تقویمی، اسکیما و سئوی فنی.',
    requires: { wordpress: '>=6.4', php: '>=8.1', plugins: [] },
    editor_parity: { gutenberg: 'native', elementor: 'adapter' },
    artifact: {
      url: 'https://catalog.sedrazavi.ir/artifacts/legal-level-a-25.0.0.zip',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      size_kb: 240,
    },
    tags: ['حقوقی', 'وکالت', 'گوتنبرگ', 'اینتیک'],
  },
  {
    package_id: 'sedrazavi.snapelement.catalog',
    version: '4.2.0',
    type: 'design-archetype',
    title: 'کاتالوگ اتمیک SnapElement با متغیرهای توکن بومی',
    title_en: 'SnapElement Unstyled Atomic Kits',
    publisher: 'SnapElement & SedRazavi',
    publisher_handle: '@sedrazavi',
    license: 'MIT',
    trust_level: 'first_party_signed',
    description: 'مجموعه کامپوننت‌های بدون استایل المنتور V3/V4 کانتینری با کپی ۱-کلیک JSON و سازگاری گلوبال توکن.',
    requires: { wordpress: '>=6.2', php: '>=8.0', plugins: ['elementor'] },
    editor_parity: { gutenberg: 'adapter', elementor: 'native' },
    artifact: {
      url: 'https://catalog.sedrazavi.ir/artifacts/snapelement-catalog-4.2.0.zip',
      sha256: '9f83c605ae7e08f1391b8db094e467b918ec459c15f4b8f8ff3a74c9e776383c',
      size_kb: 180,
    },
    tags: ['المنتور', 'کانتینر', 'SnapElement', 'بدون استایل'],
  },
  {
    package_id: 'sedrazavi.girih.vector-engine',
    version: '3.1.0',
    type: 'svg-asset',
    title: 'موتور وکتور و هندسه پارامتریک گره‌چینی ایرانی-اسلامی',
    title_en: 'Persian Girih Parametric Vector Engine',
    publisher: 'SedRazavi (سید امیر حسین رضوی فردویی)',
    publisher_handle: '@sedrazavi',
    license: 'GPL-3.0-or-later',
    trust_level: 'first_party_signed',
    description: 'تولید فرمولیک شمسه ۸ و ۱۰ و ۱۲ پر، کاربندی و ستاره‌های هندسی اسلیمی به صورت SVG سبک زیر ۲ کیلوبایت.',
    requires: { wordpress: '>=6.0', php: '>=8.0', plugins: [] },
    editor_parity: { gutenberg: 'native', elementor: 'native' },
    artifact: {
      url: 'https://catalog.sedrazavi.ir/artifacts/girih-vector-engine-3.1.0.zip',
      sha256: '324a35cf9119ef473b1842071f56394d1250399d7d4e5dd04c44658a427790ee',
      size_kb: 96,
    },
    tags: ['گره‌چینی', 'شمسه', 'SVG', 'معماری اصیل'],
  },
  {
    package_id: 'sedrazavi.agency.designer-starter',
    version: '2.6.0',
    type: 'starter-site',
    title: 'بسته استارتر طراحان وب و وردپرس‌کاران حرفه‌ای (Gutenberg-First)',
    title_en: 'Web Agency & WordPress Designer Starter',
    publisher: 'SedRazavi',
    publisher_handle: '@sedrazavi',
    license: 'GPL-3.0-or-later',
    trust_level: 'first_party_signed',
    description: 'طراحی با گوتنبرگ خالص، سرعت زیر ۱ ثانیه، حذف پلاگین‌های سنگین، درگاه ترمینال یونیکس و محاسبه‌گر هوشمند.',
    requires: { wordpress: '>=6.5', php: '>=8.1', plugins: [] },
    editor_parity: { gutenberg: 'native', elementor: 'adapter' },
    artifact: {
      url: 'https://catalog.sedrazavi.ir/artifacts/agency-designer-starter-2.6.0.zip',
      sha256: '6c518b61c14214620583b4b889f03a87fc142990e839e1324f15b60721ad6b0d',
      size_kb: 305,
    },
    tags: ['آژانس وب', 'گوتنبرگ', 'ترمینال CLI', 'سریع'],
  },
];

export const SedRazaviLibraryModal: React.FC<SedRazaviLibraryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedEditor, setSelectedEditor] = useState<string>('all');
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installedPackages, setInstalledPackages] = useState<string[]>(['sedrazavi.legal.level-a']);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredPackages = PACKAGES_CATALOG.filter((pkg) => {
    if (selectedType !== 'all' && pkg.type !== selectedType) return false;
    if (selectedEditor === 'gutenberg' && pkg.editor_parity.gutenberg !== 'native') return false;
    if (selectedEditor === 'elementor' && pkg.editor_parity.elementor !== 'native') return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        pkg.title.toLowerCase().includes(q) ||
        pkg.package_id.toLowerCase().includes(q) ||
        pkg.description.toLowerCase().includes(q) ||
        pkg.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    showToast({
      message: 'کد هش SHA-256 در کلیپ‌بورد کپی شد.',
      type: 'success',
    });
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleSimulateInstall = (pkg: PackageItem) => {
    setIsInstalling(true);
    setTimeout(() => {
      setInstalledPackages((prev) => [...new Set([...prev, pkg.package_id])]);
      setIsInstalling(false);
      setSelectedPackage(null);
      showToast({
        message: `پکیج ${pkg.title} با موفقیت نصب، اعتبارسنجی و فعال گردید!`,
        type: 'success',
      });
    }, 900);
  };

  const handleSimulateRollback = (pkgId: string) => {
    setInstalledPackages((prev) => prev.filter((id) => id !== pkgId));
    showToast({
      message: 'عملیات Rollback انجام شد و وضعیت بسته به اسنپ‌شات قبلی بازگشت.',
      type: 'info',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-8 max-h-[90vh] flex flex-col font-sans" dir="rtl">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center font-bold shadow-lg shadow-indigo-600/30">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  کتابخانه مرکزی بسته‌ها — SedRazavi Library
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                  v25.0 Master Roadmap
                </span>
              </div>
              <p className="text-xs text-slate-400">
                کاتالوگ توزیع پکیج‌های مستقل، تمامیت SHA-256، اسنپ‌شات Rollback و انطباق گوتنبرگ / المنتور
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در نام، تگ یا شناسه بسته..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="all">همه دسته‌ها (All Types)</option>
              <option value="vertical-pack">بسته‌های عمودی تخصصی (Vertical)</option>
              <option value="design-archetype">آرک‌تایپ‌های طراحی (Design)</option>
              <option value="starter-site">سایت‌های استارتر (Starter)</option>
              <option value="svg-asset">موتورهای وکتور و هندسه (SVG)</option>
            </select>

            <select
              value={selectedEditor}
              onChange={(e) => setSelectedEditor(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none cursor-pointer"
            >
              <option value="all">همه ادیتورها</option>
              <option value="gutenberg">گوتنبرگ بومی (Gutenberg Native)</option>
              <option value="elementor">المنتور بومی (Elementor Native)</option>
            </select>
          </div>
        </div>

        {/* Package Grid List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPackages.map((pkg) => {
              const isInstalled = installedPackages.includes(pkg.package_id);
              return (
                <div
                  key={pkg.package_id}
                  className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono font-bold bg-slate-900 text-indigo-400 px-2 py-0.5 rounded border border-slate-800">
                        {pkg.package_id}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                          ✓ امضای رسمی
                        </span>
                        {isInstalled && (
                          <span className="text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold">
                            فعال
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-white mb-1.5">{pkg.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {pkg.description}
                    </p>

                    {/* Editor Parity Matrix */}
                    <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800/80 text-[11px] font-mono space-y-1 mb-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Gutenberg Core:</span>
                        <span className={pkg.editor_parity.gutenberg === 'native' ? 'text-cyan-400 font-bold' : 'text-slate-400'}>
                          {pkg.editor_parity.gutenberg}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Elementor V3/V4:</span>
                        <span className={pkg.editor_parity.elementor === 'native' ? 'text-indigo-400 font-bold' : 'text-slate-400'}>
                          {pkg.editor_parity.elementor}
                        </span>
                      </div>
                    </div>

                    {/* SHA256 & Size Strip */}
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-4 bg-slate-900/50 p-1.5 rounded-lg border border-slate-800/50">
                      <div className="flex items-center gap-1 overflow-hidden">
                        <span>SHA-256:</span>
                        <span className="truncate max-w-[140px] text-slate-400">
                          {pkg.artifact.sha256}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyHash(pkg.artifact.sha256)}
                          className="hover:text-cyan-400 cursor-pointer p-0.5"
                          title="کپی هش"
                        >
                          {copiedHash === pkg.artifact.sha256 ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                      <span>{pkg.artifact.size_kb} KB</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                    <span className="text-slate-400 font-mono">v{pkg.version}</span>
                    <div className="flex items-center gap-2">
                      {isInstalled ? (
                        <button
                          type="button"
                          onClick={() => handleSimulateRollback(pkg.package_id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Rollback</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedPackage(pkg)}
                          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-md shadow-indigo-600/20"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>طرح نصب امن</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Install Plan Modal (Section 6.4) */}
        {selectedPackage && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-sm">پیش‌نمایش طرح نصب امن (Install Plan)</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPackage(null)}
                  className="p-1 hover:text-rose-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300 mb-6">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">بسته انتخابی:</span>
                    <span className="font-bold text-white">{selectedPackage.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">نسخه مانیفست:</span>
                    <span className="font-mono text-cyan-400">v{selectedPackage.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">سپر ضد SSRF:</span>
                    <span className="text-emerald-400 font-bold">تأییدشده (بدون مقصد محلی)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">پشتیبان Rollback:</span>
                    <span className="text-emerald-400 font-bold">اسنپ‌شات خودکار فعال</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed">
                  ⚠️ طبق اصل استقلال داده در معماری v25.0، نصب این بسته هیچ رکوردی از محتواهای پیشین شما را حذف نخواهد کرد و تغییرات در یک تراکنش اتمیک اعمال می‌شود.
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedPackage(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  disabled={isInstalling}
                  onClick={() => handleSimulateInstall(selectedPackage)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-600/30 disabled:opacity-50"
                >
                  {isInstalling ? (
                    <>
                      <span className="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                      <span>در حال اعتبارسنجی و نصب...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تأیید و اجرای نصب بسته</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Info Strip */}
        <div className="pt-4 border-t border-slate-800 shrink-0 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>ناشر رسمی: سید امیر حسین رضوی فردویی</span>
            <span className="text-slate-600">•</span>
            <span className="font-mono text-cyan-400">@sedrazavi</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span>سازگار با PHP 8.x و WP 6.x</span>
            <span className="text-emerald-400 font-bold">بدون وابستگی خارجی CDN</span>
          </div>
        </div>
      </div>
    </div>
  );
};
