import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Award, Send, BarChart2, Shield, X, Heart, ThumbsUp, Sparkles, Download } from 'lucide-react';

interface SurveyQuestion {
  id: string;
  type: 'rating' | 'choice' | 'text' | 'likert';
  question: string;
  options?: string[];
}

const DEFAULT_QUESTIONS: SurveyQuestion[] = [
  {
    id: 'q1',
    type: 'rating',
    question: 'میزان رضایت کلی شما از خدمات حقوقی و پیگیری‌های دفتر وکالت دادمان چقدر است؟',
  },
  {
    id: 'q2',
    type: 'likert',
    question: 'شفافیت مالی و وضوح قرارداد وکالت را چگونه ارزیابی می‌کنید؟',
    options: ['بسیار ضعیف', 'ضعیف', 'متوسط', 'خوب', 'بسیار عالی و شفاف'],
  },
  {
    id: 'q3',
    type: 'choice',
    question: 'کدام بخش از روند رسیدگی بیشترین رضایت را برای شما به همراه داشت؟',
    options: [
      'سرعت پاسخگویی وکیل در پیام‌رسان و تلفن',
      'دقت و تسلط علمی در تنظیم لوایح و دادخواست',
      'حضور به موقع و دفاع مستدل در جلسات دادگاه',
      'سامانه آنلاین رهگیری لحظه‌ای پرونده',
    ],
  },
  {
    id: 'q4',
    type: 'text',
    question: 'پیشنهاد یا انتقاد شما جهت بهبود کیفیت ارائه خدمات حقوقی:',
  },
];

interface SurveyWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  surveyId?: string;
  onSubmitted?: (data: any) => void;
}

export const SurveyWidgetModal: React.FC<SurveyWidgetModalProps> = ({
  isOpen,
  onClose,
  surveyId = '123',
  onSubmitted,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [likertAnswer, setLikertAnswer] = useState<number>(4);
  const [selectedChoice, setSelectedChoice] = useState<string>(
    DEFAULT_QUESTIONS[2].options?.[1] || ''
  );
  const [feedbackText, setFeedbackText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const surveyPayload = {
      surveyId,
      rating,
      likertAnswer,
      selectedChoice,
      feedbackText,
      isAnonymous,
      submittedAt: new Date().toISOString(),
    };
    if (onSubmitted) onSubmitted(surveyPayload);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in" dir="rtl">
      <div className="bg-white dark:bg-[#0B132B] w-full max-w-xl rounded-2xl shadow-2xl border border-[#D4AF37]/35 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-l from-[#0B132B] to-[#1C2541] text-white flex items-center justify-between border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white shadow-md">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-serif">نظرسنجی کیفیت خدمات حقوقی دادمان</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-mono">
                  [dadman_survey id="{surveyId}"]
                </span>
              </div>
              <p className="text-xs text-gray-400">دیدگاه شما در بهبود کیفیت لوایح و دفاعیات موثر است</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Q1: Star Rating */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0B132B] dark:text-white">
                ۱. {DEFAULT_QUESTIONS[0].question}
              </label>
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1.5 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? 'text-[#D4AF37] fill-[#D4AF37]'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
                <span className="mr-3 text-sm font-bold text-[#AA820A] dark:text-[#D4AF37]">
                  {rating === 5 ? 'عالی و رضایت‌بخش (۵ از ۵)' : `${rating} از ۵`}
                </span>
              </div>
            </div>

            {/* Q2: Likert Scale */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0B132B] dark:text-white">
                ۲. {DEFAULT_QUESTIONS[1].question}
              </label>
              <div className="grid grid-cols-5 gap-1.5 text-center">
                {DEFAULT_QUESTIONS[1].options?.map((opt, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setLikertAnswer(idx)}
                    className={`p-2 rounded-lg text-xs font-medium transition-all ${
                      likertAnswer === idx
                        ? 'bg-[#0B132B] dark:bg-[#D4AF37] text-white dark:text-[#0B132B] shadow font-bold'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3: Multiple Choice */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0B132B] dark:text-white">
                ۳. {DEFAULT_QUESTIONS[2].question}
              </label>
              <div className="space-y-2">
                {DEFAULT_QUESTIONS[2].options?.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedChoice === opt
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0B132B] dark:text-white font-semibold'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="choice"
                      checked={selectedChoice === opt}
                      onChange={() => setSelectedChoice(opt)}
                      className="accent-[#D4AF37] w-4 h-4"
                    />
                    <span className="text-xs">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q4: Open Feedback */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#0B132B] dark:text-white">
                ۴. {DEFAULT_QUESTIONS[3].question}
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="نکات خود درباره عملکرد وکیل، جلسات دادگاه و پیگیری اسناد را بنویسید..."
                rows={3}
                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-xs focus:ring-2 focus:ring-[#D4AF37] outline-none text-[#0B132B] dark:text-white"
              />
            </div>

            {/* Anonymous Toggle & GDPR Note */}
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                  ثبت پاسخ به صورت کاملاً ناشناس
                </span>
              </div>
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                ارسال نهایی بازخورد
              </button>
            </div>

          </form>
        ) : (
          /* Submission Success State */
          <div className="p-8 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#0B132B] dark:text-white font-serif">
                سپاس از ثبت دیدگاه ارزشمند شما!
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
                بازخورد شما در پایگاه داده دادمان ثبت گردید و در داشبورد تحلیلی وکیل جهت بهینه‌سازی فرآیندهای دادرسی لحاظ می‌شود.
              </p>
            </div>

            <div className="p-3.5 bg-gray-50 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-300">
              امتیاز ثبت شده: <span className="font-bold text-[#D4AF37]">{rating} از ۵ ستاره</span> | حالت: {isAnonymous ? 'ناشناس' : 'شناسه‌دار'}
            </div>

            <button
              onClick={handleReset}
              className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold"
            >
              بستن پنجره
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
