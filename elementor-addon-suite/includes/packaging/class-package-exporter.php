<?php
namespace UniversalElementorSuite\Packaging;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Standalone Package & Custom Project Kit Exporter
 *
 * Compiles standalone capability plugins and custom Site-Kit ZIP bundles
 * complete with per-file SHA-256 checksums in manifest.json, local fonts/SVG media,
 * and zero-dependency Elementor widget & template loaders.
 *
 * @package Universal_Elementor_Suite
 */
class Package_Exporter {

    /**
     * Build a portable standalone WordPress plugin ZIP for one capability package.
     *
     * @param string                     $package_id
     * @param array                      $packages
     * @param Package_Manifest_Validator $manifest_validator
     * @return array
     */
    public function export_standalone_package($package_id, array $packages, Package_Manifest_Validator $manifest_validator) {
        $target_package = null;
        foreach ($packages as $pkg) {
            if ($pkg['id'] === $package_id) {
                $target_package = $pkg;
                break;
            }
        }

        if (!$target_package) {
            return ['success' => false, 'error' => 'بسته مورد نظر در رجیستری پکیج‌ها یافت نشد.'];
        }

        $upload_dir = wp_upload_dir();
        $export_dir = trailingslashit($upload_dir['basedir']) . 'uas-standalone-packages/';
        if (!wp_mkdir_p($export_dir)) {
            return ['success' => false, 'error' => 'امکان ایجاد پوشه خروجی در uploads وجود ندارد.'];
        }

        $clean_slug   = sanitize_key($package_id);
        $zip_filename = $clean_slug . '-standalone-v' . $target_package['version'] . '.zip';
        $zip_filepath = $export_dir . $zip_filename;
        $zip_fileurl  = trailingslashit($upload_dir['baseurl']) . 'uas-standalone-packages/' . $zip_filename;

        if (!class_exists('\ZipArchive')) {
            return [
                'success' => false,
                'error'   => 'ماژول ZipArchive در تنظیمات PHP سرور فعال نیست. امکان ایجاد پکیج زیپ وجود ندارد.',
            ];
        }

        // Collect all archive entries in memory so per-file SHA-256 checksums can be embedded into manifest.json
        $bundle_files = [];

        $bundle_files[$clean_slug . '.php'] = $this->generate_standalone_plugin_header($target_package, $clean_slug);

        $base_php = UAS_PATH . 'includes/class-widget-base.php';
        if (file_exists($base_php)) {
            $bundle_files['includes/class-widget-base.php'] = (string) file_get_contents($base_php);
        }
        $core_css = UAS_PATH . 'assets/css/widgets-core.css';
        if (file_exists($core_css)) {
            $bundle_files['assets/css/widgets-core.css'] = (string) file_get_contents($core_css);
        }
        $core_js = UAS_PATH . 'assets/js/widgets-core.js';
        if (file_exists($core_js)) {
            $bundle_files['assets/js/widgets-core.js'] = (string) file_get_contents($core_js);
        }

        if (!empty($target_package['components']['widget'])) {
            $widget_name = $target_package['components']['widget'];
            $widget_filename = 'class-widget-' . str_replace('uas_', '', str_replace('_', '-', $widget_name)) . '.php';
            $widget_src = UAS_PATH . 'includes/widgets/' . $widget_filename;
            if (!file_exists($widget_src)) {
                return [
                    'success' => false,
                    'error'   => sprintf('فایل کلاس ویجت «%s» برای بسته‌بندی یافت نشد (%s).', $widget_name, $widget_filename),
                ];
            }
            $bundle_files['includes/' . $widget_filename] = (string) file_get_contents($widget_src);
            if (in_array($widget_name, ['uas_dynamic_grid', 'uas_posts_grid', 'uas_services_grid'], true)) {
                $query_src = UAS_PATH . 'includes/class-dynamic-query-engine.php';
                if (file_exists($query_src)) {
                    $bundle_files['includes/class-dynamic-query-engine.php'] = (string) file_get_contents($query_src);
                }
            }
        }

        if (!empty($target_package['components']['javascript'])) {
            $js_file = $target_package['components']['javascript'];
            $js_src = UAS_PATH . 'assets/js/widgets/' . $js_file;
            if (file_exists($js_src)) {
                $bundle_files['assets/js/' . $js_file] = (string) file_get_contents($js_src);
            }
        }

        if (!empty($target_package['components']['css'])) {
            $css_file = $target_package['components']['css'];
            $css_src = UAS_PATH . 'assets/css/widgets/' . $css_file;
            if (file_exists($css_src)) {
                $bundle_files['assets/css/' . $css_file] = (string) file_get_contents($css_src);
            }
        }

        // Embed per-file SHA-256 checksums inside manifest.json
        $manifest = $target_package;
        $manifest['checksum_algorithm'] = 'sha256';
        $manifest['file_checksums'] = $manifest_validator->compute_file_checksums($bundle_files);

        $zip = new \ZipArchive();
        $open_res = $zip->open($zip_filepath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE);
        if ($open_res !== true) {
            return [
                'success' => false,
                'error'   => sprintf('خطا در ایجاد یا باز کردن فایل فشرده زیپ پکیج (کد خطا: %s).', (string) $open_res),
            ];
        }

        $zip->addFromString($clean_slug . '/manifest.json', json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        foreach ($bundle_files as $rel_path => $bytes) {
            $zip->addFromString($clean_slug . '/' . $rel_path, $bytes);
        }

        $close_res = $zip->close();
        if (!$close_res || !file_exists($zip_filepath) || filesize($zip_filepath) === 0) {
            return [
                'success' => false,
                'error'   => 'ساخت فایل زیپ با شکست مواجه شد یا فایل خروجی نهایی خالی است.',
            ];
        }

        return [
            'success'  => true,
            'zip_path' => $zip_filepath,
            'zip_url'  => $zip_fileurl,
            'filename' => $zip_filename,
            'sha256'   => hash_file('sha256', $zip_filepath),
            'manifest' => $manifest,
        ];
    }

    /**
     * Build a custom project bundle on the fly with resolved dependencies and per-file SHA-256 checksums.
     *
     * @param array                      $params
     * @param array                      $widget_catalog
     * @param Dependency_Resolver        $dep_resolver
     * @param Package_Manifest_Validator $manifest_validator
     * @return array
     */
    public function build_custom_project_bundle(
        array $params,
        array $widget_catalog,
        Dependency_Resolver $dep_resolver,
        Package_Manifest_Validator $manifest_validator,
        Package_Registry $registry = null
    ) {
        if (!class_exists('\ZipArchive')) {
            return ['success' => false, 'error' => 'ماژول ZipArchive در تنظیمات PHP سرور فعال نیست.'];
        }

        if (!$registry) {
            $registry = new Package_Registry();
        }

        $project_name = !empty($params['project_name']) ? sanitize_text_field($params['project_name']) : 'پروژه سفارشی المنتور';
        $project_slug = !empty($params['project_slug']) ? sanitize_title($params['project_slug']) : 'custom-elementor-suite';
        if (empty($project_slug)) {
            $project_slug = 'custom-elementor-suite';
        }

        $selected_widgets   = !empty($params['selected_widgets']) && is_array($params['selected_widgets']) ? array_map('sanitize_key', $params['selected_widgets']) : [];
        $templates          = !empty($params['selected_templates']) && is_array($params['selected_templates']) ? array_map('sanitize_key', $params['selected_templates']) : [];
        $raw_blocks         = !empty($params['selected_blocks']) && is_array($params['selected_blocks']) ? $params['selected_blocks'] : [];
        $raw_cpts           = !empty($params['selected_cpts']) && is_array($params['selected_cpts']) ? $params['selected_cpts'] : [];
        $design_tokens      = !empty($params['design_tokens']) && is_array($params['design_tokens']) ? $params['design_tokens'] : [];
        $niche              = !empty($params['niche']) ? sanitize_key($params['niche']) : 'general';
        $include_bridge_in  = !empty($params['include_theme_bridge']);
        $include_query_in   = !empty($params['include_query_engine']);

        $upload_dir = wp_upload_dir();
        $export_dir = trailingslashit($upload_dir['basedir']) . 'uas-standalone-packages/';
        wp_mkdir_p($export_dir);

        $zip_filename = $project_slug . '-standalone-kit.zip';
        $zip_filepath = $export_dir . $zip_filename;
        $zip_fileurl  = trailingslashit($upload_dir['baseurl']) . 'uas-standalone-packages/' . $zip_filename;

        // 0. Resolve template AST widget dependencies, Gutenberg blocks, CPT schemas & core services
        $resolved = $dep_resolver->resolve_bundle_dependencies(
            $selected_widgets,
            $templates,
            $widget_catalog,
            $include_bridge_in,
            $include_query_in
        );

        $blocks_catalog = $registry->get_gutenberg_blocks_catalog();
        $cpts_catalog   = $registry->get_cpt_schemas_catalog();
        $resolved_bc    = $dep_resolver->resolve_blocks_and_cpts($raw_blocks, $raw_cpts, $blocks_catalog, $cpts_catalog);

        $widgets             = $resolved['widgets'];
        $auto_added_widgets  = $resolved['auto_added_widgets'];
        $template_widget_map = $resolved['template_widget_map'];
        $include_bridge      = $resolved['include_bridge'];
        $include_query       = $resolved['include_query'];
        $gutenberg_blocks    = $resolved_bc['gutenberg_blocks'];
        $cpt_schemas         = $resolved_bc['cpt_schemas'];
        $include_gutenberg   = $resolved_bc['include_gutenberg'];
        $include_cpts        = $resolved_bc['include_cpts'];

        $manifest = [
            'id'                  => $project_slug,
            'name'                => $project_name,
            'version'             => '1.0.0',
            'package_type'        => 'custom-project-kit',
            'niche'               => $niche,
            'created_at'          => function_exists('current_time') ? current_time('mysql') : gmdate('Y-m-d H:i:s'),
            'widgets'             => $widgets,
            'auto_added_widgets'  => $auto_added_widgets,
            'templates'           => $templates,
            'template_widget_map' => $template_widget_map,
            'gutenberg_blocks'    => $gutenberg_blocks,
            'cpt_schemas'         => $cpt_schemas,
            'design_tokens'       => $design_tokens,
            'capabilities'        => [
                'theme_bridge'     => $include_bridge,
                'query_engine'     => $include_query,
                'gutenberg_blocks' => $include_gutenberg,
                'cpt_schemas'      => $include_cpts,
            ],
            'requirements'        => [
                'php'       => '>=7.4',
                'wordpress' => '>=6.0',
                'elementor' => '>=3.10',
            ],
        ];

        // Collect all files in memory first so per-file SHA-256 checksums are computed deterministically
        $bundle_files = [];
        $bundle_files[$project_slug . '.php'] = $this->generate_custom_bundle_plugin_file($manifest, $project_slug);

        $added_files = [];
        foreach ($widgets as $w_raw) {
            $normalized_key = strtolower(str_replace(['uas_', 'class-widget-', '.php', '-'], ['', '', '', '_'], $w_raw));
            $w_meta = $widget_catalog[$normalized_key] ?? null;

            if ($w_meta) {
                $w_file = $w_meta['file'];
                $src_w = UAS_PATH . 'includes/widgets/' . $w_file;
                if (file_exists($src_w) && empty($added_files['w:' . $w_file])) {
                    $bundle_files['includes/widgets/' . $w_file] = (string) file_get_contents($src_w);
                    $added_files['w:' . $w_file] = true;
                }

                if (!empty($w_meta['js'])) {
                    $src_js = UAS_PATH . 'assets/js/widgets/' . $w_meta['js'];
                    if (file_exists($src_js) && empty($added_files['js:' . $w_meta['js']])) {
                        $bundle_files['assets/js/' . $w_meta['js']] = (string) file_get_contents($src_js);
                        $added_files['js:' . $w_meta['js']] = true;
                    }
                }

                if (!empty($w_meta['css'])) {
                    $src_css = UAS_PATH . 'assets/css/widgets/' . $w_meta['css'];
                    if (file_exists($src_css) && empty($added_files['css:' . $w_meta['css']])) {
                        $bundle_files['assets/css/' . $w_meta['css']] = (string) file_get_contents($src_css);
                        $added_files['css:' . $w_meta['css']] = true;
                    }
                }
            } else {
                $base_name = str_replace('uas_', '', str_replace('_', '-', $w_raw));
                $w_file = 'class-widget-' . $base_name . '.php';
                $src_w = UAS_PATH . 'includes/widgets/' . $w_file;
                if (file_exists($src_w) && empty($added_files['w:' . $w_file])) {
                    $bundle_files['includes/widgets/' . $w_file] = (string) file_get_contents($src_w);
                    $added_files['w:' . $w_file] = true;
                }
            }
        }

        $base_php = UAS_PATH . 'includes/class-widget-base.php';
        if (file_exists($base_php)) {
            $bundle_files['includes/class-widget-base.php'] = (string) file_get_contents($base_php);
        }
        $core_css = UAS_PATH . 'assets/css/widgets-core.css';
        if (file_exists($core_css)) {
            $bundle_files['assets/css/widgets-core.css'] = (string) file_get_contents($core_css);
        }
        $core_js = UAS_PATH . 'assets/js/widgets-core.js';
        if (file_exists($core_js)) {
            $bundle_files['assets/js/widgets-core.js'] = (string) file_get_contents($core_js);
        }

        foreach ($templates as $t_slug) {
            $t_file = UAS_PATH . 'templates/' . $t_slug . '.json';
            if (!file_exists($t_file)) {
                $t_file = UAS_PATH . 'templates/popups/' . $t_slug . '.json';
            }
            if (file_exists($t_file)) {
                $bundle_files['templates/' . basename($t_file)] = (string) file_get_contents($t_file);
            }
        }

        $fonts_dir = UAS_PATH . 'assets/fonts/';
        if (is_dir($fonts_dir)) {
            foreach (glob($fonts_dir . '*.*') as $font_file) {
                $bundle_files['assets/fonts/' . basename($font_file)] = (string) file_get_contents($font_file);
            }
        }
        $palettes_css = UAS_PATH . 'assets/css/palettes.css';
        if (file_exists($palettes_css)) {
            $bundle_files['assets/css/palettes.css'] = (string) file_get_contents($palettes_css);
        }
        $placeholders_dir = UAS_PATH . 'assets/images/placeholders/';
        if (is_dir($placeholders_dir)) {
            foreach (glob($placeholders_dir . '*.svg') as $ph_file) {
                $bundle_files['assets/images/placeholders/' . basename($ph_file)] = (string) file_get_contents($ph_file);
            }
        }

        if ($include_bridge) {
            $bridge_php = UAS_PATH . 'includes/class-theme-builder-bridge.php';
            if (file_exists($bridge_php)) {
                $bundle_files['includes/class-theme-builder-bridge.php'] = (string) file_get_contents($bridge_php);
            }
        }

        if ($include_query) {
            $query_php = UAS_PATH . 'includes/class-dynamic-query-engine.php';
            if (file_exists($query_php)) {
                $bundle_files['includes/class-dynamic-query-engine.php'] = (string) file_get_contents($query_php);
            }
        }

        if ($include_gutenberg) {
            $gb_php = UAS_PATH . 'includes/class-gutenberg-blocks.php';
            if (file_exists($gb_php)) {
                $bundle_files['includes/class-gutenberg-blocks.php'] = (string) file_get_contents($gb_php);
            }
            foreach ($gutenberg_blocks as $gb_slug) {
                $block_dir = UAS_PATH . 'blocks/' . $gb_slug . '/';
                if (is_dir($block_dir)) {
                    foreach (glob($block_dir . '*') as $b_file) {
                        if (is_file($b_file)) {
                            $bundle_files['blocks/' . $gb_slug . '/' . basename($b_file)] = (string) file_get_contents($b_file);
                        }
                    }
                }
            }
        }

        if ($include_cpts) {
            $bundle_files['includes/class-kit-cpt-schemas.php'] = $this->generate_kit_cpt_schemas_file($cpt_schemas, $cpts_catalog, $project_slug);
        }

        if (!empty($design_tokens)) {
            $primary_gold   = !empty($design_tokens['primary_color']) ? sanitize_hex_color($design_tokens['primary_color']) : '#D4AF37';
            $secondary_navy = !empty($design_tokens['secondary_color']) ? sanitize_hex_color($design_tokens['secondary_color']) : '#0B132B';
            $font_family    = !empty($design_tokens['font_family']) ? preg_replace('/[^a-zA-Z0-9\-\s_]/', '', (string) $design_tokens['font_family']) : 'Vazirmatn';
            $bundle_files['assets/css/kit-design-tokens.css'] = sprintf(
                ":root {\n  --sr-primary-accent: %s;\n  --sr-secondary-base: %s;\n  --sr-font-family: '%s', sans-serif;\n}\n",
                $primary_gold ?: '#D4AF37',
                $secondary_navy ?: '#0B132B',
                $font_family ?: 'Vazirmatn'
            );
        }

        // Embed per-file SHA-256 checksums inside manifest.json
        $manifest['checksum_algorithm'] = 'sha256';
        $manifest['file_checksums'] = $manifest_validator->compute_file_checksums($bundle_files);

        $zip = new \ZipArchive();
        if ($zip->open($zip_filepath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) !== true) {
            return ['success' => false, 'error' => 'امکان ایجاد فایل زیپ در سرور وجود ندارد.'];
        }

        $zip->addFromString($project_slug . '/manifest.json', json_encode($manifest, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        foreach ($bundle_files as $rel_path => $bytes) {
            $zip->addFromString($project_slug . '/' . $rel_path, $bytes);
        }

        $zip->close();

        if (!file_exists($zip_filepath) || filesize($zip_filepath) === 0) {
            return ['success' => false, 'error' => 'فایل بسته نهایی ایجاد نشد یا خالی است.'];
        }

        $zip_sha256 = hash_file('sha256', $zip_filepath);

        return [
            'success'            => true,
            'zip_path'           => $zip_filepath,
            'zip_url'            => $zip_fileurl,
            'filename'           => $zip_filename,
            'filesize'           => function_exists('size_format') ? size_format(filesize($zip_filepath)) : (filesize($zip_filepath) . ' B'),
            'sha256'             => $zip_sha256,
            'checksums_count'    => count($manifest['file_checksums']),
            'widgets_count'      => count($widgets),
            'auto_added_widgets' => $auto_added_widgets,
            'templates_count'    => count($templates),
            'blocks_count'       => count($gutenberg_blocks),
            'cpts_count'         => count($cpt_schemas),
            'gutenberg_blocks'   => $gutenberg_blocks,
            'cpt_schemas'        => $cpt_schemas,
            'message'            => sprintf('بسته مستقل «%s» با موفقیت کامپایل گردید (%s؛ %d ویجت شامل %d ویجت خودکار، %d بلوک گوتنبرگ و %d اسکیمای CPT).', $project_name, function_exists('size_format') ? size_format(filesize($zip_filepath)) : filesize($zip_filepath) . ' B', count($widgets), count($auto_added_widgets), count($gutenberg_blocks), count($cpt_schemas)),
        ];
    }

    /**
     * Generate standalone WordPress plugin loader PHP code for a single capability package.
     */
    public function generate_standalone_plugin_header(array $package, $slug) {
        $name    = esc_html($package['name']);
        $desc    = esc_html($package['description']);
        $version = esc_html($package['version']);
        $min_php = esc_html($package['requirements']['php'] ?? '7.4');
        $min_wp  = esc_html($package['requirements']['wordpress'] ?? '6.0');

        return "<?php
/**
 * Plugin Name: Universal {$name} (Standalone Elementor Addon)
 * Plugin URI: https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate
 * Description: {$desc}
 * Version: {$version}
 * Author: Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 * Text Domain: {$slug}
 * Requires at least: {$min_wp}
 * Requires PHP: {$min_php}
 */

if (!defined('ABSPATH')) {
    exit;
}

// Category fallback definition if parent suite is not active
if (!class_exists('\\\\UniversalElementorSuite\\\\Plugin')) {
    class UniversalElementorSuite_Plugin_Fallback {
        const CATEGORY_SLUG = 'universal-addon-suite';
    }
    class_alias('UniversalElementorSuite_Plugin_Fallback', 'UniversalElementorSuite\\\\Plugin');
}

add_action('elementor/elements/categories_registered', function(\$elements_manager) {
    \$elements_manager->add_category(
        'universal-addon-suite',
        [
            'title' => esc_html__('المان‌های پیشرفته (Universal Suite)', '{$slug}'),
            'icon'  => 'eicon-apps',
        ]
    );
    \$elements_manager->add_category(
        'sedrazavi-sovereign-suite',
        [
            'title' => esc_html__('سوییت مستقل سیدرضوی (SedRazavi)', '{$slug}'),
            'icon'  => 'fa fa-plug',
        ]
    );
});

add_action('elementor/widgets/register', function(\$widgets_manager) {
    if (file_exists(__DIR__ . '/includes/class-widget-base.php')) {
        require_once __DIR__ . '/includes/class-widget-base.php';
    }
    if (file_exists(__DIR__ . '/includes/class-dynamic-query-engine.php')) {
        require_once __DIR__ . '/includes/class-dynamic-query-engine.php';
        if (class_exists('\\\\UniversalElementorSuite\\\\Dynamic_Query_Engine')) {
            \\\\UniversalElementorSuite\\\\Dynamic_Query_Engine::instance();
        }
    }

    if (file_exists(__DIR__ . '/includes/')) {
        foreach (glob(__DIR__ . '/includes/class-widget-*.php') as \$file) {
            require_once \$file;
        }
    }

    \$classes = get_declared_classes();
    foreach (\$classes as \$cls) {
        if (strpos(\$cls, 'UniversalElementorSuite\\\\Widgets\\\\') === 0 && is_subclass_of(\$cls, '\\\\Elementor\\\\Widget_Base')) {
            if (method_exists(\$widgets_manager, 'register')) {
                \$widgets_manager->register(new \$cls());
            } elseif (method_exists(\$widgets_manager, 'register_widget_type')) {
                \$widgets_manager->register_widget_type(new \$cls());
            }
        }
    }
});

\$uas_register_standalone_assets = function() {
    if (file_exists(__DIR__ . '/assets/css/widgets-core.css')) {
        wp_register_style('uas-widgets-core', plugins_url('assets/css/widgets-core.css', __FILE__), [], '{$version}');
        wp_enqueue_style('uas-widgets-core');
    }
    if (file_exists(__DIR__ . '/assets/js/widgets-core.js')) {
        wp_register_script('uas-widgets-core', plugins_url('assets/js/widgets-core.js', __FILE__), ['jquery'], '{$version}', true);
        wp_enqueue_script('uas-widgets-core');
    }
    if (file_exists(__DIR__ . '/assets/css/')) {
        foreach (glob(__DIR__ . '/assets/css/*.css') as \$css) {
            \$base = basename(\$css, '.css');
            if (\$base !== 'widgets-core') {
                wp_register_style('uas-' . \$base . '-css', plugins_url('assets/css/' . basename(\$css), __FILE__), ['uas-widgets-core'], '{$version}');
                wp_enqueue_style('uas-' . \$base . '-css');
            }
        }
    }
    if (file_exists(__DIR__ . '/assets/js/')) {
        foreach (glob(__DIR__ . '/assets/js/*.js') as \$js) {
            \$base = basename(\$js, '.js');
            if (\$base !== 'widgets-core') {
                wp_register_script('uas-' . \$base . '-js', plugins_url('assets/js/' . basename(\$js), __FILE__), ['jquery', 'uas-widgets-core'], '{$version}', true);
                wp_enqueue_script('uas-' . \$base . '-js');
            }
        }
    }
};
add_action('elementor/frontend/after_register_styles', \$uas_register_standalone_assets);
add_action('elementor/frontend/after_register_scripts', \$uas_register_standalone_assets);
add_action('wp_enqueue_scripts', \$uas_register_standalone_assets);
";
    }

    /**
     * Generate standalone WordPress plugin loader PHP code for custom project kit.
     */
    public function generate_custom_bundle_plugin_file(array $manifest, $slug) {
        $name          = esc_html($manifest['name']);
        $version       = esc_html($manifest['version']);
        $niche         = esc_html($manifest['niche']);
        $has_bridge    = !empty($manifest['capabilities']['theme_bridge']);
        $has_query     = !empty($manifest['capabilities']['query_engine']);
        $has_gutenberg = !empty($manifest['capabilities']['gutenberg_blocks']);
        $has_cpts      = !empty($manifest['capabilities']['cpt_schemas']);
        $fn_slug       = str_replace('-', '_', sanitize_key($slug));

        $bridge_code = $has_bridge ? "if (file_exists(__DIR__ . '/includes/class-theme-builder-bridge.php')) {
    require_once __DIR__ . '/includes/class-theme-builder-bridge.php';
    if (class_exists('\\\\UniversalElementorSuite\\\\Theme_Builder_Bridge')) {
        \\\\UniversalElementorSuite\\\\Theme_Builder_Bridge::instance();
    }
}" : "";

        $query_code = $has_query ? "if (file_exists(__DIR__ . '/includes/class-dynamic-query-engine.php')) {
    require_once __DIR__ . '/includes/class-dynamic-query-engine.php';
    if (class_exists('\\\\UniversalElementorSuite\\\\Dynamic_Query_Engine')) {
        \\\\UniversalElementorSuite\\\\Dynamic_Query_Engine::instance();
    }
}" : "";

        $gutenberg_code = $has_gutenberg ? "if (file_exists(__DIR__ . '/includes/class-gutenberg-blocks.php')) {
    require_once __DIR__ . '/includes/class-gutenberg-blocks.php';
    if (class_exists('\\\\UniversalElementorSuite\\\\Gutenberg_Blocks')) {
        \\\\UniversalElementorSuite\\\\Gutenberg_Blocks::instance();
    }
}" : "";

        $cpt_code = $has_cpts ? "if (file_exists(__DIR__ . '/includes/class-kit-cpt-schemas.php')) {
    require_once __DIR__ . '/includes/class-kit-cpt-schemas.php';
}" : "";

        return "<?php
/**
 * Plugin Name: {$name} (Custom Project Kit)
 * Plugin URI: https://github.com/Aqamirrazavi/Sedrazavi-WPtemplate
 * Description: بسته سفارشی، قابل حمل و بهینه‌سازی‌شده برای پروژه ({$niche})؛ تولیدشده توسط استودیوی اکوسیستم SedRazavi.
 * Version: {$version}
 * Author: Seyyed Amir Hossein Razavi Fordoei (@sedrazavi)
 * Text Domain: {$slug}
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!defined('UAS_PATH')) {
    define('UAS_PATH', plugin_dir_path(__FILE__));
}
if (!defined('UAS_VERSION')) {
    define('UAS_VERSION', '{$version}');
}

if (!class_exists('\\\\UniversalElementorSuite\\\\Plugin')) {
    class UniversalElementorSuite_Plugin_Fallback {
        const CATEGORY_SLUG = 'universal-addon-suite';
    }
    class_alias('UniversalElementorSuite_Plugin_Fallback', 'UniversalElementorSuite\\\\Plugin');
}

/**
 * Runtime self-verification against manifest.json per-file SHA-256 checksums.
 *
 * @return array
 */
function uas_verify_bundle_checksums_{$fn_slug}() {
    \$manifest_path = __DIR__ . '/manifest.json';
    if (!file_exists(\$manifest_path)) {
        return ['verified' => false, 'checked_files' => 0, 'mismatches' => ['manifest.json missing']];
    }
    \$decoded = @json_decode((string) @file_get_contents(\$manifest_path), true);
    if (!is_array(\$decoded) || empty(\$decoded['file_checksums']) || !is_array(\$decoded['file_checksums'])) {
        return ['verified' => true, 'checked_files' => 0, 'mismatches' => []];
    }
    \$mismatches = [];
    \$checked = 0;
    foreach (\$decoded['file_checksums'] as \$rel => \$expected_hash) {
        \$rel_clean = ltrim(str_replace('\\\\', '/', (string) \$rel), '/');
        if (strpos(\$rel_clean, '../') !== false) {
            \$mismatches[] = \$rel_clean;
            continue;
        }
        \$target = __DIR__ . '/' . \$rel_clean;
        if (!file_exists(\$target)) {
            \$mismatches[] = \$rel_clean . ' (missing)';
            continue;
        }
        \$actual = hash_file('sha256', \$target);
        \$checked++;
        if (!is_string(\$actual) || !hash_equals((string) \$expected_hash, \$actual)) {
            \$mismatches[] = \$rel_clean . ' (checksum mismatch)';
        }
    }
    return [
        'verified'      => empty(\$mismatches),
        'checked_files' => \$checked,
        'mismatches'    => \$mismatches,
        'checked_at'    => function_exists('current_time') ? current_time('mysql') : gmdate('Y-m-d H:i:s'),
    ];
}

add_action('elementor/elements/categories_registered', function(\$elements_manager) {
    \$elements_manager->add_category(
        'universal-addon-suite',
        [
            'title' => esc_html__('المان‌های پیشرفته (Universal Suite)', '{$slug}'),
            'icon'  => 'eicon-apps',
        ]
    );
    \$elements_manager->add_category(
        'universal-elementor-suite',
        [
            'title' => esc_html__('سوییت مستقل سفارشی سیدرضوی (SedRazavi)', '{$slug}'),
            'icon'  => 'fa fa-cube',
        ]
    );
    \$elements_manager->add_category(
        'sedrazavi-sovereign-suite',
        [
            'title' => esc_html__('سوییت حاکمیتی سیدرضوی (SedRazavi Sovereign)', '{$slug}'),
            'icon'  => 'fa fa-cubes',
        ]
    );
});

// 1. Self-Checksum Verification, Rewrite Flush & Dependency-Gated Template Importer on Activation
register_activation_hook(__FILE__, function() {
    \$integrity = uas_verify_bundle_checksums_{$fn_slug}();
    update_option('uas_bundle_integrity_{$slug}', \$integrity);
    if (empty(\$integrity['verified'])) {
        update_option('uas_bundle_integrity_error_{$slug}', \$integrity['mismatches']);
        return;
    }

    if (function_exists('flush_rewrite_rules')) {
        flush_rewrite_rules();
    }

    \$tpl_dir = __DIR__ . '/templates/';
    if (!is_dir(\$tpl_dir)) return;

    \$widget_file_map = [
        'uas_posts_grid' => 'class-widget-posts.php',
    ];
    \$extract_widgets = function(\$elements) use (&\$extract_widgets) {
        \$list = [];
        if (!is_array(\$elements)) return \$list;
        foreach (\$elements as \$el) {
            if (!is_array(\$el)) continue;
            if (!empty(\$el['widgetType']) && strpos(\$el['widgetType'], 'uas_') === 0) {
                \$list[] = sanitize_key(\$el['widgetType']);
            }
            if (!empty(\$el['elements']) && is_array(\$el['elements'])) {
                \$list = array_merge(\$list, \$extract_widgets(\$el['elements']));
            }
        }
        return array_values(array_unique(\$list));
    };

    \$ph_base = plugins_url('assets/images/placeholders/', __FILE__);
    \$relink_media = function(&\$nodes) use (&\$relink_media, \$ph_base) {
        if (!is_array(\$nodes)) return;
        foreach (\$nodes as \$k => &\$v) {
            if (\$k === 'url' && is_string(\$v) && (strpos(\$v, 'images.unsplash.com') !== false || strpos(\$v, 'via.placeholder') !== false)) {
                \$lower = strtolower(\$v);
                if (strpos(\$lower, 'w=200') !== false || strpos(\$lower, '1534528741775') !== false || strpos(\$lower, '1507003211169') !== false) {
                    \$v = \$ph_base . 'client-avatar.svg';
                } elseif (strpos(\$lower, '1523275335684') !== false) {
                    \$v = \$ph_base . 'product-studio.svg';
                } elseif (strpos(\$lower, '1460925895917') !== false || strpos(\$lower, 'w=900') !== false) {
                    \$v = \$ph_base . 'saas-dashboard.svg';
                } else {
                    \$v = \$ph_base . 'hero-showcase.svg';
                }
                if (isset(\$nodes['id'])) {
                    \$nodes['id'] = '';
                }
            } elseif (is_array(\$v)) {
                \$relink_media(\$v);
            }
        }
    };

    \$skipped_missing = [];
    foreach (glob(\$tpl_dir . '*.json') as \$file) {
        \$tpl_slug = basename(\$file, '.json');
        \$raw = @file_get_contents(\$file);
        \$data = @json_decode(\$raw, true);
        if (!is_array(\$data) || empty(\$data['title']) || empty(\$data['content'])) continue;

        \$required_widgets = \$extract_widgets(\$data['content']);
        \$missing_for_tpl = [];
        foreach (\$required_widgets as \$w_type) {
            \$expected = \$widget_file_map[\$w_type] ?? ('class-widget-' . str_replace('uas_', '', str_replace('_', '-', \$w_type)) . '.php');
            if (!file_exists(__DIR__ . '/includes/widgets/' . \$expected)) {
                \$missing_for_tpl[] = \$w_type;
            }
        }
        if (!empty(\$missing_for_tpl)) {
            \$skipped_missing[\$tpl_slug] = \$missing_for_tpl;
            continue;
        }

        \$relink_media(\$data['content']);

        \$exists = get_posts([
            'post_type'      => 'elementor_library',
            'post_status'    => 'any',
            'posts_per_page' => 1,
            'meta_key'       => '_uas_custom_tpl_slug',
            'meta_value'     => \$tpl_slug,
        ]);

        if (empty(\$exists)) {
            \$type = \$data['type'] ?? 'section';
            \$pid = wp_insert_post([
                'post_title'   => sanitize_text_field(\$data['title']),
                'post_type'    => 'elementor_library',
                'post_status'  => 'publish',
                'post_content' => '',
            ]);
            if (\$pid && !is_wp_error(\$pid)) {
                if (taxonomy_exists('elementor_library_type')) {
                    wp_set_object_terms(\$pid, \$type, 'elementor_library_type');
                }
                update_post_meta(\$pid, '_elementor_edit_mode', 'builder');
                update_post_meta(\$pid, '_elementor_template_type', \$type);
                update_post_meta(\$pid, '_elementor_data', wp_slash(wp_json_encode(\$data['content'], JSON_UNESCAPED_UNICODE)));
                update_post_meta(\$pid, '_elementor_version', defined('ELEMENTOR_VERSION') ? ELEMENTOR_VERSION : '3.24.0');
                update_post_meta(\$pid, '_uas_custom_tpl_slug', \$tpl_slug);
                update_post_meta(\$pid, '_uas_package_id', '{$slug}');
                update_post_meta(\$pid, '_uas_required_widgets', \$required_widgets);
            }
        }
    }

    if (!empty(\$skipped_missing)) {
        update_option('uas_skipped_templates_{$slug}', \$skipped_missing);
    }

    if (class_exists('\\\\Elementor\\\\Plugin') && isset(\\\\Elementor\\\\Plugin::\$instance->files_manager)) {
        \\\\Elementor\\\\Plugin::\$instance->files_manager->clear_cache();
    }
});

// 2. Load Optional Theme Builder Bridge
{$bridge_code}

// 3. Load Optional Dynamic Query Engine
{$query_code}

// 3B. Load Optional Selected Gutenberg Blocks
{$gutenberg_code}

// 3C. Load Optional Portable CPT Schemas
{$cpt_code}

// 4. Register Custom Selected Widgets in Elementor
add_action('elementor/widgets/register', function(\$widgets_manager) {
    if (file_exists(__DIR__ . '/includes/class-widget-base.php')) {
        require_once __DIR__ . '/includes/class-widget-base.php';
    }

    if (file_exists(__DIR__ . '/includes/widgets/')) {
        foreach (glob(__DIR__ . '/includes/widgets/*.php') as \$file) {
            require_once \$file;
        }
    }

    \$classes = get_declared_classes();
    foreach (\$classes as \$cls) {
        if (strpos(\$cls, 'UniversalElementorSuite\\\\Widgets\\\\') === 0 && is_subclass_of(\$cls, '\\\\Elementor\\\\Widget_Base')) {
            if (method_exists(\$widgets_manager, 'register')) {
                \$widgets_manager->register(new \$cls());
            } elseif (method_exists(\$widgets_manager, 'register_widget_type')) {
                \$widgets_manager->register_widget_type(new \$cls());
            }
        }
    }
});

// 5. Register Canonical uas-* Asset Handles & Enqueue Frontend Scripts & Styles
\$uas_register_kit_assets = function() {
    if (file_exists(__DIR__ . '/assets/css/widgets-core.css')) {
        wp_register_style('uas-widgets-core', plugins_url('assets/css/widgets-core.css', __FILE__), [], '{$version}');
        wp_enqueue_style('uas-widgets-core');
        wp_enqueue_style('{$slug}-core', plugins_url('assets/css/widgets-core.css', __FILE__), ['uas-widgets-core'], '{$version}');
    }
    if (file_exists(__DIR__ . '/assets/js/widgets-core.js')) {
        wp_register_script('uas-widgets-core', plugins_url('assets/js/widgets-core.js', __FILE__), ['jquery'], '{$version}', true);
        wp_enqueue_script('uas-widgets-core');
    }
    if (file_exists(__DIR__ . '/assets/css/')) {
        foreach (glob(__DIR__ . '/assets/css/*.css') as \$css) {
            \$base = basename(\$css, '.css');
            if (\$base !== 'widgets-core') {
                wp_register_style('uas-' . \$base . '-css', plugins_url('assets/css/' . basename(\$css), __FILE__), ['uas-widgets-core'], '{$version}');
                wp_enqueue_style('uas-' . \$base . '-css');
                wp_enqueue_style('{$slug}-' . \$base, plugins_url('assets/css/' . basename(\$css), __FILE__), ['uas-widgets-core'], '{$version}');
            }
        }
    }
    if (file_exists(__DIR__ . '/assets/js/')) {
        foreach (glob(__DIR__ . '/assets/js/*.js') as \$js) {
            \$base = basename(\$js, '.js');
            if (\$base !== 'widgets-core') {
                wp_register_script('uas-' . \$base . '-js', plugins_url('assets/js/' . basename(\$js), __FILE__), ['jquery', 'uas-widgets-core'], '{$version}', true);
                wp_enqueue_script('uas-' . \$base . '-js');
                wp_enqueue_script('{$slug}-' . \$base, plugins_url('assets/js/' . basename(\$js), __FILE__), ['jquery', 'uas-widgets-core'], '{$version}', true);
            }
        }
    }
};
add_action('elementor/frontend/after_register_styles', \$uas_register_kit_assets);
add_action('elementor/frontend/after_register_scripts', \$uas_register_kit_assets);
add_action('wp_enqueue_scripts', \$uas_register_kit_assets);
";
    }

    /**
     * Generate standalone WordPress CPT & taxonomy registration bootstrap for selected public Site Kit schemas.
     *
     * @param array  $cpt_schemas
     * @param array  $cpts_catalog
     * @param string $slug
     * @return string
     */
    public function generate_kit_cpt_schemas_file(array $cpt_schemas, array $cpts_catalog, $slug) {
        $exported_defs = [];
        foreach ($cpt_schemas as $cpt_slug) {
            if (!empty($cpts_catalog[$cpt_slug])) {
                $exported_defs[$cpt_slug] = $cpts_catalog[$cpt_slug];
            }
        }
        $schemas_var = var_export($exported_defs, true);

        return "<?php
/**
 * Portable Public CPT & Taxonomy Schemas for Kit: {$slug}
 * Registers only explicitly bundled public schemas cleanly without deleting existing content.
 */
if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function() {
    \$schemas = {$schemas_var};
    foreach (\$schemas as \$cpt_slug => \$meta) {
        if (!post_type_exists(\$cpt_slug)) {
            register_post_type(\$cpt_slug, [
                'labels'       => [
                    'name'          => \$meta['title'],
                    'singular_name' => \$meta['title'],
                    'menu_name'     => \$meta['title'],
                ],
                'public'       => !empty(\$meta['public']),
                'has_archive'  => true,
                'rewrite'      => ['slug' => \$meta['rewrite_slug'] ?? \$cpt_slug],
                'menu_icon'    => \$meta['menu_icon'] ?? 'dashicons-portfolio',
                'supports'     => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
                'show_in_rest' => !empty(\$meta['show_in_rest']),
            ]);
        }
        if (!empty(\$meta['taxonomy']) && !taxonomy_exists(\$meta['taxonomy'])) {
            register_taxonomy(\$meta['taxonomy'], [\$cpt_slug], [
                'labels'       => [
                    'name'          => \$meta['tax_title'] ?? \$meta['taxonomy'],
                    'singular_name' => \$meta['tax_title'] ?? \$meta['taxonomy'],
                ],
                'hierarchical' => true,
                'show_in_rest' => !empty(\$meta['show_in_rest']),
                'rewrite'      => ['slug' => str_replace('_', '-', \$meta['taxonomy'])],
            ]);
        }
    }
}, 9);
";
    }
}
