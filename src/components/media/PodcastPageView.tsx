import React, { useState } from 'react';
import {
  Headphones, Play, Pause, Download, Clock, Calendar,
  Volume2, Share2, Bookmark, CheckCircle2,
  ListMusic, Mic, FileText, ArrowRight
} from 'lucide-react';

interface PodcastEpisode {
  id: string;
  title: string;
  category: 'وکالت و حقوق' | 'طراحی سایت و وب' | 'کسب‌وکار و استارتاپ' | 'توسعه فردی';
  duration: string;
  date: string;
  description: string;
  audioUrl: string;
  downloadsCount: number;
  speaker: string;
  speakerRole: string;
  fileSize: string;
  hasTranscript: boolean;
}

const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'ep-01',
    title: 'قسمت ۱: استراتژی‌های پیروزی در دعاوی حقوقی پیچیده و داوری تجاری',
    category: 'وکالت و حقوق',
    duration: '۴۲:۱۸',
    date: '۲۲ مهر ۱۴۰۳',
    description: 'در این اپیزود تخصصی به بررسی اصول تدوین دادخواست‌های مستدل، تحلیل احکام وحدت رویه دیوان عالی کشور و راه‌کارهای دفاع موثر در محاکم تجاری می‌پردازیم.',
    audioUrl: 'https://cdn.example.com/podcasts/sedrazavi-ep01.mp3',
    downloadsCount: 1420,
    speaker: 'سید امیر رضوی',
    speakerRole: 'وکیل پایه یک دادگستری و پژوهشگر دکتری حقوق',
    fileSize: '۳۸ مگابایت',
    hasTranscript: true,
  },
  {
    id: 'ep-02',
    title: 'قسمت ۲: معماری مدرن وب؛ گوتنبرگ در برابر المنتور و بنچمارک سرعت وردپرس',
    category: 'طراحی سایت و وب',
    duration: '۳۵:۵۰',
    date: '۱۸ مهر ۱۴۰۳',
    description: 'چرا نسل آینده سایت‌های سازمانی باید به سمت فول‌سایت ادیتینگ (FSE) و گوتنبرگ حرکت کنند؟ تحلیل فنی لود تایم و امتیاز ۱۰۰ در لایت‌هاوس.',
    audioUrl: 'https://cdn.example.com/podcasts/sedrazavi-ep02.mp3',
    downloadsCount: 980,
    speaker: 'مهندس حسینی',
    speakerRole: 'توسعه‌دهنده ارشد وردپرس و معمار سیستم',
    fileSize: '۳۲ مگابایت',
    hasTranscript: true,
  },
  {
    id: 'ep-03',
    title: 'قسمت ۳: قوانین قراردادهای نرم‌افزاری و محافظت از مالکیت فکری (IP)',
    category: 'وکالت و حقوق',
    duration: '۲۹:۱۵',
    date: '۱۰ مهر ۱۴۰۳',
    description: 'بررسی بندهای محرمانگی (NDA)، تعهدات SLA، شرایط فسخ و مالکیت کد مبدأ در قراردادهای توسعه فریلنسری و شرکتی.',
    audioUrl: 'https://cdn.example.com/podcasts/sedrazavi-ep03.mp3',
    downloadsCount: 1150,
    speaker: 'سید امیر رضوی',
    speakerRole: 'وکیل پایه یک دادگستری',
    fileSize: '۲۶ مگابایت',
    hasTranscript: true,
  },
  {
    id: 'ep-04',
    title: 'قسمت ۴: اتوماسیون کسب‌وکار، وب‌هوک‌های گیت‌هاب و استقرار پیوسته در وردپرس',
    category: 'کسب‌وکار و استارتاپ',
    duration: '۴۸:۰۵',
    date: '۰۴ مهر ۱۴۰۳',
    description: 'نحوه اتصال دایرکت گیت‌هاب به وردپرس بدون نیاز به پنل هاست و تجربه ساخت پایپ‌لاین‌های اتوماتیک برای تیم‌های توزیع‌شده.',
    audioUrl: 'https://cdn.example.com/podcasts/sedrazavi-ep04.mp3',
    downloadsCount: 840,
    speaker: 'تیم فنی سدرضوی',
    speakerRole: 'واحد تحقیق و توسعه نرم‌افزار',
    fileSize: '۴۴ مگابایت',
    hasTranscript: false,
  },
  {
    id: 'ep-05',
    title: 'قسمت ۵: مدیریت استرس و فن بیان در مذاکرات تجاری و جلسات دادگاه',
    category: 'توسعه فردی',
    duration: '۳۱:۴۰',
    date: '۲۸ شهریور ۱۴۰۳',
    description: 'تکنیک‌های زبان بدن، فن دفاع شفاهی، قانع‌سازی طرف مذاکره و مدیریت تعارض در بحران‌های حقوقی و مالی.',
    audioUrl: 'https://cdn.example.com/podcasts/sedrazavi-ep05.mp3',
    downloadsCount: 1310,
    speaker: 'سید امیر رضوی',
    speakerRole: 'مدرس فن بیان و وکیل پایه یک',
    fileSize: '۲۸ مگابایت',
    hasTranscript: true,
  },
];

interface PodcastPageViewProps {
  onBackToHome: () => void;
}

export const PodcastPageView: React.FC<PodcastPageViewProps> = ({ onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('همه');
  const [playingId, setPlayingId] = useState<string | null>('ep-01');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<string | null>(null);

  const categories = ['همه', 'وکالت و حقوق', 'طراحی سایت و وب', 'کسب‌وکار و استارتاپ', 'توسعه فردی'];

  const filteredEpisodes = selectedCategory === 'همه'
    ? PODCAST_EPISODES
    : PODCAST_EPISODES.filter(ep => ep.category === selectedCategory);

  const activeEpisode = PODCAST_EPISODES.find(ep => ep.id === playingId) || PODCAST_EPISODES[0];

  const handleTogglePlay = (id: string) => {
    if (playingId === id) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingId(id);
      setIsPlaying(true);
    }
  };

  const handleDownload = (ep: PodcastEpisode, type: 'mp3' | 'pdf') => {
    setDownloadSuccessModal(`${ep.title} (${type === 'mp3' ? 'فایل صوتی MP3' : 'متن کامل PDF'})`);
    setTimeout(() => setDownloadSuccessModal(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Top Breadcrumb & Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-xs text-gray-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به صفحه اصلی
            </button>
            <span className="text-gray-600">/</span>
            <span className="text-xs text-[#D4AF37] font-bold">مرکز پادکست و رسانه صوتی (page-podcast.php)</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            پخش آنلاین و دانلود نامحدود با کیفیت استودیویی
          </div>
        </div>

        {/* Hero Banner */}
        <div className="mt-8 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#0B132B] to-[#1E293B] border border-gray-800 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold">
                <Headphones className="w-4 h-4" />
                رادیو و پادکست‌های تخصصی سدرضوی
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                روایت‌های شنیدنی از <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-yellow-500">حقوق، وب و آینده کسب‌وکار</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                مجموعه سخنرانی‌ها، تحلیل‌های تخصصی پرونده‌های قضایی و مباحث فنی معماری سایت و گیت‌هاب در قالبی شنیدنی، همراه با خلاصه متنی و لینک‌های مستقیم دانلود رایگان.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="px-3 py-1.5 rounded-xl bg-gray-800/90 text-xs text-gray-300">
                  🎙 ۵ اپیزود فعال
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-gray-800/90 text-xs text-gray-300">
                  ⏱ بیش از ۳ ساعت فایل صوتی
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-gray-800/90 text-xs text-gray-300">
                  📥 ۵,۷۰۰+ بارگیری موفق
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group cursor-pointer">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-[#D4AF37] via-amber-500 to-yellow-300 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-[22px] bg-[#070D1E] flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                      <Mic className="w-8 h-8" />
                    </div>
                    <div className="text-xs font-black text-white">SedRazavi Cast</div>
                    <div className="text-[10px] text-gray-400">فصل سوم • انتشار هفتگی</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating / Active Audio Player Deck */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="rounded-2xl bg-[#0F172A] border border-[#D4AF37]/30 p-5 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-14 h-14 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-black flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current mr-0.5" />}
              </button>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#D4AF37]/15 text-[#D4AF37] font-bold">
                    در حال پخش
                  </span>
                  <span className="text-xs text-gray-400">{activeEpisode.speaker}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-md">
                  {activeEpisode.title}
                </h4>
              </div>
            </div>

            {/* Fake wave / progress simulation */}
            <div className="w-full md:w-1/3 flex items-center gap-3">
              <span className="text-xs text-gray-400 font-mono">12:45</span>
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-[#D4AF37] rounded-full w-2/5 relative"></div>
              </div>
              <span className="text-xs text-gray-400 font-mono">{activeEpisode.duration}</span>
            </div>

            {/* Audio Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setPlaybackSpeed(s => s === 1 ? 1.25 : s === 1.25 ? 1.5 : s === 1.5 ? 2 : 1)}
                className="px-2.5 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-mono text-gray-300"
                title="سرعت پخش"
              >
                {playbackSpeed}x
              </button>
              <button
                onClick={() => handleDownload(activeEpisode, 'mp3')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                دانلود MP3
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories & Filter Tabs */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                  : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Episodes Playlist Grid */}
      <div className="max-w-7xl mx-auto space-y-4">
        {filteredEpisodes.map((ep, idx) => {
          const isThisPlaying = playingId === ep.id && isPlaying;
          return (
            <div
              key={ep.id}
              className={`rounded-2xl p-5 sm:p-6 transition-all border ${
                playingId === ep.id
                  ? 'bg-[#0B132B] border-[#D4AF37]/60 shadow-xl'
                  : 'bg-[#0F172A]/70 border-gray-800 hover:border-gray-700 hover:bg-[#0F172A]'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => handleTogglePlay(ep.id)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                      isThisPlaying
                        ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30'
                        : 'bg-gray-800 hover:bg-gray-700 text-[#D4AF37]'
                    }`}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current mr-0.5" />
                    )}
                  </button>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-md bg-gray-800 text-gray-300 font-bold">
                        {ep.category}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {ep.duration}
                      </span>
                      <span className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {ep.date}
                      </span>
                      <span className="text-gray-500">• {ep.fileSize}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                        onClick={() => handleTogglePlay(ep.id)}>
                      {ep.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-3xl">
                      {ep.description}
                    </p>

                    <div className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="text-gray-500">ارائه‌دهنده:</span>
                      <span className="font-bold text-gray-300">{ep.speaker}</span>
                      <span className="text-gray-600">({ep.speakerRole})</span>
                    </div>
                  </div>
                </div>

                {/* Episode Actions */}
                <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end border-t lg:border-t-0 border-gray-800/80 pt-4 lg:pt-0">
                  {ep.hasTranscript && (
                    <button
                      onClick={() => handleDownload(ep, 'pdf')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-800/90 hover:bg-gray-700 text-gray-300 text-xs font-bold transition-colors"
                      title="دانلود متن سخنرانی PDF"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      متن PDF
                    </button>
                  )}
                  <button
                    onClick={() => handleDownload(ep, 'mp3')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#D4AF37] hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    دانلود صوت ({ep.fileSize})
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Success Notification Modal */}
      {downloadSuccessModal && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#0F172A] border border-[#D4AF37] rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">بارگیری با موفقیت آغاز شد</div>
            <div className="text-[11px] text-gray-400">{downloadSuccessModal}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodcastPageView;
