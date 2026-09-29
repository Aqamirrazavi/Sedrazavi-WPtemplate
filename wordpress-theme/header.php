<?php
/**
 * سربرگ رسمی پوسته حقوقی و وکالت SedRazavi
 *
 * دربردارنده تگ‌های کامل سئو داینامیک، Open Graph، Twitter Cards،
 * و استراکچردیتای رسمی Schema.org LegalService و Attorney بر پایه توابع بومی وردپرس.
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (!defined('ABSPATH')) {
    exit;
}

$site_url     = esc_url(home_url('/'));
$canonical_url= is_singular() ? esc_url(get_permalink()) : $site_url;
$site_name    = esc_attr(get_bloginfo('name') ?: 'دفتر وکالت و داوری دکتر سیده مریم رضوی');
$site_desc    = esc_attr(get_bloginfo('description') ?: 'پاسدار حقوق فردی و شرکتی، داوری دعاوی تجاری، ملکی و بین‌المللی با سامانه‌های هوشمند آنلاین.');

// تنظیم هوشمند عنوان و متای توضیحات صفحه
if (is_singular()) {
    $meta_title = single_post_title('', false) . ' | ' . $site_name;
    $meta_desc  = has_excerpt() ? wp_strip_all_tags(get_the_excerpt()) : wp_trim_words(wp_strip_all_tags(get_the_content()), 35);
} else {
    $meta_title = $site_name . ' | وکالت تخصصی و داوری بین‌المللی';
    $meta_desc  = $site_desc;
}

// لوگو و تصویر شاخص (استفاده از لوگوی سفارشی وردپرس یا fallback استاندارد)
$custom_logo_id = get_theme_mod('custom_logo');
$logo_url       = $custom_logo_id ? wp_get_attachment_image_url($custom_logo_id, 'full') : esc_url(get_template_directory_uri() . '/screenshot.png');
$og_image       = is_singular() && has_post_thumbnail() ? get_the_post_thumbnail_url(get_the_ID(), 'large') : $logo_url;

$lawyer_name    = get_option('sedrazavi_lawyer_name', 'دکتر سیده مریم رضوی');
$lawyer_title   = get_option('sedrazavi_lawyer_title', 'وکیل پایه یک دادگستری و داور بین‌المللی');
$lawyer_phone   = get_option('sedrazavi_lawyer_phone', '+98-21-88776655');
$lawyer_address = get_option('sedrazavi_lawyer_address', 'تهران، میدان ونک، خیابان ونک، پلاک ۲۸، طبقه ۴');
?><!DOCTYPE html>
<html <?php language_attributes(); ?> dir="<?php echo is_rtl() ? 'rtl' : 'ltr'; ?>">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- سئو داینامیک و تگ‌های متای سرور (SSR SEO) -->
    <meta name="description" content="<?php echo esc_attr($meta_desc); ?>">
    <meta name="keywords" content="وکیل پایه یک دادگستری, دکتر سیده مریم رضوی, وکیل ملکی ونک, وکیل شرکتها, داوری تجاری بین المللی, تنظیم قرارداد, پیگیری پرونده قضایی">
    <meta name="author" content="<?php echo esc_attr($lawyer_name); ?>">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="<?php echo $canonical_url; ?>">

    <!-- Open Graph Protocol (Facebook, LinkedIn, Telegram) -->
    <meta property="og:locale" content="<?php echo is_rtl() ? 'fa_IR' : 'en_US'; ?>">
    <meta property="og:type" content="<?php echo is_singular() ? 'article' : 'website'; ?>">
    <meta property="og:title" content="<?php echo esc_attr($meta_title); ?>">
    <meta property="og:description" content="<?php echo esc_attr($meta_desc); ?>">
    <meta property="og:url" content="<?php echo $canonical_url; ?>">
    <meta property="og:site_name" content="<?php echo $site_name; ?>">
    <meta property="og:image" content="<?php echo esc_url($og_image); ?>">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo esc_attr($meta_title); ?>">
    <meta name="twitter:description" content="<?php echo esc_attr($meta_desc); ?>">
    <meta name="twitter:image" content="<?php echo esc_url($og_image); ?>">

    <!-- سئوی محلی (Local SEO Tehran, Vanak) -->
    <meta name="geo.region" content="IR-07">
    <meta name="geo.placename" content="Tehran, Vanak">
    <meta name="geo.position" content="35.7592;51.4116">
    <meta name="ICBM" content="35.7592, 51.4116">

    <!-- استراکچردیتای غنی Schema.org (JSON-LD: LegalService & Attorney) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LegalService",
          "@id": "<?php echo $site_url; ?>#organization",
          "name": "<?php echo esc_js($site_name); ?>",
          "alternateName": "SedRazavi Law Firm",
          "url": "<?php echo $site_url; ?>",
          "logo": "<?php echo esc_url($logo_url); ?>",
          "image": "<?php echo esc_url($og_image); ?>",
          "description": "<?php echo esc_js($meta_desc); ?>",
          "telephone": "<?php echo esc_js($lawyer_phone); ?>",
          "email": "info@sedrazavi-law.ir",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "<?php echo esc_js($lawyer_address); ?>",
            "addressLocality": "تهران",
            "addressRegion": "تهران",
            "postalCode": "19918",
            "addressCountry": "IR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 35.7592,
            "longitude": 51.4116
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
              "opens": "09:00",
              "closes": "19:00"
            }
          ]
        },
        {
          "@type": "Attorney",
          "@id": "<?php echo $site_url; ?>#attorney",
          "name": "<?php echo esc_js($lawyer_name); ?>",
          "jobTitle": "<?php echo esc_js($lawyer_title); ?>",
          "worksFor": {
            "@id": "<?php echo $site_url; ?>#organization"
          },
          "knowsAbout": [
            "دعاوی ملکی و سرقفلی",
            "دعاوی بازرگانی و شرکت‌ها",
            "داوری تجاری بین‌المللی",
            "حقوق قراردادها و مناقصات",
            "دعاوی مالیاتی و جرایم اقتصادی"
          ]
        }
      ]
    }
    </script>

    <!-- پیش‌بارگذاری فونت‌ها -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <?php wp_head(); ?>
</head>
<body <?php body_class('sedrazavi-hybrid-theme bg-[#070D1E] text-slate-100 antialiased selection:bg-[#D4AF37] selection:text-[#0B132B]'); ?>>
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text sr-only focus:not-sr-only focus:p-4 focus:bg-amber-400 focus:text-slate-900 focus:z-50 focus:absolute" href="#primary">
    <?php esc_html_e('پرش به محتوای اصلی', 'sedrazavi'); ?>
</a>
