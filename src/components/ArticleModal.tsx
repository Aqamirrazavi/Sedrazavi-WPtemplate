import React, { useEffect } from 'react';
import { ArticleItem } from '../types/theme';
import { X, Clock, Calendar, Eye, Share2, Tag, BookOpen } from 'lucide-react';

interface ArticleModalProps {
  article: ArticleItem | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && article) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#0B132B] rounded-2xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Article Banner Header */}
        <div className="relative h-64 bg-gray-900 overflow-hidden">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-11 h-11 flex items-center justify-center rounded-2xl bg-black/60 text-white hover:text-red-400 transition-colors cursor-pointer"
            aria-label="بستن مقاله"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 right-6 left-6 text-white space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37] text-[#0B132B] font-bold text-xs">
              {article.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white leading-tight">
              {article.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-gray-300">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {article.views} بازدید</span>
            </div>
          </div>
        </div>

        {/* Article Full Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-right">
          
          <div className="p-4 rounded-xl bg-[#D4AF37]/10 border-r-4 border-[#D4AF37] text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
            {article.summary}
          </div>

          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs text-gray-400 font-bold">برچسب‌ها:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 bg-gray-50 dark:bg-[#070D1E] border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300"
          >
            بستن یادداشت
          </button>

          <a
            href="#booking"
            onClick={onClose}
            className="btn-gold px-5 py-2 text-xs font-bold rounded-xl"
          >
            درخواست مشاوره درباره این موضوع
          </a>
        </div>

      </div>
    </div>
  );
};
