import React, { useState, useRef } from 'react';
import { ArticleItem, VideoItem, CommentItem } from '../types/theme';
import { ARTICLES_DATA, VIDEOS_DATA, COMMENTS_INITIAL_DATA } from '../data/mockData';
import {
  BookOpen,
  Video,
  Calendar,
  Clock,
  Eye,
  Share2,
  Printer,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  ThumbsUp,
  MessageSquare,
  Send,
  Star,
  Scale,
  ShieldCheck,
  PhoneCall,
  User,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  FileText,
  Copy,
  Check,
} from 'lucide-react';

interface SingleContentViewProps {
  contentId: string;
  contentType: 'article' | 'video';
  onBackToArchive: () => void;
  onSelectArticle?: (id: string) => void;
  onSelectVideo?: (id: string) => void;
  onOpenBooking?: () => void;
}

export const SingleContentView: React.FC<SingleContentViewProps> = ({
  contentId,
  contentType,
  onBackToArchive,
  onSelectArticle,
  onSelectVideo,
  onOpenBooking,
}) => {
  // Find active article or video
  const article: ArticleItem | undefined =
    contentType === 'article'
      ? ARTICLES_DATA.find((a) => a.id === contentId) || ARTICLES_DATA[0]
      : undefined;

  const video: VideoItem | undefined =
    contentType === 'video'
      ? VIDEOS_DATA.find((v) => v.id === contentId) || VIDEOS_DATA[0]
      : undefined;

  // Comments for this specific content
  const [comments, setComments] = useState<CommentItem[]>(() =>
    COMMENTS_INITIAL_DATA.filter((c) => c.postId === contentId || c.postType === contentType)
  );

  // New Comment Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Video Player state (for video type)
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  // Toast / Copy Feedback
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const seekTo = (seconds: number, index: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
      setIsPlaying(true);
      setActiveChapterIndex(index);
    }
  };

  // Comment submission
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newContent.trim()) return;

    const newComment: CommentItem = {
      id: `comm-user-${Date.now()}`,
      author: newAuthor,
      authorEmail: newEmail || 'user@example.com',
      content: newContent,
      date: 'هم‌اکنون (در انتظار تأیید وکیل)',
      postTitle: article ? article.title : video ? video.title : '',
      postType: contentType,
      postId: contentId,
      status: 'pending',
      rating: newRating,
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setCommentSubmitted(true);
    setNewAuthor('');
    setNewEmail('');
    setNewContent('');
  };

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((c) => (c.id === commentId ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  // Related content
  const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== contentId).slice(0, 3);
  const relatedVideos = VIDEOS_DATA.filter((v) => v.id !== contentId).slice(0, 3);

  const title = article ? article.title : video?.title || '';
  const category = article ? article.category : video?.category || '';
  const date = article ? article.date : video?.date || '';
  const views = article ? article.views : video?.views || 0;
  const summary = article ? article.summary : video?.summary || '';
  const tags = article ? article.tags : video?.tags || [];

  return (
    <div className="space-y-8 text-right" id="wordpress-single-template">
      
      {/* Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 text-xs shadow-sm">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <button
            onClick={onBackToArchive}
            className="hover:text-[#D4AF37] font-semibold transition-colors"
          >
            صفحه اصلی
          </button>
          <span>/</span>
          <button
            onClick={onBackToArchive}
            className="hover:text-[#D4AF37] font-semibold transition-colors"
          >
            {contentType === 'article' ? 'آرشیو مقالات' : 'آرشیو ویدئوها'}
          </button>
          <span>/</span>
          <span className="text-[#D4AF37] font-bold truncate max-w-xs sm:max-w-md">
            {title}
          </span>
        </div>

        <button
          onClick={onBackToArchive}
          className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
          <span>بازگشت به آرشیو</span>
        </button>
      </div>

      {/* Main Grid: 8 Cols Content + 4 Cols Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#AA820A] dark:text-[#F3E5AB] text-xs font-bold">
                  {category}
                </span>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-400">
                  {contentType === 'article' ? 'single.php' : 'single-video.php'}
                </span>
              </div>

              {/* Action Tools */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/20 text-gray-600 dark:text-gray-300 transition-colors"
                  title="کپی لینک مطلب"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/20 text-gray-600 dark:text-gray-300 transition-colors"
                  title="چاپ مقاله"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h1 className="text-xl sm:text-3xl font-bold font-serif text-[#0B132B] dark:text-white leading-relaxed">
              {title}
            </h1>

            {/* Author & Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
              
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
                  alt="دکتر سیده مریم رضوی"
                  className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/40"
                />
                <div>
                  <span className="block font-bold text-[#0B132B] dark:text-white text-xs">
                    دکتر سیده مریم رضوی
                  </span>
                  <span className="text-[11px] text-[#D4AF37]">وکیل پایه یک دادگستری و پژوهشگر</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{date}</span>
                </span>
                {contentType === 'article' && article?.readTime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{article.readTime}</span>
                  </span>
                )}
                {contentType === 'video' && video?.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#2A9D8F]" />
                    <span>مدت: {video.duration}</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-gray-400" />
                  <span>{views.toLocaleString('fa-IR')} بازدید</span>
                </span>
              </div>

            </div>

          </div>

          {/* Video Player Box (if video content) */}
          {contentType === 'video' && video && (
            <div className="p-6 rounded-3xl bg-[#0B132B] text-white border border-[#D4AF37]/30 shadow-xl space-y-4">
              
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={video.videoUrl}
                  poster={video.thumbnail}
                  className="w-full h-full object-contain"
                  onEnded={() => setIsPlaying(false)}
                />

                {/* Overlay Play/Pause Trigger */}
                <div
                  onClick={togglePlay}
                  className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-opacity ${
                    isPlaying ? 'opacity-0 hover:opacity-100 bg-black/40' : 'bg-black/50 opacity-100'
                  }`}
                >
                  <button className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#0B132B] flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform">
                    {isPlaying ? (
                      <Pause className="w-7 h-7 fill-[#0B132B]" />
                    ) : (
                      <Play className="w-7 h-7 fill-[#0B132B] ml-1" />
                    )}
                  </button>
                </div>

                {/* Video Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="text-[#D4AF37] hover:text-white">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button onClick={toggleMute} className="text-gray-300 hover:text-white">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="font-mono text-[11px] text-gray-300">{video.duration}</span>
                  </div>

                  <span className="text-[11px] text-[#D4AF37] font-semibold">
                    کیفیت ۱۰۸۰p HD • پخش اختصاصی
                  </span>
                </div>
              </div>

              {/* Video Chapters Selector */}
              {video.chapters && video.chapters.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-[#D4AF37] flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>فهرست سرفصل‌ها و مباحث این ویدیو (کلیک جهت پرش به بخش):</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {video.chapters.map((chap, idx) => (
                      <button
                        key={idx}
                        onClick={() => seekTo(chap.seconds, idx)}
                        className={`p-2.5 rounded-xl border text-right text-xs transition-all flex items-center justify-between ${
                          activeChapterIndex === idx
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white font-bold'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <span className="truncate max-w-[200px]">{chap.title}</span>
                        <span className="font-mono text-[10px] text-[#D4AF37] px-1.5 py-0.5 rounded bg-black/40">
                          {chap.time}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Article / Video Full Description Body */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 text-sm leading-loose text-gray-800 dark:text-gray-200">
            
            {/* Lead / Summary Box */}
            <div className="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border-r-4 border-r-[#D4AF37] text-gray-900 dark:text-gray-100 font-medium text-xs sm:text-sm">
              <span className="font-bold block mb-1 text-[#AA820A] dark:text-[#F3E5AB]">
                خلاصه اجرایی و پیامد حقوقی:
              </span>
              {summary}
            </div>

            {/* Article Image (if article) */}
            {contentType === 'article' && article?.thumbnail && (
              <div className="rounded-2xl overflow-hidden my-6 border border-gray-200 dark:border-gray-800">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-80 object-cover"
                />
              </div>
            )}

            {/* Structured Text Content */}
            <div className="space-y-4 whitespace-pre-line leading-loose text-justify">
              {article ? article.content : video?.description}
            </div>

            {/* Legal Reference Callout Box */}
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B] dark:text-white">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span>مستند قانونی و رویه قضایی حاکم:</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                طبق موازین قانون آیین دادرسی دادگاه‌های عمومی و انقلاب در امور مدنی و آراء وحدت رویه دیوان عالی کشور، رعایت تشریفات دادرسی و حفظ ادله کتبی، شرط اصلی صدور حکم به نفع خواهان می‌باشد.
              </p>
            </div>

            {/* Video Transcript (if available) */}
            {contentType === 'video' && video?.transcript && (
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                <h4 className="text-xs font-bold text-[#0B132B] dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#2A9D8F]" />
                  <span>متن پیاده‌سازی‌شده ویدیو (Transcript):</span>
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 p-4 rounded-xl leading-relaxed">
                  {video.transcript}
                </p>
              </div>
            )}

            {/* Tags Bar */}
            {tags.length > 0 && (
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-400">برچسب‌ها:</span>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-[#D4AF37]/20 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

          </div>

          {/* Consultation CTA Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0B132B] to-[#1C2541] text-white border border-[#D4AF37]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-right">
              <span className="text-[#D4AF37] text-xs font-bold flex items-center justify-center sm:justify-start gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>بررسی اختصاصی اوراق و مستندات پرونده</span>
              </span>
              <h3 className="text-base font-bold font-serif">
                آیا در این رابطه نیاز به مشاوره یا وکیل دادگستری دارید؟
              </h3>
              <p className="text-xs text-gray-300">
                تعیین وقت فوری با دکتر سیده مریم رضوی به صورت حضوری در دفتر تهران یا آنلاین.
              </p>
            </div>

            <button
              onClick={onOpenBooking}
              className="btn-gold px-5 py-2.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>رزرو جلسه مشاوره</span>
            </button>
          </div>

          {/* Interactive Comments & Q&A Section */}
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-6" id="comments">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                  دیدگاه‌ها و پرسش‌های حقوقی موکلین ({comments.length})
                </h3>
              </div>
              <span className="text-xs text-[#D4AF37] font-semibold">پاسخ‌گویی مستمر توسط وکیل</span>
            </div>

            {/* Comment Submission Form */}
            <form onSubmit={handleSubmitComment} className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-4">
              
              <h4 className="text-xs font-bold text-[#0B132B] dark:text-white">
                ارسال دیدگاه یا سوال پیرامون این مطلب:
              </h4>

              {commentSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>دیدگاه شما با موفقیت ثبت شد و پس از بازبینی وکیل در سایت نمایش داده خواهد شد.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1">
                    نام و نام‌خانوادگی: *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="مثال: علیرضا محمدی"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white text-right"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1">
                    آدرس ایمیل (جهت اطلاع از پاسخ وکیل):
                  </label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white text-left font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1">
                  متن دیدگاه یا سوال حقوقی شما: *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="پرسش یا نظر خود را با رعایت اخلاق حرفه‌ای بنویسید..."
                  className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white text-right leading-relaxed"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500">امتیاز شما به این مطلب:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ثبت و ارسال دیدگاه</span>
                </button>
              </div>

            </form>

            {/* Comments List */}
            <div className="space-y-4 pt-4">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl bg-gray-50/70 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {c.avatar ? (
                        <img
                          src={c.avatar}
                          alt={c.author}
                          className="w-9 h-9 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#0B132B] text-[#D4AF37] flex items-center justify-center font-bold text-xs">
                          {c.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-[#0B132B] dark:text-white">
                            {c.author}
                          </span>
                          {c.status === 'pending' && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 font-bold">
                              در انتظار بررسی
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-gray-400">{c.date}</span>
                      </div>
                    </div>

                    {c.rating && (
                      <div className="flex items-center text-amber-400 text-xs">
                        {Array.from({ length: c.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed pr-11">
                    {c.content}
                  </p>

                  {/* Comment Actions (Like, Reply indicator) */}
                  <div className="flex items-center justify-between pr-11 pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-400">
                    <button
                      onClick={() => handleLikeComment(c.id)}
                      className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{c.likes} پسندیدم</span>
                    </button>

                    <span className="text-[10px] text-gray-400">پاسخ داده شده توسط وکیل</span>
                  </div>

                  {/* Lawyer Reply Nested */}
                  {c.replies && c.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="mr-6 p-3 rounded-xl bg-[#0B132B]/5 dark:bg-[#D4AF37]/5 border-r-2 border-r-[#D4AF37] space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          {reply.author}
                        </span>
                        <span className="text-[10px] text-gray-400 font-normal">
                          {reply.date}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed pr-4">
                        {reply.content}
                      </p>
                    </div>
                  ))}

                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Sidebar (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Lawyer Bio & Direct Call Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm text-center space-y-4">
            <div className="relative inline-block">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                alt="دکتر سیده مریم رضوی"
                className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-[#D4AF37] shadow-lg"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="در دسترس برای مشاوره">
                <Check className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold font-serif text-[#0B132B] dark:text-white">
                دکتر سیده مریم رضوی
              </h4>
              <span className="text-xs text-[#D4AF37] font-semibold block mt-0.5">
                وکیل پایه یک دادگستری و مشاور ارشد حقوقی
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                دارای ۱۸ سال تجربه وکالت در دیوان عالی کشور، دعاوی ملکی کلان، وصول اسناد تجاری و تنظیم قراردادهای شرکتی.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-3">
              <button
                onClick={onOpenBooking}
                className="btn-gold text-xs px-4 py-2 rounded-xl font-bold flex-1"
              >
                رزرو وقت حضوری
              </button>
              <a
                href="tel:02188990011"
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#D4AF37]/20 text-[#0B132B] dark:text-white transition-colors"
                title="تماس مستقیم"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Related Articles / Videos */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
            
            <h4 className="text-sm font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>
                {contentType === 'article' ? 'سایر مقالات مرتبط' : 'سایر ویدیوها و کارگاه‌ها'}
              </span>
            </h4>

            <div className="space-y-3">
              {contentType === 'article'
                ? relatedArticles.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectArticle?.(rel.id)}
                      className="group flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-all"
                    >
                      <img
                        src={rel.thumbnail}
                        alt={rel.title}
                        className="w-16 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1">
                        <span className="text-[10px] text-[#D4AF37] font-semibold">
                          {rel.category}
                        </span>
                        <h5 className="text-xs font-bold text-[#0B132B] dark:text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug mt-0.5">
                          {rel.title}
                        </h5>
                        <span className="text-[10px] text-gray-400 mt-1 block">
                          {rel.readTime}
                        </span>
                      </div>
                    </div>
                  ))
                : relatedVideos.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectVideo?.(rel.id)}
                      className="group flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/60 cursor-pointer transition-all"
                    >
                      <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-black shrink-0">
                        <img
                          src={rel.thumbnail}
                          alt={rel.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 text-white fill-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] text-[#2A9D8F] font-semibold">
                          {rel.category}
                        </span>
                        <h5 className="text-xs font-bold text-[#0B132B] dark:text-white group-hover:text-[#2A9D8F] transition-colors line-clamp-2 leading-snug mt-0.5">
                          {rel.title}
                        </h5>
                        <span className="text-[10px] text-gray-400 mt-1 block font-mono">
                          {rel.duration}
                        </span>
                      </div>
                    </div>
                  ))}
            </div>

          </div>

          {/* Quick Legal Checklist Box */}
          <div className="p-6 rounded-3xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 space-y-3">
            <h4 className="text-xs font-bold text-[#AA820A] dark:text-[#F3E5AB] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>مدارک ضروری هنگام مراجعه به وکیل:</span>
            </h4>
            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1.5 list-disc list-inside leading-relaxed">
              <li>اصل و تصویر کارت ملی و شناسنامه</li>
              <li>قراردادها، مبایعه‌نامه‌ها یا اسناد مالکیت</li>
              <li>اظهارنامه‌های رسمی ارسال‌شده یا ابلاغیه‌ها</li>
              <li>لاشه چک، گواهی عدم پرداخت یا پرینت صیاد</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
