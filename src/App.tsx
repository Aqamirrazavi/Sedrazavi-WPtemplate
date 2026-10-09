import React, { useState, useEffect } from 'react';
import { Header, ThemeViewMode } from './components/Header';
import { ToastProvider } from './context/ToastContext';
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

// Code-split dynamic suites & pages (Loaded only on-demand)
const LawyerDashboard = React.lazy(() => import('./components/LawyerDashboard').then(m => ({ default: m.LawyerDashboard })));
const ElementorBuilder = React.lazy(() => import('./components/ElementorBuilder').then(m => ({ default: m.ElementorBuilder })));
const ShortcodesHub = React.lazy(() => import('./components/ShortcodesHub').then(m => ({ default: m.ShortcodesHub })));
const SystemArchitectureHub = React.lazy(() => import('./components/SystemArchitectureHub').then(m => ({ default: m.SystemArchitectureHub })));
const WordPressCodeViewer = React.lazy(() => import('./components/WordPressCodeViewer').then(m => ({ default: m.WordPressCodeViewer })));
const LegalFinancialSuite = React.lazy(() => import('./components/legal-finance/LegalFinancialSuite').then(m => ({ default: m.LegalFinancialSuite })));
const LegalOdrSuite = React.lazy(() => import('./components/legal-odr/LegalOdrSuite').then(m => ({ default: m.LegalOdrSuite })));
const LegalIntelligenceSuite = React.lazy(() => import('./components/legal-ai/LegalIntelligenceSuite').then(m => ({ default: m.LegalIntelligenceSuite })));
const LegalStrategySuite = React.lazy(() => import('./components/legal-strategy/LegalStrategySuite').then(m => ({ default: m.LegalStrategySuite })));
const CorporateInternationalSuite = React.lazy(() => import('./components/corporate-international/CorporateInternationalSuite').then(m => ({ default: m.CorporateInternationalSuite })));
const IntellectualPropertySuite = React.lazy(() => import('./components/intellectual-property/IntellectualPropertySuite').then(m => ({ default: m.IntellectualPropertySuite })));
const CyberForensicsSuite = React.lazy(() => import('./components/cyber-forensics/CyberForensicsSuite').then(m => ({ default: m.CyberForensicsSuite })));
const FinancialComplianceSuite = React.lazy(() => import('./components/compliance-financial/FinancialComplianceSuite').then(m => ({ default: m.FinancialComplianceSuite })));
const RealEstateConstructionSuite = React.lazy(() => import('./components/real-estate-construction/RealEstateConstructionSuite').then(m => ({ default: m.RealEstateConstructionSuite })));
const FamilyInheritanceSuite = React.lazy(() => import('./components/family-inheritance/FamilyInheritanceSuite').then(m => ({ default: m.FamilyInheritanceSuite })));
const LegalAutomationLibrary = React.lazy(() => import('./components/automation/LegalAutomationLibrary').then(m => ({ default: m.LegalAutomationLibrary })));
const AdministrativeJusticeSuite = React.lazy(() => import('./components/administrative-justice/AdministrativeJusticeSuite').then(m => ({ default: m.AdministrativeJusticeSuite })));
const DualModeLawyerAuth = React.lazy(() => import('./components/auth-dual-mode/DualModeLawyerAuth').then(m => ({ default: m.DualModeLawyerAuth })));
const UnifiedDualPanelSuite = React.lazy(() => import('./components/dual-panel-unified/UnifiedDualPanelSuite').then(m => ({ default: m.UnifiedDualPanelSuite })));
const AdminPagesProtectionSuite = React.lazy(() => import('./components/admin-protection/AdminPagesProtectionSuite').then(m => ({ default: m.AdminPagesProtectionSuite })));
const DesignTokensManagerSuite = React.lazy(() => import('./components/design-tokens/DesignTokensManagerSuite').then(m => ({ default: m.DesignTokensManagerSuite })));
const AdvancedAjaxSearchSuite = React.lazy(() => import('./components/search-filter/AdvancedAjaxSearchSuite').then(m => ({ default: m.AdvancedAjaxSearchSuite })));
const CasePredictionRiskSuite = React.lazy(() => import('./components/case-prediction/CasePredictionRiskSuite').then(m => ({ default: m.CasePredictionRiskSuite })));
const EngineeringProcurementSuite = React.lazy(() => import('./components/epc-procurement/EngineeringProcurementSuite').then(m => ({ default: m.EngineeringProcurementSuite })));
const InternationalArbitrationSuite = React.lazy(() => import('./components/international-arbitration/InternationalArbitrationSuite').then(m => ({ default: m.InternationalArbitrationSuite })));
const ComprehensiveCodexSuite = React.lazy(() => import('./components/legal-codex/ComprehensiveCodexSuite').then(m => ({ default: m.ComprehensiveCodexSuite })));
const MasterDraftingVaultSuite = React.lazy(() => import('./components/drafting-vault/MasterDraftingVaultSuite').then(m => ({ default: m.MasterDraftingVaultSuite })));
const TaxDisputesMoadianSuite = React.lazy(() => import('./components/tax-moadian/TaxDisputesMoadianSuite').then(m => ({ default: m.TaxDisputesMoadianSuite })));
const LaborSocialSecuritySuite = React.lazy(() => import('./components/labor-social-security/LaborSocialSecuritySuite').then(m => ({ default: m.LaborSocialSecuritySuite })));
const EconomicCrimesDefenseSuite = React.lazy(() => import('./components/economic-crimes/EconomicCrimesDefenseSuite').then(m => ({ default: m.EconomicCrimesDefenseSuite })));
const CustomsTransitDisputesSuite = React.lazy(() => import('./components/customs-transit/CustomsTransitDisputesSuite').then(m => ({ default: m.CustomsTransitDisputesSuite })));
const LegalCrmSmartNotifierSuite = React.lazy(() => import('./components/legal-crm-notifier/LegalCrmSmartNotifierSuite').then(m => ({ default: m.LegalCrmSmartNotifierSuite })));
const FullElementorIntegrationSuite = React.lazy(() => import('./components/elementor-integration/FullElementorIntegrationSuite').then(m => ({ default: m.FullElementorIntegrationSuite })));
const PaymentAdapterSystemSuite = React.lazy(() => import('./components/payment-adapter/PaymentAdapterSystemSuite').then(m => ({ default: m.PaymentAdapterSystemSuite })));
const LegalAssociateReferralSuite = React.lazy(() => import('./components/associate-referral/LegalAssociateReferralSuite').then(m => ({ default: m.LegalAssociateReferralSuite })));
const SupremeCourtAppealsSuite = React.lazy(() => import('./components/supreme-court-appeals/SupremeCourtAppealsSuite').then(m => ({ default: m.SupremeCourtAppealsSuite })));
const CommercialArbitrationSuite = React.lazy(() => import('./components/commercial-arbitration/CommercialArbitrationSuite').then(m => ({ default: m.CommercialArbitrationSuite })));
const GovernmentTendersGuaranteesSuite = React.lazy(() => import('./components/government-tenders/GovernmentTendersGuaranteesSuite').then(m => ({ default: m.GovernmentTendersGuaranteesSuite })));
const CorporateInsolvencySuite = React.lazy(() => import('./components/corporate-insolvency/CorporateInsolvencySuite').then(m => ({ default: m.CorporateInsolvencySuite })));
const ArchiveView = React.lazy(() => import('./components/ArchiveView').then(m => ({ default: m.ArchiveView })));
const SingleContentView = React.lazy(() => import('./components/SingleContentView').then(m => ({ default: m.SingleContentView })));
const SingleServiceView = React.lazy(() => import('./components/SingleServiceView').then(m => ({ default: m.SingleServiceView })));
const NotFoundPageView = React.lazy(() => import('./components/NotFoundPageView').then(m => ({ default: m.NotFoundPageView })));
const InstagramGalleryPageView = React.lazy(() => import('./components/InstagramGalleryPageView').then(m => ({ default: m.InstagramGalleryPageView })));
const AboutPageView = React.lazy(() => import('./components/AboutPageView').then(m => ({ default: m.AboutPageView })));
const ServicesPageView = React.lazy(() => import('./components/ServicesPageView').then(m => ({ default: m.ServicesPageView })));
const ContactPageView = React.lazy(() => import('./components/ContactPageView').then(m => ({ default: m.ContactPageView })));
const CaseTrackingPageView = React.lazy(() => import('./components/CaseTrackingPageView').then(m => ({ default: m.CaseTrackingPageView })));
const ClientPortalView = React.lazy(() => import('./components/ClientPortalView').then(m => ({ default: m.ClientPortalView })));
const ComprehensiveAdminPortal = React.lazy(() => import('./components/admin/ComprehensiveAdminPortal').then(m => ({ default: m.ComprehensiveAdminPortal })));
const AdminHelpAndDocsSystem = React.lazy(() => import('./components/admin/AdminHelpAndDocsSystem').then(m => ({ default: m.AdminHelpAndDocsSystem })));

import { OnboardingTour } from './components/OnboardingTour';
import { HelpAndDocsModal } from './components/HelpAndDocsModal';
import { SurveyWidgetModal } from './components/SurveyWidgetModal';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { GoldScrollSidebar } from './components/GoldScrollSidebar';
import { TeamHierarchySection } from './components/TeamHierarchySection';
import { DynamicSeoHead } from './components/DynamicSeoHead';
import { QuickCaseTrackerModal } from './components/QuickCaseTrackerModal';
import { HtmlCssExportModal } from './components/HtmlCssExportModal';
import { LiveConsultationDrawer } from './components/LiveConsultationDrawer';
import { OtpAuthModal } from './components/OtpAuthModal';
import { QuickCallbackModal } from './components/QuickCallbackModal';
import { LawyerHeroSlider } from './components/LawyerHeroSlider';
import { TextBannerSlider } from './components/TextBannerSlider';
import { VectorBackgroundRenderer } from './components/VectorBackgroundRenderer';
import { EmailOtpAuthComponent } from './components/auth/EmailOtpAuthComponent';
import { Scale, User, Briefcase, Lock, X } from 'lucide-react';
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
  const [isEmailOtpModalOpen, setIsEmailOtpModalOpen] = useState(false);
  const [isQuickCallbackOpen, setIsQuickCallbackOpen] = useState(false);
  const [isLiveConsultationOpen, setIsLiveConsultationOpen] = useState(false);
  const [isQuickCaseTrackerOpen, setIsQuickCaseTrackerOpen] = useState(false);
  const [isHtmlCssExportOpen, setIsHtmlCssExportOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'guest' | 'client' | 'lawyer' | 'admin'>('guest');
  const [adminDashboardMode, setAdminDashboardMode] = useState<'lawyer_dashboard' | 'admin_portal' | 'client_portal'>('lawyer_dashboard');
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
    setUserName(name || (role === 'admin' ? 'مدیر ارشد سامانه (ادمین)' : role === 'lawyer' ? 'دکتر سیده مریم رضوی' : 'موکل گرامی'));
    if (role === 'admin' || role === 'lawyer') {
      setAdminDashboardMode('lawyer_dashboard');
    }
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
    setIsQuickCaseTrackerOpen(true);
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
    <ToastProvider>
      <div className="min-h-screen bg-[#F4F6F9] dark:bg-[#070D1E] text-[#0B132B] dark:text-gray-100 transition-colors duration-300 font-persian relative">
      {/* Dynamic SEO Title, Meta Description and Multi-Lawyer Schema.org Engine */}
      <DynamicSeoHead profile={lawyerProfile} />

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
        onOpenHtmlCssExport={() => setIsHtmlCssExportOpen(true)}
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

        {/* Dedicated Standalone Pages & Suites (Code-split with Suspense) */}
        {activeView !== 'preview' && (
          <React.Suspense
            fallback={
              <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 text-center">
                <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
                <p className="text-[#0B132B] dark:text-[#F3E5AB] font-bold text-base">در حال بارگذاری بخش انتخابی...</p>
              </div>
            }
          >
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
              <div className="min-h-screen">
                {/* Admin / Lawyer Dual Role Switcher Bar */}
                <div className="bg-[#0B132B] border-b border-[#D4AF37]/30 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-16 z-30 shadow-lg" dir="rtl">
                  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] text-[#0B132B] flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                        {userRole === 'admin' ? '🛡️' : '⚖️'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-xs sm:text-sm font-bold">
                            {userRole === 'admin'
                              ? 'پیشخوان راهبری مدیر ارشد (دسترسی همزمان ادمین و جانشینی وکیل)'
                              : 'پیشخوان مدیریت وکیل دادگستری'}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                            {userRole === 'admin' ? 'ادمین و وکیل جانشین' : 'وکیل سرپرست'}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-400">
                          {userRole === 'admin'
                            ? 'امکان مدیریت کامل پرونده‌ها، جانشینی وکیل غایب، ارجاع به وکلای شریک و تنظیمات کل سیستم وردپرس'
                            : 'مدیریت پرونده‌های حقوقی، جلسات دادگاه و تعامل با موکلین'}
                        </p>
                      </div>
                    </div>

                    {/* Mode Toggle Buttons */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => setAdminDashboardMode('lawyer_dashboard')}
                        className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          adminDashboardMode === 'lawyer_dashboard'
                            ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/25 font-black'
                            : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/15'
                        }`}
                        title="ورود به میز کار و پیشخوان اختصاصی وکیل (مدیریت پرونده‌ها، اوقات دادگاه، وکلای همکار)"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>⚖️ داشبورد وکیل (پرونده‌ها و جانشینی)</span>
                      </button>

                      <button
                        onClick={() => setAdminDashboardMode('admin_portal')}
                        className={`flex-1 md:flex-initial px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          adminDashboardMode === 'admin_portal'
                            ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/25 font-black'
                            : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/15'
                        }`}
                        title="ورود به پرتال جامع مدیریت سایت (تنظیمات پوسته، لیست مشتریان، نوبت‌دهی و پشتیبانی)"
                      >
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>⚙️ پرتال جامع ادمین سایت</span>
                      </button>

                      <button
                        onClick={() => setAdminDashboardMode('client_portal')}
                        className={`flex-1 md:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          adminDashboardMode === 'client_portal'
                            ? 'bg-[#D4AF37] text-[#0B132B] shadow-md shadow-[#D4AF37]/25 font-black'
                            : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/15'
                        }`}
                        title="مشاهده و شبیه‌سازی کارتابل از زاویه دید موکل"
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>👤 نمای موکلین</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-view Viewport */}
                {adminDashboardMode === 'lawyer_dashboard' ? (
                  <LawyerDashboard
                    userPhoneNumber={userPhone}
                    userName={userName || (userRole === 'admin' ? 'مدیر ارشد سامانه (ادمین)' : 'دکتر سیده مریم رضوی')}
                    userRole={userRole}
                    isAdminActingAsLawyer={userRole === 'admin'}
                    onLogout={handleLogout}
                    onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
                    lawyerProfile={lawyerProfile}
                    onUpdateLawyerProfile={(updated) => setLawyerProfile(updated)}
                    onSwitchToAdminPortal={() => setAdminDashboardMode('admin_portal')}
                  />
                ) : adminDashboardMode === 'admin_portal' ? (
                  <ComprehensiveAdminPortal
                    userPhoneNumber={userPhone}
                    userName={userName}
                    lawyerProfile={lawyerProfile}
                    onUpdateLawyerProfile={(updated) => setLawyerProfile(updated)}
                    onLogout={handleLogout}
                    onBackToHome={() => setActiveView('preview')}
                    onSwitchToLawyerDashboard={() => setAdminDashboardMode('lawyer_dashboard')}
                  />
                ) : (
                  <div className="py-8 min-h-screen">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-[#D4AF37]/30 text-xs text-[#D4AF37] flex items-center justify-between">
                        <span>شما در حال بررسی پرتال موکلین در قالب شبیه‌سازی ادمین هستید.</span>
                        <button
                          onClick={() => setAdminDashboardMode('lawyer_dashboard')}
                          className="px-3 py-1 rounded-lg bg-[#D4AF37] text-[#0B132B] font-bold text-xs"
                        >
                          بازگشت به پیشخوان وکیل
                        </button>
                      </div>
                      <ClientPortalView
                        userPhoneNumber={userPhone}
                        userName={userName || 'مشاهده تستی موکل توسط ادمین'}
                        onLogout={handleLogout}
                        onOpenBooking={() => handleBookService(SERVICES_DATA[0].title)}
                        onBackToMainDashboard={() => setAdminDashboardMode('lawyer_dashboard')}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Direct Email OTP Magic Login Barrier for Unauthenticated Guests */
              <div className="min-h-[80vh] flex items-center justify-center p-4">
                <EmailOtpAuthComponent
                  onLoginSuccess={(identifier, name, role) => {
                    handleLoginSuccess(identifier, name, role);
                  }}
                  title="ورود با رمز یکبار مصرف به پیشخوان حقوقی"
                  subtitle="جهت دسترسی به پنل مدیریت پرونده‌ها و خدمات موکلین، آدرس ایمیل خود را وارد فرمایید."
                  onCancel={() => setActiveView('preview')}
                />
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
              onOpenPhase37={() => setActiveView('corporate-insolvency')}
            />
          </div>
        )}

        {activeView === 'corporate-insolvency' && (
          <div>
            <CorporateInsolvencySuite
              onBackToHome={() => setActiveView('preview')}
              onOpenBooking={() => handleBookService('مشاوره ورشکستگی، تصفیه دیون و قرارداد ارفاقی')}
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
              onOpenPhase37={() => setActiveView('corporate-insolvency')}
            />
          </div>
        )}

        {activeView === 'code' && <WordPressCodeViewer />}
          </React.Suspense>
        )}
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

      {/* Dedicated Email OTP Magic Login Modal */}
      {isEmailOtpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-2xl">
            <button
              onClick={() => setIsEmailOtpModalOpen(false)}
              className="absolute left-5 top-5 p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <EmailOtpAuthComponent
              isModal={true}
              onLoginSuccess={(identifier, name, role) => {
                handleLoginSuccess(identifier, name, role);
                setIsEmailOtpModalOpen(false);
              }}
              onCancel={() => setIsEmailOtpModalOpen(false)}
            />
          </div>
        </div>
      )}

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

      {/* Quick Case Tracking Modal (Direct Instant Inquiry - UI/UX Refinement) */}
      <QuickCaseTrackerModal
        isOpen={isQuickCaseTrackerOpen}
        onClose={() => setIsQuickCaseTrackerOpen(false)}
        onOpenConsultation={() => handleBookService(SERVICES_DATA[0].title)}
      />

      {/* HTML & CSS Snippets Export & WordPress REST API / WP-GraphQL Integration Modal */}
      <HtmlCssExportModal
        isOpen={isHtmlCssExportOpen}
        onClose={() => setIsHtmlCssExportOpen(false)}
      />

      {/* GDPR / Cookie Consent Banner (Section 13) */}
      <CookieConsentBanner />
    </div>
    </ToastProvider>
  );
}
