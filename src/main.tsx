import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { DesignTokensProvider } from './context/DesignTokensContext';
import './index.css';

// Modular React Components for WordPress Shortcodes & Elementor Widgets
import { FirmMilestone } from './components/FirmMilestone';
import { KeyPracticeAreasRadarChart } from './components/KeyPracticeAreasRadarChart';
import { LawyerPrintBioCard } from './components/LawyerPrintBioCard';
import { EmailOtpMagicLogin } from './components/EmailOtpMagicLogin';
import { EmailOtpAuthComponent } from './components/auth/EmailOtpAuthComponent';
import { LawyerRealtimeToastNotifier } from './components/notifications/LawyerRealtimeToastNotifier';
import { CaseInteractiveTimeline } from './components/timeline/CaseInteractiveTimeline';
import { CaseProgressTracker } from './components/CaseProgressTracker';
import { ClientPortalQuickAccessWidget } from './components/ClientPortalQuickAccessWidget';
import { LawyerHeroSlider } from './components/LawyerHeroSlider';
import { TextBannerSlider } from './components/TextBannerSlider';
import { StoryBar } from './components/StoryBar';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { FaqSection } from './components/FaqSection';
import { TestimonialsSlider } from './components/TestimonialsSlider';
import { ContactAndBookingSection } from './components/ContactAndBookingSection';
import { ArticlesSection } from './components/ArticlesSection';

// Heavy secondary components lazy-loaded on demand for WordPress shortcodes
const LazyComprehensiveAdminPortal = React.lazy(() => import('./components/admin/ComprehensiveAdminPortal').then(m => ({ default: m.ComprehensiveAdminPortal })));
const ComprehensiveAdminPortal: React.FC<any> = (props) => (
  <React.Suspense fallback={<div className="p-8 text-center text-[#D4AF37]">در حال بارگذاری پنل مدیریت...</div>}>
    <LazyComprehensiveAdminPortal {...props} />
  </React.Suspense>
);

const LazyAdminHelpAndDocsSystem = React.lazy(() => import('./components/admin/AdminHelpAndDocsSystem').then(m => ({ default: m.AdminHelpAndDocsSystem })));
const AdminHelpAndDocsSystem: React.FC<any> = (props) => (
  <React.Suspense fallback={<div className="p-8 text-center text-[#D4AF37]">در حال بارگذاری راهنما...</div>}>
    <LazyAdminHelpAndDocsSystem {...props} />
  </React.Suspense>
);

const LazyLawyerDashboard = React.lazy(() => import('./components/LawyerDashboard').then(m => ({ default: m.LawyerDashboard })));
const LawyerDashboard: React.FC<any> = (props) => (
  <React.Suspense fallback={<div className="p-8 text-center text-[#D4AF37]">در حال بارگذاری داشبورد...</div>}>
    <LazyLawyerDashboard {...props} />
  </React.Suspense>
);

const LazyClientPortalView = React.lazy(() => import('./components/ClientPortalView').then(m => ({ default: m.ClientPortalView })));
const ClientPortalView: React.FC<any> = (props) => (
  <React.Suspense fallback={<div className="p-8 text-center text-[#D4AF37]">در حال بارگذاری پورتال موکل...</div>}>
    <LazyClientPortalView {...props} />
  </React.Suspense>
);

const LazyCourtFeeCalculator = React.lazy(() => import('./components/legal-finance/CourtFeeCalculator').then(m => ({ default: m.CourtFeeCalculator })));
const CourtFeeCalculator: React.FC<any> = (props) => (
  <React.Suspense fallback={<div className="p-8 text-center text-[#D4AF37]">در حال بارگذاری محاسبه‌گر قضایی...</div>}>
    <LazyCourtFeeCalculator {...props} />
  </React.Suspense>
);

const LazyCorporateInsolvencySuite = React.lazy(() => import('./components/corporate-insolvency/CorporateInsolvencySuite').then(m => ({ default: m.CorporateInsolvencySuite })));
const CorporateInsolvencySuite: React.FC<any> = (props) => (
  <React.Suspense fallback={<div className="p-8 text-center text-[#D4AF37]">در حال بارگذاری سامانه ورشکستگی...</div>}>
    <LazyCorporateInsolvencySuite {...props} />
  </React.Suspense>
);

// Specialized Legal Suites Lazy Loaded for WordPress Shortcodes
const createLazySuite = (loader: () => Promise<{ default: React.ComponentType<any> }>, title: string): React.FC<any> => {
  const LazyComponent = React.lazy(loader);
  return (props: any) => (
    <React.Suspense fallback={<div className="p-8 text-center text-[#D4AF37]">در حال بارگذاری {title}...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

const LegalFinancialSuite = createLazySuite(() => import('./components/legal-finance/LegalFinancialSuite').then(m => ({ default: m.LegalFinancialSuite })), 'سامانه محاسبات و امور مالی حقوقی');
const LegalOdrSuite = createLazySuite(() => import('./components/legal-odr/LegalOdrSuite').then(m => ({ default: m.LegalOdrSuite })), 'سامانه داوری و حل اختلاف آنلاین');
const LegalIntelligenceSuite = createLazySuite(() => import('./components/legal-ai/LegalIntelligenceSuite').then(m => ({ default: m.LegalIntelligenceSuite })), 'هوش مصنوعی و رویه‌های قضایی');
const LegalStrategySuite = createLazySuite(() => import('./components/legal-strategy/LegalStrategySuite').then(m => ({ default: m.LegalStrategySuite })), 'اتاق استراتژی دفاع و لوایح');
const CorporateInternationalSuite = createLazySuite(() => import('./components/corporate-international/CorporateInternationalSuite').then(m => ({ default: m.CorporateInternationalSuite })), 'سامانه حقوق تجارت و بین‌الملل');
const IntellectualPropertySuite = createLazySuite(() => import('./components/intellectual-property/IntellectualPropertySuite').then(m => ({ default: m.IntellectualPropertySuite })), 'مالکیت فکری و برندها');
const CyberForensicsSuite = createLazySuite(() => import('./components/cyber-forensics/CyberForensicsSuite').then(m => ({ default: m.CyberForensicsSuite })), 'فارنزیک سایبری و ادله دیجیتال');
const FinancialComplianceSuite = createLazySuite(() => import('./components/compliance-financial/FinancialComplianceSuite').then(m => ({ default: m.FinancialComplianceSuite })), 'تطبیق و مبارزه با پولشویی');
const RealEstateConstructionSuite = createLazySuite(() => import('./components/real-estate-construction/RealEstateConstructionSuite').then(m => ({ default: m.RealEstateConstructionSuite })), 'دعاوی ملکی و سرقفلی');
const FamilyInheritanceSuite = createLazySuite(() => import('./components/family-inheritance/FamilyInheritanceSuite').then(m => ({ default: m.FamilyInheritanceSuite })), 'حقوق خانواده و انحصار وراثت');
const LegalAutomationLibrary = createLazySuite(() => import('./components/automation/LegalAutomationLibrary').then(m => ({ default: m.LegalAutomationLibrary })), 'کتابخانه اتوماسیون دادخواست');
const AdministrativeJusticeSuite = createLazySuite(() => import('./components/administrative-justice/AdministrativeJusticeSuite').then(m => ({ default: m.AdministrativeJusticeSuite })), 'دیوان عدالت اداری');
const DualModeLawyerAuth = createLazySuite(() => import('./components/auth-dual-mode/DualModeLawyerAuth').then(m => ({ default: m.DualModeLawyerAuth })), 'ورود دوحالته موکل و وکیل');
const UnifiedDualPanelSuite = createLazySuite(() => import('./components/dual-panel-unified/UnifiedDualPanelSuite').then(m => ({ default: m.UnifiedDualPanelSuite })), 'پنل یکپارچه وکیل و موکل');
const AdminPagesProtectionSuite = createLazySuite(() => import('./components/admin-protection/AdminPagesProtectionSuite').then(m => ({ default: m.AdminPagesProtectionSuite })), 'حفاظت از صفحات ادمین');
const DesignTokensManagerSuite = createLazySuite(() => import('./components/design-tokens/DesignTokensManagerSuite').then(m => ({ default: m.DesignTokensManagerSuite })), 'مدیریت دیزاین توکن‌ها');
const AdvancedAjaxSearchSuite = createLazySuite(() => import('./components/search-filter/AdvancedAjaxSearchSuite').then(m => ({ default: m.AdvancedAjaxSearchSuite })), 'جستجوی پیشرفته حقوقی');
const CasePredictionRiskSuite = createLazySuite(() => import('./components/case-prediction/CasePredictionRiskSuite').then(m => ({ default: m.CasePredictionRiskSuite })), 'پیش‌بینی ریسک دادرسی');
const EngineeringProcurementSuite = createLazySuite(() => import('./components/epc-procurement/EngineeringProcurementSuite').then(m => ({ default: m.EngineeringProcurementSuite })), 'قراردادهای پیمانکاری و EPC');
const InternationalArbitrationSuite = createLazySuite(() => import('./components/international-arbitration/InternationalArbitrationSuite').then(m => ({ default: m.InternationalArbitrationSuite })), 'داوری تجاری بین‌المللی');
const ComprehensiveCodexSuite = createLazySuite(() => import('./components/legal-codex/ComprehensiveCodexSuite').then(m => ({ default: m.ComprehensiveCodexSuite })), 'مجموعه قوانین و کدکس');
const MasterDraftingVaultSuite = createLazySuite(() => import('./components/drafting-vault/MasterDraftingVaultSuite').then(m => ({ default: m.MasterDraftingVaultSuite })), 'گنجینه نگارش لوایح');
const TaxDisputesMoadianSuite = createLazySuite(() => import('./components/tax-moadian/TaxDisputesMoadianSuite').then(m => ({ default: m.TaxDisputesMoadianSuite })), 'دعاوی مالیاتی و سامانه مودیان');
const LaborSocialSecuritySuite = createLazySuite(() => import('./components/labor-social-security/LaborSocialSecuritySuite').then(m => ({ default: m.LaborSocialSecuritySuite })), 'دعاوی کار و تامین اجتماعی');
const EconomicCrimesDefenseSuite = createLazySuite(() => import('./components/economic-crimes/EconomicCrimesDefenseSuite').then(m => ({ default: m.EconomicCrimesDefenseSuite })), 'دفاع در جرایم اقتصادی');
const CustomsTransitDisputesSuite = createLazySuite(() => import('./components/customs-transit/CustomsTransitDisputesSuite').then(m => ({ default: m.CustomsTransitDisputesSuite })), 'دعاوی گمرک و ترانزیت');
const LegalCrmSmartNotifierSuite = createLazySuite(() => import('./components/legal-crm-notifier/LegalCrmSmartNotifierSuite').then(m => ({ default: m.LegalCrmSmartNotifierSuite })), 'سی‌آر‌ام و پیام‌رسان هوشمند');
const FullElementorIntegrationSuite = createLazySuite(() => import('./components/elementor-integration/FullElementorIntegrationSuite').then(m => ({ default: m.FullElementorIntegrationSuite })), 'یکپارچه‌سازی المنتور');
const PaymentAdapterSystemSuite = createLazySuite(() => import('./components/payment-adapter/PaymentAdapterSystemSuite').then(m => ({ default: m.PaymentAdapterSystemSuite })), 'درگاه پرداخت و حق‌الوکاله');
const LegalAssociateReferralSuite = createLazySuite(() => import('./components/associate-referral/LegalAssociateReferralSuite').then(m => ({ default: m.LegalAssociateReferralSuite })), 'شبکه ارجاع وکلای همکار');
const SupremeCourtAppealsSuite = createLazySuite(() => import('./components/supreme-court-appeals/SupremeCourtAppealsSuite').then(m => ({ default: m.SupremeCourtAppealsSuite })), 'فرجام‌خواهی دیوان عالی');
const CommercialArbitrationSuite = createLazySuite(() => import('./components/commercial-arbitration/CommercialArbitrationSuite').then(m => ({ default: m.CommercialArbitrationSuite })), 'داوری تجاری و بازرگانی');
const GovernmentTendersGuaranteesSuite = createLazySuite(() => import('./components/government-tenders/GovernmentTendersGuaranteesSuite').then(m => ({ default: m.GovernmentTendersGuaranteesSuite })), 'مناقصات دولتی و ضمانت‌نامه‌ها');
const ContractAuditAnalyzer = createLazySuite(() => import('./components/legal-ai/ContractAuditAnalyzer').then(m => ({ default: m.ContractAuditAnalyzer })), 'ممیزی هوشمند قراردادها');
const PetitionGeneratorModal = createLazySuite(() => import('./components/legal-odr/PetitionGeneratorModal').then(m => ({ default: m.PetitionGeneratorModal })), 'سامانه تنظیم دادخواست عدل‌ایران');
const VirtualHearingRoom = createLazySuite(() => import('./components/legal-odr/VirtualHearingRoom').then(m => ({ default: m.VirtualHearingRoom })), 'تالار دادگاه مجازی و استماع');

// Expose React & ReactDOM globally for WordPress integration
if (typeof window !== 'undefined') {
  (window as any).React = React;
  (window as any).ReactDOM = { createRoot };

  // Central Component Registry for WordPress
  (window as any).SedRazaviReactComponents = {
    App,
    FirmMilestone,
    KeyPracticeAreasRadarChart,
    LawyerPrintBioCard,
    EmailOtpMagicLogin,
    EmailOtpAuthComponent,
    LawyerRealtimeToastNotifier,
    CaseInteractiveTimeline,
    ComprehensiveAdminPortal,
    AdminHelpAndDocsSystem,
    LawyerDashboard,
    ClientPortalView,
    CaseProgressTracker,
    CourtFeeCalculator,
    ClientPortalQuickAccessWidget,
    LawyerHeroSlider,
    TextBannerSlider,
    StoryBar,
    ServicesSection,
    AboutSection,
    FaqSection,
    TestimonialsSlider,
    ContactAndBookingSection,
    ArticlesSection,
    CorporateInsolvencySuite,
    LegalFinancialSuite,
    LegalOdrSuite,
    LegalIntelligenceSuite,
    LegalStrategySuite,
    CorporateInternationalSuite,
    IntellectualPropertySuite,
    CyberForensicsSuite,
    FinancialComplianceSuite,
    RealEstateConstructionSuite,
    FamilyInheritanceSuite,
    LegalAutomationLibrary,
    AdministrativeJusticeSuite,
    DualModeLawyerAuth,
    UnifiedDualPanelSuite,
    AdminPagesProtectionSuite,
    DesignTokensManagerSuite,
    AdvancedAjaxSearchSuite,
    CasePredictionRiskSuite,
    EngineeringProcurementSuite,
    InternationalArbitrationSuite,
    ComprehensiveCodexSuite,
    MasterDraftingVaultSuite,
    TaxDisputesMoadianSuite,
    LaborSocialSecuritySuite,
    EconomicCrimesDefenseSuite,
    CustomsTransitDisputesSuite,
    LegalCrmSmartNotifierSuite,
    FullElementorIntegrationSuite,
    PaymentAdapterSystemSuite,
    LegalAssociateReferralSuite,
    SupremeCourtAppealsSuite,
    CommercialArbitrationSuite,
    GovernmentTendersGuaranteesSuite,
    ContractAuditAnalyzer,
    PetitionGeneratorModal,
    VirtualHearingRoom,
  };

  /**
   * Helper function to mount WordPress shortcode roots
   */
  (window as any).mountSedRazaviReactRoots = function () {
    const targets = document.querySelectorAll('.sedrazavi-react-root:not([data-mounted="true"])');
    targets.forEach((node) => {
      const componentName = node.getAttribute('data-component');
      const rawProps = node.getAttribute('data-props');
      let props: any = {};
      try {
        props = rawProps ? JSON.parse(rawProps) : {};
      } catch (err) {
        console.error('Error parsing JSON props for ' + componentName, err);
      }

      if ((window as any).SedRazaviReactConfig) {
        props.serverContext = (window as any).SedRazaviReactConfig;
      }

      const Component = (window as any).SedRazaviReactComponents?.[componentName || ''];
      if (Component) {
        try {
          node.setAttribute('data-mounted', 'true');
          const skeleton = node.querySelector('.sedrazavi-skeleton-container');
          if (skeleton) skeleton.remove();

          const root = createRoot(node as HTMLElement);
          root.render(
            <StrictMode>
              <DesignTokensProvider>
                <Component {...props} />
              </DesignTokensProvider>
            </StrictMode>
          );
        } catch (mountErr) {
          console.error('Failed to mount component ' + componentName, mountErr);
        }
      }
    });
  };

  // Run automatically if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', (window as any).mountSedRazaviReactRoots);
  } else {
    setTimeout((window as any).mountSedRazaviReactRoots, 50);
  }

  window.addEventListener('load', (window as any).mountSedRazaviReactRoots);
}

// Mount full SPA App if #root exists (Standard applet container)
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <DesignTokensProvider>
        <App />
      </DesignTokensProvider>
    </StrictMode>,
  );
}
