<?php
namespace UniversalElementorSuite\Packaging;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Package Manifest & Per-File SHA-256 Checksum Validator
 *
 * Validates package manifest structure, runtime environment compatibility,
 * and computes/verifies per-file SHA-256 checksums inside exported ZIP bundles.
 *
 * @package Universal_Elementor_Suite
 */
class Package_Manifest_Validator {

    /**
     * Validate a package manifest against schema rules and current runtime environment.
     *
     * @param array $manifest
     * @return array [ 'valid' => bool, 'errors' => array, 'warnings' => array ]
     */
    public function validate_manifest(array $manifest) {
        $errors   = [];
        $warnings = [];

        // Required keys
        $required_keys = ['id', 'name', 'version', 'package_type'];
        foreach ($required_keys as $key) {
            if (empty($manifest[$key])) {
                $errors[] = sprintf('کلید الزامی "%s" در فایل مانیفست پکیج یافت نشد.', $key);
            }
        }

        if (!empty($manifest['id']) && !preg_match('/^[a-z0-9][a-z0-9_-]{1,80}$/', (string) $manifest['id'])) {
            $errors[] = 'شناسه پکیج (id) باید تنها شامل حروف کوچک انگلیسی، اعداد، خط تیره یا زیرخط باشد.';
        }

        $allowed_types = ['ui', 'service', 'full_feature', 'custom-project-kit'];
        if (!empty($manifest['package_type']) && !in_array((string) $manifest['package_type'], $allowed_types, true)) {
            $errors[] = sprintf('نوع بسته "%s" پشتیبانی نمی‌شود.', sanitize_text_field((string) $manifest['package_type']));
        }

        // Checksum algorithm validation if file_checksums are present
        if (isset($manifest['file_checksums'])) {
            if (!is_array($manifest['file_checksums'])) {
                $errors[] = 'ساختار جدول چک‌سام فایل‌ها (file_checksums) در مانیفست معتبر نیست.';
            } elseif (!empty($manifest['checksum_algorithm']) && $manifest['checksum_algorithm'] !== 'sha256') {
                $errors[] = sprintf('الگوریتم هش پشتیبانی‌نشده: %s (فقط sha256 مجاز است).', sanitize_text_field((string) $manifest['checksum_algorithm']));
            }
        }

        // Requirements validation
        if (!empty($manifest['requirements']) && is_array($manifest['requirements'])) {
            $req = $manifest['requirements'];

            // PHP Check
            if (!empty($req['php'])) {
                $min_php = ltrim((string) $req['php'], '>=');
                if (version_compare(PHP_VERSION, $min_php, '<')) {
                    $errors[] = sprintf('نسخه PHP سرور (%s) پایین‌تر از حداقل نیازمندی این بسته (%s) است.', PHP_VERSION, $min_php);
                }
            }

            // WordPress Check
            if (!empty($req['wordpress']) && function_exists('get_bloginfo')) {
                $min_wp = ltrim((string) $req['wordpress'], '>=');
                $wp_version = get_bloginfo('version');
                if (version_compare($wp_version, $min_wp, '<')) {
                    $errors[] = sprintf('نسخه وردپرس (%s) با این بسته سازگار نیست (نیاز به %s دارد).', $wp_version, $min_wp);
                }
            }

            // Elementor Version Check
            if (!empty($req['elementor']) && defined('ELEMENTOR_VERSION')) {
                $min_el = ltrim((string) $req['elementor'], '>=');
                if (version_compare(ELEMENTOR_VERSION, $min_el, '<')) {
                    $errors[] = sprintf('نسخه المنتور فعلی (%s) قدیمی‌تر از حداقل نسخه مورد نیاز (%s) است.', ELEMENTOR_VERSION, $min_el);
                }
            }

            // Elementor Pro warning
            if (!empty($req['elementor_pro']) && !defined('ELEMENTOR_PRO_VERSION')) {
                $warnings[] = 'این بسته از ویژگی‌های پیشرفته المنتور پرو استفاده می‌کند؛ در نسخه رایگان با فال‌بک کار خواهد کرد.';
            }
        }

        return [
            'valid'    => empty($errors),
            'errors'   => $errors,
            'warnings' => $warnings,
        ];
    }

    /**
     * Compute deterministic per-file SHA-256 checksums for bundled files.
     *
     * @param array $file_contents_map Associative array [ 'relative/path' => string $bytes ]
     * @return array Associative array [ 'relative/path' => string $sha256_hex ]
     */
    public function compute_file_checksums(array $file_contents_map) {
        $checksums = [];
        foreach ($file_contents_map as $rel_path => $content) {
            if (!is_string($content)) {
                continue;
            }
            $normalized_path = ltrim(str_replace('\\', '/', (string) $rel_path), '/');
            $checksums[$normalized_path] = hash('sha256', $content);
        }
        ksort($checksums);
        return $checksums;
    }

    /**
     * Verify all per-file SHA-256 checksums declared in manifest['file_checksums'] against a ZipArchive.
     *
     * @param array       $manifest
     * @param \ZipArchive $zip
     * @param string      $root_prefix Optional leading folder prefix inside ZIP
     * @return array [ 'valid' => bool, 'verified_count' => int, 'errors' => array ]
     */
    public function verify_manifest_checksums(array $manifest, \ZipArchive $zip, $root_prefix = '') {
        $errors = [];
        $verified = 0;

        if (empty($manifest['file_checksums']) || !is_array($manifest['file_checksums'])) {
            return [
                'valid'          => true,
                'verified_count' => 0,
                'errors'         => [],
            ];
        }

        $zip_index_map = [];
        for ($i = 0; $i < $zip->numFiles; $i++) {
            $name = str_replace('\\', '/', (string) $zip->getNameIndex($i));
            $zip_index_map[$name] = $i;
        }

        $prefix = $root_prefix ? rtrim(str_replace('\\', '/', $root_prefix), '/') . '/' : '';

        foreach ($manifest['file_checksums'] as $rel_path => $expected_hash) {
            $norm_rel = ltrim(str_replace('\\', '/', (string) $rel_path), '/');
            if ($norm_rel === 'manifest.json') {
                continue;
            }

            if (!is_string($expected_hash) || !preg_match('/^[a-f0-9]{64}$/', strtolower($expected_hash))) {
                $errors[] = sprintf('فرمت هش SHA-256 برای فایل «%s» نامعتبر است.', $norm_rel);
                continue;
            }

            $lookup_idx = null;
            if ($prefix !== '' && isset($zip_index_map[$prefix . $norm_rel])) {
                $lookup_idx = $zip_index_map[$prefix . $norm_rel];
            } elseif (isset($zip_index_map[$norm_rel])) {
                $lookup_idx = $zip_index_map[$norm_rel];
            }

            if ($lookup_idx === null) {
                $errors[] = sprintf('فایل ثبت‌شده در مانیفست «%s» درون آرشیو زیپ یافت نشد.', $norm_rel);
                continue;
            }

            $bytes = $zip->getFromIndex($lookup_idx);
            if ($bytes === false) {
                $errors[] = sprintf('امکان خواندن بایت‌های فایل «%s» برای تطبیق هش وجود ندارد.', $norm_rel);
                continue;
            }

            $actual_hash = hash('sha256', $bytes);
            if (!hash_equals(strtolower($expected_hash), $actual_hash)) {
                $errors[] = sprintf('عدم تطابق امضای SHA-256 در فایل «%s» (احتمال دستکاری یا خرابی بسته).', $norm_rel);
                continue;
            }

            $verified++;
        }

        return [
            'valid'          => empty($errors),
            'verified_count' => $verified,
            'errors'         => $errors,
        ];
    }
}
