import React, { useState, useMemo } from 'react';
import { ArticleItem, VideoItem, ServiceItem } from '../types/theme';
import { ARTICLES_DATA, VIDEOS_DATA, SERVICES_DATA } from '../data/mockData';
import {
  BookOpen,
  Video,
  Scale,
  Search,
  Grid,
  List,
  ArrowUpDown,
  Filter,
  Eye,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
  Play,
  RotateCcw,
  SlidersHorizontal,
  FolderOpen,
} from 'lucide-react';

export type ArchiveType = 'articles' | 'videos' | 'services';

interface ArchiveViewProps {
  initialType?: ArchiveType;
  onSelectArticle?: (articleId: string) => void;
  onSelectVideo?: (videoId: string) => void;
  onSelectService?: (serviceSlug: string) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  initialType = 'articles',
  onSelectArticle,
  onSelectVideo,
  onSelectService,
}) => {
  const [archiveType, setArchiveType] = useState<ArchiveType>(initialType);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'most_viewed' | 'title'>('newest');
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  // Extract categories dynamically
  const categories = useMemo(() => {
    if (archiveType === 'articles') {
      const cats = Array.from(new Set(ARTICLES_DATA.map((a) => a.category)));
      return ['all', ...cats];
    } else if (archiveType === 'videos') {
      const cats = Array.from(new Set(VIDEOS_DATA.map((v) => v.category)));
      return ['all', ...cats];
    } else {
      return ['all', 'دعاوی مالی و تجاری', 'دعاوی غیرمالی و خانواده'];
    }
  }, [archiveType]);

  // Filter & Sort Articles
  const filteredArticles = useMemo(() => {
    let result = [...ARTICLES_DATA];

    if (selectedCategory !== 'all') {
      result = result.filter((a) => a.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'newest') {
      result.reverse(); // assuming latest are at end or sorted
    } else if (sortBy === 'most_viewed') {
      result.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title, 'fa'));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Filter & Sort Videos
  const filteredVideos = useMemo(() => {
    let result = [...VIDEOS_DATA];

    if (selectedCategory !== 'all') {
      result = result.filter((v) => v.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.summary.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'most_viewed') {
      result.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title, 'fa'));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Filter Services
  const filteredServices = useMemo(() => {
    let result = [...SERVICES_DATA];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.summary.toLowerCase().includes(q)
      );
    }
    return result;
  }, [searchQuery]);

  // Current active items
  const currentTotalItems =
    archiveType === 'articles'
      ? filteredArticles.length
      : archiveType === 'videos'
      ? filteredVideos.length
      : filteredServices.length;

  const totalPages = Math.ceil(currentTotalItems / itemsPerPage) || 1;

  // Paginated Slices
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const paginatedVideos = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVideos.slice(start, start + itemsPerPage);
  }, [filteredVideos, currentPage]);

  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(start, start + itemsPerPage);
  }, [filteredServices, currentPage]);

  const handleTypeChange = (type: ArchiveType) => {
    setArchiveType(type);
    setSelectedCategory('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('newest');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8 text-right" id="wordpress-archive-template">
      
      {/* Hero / Header Section of Archive */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] p-6 sm:p-10 text-white shadow-xl border border-[#D4AF37]/30">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold mb-3">
            <FolderOpen className="w-3.5 h-3.5" />
            <span>
              {archiveType === 'articles'
                ? 'قالب وردپرس: archive.php'
                : archiveType === 'videos'
                ? 'قالب وردپرس: archive-video.php'
                : 'قالب وردپرس: archive-service.php'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-serif leading-tight mb-3">
            {archiveType === 'articles' && 'مرکز مقالات و تحلیل‌های حقوقی'}
            {archiveType === 'videos' && 'آرشیو وبینارها و ویدیوهای آموزشی'}
            {archiveType === 'services' && 'فهرست خدمات و دپارتمان‌های وکالت'}
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            {archiveType === 'articles' &&
              'مجموعه یادداشت‌های تخصصی، تفسیر قوانین جاری و راهنماهای گام‌به‌گام برای حل پرونده‌های حقوقی، کیفری و تجاری.'}
            {archiveType === 'videos' &&
              'کارگاه‌های ویدیویی و وبینارهای تحلیلی با تدریس دکتر سیده مریم رضوی جهت آموزش حقوق کاربردی به مدیران و عموم شهروندان.'}
            {archiveType === 'services' &&
              'مشاهده تمام حوزه‌های قبول وکالت، مشاوره تخصصی و تدوین قراردادهای تجاری در کانون وکلای دادگستری مرکز.'}
          </p>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute left-6 bottom-4 opacity-10 pointer-events-none hidden sm:block">
          <Scale className="w-48 h-48 text-[#D4AF37]" />
        </div>
      </div>

      {/* Archive Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Post Type Buttons */}
        <div className="flex items-center p-1.5 rounded-2xl bg-gray-100 dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm">
          <button
            onClick={() => handleTypeChange('articles')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              archiveType === 'articles'
                ? 'bg-white dark:bg-gray-800 text-[#0B132B] dark:text-white shadow-sm border border-gray-200 dark:border-gray-700'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <span>مقالات و یادداشت‌ها ({ARTICLES_DATA.length})</span>
          </button>

          <button
            onClick={() => handleTypeChange('videos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              archiveType === 'videos'
                ? 'bg-white dark:bg-gray-800 text-[#0B132B] dark:text-white shadow-sm border border-gray-200 dark:border-gray-700'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Video className="w-4 h-4 text-[#2A9D8F]" />
            <span>وبینارها و ویدیوها ({VIDEOS_DATA.length})</span>
          </button>

          <button
            onClick={() => handleTypeChange('services')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              archiveType === 'services'
                ? 'bg-white dark:bg-gray-800 text-[#0B132B] dark:text-white shadow-sm border border-gray-200 dark:border-gray-700'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B] dark:hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4 text-[#E76F51]" />
            <span>خدمات وکالت ({SERVICES_DATA.length})</span>
          </button>
        </div>

        {/* View Toggle (Grid / List) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-gray-100 dark:bg-[#0B132B] rounded-xl border border-gray-200 dark:border-gray-800">
            <button
              onClick={() => setViewLayout('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewLayout === 'grid'
                  ? 'bg-white dark:bg-gray-800 text-[#D4AF37] shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="نمایش شبکه‌ای"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewLayout('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewLayout === 'list'
                  ? 'bg-white dark:bg-gray-800 text-[#D4AF37] shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="نمایش فهرستی"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Filter & Sorting Controls Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search Bar (5 cols) */}
          <div className="md:col-span-5 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="جستجو در متن، عنوان یا برچسب‌ها..."
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-3 text-xs text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown (4 cols) */}
          <div className="md:col-span-4 flex items-center gap-2">
            <span className="text-xs text-gray-500 whitespace-nowrap flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>مرتب‌سازی:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
            >
              <option value="newest">جدیدترین انتشار</option>
              <option value="most_viewed">پربازدیدترین‌ها</option>
              <option value="title">الفبایی (الف تا ی)</option>
            </select>
          </div>

          {/* Results Counter & Reset (3 cols) */}
          <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-3">
            <span className="text-xs text-gray-500">
              نمایش <b className="text-[#0B132B] dark:text-white font-bold">{currentTotalItems}</b> مورد
            </span>
            {(selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={clearFilters}
                className="px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-xs text-gray-600 dark:text-gray-300 font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>حذف فیلترها</span>
              </button>
            )}
          </div>

        </div>

        {/* Category Pills (if not services) */}
        {categories.length > 1 && (
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <span className="text-xs text-gray-400 whitespace-nowrap flex items-center gap-1 pl-2">
              <Tag className="w-3 h-3 text-[#D4AF37]" />
              <span>دسته‌بندی:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-[#0B132B] shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? 'همه دسته‌ها' : cat}
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Main Archive Content Grid/List */}
      {currentTotalItems === 0 ? (
        /* Empty State */
        <div className="p-12 text-center bg-white dark:bg-[#0B132B] rounded-3xl border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-200">
            مطلبی مطابق با عبارت «{searchQuery}» یافت نشد.
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            پیشنهاد می‌کنیم املای کلمات را بررسی کنید، فیلتر دسته‌بندی را روی «همه» بگذارید، یا از واژه‌های کلی‌تری مانند «چک»، «ملک» یا «قرارداد» استفاده فرمایید.
          </p>
          <button
            onClick={clearFilters}
            className="btn-gold text-xs px-5 py-2.5 rounded-xl font-bold inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>پاک کردن فیلترها و مشاهده همه موارد</span>
          </button>
        </div>
      ) : archiveType === 'articles' ? (
        /* ================= ARTICLES ARCHIVE (archive.php) ================= */
        <div
          className={
            viewLayout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-4'
          }
        >
          {paginatedArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle?.(article.id)}
              className={`group bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D4AF37]/50 transition-all cursor-pointer ${
                viewLayout === 'list' ? 'flex flex-col sm:flex-row items-stretch' : ''
              }`}
            >
              {/* Thumbnail */}
              <div
                className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${
                  viewLayout === 'list'
                    ? 'w-full sm:w-56 h-48 sm:h-auto shrink-0'
                    : 'h-48'
                }`}
              >
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0B132B]/80 backdrop-blur-sm text-white text-[10px] font-bold">
                  {article.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#D4AF37]" />
                      <span>{article.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors leading-relaxed line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{article.views.toLocaleString('fa-IR')} بازدید</span>
                  </div>

                  <span className="text-[#D4AF37] font-bold group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                    <span>مطالعه متن کامل</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : archiveType === 'videos' ? (
        /* ================= VIDEOS ARCHIVE (archive-video.php) ================= */
        <div
          className={
            viewLayout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
              : 'space-y-4'
          }
        >
          {paginatedVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo?.(video.id)}
              className={`group bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#2A9D8F]/50 transition-all cursor-pointer ${
                viewLayout === 'list' ? 'flex flex-col sm:flex-row items-stretch' : ''
              }`}
            >
              {/* Video Thumbnail with Play Overlay */}
              <div
                className={`relative overflow-hidden bg-black ${
                  viewLayout === 'list'
                    ? 'w-full sm:w-64 h-48 sm:h-auto shrink-0'
                    : 'h-48'
                }`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#0B132B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-[#0B132B] ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white font-mono text-[10px] font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#D4AF37]" />
                  <span>{video.duration}</span>
                </span>

                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#0B132B]/80 text-[#D4AF37] text-[10px] font-bold">
                  {video.category}
                </span>
              </div>

              {/* Video Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-1.5">
                    <span>مدرس: {video.presenter}</span>
                    <span>•</span>
                    <span>{video.date}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#2A9D8F] transition-colors leading-relaxed line-clamp-2">
                    {video.title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-2 leading-relaxed">
                    {video.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                    <Eye className="w-3.5 h-3.5 text-[#2A9D8F]" />
                    <span>{video.views.toLocaleString('fa-IR')} تماشا</span>
                  </div>

                  <span className="text-[#2A9D8F] font-bold group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                    <span>تماشای وبینار کامل</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ================= SERVICES ARCHIVE (archive-service.php) ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService?.(service.slug)}
              className="p-6 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all cursor-pointer space-y-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {service.iconEmoji}
              </div>

              <div>
                <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 mt-2 leading-relaxed">
                  {service.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="text-gray-400">{service.caseTypes.length} موضوع دادرسی</span>
                <span className="text-[#D4AF37] font-bold flex items-center gap-1">
                  <span>جزئیات خدمت</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="p-4 bg-white dark:bg-[#0B132B] rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1"
          >
            <ChevronRight className="w-4 h-4" />
            <span>برگه قبلی</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                    currentPage === pageNum
                      ? 'bg-[#D4AF37] text-[#0B132B] shadow'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {pageNum.toLocaleString('fa-IR')}
                </button>
              );
            })}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1"
          >
            <span>برگه بعدی</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
