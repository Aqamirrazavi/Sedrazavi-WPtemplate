<?php
namespace UniversalElementorSuite\Packaging;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Package Preflight, Atomic Installer & Rollback Engine (P1-04)
 *
 * Performs environment & dependency preflight checks, atomic extraction with
 * rollback on write failure, plugin activation in WP_PLUGIN_DIR, dependency-gated
 * Elementor Library hydration, Media Relinker, and full database/file rollback.
 *
 * @package Universal_Elementor_Suite
 */
class Package_Installer {

    /**
     * Comprehensive Preflight Environment & Dependency Check.
     *
     * @param string|array               $target
     * @param Package_Registry           $registry
     * @param Package_Manifest_Validator $manifest_validator
     * @param Dependency_Resolver        $dep_resolver
     * @return array
     */
    public function preflight_check(
        $target,
        Package_Registry $registry,
        Package_Manifest_Validator $manifest_validator,
        Dependency_Resolver $dep_resolver
    ) {
        $manifest = null;
        $packages = $registry->get_portable_packages();

        if (is_string($target)) {
            $manifest = $registry->get_package($target);
            if (!$manifest) {
                return [
                    'pass'   => false,
                    'errors' => [sprintf('پکیج با شناسه «%s» در رجیستری یافت نشد.', $target)],
                ];
            }
        } elseif (is_array($target)) {
            $manifest = $target;
        } else {
            return ['pass' => false, 'errors' => ['داده‌های مانیفست نامعتبر است.']];
        }

        $errors   = [];
        $warnings = [];

        $manifest_check = $manifest_validator->validate_manifest($manifest);
        if (!$manifest_check['valid']) {
            $errors = array_merge($errors, $manifest_check['errors']);
        }
        $warnings = array_merge($warnings, $manifest_check['warnings']);

        $package_id = $manifest['id'] ?? '';
        $resolved_deps = [];
        if (!empty($package_id) && $registry->get_package($package_id)) {
            $dep_check = $dep_resolver->resolve_package_dependencies($package_id, $packages);
            if (!$dep_check['success']) {
                $errors = array_merge($errors, $dep_check['errors']);
            } else {
                $resolved_deps = $dep_check['resolved'];
            }

            $conflict_check = $dep_resolver->check_package_conflicts($package_id, $packages);
            if ($conflict_check['conflict']) {
                $errors = array_merge($errors, $conflict_check['messages']);
            }
        }

        return [
            'pass'         => empty($errors),
            'package_id'   => $package_id,
            'manifest'     => $manifest,
            'dependencies' => $resolved_deps,
            'errors'       => $errors,
            'warnings'     => $warnings,
            'environment'  => [
                'php_version'       => PHP_VERSION,
                'wp_version'        => function_exists('get_bloginfo') ? get_bloginfo('version') : '6.7.0',
                'elementor_active'  => defined('ELEMENTOR_VERSION'),
                'elementor_version' => defined('ELEMENTOR_VERSION') ? ELEMENTOR_VERSION : null,
            ],
        ];
    }

    /**
     * Import a portable package archive with dry-run, checksum verification, and atomic rollback support.
     *
     * @param string                     $zip_filepath
     * @param bool                       $dry_run
     * @param string|null                $target_dir
     * @param Archive_Security_Validator $sec_validator
     * @param Package_Manifest_Validator $manifest_validator
     * @param callable                   $preflight_callback
     * @return array
     */
    public function import_package_archive(
        $zip_filepath,
        $dry_run,
        $target_dir,
        Archive_Security_Validator $sec_validator,
        Package_Manifest_Validator $manifest_validator,
        callable $preflight_callback
    ) {
        // 1. Security Verification (includes Anti-Zip-Slip & per-file SHA-256 verification)
        $sec_audit = $sec_validator->verify_archive_security($zip_filepath, $manifest_validator);
        if (!$sec_audit['safe']) {
            return [
                'success' => false,
                'stage'   => 'security_audit',
                'error'   => $sec_audit['error'],
            ];
        }

        $manifest = $sec_audit['manifest'];

        // 2. Preflight Check
        $preflight = call_user_func($preflight_callback, $manifest);
        if (empty($preflight['pass'])) {
            return [
                'success'   => false,
                'stage'     => 'preflight_failed',
                'errors'    => $preflight['errors'] ?? [],
                'warnings'  => $preflight['warnings'] ?? [],
            ];
        }

        if ($dry_run) {
            return [
                'success'                 => true,
                'dry_run'                 => true,
                'manifest'                => $manifest,
                'files_count'             => $sec_audit['files_count'],
                'total_size'              => $sec_audit['total_size'],
                'checksum_verified_count' => $sec_audit['checksum_verified_count'] ?? 0,
                'warnings'                => $preflight['warnings'] ?? [],
                'message'                 => 'بررسی پیش‌پرواز (Preflight) و تطبیق چک‌سام با موفقیت تأیید شد.',
            ];
        }

        // 3. Extraction Destination
        $clean_slug = sanitize_key($manifest['id']);
        $upload_dir = wp_upload_dir();
        $is_plugin_bundle = in_array($manifest['package_type'] ?? '', ['custom-project-kit', 'ui', 'service', 'full_feature'], true);
        $installed_as_plugin = false;

        if (!$target_dir) {
            if ($is_plugin_bundle && defined('WP_PLUGIN_DIR') && is_dir(WP_PLUGIN_DIR) && is_writable(WP_PLUGIN_DIR)) {
                $target_dir = trailingslashit(WP_PLUGIN_DIR) . $clean_slug . '/';
                $installed_as_plugin = true;
            } else {
                $base_install = trailingslashit($upload_dir['basedir']) . 'uas-standalone-packages/installed/';
                $target_dir = $base_install . $clean_slug . '/';
            }
        } elseif (defined('WP_PLUGIN_DIR') && strpos($target_dir, WP_PLUGIN_DIR) === 0) {
            $installed_as_plugin = true;
        }

        $main_plugin_rel = $clean_slug . '/' . $clean_slug . '.php';
        $was_active_before = function_exists('is_plugin_active') ? is_plugin_active($main_plugin_rel) : false;
        $pre_existing_dir = is_dir($target_dir);

        if (!wp_mkdir_p($target_dir)) {
            return [
                'success' => false,
                'stage'   => 'filesystem_error',
                'error'   => sprintf('امکان ایجاد پوشه نصب در مسیر %s وجود ندارد.', $target_dir),
            ];
        }

        // 4. Safe atomic extraction
        $zip = new \ZipArchive();
        if ($zip->open($zip_filepath) !== true) {
            return ['success' => false, 'error' => 'خطا در بازگشایی بسته جهت استخراج نهایی.'];
        }

        $extracted_files = [];
        $failed = false;
        $fail_reason = '';

        for ($i = 0; $i < $zip->numFiles; $i++) {
            $filename = $zip->getNameIndex($i);
            if (substr($filename, -1) === '/' || substr($filename, -1) === '\\') {
                continue;
            }

            $parts = explode('/', str_replace('\\', '/', $filename));
            if (count($parts) > 1 && $parts[0] === $clean_slug) {
                array_shift($parts);
            }
            $relative_dest = implode('/', $parts);
            $full_dest = $target_dir . $relative_dest;
            $parent_dir = dirname($full_dest);

            if (!is_dir($parent_dir) && !wp_mkdir_p($parent_dir)) {
                $failed = true;
                $fail_reason = sprintf('خطا در ساخت زیرپوشه %s', $parent_dir);
                break;
            }

            $content = $zip->getFromIndex($i);
            if ($content === false || @file_put_contents($full_dest, $content) === false) {
                $failed = true;
                $fail_reason = sprintf('خطا در نوشتن فایل %s', $full_dest);
                break;
            }

            $extracted_files[] = $full_dest;
        }

        $zip->close();

        // 5. Atomic Rollback on failure
        if ($failed) {
            foreach ($extracted_files as $f) {
                if (file_exists($f)) {
                    @unlink($f);
                }
            }
            return [
                'success' => false,
                'stage'   => 'atomic_rollback_executed',
                'error'   => $fail_reason,
            ];
        }

        // 6. Activate plugin if installed inside WP_PLUGIN_DIR
        $plugin_activated = false;
        if ($installed_as_plugin && file_exists($target_dir . $clean_slug . '.php')) {
            if (!function_exists('activate_plugin') && defined('ABSPATH') && file_exists(ABSPATH . 'wp-admin/includes/plugin.php')) {
                require_once ABSPATH . 'wp-admin/includes/plugin.php';
            }
            if (function_exists('activate_plugin')) {
                $act_res = activate_plugin($main_plugin_rel);
                if (!is_wp_error($act_res)) {
                    $plugin_activated = true;
                }
            }
        }

        // 7. Dependency-Gated Template Library Hydration + Media Relinker
        $hydrated_posts = [];
        $blocked_templates = [];
        $relinked_media_count = 0;
        $tpl_dir = $target_dir . 'templates/';
        $widgets_dir = $target_dir . 'includes/widgets/';

        if (is_dir($tpl_dir) && function_exists('wp_insert_post')) {
            $ph_base_url = $installed_as_plugin && function_exists('plugins_url')
                ? plugins_url($clean_slug . '/assets/images/placeholders/')
                : trailingslashit($upload_dir['baseurl']) . 'uas-standalone-packages/installed/' . $clean_slug . '/assets/images/placeholders/';

            foreach (glob($tpl_dir . '*.json') as $file) {
                $slug = basename($file, '.json');
                $raw = @file_get_contents($file);
                $data = @json_decode($raw, true);
                if (!is_array($data) || empty($data['title']) || empty($data['content'])) {
                    continue;
                }

                if (class_exists('\\UniversalElementorSuite\\Template_Importer')) {
                    $dep_check = \UniversalElementorSuite\Template_Importer::validate_template_widget_dependencies($data['content'], $widgets_dir);
                    if (!$dep_check['valid']) {
                        $blocked_templates[$slug] = $dep_check['missing_widgets'];
                        continue;
                    }
                    $relinked_media_count += \UniversalElementorSuite\Template_Importer::relink_template_media($data['content'], $ph_base_url);
                }

                $existing = get_posts([
                    'post_type'      => 'elementor_library',
                    'post_status'    => 'any',
                    'posts_per_page' => 1,
                    'meta_key'       => '_uas_custom_tpl_slug',
                    'meta_value'     => $slug,
                ]);
                if (!empty($existing)) {
                    $hydrated_posts[] = $existing[0]->ID;
                    continue;
                }

                $type = $data['type'] ?? 'section';
                $pid = wp_insert_post([
                    'post_title'   => sanitize_text_field($data['title']),
                    'post_type'    => 'elementor_library',
                    'post_status'  => 'publish',
                    'post_content' => '',
                ]);

                if ($pid && !is_wp_error($pid)) {
                    if (taxonomy_exists('elementor_library_type')) {
                        wp_set_object_terms($pid, $type, 'elementor_library_type');
                    }
                    update_post_meta($pid, '_elementor_edit_mode', 'builder');
                    update_post_meta($pid, '_elementor_template_type', $type);
                    update_post_meta($pid, '_elementor_data', wp_slash(wp_json_encode($data['content'], JSON_UNESCAPED_UNICODE)));
                    update_post_meta($pid, '_elementor_version', defined('ELEMENTOR_VERSION') ? ELEMENTOR_VERSION : '3.24.0');
                    update_post_meta($pid, '_uas_custom_tpl_slug', $slug);
                    update_post_meta($pid, '_uas_package_id', $clean_slug);
                    $hydrated_posts[] = $pid;
                }
            }
        }

        if (class_exists('\Elementor\Plugin') && isset(\Elementor\Plugin::$instance->files_manager)) {
            \Elementor\Plugin::$instance->files_manager->clear_cache();
        }

        if (function_exists('update_option')) {
            update_option('uas_pkg_rollback_snapshot_' . $clean_slug, [
                'package_id'          => $clean_slug,
                'installed_path'      => $target_dir,
                'installed_as_plugin' => $installed_as_plugin,
                'main_plugin_rel'     => $main_plugin_rel,
                'was_active_before'   => $was_active_before,
                'pre_existing_dir'    => $pre_existing_dir,
                'hydrated_post_ids'   => $hydrated_posts,
                'timestamp'           => time(),
            ]);
        }

        $sha256 = hash_file('sha256', $zip_filepath);

        return [
            'success'                 => true,
            'dry_run'                 => false,
            'package_id'              => $manifest['id'],
            'installed_path'          => $target_dir,
            'installed_as_plugin'     => $installed_as_plugin,
            'plugin_activated'        => $plugin_activated,
            'files_extracted'         => count($extracted_files),
            'checksum_verified_count' => $sec_audit['checksum_verified_count'] ?? 0,
            'hydrated_templates'      => count($hydrated_posts),
            'blocked_templates'       => $blocked_templates,
            'relinked_media_count'    => $relinked_media_count,
            'sha256'                  => $sha256,
            'manifest'                => $manifest,
            'message'                 => sprintf('بسته مستقل «%s» با موفقیت در مسیر %s مستقر گردید (%d تمپلیت ثبت و %d رسانه بازنگاشت شد).', $manifest['name'], $installed_as_plugin ? 'افزونه‌های وردپرس' : 'حافظه موقت', count($hydrated_posts), $relinked_media_count),
        ];
    }

    /**
     * Recursive directory purge helper.
     */
    public function purge_directory_recursive($dir_path) {
        $count = 0;
        if (!is_dir($dir_path)) {
            return 0;
        }
        $it = new \RecursiveDirectoryIterator($dir_path, \RecursiveDirectoryIterator::SKIP_DOTS);
        $files = new \RecursiveIteratorIterator($it, \RecursiveIteratorIterator::CHILD_FIRST);
        foreach ($files as $file) {
            if ($file->isDir()) {
                @rmdir($file->getRealPath());
            } else {
                if (@unlink($file->getRealPath())) {
                    $count++;
                }
            }
        }
        @rmdir($dir_path);
        return $count;
    }

    /**
     * Full package rollback (plugin deactivation, filesystem purge, DB template purge, cache invalidation).
     *
     * @param string $package_id
     * @return array
     */
    public function rollback_package_installation($package_id) {
        $clean_slug = sanitize_key($package_id);
        $snapshot = function_exists('get_option') ? get_option('uas_pkg_rollback_snapshot_' . $clean_slug, []) : [];

        $deactivated = false;
        $main_plugin_rel = $snapshot['main_plugin_rel'] ?? ($clean_slug . '/' . $clean_slug . '.php');
        if (!function_exists('deactivate_plugins') && defined('ABSPATH') && file_exists(ABSPATH . 'wp-admin/includes/plugin.php')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }
        if (function_exists('is_plugin_active') && is_plugin_active($main_plugin_rel) && function_exists('deactivate_plugins')) {
            deactivate_plugins($main_plugin_rel, true);
            $deactivated = true;
        }

        $upload_dir = wp_upload_dir();
        $export_dir = trailingslashit($upload_dir['basedir']) . 'uas-standalone-packages/';
        $installed_dir = $export_dir . 'installed/' . $clean_slug . '/';

        $deleted_files = 0;
        if (is_dir($export_dir)) {
            $files = glob($export_dir . $clean_slug . '*');
            if (is_array($files)) {
                foreach ($files as $f) {
                    if (is_file($f) && @unlink($f)) {
                        $deleted_files++;
                    }
                }
            }
        }

        $deleted_files += $this->purge_directory_recursive($installed_dir);

        if (defined('WP_PLUGIN_DIR')) {
            $plugin_dir = trailingslashit(WP_PLUGIN_DIR) . $clean_slug . '/';
            if (is_dir($plugin_dir)) {
                $deleted_files += $this->purge_directory_recursive($plugin_dir);
            }
        }
        if (!empty($snapshot['installed_path']) && is_dir($snapshot['installed_path'])) {
            $deleted_files += $this->purge_directory_recursive($snapshot['installed_path']);
        }

        $deleted_posts = 0;
        $purged_ids = [];
        if (function_exists('wp_delete_post')) {
            if (!empty($snapshot['hydrated_post_ids']) && is_array($snapshot['hydrated_post_ids'])) {
                foreach ($snapshot['hydrated_post_ids'] as $pid) {
                    if (wp_delete_post((int) $pid, true)) {
                        $deleted_posts++;
                        $purged_ids[(int) $pid] = true;
                    }
                }
            }
            if (function_exists('get_posts')) {
                $tpl_posts = get_posts([
                    'post_type'      => 'elementor_library',
                    'post_status'    => 'any',
                    'posts_per_page' => -1,
                    'meta_key'       => '_uas_package_id',
                    'meta_value'     => $clean_slug,
                ]);
                foreach ($tpl_posts as $tp) {
                    if (empty($purged_ids[$tp->ID]) && wp_delete_post($tp->ID, true)) {
                        $deleted_posts++;
                    }
                }
            }
        }

        if (class_exists('\Elementor\Plugin') && isset(\Elementor\Plugin::$instance->files_manager)) {
            \Elementor\Plugin::$instance->files_manager->clear_cache();
        }
        if (function_exists('delete_option')) {
            delete_option('uas_skipped_templates_' . $clean_slug);
            delete_option('uas_pkg_rollback_snapshot_' . $clean_slug);
        }
        delete_transient('uas_query_' . $clean_slug);
        delete_transient('uas_pkg_manifest_' . $clean_slug);

        return [
            'success'            => true,
            'package_id'         => $package_id,
            'plugin_deactivated' => $deactivated,
            'deleted_files'      => $deleted_files,
            'deleted_posts'      => $deleted_posts,
            'message'            => sprintf('رول‌بک کامل پکیج %s انجام شد (غیرفعال‌سازی افزونه: %s، %d فایل و %d تمپلیت دیتابیس پاک‌سازی گردید).', $package_id, $deactivated ? 'بله' : 'خیر', $deleted_files, $deleted_posts),
        ];
    }
}
