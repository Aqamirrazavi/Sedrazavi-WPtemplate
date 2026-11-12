<?php
namespace UniversalElementorSuite\Packaging;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Archive Security Validator (P0-03)
 *
 * Enforces Anti-Zip-Slip traversal protection, extension allowlisting,
 * Zip Bomb decompression limits, manifest schema validation, and
 * per-file SHA-256 checksum verification before package extraction.
 *
 * @package Universal_Elementor_Suite
 */
class Archive_Security_Validator {

    /**
     * Verify package archive security before preflight or extraction.
     *
     * @param string                          $zip_filepath
     * @param Package_Manifest_Validator|null $manifest_validator
     * @return array
     */
    public function verify_archive_security($zip_filepath, $manifest_validator = null) {
        if (!file_exists($zip_filepath) || !is_readable($zip_filepath)) {
            return ['safe' => false, 'error' => 'فایل بسته وجود ندارد یا قابل خواندن نیست.'];
        }

        if (!class_exists('\ZipArchive')) {
            return ['safe' => false, 'error' => 'ماژول ZipArchive در تنظیمات PHP سرور فعال نیست.'];
        }

        $zip = new \ZipArchive();
        $open_res = $zip->open($zip_filepath);
        if ($open_res !== true) {
            return ['safe' => false, 'error' => sprintf('قالب فایل فشرده معتبر نیست یا باز نشد (کد: %s).', (string) $open_res)];
        }

        $allowed_extensions = ['php', 'json', 'css', 'js', 'png', 'jpg', 'jpeg', 'svg', 'webp', 'woff', 'woff2', 'ttf', 'eot', 'txt', 'md'];
        $max_entries = 500;
        $max_total_size = 50 * 1024 * 1024; // 50MB
        $total_size = 0;
        $num_files = $zip->numFiles;

        if ($num_files > $max_entries) {
            $zip->close();
            return ['safe' => false, 'error' => sprintf('تعداد فایل‌های داخل بسته (%d) بیش از حد مجاز (%d) است.', $num_files, $max_entries)];
        }

        $manifest_content = null;
        $manifest_root_prefix = '';

        for ($i = 0; $i < $num_files; $i++) {
            $stat = $zip->statIndex($i);
            if (!$stat) {
                continue;
            }

            $filename = $stat['name'];
            $size = $stat['size'];
            $total_size += $size;

            if ($total_size > $max_total_size) {
                $zip->close();
                return ['safe' => false, 'error' => 'حجم مجموع فایل‌های بازشده بیش از حد مجاز (۵۰ مگابایت) است (Zero Zip Bomb protection).'];
            }

            // Anti Zip-Slip: prevent path traversal attacks
            if (
                strpos($filename, '../') !== false ||
                strpos($filename, '..\\') !== false ||
                strpos($filename, '/..') !== false ||
                strpos($filename, '\\..') !== false ||
                strpos($filename, ':/') !== false ||
                strpos($filename, ':\\') !== false ||
                strpos($filename, '/') === 0 ||
                strpos($filename, '\\') === 0
            ) {
                $zip->close();
                return ['safe' => false, 'error' => sprintf('نقض امنیتی: پیمایش مسیر غیرمجاز (Zip Slip Traversal) در ورودی «%s» شناسایی شد.', $filename)];
            }

            // Skip directory entries
            if (substr($filename, -1) === '/' || substr($filename, -1) === '\\') {
                continue;
            }

            // Extension Whitelist check
            $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
            if (!in_array($ext, $allowed_extensions, true)) {
                $zip->close();
                return ['safe' => false, 'error' => sprintf('فرمت فایل غیرمجاز «%s» در بسته شناسایی گردید.', $filename)];
            }

            // Locate manifest.json and detect optional root prefix
            if (basename($filename) === 'manifest.json') {
                $manifest_content = $zip->getFromIndex($i);
                $dir = dirname(str_replace('\\', '/', $filename));
                $manifest_root_prefix = ($dir && $dir !== '.') ? $dir : '';
            }
        }

        if (!$manifest_content) {
            $zip->close();
            return ['safe' => false, 'error' => 'فایل مانیفست استاندارد (manifest.json) در بسته یافت نشد.'];
        }

        $manifest = json_decode($manifest_content, true);
        if (!is_array($manifest) || empty($manifest['id'])) {
            $zip->close();
            return ['safe' => false, 'error' => 'فرمت داده‌های JSON درون manifest.json معتبر نیست.'];
        }

        // Verify per-file SHA-256 checksums embedded in manifest.json when present
        $checksum_verified_count = 0;
        if (!empty($manifest['file_checksums'])) {
            $validator = $manifest_validator instanceof Package_Manifest_Validator
                ? $manifest_validator
                : new Package_Manifest_Validator();

            $cs_res = $validator->verify_manifest_checksums($manifest, $zip, $manifest_root_prefix);
            if (!$cs_res['valid']) {
                $zip->close();
                return [
                    'safe'  => false,
                    'error' => 'تأیید یکپارچگی چک‌سام فایل‌های بسته ناموفق بود: ' . implode(' | ', $cs_res['errors']),
                ];
            }
            $checksum_verified_count = $cs_res['verified_count'];
        }

        $zip->close();

        return [
            'safe'                    => true,
            'manifest'                => $manifest,
            'files_count'             => $num_files,
            'total_size'              => $total_size,
            'checksum_verified_count' => $checksum_verified_count,
        ];
    }
}
