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
