import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { StoryItem } from '../types/theme';
import {
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Share2,
  Check,
  Calendar,
  Eye,
  ExternalLink,
} from 'lucide-react';

interface StoryBarProps {
  stories: StoryItem[];
  onOpenBooking?: () => void;
}

export const StoryBar: React.FC<StoryBarProps> = ({ stories, onOpenBooking }) => {
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [progress, setProgress] = useState(0);

  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const progressTimerRef = useRef<number | null>(null);
  const SLIDE_DURATION = 6000; // 6 seconds per slide

  const openStory = (story: StoryItem) => {
    setActiveStory(story);
    setSlideIndex(0);
    setProgress(0);
    setIsPaused(false);
    document.body.style.overflow = 'hidden';
  };

  const closeStory = useCallback(() => {
    setActiveStory(null);
    setSlideIndex(0);
    setProgress(0);
    setIsPaused(false);
    document.body.style.overflow = '';
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (!activeStory) return;
    setProgress(0);
    if (slideIndex < activeStory.slides.length - 1) {
      setSlideIndex((prev) => prev + 1);
    } else {
      // Advance to next story
      const currentIndex = stories.findIndex((s) => s.id === activeStory.id);
      if (currentIndex < stories.length - 1) {
        setActiveStory(stories[currentIndex + 1]);
        setSlideIndex(0);
      } else {
        closeStory();
      }
    }
  }, [activeStory, slideIndex, stories, closeStory]);

  const prevSlide = useCallback(() => {
    if (!activeStory) return;
    setProgress(0);
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    } else {
      const currentIndex = stories.findIndex((s) => s.id === activeStory.id);
      if (currentIndex > 0) {
        const prevStory = stories[currentIndex - 1];
        setActiveStory(prevStory);
        setSlideIndex(prevStory.slides.length - 1);
      }
    }
  }, [activeStory, slideIndex, stories]);

  // Handle keyboard events (Esc, Arrow keys, Space)
  useEffect(() => {
    if (!activeStory) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeStory();
      } else if (e.key === 'ArrowRight') {
        prevSlide(); // RTL next/prev orientation
      } else if (e.key === 'ArrowLeft') {
        nextSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeStory, closeStory, nextSlide, prevSlide]);

  // Auto-progress timer
  useEffect(() => {
    if (!activeStory || isPaused) return;

    const intervalMs = 50;
    const increment = (intervalMs / SLIDE_DURATION) * 100;

    progressTimerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [activeStory, isPaused, slideIndex, nextSlide]);

  // Fullscreen toggle
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && modalContainerRef.current) {
        await modalContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <section className="py-6 border-b border-gray-200/60 dark:border-gray-800 bg-white/60 dark:bg-[#0B132B]/60 backdrop-blur-sm relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              استوری‌های حقوقی و تحلیل روز
            </span>
          </div>
          <span className="text-[11px] text-gray-400">
            برای مشاهده نکات کلیک کنید
          </span>
        </div>

        {/* Stories Horizontal Scroll Container */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => openStory(story)}
              className="flex flex-col items-center gap-2 flex-shrink-0 group focus:outline-none cursor-pointer"
            >
              {/* Golden Gradient Ring */}
              <div
                className={`p-1 rounded-full transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg ${
                  story.isUnseen
                    ? 'bg-gradient-to-tr from-[#D4AF37] via-[#AA820A] to-[#FCE38A] ring-2 ring-[#D4AF37]/50 ring-offset-2 dark:ring-offset-[#0B132B]'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div className="p-0.5 rounded-full bg-white dark:bg-[#0B132B]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Story Title & Category */}
              <div className="text-center max-w-[90px]">
                <span className="block text-xs font-bold text-gray-800 dark:text-gray-200 truncate group-hover:text-[#D4AF37] transition-colors">
                  {story.title}
                </span>
                <span className="block text-[10px] text-gray-400 truncate">
                  {story.category}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modern WordPress Story Plugin Modal (Rendered via Portal on document.body with Top Layer z-[9999999]) */}
      {activeStory &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={modalContainerRef}
            id="sedrazavi-story-viewport"
            className={`fixed inset-0 z-[9999999] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-300 ${
              isFullscreen ? 'p-0 w-screen h-screen' : 'p-2 sm:p-6'
            }`}
            style={{ touchAction: 'pan-y' }}
          >
            {/* Background Backdrop Dismiss Zone */}
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={closeStory}
              title="بستن استوری"
            />

            {/* External Prominent Desktop Close Button */}
            <button
              onClick={closeStory}
              className="hidden lg:flex absolute top-6 left-8 z-50 items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-md border border-white/20 shadow-2xl transition-transform hover:scale-105"
            >
              <X className="w-5 h-5" />
              <span>بستن استوری (Esc)</span>
            </button>

            {/* Mobile / Centered Story Canvas (Instagram / WP Story 9:16 standard) */}
            <div
              className={`relative z-20 w-full overflow-hidden bg-[#0B132B] text-white shadow-2xl border border-[#D4AF37]/40 flex flex-col transition-all duration-300 ${
                isFullscreen
                  ? 'h-full w-full rounded-none border-none max-w-none'
                  : 'max-w-[420px] h-[92vh] max-h-[820px] rounded-3xl'
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              {/* 1. Multiple Animated Progress Bars (Slide Tracks) */}
              <div className="absolute top-3 left-3 right-3 z-30 flex gap-1.5 pointer-events-none">
                {activeStory.slides.map((_, idx) => (
                  <div
                    key={idx}
                    className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden backdrop-blur-sm"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-[#FCE38A] to-[#D4AF37] transition-all"
                      style={{
                        width:
                          idx < slideIndex
                            ? '100%'
                            : idx === slideIndex
                            ? `${progress}%`
                            : '0%',
                        transition: idx === slideIndex ? 'width 50ms linear' : 'none',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* 2. Top Header Bar: Author Info, Live Status, Controls & Prominent Close */}
              <div className="absolute top-6 left-4 right-4 z-30 flex items-center justify-between gap-2">
                {/* Author Info */}
                <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                  <img
                    src={activeStory.image}
                    alt={activeStory.author}
                    className="w-7 h-7 rounded-full border-2 border-[#D4AF37] object-cover"
                  />
                  <div className="text-right">
                    <span className="block text-xs font-black text-white leading-tight">
                      {activeStory.author}
                    </span>
                    <span className="block text-[10px] text-[#D4AF37] font-semibold">
                      {activeStory.category}
                    </span>
                  </div>
                </div>

                {/* Right Action Icons (Pause, Mute, Fullscreen, Share & Close) */}
                <div className="flex items-center gap-1.5">
                  {/* Pause / Play */}
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white hover:text-[#D4AF37] backdrop-blur-md border border-white/10 transition-colors"
                    title={isPaused ? 'ادامه' : 'توقف'}
                  >
                    {isPaused ? <Play className="w-4 h-4 fill-white" /> : <Pause className="w-4 h-4" />}
                  </button>

                  {/* Audio Mute */}
                  <button
                    onClick={() => setIsAudioMuted(!isAudioMuted)}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white hover:text-[#D4AF37] backdrop-blur-md border border-white/10 transition-colors"
                    title={isAudioMuted ? 'صدا وصل' : 'صامت'}
                  >
                    {isAudioMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  {/* Fullscreen Toggle */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white hover:text-[#D4AF37] backdrop-blur-md border border-white/10 transition-colors"
                    title={isFullscreen ? 'خروج از تمام صفحه' : 'نمایش تمام صفحه'}
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>

                  {/* Share Link */}
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white hover:text-[#D4AF37] backdrop-blur-md border border-white/10 transition-colors"
                    title="اشتراک‌گذاری"
                  >
                    {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>

                  {/* Prominent High-Contrast Close Button */}
                  <button
                    onClick={closeStory}
                    className="p-2 rounded-full bg-red-600/80 hover:bg-red-600 text-white border border-white/20 backdrop-blur-md shadow-lg transition-transform hover:scale-110 focus:outline-none"
                    title="بستن استوری"
                    aria-label="بستن استوری"
                  >
                    <X className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* 3. Slide Visual Media & Background */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeStory.slides[slideIndex].image}
                  alt={activeStory.slides[slideIndex].title}
                  className="w-full h-full object-cover object-center select-none"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060B18] via-black/30 to-black/70 pointer-events-none" />

                {/* Left Tap Zone: Next Slide in RTL */}
                <div
                  onClick={nextSlide}
                  className="absolute left-0 top-16 bottom-28 w-1/2 z-20 cursor-pointer"
                  title="اسلاید بعدی (کلیک کنید)"
                />

                {/* Right Tap Zone: Previous Slide in RTL */}
                <div
                  onClick={prevSlide}
                  className="absolute right-0 top-16 bottom-28 w-1/2 z-20 cursor-pointer"
                  title="اسلاید قبلی (کلیک کنید)"
                />

                {/* Nav Arrows */}
                <button
                  onClick={prevSlide}
                  className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-[#0B132B] text-white border border-white/20 transition-all shadow-xl"
                  title="قبلی"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-[#0B132B] text-white border border-white/20 transition-all shadow-xl"
                  title="بعدی"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>

              {/* 4. Slide Content & Legal Action Buttons */}
              <div className="relative z-30 p-5 sm:p-6 bg-gradient-to-t from-[#060B18] via-[#0B132B]/95 to-transparent space-y-3 text-right">
                {activeStory.slides[slideIndex].caption && (
                  <div className="flex items-center gap-2">
                    <span className="inline-block text-[11px] px-3 py-1 rounded-full bg-gradient-to-r from-[#FCE38A] to-[#D4AF37] text-[#060B18] font-black shadow-md">
                      {activeStory.slides[slideIndex].caption}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      اسلاید {slideIndex + 1} از {activeStory.slides.length}
                    </span>
                  </div>
                )}

                <h3 className="text-lg sm:text-xl font-black text-white leading-snug drop-shadow-md">
                  {activeStory.slides[slideIndex].title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-h-28 overflow-y-auto pr-1">
                  {activeStory.slides[slideIndex].text}
                </p>

                {/* Action CTA Link / Consultation Button */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      closeStory();
                      if (onOpenBooking) onOpenBooking();
                    }}
                    className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#FCE38A] to-[#AA820A] text-[#060B18] font-black text-xs sm:text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>
                      {activeStory.slides[slideIndex].ctaText || 'رزرو نوبت مشاوره پیرامون این موضوع'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
