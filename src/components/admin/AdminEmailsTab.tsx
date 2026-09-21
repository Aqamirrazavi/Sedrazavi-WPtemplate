import React, { useState } from 'react';
import {
  Mail,
  Inbox,
  Send,
  Archive,
  Star,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  User,
  Phone,
  Paperclip,
  Check,
  X,
  Reply,
  Shield,
} from 'lucide-react';

interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  subject: string;
  messageText: string;
  receivedDate: string;
  receivedTime: string;
  status: 'خوانده‌نشده' | 'پاسخ‌داده‌شده' | 'در حال بررسی' | 'آرشیو';
  isUrgent: boolean;
  repliedText?: string;
}

const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    senderName: 'مهندس سعید مرادی',
    senderEmail: 's.moradi@domain.com',
    senderPhone: '09129990011',
    subject: 'درخواست داوری فوری برای قرارداد مشارکت در تولید تجهیزات پزشکی',
    messageText:
      'با سلام و احترام خدمت سرکار خانم دکتر رضوی. در خصوص قرارداد شماره ۴۰۲/الف با شرکت طرف قرارداد به اختلاف اساسی خورده‌ایم و شرط داوری با تعیین سرکارعالی در قرارداد قید شده است. خواهشمند است وقت جلسه استماع جهت ارائه دادخواست داوری را اعلام فرمایید.',
    receivedDate: 'امروز',
    receivedTime: '۱۰:۲۵',
    status: 'خوانده‌نشده',
    isUrgent: true,
  },
  {
    id: 'msg-2',
    senderName: 'خانم الناز شریفی',
    senderEmail: 'el.sharifi@gmail.com',
    senderPhone: '09361114455',
    subject: 'مشاوره در خصوص تنظیم وصیت‌نامه تملیکی و عهدی و ثلث مال',
    messageText:
      'سلام وقت بخیر. قصد دارم برای اموال خودم وصیت‌نامه قانونی و محضری تنظیم کنم که پس از فوت مشکلی بین وراث ایجاد نشود. آیا امکان ارسال پیش‌نویس توسط شما وجود دارد؟',
    receivedDate: 'امروز',
    receivedTime: '۰۸:۴۰',
    status: 'خوانده‌نشده',
    isUrgent: false,
  },
  {
    id: 'msg-3',
    senderName: 'شرکت تجارت نوین البرز',
    senderEmail: 'info@alborztrade.ir',
    senderPhone: '02188997766',
    subject: 'اعتراض به برگه تشخیص مالیاتی عملکرد سال ۱۴۰۱ در هیات حل اختلاف',
    messageText:
      'جناب دکتر رضوی، برای شرکت ما مالیات سنگین غیرواقعی تشخیص داده شده و مهلت اعتراض ۳۰ روزه تا هفته آینده به پایان می‌رسد. مدارک حسابرسی آماده است.',
    receivedDate: 'دیروز',
    receivedTime: '۱۶:۱۵',
    status: 'پاسخ‌داده‌شده',
    isUrgent: true,
    repliedText: 'با سلام، مدارک در کارگروه مالیاتی دفتر بررسی گردید و لایحه اعتراضیه ماده ۲۳۸ تا فردا تنظیم و ارسال خواهد شد.',
  },
  {
    id: 'msg-4',
    senderName: 'آقای بهنام باقری',
    senderEmail: 'bagheri.b@yahoo.com',
    senderPhone: '09125556677',
    subject: 'پیگیری پرونده الزام به تنظیم سند رسمی ملک در پونک',
    messageText:
      'سلام و ارادت، خواستم مطلع شوم آیا اخطاریه شعبه ۴ دادگاه حقوقی برای کارشناس رسمی ارسال شده است یا خیر؟ سپاسگزارم.',
    receivedDate: '۱۴۰۳/۰۶/۲۲',
    receivedTime: '۱۱:۱۰',
    status: 'در حال بررسی',
    isUrgent: false,
  },
];

export const AdminEmailsTab: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>(INITIAL_MESSAGES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('همه');
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);

  // Counters
  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => m.status === 'خوانده‌نشده').length;
  const repliedCount = messages.filter((m) => m.status === 'پاسخ‌داده‌شده').length;
  const urgentCount = messages.filter((m) => m.isUrgent).length;

  const handleOpenMessage = (msg: ContactMessage) => {
    setActiveMessage(msg);
    setReplyContent('');
    if (msg.status === 'خوانده‌نشده') {
      setMessages((prev) =>
        prev.map((m) => (m.id === msg.id ? { ...m, status: 'در حال بررسی' } : m))
      );
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !activeMessage) return;

    setMessages((prev) =>
      prev.map((m) =>
        m.id === activeMessage.id
          ? { ...m, status: 'پاسخ‌داده‌شده', repliedText: replyContent }
          : m
      )
    );

    setSendSuccess(true);
    setTimeout(() => {
      setSendSuccess(false);
      setActiveMessage(null);
    }, 1500);
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('آیا از حذف این پیام اطمینان دارید؟')) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (activeMessage?.id === id) setActiveMessage(null);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchSearch =
      m.senderName.includes(searchTerm) ||
      m.subject.includes(searchTerm) ||
      m.messageText.includes(searchTerm) ||
      m.senderPhone.includes(searchTerm);
    const matchStatus = statusFilter === 'همه' || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">مجموع پیام‌های دریافتی</span>
            <span className="text-2xl font-black text-[#0B132B] dark:text-white font-mono mt-1 block">
              {totalCount}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Inbox className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">پیام‌های جدید (خوانده‌نشده)</span>
            <span className="text-2xl font-black text-amber-500 font-mono mt-1 block">
              {unreadCount}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">پاسخ‌داده‌شده به موکل</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">
              {repliedCount}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold block">پیام‌های دارای فوریت حقوقی</span>
            <span className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono mt-1 block">
              {urgentCount}
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Messages List & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0B132B] rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white font-serif">
              صندوق پیام‌های ورودی موکلین (SPEC Part 5.5 & 6.5)
            </h3>
            <span className="text-xs text-gray-400">{filteredMessages.length} پیام</span>
          </div>

          {/* Filter & Search */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو در پیام‌ها..."
                className="w-full pr-8 pl-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1.5 px-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-800 dark:text-gray-200"
            >
              <option value="همه">همه وضعیت‌ها</option>
              <option value="خوانده‌نشده">خوانده‌نشده</option>
              <option value="در حال بررسی">در حال بررسی</option>
              <option value="پاسخ‌داده‌شده">پاسخ‌داده‌شده</option>
            </select>
          </div>

          {/* Items */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleOpenMessage(msg)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  activeMessage?.id === msg.id
                    ? 'border-[#D4AF37] bg-amber-500/5 dark:bg-amber-500/10'
                    : msg.status === 'خوانده‌نشده'
                    ? 'border-blue-300 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20 hover:border-gray-300'
                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-gray-900 dark:text-white">
                      {msg.senderName}
                    </span>
                    {msg.isUrgent && (
                      <span className="px-1.5 py-0.5 rounded-md bg-rose-500/10 text-rose-600 text-[10px] font-bold">
                        فوری
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {msg.receivedDate} ساعت {msg.receivedTime}
                  </span>
                </div>

                <div className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">
                  {msg.subject}
                </div>

                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1">
                  {msg.messageText}
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/60 text-[10px]">
                  <span className="text-gray-400 font-mono">{msg.senderPhone}</span>
                  <div>
                    {msg.status === 'خوانده‌نشده' && (
                      <span className="text-amber-500 font-bold">جدید (خوانده‌نشده)</span>
                    )}
                    {msg.status === 'در حال بررسی' && (
                      <span className="text-blue-500">در حال بررسی</span>
                    )}
                    {msg.status === 'پاسخ‌داده‌شده' && (
                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> پاسخ داده شد
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Details & Reply Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0B132B] rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm">
          {activeMessage ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                    {activeMessage.senderName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                      {activeMessage.senderName}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {activeMessage.senderEmail}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteMessage(activeMessage.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500"
                  title="حذف پیام"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800/50 p-3.5 rounded-xl space-y-2">
                <div className="text-xs font-bold text-[#D4AF37]">
                  {activeMessage.subject}
                </div>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {activeMessage.messageText}
                </p>
                <div className="text-[10px] text-gray-400 font-mono pt-1">
                  تلفن تماس: {activeMessage.senderPhone}
                </div>
              </div>

              {activeMessage.repliedText && (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-200 space-y-1">
                  <span className="font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> پاسخ ارسال شده به موکل:
                  </span>
                  <p className="text-[11px] leading-relaxed">{activeMessage.repliedText}</p>
                </div>
              )}

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="space-y-3 pt-2">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                  ارسال پاسخ رسمی به ایمیل و پیامک موکل:
                </label>
                <textarea
                  rows={4}
                  required
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="متن پاسخ و تعیین وقت را در اینجا وارد نمایید..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> ارسال با سربرگ دیجیتال وکیل
                  </span>
                  <button
                    type="submit"
                    className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    {sendSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>ارسال شد!</span>
                      </>
                    ) : (
                      <>
                        <Reply className="w-3.5 h-3.5" />
                        <span>ارسال پاسخ فوری</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-20 text-center text-gray-400 text-xs">
              <Mail className="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
              <span>برای مشاهده متن پیام و ارسال پاسخ، روی یکی از موارد لیست کلیک کنید.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
