import React, { useState } from 'react';
import {
  Play, Pause, Download, Volume2, Share2, Clock, Calendar,
  Eye, FileText, CheckCircle2, ChevronLeft, ArrowRight,
  Sparkles, Maximize2, ListOrdered, UserCheck
} from 'lucide-react';

interface SingleVideoViewProps {
  onBackToArchive: () => void;
  onBackToHome: () => void;
}

export const SingleVideoView: React.FC<SingleVideoViewProps> = ({ onBackToArchive, onBackToHome }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeChapter, setActiveChapter] = useState<number>(0);
  const [downloadModalNotice, setDownloadModalNotice] = useState<string | null>(null);

  const chapters = [
    { title: 'مقدمه و تعریف دعوای تجاری', time: '00:00' },
    { title: 'بررسی بند داوری در قراردادهای EPC', time: '08:35' },
    { title: 'شیوه استناد به احکام وحدت رویه دیوان', time: '19:40' },
    { title: 'تکنیک‌های دفاع و سوالات متداول قضات', time: '32:15' },
    { title: 'جمع‌بندی و نتیجه‌گیری', time: '41:20' },
  ];

  const handleDownload = (format: string, size: string) => {
    setDownloadModalNotice(`بارگیری نسخه ${format} (${size}) آغاز شد.`);
    setTimeout(() => setDownloadModalNotice(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans" dir="rtl">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800 pb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToArchive}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs text-gray-300 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به آرشیو ویدئوها
            </button>
            <span className="text-gray-600">/</span>
            <span className="text-xs text-[#D4AF37] font-bold">پخش تک‌ویدئو و سخنرانی (single-video.php)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="text-xs text-gray-400 hover:text-white transition-colors"
            >
              صفحه اصلی
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Video Cinema Deck & Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Cinema Player Container */}
          <div className="relative rounded-3xl overflow-hidden bg-black aspect-video border border-gray-800 shadow-2xl flex items-center justify-center group">
            {/* Poster / Canvas Simulation */}
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80"
              alt="Video Poster"
              className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-40' : 'opacity-85'}`}
            />

            {/* Play Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 rounded-full bg-[#D4AF37] hover:bg-amber-400 text-black flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current mr-1" />}
              </button>
              <span className="mt-4 text-xs font-bold bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white">
                {isPlaying ? 'در حال پخش آنلاین (۱۰۸۰p)' : 'پخش سخنرانی آنلاین'}
              </span>
            </div>

            {/* Bottom Player Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex items-center justify-between text-xs text-gray-300">
              <div className="flex items-center gap-3">
                <span className="font-mono text-white">19:40 / 44:30</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">کیفیت Full HD</span>
              </div>
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-gray-300 cursor-pointer" />
                <Maximize2 className="w-4 h-4 text-gray-300 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Video Metadata & Title */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] font-bold">
                حقوق تجارت و قراردادها
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                ۴۴ دقیقه و ۳۰ ثانیه
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                ۱۵ مهر ۱۴۰۳
              </span>
              <span className="flex items-center gap-1 text-gray-400">
                <Eye className="w-3.5 h-3.5" />
                ۳,۲۴۰ بازدید
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              راهنمای کاربردی دفاع در دعاوی تجاری و تدوین لوایح داوری بین‌المللی
            </h1>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              در این وبینار تخصصی، شیوه‌های عملیاتی طرح دعوا و دفاع در برابر هیئت‌های داوری و محاکم تجاری با بررسی مصادیق واقعی قراردادهای EPC، بندهای فورس‌ماژور و استناد به آخرین آرای وحدت رویه تشریح گردیده است.
            </p>
          </div>

          {/* Multi-Resolution Download Hub */}
          <div className="rounded-3xl bg-[#0F172A] border border-gray-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-sm font-black text-white">مرکز دانلود مستقیم و چندکیفیتی (Download Hub)</h3>
              </div>
              <span className="text-[11px] text-gray-400">ترافیک نیم‌بهاء داخلی</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <button
                onClick={() => handleDownload('1080p Full HD', '۴۵۰ MB')}
                className="p-3.5 rounded-2xl bg-gray-800 hover:bg-[#D4AF37] hover:text-black text-gray-200 transition-all text-right group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-black group-hover:text-black">کیفیت ۱۰۸۰p Full HD</div>
                  <div className="text-[10px] text-gray-400 group-hover:text-black/80">وضوح حداکثری و استودیویی</div>
                </div>
                <div className="text-[11px] font-mono mt-3 text-[#D4AF37] group-hover:text-black font-bold">۴۵۰ مگابایت ⬇</div>
              </button>

              <button
                onClick={() => handleDownload('720p HD', '۲۲۰ MB')}
                className="p-3.5 rounded-2xl bg-gray-800 hover:bg-[#D4AF37] hover:text-black text-gray-200 transition-all text-right group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-black group-hover:text-black">کیفیت ۷۲۰p HD</div>
                  <div className="text-[10px] text-gray-400 group-hover:text-black/80">مناسب موبایل و تبلت</div>
                </div>
                <div className="text-[11px] font-mono mt-3 text-[#D4AF37] group-hover:text-black font-bold">۲۲۰ مگابایت ⬇</div>
              </button>

              <button
                onClick={() => handleDownload('صوت خالص MP3', '۴۲ MB')}
                className="p-3.5 rounded-2xl bg-gray-800 hover:bg-[#D4AF37] hover:text-black text-gray-200 transition-all text-right group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-black group-hover:text-black">فایل صوتی MP3</div>
                  <div className="text-[10px] text-gray-400 group-hover:text-black/80">مناسب پادکست و گوش دادن در خودرو</div>
                </div>
                <div className="text-[11px] font-mono mt-3 text-[#D4AF37] group-hover:text-black font-bold">۴۲ مگابایت ⬇</div>
              </button>

              <button
                onClick={() => handleDownload('خلاصه متنی PDF', '۴.۵ MB')}
                className="p-3.5 rounded-2xl bg-gray-800 hover:bg-[#D4AF37] hover:text-black text-gray-200 transition-all text-right group flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-black group-hover:text-black">خلاصه متنی PDF</div>
                  <div className="text-[10px] text-gray-400 group-hover:text-black/80">جزوه کامل نکات کلیدی</div>
                </div>
                <div className="text-[11px] font-mono mt-3 text-[#D4AF37] group-hover:text-black font-bold">۴.۵ مگابایت ⬇</div>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar: Chapters & Speaker Bio */}
        <div className="lg:col-span-4 space-y-6">
          {/* Speaker Bio Card */}
          <div className="rounded-3xl bg-[#0F172A] border border-gray-800 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#D4AF37]">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=300&q=80"
                  alt="Speaker"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">سید امیر رضوی</h4>
                <p className="text-xs text-[#D4AF37]">وکیل پایه یک و داور تجاری</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>تأییدشده کانون وکلا</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-800/80 pt-3">
              دارای ۱۵ سال تجربه در دفاع از دعاوی ملکی، بین‌المللی و سرداوری پرونده‌های کلان صنعتی و پیمانکاری در سراسر کشور.
            </p>
          </div>

          {/* Interactive Chapters / Timestamps */}
          <div className="rounded-3xl bg-[#0F172A] border border-gray-800 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="text-sm font-black text-white">فهرست فصول و سرفصل‌ها</h3>
            </div>

            <div className="space-y-2">
              {chapters.map((chap, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveChapter(idx);
                    setIsPlaying(true);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs transition-all text-right ${
                    activeChapter === idx
                      ? 'bg-[#D4AF37] text-black font-bold'
                      : 'bg-gray-800/60 text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <span className="truncate">{chap.title}</span>
                  <span className="font-mono text-[11px] shrink-0 mr-2">{chap.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Download Toast Notification */}
      {downloadModalNotice && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#0F172A] border border-[#D4AF37] rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">شروع بارگیری مستقیم</div>
            <div className="text-[11px] text-gray-400">{downloadModalNotice}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleVideoView;
