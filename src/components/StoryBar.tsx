import React, { useState } from 'react';
import { StoryItem } from '../types/theme';
import { Sparkles, X, ChevronRight, ChevronLeft, Volume2, VolumeX } from 'lucide-react';

interface StoryBarProps {
  stories: StoryItem[];
}

export const StoryBar: React.FC<StoryBarProps> = ({ stories }) => {
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  const openStory = (story: StoryItem) => {
    setActiveStory(story);
    setSlideIndex(0);
  };

  const closeStory = () => {
    setActiveStory(null);
    setSlideIndex(0);
  };

  const nextSlide = () => {
    if (!activeStory) return;
    if (slideIndex < activeStory.slides.length - 1) {
      setSlideIndex(slideIndex + 1);
    } else {
      // Go to next story if available
      const currentIndex = stories.findIndex((s) => s.id === activeStory.id);
      if (currentIndex < stories.length - 1) {
        setActiveStory(stories[currentIndex + 1]);
        setSlideIndex(0);
      } else {
        closeStory();
      }
    }
  };

  const prevSlide = () => {
    if (!activeStory) return;
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else {
      const currentIndex = stories.findIndex((s) => s.id === activeStory.id);
      if (currentIndex > 0) {
        const prevStory = stories[currentIndex - 1];
        setActiveStory(prevStory);
        setSlideIndex(prevStory.slides.length - 1);
      }
    }
  };

  return (
    <section className="py-6 border-b border-gray-200/60 dark:border-gray-800 bg-white/50 dark:bg-[#0B132B]/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            نکات و استوری‌های آموزشی حقوقی روز
          </span>
        </div>

        {/* Stories Horizontal Scroll Container */}
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => openStory(story)}
              className="flex flex-col items-center gap-2 flex-shrink-0 group focus:outline-none"
            >
              {/* Outer Golden Gradient Ring */}
              <div
                className={`p-0.5 rounded-full transition-all transform group-hover:scale-105 ${
                  story.isUnseen
                    ? 'bg-gradient-to-tr from-[#D4AF37] via-[#AA820A] to-[#F3E5AB] ring-2 ring-[#D4AF37]/40 ring-offset-2 dark:ring-offset-[#0B132B]'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div className="p-0.5 rounded-full bg-white dark:bg-[#0B132B]">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Story Title & Category */}
              <div className="text-center max-w-[85px]">
                <span className="block text-xs font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:text-[#D4AF37] transition-colors">
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

      {/* Story Fullscreen Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md bg-[#0B132B] text-white rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 flex flex-col h-[650px] max-h-[90vh]">
            
            {/* Progress Bars */}
            <div className="absolute top-3 left-3 right-3 z-20 flex gap-1.5">
              {activeStory.slides.map((_, idx) => (
                <div
                  key={idx}
                  className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden"
                >
                  <div
                    className={`h-full bg-[#D4AF37] transition-all duration-300 ${
                      idx < slideIndex ? 'w-full' : idx === slideIndex ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Story Header */}
            <div className="absolute top-6 left-4 right-4 z-20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={activeStory.image}
                  alt={activeStory.author}
                  className="w-8 h-8 rounded-full border border-[#D4AF37] object-cover"
                />
                <div>
                  <span className="block text-xs font-bold text-white">
                    {activeStory.author}
                  </span>
                  <span className="block text-[10px] text-[#D4AF37]">
                    {activeStory.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAudioMuted(!isAudioMuted)}
                  className="p-1.5 rounded-full bg-black/40 text-white hover:text-[#D4AF37]"
                >
                  {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={closeStory}
                  className="p-1.5 rounded-full bg-black/40 text-white hover:text-red-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slide Content Image */}
            <div className="relative flex-1 bg-black">
              <img
                src={activeStory.slides[slideIndex].image}
                alt={activeStory.slides[slideIndex].title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-black/40 to-black/60" />

              {/* Click Navigation Zones */}
              <div
                onClick={nextSlide}
                className="absolute left-0 top-0 bottom-0 w-1/2 cursor-pointer z-10"
                title="اسلاید بعدی"
              />
              <div
                onClick={prevSlide}
                className="absolute right-0 top-0 bottom-0 w-1/2 cursor-pointer z-10"
                title="اسلاید قبلی"
              />

              {/* Slide Text Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 space-y-3">
                {activeStory.slides[slideIndex].caption && (
                  <span className="inline-block text-[11px] px-2.5 py-1 rounded bg-[#D4AF37] text-[#0B132B] font-bold">
                    {activeStory.slides[slideIndex].caption}
                  </span>
                )}

                <h3 className="text-xl font-bold font-serif text-white">
                  {activeStory.slides[slideIndex].title}
                </h3>

                <p className="text-sm text-gray-200 leading-relaxed">
                  {activeStory.slides[slideIndex].text}
                </p>

                {activeStory.slides[slideIndex].ctaText && (
                  <div className="pt-2">
                    <a
                      href={activeStory.slides[slideIndex].ctaLink || '#booking'}
                      onClick={closeStory}
                      className="block text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-bold text-xs shadow-lg shadow-[#D4AF37]/30 hover:brightness-110"
                    >
                      {activeStory.slides[slideIndex].ctaText}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Nav Arrows */}
            <button
              onClick={prevSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white hover:text-[#D4AF37]"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white hover:text-[#D4AF37]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

          </div>
        </div>
      )}
    </section>
  );
};
