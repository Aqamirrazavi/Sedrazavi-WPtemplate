import React, { useState } from 'react';
import {
  ShoppingCart,
  Heart,
  Eye,
  Check,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  Sliders,
  Filter,
  CreditCard,
  X,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';

interface FlexibleStoreShowcaseProps {
  onOpenQuickEdit?: () => void;
  onOpenGitHubSync?: () => void;
}

export const FlexibleStoreShowcase: React.FC<FlexibleStoreShowcaseProps> = ({
  onOpenQuickEdit,
  onOpenGitHubSync,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMiniCartOpen, setIsMiniCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Array<{ id: string; title: string; price: number; count: number; image: string }>>([
    {
      id: 'prod-1',
      title: 'بسته جامع قالب وودمارت + افزونه‌های سازگار (لایسنس اورجینال)',
      price: 2450000,
      count: 1,
      image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80',
    },
  ]);
  const [quickCheckoutAmount, setQuickCheckoutAmount] = useState<string>('1250000');
  const [quickPhone, setQuickPhone] = useState<string>('');
  const [quickSuccess, setQuickSuccess] = useState<boolean>(false);

  const products = [
    {
      id: 'prod-1',
      title: 'بسته جامع قالب وودمارت + افزونه‌های سازگار (لایسنس اورجینال)',
      category: 'theme',
      badge: 'ویژه و پرفروش',
      badgeColor: '#D4AF37',
      price: 2450000,
      oldPrice: 3200000,
      rating: 4.9,
      salesCount: 1420,
      image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=600&q=80',
      compatibility: ['WoodMart 7.5+', 'JetWooBuilder', 'ShopEngine', 'WooCommerce 9.x'],
    },
    {
      id: 'prod-2',
      title: 'پکیج ویجت‌های اختصاصی شاپ انجین برای صفحات محصول و آرشیو',
      category: 'addon',
      badge: 'جدید ۲۰۲۶',
      badgeColor: '#10B981',
      price: 1850000,
      oldPrice: 2400000,
      rating: 4.8,
      salesCount: 890,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      compatibility: ['ShopEngine Pro', 'Elementor 3.25', 'ووکامرس'],
    },
    {
      id: 'prod-3',
      title: 'طراحی اختصاصی قالب فروشگاهی سوپرمارکت و کالای دیجیتال',
      category: 'service',
      badge: 'تحویل ۷ روزه',
      badgeColor: '#6366F1',
      price: 18500000,
      oldPrice: 22000000,
      rating: 5.0,
      salesCount: 65,
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=600&q=80',
      compatibility: ['فروشگاه کامل', 'درگاه شاپرک', 'اینماد', 'اپلیکیشن PWA'],
    },
    {
      id: 'prod-4',
      title: 'افزونه درگاه پرداخت مستقیم شاپرک با تسهیم هوشمند و ثبت فاکتور',
      category: 'addon',
      badge: 'شاپرک تاییدشده',
      badgeColor: '#F59E0B',
      price: 950000,
      oldPrice: 1200000,
      rating: 4.7,
      salesCount: 2310,
      image: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=600&q=80',
      compatibility: ['به‌پرداخت', 'سامان کیش', 'زرین‌پال VIP', 'سداد'],
    },
  ];

  const addToCart = (prod: any) => {
    const existing = cartItems.find(i => i.id === prod.id);
    if (existing) {
      setCartItems(cartItems.map(i => i.id === prod.id ? { ...i, count: i.count + 1 } : i));
    } else {
      setCartItems([...cartItems, { id: prod.id, title: prod.title, price: prod.price, count: 1, image: prod.image }]);
    }
    setIsMiniCartOpen(true);
  };

  const totalCart = cartItems.reduce((acc, i) => acc + i.price * i.count, 0);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-[#0B0F19] text-[#F3F4F6] min-h-screen font-sans selection:bg-[#10B981] selection:text-white" dir="rtl">
      {/* Store Header Banner */}
      <section className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border-b border-[#334155] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-bold mb-3">
              <span>🛍️</span> سازگار ۱۰۰٪ با WooCommerce + WoodMart + JetWooBuilder + ShopEngine
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              ویترین فروشگاه منعطف و محصولات ووکامرس
            </h1>
            <p className="text-sm text-[#9CA3AF] mt-2 max-w-2xl">
              هماهنگی کامل پالت‌های رنگی، مینی‌کارت کشویی ایجکس، تسویه حساب تک‌مرحله‌ای شاپرک و هاور افکت‌های اصیل وودمارت.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMiniCartOpen(true)}
              className="relative px-5 py-3 rounded-xl bg-[#10B981] text-white font-bold text-sm shadow-lg shadow-[#10B981]/30 hover:bg-[#059669] transition flex items-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>سبد خرید کشویی ({cartItems.reduce((a, b) => a + b.count, 0)})</span>
              {cartItems.length > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 absolute top-2 left-2 animate-ping" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Compatibility Badges Bar */}
      <div className="bg-[#111827] border-b border-[#1F2937] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <strong className="text-white">قالب وودمارت:</strong> همگام‌سازی استایل و مینی‌کارت
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            <strong className="text-white">جت وو بیلدر:</strong> ویجت‌های المنتوری محصول و آرشیو
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <strong className="text-white">شاپ انجین:</strong> تسویه حساب و فیلترهای ایجکس
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
            <strong className="text-white">شاپرک:</strong> اتصال بدون واسطه به درگاه‌های بانکی
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'همه محصولات' },
              { id: 'theme', label: 'قالب‌های فروشگاهی' },
              { id: 'addon', label: 'افزونه‌ها و ویجت‌ها' },
              { id: 'service', label: 'خدمات طراحی اختصاصی' },
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#10B981] text-white shadow'
                    : 'bg-[#1E293B] text-[#9CA3AF] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-[#6B7280]">
            نمایش {filteredProducts.length} محصول منطبق با استاندارد WoodMart
          </div>
        </div>

        {/* Product Grid (WoodMart style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map(prod => (
            <div
              key={prod.id}
              className="rounded-2xl bg-[#131B2E] border border-[#1E293B] overflow-hidden hover:border-[#10B981]/60 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-[#1E293B]">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <span
                    className="absolute top-3 right-3 px-2.5 py-0.5 rounded-md text-[11px] font-bold text-white shadow"
                    style={{ backgroundColor: prod.badgeColor }}
                  >
                    {prod.badge}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-[#9CA3AF] mb-2">
                    <span className="flex items-center gap-1 text-[#F59E0B]">
                      <Star className="w-3.5 h-3.5 fill-[#F59E0B]" /> {prod.rating}
                    </span>
                    <span>{prod.salesCount} فروش موفق</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-[#10B981] transition-colors">
                    {prod.title}
                  </h3>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {prod.compatibility.slice(0, 2).map((c, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-[#1E293B] text-[#9CA3AF] border border-[#334155]/60">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="border-t border-[#1E293B] pt-4 flex items-center justify-between mb-4">
                  <div>
                    {prod.oldPrice && (
                      <div className="text-[11px] text-[#6B7280] line-through font-mono">
                        {prod.oldPrice.toLocaleString()} ت
                      </div>
                    )}
                    <div className="text-base font-black text-white font-mono">
                      {prod.price.toLocaleString()} <span className="text-xs font-normal text-[#9CA3AF]">تومان</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(prod)}
                  className="w-full py-2.5 rounded-xl bg-[#1E293B] hover:bg-[#10B981] hover:text-white text-[#CBD5E1] text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer border border-[#334155] hover:border-transparent"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>افزودن به سبد خرید</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Checkout Single Step Box (شورت‌کد [uas_quick_checkout_box]) */}
        <div className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#334155] p-8 shadow-2xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">تسویه حساب تک‌مرحله‌ای شاپرک (Quick Checkout)</h3>
              <p className="text-xs text-[#9CA3AF]">پرداخت مستقیم و بدون معطلی برای فاکتورها و پیش‌پرداخت پروژه‌ها</p>
            </div>
          </div>

          {quickSuccess ? (
            <div className="p-6 rounded-2xl bg-[#10B981]/15 border border-[#10B981]/40 text-center">
              <Check className="w-8 h-8 text-[#10B981] mx-auto mb-2" />
              <div className="text-sm font-bold text-white mb-1">انتقال شبیه‌سازی‌شده به درگاه پرداخت شاپرک</div>
              <div className="text-xs text-[#9CA3AF]">فاکتور با موفقیت در جدول تراکنش‌های Ledger ثبت گردید.</div>
              <button
                type="button"
                onClick={() => setQuickSuccess(false)}
                className="mt-4 px-4 py-1.5 rounded-lg bg-[#1E293B] text-xs text-white"
              >
                پرداخت جدید
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#9CA3AF] mb-1 font-medium">مبلغ قابل پرداخت (تومان):</label>
                <input
                  type="number"
                  value={quickCheckoutAmount}
                  onChange={e => setQuickCheckoutAmount(e.target.value)}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl p-3 text-sm text-white font-mono focus:outline-none focus:border-[#10B981]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#9CA3AF] mb-1 font-medium">شماره تلفن همراه (جهت دریافت پیامک تایید):</label>
                <input
                  type="tel"
                  placeholder="۰۹۱۲..."
                  value={quickPhone}
                  onChange={e => setQuickPhone(e.target.value)}
                  className="w-full bg-[#111827] border border-[#374151] rounded-xl p-3 text-sm text-white font-mono focus:outline-none focus:border-[#10B981]"
                />
              </div>

              <button
                type="button"
                onClick={() => setQuickSuccess(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-bold text-sm shadow-lg shadow-[#10B981]/30 hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>اتصال به درگاه امن شاپرک و پرداخت آنلاین</span>
                <Zap className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slide-out Mini Cart Drawer */}
      {isMiniCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMiniCartOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
            <div className="w-screen max-w-md bg-[#0F172A] border-r border-[#1E293B] shadow-2xl flex flex-col justify-between">
              <div>
                <div className="p-6 border-b border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-base text-white">
                    <ShoppingBag className="w-5 h-5 text-[#10B981]" />
                    <span>سبد خرید شما (WoodMart Mini-Cart)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMiniCartOpen(false)}
                    className="p-1 rounded-lg text-[#9CA3AF] hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12 text-[#9CA3AF] text-sm">
                      سبد خرید شما خالی است.
                    </div>
                  ) : (
                    cartItems.map(item => (
                      <div key={item.id} className="p-4 rounded-xl bg-[#1E293B]/60 border border-[#334155] flex items-center justify-between gap-3">
                        <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                          <div className="text-xs text-[#10B981] font-mono mt-1">
                            {item.price.toLocaleString()} تومان
                          </div>
                          <div className="text-[11px] text-[#9CA3AF] mt-0.5">تعداد: {item.count}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCartItems(cartItems.filter(i => i.id !== item.id))}
                          className="text-red-400 text-xs hover:underline cursor-pointer"
                        >
                          حذف
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="p-6 border-t border-[#1E293B] bg-[#111827]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[#9CA3AF]">مجموع سبد خرید:</span>
                  <span className="text-lg font-black text-white font-mono">
                    {totalCart.toLocaleString()} تومان
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('انتقال به برگه تسویه‌حساب ووکامرس (Checkout)')}
                  className="w-full py-3.5 rounded-xl bg-[#10B981] text-white font-bold text-sm shadow-lg shadow-[#10B981]/30 hover:bg-[#059669] transition cursor-pointer"
                >
                  تکمیل سفارش و تسویه حساب نهایی
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
