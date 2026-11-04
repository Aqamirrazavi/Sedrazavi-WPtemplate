<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Advanced Dynamic Query Engine with Transient Caching & CPT Security
 *
 * Provides safe, cached, and performant dynamic queries across standard and
 * custom post types, taxonomies, and meta fields for Elementor widgets.
 *
 * @package Universal_Elementor_Suite
 * @author Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 */
class Dynamic_Query_Engine {

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        // Automatically flush transient cache when posts are created, updated or deleted
        add_action('save_post', [$this, 'flush_query_cache']);
        add_action('deleted_post', [$this, 'flush_query_cache']);
    }

    /**
     * Execute a safe, cached WP_Query based on widget settings
     *
     * @param array $settings Widget control settings
     * @param int $cache_ttl Cache expiration in seconds (default: 3600 / 1 hour)
     * @return array [ 'posts' => array, 'total' => int, 'max_pages' => int, 'cached' => bool ]
     */
    public function execute_query(array $settings, $cache_ttl = 3600) {
        $post_type = sanitize_key($settings['post_type'] ?? 'post');

        // Security check: Never expose confidential dossiers
        if ($post_type === 'case' && !current_user_can('edit_others_posts')) {
            $post_type = 'case_study'; // Fallback to public case studies
        }

        $posts_per_page = intval($settings['posts_per_page'] ?? 6);
        $orderby        = sanitize_key($settings['orderby'] ?? 'date');
        $order          = (strtoupper($settings['order'] ?? 'DESC') === 'ASC') ? 'ASC' : 'DESC';
        $paged          = max(1, intval($settings['paged'] ?? 1));
        $offset         = intval($settings['offset'] ?? 0);

        // Build WP_Query args
        $args = [
            'post_type'           => $post_type,
            'post_status'         => 'publish',
            'posts_per_page'      => $posts_per_page,
            'orderby'             => $orderby,
            'order'               => $order,
            'paged'               => $paged,
            'ignore_sticky_posts' => true,
            'no_found_rows'       => false,
        ];

        if ($offset > 0 && $paged === 1) {
            $args['offset'] = $offset;
        }

        // Category / Taxonomy filtering
        if (!empty($settings['taxonomy']) && !empty($settings['taxonomy_term'])) {
            $tax = sanitize_key($settings['taxonomy']);
            $term = sanitize_text_field($settings['taxonomy_term']);
            $args['tax_query'] = [
                [
                    'taxonomy' => $tax,
                    'field'    => 'slug',
                    'terms'    => $term,
                ],
            ];
        }

        // Specific post inclusion / exclusion
        if (!empty($settings['include_ids'])) {
            $args['post__in'] = array_map('intval', explode(',', $settings['include_ids']));
        }
        if (!empty($settings['exclude_ids'])) {
            $args['post__not_in'] = array_map('intval', explode(',', $settings['exclude_ids']));
        }

        // Generate deterministic cache key
        $cache_key = 'uas_query_' . md5(serialize($args));
        $cached_result = get_transient($cache_key);

        if ($cached_result !== false && is_array($cached_result)) {
            $cached_result['cached'] = true;
            return $cached_result;
        }

        // Run query
        $query = new \WP_Query($args);
        $posts_data = [];

        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $post_id = get_the_ID();

                $thumb_url = has_post_thumbnail($post_id) 
                    ? get_the_post_thumbnail_url($post_id, 'medium_large') 
                    : '';

                $terms = get_the_terms($post_id, 'category');
                $cat_name = (!empty($terms) && !is_wp_error($terms)) ? $terms[0]->name : '';

                $posts_data[] = [
                    'id'        => $post_id,
                    'title'     => get_the_title(),
                    'permalink' => get_permalink(),
                    'date'      => get_the_date('j F Y'),
                    'author'    => get_the_author(),
                    'excerpt'   => wp_trim_words(get_the_excerpt(), 20, '...'),
                    'thumbnail' => $thumb_url,
                    'category'  => $cat_name,
                ];
            }
            wp_reset_postdata();
        }

        $result = [
            'posts'     => $posts_data,
            'total'     => $query->found_posts,
            'max_pages' => $query->max_num_pages,
            'cached'    => false,
        ];

        // Cache the result for high performance
        if ($cache_ttl > 0) {
            set_transient($cache_key, $result, $cache_ttl);
        }

        return $result;
    }

    /**
     * Invalidate all dynamic query transient caches
     */
    public function flush_query_cache() {
        global $wpdb;
        $wpdb->query("DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_uas_query_%' OR option_name LIKE '_transient_timeout_uas_query_%'");
    }

    /**
     * Invalidate specific or all query caches (alias for flush_query_cache)
     */
    public function invalidate_query_cache() {
        $this->flush_query_cache();
    }

    /**
     * Get list of public post types available for widget querying
     *
     * @return array
     */
    public static function get_queryable_post_types() {
        $types = [
            'post'       => 'نوشته‌ها و مقالات (Blog Posts)',
            'page'       => 'برگه‌ها (Standard Pages)',
            'case_study' => 'نمونه‌پرونده‌ها و دعاوی موفق (Case Studies)',
        ];

        if (post_type_exists('portfolio')) {
            $types['portfolio'] = 'پروژه‌ها و نمونه‌کارها (Portfolio)';
        }
        if (post_type_exists('service')) {
            $types['service'] = 'خدمات سازمانی (Services)';
        }
        if (post_type_exists('product')) {
            $types['product'] = 'محصولات فروشگاه (WooCommerce Products)';
        }

        return $types;
    }
}
