export interface ClientAccount {
  id: string;
  phone: string; // normalized, always standard 0912...
  rawInputPhone?: string; // what was typed
  password: string; // e.g. SR-8492
  name: string;
  nationalId?: string;
  sanaCode?: string;
  province?: string;
  city?: string;
  address?: string;
  emergencyPhone?: string;
  preferredMessenger?: 'eitaa' | 'bale' | 'whatsapp' | 'telegram' | 'phone';
  messengerHandle?: string;
  legalRequest?: string;
  legalTopic?: string;
  caseNumber?: string;
  status: 'active' | 'pending_profile' | 'suspended';
  createdAt: string;
  lastLogin?: string;
  notes?: string;
}

const STORAGE_KEY = 'sedrazavi_client_accounts_v1';

// تبدیل اعداد فارسی و عربی به انگلیسی و حذف کاراکترهای غیرعددی
export function normalizeIranPhone(input: string): string {
  if (!input) return '';
  let cleaned = input.trim()
    .replace(/[٠-٩]/g, (d) => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])
    .replace(/[۰-۹]/g, (d) => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)])
    .replace(/[^0-9]/g, '');

  if (cleaned.startsWith('0098')) {
    cleaned = cleaned.slice(4);
  } else if (cleaned.startsWith('98')) {
    cleaned = cleaned.slice(2);
  }

  // اگر بدون صفر وارد شده (مثلا 9123456789)
  if (!cleaned.startsWith('0') && cleaned.length === 10) {
    cleaned = '0' + cleaned;
  }

  return cleaned;
}

// تولید رمز عبور تصادفی مطمئن، کوتاه و خوانا برای ارسال در پیام‌رسان‌ها
export function generateRandomPassword(prefix: string = 'SR'): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  const nums = Math.floor(1000 + Math.random() * 9000);
  let randomLetters = '';
  for (let i = 0; i < 2; i++) {
    randomLetters += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${nums}${randomLetters}`;
}

export const INITIAL_CLIENT_ACCOUNTS: ClientAccount[] = [
  {
    id: 'ACC-1403-01',
    phone: '09123456789',
    password: 'SR-1403',
    name: 'مهندس علیرضا رادمنش',
    nationalId: '0019283746',
    sanaCode: 'SANA-99281',
    province: 'تهران',
    city: 'تهران - منطقه ۱',
    address: 'خیابان ولیعصر، نرسیده به میدان تجریش، بن‌بست یاس، پلاک ۱۴',
    emergencyPhone: '02122001122',
    preferredMessenger: 'eitaa',
    messengerHandle: '@radmanesh_law',
    legalTopic: 'دعاوی ملکی و خلع ید',
    legalRequest: 'پیگیری پرونده الزام به تنظیم سند رسمی و رفع توقیف ملک مسکونی تجریش و درخواست داوری مرضی‌الطرفین',
    caseNumber: 'CL-1403-889',
    status: 'active',
    createdAt: '۱۴۰۳/۰۸/۱۰',
    lastLogin: '۱۴۰۳/۰۹/۰۲',
    notes: 'موکل از طریق پیام‌رسان ایتا تماس گرفتند و اکانت دستی توسط وکیل فعال شد.',
  },
  {
    id: 'ACC-1403-02',
    phone: '09129876543',
    password: 'SR-8842',
    name: 'سرکار خانم مریم سعادت',
    nationalId: '0058291034',
    sanaCode: 'SANA-44102',
    province: 'تهران',
    city: 'تهران - ونک',
    address: 'ونک، خیابان ملاصدرا، کوچه شاد، واحد ۶',
    emergencyPhone: '09120000000',
    preferredMessenger: 'bale',
    messengerHandle: '@saadat_lawyer',
    legalTopic: 'دعاوی شرکت‌ها و چک صیادی',
    legalRequest: 'مطالبه وجه ۵ فقره چک صیادی به همراه خسارت تاخیر تادیه و توقیف حساب‌های شریک تجاری',
    caseNumber: 'CL-1403-890',
    status: 'pending_profile',
    createdAt: '۱۴۰۳/۰۹/۰۱',
    lastLogin: '۱۴۰۳/۰۹/۰۱',
    notes: 'اکانت بدون پیامک توسط وکیل در واتس‌اپ ارسال شد.',
  },
  {
    id: 'ACC-1403-03',
    phone: '09351234567',
    password: 'SR-7731',
    name: 'جناب آقای دکتر فرهمند',
    nationalId: '0073829105',
    province: 'اصفهان',
    city: 'اصفهان',
    legalTopic: 'داوری تجاری بین‌المللی',
    status: 'active',
    createdAt: '۱۴۰۳/۰۸/۲۵',
    lastLogin: '۱۴۰۳/۰۸/۲۸',
    notes: 'مشاوره پیرامون قرارداد صادرات و داوری اتاق بازرگانی.',
  },
];

export function getStoredClientAccounts(): ClientAccount[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CLIENT_ACCOUNTS));
      return INITIAL_CLIENT_ACCOUNTS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to parse client accounts from storage:', err);
    return INITIAL_CLIENT_ACCOUNTS;
  }
}

export function saveClientAccounts(accounts: ClientAccount[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error('Failed to save client accounts:', err);
  }
}

export function addClientAccount(newAccount: Omit<ClientAccount, 'id' | 'createdAt'>): ClientAccount {
  const accounts = getStoredClientAccounts();
  const id = 'ACC-' + Math.floor(1000 + Math.random() * 9000);
  const nowFa = new Intl.DateTimeFormat('fa-IR').format(new Date());

  const created: ClientAccount = {
    ...newAccount,
    id,
    phone: normalizeIranPhone(newAccount.phone),
    createdAt: nowFa,
  };

  const updated = [created, ...accounts];
  saveClientAccounts(updated);
  return created;
}

export function updateClientAccount(id: string, partial: Partial<ClientAccount>): ClientAccount | null {
  const accounts = getStoredClientAccounts();
  const index = accounts.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const updated = {
    ...accounts[index],
    ...partial,
  };
  accounts[index] = updated;
  saveClientAccounts(accounts);
  return updated;
}

export function deleteClientAccount(id: string): boolean {
  const accounts = getStoredClientAccounts();
  const filtered = accounts.filter((a) => a.id !== id);
  saveClientAccounts(filtered);
  return filtered.length !== accounts.length;
}

export function findClientByCredentials(phoneInput: string, passwordInput: string): ClientAccount | null {
  const normalizedPhone = normalizeIranPhone(phoneInput);
  const cleanPass = passwordInput.trim();

  const accounts = getStoredClientAccounts();
  return accounts.find(
    (a) =>
      (a.phone === normalizedPhone || a.phone.slice(1) === normalizedPhone.replace(/^0/, '')) &&
      a.password.toLowerCase() === cleanPass.toLowerCase() &&
      a.status !== 'suspended'
  ) || null;
}
