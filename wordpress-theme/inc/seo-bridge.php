<?php
/**
 * SedRazavi Dynamic SEO & Schema Bridge
 *
 * Transfers and dynamically hydrates all <title>, meta description,
 * Open Graph, Twitter Card, and Schema.org JSON-LD (LegalService/Attorney)
 * using WordPress core APIs (home_url, get_permalink, get_bloginfo, theme_mods).
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_render_dynamic_seo_tags')) {
function sedrazavi_render_dynamic_seo_tags() {
    $site_name = get_bloginfo('name') ?: 'دفتر وکالت دکتر سیده مریم رضوی';
    $site_desc = get_bloginfo('description') ?: 'مشاوره حقوقی تخصصی، داوری و وکالت پایه یک دادگستری';

    // 1. Dynamic Title
    if (is_front_page() || is_home()) {
        $page_title = $site_name . ' | ' . $site_desc;
    } elseif (is_singular()) {
        $page_title = single_post_title('', false) . ' | ' . $site_name;
    } elseif (is_archive()) {
        $page_title = get_the_archive_title() . ' | ' . $site_name;
    } elseif (is_search()) {
        $page_title = sprintf('جستجو برای: %s | %s', get_search_query(), $site_name);
    } elseif (is_404()) {
        $page_title = 'برگه یافت نشد (خطای ۴۰۴) | ' . $site_name;
    } else {
        $page_title = wp_get_document_title();
    }
    $page_title = esc_html(wp_strip_all_tags($page_title));

    // 2. Dynamic Canonical & Open Graph URL
    if (is_front_page() || is_home()) {
        $canonical_url = home_url('/');
    } elseif (is_singular()) {
        $canonical_url = get_permalink();
    } else {
        global $wp;
        $canonical_url = home_url(add_query_arg(array(), isset($wp->request) ? $wp->request : ''));
    }
    $canonical_url = esc_url($canonical_url);

    // 3. Dynamic Meta Description
    if (is_singular() && has_excerpt()) {
        $meta_desc = get_the_excerpt();
    } elseif (is_singular() && !empty(get_post()->post_content)) {
        $meta_desc = wp_trim_words(wp_strip_all_tags(get_post()->post_content), 30, '...');
    } else {
        $meta_desc = get_theme_mod('sedrazavi_seo_meta_desc', $site_desc);
    }
    $meta_desc = esc_attr(wp_strip_all_tags($meta_desc));

    // 4. Dynamic Open Graph & Logo Images with Crisp Local Fallbacks
    $default_placeholder_image = get_template_directory_uri() . '/screenshot.png';
    $custom_og_image = get_theme_mod('sedrazavi_seo_og_image', '');
    $custom_logo     = get_theme_mod('sedrazavi_seo_logo', '');

    if (is_singular() && has_post_thumbnail()) {
        $og_image = get_the_post_thumbnail_url(null, 'full');
    } elseif (!empty($custom_og_image)) {
        $og_image = $custom_og_image;
    } else {
        $og_image = $default_placeholder_image;
    }
    $og_image = esc_url($og_image);

    $logo_url = !empty($custom_logo) ? esc_url($custom_logo) : $default_placeholder_image;

    // 5. Lawyer & Office Details
    $lawyer_name    = esc_attr(get_theme_mod('sedrazavi_seo_lawyer_name', 'دکتر سیده مریم رضوی'));
    $lawyer_title   = esc_attr(get_theme_mod('sedrazavi_seo_lawyer_title', 'وکیل پایه یک دادگستری و داور بین‌المللی'));
    $office_phone   = esc_attr(get_theme_mod('sedrazavi_office_phone', '021-88776655'));
    $office_address = esc_attr(get_theme_mod('sedrazavi_office_address', 'تهران، میدان ونک، خیابان ملاصدرا، پلاک ۴۲، طبقه ۳، واحد ۶'));
    $office_email   = esc_attr(get_theme_mod('sedrazavi_office_email', get_bloginfo('admin_email') ?: 'info@sedrazavi.com'));
    $keywords       = esc_attr(get_theme_mod('sedrazavi_seo_keywords', 'وکیل پایه یک دادگستری, دکتر سیده مریم رضوی, وکیل ملکی تهران, وکیل شرکتها, داوری بین المللی, تنظیم قرارداد, وکیل ونک, پیگیری پرونده قضایی'));

    ?>
    <!-- SedRazavi Dynamic Primary Meta Tags -->
    <title><?php echo $page_title; ?></title>
    <meta name="description" content="<?php echo $meta_desc; ?>" />
    <meta name="keywords" content="<?php echo $keywords; ?>" />
    <meta name="author" content="<?php echo $lawyer_name; ?>" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <link rel="canonical" href="<?php echo $canonical_url; ?>" />

    <!-- Open Graph / Facebook / LinkedIn / WhatsApp -->
    <meta property="og:locale" content="fa_IR" />
    <meta property="og:type" content="<?php echo is_singular() ? 'article' : 'website'; ?>" />
    <meta property="og:title" content="<?php echo $page_title; ?>" />
    <meta property="og:description" content="<?php echo $meta_desc; ?>" />
    <meta property="og:url" content="<?php echo $canonical_url; ?>" />
    <meta property="og:site_name" content="<?php echo esc_attr($site_name); ?>" />
    <meta property="og:image" content="<?php echo $og_image; ?>" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?php echo $page_title; ?>" />
    <meta name="twitter:description" content="<?php echo $meta_desc; ?>" />
    <meta name="twitter:image" content="<?php echo $og_image; ?>" />

    <!-- Local SEO Geo Meta Tags (Tehran Vanak) -->
    <meta name="geo.region" content="IR-07" />
    <meta name="geo.placename" content="Tehran, Vanak" />
    <meta name="geo.position" content="35.7592;51.4116" />
    <meta name="ICBM" content="35.7592, 51.4116" />

    <!-- Schema.org Dynamic Structured Data (JSON-LD: LegalService & Attorney) -->
    <script type="application/ld+json">
    <?php
    $schema_graph = array(
        '@context' => 'https://schema.org',
        '@graph'   => array(
            array(
                '@type'         => 'LegalService',
                '@id'           => home_url('/#organization'),
                'name'          => $site_name,
                'alternateName' => $site_name . ' Law Office',
                'url'           => home_url('/'),
                'logo'          => $logo_url,
                'image'         => $og_image,
                'description'   => $meta_desc,
                'telephone'     => $office_phone,
                'email'         => $office_email,
                'priceRange'    => '$$$',
                'address'       => array(
                    '@type'           => 'PostalAddress',
                    'streetAddress'   => $office_address,
                    'addressLocality' => 'تهران',
                    'addressRegion'   => 'تهران',
                    'postalCode'      => '19918',
                    'addressCountry'  => 'IR',
                ),
                'geo'           => array(
                    '@type'     => 'GeoCoordinates',
                    'latitude'  => 35.7592,
                    'longitude' => 51.4116,
                ),
                'openingHoursSpecification' => array(
                    array(
                        '@type'     => 'OpeningHoursSpecification',
                        'dayOfWeek' => array('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'),
                        'opens'     => '09:00',
                        'closes'    => '19:00',
                    ),
                    array(
                        '@type'     => 'OpeningHoursSpecification',
                        'dayOfWeek' => array('Thursday'),
                        'opens'     => '09:00',
                        'closes'    => '13:00',
                    ),
                ),
                'sameAs'        => array(
                    'https://instagram.com/Dr_SedRazavi_Law',
                    'https://linkedin.com/in/dr-maryam-sedrazavi',
                    'https://t.me/SedRazavi_Law',
                    'https://aparat.com/sedrazavi_law',
                ),
            ),
            array(
                '@type'      => 'Attorney',
                '@id'        => home_url('/#attorney'),
                'name'       => $lawyer_name,
                'jobTitle'   => $lawyer_title,
                'worksFor'   => array(
                    '@id' => home_url('/#organization'),
                ),
                'knowsAbout' => array(
                    'دعاوی ملکی و سرقفلی',
                    'دعاوی بازرگانی و شرکت‌ها',
                    'داوری تجاری بین‌المللی',
                    'حقوق قراردادها',
                    'دعاوی خانواده و انحصار وراثت',
                    'جرایم سایبری و تجارت الکترونیک',
                ),
            ),
        ),
    );

    echo wp_json_encode($schema_graph, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    ?>
    </script>
    <?php
}
}
