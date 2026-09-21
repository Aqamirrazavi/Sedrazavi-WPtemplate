import React, { useState } from 'react';
import { ARTICLES_DATA, SERVICES_DATA, VIDEOS_DATA } from '../../data/mockData';
import {
  FileText,
  Video,
  Shield,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Tag,
  Share2,
  X,
  Save,
  Check,
} from 'lucide-react';

export const AdminContentTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'posts' | 'services' | 'videos'>('posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [articles, setArticles] = useState(ARTICLES_DATA);
  const [services, setServices] = useState(SERVICES_DATA);
  const [videos, setVideos] = useState(VIDEOS_DATA);

  // Modal for new content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('حقوق تجاری و شرکت‌ها');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Calculations
  const totalArticles = articles.length;
  const totalServices = services.length;
  const totalVideos = videos.length;
  const totalViews = articles.reduce((acc, curr) => acc + (curr.viewsCount || 340), 0);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (activeSubTab === 'posts') {
      const newItem = {
        id: `post-${Date.now()}`,
        title: newTitle,
        category: newCategory,
        excerpt: newExcerpt || 'چکیده یادداشت حقوقی جدید توسط دفتر وکالت...',
        date: 'امروز',
        readingTime: '۵ دقیقه',
        viewsCount: 1,
        author: 'دکتر سیده مریم رضوی',
        featuredImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
        content: 'متن کامل یادداشت تخصصی با استانداردهای تنقیح قضایی و دادرسی منصفانه.',
      };
      setArticles([newItem, ...articles]);
    } else if (activeSubTab === 'services') {
      const newServiceItem = {
        id: `srv-${Date.now()}`,
        title: newTitle,
        shortDesc: newExcerpt || 'مشاوره و وکالت تخصصی در این حوزه حقوقی.',
        detailedDesc: 'شرح مبسوط فرآیند دفاع، ارائه دادخواست و پیگیری در محاکم دادگستری.',
        icon: 'Shield',
        estimatedDuration: '۲ الی ۴ ماه',
        requiredDocs: ['اسناد هویتی ثنا', 'قرارداد اولیه', 'ادله و مدارک اثباتی'],
      };
      setServices([newServiceItem, ...services]);
    } else {
      const newVideoItem = {
        id: `vid-${Date.now()}`,
        title: newTitle,
        duration: '۱۲:۳۰',
        category: newCategory,
        views: '۱',
        date: 'امروز',
        thumbnailUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: newExcerpt || 'ویدیوی تحلیلی و آموزشی در حوزه دعاوی حقوقی.',
      };
      setVideos([newVideoItem, ...videos]);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsModalOpen(false);
      setNewTitle('');
      setNewExcerpt('');
    }, 1200);
  };

  const handleDeletePost = (id: string) => {
    if (confirm('آیا از حذف این آیتم از سامانه اطمینان دارید؟')) {
      if (activeSubTab === 'posts') setArticles(articles.filter((a) => a.id !== id));
      else if (activeSubTab === 'services') setServices(services.filter((s) => s.id !== id));
      else setVideos(videos.filter((v) => v.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">یادداشت‌های حقوقی</span>
            <span className="text-2xl font-black text-[#0B132B] dark:text-white font-mono mt-1 block">
              {totalArticles}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">حوزه‌های تخصصی وکالت</span>
            <span className="text-2xl font-black text-[#0B132B] dark:text-white font-mono mt-1 block">
              {totalServices}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">ویدیوهای آموزشی</span>
            <span className="text-2xl font-black text-[#0B132B] dark:text-white font-mono mt-1 block">
              {totalVideos}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Video className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">مجموع بازدید موکلین</span>
            <span className="text-2xl font-black text-[#D4AF37] font-mono mt-1 block">
              {totalViews.toLocaleString('fa-IR')}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Subtabs Navigation & Search/Action Bar */}
      <div className="bg-white dark:bg-[#0B132B] rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('posts')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'posts'
                  ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>مقالات و یادداشت‌ها ({articles.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('services')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'services'
                  ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>حوزه‌های خدمات وکالت ({services.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('videos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'videos'
                  ? 'bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>ویدیوهای حقوقی ({videos.length})</span>
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-gold text-xs px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>
              {activeSubTab === 'posts' && 'نگارش یادداشت جدید'}
              {activeSubTab === 'services' && 'افزودن حوزه وکالت'}
              {activeSubTab === 'videos' && 'آپلود ویدیوی جدید'}
            </span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجو در عنوان‌ها، کلمات کلیدی، متن و تگ‌ها..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2.5 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="همه">همه دسته‌بندی‌ها</option>
              <option value="تجاری">حقوق تجاری و شرکت‌ها</option>
              <option value="کیفری">دعاوی کیفری و اقتصادی</option>
              <option value="ملکی">املاک، اراضی و سرقفلی</option>
              <option value="خانواده">خانواده و طلاق توافقی</option>
              <option value="داوری">داوری و تجارت بین‌الملل</option>
            </select>
          </div>
        </div>

        {/* 3. Items Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-right text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="py-3 px-4 font-bold">عنوان محتوا</th>
                <th className="py-3 px-4 font-bold">دسته‌بندی</th>
                <th className="py-3 px-4 font-bold">وضعیت انتشار</th>
                <th className="py-3 px-4 font-bold">تاریخ / مدت</th>
                <th className="py-3 px-4 font-bold text-center">عملیات مدیریت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {activeSubTab === 'posts' &&
                articles
                  .filter((a) => a.title.includes(searchTerm) || a.category.includes(searchTerm))
                  .map((article) => (
                    <tr key={article.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span className="line-clamp-1">{article.title}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] font-bold">
                          {article.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3" />
                          منتشر شده در فرانت‌اند
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">{article.date}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => alert(`پیش‌نمایش مقاله: ${article.title}`)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-500/10"
                            title="مشاهده"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => alert(`ویرایش مقاله: ${article.title}`)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#D4AF37] hover:bg-amber-500/10"
                            title="ویرایش"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(article.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

              {activeSubTab === 'services' &&
                services
                  .filter((s) => s.title.includes(searchTerm))
                  .map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{service.title}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                          وکالت تخصصی
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3" />
                          فعال در فرم رزرو
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">{service.estimatedDuration}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => alert(`مشاهده خدمت: ${service.title}`)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-500 hover:bg-emerald-500/10"
                            title="مشاهده"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => alert(`ویرایش خدمت: ${service.title}`)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#D4AF37] hover:bg-amber-500/10"
                            title="ویرایش"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(service.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

              {activeSubTab === 'videos' &&
                videos
                  .filter((v) => v.title.includes(searchTerm))
                  .map((video) => (
                    <tr key={video.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <Video className="w-4 h-4 text-purple-500 shrink-0" />
                        <span className="line-clamp-1">{video.title}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[11px] font-bold">
                          {video.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3" />
                          پخش آنلاین فعال
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">{video.duration} دقیقه</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => alert(`پخش ویدیو: ${video.title}`)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-purple-500 hover:bg-purple-500/10"
                            title="مشاهده"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => alert(`ویرایش ویدیو: ${video.title}`)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-[#D4AF37] hover:bg-amber-500/10"
                            title="ویرایش"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePost(video.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Modal for adding new item */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0B132B] rounded-2xl max-w-lg w-full p-6 border border-gray-200 dark:border-gray-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white font-serif">
                {activeSubTab === 'posts' && 'نگارش و انتشار مقاله جدید'}
                {activeSubTab === 'services' && 'تعریف حوزه تخصصی وکالت'}
                {activeSubTab === 'videos' && 'آپلود ویدیوی آموزشی حقوقی'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  عنوان اصلی:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="مثال: نکات کلیدی در تنظیم قراردادهای تجاری و داوری بین‌المللی"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  دسته‌بندی موضوعی:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="حقوق تجاری و شرکت‌ها">حقوق تجاری و شرکت‌ها</option>
                  <option value="دعاوی کیفری و اقتصادی">دعاوی کیفری و اقتصادی</option>
                  <option value="اراضی، سرقفلی و شهرداری">اراضی، سرقفلی و شهرداری</option>
                  <option value="داوری و تجارت بین‌الملل">داوری و تجارت بین‌الملل</option>
                  <option value="حقوق مالکیت فکری">حقوق مالکیت فکری و فناوری</option>
                  <option value="حقوق خانواده و طلاق">حقوق خانواده و طلاق توافقی</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  چکیده و خلاصه اجرایی:
                </label>
                <textarea
                  rows={3}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="خلاصه مختصری از مطالب جهت نمایش در کارت‌های صفحه نخست و اسلایدرها..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>با موفقیت منتشر شد!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>انتشار در سایت</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
