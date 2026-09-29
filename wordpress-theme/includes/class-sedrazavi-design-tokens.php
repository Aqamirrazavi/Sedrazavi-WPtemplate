<?php
/**
 * SedRazavi 24 Global Design Tokens Repository
 * Specification: Part 19 - Centralized Options, CSS Variables Injector & REST API
 *
 * @package SedRazavi
 * @subpackage Customizer
 * @version 2.9.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Design_Tokens {

    const OPTION_KEY = 'sedrazavi_global_design_tokens';

    public static function init() {
        add_action('wp_head', [__CLASS__, 'inject_css_variables'], 5);
        add_action('rest_api_init', [__CLASS__, 'register_token_routes']);
    }

    /**
     * Default 24 Tokens Schema matching Part 19
     */
    public static function get_defaults() {
        return [
            // Personal (5)
            'lawyer.name'        => 'دکتر سیده مریم رضوی',
            'lawyer.title'       => 'وکیل پایه یک دادگستری و مشاور حقوقی',
            'lawyer.license'     => 'پروانه وکالت ۱۸۴۵ - کانون وکلای دادگستری مرکز',
            'lawyer.experience'  => '۱۵ سال سابقه درخشان در مراجع قضایی و داوری بین‌الملل',
            'lawyer.education'   => 'دکترای حقوق خصوصی از دانشگاه تهران',

            // Contact (5)
            'contact.phone'      => '021-88776655',
            'contact.mobile'     => '09123456789',
            'contact.address'    => 'تهران، خیابان ولیعصر، بالاتر از پارک ساعی، برج سرو، طبقه ۷',
            'contact.hours'      => 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰',
            'contact.email'      => 'info@sedrazavi-law.ir',

            // Pricing (4)
            'pricing.in_person'  => '۱,۵۰۰,۰۰۰ تومان',
            'pricing.phone'      => '۸۰۰,۰۰۰ تومان',
            'pricing.online'     => '۱,۰۰۰,۰۰۰ تومان',
            'pricing.emergency'  => '۲,۵۰۰,۰۰۰ تومان',

            // Brand (4)
            'brand.name'         => 'SedRazavi Law',
            'brand.slogan'       => 'عدالت، تخصص و تعهد حرفه‌ای در پاسداری از حقوق موکلین',
            'brand.color_gold'   => '#D4AF37',
            'brand.color_navy'   => '#0B132B',

            // Social (3)
            'social.telegram'    => 'https://t.me/sedrazavi_law',
            'social.instagram'   => 'https://instagram.com/sedrazavi_law',
            'social.eitaa'       => 'https://eitaa.com/sedrazavi_law',

            // Legal (3)
            'legal.disclaimer'   => 'کلیه خدمات و مشاوره‌ها منطبق بر قوانین جمهوری اسلامی ایران و موازین کانون وکلا ارائه می‌گردد.',
            'legal.bar_assoc'    => 'کانون وکلای دادگستری مرکز (تهران)',
            'legal.terms_url'    => '/terms-conditions/',
        ];
    }

    /**
     * Get all active tokens merged with defaults
     */
    public static function get_all_tokens() {
        $saved = get_option(self::OPTION_KEY, []);
        return wp_parse_args($saved, self::get_defaults());
    }

    /**
     * Inject Dynamic CSS Variables into HTML <head>
     */
    public static function inject_css_variables() {
        $tokens = self::get_all_tokens();
        echo '<style id="sedrazavi-design-tokens-vars">' . PHP_EOL;
        echo ':root {' . PHP_EOL;
        echo '  --color-gold-primary: ' . esc_attr($tokens['brand.color_gold']) . ';' . PHP_EOL;
        echo '  --color-navy-dark: ' . esc_attr($tokens['brand.color_navy']) . ';' . PHP_EOL;
        echo '  --lawyer-name: "' . esc_attr($tokens['lawyer.name']) . '";' . PHP_EOL;
        echo '  --lawyer-phone: "' . esc_attr($tokens['contact.phone']) . '";' . PHP_EOL;
        echo '  --lawyer-hours: "' . esc_attr($tokens['contact.hours']) . '";' . PHP_EOL;
        echo '}' . PHP_EOL;
        echo '</style>' . PHP_EOL;
    }

    /**
     * REST API Routes for Design Tokens Manager
     */
    public static function register_token_routes() {
        register_rest_route('sedrazavi/v1/tokens', '/all', [
            'methods'             => 'GET',
            'callback'            => [__CLASS__, 'rest_get_tokens'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('sedrazavi/v1/tokens', '/update', [
            'methods'             => 'POST',
            'callback'            => [__CLASS__, 'rest_update_tokens'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);
    }

    public static function rest_get_tokens() {
        return rest_ensure_response([
            'success' => true,
            'tokens'  => self::get_all_tokens(),
        ]);
    }

    public static function rest_update_tokens($request) {
        $params = $request->get_json_params();
        $tokens = self::get_all_tokens();

        foreach ($params as $key => $val) {
            if (array_key_exists($key, $tokens)) {
                $tokens[$key] = sanitize_text_field($val);
            }
        }

        update_option(self::OPTION_KEY, $tokens);

        return rest_ensure_response([
            'success' => true,
            'message' => 'متغیرهای سراسری قالب با موفقیت ذخیره شدند.',
            'tokens'  => $tokens,
        ]);
    }
}

SedRazavi_Design_Tokens::init();