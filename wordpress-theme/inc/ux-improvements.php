<?php
/**
 * SedRazavi UX Enhancements & Client Experience
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!function_exists('sedrazavi_skeleton_placeholder')) {
function sedrazavi_skeleton_placeholder($type = 'card') {
    return '<div class="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-48 w-full" role="status" aria-busy="true" aria-label="' . esc_attr__('در حال بارگذاری...', 'sedrazavi') . '"><span class="screen-reader-text">' . esc_html__('در حال بارگذاری...', 'sedrazavi') . '</span></div>';
}
}
