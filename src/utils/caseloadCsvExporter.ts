/**
 * Caseload, Specialization & Client Interaction CSV Report Generator
 * Exports comprehensive, multi-section executive data for the attorney.
 */

import { CaseItem } from '../types/theme';
import { LawyerSiteProfile } from './lawyerCustomizationStorage';
import { ATTORNEY_INFO } from '../data/mockData';

export interface ClientInteractionSummary {
  id: string;
  trackingCode: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  date: string;
  timeSlot: string;
  type: string;
  topic: string;
  status: string;
  feePaid: number;
}

export const DEFAULT_CLIENT_INTERACTIONS: ClientInteractionSummary[] = [
  {
    id: 'b-101',
    trackingCode: 'SR-B1403-881',
    clientName: 'مهندس آرش جهانبخش',
    clientPhone: '09121112233',
    clientEmail: 'arash.j@example.com',
    date: '۱۴۰۳/۰۶/۲۵',
    timeSlot: '۱۱:۰۰ الی ۱۱:۴۵',
    type: 'حضوری',
    topic: 'مشاوره قرارداد مشارکت در ساخت و پیش‌فروش واحدها',
    status: 'تایید شده',
    feePaid: 2500000,
  },
  {
    id: 'b-102',
    trackingCode: 'SR-B1403-882',
    clientName: 'دکتر مریم سلیمانی',
    clientPhone: '09124445566',
    clientEmail: 'm.soleimani@med.ir',
    date: '۱۴۰۳/۰۶/۲۶',
    timeSlot: '۱۶:۳۰ الی ۱۷:۱۵',
    type: 'آنلاین تصویری',
    topic: 'بررسی لایحه دفاعیه پرونده نظام پزشکی و جرایم صنفی',
    status: 'انجام شده',
    feePaid: 2000000,
  },
  {
    id: 'b-103',
    trackingCode: 'SR-B1403-883',
    clientName: 'حاج مصطفی اکبری',
    clientPhone: '09127778899',
    date: '۱۴۰۳/۰۶/۲۷',
    timeSlot: '۱۰:۰۰ الی ۱۰:۴۵',
    type: 'حضوری',
    topic: 'تحدید حدود اراضی موروثی و تقاضای افراز ثبتی',
    status: 'تایید شده',
    feePaid: 2500000,
  },
];

export const SPECIALIZATION_AREAS = [
  {
    subject: 'قراردادهای تجاری و داوری',
    score: '۹۶٪',
    caseCount: '۳۸۰',
    winRate: '۹۷٪',
    description: 'تنظیم قراردادهای چندجانبه، داوری اتاق بازرگانی و حل اختلافات تجاری فرامرزی',
  },
  {
    subject: 'دعاوی ملکی، ثبتی و سرقفلی',
    score: '۹۴٪',
    caseCount: '۳۴۰',
    winRate: '۹۵٪',
    description: 'اثبات مالکیت، خلع ید، افراز و دستور فروش، سرقفلی و حق کسب و پیشه',
  },
  {
    subject: 'فرجام‌خواهی در دیوان عالی کشور',
    score: '۹۲٪',
    caseCount: '۱۶۵',
    winRate: '۹۱٪',
    description: 'اعاده دادرسی موضوع ماده ۴۷۴ و اعتراض به آرای قطعی محاکم تجدیدنظر',
  },
];

function escapeCsv(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/\r\n|\r|\n/g, ' ');
  return `"${str.replace(/"/g, '""')}"`;
}

export function generateCaseloadCsvString(
  profile?: LawyerSiteProfile,
  cases: CaseItem[] = [],
  interactions: ClientInteractionSummary[] = DEFAULT_CLIENT_INTERACTIONS
): string {
  const lawyerName = profile?.lawyerName || ATTORNEY_INFO.name;
  const licenseNumber = profile?.licenseNumber || ATTORNEY_INFO.licenseNumber;
  const officePhone = profile?.phone || ATTORNEY_INFO.phone;
  const currentDate = new Date().toLocaleDateString('fa-IR');
  const gregorianDate = new Date().toISOString().split('T')[0];

  const lines: string[] = [];
  const BOM = '\uFEFF';

  lines.push(`${escapeCsv('گزارش جامع پرونده‌های قضایی، ماتریس تخصص‌ها و تعاملات موکلین')},${escapeCsv('')},${escapeCsv('')},${escapeCsv('')}`);
  lines.push(`${escapeCsv('دفتر وکالت و داوری حقوقی')},${escapeCsv(lawyerName)},${escapeCsv('کد پروانه وکالت')},${escapeCsv(licenseNumber)},${escapeCsv('تاریخ تهیه')},${escapeCsv(`${currentDate} (${gregorianDate})`)}`);
  lines.push('');

  lines.push(`${escapeCsv('--- بخش اول: فهرست و وضعیت پرونده‌های جاری تحت وکالت ---')}`);
  lines.push([
    escapeCsv('ردیف'),
    escapeCsv('شماره پرونده'),
    escapeCsv('نام موکل'),
    escapeCsv('تلفن موکل'),
    escapeCsv('حوزه دعوا'),
    escapeCsv('وضعیت فعلی'),
    escapeCsv('جلسه بعدی دادگاه'),
  ].join(','));

  cases.forEach((item, index) => {
    lines.push([
      escapeCsv((index + 1).toString()),
      escapeCsv(item.caseNumber),
      escapeCsv(item.clientName),
      escapeCsv(item.clientPhone),
      escapeCsv(item.caseType),
      escapeCsv(item.status),
      escapeCsv(item.nextCourtSession),
    ].join(','));
  });

  return BOM + lines.join('\r\n');
}

export function downloadCaseloadCsvFile(
  profile?: LawyerSiteProfile,
  cases: CaseItem[] = [],
  interactions: ClientInteractionSummary[] = DEFAULT_CLIENT_INTERACTIONS
): { success: boolean; filename: string; totalRecords: number } {
  const csvContent = generateCaseloadCsvString(profile, cases, interactions);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const gregorianDate = new Date().toISOString().split('T')[0];
  const filename = `Lawyer-Caseload-Report-${gregorianDate}.csv`;

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return {
    success: true,
    filename,
    totalRecords: cases.length + SPECIALIZATION_AREAS.length + interactions.length,
  };
}
