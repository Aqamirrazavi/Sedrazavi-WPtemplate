import React, { useState, useEffect } from 'react';
import { Header, ThemeViewMode } from './components/Header';
import { StoryBar } from './components/StoryBar';
import { HeroSection } from './components/HeroSection';
import { TrustBadges } from './components/TrustBadges';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSlider } from './components/TestimonialsSlider';
import { ArticlesSection } from './components/ArticlesSection';
import { FaqSection } from './components/FaqSection';
import { ContactAndBookingSection } from './components/ContactAndBookingSection';
import { Footer } from './components/Footer';
import { LawyerDashboard } from './components/LawyerDashboard';
import { ElementorBuilder } from './components/ElementorBuilder';
import { ShortcodesHub } from './components/ShortcodesHub';
import { SystemArchitectureHub } from './components/SystemArchitectureHub';
import { WordPressCodeViewer } from './components/WordPressCodeViewer';
import { OnboardingTour } from './components/OnboardingTour';
import { HelpAndDocsModal } from './components/HelpAndDocsModal';
import { SurveyWidgetModal } from './components/SurveyWidgetModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';

import {
  SERVICES_DATA,
  STORIES_DATA,
  TESTIMONIALS_DATA,
  ARTICLES_DATA,
  FAQ_DATA,
} from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState<ThemeViewMode>('preview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const [selectedServiceToBook, setSelectedServiceToBook] = useState<string>('');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleBookService = (serviceTitle: string) => {
    setSelectedServiceToBook(serviceTitle);
    if (activeView !== 'preview') {
      setActiveView('preview');
    }
    setTimeout(() => {
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenCaseTracker = () => {
    if (activeView !== 'preview') {
      setActiveView('preview');
    }
    setTimeout(() => {
      const el = document.getElementById('cases');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] dark:bg-[#070D1E] text-[#0B132B] dark:text-gray-100 transition-colors duration-300 font-persian">
      {/* Sticky Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenTour={() => setIsTourOpen(true)}
        onOpenSurvey={() => setIsSurveyOpen(true)}
      />

      {/* Main Content Area based on active view */}
      <main>
        {activeView === 'preview' && (
          <div>
            {/* 1. Legal Stories Bar */}
            <StoryBar stories={STORIES_DATA} />

            {/* 2. Hero Section */}
            <HeroSection
              onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
              onOpenCaseTracker={handleOpenCaseTracker}
            />

            {/* 3. Trust Counters */}
            <TrustBadges />

            {/* 4. Services Grid & Modals */}
            <ServicesSection
              services={SERVICES_DATA}
              onBookService={handleBookService}
            />

            {/* 5. About Attorney & Bio */}
            <AboutSection />

            {/* 6. Testimonials Slider */}
            <TestimonialsSlider testimonials={TESTIMONIALS_DATA} />

            {/* 7. Legal Articles */}
            <ArticlesSection articles={ARTICLES_DATA} />

            {/* 8. FAQ Accordion */}
            <FaqSection faqs={FAQ_DATA} />

            {/* 9. Contact, Booking & Case Status Tracker */}
            <ContactAndBookingSection preselectedService={selectedServiceToBook} />

            {/* 10. Footer */}
            <Footer />
          </div>
        )}

        {activeView === 'dashboard' && <LawyerDashboard />}

        {activeView === 'elementor' && <ElementorBuilder />}

        {activeView === 'shortcodes' && <ShortcodesHub />}

        {activeView === 'architecture' && <SystemArchitectureHub />}

        {activeView === 'code' && <WordPressCodeViewer />}
      </main>

      {/* Interactive Onboarding Tour Modal */}
      <OnboardingTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNavigateView={(view) => setActiveView(view)}
      />

      {/* Help & Documentation Modal */}
      <HelpAndDocsModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        onStartTour={() => {
          setIsHelpOpen(false);
          setIsTourOpen(true);
        }}
      />

      {/* Client Survey & Feedback Modal (Section 18) */}
      <SurveyWidgetModal
        isOpen={isSurveyOpen}
        onClose={() => setIsSurveyOpen(false)}
      />

      {/* GDPR / Cookie Consent Banner (Section 13) */}
      <CookieConsentBanner />
    </div>
  );
}
