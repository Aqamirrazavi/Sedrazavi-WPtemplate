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
import { ComprehensiveAdminPortal } from './components/admin/ComprehensiveAdminPortal';
import { AdminHelpAndDocsSystem } from './components/admin/AdminHelpAndDocsSystem';
import { LawyerDashboard } from './components/LawyerDashboard';
import { ClientPortalView } from './components/ClientPortalView';
import { CaseProgressTracker } from './components/CaseProgressTracker';
import { CourtFeeCalculator } from './components/legal-finance/CourtFeeCalculator';
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
import { CorporateInsolvencySuite } from './components/corporate-insolvency/CorporateInsolvencySuite';

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
