import React, { useState } from 'react';
import { CommentItem } from '../types/theme';
import { COMMENTS_INITIAL_DATA } from '../data/mockData';
import {
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Trash2,
  ShieldAlert,
  Search,
  Filter,
  Edit3,
  CornerDownLeft,
  Star,
  User,
  Mail,
  Calendar,
  Clock,
  RotateCcw,
  Sparkles,
  Save,
  X,
  ExternalLink,
  ThumbsUp,
} from 'lucide-react';

interface FrontendCommentsModerationProps {
  onNavigateToPost?: (postId: string, postType: 'article' | 'video' | 'service') => void;
}

export const FrontendCommentsModeration: React.FC<FrontendCommentsModerationProps> = ({
  onNavigateToPost,
}) => {
  const [comments, setComments] = useState<CommentItem[]>(COMMENTS_INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'all' | 'approved' | 'pending' | 'spam' | 'trash'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommentIds, setSelectedCommentIds] = useState<string[]>([]);
  
  // Inline edit state
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editAuthor, setEditAuthor] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editRating, setEditRating] = useState<number | undefined>(5);

  // Inline reply state
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Actions
  const handleApprove = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: 'approved' } : c))
    );
    showToast('دیدگاه با موفقیت تأیید و منتشر گردید.');
  };

  const handleUnapprove = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: 'pending' } : c))
    );
    showToast('دیدگاه به وضعیت «در انتظار بررسی» منتقل شد.');
  };

  const handleMarkAsSpam = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: 'spam' } : c))
    );
    showToast('دیدگاه به عنوان هرزنامه (اسپم) علامت‌گذاری شد.');
  };

  const handleMoveToTrash = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: 'trash' } : c))
    );
    showToast('دیدگاه به زباله‌دان منتقل گردید.');
  };

  const handleRestore = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: 'approved' } : c))
    );
    showToast('دیدگاه بازیابی و مجدداً منتشر شد.');
  };

  const handleDeletePermanently = (id: string) => {
    if (window.confirm('آیا از حذف دائمی این دیدگاه اطمینان دارید؟ این عمل غیرقابل بازگشت است.')) {
      setComments(comments.filter((c) => c.id !== id));
      showToast('دیدگاه برای همیشه حذف گردید.');
    }
  };

  // Start Edit
  const startEdit = (c: CommentItem) => {
    setEditingCommentId(c.id);
    setEditAuthor(c.author);
    setEditContent(c.content);
    setEditRating(c.rating || 5);
  };

  const saveEdit = (id: string) => {
    setComments(
      comments.map((c) =>
        c.id === id
          ? {
              ...c,
              author: editAuthor,
              content: editContent,
              rating: editRating,
            }
          : c
      )
    );
    setEditingCommentId(null);
    showToast('تغییرات متن دیدگاه با موفقیت ذخیره گردید.');
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
  };

  // Submit Lawyer Reply
  const submitReply = (parentComment: CommentItem) => {
    if (!replyText.trim()) return;

    const newReply: CommentItem = {
      id: `comm-rep-${Date.now()}`,
      author: 'دکتر سیده مریم رضوی (پاسخ رسمی وکیل)',
      authorEmail: 'info@sedrazavi.law',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
      content: replyText,
      date: 'لحظاتی پیش (هم‌اکنون)',
      postTitle: parentComment.postTitle,
      postType: parentComment.postType,
      postId: parentComment.postId,
      status: 'approved',
      likes: 0,
      parentCommentId: parentComment.id,
    };

    setComments(
      comments.map((c) => {
        if (c.id === parentComment.id) {
          return {
            ...c,
            status: 'approved', // auto-approve parent when lawyer replies
            replies: [...(c.replies || []), newReply],
          };
        }
        return c;
      })
    );

    setReplyingCommentId(null);
    setReplyText('');
    showToast('پاسخ تخصصی وکیل با موفقیت ثبت و پیوست گردید.');
  };

  // Batch actions
  const handleBatchApprove = () => {
    setComments(
      comments.map((c) =>
        selectedCommentIds.includes(c.id) ? { ...c, status: 'approved' } : c
      )
    );
    setSelectedCommentIds([]);
    showToast(`${selectedCommentIds.length} دیدگاه انتخاب‌شده تأیید شدند.`);
  };

  const handleBatchSpam = () => {
    setComments(
      comments.map((c) =>
        selectedCommentIds.includes(c.id) ? { ...c, status: 'spam' } : c
      )
    );
    setSelectedCommentIds([]);
    showToast(`${selectedCommentIds.length} دیدگاه به هرزنامه منتقل شدند.`);
  };

  const handleBatchTrash = () => {
    setComments(
      comments.map((c) =>
        selectedCommentIds.includes(c.id) ? { ...c, status: 'trash' } : c
      )
    );
    setSelectedCommentIds([]);
    showToast(`${selectedCommentIds.length} دیدگاه به زباله‌دان منتقل شدند.`);
  };

  const toggleSelectAll = () => {
    if (selectedCommentIds.length === filteredComments.length) {
      setSelectedCommentIds([]);
    } else {
      setSelectedCommentIds(filteredComments.map((c) => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedCommentIds.includes(id)) {
      setSelectedCommentIds(selectedCommentIds.filter((item) => item !== id));
    } else {
      setSelectedCommentIds([...selectedCommentIds, id]);
    }
  };

  // Counts
  const counts = {
    all: comments.length,
    approved: comments.filter((c) => c.status === 'approved').length,
    pending: comments.filter((c) => c.status === 'pending').length,
    spam: comments.filter((c) => c.status === 'spam').length,
    trash: comments.filter((c) => c.status === 'trash').length,
  };

  // Filtered comments
  const filteredComments = comments.filter((c) => {
    const matchesTab = activeTab === 'all' || c.status === activeTab;
    const matchesSearch =
      c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.authorEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.postTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 text-right" id="template-comments-moderation">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B132B] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#D4AF37] flex items-center gap-2.5 animate-in slide-in-from-bottom-3 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-[#D4AF37]" />
              <span>مدیریت دیدگاه‌ها و پرسش‌های حقوقی</span>
            </h2>
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold">
              template-comments.php
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            بررسی، تأیید، ویرایش، علامت‌گذاری اسپم و پاسخ مستقیم به موکلین از طریق رابط کاربری فرانت‌اند وردپرس.
          </p>
        </div>

        {/* Action Highlights */}
        <div className="flex items-center gap-2">
          {counts.pending > 0 && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-500/30 animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              <span>{counts.pending} دیدگاه نیازمند بازبینی</span>
            </span>
          )}
        </div>
      </div>

      {/* 4 Summary Stat Mini-Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400">کل دیدگاه‌ها</span>
            <p className="text-xl font-bold font-serif text-[#0B132B] dark:text-white mt-0.5">
              {counts.all}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400">منتشر شده</span>
            <p className="text-xl font-bold font-serif text-emerald-600 mt-0.5">
              {counts.approved}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400">در انتظار تأیید</span>
            <p className="text-xl font-bold font-serif text-amber-600 mt-0.5">
              {counts.pending}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gray-400">هرزنامه و زباله‌دان</span>
            <p className="text-xl font-bold font-serif text-red-600 mt-0.5">
              {counts.spam + counts.trash}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-600 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Tabs & Search Filter Bar */}
      <div className="bg-white dark:bg-[#0B132B] p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-[#0B132B] dark:bg-white text-white dark:text-[#0B132B] shadow'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span>همه</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 dark:bg-black/20">
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('approved')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'approved'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span>تأیید شده</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20">
                {counts.approved}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pending')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'pending'
                  ? 'bg-amber-500 text-white shadow'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span>در انتظار ({counts.pending})</span>
            </button>

            <button
              onClick={() => setActiveTab('spam')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'spam'
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span>هرزنامه ({counts.spam})</span>
            </button>

            <button
              onClick={() => setActiveTab('trash')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'trash'
                  ? 'bg-gray-700 text-white shadow'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              <span>زباله‌دان ({counts.trash})</span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو بر اساس نام، ایمیل، متن یا عنوان مطلب..."
              className="w-full sm:w-80 pl-4 pr-9 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
            />
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
          </div>

        </div>

        {/* Batch Actions Bar (when items selected) */}
        {selectedCommentIds.length > 0 && (
          <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
            <span className="text-xs font-bold text-[#0B132B] dark:text-white">
              {selectedCommentIds.length} دیدگاه انتخاب شده است:
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBatchApprove}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>تأیید دسته‌جمعی</span>
              </button>

              <button
                onClick={handleBatchSpam}
                className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>نشانه‌گذاری اسپم</span>
              </button>

              <button
                onClick={handleBatchTrash}
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>انتقال به زباله‌دان</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Comments List */}
      <div className="space-y-4">
        
        {/* Select All Row */}
        {filteredComments.length > 0 && (
          <div className="flex items-center justify-between px-2 text-xs text-gray-500 dark:text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={
                  selectedCommentIds.length > 0 &&
                  selectedCommentIds.length === filteredComments.length
                }
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span className="font-bold">انتخاب همه دیدگاه‌های این برگه</span>
            </label>
            <span>نمایش {filteredComments.length} دیدگاه</span>
          </div>
        )}

        {filteredComments.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-[#0B132B] rounded-3xl border border-gray-200 dark:border-gray-800 space-y-3">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto text-gray-400">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">
              هیچ دیدگاهی در این بخش یافت نشد.
            </h3>
            <p className="text-xs text-gray-400">
              می‌توانید فیلتر جستجو را پاک کنید یا تب دیگری را انتخاب نمایید.
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="btn-gold text-xs px-4 py-2 rounded-xl mt-2"
              >
                پاک کردن جستجو
              </button>
            )}
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`p-5 rounded-2xl bg-white dark:bg-[#0B132B] border transition-all ${
                selectedCommentIds.includes(comment.id)
                  ? 'border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]'
                  : comment.status === 'pending'
                  ? 'border-amber-300 dark:border-amber-700/60 bg-amber-50/20 dark:bg-amber-950/10'
                  : comment.status === 'spam'
                  ? 'border-red-300 dark:border-red-800/40 bg-red-50/20 dark:bg-red-950/10'
                  : 'border-gray-200 dark:border-gray-800'
              }`}
            >
              
              {/* Comment Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800/80">
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedCommentIds.includes(comment.id)}
                    onChange={() => toggleSelect(comment.id)}
                    className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                  />

                  {comment.avatar ? (
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#0B132B] text-[#D4AF37] flex items-center justify-center font-bold text-sm">
                      {comment.author.charAt(0)}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-[#0B132B] dark:text-white">
                        {comment.author}
                      </span>
                      
                      {/* Status Badge */}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          comment.status === 'approved'
                            ? 'bg-emerald-500/15 text-emerald-600'
                            : comment.status === 'pending'
                            ? 'bg-amber-500/15 text-amber-600 animate-pulse'
                            : comment.status === 'spam'
                            ? 'bg-red-500/15 text-red-600'
                            : 'bg-gray-500/15 text-gray-500'
                        }`}
                      >
                        {comment.status === 'approved'
                          ? 'تأیید شده'
                          : comment.status === 'pending'
                          ? 'در انتظار بررسی'
                          : comment.status === 'spam'
                          ? 'اسپم'
                          : 'زباله‌دان'}
                      </span>

                      {comment.rating && (
                        <span className="flex items-center text-amber-400 text-xs">
                          {Array.from({ length: comment.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="font-mono">{comment.authorEmail}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{comment.date}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Target Post Context */}
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/60 px-3 py-1.5 rounded-xl text-xs border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300">
                  <span className="text-[10px] text-gray-400">مربوط به:</span>
                  <span className="font-bold truncate max-w-[220px]">
                    {comment.postTitle}
                  </span>
                </div>

              </div>

              {/* Comment Content / Inline Edit Form */}
              <div className="py-4">
                {editingCommentId === comment.id ? (
                  <div className="space-y-3 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-[#D4AF37]/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1">
                          نام نویسنده دیدگاه:
                        </label>
                        <input
                          type="text"
                          value={editAuthor}
                          onChange={(e) => setEditAuthor(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs text-right"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1">
                          امتیاز ستاره‌ای (۱ تا ۵):
                        </label>
                        <select
                          value={editRating}
                          onChange={(e) => setEditRating(Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs text-right"
                        >
                          <option value={5}>⭐⭐⭐⭐⭐ (۵ ستاره - عالی)</option>
                          <option value={4}>⭐⭐⭐⭐ (۴ ستاره - خیلی خوب)</option>
                          <option value={3}>⭐⭐⭐ (۳ ستاره - متوسط)</option>
                          <option value={2}>⭐⭐ (۲ ستاره)</option>
                          <option value={1}>⭐ (۱ ستاره)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-600 dark:text-gray-300 mb-1">
                        متن دیدگاه:
                      </label>
                      <textarea
                        rows={3}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs text-right leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={cancelEdit}
                        className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200"
                      >
                        انصراف
                      </button>
                      <button
                        onClick={() => saveEdit(comment.id)}
                        className="btn-gold px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>ذخیره تغییرات</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    {comment.content}
                  </p>
                )}
              </div>

              {/* Nested Replies Display */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mr-6 mb-3 pl-2 pr-4 py-3 bg-[#0B132B]/5 dark:bg-[#D4AF37]/5 border-r-2 border-r-[#D4AF37] rounded-xl space-y-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#D4AF37]">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          {reply.author}
                        </span>
                        <span className="text-[10px] text-gray-400 font-normal">
                          {reply.date}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed pr-5">
                        {reply.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Inline Reply Form */}
              {replyingCommentId === comment.id && (
                <div className="mr-6 mb-4 p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/60 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                      <CornerDownLeft className="w-4 h-4 text-[#D4AF37]" />
                      <span>پاسخ رسمی به عنوان سرکار خانم دکتر رضوی:</span>
                    </span>
                    <button
                      onClick={() => setReplyingCommentId(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="پاسخ و تحلیل حقوقی خود را اینجا بنویسید..."
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-xs focus:outline-none focus:border-[#D4AF37] dark:text-white"
                  />

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => setReplyingCommentId(null)}
                      className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200"
                    >
                      لغو
                    </button>
                    <button
                      onClick={() => submitReply(comment)}
                      className="btn-gold px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>انتشار پاسخ وکیل</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs">
                
                {/* Left side actions: Approve, Unapprove, Reply, Edit */}
                <div className="flex items-center gap-1.5">
                  {comment.status !== 'approved' ? (
                    <button
                      onClick={() => handleApprove(comment.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>تأیید و انتشار</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnapprove(comment.id)}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-600 dark:text-gray-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>عدم تأیید</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setReplyingCommentId(comment.id);
                      setReplyText('');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#AA820A] dark:text-[#F3E5AB] font-bold flex items-center gap-1 transition-colors"
                  >
                    <CornerDownLeft className="w-3.5 h-3.5" />
                    <span>پاسخ وکیل</span>
                  </button>

                  <button
                    onClick={() => startEdit(comment)}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-600 dark:text-gray-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>ویرایش</span>
                  </button>
                </div>

                {/* Right side actions: Spam, Trash, Restore, Permanent Delete */}
                <div className="flex items-center gap-1.5">
                  {comment.status === 'trash' || comment.status === 'spam' ? (
                    <>
                      <button
                        onClick={() => handleRestore(comment.id)}
                        className="px-2.5 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>بازیابی</span>
                      </button>
                      <button
                        onClick={() => handleDeletePermanently(comment.id)}
                        className="px-2.5 py-1 rounded-lg bg-red-500/15 hover:bg-red-500/25 text-red-600 dark:text-red-400 font-bold flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>حذف قطعی</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleMarkAsSpam(comment.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors"
                        title="علامت‌گذاری به عنوان هرزنامه (اسپم)"
                      >
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveToTrash(comment.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        title="انتقال به زباله‌دان"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};
