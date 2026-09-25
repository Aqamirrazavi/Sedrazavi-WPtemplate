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
import { IntellectualPropertySuite } from './components/intellectual-property/IntellectualPropertySuite';
import { CyberForensicsSuite } from './components/cyber-forensics/CyberForensicsSuite';
import { FinancialComplianceSuite } from './components/compliance-financial/FinancialComplianceSuite';
import { RealEstateConstructionSuite } from './components/real-estate-construction/RealEstateConstructionSuite';
import { FamilyInheritanceSuite } from './components/family-inheritance/FamilyInheritanceSuite';
import { LegalAutomationLibrary } from './components/automation/LegalAutomationLibrary';
import { AdministrativeJusticeSuite } from './components/administrative-justice/AdministrativeJusticeSuite';
import { DualModeLawyerAuth } from './components/auth-dual-mode/DualModeLawyerAuth';
import { UnifiedDualPanelSuite } from './components/dual-panel-unified/UnifiedDualPanelSuite';
import { AdminPagesProtectionSuite } from './components/admin-protection/AdminPagesProtectionSuite';
import { DesignTokensManagerSuite } from './components/design-tokens/DesignTokensManagerSuite';
import { AdvancedAjaxSearchSuite } from './components/search-filter/AdvancedAjaxSearchSuite';
import { CasePredictionRiskSuite } from './components/case-prediction/CasePredictionRiskSuite';
import { EngineeringProcurementSuite } from './components/epc-procurement/EngineeringProcurementSuite';
import { InternationalArbitrationSuite } from './components/international-arbitration/InternationalArbitrationSuite';
import { ComprehensiveCodexSuite } from './components/legal-codex/ComprehensiveCodexSuite';
import { MasterDraftingVaultSuite } from './components/drafting-vault/MasterDraftingVaultSuite';
import { TaxDisputesMoadianSuite } from './components/tax-moadian/TaxDisputesMoadianSuite';
import { LaborSocialSecuritySuite } from './components/labor-social-security/LaborSocialSecuritySuite';
import { EconomicCrimesDefenseSuite } from './components/economic-crimes/EconomicCrimesDefenseSuite';
import { CustomsTransitDisputesSuite } from './components/customs-transit/CustomsTransitDisputesSuite';
import { LegalCrmSmartNotifierSuite } from './components/legal-crm-notifier/LegalCrmSmartNotifierSuite';
import { FullElementorIntegrationSuite } from './components/elementor-integration/FullElementorIntegrationSuite';
import { PaymentAdapterSystemSuite } from './components/payment-adapter/PaymentAdapterSystemSuite';
import { LegalAssociateReferralSuite } from './components/associate-referral/LegalAssociateReferralSuite';
import { SupremeCourtAppealsSuite } from './components/supreme-court-appeals/SupremeCourtAppealsSuite';
import { CommercialArbitrationSuite } from './components/commercial-arbitration/CommercialArbitrationSuite';
import { GovernmentTendersGuaranteesSuite } from './components/government-tenders/GovernmentTendersGuaranteesSuite';
import { ArchiveView } from './components/ArchiveView';
import { SingleContentView } from './components/SingleContentView';
import { SingleServiceView } from './components/SingleServiceView';
import { NotFoundPageView } from './components/NotFoundPageView';
import { InstagramGalleryPageView } from './components/InstagramGalleryPageView';
import { OnboardingTour } from './components/OnboardingTour';
import { HelpAndDocsModal } from './components/HelpAndDocsModal';
import { SurveyWidgetModal } from './components/SurveyWidgetModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { GoldScrollSidebar } from './components/GoldScrollSidebar';
import { TeamHierarchySection } from './components/TeamHierarchySection';
import { AboutPageView } from './components/AboutPageView';
import { ServicesPageView } from './components/ServicesPageView';
import { ContactPageView } from './components/ContactPageView';
import { CaseTrackingPageView } from './components/CaseTrackingPageView';
import { LiveConsultationDrawer } from './components/LiveConsultationDrawer';
import { OtpAuthModal } from './components/OtpAuthModal';
import { QuickCallbackModal } from './components/QuickCallbackModal';
import { LawyerHeroSlider } from './components/LawyerHeroSlider';
import { TextBannerSlider } from './components/TextBannerSlider';
import { ClientPortalView } from './components/ClientPortalView';
import { VectorBackgroundRenderer } from './components/VectorBackgroundRenderer';
import { Scale, User, Briefcase, Lock } from 'lucide-react';
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
  const [isLiveConsultationOpen, setIsLiveConsultationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'guest' | 'client' | 'lawyer' | 'admin'>('guest');
  const [otpModalInitialTab, setOtpModalInitialTab] = useState<'client' | 'lawyer'>('client');
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [selectedServiceToBook, setSelectedServiceToBook] = useState<string>('');

  const handleLoginSuccess = (
    identifier: string,
    name?: string,
    role: 'client' | 'lawyer' | 'admin' = 'client'
  ) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserPhone(identifier);
    setUserName(name || (role === 'lawyer' ? 'دکتر سیده مریم رضوی' : 'موکل گرامی'));
    setActiveView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('guest');
    setUserPhone('');
    setUserName('');
    setActiveView('preview');
  };

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
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES_DATA[0]?.id || 'srv-1');
  const [archiveInitialType, setArchiveInitialType] = useState<'all' | 'article' | 'video'>('all');

  const handleOpenSingleService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveView('single-service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div className="min-h-screen bg-[#F4F6F9] dark:bg-[#070D1E] text-[#0B132B] dark:text-gray-100 transition-colors duration-300 font-persian relative">
      {/* 30 Animated & Static Abstract Vector Line Backgrounds (Adapts dynamically to the active backend theme palette) */}
      <VectorBackgroundRenderer
        presetId={lawyerProfile.appearance?.vectorBackground?.presetId || 'dynamic-flowing-waves'}
        opacity={lawyerProfile.appearance?.vectorBackground?.opacity ?? 0.65}
        speed={lawyerProfile.appearance?.vectorBackground?.speed || 'normal'}
        mode={lawyerProfile.appearance?.vectorBackground?.mode || 'animated'}
        isAnimated={lawyerProfile.appearance?.vectorBackground?.isAnimated ?? true}
        blendMode={lawyerProfile.appearance?.vectorBackground?.blendMode || 'normal'}
      />

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
        onOpenOtpAuth={() => {
          setOtpModalInitialTab('client');
          setIsOtpModalOpen(true);
        }}
        onOpenQuickCallback={() => setIsQuickCallbackOpen(true)}
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        currentUserPhone={userPhone}
        onLogout={handleLogout}
      />

      {/* Floating Yellow/Gold Scroll Sidebar & ScrollSpy Progress Tracker */}
      <GoldScrollSidebar
        isMainPage={activeView === 'preview'}
        onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
        onOpenCaseTracker={handleOpenCaseTracker}
        onOpenLiveConsultation={() => setIsLiveConsultationOpen(true)}
        onOpenFinance={() => setActiveView('finance')}
        onOpenPhase5={() => setActiveView('odr-suite')}
        onOpenPhase6={() => setActiveView('legal-ai')}
        onOpenPhase7={() => setActiveView('strategy-suite')}
        onOpenPhase8={() => setActiveView('corporate-suite')}
        onOpenPhase9={() => setActiveView('ip-suite')}
        onOpenPhase10={() => setActiveView('cyber-suite')}
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
      <main className="bg-legal-vector min-h-screen">
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

            {/* 1.5. Dynamic Lawyer Hero Slider / Carousel (Under Stories - Optional to prevent visual clutter) */}
            {lawyerProfile.showHeroSlider && lawyerProfile.heroSlider && lawyerProfile.heroSlider.length > 0 && (
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

            {/* 5.5 Team & Hierarchy Section (Dynamic based on Scenario: Solo / Partners / Senior+Associates / Enterprise) */}
            <TeamHierarchySection
              profile={lawyerProfile}
              onOpenBooking={(lawyerName) => handleBookService(SERVICES_DATA[0].title)}
            />

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
              <ContactAndBookingSection
                preselectedService={selectedServiceToBook}
                profile={lawyerProfile}
              />
            </div>

            {/* 10. Footer */}
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
              onOpenPhase9={() => setActiveView('ip-suite')}
              onOpenPhase10={() => setActiveView('cyber-suite')}
              onOpenPhase11={() => setActiveView('compliance-suite')}
              onOpenPhase12={() => setActiveView('real-estate-suite')}
              onOpenPhase13={() => setActiveView('family-inheritance')}
              onOpenPhase14={() => setActiveView('automation')}
              onOpenPhase15={() => setActiveView('admin-justice')}
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
              onOpenPhase8={() => setActiveView('corporate-suite')}
            />
          </div>
        )}

        {activeView === 'services-page' && (
          <div>
            <ServicesPageView
              onBookService={handleBookService}
              onBackToHome={() => setActiveView('preview')}
              onOpenSingleService={handleOpenSingleService}
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

        {activeView === 'single-service' && (
          <div>
            <SingleServiceView
              serviceId={selectedServiceId}
              onBackToServices={() => setActiveView('services-page')}
              onSelectService={(id) => setSelectedServiceId(id)}
              onBookConsultation={handleBookService}
              onContactLawyer={() => setActiveView('contact-page')}
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

        {activeView === 'instagram-gallery' && (
          <div>
            <InstagramGalleryPageView
              onBackToHome={() => setActiveView('preview')}
              onBookConsultation={() => handleBookService(SERVICES_DATA[0].title)}
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

        {activeView === 'not-found' && (
          <div>
            <NotFoundPageView
              onBackToHome={() => setActiveView('preview')}
              onNavigateView={(view) => {
                if (view === 'services') setActiveView('services-page');
                else if (view === 'archive') setActiveView('archive');
                else if (view === 'contact') setActiveView('contact-page');
                else setActiveView('preview');
              }}
              onBookConsultation={() => handleBookService(SERVICES_DATA[0].title)}
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

        {activeView === 'contact-page' && (
          <div>
            <ContactPageView onBackToHome={() => setActiveView('preview')} />
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
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
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
              onSelectService={(serviceSlug) => {
                setActiveView('preview');
                setTimeout(() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              onBackToHome={() => setActiveView('preview')}
              onOpenBooking={() => handleBookService('مشاوره حقوقی تخصصی')}
              onOpenProfile={() => setActiveView('about-page')}
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
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
            />
          </div>
        )}

        {activeView === 'dashboard' && (
          <div>
            {userRole === 'client' ? (
              <div className="py-8 min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <ClientPortalView
                    userPhoneNumber={userPhone}
                    userName={userName}
                    onLogout={handleLogout}
                    onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
                    onBackToMainDashboard={() => setActiveView('preview')}
                  />
                </div>
              </div>
            ) : userRole === 'lawyer' || userRole === 'admin' ? (
              <LawyerDashboard
                initialPortalMode="attorney"
                userPhoneNumber={userPhone}
                userName={userName}
                lawyerProfile={lawyerProfile}
                onUpdateLawyerProfile={(updated) => setLawyerProfile(updated)}
                onLogout={handleLogout}
                onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
              />
            ) : (
              /* Security Barrier for Unauthenticated Guests */
              <div className="min-h-[75vh] flex items-center justify-center p-4">
                <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-[#0B132B] border border-gray-200 dark:border-gray-800 shadow-2xl text-center space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-[#D4AF37] flex items-center justify-center shadow-inner">
                    <Scale className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-serif text-[#0B132B] dark:text-white">
                      پیشخوان اختصاصی و محرمانه
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                      جهت حفظ محرمانگی اسناد پرونده‌های موکلین و ابزارهای راهبری وکیل، دسترسی به این بخش نیازمند ورود به حساب کاربری است.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOtpModalInitialTab('client');
                        setIsOtpModalOpen(true);
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0B132B] font-bold text-xs shadow-md shadow-[#D4AF37]/25 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      <span>ورود موکلین و مراجعین (با پیامک یا رمز)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setOtpModalInitialTab('lawyer');
                        setIsOtpModalOpen(true);
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#0B132B] dark:bg-gray-800 hover:bg-[#1C2541] text-white border border-[#D4AF37]/50 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Briefcase className="w-4 h-4 text-[#D4AF37]" />
                      <span>ورود وکیل دادگستری (با رمز مدیریت وردپرس)</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
                    <button
                      type="button"
                      onClick={() => setActiveView('preview')}
                      className="text-xs text-gray-500 dark:text-gray-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      بازگشت به صفحه اصلی سایت
                    </button>
                  </div>
                </div>
              </div>
            )}
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
              onOpenPhase9={() => setActiveView('ip-suite')}
              onOpenPhase10={() => setActiveView('cyber-suite')}
              onOpenPhase11={() => setActiveView('compliance-suite')}
              onOpenPhase12={() => setActiveView('real-estate-suite')}
              onOpenPhase13={() => setActiveView('family-inheritance')}
              onOpenPhase14={() => setActiveView('automation')}
              onOpenPhase15={() => setActiveView('admin-justice')}
              onOpenPhase16={() => setActiveView('auth-dual-mode')}
              onOpenPhase17={() => setActiveView('dual-panel-unified')}
              onOpenPhase18={() => setActiveView('admin-protection')}
              onOpenPhase19={() => setActiveView('design-tokens')}
              onOpenPhase20={() => setActiveView('ajax-search')}
              onOpenPhase21={() => setActiveView('case-prediction')}
              onOpenPhase22={() => setActiveView('epc-procurement')}
              onOpenPhase23={() => setActiveView('intl-arbitration')}
              onOpenPhase24={() => setActiveView('legal-codex')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
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
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
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
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
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
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
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
              onOpenPhase9={() => setActiveView('ip-suite')}
            />
          </div>
        )}

        {activeView === 'ip-suite' && (
          <div>
            <IntellectualPropertySuite
              onBackToHome={() => setActiveView('preview')}
              onOpenBooking={() => handleBookService('مشاوره تخصصی مالکیت فکری، استارتاپ‌ها و لایسنس نرم‌افزار')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
              onOpenPhase9={() => setActiveView('ip-suite')}
              onOpenPhase10={() => setActiveView('cyber-suite')}
            />
          </div>
        )}

        {activeView === 'cyber-suite' && (
          <div>
            <CyberForensicsSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenBooking={() => handleBookService('مشاوره تخصصی جرایم سایبری، دادسرای فتا و امنیت قراردادهای هوشمند')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
              onOpenPhase9={() => setActiveView('ip-suite')}
              onOpenPhase10={() => setActiveView('cyber-suite')}
              onOpenPhase11={() => setActiveView('compliance-suite')}
            />
          </div>
        )}

        {activeView === 'compliance-suite' && (
          <div>
            <FinancialComplianceSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenConsultationModal={() => handleBookService('مشاوره تخصصی مبارزه با پولشویی (AML)، جرایم اقتصادی و تطبیق بانکی')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
              onOpenPhase9={() => setActiveView('ip-suite')}
              onOpenPhase10={() => setActiveView('cyber-suite')}
              onOpenPhase11={() => setActiveView('compliance-suite')}
              onOpenPhase12={() => setActiveView('real-estate-suite')}
            />
          </div>
        )}

        {activeView === 'real-estate-suite' && (
          <div>
            <RealEstateConstructionSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenBooking={() => handleBookService('مشاوره تخصصی دعاوی ملکی، مشارکت در ساخت، سرقفلی و کمیسیون ماده ۱۰۰')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
              onOpenPhase9={() => setActiveView('ip-suite')}
              onOpenPhase10={() => setActiveView('cyber-suite')}
              onOpenPhase11={() => setActiveView('compliance-suite')}
              onOpenPhase12={() => setActiveView('real-estate-suite')}
            />
          </div>
        )}

        {activeView === 'family-inheritance' && (
          <div>
            <FamilyInheritanceSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenBooking={() => handleBookService('مشاوره تخصصی انحصار وراثت، تقسیم ترکه، مهریه و حقوق خانواده')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
              onOpenPhase9={() => setActiveView('ip-suite')}
              onOpenPhase10={() => setActiveView('cyber-suite')}
              onOpenPhase11={() => setActiveView('compliance-suite')}
              onOpenPhase12={() => setActiveView('real-estate-suite')}
            />
          </div>
        )}

        {activeView === 'automation' && (
          <div>
            <LegalAutomationLibrary
              onBackToHome={() => setActiveView('preview')}
              onOpenBooking={() => handleBookService('مشاوره تخصصی اتوماسیون، تنظیم قرارداد و بررسی پرونده')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
              onOpenPhase9={() => setActiveView('ip-suite')}
              onOpenPhase10={() => setActiveView('cyber-suite')}
              onOpenPhase11={() => setActiveView('compliance-suite')}
              onOpenPhase12={() => setActiveView('real-estate-suite')}
            />
          </div>
        )}

        {activeView === 'admin-justice' && (
          <div>
            <AdministrativeJusticeSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenBooking={() => handleBookService('مشاوره تخصصی دیوان عدالت اداری، کمیسیون ماده ۱۰۰ و دعاوی استخدامی')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase5={() => setActiveView('odr-suite')}
              onOpenPhase6={() => setActiveView('legal-ai')}
              onOpenPhase7={() => setActiveView('strategy-suite')}
              onOpenPhase8={() => setActiveView('corporate-suite')}
              onOpenPhase9={() => setActiveView('ip-suite')}
              onOpenPhase10={() => setActiveView('cyber-suite')}
              onOpenPhase11={() => setActiveView('compliance-suite')}
              onOpenPhase12={() => setActiveView('real-estate-suite')}
              onOpenPhase16={() => setActiveView('auth-dual-mode')}
              onOpenPhase17={() => setActiveView('dual-panel-unified')}
              onOpenPhase18={() => setActiveView('admin-protection')}
              onOpenPhase19={() => setActiveView('design-tokens')}
              onOpenPhase20={() => setActiveView('ajax-search')}
            />
          </div>
        )}

        {activeView === 'auth-dual-mode' && (
          <div>
            <DualModeLawyerAuth
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase16={() => setActiveView('auth-dual-mode')}
              onOpenPhase17={() => setActiveView('dual-panel-unified')}
              onOpenPhase18={() => setActiveView('admin-protection')}
              onOpenPhase19={() => setActiveView('design-tokens')}
              onOpenPhase20={() => setActiveView('ajax-search')}
            />
          </div>
        )}

        {activeView === 'dual-panel-unified' && (
          <div>
            <UnifiedDualPanelSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase16={() => setActiveView('auth-dual-mode')}
              onOpenPhase17={() => setActiveView('dual-panel-unified')}
              onOpenPhase18={() => setActiveView('admin-protection')}
              onOpenPhase19={() => setActiveView('design-tokens')}
              onOpenPhase20={() => setActiveView('ajax-search')}
            />
          </div>
        )}

        {activeView === 'admin-protection' && (
          <div>
            <AdminPagesProtectionSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase16={() => setActiveView('auth-dual-mode')}
              onOpenPhase17={() => setActiveView('dual-panel-unified')}
              onOpenPhase18={() => setActiveView('admin-protection')}
              onOpenPhase19={() => setActiveView('design-tokens')}
              onOpenPhase20={() => setActiveView('ajax-search')}
            />
          </div>
        )}

        {activeView === 'design-tokens' && (
          <div>
            <DesignTokensManagerSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase16={() => setActiveView('auth-dual-mode')}
              onOpenPhase17={() => setActiveView('dual-panel-unified')}
              onOpenPhase18={() => setActiveView('admin-protection')}
              onOpenPhase19={() => setActiveView('design-tokens')}
              onOpenPhase20={() => setActiveView('ajax-search')}
            />
          </div>
        )}

        {activeView === 'ajax-search' && (
          <div>
            <AdvancedAjaxSearchSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase16={() => setActiveView('auth-dual-mode')}
              onOpenPhase17={() => setActiveView('dual-panel-unified')}
              onOpenPhase18={() => setActiveView('admin-protection')}
              onOpenPhase19={() => setActiveView('design-tokens')}
              onOpenPhase20={() => setActiveView('ajax-search')}
              onOpenPhase21={() => setActiveView('case-prediction')}
              onOpenPhase22={() => setActiveView('epc-procurement')}
              onOpenPhase23={() => setActiveView('intl-arbitration')}
              onOpenPhase24={() => setActiveView('legal-codex')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
            />
          </div>
        )}

        {activeView === 'case-prediction' && (
          <div>
            <CasePredictionRiskSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase20={() => setActiveView('ajax-search')}
              onOpenPhase21={() => setActiveView('case-prediction')}
              onOpenPhase22={() => setActiveView('epc-procurement')}
              onOpenPhase23={() => setActiveView('intl-arbitration')}
              onOpenPhase24={() => setActiveView('legal-codex')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
            />
          </div>
        )}

        {activeView === 'epc-procurement' && (
          <div>
            <EngineeringProcurementSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase21={() => setActiveView('case-prediction')}
              onOpenPhase22={() => setActiveView('epc-procurement')}
              onOpenPhase23={() => setActiveView('intl-arbitration')}
              onOpenPhase24={() => setActiveView('legal-codex')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
            />
          </div>
        )}

        {activeView === 'intl-arbitration' && (
          <div>
            <InternationalArbitrationSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase21={() => setActiveView('case-prediction')}
              onOpenPhase22={() => setActiveView('epc-procurement')}
              onOpenPhase23={() => setActiveView('intl-arbitration')}
              onOpenPhase24={() => setActiveView('legal-codex')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
            />
          </div>
        )}

        {activeView === 'legal-codex' && (
          <div>
            <ComprehensiveCodexSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase21={() => setActiveView('case-prediction')}
              onOpenPhase22={() => setActiveView('epc-procurement')}
              onOpenPhase23={() => setActiveView('intl-arbitration')}
              onOpenPhase24={() => setActiveView('legal-codex')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
            />
          </div>
        )}

        {activeView === 'drafting-vault' && (
          <div>
            <MasterDraftingVaultSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase21={() => setActiveView('case-prediction')}
              onOpenPhase22={() => setActiveView('epc-procurement')}
              onOpenPhase23={() => setActiveView('intl-arbitration')}
              onOpenPhase24={() => setActiveView('legal-codex')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
            />
          </div>
        )}

        {activeView === 'tax-moadian' && (
          <div>
            <TaxDisputesMoadianSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
            />
          </div>
        )}

        {activeView === 'labor-social' && (
          <div>
            <LaborSocialSecuritySuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
            />
          </div>
        )}

        {activeView === 'economic-crimes' && (
          <div>
            <EconomicCrimesDefenseSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
            />
          </div>
        )}

        {activeView === 'customs-transit' && (
          <div>
            <CustomsTransitDisputesSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
            />
          </div>
        )}

        {activeView === 'legal-crm' && (
          <div>
            <LegalCrmSmartNotifierSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
              onOpenPhase31={() => setActiveView('elementor-pro')}
              onOpenPhase32={() => setActiveView('payment-adapter')}
            />
          </div>
        )}

        {activeView === 'elementor-pro' && (
          <div>
            <FullElementorIntegrationSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
              onOpenPhase31={() => setActiveView('elementor-pro')}
              onOpenPhase32={() => setActiveView('payment-adapter')}
            />
          </div>
        )}

        {activeView === 'payment-adapter' && (
          <div>
            <PaymentAdapterSystemSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
              onOpenPhase31={() => setActiveView('elementor-pro')}
              onOpenPhase32={() => setActiveView('payment-adapter')}
              onOpenPhase33={() => setActiveView('associate-referral')}
              onOpenPhase34={() => setActiveView('supreme-court-appeals')}
              onOpenPhase35={() => setActiveView('commercial-arbitration')}
              onOpenPhase36={() => setActiveView('government-tenders')}
            />
          </div>
        )}

        {activeView === 'associate-referral' && (
          <div>
            <LegalAssociateReferralSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
              onOpenPhase31={() => setActiveView('elementor-pro')}
              onOpenPhase32={() => setActiveView('payment-adapter')}
              onOpenPhase33={() => setActiveView('associate-referral')}
              onOpenPhase34={() => setActiveView('supreme-court-appeals')}
              onOpenPhase35={() => setActiveView('commercial-arbitration')}
              onOpenPhase36={() => setActiveView('government-tenders')}
            />
          </div>
        )}

        {activeView === 'supreme-court-appeals' && (
          <div>
            <SupremeCourtAppealsSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
              onOpenPhase31={() => setActiveView('elementor-pro')}
              onOpenPhase32={() => setActiveView('payment-adapter')}
              onOpenPhase33={() => setActiveView('associate-referral')}
              onOpenPhase34={() => setActiveView('supreme-court-appeals')}
              onOpenPhase35={() => setActiveView('commercial-arbitration')}
              onOpenPhase36={() => setActiveView('government-tenders')}
            />
          </div>
        )}

        {activeView === 'commercial-arbitration' && (
          <div>
            <CommercialArbitrationSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
              onOpenPhase31={() => setActiveView('elementor-pro')}
              onOpenPhase32={() => setActiveView('payment-adapter')}
              onOpenPhase33={() => setActiveView('associate-referral')}
              onOpenPhase34={() => setActiveView('supreme-court-appeals')}
              onOpenPhase35={() => setActiveView('commercial-arbitration')}
              onOpenPhase36={() => setActiveView('government-tenders')}
            />
          </div>
        )}

        {activeView === 'government-tenders' && (
          <div>
            <GovernmentTendersGuaranteesSuite
              onBackToHome={() => setActiveView('preview')}
              onOpenDashboard={() => setActiveView('dashboard')}
            />
            <Footer
              profile={lawyerProfile}
              onOpenFinance={() => setActiveView('finance')}
              onOpenPhase25={() => setActiveView('drafting-vault')}
              onOpenPhase26={() => setActiveView('tax-moadian')}
              onOpenPhase27={() => setActiveView('labor-social')}
              onOpenPhase28={() => setActiveView('economic-crimes')}
              onOpenPhase29={() => setActiveView('customs-transit')}
              onOpenPhase30={() => setActiveView('legal-crm')}
              onOpenPhase31={() => setActiveView('elementor-pro')}
              onOpenPhase32={() => setActiveView('payment-adapter')}
              onOpenPhase33={() => setActiveView('associate-referral')}
              onOpenPhase34={() => setActiveView('supreme-court-appeals')}
              onOpenPhase35={() => setActiveView('commercial-arbitration')}
              onOpenPhase36={() => setActiveView('government-tenders')}
            />
          </div>
        )}

        {activeView === 'code' && <WordPressCodeViewer />}
      </main>

      {/* OTP Login & Client Registration Modal */}
      <OtpAuthModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        initialRoleTab={otpModalInitialTab}
        onOpenQuickCallback={() => setIsQuickCallbackOpen(true)}
        onLoginSuccess={(identifier, name, role) => {
          handleLoginSuccess(identifier, name, role);
        }}
      />

      {/* Quick Callback Request Modal (Without Registration - Priority #1) */}
      <QuickCallbackModal
        isOpen={isQuickCallbackOpen}
        onClose={() => setIsQuickCallbackOpen(false)}
        onOpenOtpLogin={() => setIsOtpModalOpen(true)}
      />

      {/* Multi-Channel Live Legal Consultation & Triage Drawer */}
      <LiveConsultationDrawer
        isOpen={isLiveConsultationOpen}
        onClose={() => setIsLiveConsultationOpen(false)}
        onBookConsultation={() => {
          setIsLiveConsultationOpen(false);
          handleBookService(SERVICES_DATA[0].title);
        }}
        onOpenCaseTracker={() => {
          setIsLiveConsultationOpen(false);
          setActiveView('case-tracking');
        }}
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
