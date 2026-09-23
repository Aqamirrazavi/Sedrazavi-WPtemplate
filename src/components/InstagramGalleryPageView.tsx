import React, { useState } from 'react';
import {
  Instagram,
  Heart,
  MessageCircle,
  ExternalLink,
  ChevronLeft,
  X,
  Filter,
  Sparkles,
  Calendar,
  Share2,
  ChevronRight
} from 'lucide-react';
import { useDesignTokens } from '../context/DesignTokensContext';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  category: 'educational' | 'legal' | 'office' | 'events';
  likesCount: number;
  commentsCount: number;
  date: string;
  link: string;
}

const INSTAGRAM_POSTS_DATA: InstagramPost[] = [
  {
    id: 'ig-1',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    caption: 'نکات کلیدی در انعقاد قراردادهای تجاری و داوری بین‌المللی؛ چگونه از ریسک‌های مالی نوسانات ارزی در قراردادهای بین‌المللی جلوگیری کنیم؟',
    category: 'legal',
    likesCount: 542,
    commentsCount: 38,
    date: '۱۴۰۳/۰۶/۲۸',
    link: 'https://instagram.com/sedrazavi',
  },
  {
    id: 'ig-2',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    caption: 'برگزاری کارگاه تحلیل آراء وحدت رویه دیوان عالی کشور در زمینه دعاوی ملکی و ثبتی با حضور کارآموزان وکالت کانون مرکز.',
    category: 'events',
    likesCount: 689,
    commentsCount: 45,
    date: '۱۴۰۳/۰۶/۲۴',
    link: 'https://instagram.com/sedrazavi',
  },
  {
    id: 'ig-3',
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
    caption: 'پاسخ به سوالات حقوقی موکلین: آیا اموال ثبت‌شده به نام همسر قابل توقیف در پرونده‌های مهریه است؟ نکات استثنائات دین.',
    category: 'educational',
    likesCount: 1120,
    commentsCount: 92,
    date: '۱۴۰۳/۰۶/۲۰',
    link: 'https://instagram.com/sedrazavi',
  },
  {
    id: 'ig-4',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    caption: 'جلسه هم‌اندیشی با همکاران و وکلای دپارتمان تخصصی حقوق شرکت‌های دانش‌بنیان در برج حقوقی دادمان.',
    category: 'office',
    likesCount: 430,
    commentsCount: 22,
    date: '۱۴۰۳/۰۶/۱۵',
    link: 'https://instagram.com/sedrazavi',
  },
  {
    id: 'ig-5',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    caption: 'بررسی راهکارهای حقوقی و کیفری در مقابله با کلاهبرداری‌های سایبری و خالی‌کردن حساب‌های بانکی با فیشینگ.',
    category: 'educational',
    likesCount: 890,
    commentsCount: 64,
    date: '۱۴۰۳/۰۶/۱۰',
    link: 'https://instagram.com/sedrazavi',
  },
  {
    id: 'ig-6',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    caption: 'شرکت در بیست و دومین همایش داوری بین‌المللی بازرگانی و سخنرانی در باب داوری آنلاین (ODR) در حقوق تجارت ایران.',
    category: 'events',
    likesCount: 760,
    commentsCount: 31,
    date: '۱۴۰۳/۰۶/۰۲',
    link: 'https://instagram.com/sedrazavi',
  },
];

interface InstagramGalleryPageViewProps {
  onBackToHome: () => void;
  onBookConsultation: () => void;
}

export const InstagramGalleryPageView: React.FC<InstagramGalleryPageViewProps> = ({
  onBackToHome,
  onBookConsultation,
}) => {
  const { tokens } = useDesignTokens();
  const lawyerName = tokens['lawyer.name']?.value || 'دکتر سیده مریم رضوی';
  const brandName = tokens['brand.name']?.value || 'SedRazavi';
  const instagramUrl = tokens['social.instagram']?.value || 'https://instagram.com/sedrazavi';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  const categories = [
    { id: 'all', label: 'همه پست‌ها' },
    { id: 'educational', label: 'آموزش‌های حقوقی' },
    { id: 'legal', label: 'تحلیل آراء و پرونده‌ها' },
    { id: 'office', label: 'محیط دفتر و همکاران' },
    { id: 'events', label: 'رویدادها و کنفرانس‌ها' },
  ];

  const filteredPosts =
    activeCategory === 'all'
      ? INSTAGRAM_POSTS_DATA
      : INSTAGRAM_POSTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="py-12 sm:py-16 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen text-[#0B132B] dark:text-gray-100 font-persian">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        {/* ========================================================= */}
        {/* بخش ۱: هدر گالری و دکمه فالو */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <button
                onClick={onBackToHome}
                className="hover:text-[#D4AF37] transition-colors"
              >
                صفحه اصلی
              </button>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="text-[#D4AF37] font-bold">
                گالری اینستاگرام و رسانه وکیل
              </span>
            </div>

            <button
              onClick={onBackToHome}
              className="px-3.5 py-1.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#D4AF37] hover:text-[#0B132B] text-xs font-bold transition-all"
            >
              &larr; بازگشت به صفحه اصلی
            </button>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] border border-[#D4AF37]/30 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-3 text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/40 text-xs font-bold">
                <Instagram className="w-4 h-4" />
                <span>صفحه رسمی اینستاگرام {brandName}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
                گالری آموزش‌های حقوقی و رویدادهای {lawyerName}
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed">
                آخرین ویدئوها، موشن‌گرافی‌های حقوقی، تحلیل پرونده‌های قضایی و گزارش سمینارهای علمی را به صورت تصویری دنبال نمایید.
              </p>
            </div>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 hover:opacity-90 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 transition-all shrink-0 self-start md:self-auto"
            >
              <Instagram className="w-5 h-5" />
              <span>دنبال کردن در اینستاگرام (Follow)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* ========================================================= */}
        {/* بخش ۲: فیلتر دسته‌بندی موضوعی */}
        {/* ========================================================= */}
        <section className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200 dark:border-gray-800">
          <Filter className="w-4 h-4 text-[#D4AF37] shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-[#D4AF37] text-[#0B132B] shadow-md'
                  : 'bg-white dark:bg-[#0B132B] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:text-[#D4AF37]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </section>

        {/* ========================================================= */}
        {/* بخش ۳: گرید پست‌های اینستاگرام با Overlay و تعامل */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group relative rounded-2xl overflow-hidden bg-gray-900 border border-gray-200 dark:border-gray-800 aspect-square shadow-lg cursor-pointer transition-all hover:scale-[1.02] hover:shadow-2xl hover:border-[#D4AF37]/60"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover object-center group-hover:opacity-75 transition-all duration-300"
              />

              {/* Hover Overlay with Likes & Comments */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-right">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <Instagram className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] text-gray-300 font-mono bg-black/60 px-2 py-0.5 rounded-full">
                    {post.date}
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-white line-clamp-3 leading-relaxed drop-shadow">
                    {post.caption}
                  </p>

                  <div className="flex items-center gap-4 text-xs font-bold text-white pt-2 border-t border-white/20">
                    <span className="flex items-center gap-1 text-pink-400">
                      <Heart className="w-4 h-4 fill-pink-400" />
                      <span>{post.likesCount}</span>
                    </span>
                    <span className="flex items-center gap-1 text-sky-400">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.commentsCount}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ========================================================= */}
        {/* بخش ۴: لایت‌باکس بزرگ نمایش تصویر و کپشن (Lightbox Modal) */}
        {/* ========================================================= */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="relative max-w-4xl w-full bg-white dark:bg-[#0B132B] rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-rose-600 transition-colors"
                title="بستن"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image side */}
              <div className="md:w-1/2 bg-black flex items-center justify-center aspect-square md:aspect-auto">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.caption}
                  className="w-full h-full object-cover max-h-[500px]"
                />
              </div>

              {/* Details side */}
              <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 text-right overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-amber-500 p-0.5">
                      <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-[#D4AF37]">
                        <Instagram className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white font-serif">
                        {lawyerName}
                      </h4>
                      <p className="text-[11px] text-gray-400">{selectedPost.date}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedPost.caption}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-6 text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-pink-500">
                      <Heart className="w-4 h-4 fill-pink-500" />
                      <span>{selectedPost.likesCount} پسند</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-sky-500">
                      <MessageCircle className="w-4 h-4" />
                      <span>{selectedPost.commentsCount} نظر</span>
                    </span>
                  </div>

                  <a
                    href={selectedPost.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl btn-gold text-xs font-bold flex items-center justify-center gap-2 shadow"
                  >
                    <span>مشاهده و ارسال نظر در اینستاگرام</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* بخش ۵: دعوت به اقدام پایانی (CTA) */}
        {/* ========================================================= */}
        <section className="p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-xl text-center space-y-4">
          <h3 className="text-lg font-bold font-serif text-gray-900 dark:text-white">
            همراه ما در شبکه‌های اجتماعی باشید
          </h3>
          <p className="text-xs text-gray-500 max-w-lg mx-auto leading-relaxed">
            با عضویت در صفحات مجازی موسسه، از جدیدترین اخبار حقوقی، تغییرات قوانین و جلسات لایو پرسش و پاسخ بهره‌مند شوید.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all border border-pink-500/30"
            >
              <Instagram className="w-4 h-4" />
              <span>اینستاگرام</span>
            </a>
            <button
              onClick={onBookConsultation}
              className="px-5 py-2.5 rounded-xl btn-gold text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>رزرو نوبت مشاوره حضوری</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
