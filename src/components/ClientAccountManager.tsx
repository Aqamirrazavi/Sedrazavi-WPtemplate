import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  KeyRound,
  Copy,
  Check,
  Search,
  Filter,
  Trash2,
  Edit,
  ShieldCheck,
  Eye,
  EyeOff,
  RefreshCw,
  ExternalLink,
  MessageCircle,
  Send,
  AlertCircle,
  Phone,
  User,
  FileText,
  Clock,
  CheckCircle2,
  Lock,
  Share2,
  Sparkles
} from 'lucide-react';
import {
  ClientAccount,
  getStoredClientAccounts,
  addClientAccount,
  updateClientAccount,
  deleteClientAccount,
  generateRandomPassword,
  normalizeIranPhone
} from '../utils/clientAccountsStorage';
import { ATTORNEY_INFO } from '../data/mockData';

interface ClientAccountManagerProps {
  onSwitchToClientPortal?: (phone: string, name?: string) => void;
}

export const ClientAccountManager: React.FC<ClientAccountManagerProps> = ({
  onSwitchToClientPortal,
}) => {
  const [accounts, setAccounts] = useState<ClientAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending_profile' | 'suspended'>('all');
  
  // Create Account Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newName, setNewName] = useState('');
  const [newLegalTopic, setNewLegalTopic] = useState('دعاوی ملکی و املاک');
  const [newPassword, setNewPassword] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Share Info Modal State
  const [sharedAccount, setSharedAccount] = useState<ClientAccount | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  // Reset Password Modal State
  const [editingAccount, setEditingAccount] = useState<ClientAccount | null>(null);
  const [resetPasswordVal, setResetPasswordVal] = useState('');

  // Delete Confirm Modal State
  const [deletingAccount, setDeletingAccount] = useState<ClientAccount | null>(null);

  // Password visibility map (id -> boolean)
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    setAccounts(getStoredClientAccounts());
  };

  const openCreateModal = () => {
    setNewPhone('');
    setNewName('');
    setNewLegalTopic('دعاوی ملکی و املاک');
    setNewNotes('');
    setFormError('');
    setNewPassword(generateRandomPassword());
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const normalized = normalizeIranPhone(newPhone);
    if (!normalized || normalized.length !== 11 || !normalized.startsWith('09')) {
      setFormError('شماره موبایل وارد شده باید ۱۱ رقمی و معتبر ایران باشد (مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ۹۱۲۳۴۵۶۷۸۹).');
      return;
    }

    if (!newPassword.trim()) {
      setFormError('لطفاً یک رمز عبور تصادفی یا دستی برای کاربر تعیین فرمایید.');
      return;
    }

    // Check duplicate
    const existing = accounts.find((a) => a.phone === normalized);
    if (existing) {
      setFormError(`اکانتی با این شماره تماس قبلاً به نام "${existing.name || 'بدون نام'}" ثبت شده است.`);
      return;
    }

    const created = addClientAccount({
      phone: normalized,
      rawInputPhone: newPhone,
      password: newPassword.trim(),
      name: newName.trim() || 'موکل گرامی',
      legalTopic: newLegalTopic,
      status: 'pending_profile',
      notes: newNotes.trim(),
    });

    loadAccounts();
    setIsCreateOpen(false);
    setSharedAccount(created);
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyCredentials = (account: ClientAccount) => {
    const text = buildShareMessage(account);
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const buildShareMessage = (account: ClientAccount) => {
    return `سلام ${account.name || 'موکل گرامی'}؛
اکانت پرتال پیگیری پرونده حقوقی شما در دفتر وکالت دکتر سیده مریم رضوی فعال گردید.

🌐 آدرس ورود: https://sedrazavi-law.ir
👤 نام کاربری (شماره همراه): ${account.phone} (می‌توانید با صفر یا بدون صفر وارد کنید)
🔑 رمز عبور اختصاصی شما: ${account.password}

لطفاً از منوی بالای سایت گزینه "ورود موکلین" را انتخاب کرده، با رمز فوق وارد شوید و مشخصات، نشانی و شرح پرونده خود را ذخیره فرمایید.`;
  };

  const handleOpenMessenger = (account: ClientAccount, type: 'whatsapp' | 'eitaa' | 'bale' | 'telegram') => {
    const text = encodeURIComponent(buildShareMessage(account));
    const cleanPhone = account.phone.replace(/^0/, '98');

    if (type === 'whatsapp') {
      window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
    } else if (type === 'eitaa') {
      window.open(`https://eitaa.com/share/url?url=${encodeURIComponent('https://sedrazavi-law.ir')}&text=${text}`, '_blank');
    } else if (type === 'bale') {
      window.open(`https://ble.ir/share/url?url=${encodeURIComponent('https://sedrazavi-law.ir')}&text=${text}`, '_blank');
    } else if (type === 'telegram') {
      window.open(`https://t.me/share/url?url=${encodeURIComponent('https://sedrazavi-law.ir')}&text=${text}`, '_blank');
    }
  };

  const handleSaveResetPassword = () => {
    if (!editingAccount || !resetPasswordVal.trim()) return;
    updateClientAccount(editingAccount.id, { password: resetPasswordVal.trim() });
    loadAccounts();
    setSharedAccount({ ...editingAccount, password: resetPasswordVal.trim() });
    setEditingAccount(null);
    setResetPasswordVal('');
  };

  const handleToggleStatus = (account: ClientAccount) => {
    const nextStatus = account.status === 'suspended' ? 'active' : 'suspended';
    updateClientAccount(account.id, { status: nextStatus });
    loadAccounts();
  };

  const handleConfirmDelete = () => {
    if (!deletingAccount) return;
    deleteClientAccount(deletingAccount.id);
    loadAccounts();
    setDeletingAccount(null);
  };

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.phone.includes(searchTerm) ||
      acc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (acc.legalTopic && acc.legalTopic.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (acc.city && acc.city.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' ? true : acc.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalCount = accounts.length;
  const activeCount = accounts.filter((a) => a.status === 'active').length;
  const pendingCount = accounts.filter((a) => a.status === 'pending_profile').length;

  return (
    <div className="space-y-6 text-right font-persian">
      
      {/* Top Banner with Instructions */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white border border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/40 text-xs font-bold flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>سازوکار صدور اکانت موکل بدون نیاز به سامانه پیامک</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
            مدیریت و صدور اکانت‌های موکلین (توسط وکیل)
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl leading-relaxed">
            خانم وکیل می‌تواند با وارد کردن شماره سیم‌کارت موکل، اکانت کاربری اختصاصی با پسورد تصادفی بسازد و اطلاعات ورود را مستقیماً از طریق پیام‌رسان‌ها (ایتا، بله، واتس‌اپ، تلگرام) به موکل بدهد. موکل با شماره موبایل (با یا بدون صفر) و این رمز به پنل وارد می‌شود.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-gold px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-[#D4AF37]/25 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ صدور اکانت موکل جدید</span>
        </button>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">کل اکانت‌های موکلین</span>
            <p className="text-2xl font-bold font-serif text-[#0B132B] dark:text-white mt-1">
              {totalCount} اکانت
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-600 font-bold">اکانت‌های فعال و تکمیل شده</span>
            <p className="text-2xl font-bold font-serif text-emerald-600 mt-1">
              {activeCount} موکل
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-600 font-bold">در انتظار تکمیل پروفایل توسط موکل</span>
            <p className="text-2xl font-bold font-serif text-amber-600 mt-1">
              {pendingCount} مورد
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="جستجو با شماره موبایل، نام موکل یا موضوع..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#D4AF37]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs w-full sm:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                statusFilter === 'all'
                  ? 'bg-[#D4AF37] text-[#0B132B]'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              همه ({totalCount})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                statusFilter === 'active'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              فعال ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter('pending_profile')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                statusFilter === 'pending_profile'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              در انتظار تکمیل ({pendingCount})
            </button>
            <button
              onClick={() => setStatusFilter('suspended')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                statusFilter === 'suspended'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              معلق
            </button>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="rounded-2xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead className="bg-gray-50 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 font-bold border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="p-4">مشخصات موکل و نام</th>
                <th className="p-4">شماره سیم‌کارت (یوزرنیم)</th>
                <th className="p-4">رمز عبور اختصاصی</th>
                <th className="p-4">موضوع پرونده</th>
                <th className="p-4">وضعیت اکانت</th>
                <th className="p-4">محل سکونت و پروفایل</th>
                <th className="p-4 text-center">عملیات و مدیریت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    هیچ اکانتی با مشخصات وارد شده یافت نشد.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((account) => {
                  const isPassVisible = visiblePasswords[account.id] || false;
                  return (
                    <tr key={account.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-800/40 transition-colors">
                      
                      {/* Name & ID */}
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#AA820A] text-white flex items-center justify-center font-bold text-xs">
                            {account.name ? account.name.slice(0, 1) : 'م'}
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 dark:text-white block">
                              {account.name || 'موکل بدون نام'}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              {account.id} | ایجاد: {account.createdAt}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Phone / Username */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <span className="font-mono font-bold text-sm text-[#0B132B] dark:text-[#F3E5AB] block" dir="ltr">
                            {account.phone}
                          </span>
                          <span className="text-[10px] text-gray-400 block" dir="ltr">
                            بدون صفر: {account.phone.slice(1)}
                          </span>
                        </div>
                      </td>

                      {/* Password */}
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-[#D4AF37]">
                            {isPassVisible ? account.password : '••••••••'}
                          </span>
                          <button
                            onClick={() => togglePasswordVisibility(account.id)}
                            className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            title={isPassVisible ? 'مخفی‌سازی رمز' : 'مشاهده رمز'}
                          >
                            {isPassVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(account.password);
                              alert(`رمز عبور ${account.password} کپی شد.`);
                            }}
                            className="p-1 rounded text-gray-400 hover:text-[#D4AF37]"
                            title="کپی فقط رمز عبور"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Topic */}
                      <td className="p-4">
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {account.legalTopic || 'مشاوره حقوقی'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {account.status === 'active' && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[11px] inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            فعال
                          </span>
                        )}
                        {account.status === 'pending_profile' && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold text-[11px] inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            منتظر تکمیل مشخصات
                          </span>
                        )}
                        {account.status === 'suspended' && (
                          <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 font-bold text-[11px] inline-flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                            معلق / مسدود
                          </span>
                        )}
                      </td>

                      {/* Location / Profile completed */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <span className="text-xs text-gray-700 dark:text-gray-300 block">
                            {account.city ? `${account.province || ''} - ${account.city}` : 'هنوز ثبت نکرده'}
                          </span>
                          {account.preferredMessenger && (
                            <span className="text-[10px] text-gray-400 block">
                              پیام‌رسان: {account.preferredMessenger}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          
                          {/* Share info button */}
                          <button
                            onClick={() => setSharedAccount(account)}
                            className="p-1.5 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] transition-colors"
                            title="ارسال مشخصات در پیام‌رسان‌ها به موکل"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Reset Password */}
                          <button
                            onClick={() => {
                              setEditingAccount(account);
                              setResetPasswordVal(generateRandomPassword());
                            }}
                            className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-colors"
                            title="تغییر یا تولید رمز جدید برای کاربر"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>

                          {/* Toggle Status (Active / Suspend) */}
                          <button
                            onClick={() => handleToggleStatus(account)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              account.status === 'suspended'
                                ? 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20'
                            }`}
                            title={account.status === 'suspended' ? 'فعال‌سازی مجدد اکانت' : 'تعلیق موقت اکانت'}
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Account */}
                          <button
                            onClick={() => setDeletingAccount(account)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"
                            title="حذف کامل اکانت موکل"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Create New Client Account by Attorney */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-[#D4AF37]/30 overflow-hidden text-right">
            
            <div className="bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#0B132B] p-6 text-white border-b border-[#D4AF37]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-white">
                    صدور اکانت موکل جدید (توسط وکیل)
                  </h3>
                  <p className="text-xs text-[#F3E5AB]">
                    بدون نیاز به ارسال SMS - رمز تصادفی توسط وکیل ساخته می‌شود
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-white/10"
              >
                بستن
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-amber-800 dark:text-amber-200 text-xs leading-relaxed">
                💡 <strong>راهنما:</strong> شماره موبایل موکل را وارد کنید. سیستم یک رمز عبور تصادفی تولید کرده و پس از ثبت، متن آماده ارسال در ایتا، بله، واتس‌اپ یا تلگرام را به شما تحویل می‌دهد.
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  شماره سیم‌کارت موکل (یوزرنیم ورودی موکل):
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ۹۱۲۳۴۵۶۷۸۹"
                    dir="ltr"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                </div>
                <span className="text-[11px] text-gray-400">
                  سامانه به صورت خودکار فرمت‌های با صفر یا بدون صفر را تطبیق می‌دهد.
                </span>
              </div>

              {/* Random Password Generator */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    رمز عبور تصادفی اختصاصی:
                  </label>
                  <button
                    type="button"
                    onClick={() => setNewPassword(generateRandomPassword())}
                    className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1 font-bold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    تولید رمز تصادفی جدید
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    dir="ltr"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D4AF37]/50 bg-amber-50/40 dark:bg-amber-950/20 text-sm font-mono font-bold text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                  <KeyRound className="w-4 h-4 text-[#D4AF37] absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    نام و نام خانوادگی موکل (اختیاری):
                  </label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="مثال: آقای سهرابی"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    موضوع پرونده یا نیاز:
                  </label>
                  <select
                    value={newLegalTopic}
                    onChange={(e) => setNewLegalTopic(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="دعاوی ملکی و املاک">دعاوی ملکی و املاک</option>
                    <option value="دعاوی شرکت‌ها و تجاری">دعاوی شرکت‌ها و تجاری</option>
                    <option value="چک و مطالبات مالی">چک و اسناد تجاری</option>
                    <option value="داوری و قراردادها">داوری و قراردادها</option>
                    <option value="دعاوی خانواده و ارث">خانواده و انحصار وراثت</option>
                    <option value="کیفری و اقتصادی">کیفری و اقتصادی</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  یادداشت خصوصی وکیل (فقط برای دفتر):
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="مثلاً: در پیام‌رسان ایتا هماهنگ شد؛ مدارک را پس از ورود به پرتال آپلود می‌کنند."
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="btn-gold flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  <Check className="w-4 h-4" />
                  <span>ثبت اکانت و دریافت متن پیام به موکل</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold"
                >
                  انصراف
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Share Credentials with Client in Messengers */}
      {sharedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden text-right">
            
            <div className="bg-gradient-to-r from-[#0B132B] to-[#1C2541] p-6 text-white border-b border-[#D4AF37]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    اطلاعات ورود موکل با موفقیت صادر گردید
                  </h3>
                  <p className="text-xs text-[#F3E5AB]">
                    متن آماده جهت ارسال در پیام‌رسان‌ها برای {sharedAccount.name || 'موکل'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSharedAccount(null)}
                className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-white/10"
              >
                بستن
              </button>
            </div>

            <div className="p-6 space-y-5">
              
              {/* Box of summary */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 dark:text-gray-400">نام کاربری موکل (شماره همراه):</span>
                  <strong className="font-mono text-sm text-[#0B132B] dark:text-white" dir="ltr">{sharedAccount.phone}</strong>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 dark:text-gray-400">رمز عبور اختصاصی:</span>
                  <strong className="font-mono text-sm text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-lg" dir="ltr">{sharedAccount.password}</strong>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 dark:text-gray-400">ورود بدون صفر:</span>
                  <span className="font-mono text-xs text-gray-600 dark:text-gray-300" dir="ltr">{sharedAccount.phone.slice(1)}</span>
                </div>
              </div>

              {/* Message text area */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  متن کامل پیام جهت ارسال در پیام‌رسان:
                </label>
                <textarea
                  readOnly
                  rows={6}
                  value={buildShareMessage(sharedAccount)}
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-xs text-gray-800 dark:text-gray-200 font-sans leading-relaxed focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => handleCopyCredentials(sharedAccount)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>متن با موفقیت کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>کپی متن پیام برای ارسال در چت</span>
                    </>
                  )}
                </button>

                <div className="pt-2">
                  <span className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 text-center">
                    یا ارسال مستقیم با ۱ کلیک در پیام‌رسان‌ها:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenMessenger(sharedAccount, 'eitaa')}
                      className="p-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-700 dark:text-amber-300 text-xs font-bold flex flex-col items-center gap-1 border border-amber-500/20"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>ایتا</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenMessenger(sharedAccount, 'bale')}
                      className="p-2.5 rounded-xl bg-teal-500/15 hover:bg-teal-500/25 text-teal-700 dark:text-teal-300 text-xs font-bold flex flex-col items-center gap-1 border border-teal-500/20"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>بله</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenMessenger(sharedAccount, 'whatsapp')}
                      className="p-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex flex-col items-center gap-1 border border-emerald-500/20"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>واتس‌اپ</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenMessenger(sharedAccount, 'telegram')}
                      className="p-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-700 dark:text-sky-300 text-xs font-bold flex flex-col items-center gap-1 border border-sky-500/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>تلگرام</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Reset Password for an existing account */}
      {editingAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-blue-500/30 overflow-hidden text-right">
            <div className="bg-gradient-to-r from-[#0B132B] to-[#1C2541] p-5 text-white border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-blue-400" />
                <h4 className="text-sm font-bold">تغییر رمز عبور موکل ({editingAccount.name})</h4>
              </div>
              <button
                onClick={() => setEditingAccount(null)}
                className="text-gray-400 hover:text-white text-xs"
              >
                بستن
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-gray-600 dark:text-gray-300">
                می‌توانید یک رمز تصادفی جدید برای شماره <strong>{editingAccount.phone}</strong> تعیین کرده و مجدداً برای او ارسال فرمایید.
              </p>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">رمز عبور جدید:</label>
                  <button
                    type="button"
                    onClick={() => setResetPasswordVal(generateRandomPassword())}
                    className="text-[11px] text-blue-500 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    تولید رمز تصادفی
                  </button>
                </div>
                <input
                  type="text"
                  dir="ltr"
                  value={resetPasswordVal}
                  onChange={(e) => setResetPasswordVal(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono font-bold text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveResetPassword}
                  className="btn-gold flex-1 py-2.5 rounded-xl text-xs font-bold"
                >
                  ذخیره رمز جدید و ارسال
                </button>
                <button
                  type="button"
                  onClick={() => setEditingAccount(null)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Delete Confirmation */}
      {deletingAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white dark:bg-[#0B132B] rounded-3xl shadow-2xl border border-red-500/30 overflow-hidden text-right p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-500 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h4 className="text-base font-bold text-gray-900 dark:text-white">
                آیا از حذف اکانت این موکل اطمینان دارید؟
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                اکانت متعلق به <strong>{deletingAccount.name}</strong> ({deletingAccount.phone}) به همراه دسترسی‌های وی حذف خواهد شد.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
              >
                بله، حذف قطعی اکانت
              </button>
              <button
                type="button"
                onClick={() => setDeletingAccount(null)}
                className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
