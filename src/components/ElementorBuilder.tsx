import React, { useState } from 'react';
import { ELEMENTOR_BLOCKS_DATA } from '../data/mockData';
import { ElementorBlockDef } from '../types/theme';
import { Sparkles, Layers, Sliders, Check, Copy, Code, Eye, Monitor, Tablet, Smartphone } from 'lucide-react';

export const ElementorBuilder: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<ElementorBlockDef>(ELEMENTOR_BLOCKS_DATA[0]);
  const [activeCategory, setActiveCategory] = useState<string>('همه');
  const [copiedCode, setCopiedCode] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Custom live options state for selected block
  const [blockOptions, setBlockOptions] = useState<Record<string, any>>({
    'عنوان اصلی هیرو': 'دفاع هوشمندانه و قاطع از حقوق قانونی شما',
    'متن برچسب تجربه': 'بیش از ۲۰ سال سابقه درخشان وکالت',
    'نمایش دکمه رزرو نوبت': true,
  });

  const categories = ['همه', 'هیرو و معرفی', 'خدمات و پرونده‌ها', 'اعتبار و نظرات', 'فرم و رزرو', 'فوتر و هدر'];

  const filteredBlocks = ELEMENTOR_BLOCKS_DATA.filter((b) => {
    if (activeCategory === 'همه') return true;
    return b.category === activeCategory;
  });

  const handleSelectBlock = (block: ElementorBlockDef) => {
    setSelectedBlock(block);
    const initialOpts: Record<string, any> = {};
    block.options.forEach((opt) => {
      initialOpts[opt.name] = opt.defaultValue;
    });
    setBlockOptions(initialOpts);
  };

  const handleCopyShortcode = () => {
    const code = `[sedrazavi_widget id="${selectedBlock.code}" ${Object.entries(blockOptions)
      .map(([k, v]) => `${k.replace(/\s+/g, '_')}="${v}"`)
      .join(' ')}]`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="py-8 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white">
                ویترین ۲۵ بلاک اختصاصی المنتور پرو SedRazavi
              </h1>
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold">
                Elementor 3.x Ready
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              انتخاب، پیکربندی زنده تنظیمات و استخراج شورت‌کد و کدهای ویجت المنتور برای درج در صفحات سایت.
            </p>
          </div>

          {/* Device Preview Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`p-2 rounded-lg text-xs font-semibold ${
                previewDevice === 'desktop' ? 'bg-[#D4AF37] text-white' : 'text-gray-500'
              }`}
              title="دسکتاپ"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`p-2 rounded-lg text-xs font-semibold ${
                previewDevice === 'tablet' ? 'bg-[#D4AF37] text-white' : 'text-gray-500'
              }`}
              title="تبلت"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-2 rounded-lg text-xs font-semibold ${
                previewDevice === 'mobile' ? 'bg-[#D4AF37] text-white' : 'text-gray-500'
              }`}
              title="موبایل"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Builder Work Area: Left Sidebar Blocks List + Right Live Preview & Config */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Blocks List (4 Cols) */}
          <div className="lg:col-span-4 space-y-3 max-h-[750px] overflow-y-auto pr-1">
            {filteredBlocks.map((block) => (
              <div
                key={block.id}
                onClick={() => handleSelectBlock(block)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  selectedBlock.id === block.id
                    ? 'bg-white dark:bg-[#0B132B] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10 ring-2 ring-[#D4AF37]/30'
                    : 'bg-white/80 dark:bg-gray-900/60 border-gray-200 dark:border-gray-800 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold font-mono text-[#D4AF37]">{block.code}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {block.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 font-serif">
                  {block.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                  {block.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Live Interactive Configuration & Sandbox Preview (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Config Card */}
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="text-lg font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#D4AF37]" />
                    تنظیمات زنده: {selectedBlock.title}
                  </h3>
                  <span className="text-xs text-gray-400 font-mono">
                    Elementor Widget ID: {selectedBlock.code}
                  </span>
                </div>

                <button
                  onClick={handleCopyShortcode}
                  className="btn-gold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 self-start sm:self-auto"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'شورت‌کد کپی شد!' : 'کپی شورت‌کد المنتور'}</span>
                </button>
              </div>

              {/* Dynamic Controls generated from options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedBlock.options.map((opt) => (
                  <div key={opt.name} className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                      {opt.name}
                    </label>

                    {opt.type === 'text' && (
                      <input
                        type="text"
                        value={blockOptions[opt.name] ?? opt.defaultValue}
                        onChange={(e) =>
                          setBlockOptions({ ...blockOptions, [opt.name]: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white"
                      />
                    )}

                    {opt.type === 'select' && (
                      <select
                        value={blockOptions[opt.name] ?? opt.defaultValue}
                        onChange={(e) =>
                          setBlockOptions({ ...blockOptions, [opt.name]: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs dark:text-white"
                      >
                        {opt.options?.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    )}

                    {opt.type === 'boolean' && (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          checked={blockOptions[opt.name] ?? (opt.defaultValue as boolean)}
                          onChange={(e) =>
                            setBlockOptions({ ...blockOptions, [opt.name]: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-300">فعال بودن در صفحه</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live Visual Preview Frame */}
            <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-7 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center gap-1.5 font-bold text-gray-600 dark:text-gray-300">
                  <Eye className="w-4 h-4 text-[#2A9D8F]" />
                  پیش‌نمایش زنده در نمای {previewDevice === 'desktop' ? 'رایانه' : previewDevice === 'tablet' ? 'تبلت' : 'گوشی'}
                </span>
                <span className="font-mono">۱۰۰٪ سازگار با Elementor Free & Pro</span>
              </div>

              {/* Render Preview Box based on selected block */}
              <div
                className={`mx-auto transition-all duration-300 bg-[#F4F6F9] dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-dashed border-[#D4AF37]/50 ${
                  previewDevice === 'desktop'
                    ? 'w-full'
                    : previewDevice === 'tablet'
                    ? 'max-w-lg'
                    : 'max-w-xs'
                }`}
              >
                <div className="space-y-4 text-center">
                  <div className="inline-block p-3 rounded-2xl bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB]">
                    <Sparkles className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
                    {blockOptions['عنوان اصلی هیرو'] || blockOptions['عنوان فرم'] || selectedBlock.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
                    {selectedBlock.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button className="btn-gold text-xs px-5 py-2.5 rounded-xl">
                      دکمه اقدام نمونه بلاک
                    </button>
                    <button className="btn-outline-navy dark:border-gray-600 dark:text-gray-200 text-xs px-4 py-2 rounded-xl">
                      مشاهده اطلاعات
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
