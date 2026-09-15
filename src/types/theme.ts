export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  iconName: 'handshake' | 'shield' | 'home' | 'scroll' | 'building' | 'gavel';
  iconEmoji: string;
  summary: string;
  fullDescription: string;
  duration: string;
  estimatedFee: string;
  requiredDocs: string[];
  isFeatured: boolean;
  order: number;
  image: string;
}

export interface CaseItem {
  id: string;
  caseNumber: string;
  clientName: string;
  clientPhone: string;
  caseType: 'کیفری' | 'خانواده' | 'تجاری' | 'ملکی' | 'ارث' | 'کار و بیمه';
  registrationDate: string;
  status: 'در حال بررسی' | 'در جریان' | 'بسته شده' | 'به رأی نهایی رسیده';
  nextCourtSession: string;
  documentsCount: number;
  notes: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  role: string;
  rating: number;
  serviceUsed: string;
  text: string;
  date: string;
  isApproved: boolean;
  avatar: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  thumbnail: string;
  views: number;
}

export interface VideoChapter {
  time: string;
  seconds: number;
  title: string;
}

export interface VideoItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  duration: string;
  date: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  tags: string[];
  presenter: string;
  presenterRole: string;
  description: string;
  chapters?: VideoChapter[];
  transcript?: string;
}

export interface CommentItem {
  id: string;
  author: string;
  authorEmail: string;
  avatar?: string;
  content: string;
  date: string;
  postTitle: string;
  postType: 'article' | 'video' | 'service';
  postId: string;
  status: 'approved' | 'pending' | 'spam' | 'trash';
  rating?: number;
  likes: number;
  replies?: CommentItem[];
  parentCommentId?: string | null;
}

export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  caseCount: number;
  badge?: string;
}

export interface StorySlide {
  image: string;
  title: string;
  text: string;
  caption?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface StoryItem {
  id: string;
  author: string;
  title: string;
  category: string;
  image: string;
  isUnseen: boolean;
  slides: StorySlide[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'مشاوره' | 'حق‌الوکاله' | 'روند دادرسی' | 'اسناد و مدارک';
}

export interface ElementorBlockDef {
  id: string;
  code: string;
  title: string;
  titleEn: string;
  category: 'هیرو و معرفی' | 'خدمات و پرونده‌ها' | 'اعتبار و نظرات' | 'فرم و رزرو' | 'فوتر و هدر';
  description: string;
  icon: string;
  options: {
    name: string;
    type: 'text' | 'select' | 'boolean' | 'color';
    defaultValue: string | boolean;
    options?: string[];
  }[];
}

export interface WordPressFile {
  path: string;
  filename: string;
  category: 'قالب اصلی (Templates)' | 'بخش‌های داخلی (Inc)' | 'برگه‌ها و آرشیوها' | 'استایل و دارایی‌ها (Assets)' | 'پیکربندی گیت و CI/CD (.github)' | 'مستندات و زبان' | 'افزونه مکمل (Plugin Addons)' | 'ماژول‌های افزونه (Plugin Includes)';
  description: string;
  code: string;
}
