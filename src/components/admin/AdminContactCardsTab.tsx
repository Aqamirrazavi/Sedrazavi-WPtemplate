import React, { useState, useRef } from 'react';
import {
  LawyerSiteProfile,
  saveLawyerProfile,
} from '../../utils/lawyerCustomizationStorage';
import {
  Phone,
  Share2,
  User,
  Users,
  MapPin,
  Save,
  Check,
  PlusCircle,
  Trash2,
  Crosshair,
  ExternalLink,
  Navigation,
  Mail,
  Shield,
  Briefcase,
} from 'lucide-react';

interface AdminContactCardsTabProps {
  profile: LawyerSiteProfile;
  onUpdateProfile: (updated: LawyerSiteProfile) => void;
}

export const AdminContactCardsTab: React.FC<AdminContactCardsTabProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    'main_contact' | 'social' | 'attorney_card' | 'team' | 'map'
  >('main_contact');

  // 1. Main contact state
  const [phone, setPhone] = useState(profile.phone);
  const [mobile, setMobile] = useState(profile.mobile);
  const [email, setEmail] = useState(profile.email);
  const [officeAddress, setOfficeAddress] = useState(profile.officeAddress);
  const [workingHours, setWorkingHours] = useState(profile.workingHours);

  // 2. Social accounts state
  const [socialAccounts, setSocialAccounts] = useState(profile.socialAccounts || []);

  // 3. Attorney Card & Focal Point
  const [lawyerName, setLawyerName] = useState(profile.lawyerName);
  const [lawyerTitle, setLawyerTitle] = useState(profile.lawyerTitle);
  const [licenseNumber, setLicenseNumber] = useState(profile.licenseNumber);
  const [experienceYears, setExperienceYears] = useState(profile.experienceYears);
  const [portraitImage, setPortraitImage] = useState(profile.portraitImage);
  const [focalPoint, setFocalPoint] = useState(profile.focalPoint || { x: 50, y: 25 });

  // 4. Team members state
  const [teamMembers, setTeamMembers] = useState(profile.teamMembers || []);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberTitle, setNewMemberTitle] = useState('');
  const [newMemberLicense, setNewMemberLicense] = useState('');
  const [newMemberPhoto, setNewMemberPhoto] = useState('');
  const [newMemberSpecialty, setNewMemberSpecialty] = useState('');

  // 5. Map & Navigation details
  const [mapDetails, setMapDetails] = useState(
    profile.mapDetails || {
      lat: 35.7592,
      lng: 51.4116,
      zoom: 16,
      addressNotes: 'تهران، میدان ونک، خیابان ملاصدرا، نرسیده به پل کردستان، پلاک ۵۴',
      metroStation: 'ایستگاه مترو میدان حقانی (خط ۱) + خط تاکسی‌های ونک',
      busStation: 'خط اتوبوس تندرو (BRT) راه‌آهن - تجریش، ایستگاه میدان ونک',
      neshanLink: 'https://neshan.org/maps',
      baladLink: 'https://balad.ir',
      googleMapsLink: 'https://maps.google.com/?q=35.7592,51.4116',
    }
  );

  const [savedSuccess, setSavedSuccess] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Focal Point Picker Handler
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setFocalPoint({ x, y });
  };

  const handleSaveAll = () => {
    const updated: LawyerSiteProfile = {
      ...profile,
      phone,
      mobile,
      email,
      officeAddress,
      workingHours,
      socialAccounts,
      lawyerName,
      lawyerTitle,
      licenseNumber,
      experienceYears,
      portraitImage,
      focalPoint,
      teamMembers,
      mapDetails,
    };
    saveLawyerProfile(updated);
    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberTitle.trim()) return;

    const newMember = {
      id: `team-${Date.now()}`,
      name: newMemberName.trim(),
      title: newMemberTitle.trim(),
      licenseNumber: newMemberLicense.trim() || 'در حال دریافت',
      photo:
        newMemberPhoto.trim() ||
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      phone: phone,
      email: email,
      bio: 'عضو تیم وکلای تخصصی دفتر وکالت و داوری دکتر سیده مریم رضوی.',
      specialties: newMemberSpecialty
        ? newMemberSpecialty.split('،').map((s) => s.trim())
        : ['دعاوی حقوقی'],
    };

    const updated = [...teamMembers, newMember];
    setTeamMembers(updated);
    setNewMemberName('');
    setNewMemberTitle('');
    setNewMemberLicense('');
    setNewMemberPhoto('');
    setNewMemberSpecialty('');
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <Phone className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#0B132B] dark:text-white">
              مدیریت اطلاعات تماس، کارت‌ها و نقشه (فاز ۳)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            ویرایش اطلاعات تماس دفتر ونک، شبکه‌ها، نقطه کانونی تصویر وکیل و وکلای همکار.
          </p>
        </div>

        {/* 5 Subtabs Navigation */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveSubTab('main_contact')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'main_contact'
                ? 'bg-white dark:bg-[#0B132B] text-[#D4AF37] shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>۱. اطلاعات تماس</span>
          </button>

          <button
            onClick={() => setActiveSubTab('social')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'social'
                ? 'bg-white dark:bg-[#0B132B] text-sky-600 dark:text-sky-400 shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>۲. شبکه‌های اجتماعی</span>
          </button>

          <button
            onClick={() => setActiveSubTab('attorney_card')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'attorney_card'
                ? 'bg-white dark:bg-[#0B132B] text-amber-600 dark:text-amber-300 shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>۳. کارت وکیل & Focal Point</span>
          </button>

          <button
            onClick={() => setActiveSubTab('team')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'team'
                ? 'bg-white dark:bg-[#0B132B] text-emerald-600 dark:text-emerald-400 shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>۴. کارت همکاران ({teamMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('map')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'map'
                ? 'bg-white dark:bg-[#0B132B] text-red-600 dark:text-red-400 shadow-sm border border-[#D4AF37]/40'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#0B132B]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>۵. نقشه و مسیریابی</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>تغییرات کارت‌ها و اطلاعات تماس با موفقیت ذخیره شد.</span>
        </div>
      )}

      {/* 1. Main Contact Info */}
      {activeSubTab === 'main_contact' && (
        <div className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                تلفن ثابت دفتر ونک:
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                تلفن همراه مستقیم وکیل:
              </label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                پست الکترونیکی رسمی (Email):
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                ساعات حضور و پاسخگویی:
              </label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              نشانی دقیق دفتر وکالت:
            </label>
            <textarea
              rows={2}
              value={officeAddress}
              onChange={(e) => setOfficeAddress(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs leading-relaxed"
            />
          </div>

          <button
            onClick={handleSaveAll}
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره تغییرات تماس</span>
          </button>
        </div>
      )}

      {/* 2. Social Accounts */}
      {activeSubTab === 'social' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-900 dark:text-sky-200">
            <strong>شبکه‌های اجتماعی و پیام‌رسان‌های ایرانی و بین‌المللی:</strong> می‌توانید لینک‌های هر شبکه را ویرایش کرده یا نمایش آن را فعال/غیرفعال کنید.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialAccounts.map((account, idx) => (
              <div
                key={account.id}
                className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/60 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B132B] dark:text-white">
                    {account.title} ({account.platform})
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={account.isActive}
                      onChange={(e) => {
                        const updated = socialAccounts.map((a, i) =>
                          i === idx ? { ...a, isActive: e.target.checked } : a
                        );
                        setSocialAccounts(updated);
                      }}
                      className="w-4 h-4 rounded text-[#D4AF37]"
                    />
                    <span className="text-[11px] font-bold text-gray-500">
                      {account.isActive ? 'فعال' : 'غیرفعال'}
                    </span>
                  </label>
                </div>

                <input
                  type="text"
                  value={account.url}
                  onChange={(e) => {
                    const updated = socialAccounts.map((a, i) =>
                      i === idx ? { ...a, url: e.target.value } : a
                    );
                    setSocialAccounts(updated);
                  }}
                  className="w-full px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-mono"
                  placeholder="https://..."
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveAll}
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره تنظیمات شبکه‌های اجتماعی</span>
          </button>
        </div>
      )}

      {/* 3. Attorney Card & Focal Point */}
      {activeSubTab === 'attorney_card' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200">
            <strong>تنظیم نقطه کانونی (Focal Point Picker):</strong> با کلیک روی هر نقطه از تصویر پرتره وکیل، نقطه کانونی مشخص می‌شود تا در برش‌های مختلف موبایل و کارت‌های فشرده، چهره وکیل همواره در مرکز کادر قرار گیرد.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Visual Focal Point Picker */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                تصویر پرتره رسمی وکیل (روی چهره کلیک کنید):
              </span>

              <div
                onClick={handleImageClick}
                className="relative cursor-crosshair rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-md max-w-sm mx-auto select-none"
              >
                <img
                  ref={imageRef}
                  src={portraitImage}
                  alt={lawyerName}
                  className="w-full h-80 object-cover"
                />

                {/* Crosshair indicator */}
                <div
                  className="absolute w-8 h-8 -ml-4 -mt-4 border-2 border-white rounded-full bg-amber-500/40 shadow-xl flex items-center justify-center pointer-events-none transition-all duration-100"
                  style={{ left: `${focalPoint.x}%`, top: `${focalPoint.y}%` }}
                >
                  <Crosshair className="w-5 h-5 text-white animate-pulse" />
                </div>
              </div>

              <div className="text-center text-xs font-mono text-gray-500">
                مختصات نقطه کانونی: X: <strong className="text-[#D4AF37]">{focalPoint.x}%</strong> | Y: <strong className="text-[#D4AF37]">{focalPoint.y}%</strong>
              </div>
            </div>

            {/* Profile fields */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  نام و نام خانوادگی وکیل:
                </label>
                <input
                  type="text"
                  value={lawyerName}
                  onChange={(e) => setLawyerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  عنوان و سمت رسمی:
                </label>
                <input
                  type="text"
                  value={lawyerTitle}
                  onChange={(e) => setLawyerTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    شماره پروانه وکالت:
                  </label>
                  <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    سابقه وکالت (سال):
                  </label>
                  <input
                    type="number"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  آدرس اینترنتی تصویر پرتره (URL):
                </label>
                <input
                  type="text"
                  value={portraitImage}
                  onChange={(e) => setPortraitImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
                />
              </div>

              <button
                onClick={handleSaveAll}
                className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 mt-4"
              >
                <Save className="w-4 h-4" />
                <span>ذخیره کارت وکیل و نقطه کانونی</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Team / Associate Lawyers Cards */}
      {activeSubTab === 'team' && (
        <div className="space-y-6">
          {/* Add member form */}
          <form
            onSubmit={handleAddTeamMember}
            className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 space-y-4"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B] dark:text-white">
              <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>افزودن وکیل یا مشاور حقوقی جدید به تیم همکاران:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="نام همکار (مثال: دکتر رادمنش)"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                required
                className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs"
              />
              <input
                type="text"
                placeholder="سمت (مثال: مشاور ارشد دعاوی تجاری)"
                value={newMemberTitle}
                onChange={(e) => setNewMemberTitle(e.target.value)}
                required
                className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs"
              />
              <input
                type="text"
                placeholder="شماره پروانه وکالت"
                value={newMemberLicense}
                onChange={(e) => setNewMemberLicense(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-mono"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="لینک تصویر همکار (URL)"
                value={newMemberPhoto}
                onChange={(e) => setNewMemberPhoto(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-mono"
              />
              <input
                type="text"
                placeholder="تخصص‌ها با ویرگول (مثال: داوری تجاری، املاک)"
                value={newMemberSpecialty}
                onChange={(e) => setNewMemberSpecialty(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs"
              />
            </div>

            <button
              type="submit"
              className="btn-gold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>افزودن به لیست همکاران</span>
            </button>
          </form>

          {/* Members list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/70 shadow-sm space-y-3 relative group"
              >
                <button
                  onClick={() => handleDeleteTeamMember(member.id)}
                  className="absolute top-3 left-3 p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  title="حذف همکار"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-12 h-12 rounded-xl object-cover border border-[#D4AF37]/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#0B132B] dark:text-white">
                      {member.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {member.title}
                    </p>
                    <span className="text-[10px] font-mono text-[#D4AF37]">
                      پروانه: {member.licenseNumber}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {member.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[10px] font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSaveAll}
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره نهایی لیست همکاران</span>
          </button>
        </div>
      )}

      {/* 5. Map & Navigation Details */}
      {activeSubTab === 'map' && (
        <div className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                عرض جغرافیایی (Latitude):
              </label>
              <input
                type="number"
                step="0.0001"
                value={mapDetails.lat}
                onChange={(e) =>
                  setMapDetails({ ...mapDetails, lat: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                طول جغرافیایی (Longitude):
              </label>
              <input
                type="number"
                step="0.0001"
                value={mapDetails.lng}
                onChange={(e) =>
                  setMapDetails({ ...mapDetails, lng: Number(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                راهنمای دسترسی با مترو:
              </label>
              <input
                type="text"
                value={mapDetails.metroStation}
                onChange={(e) =>
                  setMapDetails({ ...mapDetails, metroStation: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                راهنمای دسترسی با اتوبوس BRT:
              </label>
              <input
                type="text"
                value={mapDetails.busStation}
                onChange={(e) =>
                  setMapDetails({ ...mapDetails, busStation: e.target.value })
                }
                className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
              لینک مستقیم نقشه گوگل (Google Maps):
            </label>
            <input
              type="text"
              value={mapDetails.googleMapsLink}
              onChange={(e) =>
                setMapDetails({ ...mapDetails, googleMapsLink: e.target.value })
              }
              className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono"
            />
          </div>

          <button
            onClick={handleSaveAll}
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره اطلاعات نقشه و دسترسی</span>
          </button>
        </div>
      )}
    </div>
  );
};
