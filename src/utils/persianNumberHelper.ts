/**
 * Persian Number, Currency, and Words Utility
 * Transforms digits to words (e.g. 50,000,000 -> پنجاه میلیون تومان)
 * Formats numbers with comma separators, normalizes Iranian mobile numbers, etc.
 */

const YEKAN = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
const DAHGAN = ['', 'ده', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
const DAH_TA_BIST = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
const SADGAN = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
const SCALES = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

function convertChunk(num: number): string {
  if (num === 0) return '';
  const parts: string[] = [];

  const c = Math.floor(num / 100);
  const remainder = num % 100;

  if (c > 0) parts.push(SADGAN[c]);

  if (remainder >= 10 && remainder < 20) {
    parts.push(DAH_TA_BIST[remainder - 10]);
  } else {
    const d = Math.floor(remainder / 10);
    const y = remainder % 10;
    if (d > 0) parts.push(DAHGAN[d]);
    if (y > 0) parts.push(YEKAN[y]);
  }

  return parts.join(' و ');
}

/**
 * Converts any non-negative integer into standard Persian verbal words.
 * E.g. 50000000 -> پنجاه میلیون
 */
export function numberToPersianWords(num: number): string {
  if (num === 0) return 'صفر';
  if (isNaN(num)) return '';

  const absNum = Math.floor(Math.abs(num));
  let temp = absNum;
  const chunks: number[] = [];

  while (temp > 0) {
    chunks.push(temp % 1000);
    temp = Math.floor(temp / 1000);
  }

  const wordsList: string[] = [];
  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i];
    if (chunk > 0) {
      const chunkText = convertChunk(chunk);
      const scale = SCALES[i];
      if (scale) {
        wordsList.push(`${chunkText} ${scale}`);
      } else {
        wordsList.push(chunkText);
      }
    }
  }

  return wordsList.join(' و ');
}

/**
 * Formats a number or string with thousands commas (e.g. 50000000 -> 50,000,000)
 */
export function formatThousands(val: number | string): string {
  if (val === null || val === undefined) return '';
  const clean = String(val).replace(/[^0-9]/g, '');
  if (!clean) return '۰';
  return Number(clean).toLocaleString('fa-IR');
}

/**
 * Formats an English digit number with English commas
 */
export function formatCommasEn(val: number | string): string {
  if (val === null || val === undefined) return '';
  const clean = String(val).replace(/[^0-9]/g, '');
  if (!clean) return '0';
  return Number(clean).toLocaleString('en-US');
}

/**
 * Clean any Persian/Arabic digits to English digits
 */
export function toEnglishDigits(str: string): string {
  if (!str) return '';
  return str
    .replace(/[٠-٩]/g, (d) => '0123456789'['٠١٢٣٤٥٦٧٨٩'.indexOf(d)])
    .replace(/[۰-۹]/g, (d) => '0123456789'['۰۱۲۳۴۵۶۷۸۹'.indexOf(d)]);
}

/**
 * Validates whether the given string is a valid Iranian 11-digit mobile starting with 09
 */
export function isValidIranMobile(phone: string): boolean {
  const normalized = toEnglishDigits(phone).replace(/[^0-9]/g, '');
  return /^09[0-9]{9}$/.test(normalized);
}

/**
 * Converts Rials to verbal description in Tomans for legal contracts and calculators
 */
export function rialsToTomansVerbal(rials: number): string {
  const tomans = Math.floor(rials / 10);
  if (tomans === 0) return 'صفر تومان';
  const verbal = numberToPersianWords(tomans);
  return `${verbal} تومان`;
}
