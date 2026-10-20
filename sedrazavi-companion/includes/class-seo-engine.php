<?php
/**
 * SedRazavi Native SEO & Structured Data (JSON-LD) Engine
 *
 * Automatically injects Schema.org JSON-LD (LegalService, ProfessionalService, Store, Course),
 * OpenGraph meta tags, and Breadcrumbs without requiring 3rd party plugins.
 * Gracefully self-deactivates if Yoast SEO or Rank Math are present.
 *
 * @package SedRazavi_Companion
 * @version 6.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_SEO_Engine {

    private static $instance = null;

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('wp_head', [$this, 'render_head_seo_tags'], 2);
    }

    public function is_third_party_seo_active() {
        return defined('WPSEO_VERSION') || defined('RANK_MATH_VERSION') || defined('AIOSEO_VERSION');
    }

    public function render_head_seo_tags() {
        if (is_admin() || is_feed() || is_robots()) {
            return;
        }

        // 1. OpenGraph & Meta Tags
        if (!$this->is_third_party_seo_active()) {
            $this->render_opengraph_meta();
        }

        // 2. Structured Data JSON-LD
        $this->render_schema_json_ld();
    }

    private function render_opengraph_meta() {
        $title       = wp_get_document_title();
        $description = get_bloginfo('description');
        $url         = home_url(add_query_arg([], $GLOBALS['wp']->request ?? ''));
        $site_name   = get_bloginfo('name');
        $image       = get_site_icon_url(512);

        if (is_singular() && has_post_thumbnail()) {
            $image = get_the_post_thumbnail_url(get_the_ID(), 'large');
            $post_excerpt = get_the_excerpt();
            if (!empty($post_excerpt)) {
                $description = wp_strip_all_tags($post_excerpt);
            }
        }
        ?>
        <!-- SedRazavi Native OpenGraph & Social Cards -->
        <meta property="og:locale" content="fa_IR">
        <meta property="og:type" content="<?php echo is_singular() ? 'article' : 'website'; ?>">
        <meta property="og:title" content="<?php echo esc_attr($title); ?>">
        <meta property="og:description" content="<?php echo esc_attr($description); ?>">
        <meta property="og:url" content="<?php echo esc_url($url); ?>">
        <meta property="og:site_name" content="<?php echo esc_attr($site_name); ?>">
        <?php if (!empty($image)): ?>
            <meta property="og:image" content="<?php echo esc_url($image); ?>">
            <meta name="twitter:image" content="<?php echo esc_url($image); ?>">
        <?php endif; ?>
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="<?php echo esc_attr($title); ?>">
        <meta name="twitter:description" content="<?php echo esc_attr($description); ?>">
        <?php
    }

    private function render_schema_json_ld() {
        $archetype = get_option('sedrazavi_active_archetype', 'agency-designer');
        $site_name = get_bloginfo('name');
        $site_desc = get_bloginfo('description');
        $site_url  = home_url('/');

        $schemas = [];

        // 1. WebSite & Organization
        $schemas[] = [
            '@context' => 'https://schema.org',
            '@type'    => 'WebSite',
            'name'     => $site_name,
            'url'      => $site_url,
            'description' => $site_desc,
            'potentialAction' => [
                '@type'       => 'SearchAction',
                'target'      => home_url('/?s={search_term_string}'),
                'query-input' => 'required name=search_term_string',
            ],
        ];

        // 2. Archetype Specialized Schema
        switch ($archetype) {
            case 'legal-firm':
                $schemas[] = [
                    '@context'    => 'https://schema.org',
                    '@type'       => 'LegalService',
                    'name'        => $site_name,
                    'description' => $site_desc,
                    'url'         => $site_url,
                    'telephone'   => get_theme_mod('sedrazavi_header_phone', '۰۲۱-۱۲۳۴۵۶۷۸'),
                    'priceRange'  => 'IRR',
                    'address'     => [
                        '@type'           => 'PostalAddress',
                        'addressCountry'  => 'IR',
                        'addressLocality' => 'Tehran',
                    ],
                ];
                break;

            case 'store-modern':
                $schemas[] = [
                    '@context'    => 'https://schema.org',
                    '@type'       => 'Store',
                    'name'        => $site_name,
                    'description' => $site_desc,
                    'url'         => $site_url,
                    'priceRange'  => 'IRR',
                ];
                break;

            case 'lms-soft98':
                $schemas[] = [
                    '@context'    => 'https://schema.org',
                    '@type'       => 'EducationalOrganization',
                    'name'        => $site_name,
                    'description' => $site_desc,
                    'url'         => $site_url,
                ];
                break;

            case 'agency-designer':
            default:
                $schemas[] = [
                    '@context'    => 'https://schema.org',
                    '@type'       => 'ProfessionalService',
                    'name'        => $site_name,
                    'description' => $site_desc,
                    'url'         => $site_url,
                    'serviceType' => 'Web Design, Software Engineering, Branding',
                ];
                break;
        }

        // 3. BreadcrumbList for singular pages
        if (is_singular()) {
            $schemas[] = [
                '@context'        => 'https://schema.org',
                '@type'           => 'BreadcrumbList',
                'itemListElement' => [
                    [
                        '@type'    => 'ListItem',
                        'position' => 1,
                        'name'     => 'صفحه اصلی',
                        'item'     => $site_url,
                    ],
                    [
                        '@type'    => 'ListItem',
                        'position' => 2,
                        'name'     => get_the_title(),
                        'item'     => get_permalink(),
                    ],
                ],
            ];
        }

        foreach ($schemas as $s) {
            echo "\n<script type=\"application/ld+json\">\n" . wp_json_encode($s, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . "\n</script>\n";
        }
    }
}
