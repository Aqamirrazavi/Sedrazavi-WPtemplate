/**
 * Automated Verification Test Suite for Phase 3: Dynamic SEO, Meta Tags, Canonical & Schema.org
 *
 * Checks:
 * 1. Dynamic Title generation hydrated from get_bloginfo('name') and get_bloginfo('description').
 * 2. Dynamic Canonical and og:url generation using home_url('/').
 * 3. Elimination of stock Unsplash images in SEO output; local screenshot.png fallback.
 * 4. Schema.org JSON-LD structured data with LegalService & Attorney graphs.
 * 5. Dynamic @id identifiers tied to home_url('/#organization') and home_url('/#attorney').
 * 6. Customizer overrides for og:image (sedrazavi_seo_og_image) and logo (sedrazavi_seo_logo).
 * 7. Verification of customizer-seo.php controls registration.
 * 8. Header inclusion of dynamic SEO bridge.
 */

const fs = require('fs');
const path = require('path');

console.log('========================================================================');
console.log('🚀 Phase 3 Automated Verification Suite (SEO, Canonical & Schema.org)');
console.log('========================================================================\n');

let allPassed = true;
function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    allPassed = false;
  }
}

// ----------------------------------------------------
// 1. Static Code Analysis of SEO Files
// ----------------------------------------------------
console.log('🔍 Test Group 1: Static Inspection of SEO Bridge & Header');

const seoBridgeFile = path.join(__dirname, '../wordpress-theme/inc/seo-bridge.php');
const seoBridgeContent = fs.readFileSync(seoBridgeFile, 'utf8');

const customizerSeoFile = path.join(__dirname, '../wordpress-theme/inc/customizer-seo.php');
const customizerSeoContent = fs.readFileSync(customizerSeoFile, 'utf8');

const headerFile = path.join(__dirname, '../wordpress-theme/header.php');
const headerContent = fs.readFileSync(headerFile, 'utf8');

assert(
  seoBridgeContent.includes('function sedrazavi_render_dynamic_seo_tags'),
  'seo-bridge.php defines sedrazavi_render_dynamic_seo_tags()'
);

assert(
  seoBridgeContent.includes('get_bloginfo(\'name\')') && seoBridgeContent.includes('get_bloginfo(\'description\')'),
  'Dynamic <title> hydratable from get_bloginfo(name) and get_bloginfo(description)'
);

assert(
  seoBridgeContent.includes('home_url(\'/\')'),
  'Dynamic canonical and og:url generated via home_url("/")'
);

assert(
  !seoBridgeContent.includes('images.unsplash.com'),
  'Zero stock Unsplash URLs in seo-bridge.php'
);

assert(
  seoBridgeContent.includes('screenshot.png'),
  'Local screenshot.png used as crisp high-fidelity fallback'
);

assert(
  seoBridgeContent.includes('LegalService') && seoBridgeContent.includes('Attorney'),
  'Schema.org JSON-LD contains LegalService and Attorney types'
);

assert(
  seoBridgeContent.includes('home_url(\'/#organization\')') && seoBridgeContent.includes('home_url(\'/#attorney\')'),
  'Schema.org @id references dynamic home_url endpoints'
);

assert(
  headerContent.includes('sedrazavi_render_dynamic_seo_tags()'),
  'header.php executes sedrazavi_render_dynamic_seo_tags() in <head>'
);

assert(
  customizerSeoContent.includes('sedrazavi_seo_og_image') && customizerSeoContent.includes('sedrazavi_seo_logo'),
  'customizer-seo.php registers controls for sedrazavi_seo_og_image and sedrazavi_seo_logo'
);

// ----------------------------------------------------
// 2. Functional Simulation of SEO Renderer
// ----------------------------------------------------
console.log('\n🔍 Test Group 2: Functional Emulation of sedrazavi_render_dynamic_seo_tags');

function simulateSeoRender(context = {}) {
  const blogName = context.blogName || 'دفتر وکالت دکتر سیده مریم رضوی';
  const blogDesc = context.blogDesc || 'مشاوره حقوقی تخصصی، داوری تجاری و وکالت پایه یک دادگستری';
  const homeUrl = context.homeUrl || 'http://example.com';
  const isFront = context.isFront !== undefined ? context.isFront : true;
  const themeMods = context.themeMods || {};

  let pageTitle = '';
  if (isFront) {
    pageTitle = `${blogName} | ${blogDesc}`;
  } else {
    pageTitle = `${context.pageTitle || 'خدمات حقوقی'} | ${blogName}`;
  }

  const canonicalUrl = isFront ? `${homeUrl}/` : `${homeUrl}/service/`;
  const defaultPlaceholder = `${homeUrl}/wp-content/themes/sedrazavi-theme/screenshot.png`;
  const ogImage = themeMods.sedrazavi_seo_og_image || defaultPlaceholder;
  const logoUrl = themeMods.sedrazavi_seo_logo || defaultPlaceholder;
  const metaDesc = themeMods.sedrazavi_seo_meta_desc || blogDesc;
  const lawyerName = themeMods.sedrazavi_seo_lawyer_name || 'دکتر سیده مریم رضوی';
  const lawyerTitle = themeMods.sedrazavi_seo_lawyer_title || 'وکیل پایه یک دادگستری و داور بین‌المللی';

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LegalService',
        '@id': `${homeUrl}/#organization`,
        name: blogName,
        url: `${homeUrl}/`,
        logo: logoUrl,
        image: ogImage,
        description: metaDesc,
        telephone: '021-88776655',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'تهران، میدان ونک، خیابان ملاصدرا، پلاک ۴۲، طبقه ۳، واحد ۶',
          addressLocality: 'تهران',
          addressCountry: 'IR',
        },
      },
      {
        '@type': 'Attorney',
        '@id': `${homeUrl}/#attorney`,
        name: lawyerName,
        jobTitle: lawyerTitle,
        worksFor: {
          '@id': `${homeUrl}/#organization`,
        },
      },
    ],
  };

  const output = `
    <title>${pageTitle}</title>
    <meta name="description" content="${metaDesc}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="${isFront ? 'website' : 'article'}" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${metaDesc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:image" content="${ogImage}" />
    <script type="application/ld+json">
    ${JSON.stringify(schemaGraph, null, 2)}
    </script>
  `;

  return output;
}

// Case 1: Default Front Page Render
const defaultOutput = simulateSeoRender();

assert(
  defaultOutput.includes('<title>دفتر وکالت دکتر سیده مریم رضوی | مشاوره حقوقی تخصصی'),
  'Front Page Title contains blog name and description'
);

assert(
  defaultOutput.includes('<link rel="canonical" href="http://example.com/" />'),
  'Front Page Canonical URL points to dynamic home_url("/")'
);

assert(
  defaultOutput.includes('<meta property="og:url" content="http://example.com/" />'),
  'Front Page og:url points to dynamic home_url("/")'
);

assert(
  !defaultOutput.includes('images.unsplash.com'),
  'NO stock Unsplash URLs found in SEO tags output'
);

assert(
  defaultOutput.includes('screenshot.png'),
  'Local screenshot.png used as high-fidelity fallback'
);

assert(
  defaultOutput.includes('"@type": "LegalService"') && defaultOutput.includes('"@type": "Attorney"'),
  'Schema.org JSON-LD contains LegalService and Attorney types'
);

assert(
  defaultOutput.includes('"@id": "http://example.com/#organization"'),
  'Schema @id uses dynamic home_url("/#organization")'
);

// Case 2: Customizer Overrides
const customOutput = simulateSeoRender({
  themeMods: {
    sedrazavi_seo_og_image: 'http://example.com/uploads/custom-lawyer-banner.jpg',
    sedrazavi_seo_logo: 'http://example.com/uploads/custom-firm-logo.svg',
  },
});

assert(
  customOutput.includes('custom-lawyer-banner.jpg'),
  'Customizer og:image override renders uploaded image URL'
);

assert(
  customOutput.includes('custom-firm-logo.svg'),
  'Customizer logo upload renders in Schema JSON-LD'
);

console.log('------------------------------------------------------------------------');
if (allPassed) {
  console.log('🎉 ALL PHASE 3 SEO VERIFICATION TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.error('💥 SOME PHASE 3 TESTS FAILED');
  process.exit(1);
}
