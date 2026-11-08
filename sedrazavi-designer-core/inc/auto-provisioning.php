<?php
/**
 * Auto-Provisioning Engine for SedRazavi Designer Core
 *
 * Automatically checks, creates, and maps the 12 required standalone pages,
 * sets home and blog pages in reading options, and builds primary navigation menu.
 *
 * @package SedRazavi_Designer_Core
 * @version 1.0.0
 */

namespace SedRazaviDesignerCore;

if (!defined('ABSPATH')) {
    exit;
}

class Auto_Provisioning {
    public static function provision_pages_and_menus() {
        $pages = [
            'home' => [
                'title'    => 'صفحه اصلی استودیو سیدرضوی',
                'slug'     => 'home',
                'template' => 'front-page.php',
            ],
            'about' => [
                'title'    => 'درباره معمار سیستم و استودیو',
                'slug'     => 'about',
                'template' => 'page-about.php',
            ],
            'services' => [
                'title'    => 'خدمات تخصصی طراحی بدون کد',
                'slug'     => 'services',
                'template' => 'page-services.php',
            ],
            'portfolio' => [
                'title'    => 'ویترین نمونه‌کارهای منتخب',
                'slug'     => 'portfolio',
                'template' => 'page-portfolio.php',
            ],
            'contact' => [
                'title'    => 'تماس و ثبت سفارش پروژه',
                'slug'     => 'contact',
                'template' => 'page-contact.php',
            ],
            'blog' => [
                'title'    => 'وبلاگ تخصصی و نکات المنتور',
                'slug'     => 'blog',
                'template' => 'default',
            ],
            'track-order' => [
                'title'    => 'سامانه رهگیری آنلاین پروژه',
                'slug'     => 'track-order',
                'template' => 'page-track-order.php',
            ],
            'portal-auth' => [
                'title'    => 'ورود به پورتال هوشمند',
                'slug'     => 'portal-auth',
                'template' => 'page-portal-auth.php',
            ],
            'client-dashboard' => [
                'title'    => 'میز کاربری کارفرما',
                'slug'     => 'client-dashboard',
                'template' => 'page-client-dashboard.php',
            ],
            'designer-cockpit' => [
                'title'    => 'کاک‌پیت مدیریت طراح',
                'slug'     => 'designer-cockpit',
                'template' => 'page-designer-cockpit.php',
            ],
            'privacy' => [
                'title'    => 'حریم خصوصی و تعهدات سطح خدمات SLA',
                'slug'     => 'privacy',
                'template' => 'page-privacy.php',
            ],
        ];

        $created_page_ids = [];

        foreach ($pages as $key => $page_def) {
            $existing = get_page_by_path($page_def['slug']);
            if (!$existing) {
                $page_id = wp_insert_post([
                    'post_title'   => $page_def['title'],
                    'post_name'    => $page_def['slug'],
                    'post_status'  => 'publish',
                    'post_type'    => 'page',
                    'post_content' => '<!-- SedRazavi Designer Page: ' . esc_html($page_def['title']) . ' -->',
                ]);

                if (!is_wp_error($page_id)) {
                    if ($page_def['template'] !== 'default') {
                        update_post_meta($page_id, '_wp_page_template', $page_def['template']);
                    }
                    $created_page_ids[$key] = $page_id;
                }
            } else {
                $created_page_ids[$key] = $existing->ID;
            }
        }

        // Configure WordPress Reading Settings
        if (!empty($created_page_ids['home']) && !empty($created_page_ids['blog'])) {
            update_option('show_on_front', 'page');
            update_option('page_on_front', $created_page_ids['home']);
            update_option('page_for_posts', $created_page_ids['blog']);
        }

        // Build and assign Primary Navigation Menu
        self::build_primary_menu($created_page_ids);
    }

    private static function build_primary_menu($page_ids) {
        $menu_name = 'منوی اصلی استودیو سیدرضوی';
        $menu_exists = wp_get_nav_menu_object($menu_name);

        if (!$menu_exists) {
            $menu_id = wp_create_nav_menu($menu_name);
            if (!is_wp_error($menu_id)) {
                $items = [
                    ['title' => 'صفحه اصلی', 'url' => home_url('/')],
                    ['title' => 'خدمات طراحی', 'page' => 'services'],
                    ['title' => 'نمونه‌کارها', 'page' => 'portfolio'],
                    ['title' => 'درباره ما', 'page' => 'about'],
                    ['title' => 'رهگیری سفارش', 'page' => 'track-order'],
                    ['title' => 'تماس و ثبت پروژه', 'page' => 'contact'],
                ];

                foreach ($items as $item) {
                    if (isset($item['page']) && !empty($page_ids[$item['page']])) {
                        wp_update_nav_menu_item($menu_id, 0, [
                            'menu-item-title'     => $item['title'],
                            'menu-item-object'    => 'page',
                            'menu-item-object-id' => $page_ids[$item['page']],
                            'menu-item-type'      => 'post_type',
                            'menu-item-status'    => 'publish',
                        ]);
                    } else if (isset($item['url'])) {
                        wp_update_nav_menu_item($menu_id, 0, [
                            'menu-item-title'  => $item['title'],
                            'menu-item-url'    => $item['url'],
                            'menu-item-type'   => 'custom',
                            'menu-item-status' => 'publish',
                        ]);
                    }
                }

                $locations = get_theme_mod('nav_menu_locations');
                if (!is_array($locations)) {
                    $locations = [];
                }
                $locations['primary-menu'] = $menu_id;
                set_theme_mod('nav_menu_locations', $locations);
            }
        }
    }
}
