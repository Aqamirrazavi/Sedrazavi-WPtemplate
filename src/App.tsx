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
import { LegalFinancialSuite } from './components/legal-finance/LegalFinancialSuite';
import { LegalOdrSuite } from './components/legal-odr/LegalOdrSuite';
import { LegalIntelligenceSuite } from './components/legal-ai/LegalIntelligenceSuite';
import { LegalStrategySuite } from './components/legal-strategy/LegalStrategySuite';
import { CorporateInternationalSuite } from './components/corporate-international/CorporateInternationalSuite';
import { ArchiveView } from './components/ArchiveView';
import { SingleContentView } from './components/SingleContentView';
import { OnboardingTour } from './components/OnboardingTour';
import { HelpAndDocsModal } from './components/HelpAndDocsModal';
import { SurveyWidgetModal } from './components/SurveyWidgetModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { GoldScrollSidebar } from './components/GoldScrollSidebar';
import { AboutPageView } from './components/AboutPageView';
import { ServicesPageView } from './components/ServicesPageView';
import { ContactPageView } from './components/ContactPageView';
import { CaseTrackingPageView } from './components/CaseTrackingPageView';
import { OtpAuthModal } from './components/OtpAuthModal';
import { QuickCallbackModal } from './components/QuickCallbackModal';
import { LawyerHeroSlider } from './components/LawyerHeroSlider';
import { TextBannerSlider } from './components/TextBannerSlider';
import {
  LawyerSiteProfile,
  getStoredLawyerProfile,
} from './utils/lawyerCustomizationStorage';

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
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isQuickCallbackOpen, setIsQuickCallbackOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedServiceToBook, setSelectedServiceToBook] = useState<string>('');

  // Dynamic Lawyer Customization Profile (Allows attorney to fully customize without Elementor)
  const [lawyerProfile, setLawyerProfile] = useState<LawyerSiteProfile>(getStoredLawyerProfile());

  useEffect(() => {
    const handleProfileUpdate = (e: any) => {
      if (e.detail) {
        setLawyerProfile(e.detail);
      } else {
        setLawyerProfile(getStoredLawyerProfile());
      }
    };
    window.addEventListener('lawyer-profile-updated', handleProfileUpdate);
    return () => window.removeEventListener('lawyer-profile-updated', handleProfileUpdate);
  }, []);
  
  // Single and Archive view states
  const [singleContentType, setSingleContentType] = useState<'article' | 'video'>('article');
  const [selectedArticleId, setSelectedArticleId] = useState<string>(ARTICLES_DATA[0]?.id || '1');
  const [selectedVideoId, setSelectedVideoId] = useState<string>('vid-1');
  const [archiveInitialType, setArchiveInitialType] = useState<'all' | 'article' | 'video'>('all');

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

  const handleSelectArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setSingleContentType('article');
    setActiveView('single');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
    setSingleContentType('video');
    setActiveView('single');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArchive = (type: 'all' | 'article' | 'video' = 'all') => {
    setArchiveInitialType(type);
    setActiveView('archive');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        lawyerProfile={lawyerProfile}
        onSelectService={(serviceSlug) => {
          setActiveView('preview');
          setTimeout(() => {
            const el = document.getElementById('services');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
        onOpenArticleArchive={() => handleOpenArchive('article')}
        onOpenVideoArchive={() => handleOpenArchive('video')}
        onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
        onOpenOtpAuth={() => setIsOtpModalOpen(true)}
        onOpenQuickCallback={() => setIsQuickCallbackOpen(true)}
        isLoggedIn={isLoggedIn}
        currentUserPhone={userPhone}
        onLogout={() => {
          setIsLoggedIn(false);
          setUserPhone('');
          setUserName('');
        }}
      />

      {/* Floating Yellow/Gold Scroll Sidebar & ScrollSpy Progress Tracker */}
      <GoldScrollSidebar
        isMainPage={activeView === 'preview'}
        onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
        onOpenCaseTracker={handleOpenCaseTracker}
        onOpenFinance={() => setActiveView('finance')}
        onOpenPhase5={() => setActiveView('odr-suite')}
        onOpenPhase6={() => setActiveView('legal-ai')}
        onOpenPhase7={() => setActiveView('strategy-suite')}
        onOpenPhase8={() => setActiveView('corporate-suite')}
        onNavigateSection={(sectionId) => {
          if (activeView !== 'preview') {
            setActiveView('preview');
            setTimeout(() => {
              const el = document.getElementById(sectionId);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Main Content Area based on active view */}
      <main>
        {activeView === 'preview' && (
          <div>
            {/* 0. Religious & Literary Text Banner Slider (SPEC Part 3 Section 4 & Part 4 Section 1) */}
            {lawyerProfile.showBannerSlider !== false && (
              <TextBannerSlider slides={lawyerProfile.bannerSlides} />
            )}

            {/* 1. Legal Stories Bar (Editable in Admin Panel) */}
            <div id="stories">
              <StoryBar
                stories={lawyerProfile.stories && lawyerProfile.stories.length > 0 ? lawyerProfile.stories : STORIES_DATA}
                onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
              />
            </div>

            {/* 1.5. Dynamic Lawyer Hero Slider / Carousel (Under Stories) */}
            {lawyerProfile.heroSlider && lawyerProfile.heroSlider.length > 0 && (
              <div id="slider" className="border-b border-gray-200/60 dark:border-gray-800">
                <LawyerHeroSlider
                  slides={lawyerProfile.heroSlider}
                  lawyerName={lawyerProfile.lawyerName}
                  onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
                  onOpenQuickCallback={() => setIsQuickCallbackOpen(true)}
                />
              </div>
            )}

            {/* 2. Hero Section (Dynamic Profile Connected) */}
            <div id="hero">
              <HeroSection
                profile={lawyerProfile}
                onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
                onOpenCaseTracker={handleOpenCaseTracker}
                onOpenQuickCallback={() => setIsQuickCallbackOpen(true)}
                onOpenOtpAuth={() => setIsOtpModalOpen(true)}
              />
            </div>

            {/* 3. Trust Counters */}
            <div id="stats">
              <TrustBadges experienceYears={lawyerProfile.experienceYears} />
            </div>

            {/* 4. Services Grid & Modals */}
            <div id="services">
              <ServicesSection
                services={SERVICES_DATA}
                onBookService={handleBookService}
              />
            </div>

            {/* 5. About Attorney & Bio (Dynamic Profile Connected) */}
            <div id="about">
              <AboutSection profile={lawyerProfile} />
            </div>

            {/* 6. Testimonials Slider */}
            <div id="testimonials">
              <TestimonialsSlider testimonials={TESTIMONIALS_DATA} />
            </div>

            {/* 7. Legal Articles */}
            <div id="articles">
              <ArticlesSection
                articles={ARTICLES_DATA}
                onOpenArchive={() => handleOpenArchive('article')}
                onSelectArticle={handleSelectArticle}
              />
            </div>

            {/* 8. FAQ Accordion */}
            <div id="faq">
              <FaqSection faqs={FAQ_DATA} />
            </div>

            {/* 9. Contact, Booking & Case Status Tracker */}
            <div id="booking">
              <div id="tracking"></div>
              <div id="cases"></div>
              <ContactAndBookingSection preselectedService={selectedServiceToBook} />
            </div>

            {/* 10. Footer */}
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
            />
          </div>
        )}

        {/* Dedicated Standalone Pages (کل برگه‌ها) */}
        {activeView === 'about-page' && (
          <div>
            <AboutPageView
              onBookConsultation={() => handleBookService(SERVICES_DATA[0].title)}
              onBackToHome={() => setActiveView('preview')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
            />
          </div>
        )}

        {activeView === 'services-page' && (
          <div>
            <ServicesPageView
              onBookService={handleBookService}
              onBackToHome={() => setActiveView('preview')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
            />
          </div>
        )}

        {activeView === 'contact-page' && (
          <div>
            <ContactPageView onBackToHome={() => setActiveView('preview')} />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
            />
          </div>
        )}

        {activeView === 'tracking-page' && (
          <div>
            <CaseTrackingPageView
              onBackToHome={() => setActiveView('preview')}
              onBookConsultation={() => handleBookService(SERVICES_DATA[0].title)}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
            />
          </div>
        )}

        {/* Dynamic Archive View (archive.php & archive-video.php) */}
        {activeView === 'archive' && (
          <div>
            <ArchiveView
              initialType={archiveInitialType}
              onSelectArticle={handleSelectArticle}
              onSelectVideo={handleSelectVideo}
              onBackToHome={() => setActiveView('preview')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
            />
          </div>
        )}

        {/* Dynamic Single Post/Video View (single.php & single-video.php) */}
        {activeView === 'single' && (
          <div>
            <SingleContentView
              contentType={singleContentType}
              articleId={selectedArticleId}
              videoId={selectedVideoId}
              onBackToArchive={() => setActiveView('archive')}
              onSelectRelatedArticle={handleSelectArticle}
              onSelectRelatedVideo={handleSelectVideo}
              onBookConsultation={() => handleBookService(SERVICES_DATA[0].title)}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
            />
          </div>
        )}

        {activeView === 'dashboard' && (
          <div>
            <LawyerDashboard
              initialPortalMode={isLoggedIn ? 'client' : 'attorney'}
              userPhoneNumber={userPhone}
              userName={userName}
              lawyerProfile={lawyerProfile}
              onUpdateLawyerProfile={(updated) => setLawyerProfile(updated)}
              onLogout={() => {
                setIsLoggedIn(false);
                setUserPhone('');
                setUserName('');
              }}
              onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
            />
          </div>
        )}

        {activeView === 'elementor' && <ElementorBuilder />}

        {activeView === 'shortcodes' && <ShortcodesHub />}

        {activeView === 'architecture' && <SystemArchitectureHub />}

        {activeView === 'finance' && (
          <div>
            <LegalFinancialSuite
              onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
              onOpenCaseTracker={handleOpenCaseTracker}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
            />
          </div>
        )}

        {activeView === 'odr-suite' && (
          <div>
            <LegalOdrSuite
              onBackToHome={() => setActiveView('preview')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
            />
          </div>
        )}

        {activeView === 'legal-ai' && (
          <div>
            <LegalIntelligenceSuite
              onBackToHome={() => setActiveView('preview')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
            />
          </div>
        )}

        {activeView === 'strategy-suite' && (
          <div>
            <LegalStrategySuite
              onBackToHome={() => setActiveView('preview')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
            />
          </div>
        )}

        {activeView === 'corporate-suite' && (
          <div>
            <CorporateInternationalSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenBooking={() => handleBookService('مشاوره حقوقی شرکت‌ها و تجارت بین‌الملل')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
            />
          </div>
        )}

        {activeView === 'code' && <WordPressCodeViewer />}
      </main>

      {/* OTP Login & Client Registration Modal */}
      <OtpAuthModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onOpenQuickCallback={() => setIsQuickCallbackOpen(true)}
        onLoginSuccess={(phone, name) => {
          setIsLoggedIn(true);
          setUserPhone(phone);
          setUserName(name || 'موکل گرامی');
          setActiveView('dashboard');
        }}
      />

      {/* Quick Callback Request Modal (Without Registration - Priority #1) */}
      <QuickCallbackModal
        isOpen={isQuickCallbackOpen}
        onClose={() => setIsQuickCallbackOpen(false)}
        onOpenOtpLogin={() => setIsOtpModalOpen(true)}
      />

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
