import React, { useState } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Download,
  Share2,
  Clock,
  Eye,
  Calendar,
  Search,
  Filter,
  Check,
  Film,
  BookOpen,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  category: 'tutorial' | 'webinar' | 'analysis' | 'service';
  categoryLabel: string;
  duration: string;
  views: number;
  date: string;
  speaker: string;
  speakerRole: string;
  videoUrl: string;
  thumbnail: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentSize?: string;
}

const SAMPLE_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'تحلیل استراتژیک دعاوی ملکی و ابطال سند رسمی در رویه قضایی',
    description: 'بررسی پرونده‌های پیچیده الزام به تنظیم سند، نحوه اعتراض به آرای مراجع ثبتی و استراتژی‌های دفاعی موثر در محاکم تجدیدنظر.',
    category: 'analysis',
    categoryLabel: 'تحلیل پرونده‌های حقوقی',
    duration: '۳۲:۱۵',
    views: 3420,
    date: '۲۲ اسفند ۱۴۰۲',
    speaker: 'دکتر سیده مریم رضوی',
    speakerRole: 'وکیل پایه یک دادگستری و پژوهشگر ارشد',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    hasAttachment: true,
    attachmentName: 'خلاصه_لایحه_دفاعی_دعاوی_ملکی.pdf',
    attachmentSize: '۲.۴ مگابایت',
  },
  {
    id: 'vid-2',
    title: 'طراحی سایت فوق‌سریع با هسته گوتنبرگ بدون وابستگی به افزونه‌های سنگین',
    description: 'آموزش گام‌به‌گام پیاده‌سازی بلوک‌های بومی گوتنبرگ، بهینه‌سازی شاخص‌های Core Web Vitals و لود سریع زیر ۱.۵ ثانیه.',
    category: 'tutorial',
    categoryLabel: 'آموزش توسعه وب',
    duration: '۴۵:۰۰',
    views: 5180,
    date: '۱۵ اسفند ۱۴۰۲',
    speaker: 'مهندس امیرحسین رضوی',
    speakerRole: 'معمار نرم‌افزار و مشاور وردپرس سازمانی',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    hasAttachment: true,
    attachmentName: 'کدهای_آماده_بلوک_گوتنبرگ.zip',
    attachmentSize: '۴.۸ مگابایت',
  },
  {
    id: 'vid-3',
    title: 'وبینار تخصصی داوری تجاری بین‌المللی و حل‌وفصل اختلافات قراردادهای EPC',
    description: 'تحلیل مقررات اتاق بازرگانی بین‌المللی (ICC)، شروط داوری در قراردادهای پیمانکاری و نحوه اجرای آرای داوری خارجی در ایران.',
    category: 'webinar',
    categoryLabel: 'وبینار تخصصی',
    duration: '۵۸:۴۰',
    views: 2890,
    date: '۰۵ اسفند ۱۴۰۲',
    speaker: 'دکتر سیده مریم رضوی',
    speakerRole: 'داور مرکز داوری اتاق بازرگانی',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    hasAttachment: true,
    attachmentName: 'مجموعه_قوانین_داوری_تجارتی.pdf',
    attachmentSize: '۱.۹ مگابایت',
  },
  {
    id: 'vid-4',
    title: 'معرفی پورتال اختصاصی موکلان و سیستم هوشمند پیگیری پرونده',
    description: 'راهنمای کار با پیشخوان موکلین، دریافت نوتیفیکیشن‌های پیامکی جلسات دادرسی و پرداخت امن تمبر مالیاتی و حق‌الوکاله.',
    category: 'service',
    categoryLabel: 'معرفی خدمات',
    duration: '۱۸:۲۰',
    views: 4120,
    date: '۲۸ بهمن ۱۴۰۲',
    speaker: 'تیم پشتیبانی حقوقی',
    speakerRole: 'میز راهبری و خدمات موکلین',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    hasAttachment: false,
  },
  {
    id: 'vid-5',
    title: 'اصول قراردادنویسی محرمانگی (NDA) و حقوق مالکیت فکری استارتاپ‌ها',
    description: 'چگونه دارایی‌های دیجیتال، سورس‌کد و اسرار تجاری استارتاپ خود را در مواجهه با سرمایه‌گذاران و هم‌بنیان‌گذاران محافظت کنیم.',
    category: 'analysis',
    categoryLabel: 'تحلیل حقوق فناوری',
    duration: '۲۶:۵۰',
    views: 3750,
    date: '۱۴ بهمن ۱۴۰۲',
    speaker: 'دکتر سیده مریم رضوی',
    speakerRole: 'مشاور حقوقی کسب‌وکارهای دانش‌بنیان',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    hasAttachment: true,
    attachmentName: 'نمونه_قرارداد_NDA_استاندارد.docx',
    attachmentSize: '۱.۱ مگابایت',
  },
  {
    id: 'vid-6',
    title: 'پیکربندی فروشگاه ووکامرس مقیاس‌پذیر با کشینگ لبه و پایگاه داده سریع',
    description: 'روش‌های کاهش بار دیتابیس در سایت‌های پرترافیک فروشگاهی، کانفیگ Redis Object Cache و اتصال درگاه‌های بانکی بدون اختلال.',
    category: 'tutorial',
    categoryLabel: 'آموزش توسعه فروشگاه',
    duration: '۳۹:۱۰',
    views: 4630,
    date: '۰۲ بهمن ۱۴۰۲',
    speaker: 'مهندس امیرحسین رضوی',
    speakerRole: 'متخصص Core Web Vitals و پایگاه داده',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67e557224d?auto=format&fit=crop&w=800&q=80',
    hasAttachment: true,
    attachmentName: 'چک‌لیست_سرعت_ووکامرس.pdf',
    attachmentSize: '۳.۲ مگابایت',
  },
];

interface VideoArchivePageViewProps {
  onBackToHome?: () => void;
  onSelectService?: (serviceName: string) => void;
}

export const VideoArchivePageView: React.FC<VideoArchivePageViewProps> = ({
  onBackToHome,
  onSelectService,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(SAMPLE_VIDEOS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState<'1080p' | '720p' | '480p'>('1080p');
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredVideos = SAMPLE_VIDEOS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#070D1E] text-[#F0F6FC] font-sans pb-20">
      {/* Top Breadcrumb & Return Header */}
      <div className="border-b border-[#30363D] bg-[#0D1117]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToHome && (
              <button
                type="button"
                onClick={onBackToHome}
                className="flex items-center gap-1.5 text-xs font-medium text-[#94A3B8] hover:text-white transition px-2.5 py-1.5 rounded-lg bg-[#161B22] border border-[#30363D] cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>بازگشت به صفحه اصلی</span>
              </button>
            )}
            <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
              <span>پایگاه رسانه‌ای</span>
              <span>/</span>
              <span className="text-white font-medium">آرشیو جامع ویدئوها</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#94A3B8]">کیفیت پیش‌فرض:</span>
            <div className="flex bg-[#161B22] p-0.5 rounded-lg border border-[#30363D] text-[11px]">
              {(['1080p', '720p', '480p'] as const).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuality(q)}
                  className={`px-2 py-0.5 rounded transition font-mono ${
                    quality === q ? 'bg-[#58A6FF] text-white font-bold' : 'text-[#8B949E] hover:text-white'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6 max-w-7xl">
        {/* Main Spotlight Video Cinema Player */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Cols: Video Player & Details */}
            <div className="lg:col-span-8 bg-[#0D1117] rounded-2xl border border-[#30363D] overflow-hidden shadow-2xl">
              {/* Responsive Video Screen Container */}
              <div className="relative aspect-video bg-black overflow-hidden group">
                <video
                  key={selectedVideo.id}
                  src={selectedVideo.videoUrl}
                  poster={selectedVideo.thumbnail}
                  controls={false}
                  autoPlay={isPlaying}
                  muted={isMuted}
                  className="w-full h-full object-cover"
                />

                {/* Overlaid Play Trigger when paused */}
                {!isPlaying && (
                  <div
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/40"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#D4AF37]/90 text-black flex items-center justify-center shadow-2xl transform transition hover:scale-110">
                      <Play className="w-8 h-8 fill-black mr-1" />
                    </div>
                    <div className="mt-4 text-white text-sm font-semibold tracking-wide">
                      پخش ویدیو با کیفیت {quality}
                    </div>
                  </div>
                )}

                {/* Bottom Custom Playback Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px] text-[#CBD5E1]">
                      مدت: {selectedVideo.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-black/60 text-[#D4AF37] font-mono text-[10px] border border-[#D4AF37]/30">
                      {quality}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const elem = document.querySelector('video');
                        if (elem?.requestFullscreen) elem.requestFullscreen();
                      }}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Metadata & Actions */}
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                    <span className="text-[#D4AF37] font-semibold">{selectedVideo.categoryLabel}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      {selectedVideo.duration}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Eye className="w-3.5 h-3.5" />
                      {selectedVideo.views.toLocaleString('fa-IR')} بازدید
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {selectedVideo.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleShare}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161B22] hover:bg-[#21262D] text-xs font-medium text-[#C9D1D9] border border-[#30363D] transition cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'لینک کپی شد' : 'اشتراک‌گذاری'}</span>
                    </button>
                    <a
                      href={selectedVideo.videoUrl}
                      download
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#238636] hover:bg-[#2EA043] text-xs font-bold text-white transition shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>دانلود ویدیو</span>
                    </a>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-relaxed">
                  {selectedVideo.title}
                </h1>

                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                  {selectedVideo.description}
                </p>

                {/* Speaker Identity Lockup */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#161B22] border border-[#30363D]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#E5C158] p-0.5 shadow-md">
                      <div className="w-full h-full rounded-full bg-[#0D1117] flex items-center justify-center text-sm font-bold text-[#D4AF37]">
                        {selectedVideo.speaker.slice(0, 2)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{selectedVideo.speaker}</div>
                      <div className="text-xs text-[#8B949E]">{selectedVideo.speakerRole}</div>
                    </div>
                  </div>

                  {onSelectService && (
                    <button
                      type="button"
                      onClick={() => onSelectService(selectedVideo.categoryLabel)}
                      className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/40 text-xs font-bold transition cursor-pointer"
                    >
                      مشاوره در این زمینه
                    </button>
                  )}
                </div>

                {/* Downloadable Attachment (If present) */}
                {selectedVideo.hasAttachment && (
                  <div className="mt-4 p-3.5 rounded-xl bg-[#1F2438]/60 border border-[#30363D] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#6366F1]/20 border border-[#6366F1]/40 flex items-center justify-center text-[#818CF8]">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{selectedVideo.attachmentName}</div>
                        <div className="text-[11px] text-[#94A3B8]">فایل پیوست و مستندات تمرینی · {selectedVideo.attachmentSize}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`دانلود فایل ${selectedVideo.attachmentName} آغاز شد.`)}
                      className="px-3 py-1.5 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>دریافت فایل</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right 4 Cols: Video Playlist Queue */}
            <div className="lg:col-span-4 bg-[#0D1117] rounded-2xl border border-[#30363D] p-4 shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#30363D]">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="text-sm font-bold text-white">فهرست ویدئوهای منتخب</h3>
                </div>
                <span className="text-xs font-mono text-[#8B949E]">{SAMPLE_VIDEOS.length} ویدیو</span>
              </div>

              <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
                {SAMPLE_VIDEOS.map((video, idx) => {
                  const isCurrent = video.id === selectedVideo.id;
                  return (
                    <div
                      key={video.id}
                      onClick={() => {
                        setSelectedVideo(video);
                        setIsPlaying(true);
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                        isCurrent
                          ? 'bg-[#1C2541] border-[#D4AF37]/50 shadow-md'
                          : 'bg-[#161B22] border-[#30363D] hover:border-[#8B949E]/50 hover:bg-[#21262D]'
                      }`}
                    >
                      {/* Thumbnail Container */}
                      <div className="relative w-28 h-18 rounded-lg overflow-hidden shrink-0 bg-black">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                          {video.duration}
                        </div>
                        {isCurrent && (
                          <div className="absolute inset-0 bg-[#D4AF37]/20 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-black">
                              <Play className="w-3 h-3 fill-black mr-0.5" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex flex-col justify-between overflow-hidden">
                        <div className="text-xs font-bold text-white line-clamp-2 leading-relaxed">
                          {video.title}
                        </div>
                        <div className="text-[11px] text-[#8B949E] flex items-center gap-1.5 mt-1">
                          <span className="text-[#D4AF37]">{video.categoryLabel}</span>
                          <span>·</span>
                          <span className="font-mono">{video.views.toLocaleString('fa-IR')} بازدید</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Filter and Search Bar for Full Library */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0D1117] border border-[#30363D]">
            {/* Category Segmented Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'همه ویدئوها' },
                { id: 'tutorial', label: 'آموزش‌های کاربردی' },
                { id: 'analysis', label: 'تحلیل و رویه قضایی' },
                { id: 'webinar', label: 'وبینارها و همایش‌ها' },
                { id: 'service', label: 'معرفی خدمات' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#D4AF37] text-black shadow-md'
                      : 'bg-[#161B22] text-[#8B949E] hover:text-white hover:bg-[#21262D]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-[#8B949E] absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="جستجو در عناوین و اساتید..."
                className="w-full pl-3 pr-9 py-2 rounded-xl bg-[#161B22] border border-[#30363D] text-xs text-white placeholder-[#8B949E] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>
        </section>

        {/* Full Video Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group bg-[#0D1117] rounded-2xl border border-[#30363D] overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col shadow-lg"
              >
                {/* Poster Container */}
                <div
                  onClick={() => {
                    setSelectedVideo(video);
                    setIsPlaying(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-lg transform group-hover:scale-110 transition">
                      <Play className="w-5 h-5 fill-black mr-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/85 text-[11px] font-mono text-white">
                    {video.duration}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-2.5">
                      <span className="text-[#D4AF37] font-medium">{video.categoryLabel}</span>
                      <span>·</span>
                      <span className="font-mono">{video.date}</span>
                    </div>

                    <h3
                      onClick={() => {
                        setSelectedVideo(video);
                        setIsPlaying(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-base font-bold text-white line-clamp-2 leading-snug mb-3 cursor-pointer group-hover:text-[#D4AF37] transition"
                    >
                      {video.title}
                    </h3>

                    <p className="text-xs text-[#8B949E] line-clamp-2 leading-relaxed mb-4">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#30363D] flex items-center justify-between text-xs">
                    <span className="text-[#CBD5E1] font-medium">{video.speaker}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedVideo(video);
                        setIsPlaying(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-[#D4AF37] hover:text-[#E5C158] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>تماشای ویدیو</span>
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-16 bg-[#0D1117] rounded-2xl border border-[#30363D] p-8">
              <Film className="w-12 h-12 text-[#8B949E] mx-auto mb-3 opacity-50" />
              <h3 className="text-base font-bold text-white mb-1">ویدیویی یافت نشد</h3>
              <p className="text-xs text-[#8B949E]">
                عبارت جستجو را تغییر دهید یا فیلتر دسته‌بندی دیگری انتخاب کنید.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
