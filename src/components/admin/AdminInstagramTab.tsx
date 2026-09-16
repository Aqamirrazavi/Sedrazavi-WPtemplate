import React, { useState } from 'react';
import {
  LawyerSiteProfile,
  saveLawyerProfile,
} from '../../utils/lawyerCustomizationStorage';
import {
  Instagram,
  Key,
  Image as ImageIcon,
  Sliders,
  Check,
  PlusCircle,
  Trash2,
  ExternalLink,
  Eye,
  Heart,
  Save,
  Video,
  RefreshCw,
} from 'lucide-react';

interface AdminInstagramTabProps {
  profile: LawyerSiteProfile;
  onUpdateProfile: (updated: LawyerSiteProfile) => void;
}

export const AdminInstagramTab: React.FC<AdminInstagramTabProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'api' | 'posts' | 'display'>('posts');

  const [instagram, setInstagram] = useState(
    profile.instagramIntegration || {
      username: 'Dr_SedRazavi_Law',
      accessToken: 'IGQVJYeE9...',
      isConnected: true,
      autoSync: true,
      columnsDesktop: 4,
      columnsMobile: 2,
      showLikes: true,
      posts: [],
    }
  );

  // Form for new post
  const [newPostImage, setNewPostImage] = useState('');
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostLikes, setNewPostLikes] = useState(1200);
  const [newPostViews, setNewPostViews] = useState(8500);
  const [newPostUrl, setNewPostUrl] = useState('https://instagram.com/Dr_SedRazavi_Law');
  const [newPostIsVideo, setNewPostIsVideo] = useState(false);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSaveAll = () => {
    const updated: LawyerSiteProfile = {
      ...profile,
      instagramIntegration: instagram,
    };
    saveLawyerProfile(updated);
    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostImage.trim() || !newPostCaption.trim()) return;

    const newPost = {
      id: `post-${Date.now()}`,
      imageUrl: newPostImage.trim(),
      caption: newPostCaption.trim(),
      likes: Number(newPostLikes) || 0,
      views: Number(newPostViews) || 0,
      postUrl: newPostUrl.trim() || 'https://instagram.com/Dr_SedRazavi_Law',
      isVideo: newPostIsVideo,
      date: new Intl.DateTimeFormat('fa-IR').format(new Date()),
    };

    const updatedPosts = [newPost, ...(instagram.posts || [])];
    const updated = { ...instagram, posts: updatedPosts };
    setInstagram(updated);

    const updatedProfile: LawyerSiteProfile = {
      ...profile,
      instagramIntegration: updated,
    };
    saveLawyerProfile(updatedProfile);
    onUpdateProfile(updatedProfile);

    setNewPostImage('');
    setNewPostCaption('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDeletePost = (id: string) => {
    const updatedPosts = instagram.posts.filter((p) => p.id !== id);
    const updated = { ...instagram, posts: updatedPosts };
    setInstagram(updated);

    const updatedProfile: LawyerSiteProfile = {
      ...profile,
      instagramIntegration: updated,
    };
    saveLawyerProfile(updatedProfile);
    onUpdateProfile(updatedProfile);
  };

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      alert('همگام‌سازی با سرور کش اینستاگرام با موفقیت انجام شد و آخرین پست‌ها فراخوانی شدند.');
    }, 1200);
  };

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <Instagram className="w-6 h-6 text-pink-500" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
              مدیریت گالری اینستاگرام و ویدئوهای حقوقی (فاز ۳)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            تنظیم توکن اختصاصی، ورود دستی پست‌ها با عکس/کاور ویدئو، آمار بازدید و ستون‌بندی رسانه‌ها.
          </p>
        </div>

        {/* 3 Subtabs Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveSubTab('posts')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'posts'
                ? 'bg-white dark:bg-[#0B132B] text-pink-600 dark:text-pink-400 shadow-sm border border-pink-500/30'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>۱. مدیریت پست‌ها ({instagram.posts?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('api')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'api'
                ? 'bg-white dark:bg-[#0B132B] text-amber-600 dark:text-amber-300 shadow-sm border border-amber-500/30'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>۲. تنظیمات API اینستاگرام</span>
          </button>

          <button
            onClick={() => setActiveSubTab('display')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'display'
                ? 'bg-white dark:bg-[#0B132B] text-indigo-600 dark:text-indigo-400 shadow-sm border border-indigo-500/30'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>۳. تنظیمات نمایش</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>تغییرات گالری اینستاگرام با موفقیت ذخیره شد.</span>
        </div>
      )}

      {/* 1. Manual Posts Management */}
      {activeSubTab === 'posts' && (
        <div className="space-y-6">
          {/* Add post form */}
          <form
            onSubmit={handleAddPost}
            className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B] dark:text-white">
              <PlusCircle className="w-4 h-4 text-pink-500" />
              <span>افزودن پست یا ویدئوی جدید به گالری وکیل:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="آدرس تصویر یا کاور ویدئو (URL)"
                value={newPostImage}
                onChange={(e) => setNewPostImage(e.target.value)}
                required
                className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-mono"
              />
              <input
                type="text"
                placeholder="لینک مستقیم پست اینستاگرام (https://instagram.com/p/...)"
                value={newPostUrl}
                onChange={(e) => setNewPostUrl(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <textarea
                rows={2}
                placeholder="متن کپشن یا توضیح کوتاه پست حقوقی..."
                value={newPostCaption}
                onChange={(e) => setNewPostCaption(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div>
                <label className="text-[11px] font-bold text-gray-500 block mb-1">
                  تعداد لایک نمایشی:
                </label>
                <input
                  type="number"
                  value={newPostLikes}
                  onChange={(e) => setNewPostLikes(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-500 block mb-1">
                  تعداد بازدید (برای ویدئو):
                </label>
                <input
                  type="number"
                  value={newPostViews}
                  onChange={(e) => setNewPostViews(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-mono"
                />
              </div>

              <div className="pt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPostIsVideo}
                    onChange={(e) => setNewPostIsVideo(e.target.checked)}
                    className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-pink-500" />
                    <span>محتوای ویدئویی (Reels / IGTV)</span>
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>افزودن این پست به گالری</span>
            </button>
          </form>

          {/* Posts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {instagram.posts?.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800/80 shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-square">
                  <img
                    src={post.imageUrl}
                    alt="Instagram post"
                    className="w-full h-full object-cover"
                  />
                  {post.isVideo && (
                    <span className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-sm">
                      <Video className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="absolute top-2 left-2 p-1.5 rounded-lg bg-red-600/80 text-white hover:bg-red-700"
                    title="حذف پست"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                  <p className="text-[11px] text-gray-700 dark:text-gray-300 line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1 text-pink-600 font-mono">
                      <Heart className="w-3 h-3 fill-current" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Eye className="w-3 h-3" />
                      {post.views}
                    </span>
                    <a
                      href={post.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-500 hover:underline flex items-center gap-0.5"
                    >
                      <span>لینک</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Instagram API Settings */}
      {activeSubTab === 'api' && (
        <div className="space-y-4 max-w-xl">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong>تنظیمات وب‌سرویس اینستاگرام:</strong> با اتصال Access Token بلندمدت، پست‌های جدید پیج @Dr_SedRazavi_Law به صورت خودکار در وبلاگ بارگذاری می‌شوند.
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              نام کاربری پیج اینستاگرام (Username):
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-mono">@</span>
              <input
                type="text"
                value={instagram.username}
                onChange={(e) =>
                  setInstagram({ ...instagram, username: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              توکن دسترسی Graph API (Long-Lived User Access Token):
            </label>
            <input
              type="password"
              value={instagram.accessToken}
              onChange={(e) =>
                setInstagram({ ...instagram, accessToken: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={instagram.autoSync}
                onChange={(e) =>
                  setInstagram({ ...instagram, autoSync: e.target.checked })
                }
                className="w-4 h-4 rounded text-[#D4AF37]"
              />
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                همگام‌سازی خودکار کش تصاویر هر ۲۴ ساعت
              </span>
            </label>

            <button
              onClick={handleSimulateSync}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'در حال همگام‌سازی...' : 'بروزرسانی کش اینستاگرام'}</span>
            </button>
          </div>

          <button
            onClick={handleSaveAll}
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 mt-4"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره تنظیمات API</span>
          </button>
        </div>
      )}

      {/* 3. Display Settings */}
      {activeSubTab === 'display' && (
        <div className="space-y-4 max-w-xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                تعداد ستون‌ها در دسکتاپ:
              </label>
              <select
                value={instagram.columnsDesktop}
                onChange={(e) =>
                  setInstagram({
                    ...instagram,
                    columnsDesktop: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs"
              >
                <option value={3}>۳ ستون</option>
                <option value={4}>۴ ستون (پیش‌فرض استاندارد)</option>
                <option value={5}>۵ ستون</option>
                <option value={6}>۶ ستون متراکم</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                تعداد ستون‌ها در موبایل:
              </label>
              <select
                value={instagram.columnsMobile}
                onChange={(e) =>
                  setInstagram({
                    ...instagram,
                    columnsMobile: Number(e.target.value),
                  })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs"
              >
                <option value={1}>۱ ستون بزرگ</option>
                <option value={2}>۲ ستون در کنار هم (پیش‌فرض)</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={instagram.showLikes}
              onChange={(e) =>
                setInstagram({ ...instagram, showLikes: e.target.checked })
              }
              className="w-4 h-4 rounded text-[#D4AF37]"
            />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
              نمایش آمار لایک‌ها و بازدیدها روی کارت پست‌ها
            </span>
          </label>

          <button
            onClick={handleSaveAll}
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 mt-4"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره تنظیمات نمایش گالری</span>
          </button>
        </div>
      )}
    </div>
  );
};
