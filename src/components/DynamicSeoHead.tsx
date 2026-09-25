import React, { useEffect } from 'react';
import { LawyerSiteProfile } from '../utils/lawyerCustomizationStorage';
import {
  getDynamicPageTitle,
  getDynamicMetaDescription,
  generateDynamicJsonLd
} from '../utils/dynamicSeoGenerator';

interface DynamicSeoHeadProps {
  profile?: LawyerSiteProfile;
}

export const DynamicSeoHead: React.FC<DynamicSeoHeadProps> = ({ profile }) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Dynamic Title
    const dynamicTitle = getDynamicPageTitle(profile);
    document.title = dynamicTitle;

    // 2. Dynamic Meta Description
    const dynamicDescription = getDynamicMetaDescription(profile);
    let descMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.name = 'description';
      document.head.appendChild(descMeta);
    }
    descMeta.content = dynamicDescription;

    // 3. OpenGraph Title & Description
    let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    if (ogTitle) ogTitle.content = dynamicTitle;

    let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
    if (ogDesc) ogDesc.content = dynamicDescription;

    let twTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null;
    if (twTitle) twTitle.content = dynamicTitle;

    let twDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null;
    if (twDesc) twDesc.content = dynamicDescription;

    // 4. Dynamic Schema.org JSON-LD injection
    const jsonLdData = generateDynamicJsonLd(profile, window.location.origin);
    let scriptTag = document.getElementById('sr-dynamic-schema') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'sr-dynamic-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLdData, null, 2);
  }, [profile, profile?.firmScenario?.currentScenario]);

  return null; // Side-effect only component
};
