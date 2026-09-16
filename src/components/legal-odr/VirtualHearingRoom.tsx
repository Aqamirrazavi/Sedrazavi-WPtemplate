import React, { useState, useEffect } from 'react';
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  Lock,
  Radio,
  Clock,
  Send,
  BookOpen,
  Share2,
  FileCheck,
  AlertCircle,
  Users,
  MessageSquare,
  Shield,
  Gavel,
  Volume2,
} from 'lucide-react';
import { VIRTUAL_HEARING_SCHEDULE_DATA } from '../../data/mockData';
import { VirtualHearingSession } from '../../types/theme';

export const VirtualHearingRoom: React.FC = () => {
  const [sessions] = useState<VirtualHearingSession[]>(VIRTUAL_HEARING_SCHEDULE_DATA);
  const [activeSession, setActiveSession] = useState<VirtualHearingSession>(sessions[0]);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [defenseSeconds, setDefenseSeconds] = useState(640);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'laws' | 'agenda'>('laws');
  const [chatMessage, setChatMessage] = useState('');
  const [chatLogs, setChatLogs] = useState<Array<{ sender: string; time: string; text: string }>>([
    { sender: 'منشی دادگاه', time: '۱۶:۰۰', text: 'احراز هویت برخط طرفین با تطبیق شناسه ثنا با موفقیت انجام شد.' },
    { sender: 'دکتر رضوی (داور)', time: '۱۶:۰۵', text: 'جلسه رسمیت یافت. خواهان ۱۰ دقیقه فرصت تبیین ادله دارد.' },
    { sender: 'وکیل خواهان', time: '۱۶:۰۷', text: 'با سلام و احترام، مستندات تحویل فاز دوم به پیوست ارائه می‌گردد.' },
  ]);

  // Defense Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && defenseSeconds > 0) {
      interval = setInterval(() => {
        setDefenseSeconds((sec) => sec - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, defenseSeconds]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setChatLogs((prev) => [
      ...prev,
      {
        sender: 'شما (دفتر وکالت)',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        text: chatMessage,
      },
    ]);
    setChatMessage('');
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Top Session Security & Status Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#060B18] via-[#0B132B] to-[#060B18] border-2 border-[#D4AF37]/50 shadow-xl text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>پخش زنده دادگاه الکترونیک</span>
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <Lock className="w-3 h-3" />
              <span>رمزنگاری سرتاسری ۲۵۶ بیتی (E2E)</span>
            </span>
            <span className="text-xs font-mono text-slate-400">شناسه جلسه: {activeSession.sessionCode}</span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white font-serif">
            {activeSession.title} ({activeSession.branchName})
          </h2>
        </div>

        {/* Defense Speech Countdown Clock */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-[#D4AF37]/40 px-4 py-2 rounded-xl">
          <Clock className="w-5 h-5 text-[#D4AF37] animate-spin-slow" />
          <div>
            <span className="block text-[10px] text-slate-400">زمان دفاع باقیمانده:</span>
            <span className="font-mono text-lg sm:text-xl font-black text-[#FCE38A]">
              {formatTimer(defenseSeconds)}
            </span>
          </div>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-slate-200 transition-all ml-2"
          >
            {isTimerRunning ? 'مکث' : 'ادامه'}
          </button>
        </div>
      </div>

      {/* Main Hearing Room Layout: Video Grid (8 Cols) & Sidebar (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Video Screens (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Virtual Stage: 3 Screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Screen 1: Arbitrator / Judge (Main Prominent) */}
            <div className="sm:col-span-2 relative aspect-video rounded-2xl bg-[#060B18] border-2 border-[#D4AF37]/60 overflow-hidden shadow-2xl flex items-center justify-center group">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="دکتر سیده مریم رضوی"
                className="w-full h-full object-cover object-top opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Badge Overlays */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-bold flex items-center gap-1.5">
                  <Gavel className="w-3.5 h-3.5" />
                  <span>سرداور مرضی‌الطرفین: {activeSession.judgeOrArbitrator}</span>
                </span>
              </div>

              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-white drop-shadow">میکروفن فعال (در حال استماع)</span>
              </div>
            </div>

            {/* Screen 2: Claimant Lawyer */}
            <div className="relative aspect-video rounded-xl bg-slate-900 border border-slate-700 overflow-hidden shadow-lg flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600"
                alt="وکیل خواهان"
                className="w-full h-full object-cover object-top opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 text-xs text-white">
                <span className="font-bold">وکیل خواهان: دکتر مسعود حسینی</span>
              </div>
              <div className="absolute top-2.5 left-2.5">
                <span className="p-1 rounded bg-black/60 text-emerald-400">
                  <Volume2 className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Screen 3: Respondent Lawyer */}
            <div className="relative aspect-video rounded-xl bg-slate-900 border border-slate-700 overflow-hidden shadow-lg flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600"
                alt="وکیل خوانده"
                className="w-full h-full object-cover object-top opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 right-2.5 text-xs text-white">
                <span className="font-bold">وکیل خوانده: دکتر علیرضا رادمنش</span>
              </div>
            </div>
          </div>

          {/* Courtroom Controls Bar */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isMicOn
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700'
                    : 'bg-rose-500 text-white border-rose-600'
                }`}
                title={isMicOn ? 'قطع میکروفن' : 'وصل میکروفن'}
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isVideoOn
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700'
                    : 'bg-rose-500 text-white border-rose-600'
                }`}
                title={isVideoOn ? 'خاموش‌کردن دوربین' : 'روشن‌کردن دوربین'}
              >
                {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isScreenSharing
                    ? 'bg-[#D4AF37] text-[#060B18] border-[#D4AF37]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border-slate-300 dark:border-slate-700'
                }`}
                title="اشتراک‌گذاری صفحه و اسناد"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-emerald-500 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                کیفیت اتصال: عالی (Ping: 18ms)
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Tabbed Tools (Chat, Legal Articles, Agenda) (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[520px]">
            {/* Tabs Header */}
            <div className="grid grid-cols-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#060B18]">
              <button
                onClick={() => setActiveTab('laws')}
                className={`py-3 text-xs font-bold transition-all ${
                  activeTab === 'laws'
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] bg-white dark:bg-[#0B132B]'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                استناد به قوانین
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-3 text-xs font-bold transition-all ${
                  activeTab === 'chat'
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] bg-white dark:bg-[#0B132B]'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                پیام‌رسان رسمی
              </button>
              <button
                onClick={() => setActiveTab('agenda')}
                className={`py-3 text-xs font-bold transition-all ${
                  activeTab === 'agenda'
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] bg-white dark:bg-[#0B132B]'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                دستور جلسه
              </button>
            </div>

            {/* Tab 1: Legal Code Citation Board */}
            {activeTab === 'laws' && (
              <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs text-right">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300">
                  <span className="font-bold">استناد فوری در جلسه:</span> کلیک بر روی هر ماده، متن آن را به لایحه یا گفتگوی زنده الصاق می‌کند.
                </div>

                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37] transition-all cursor-pointer">
                    <span className="font-bold text-[#D4AF37] block mb-1">ماده ۱۰ قانون مدنی:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      قراردادهای خصوصی نسبت به کسانی که آن را منعقد نموده‌اند، در صورتی که مخالف صریح قانون نباشد، نافذ است.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37] transition-all cursor-pointer">
                    <span className="font-bold text-[#D4AF37] block mb-1">ماده ۲۲۱ قانون مدنی:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      اگر کسی تعهد اقدام به امری را بکند یا تعهد نماید که از انجام امری خودداری کند، در صورت تخلف، مسئول خسارت طرف مقابل است.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37] transition-all cursor-pointer">
                    <span className="font-bold text-[#D4AF37] block mb-1">ماده ۴۸۲ قانون آیین دادرسی مدنی:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      رأی داور باید موجه و مدلل بوده و مخالف با قوانین موجد حق نباشد.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-800 hover:border-[#D4AF37] transition-all cursor-pointer">
                    <span className="font-bold text-[#D4AF37] block mb-1">ماده ۵۲۲ قانون آیین دادرسی مدنی:</span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                      در دعاویی که موضوع آن دین و از نوع وجه رایج باشد با مطالبه دائن و تمکن مدیون، دادگاه نرخ تورم را محاسبه خواهد کرد.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Courtroom Chat */}
            {activeTab === 'chat' && (
              <div className="flex flex-col flex-1 overflow-hidden p-3">
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
                  {chatLogs.map((log, index) => (
                    <div
                      key={index}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-800 space-y-1 text-right"
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span className="font-bold text-[#D4AF37]">{log.sender}</span>
                        <span>{log.time}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{log.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="ارسال پیام یا یادداشت رسمی..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-300 dark:border-slate-700 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#D4AF37] text-[#060B18] hover:bg-[#c49f2f] transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab 3: Agenda */}
            {activeTab === 'agenda' && (
              <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs text-right">
                <span className="font-bold text-slate-800 dark:text-white block mb-2">
                  دستور و مراحل جلسه استماع:
                </span>
                <div className="space-y-2">
                  {activeSession.agenda.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-[#060B18] border border-slate-200 dark:border-slate-800 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-700 dark:text-slate-300 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
