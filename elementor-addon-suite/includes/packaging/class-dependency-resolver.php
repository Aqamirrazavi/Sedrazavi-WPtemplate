<?php
namespace UniversalElementorSuite\Packaging;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Package Dependency Graph & Conflict Resolver
 *
 * Resolves package dependency graphs with cycle detection, detects active plugin conflicts,
 * and scans Elementor template JSON AST trees for required widget & service dependencies.
 *
 * @package Universal_Elementor_Suite
 */
class Dependency_Resolver {

    /**
     * Recursive Dependency Resolution Engine with cycle detection.
     *
     * @param string $package_id
     * @param array  $packages
     * @param array  $resolved
     * @param array  $unresolved
     * @return array [ 'success' => bool, 'resolved' => array, 'errors' => array ]
     */
    public function resolve_package_dependencies($package_id, array $packages, array &$resolved = [], array &$unresolved = []) {
        $target = null;
        foreach ($packages as $pkg) {
            if ($pkg['id'] === $package_id) {
                $target = $pkg;
                break;
            }
        }

        if (!$target) {
            return [
                'success'  => false,
                'resolved' => [],
                'errors'   => [sprintf('پکیج "%s" در رجیستری یافت نشد.', $package_id)],
            ];
        }

        $unresolved[$package_id] = true;
        $dependencies = $target['dependencies'] ?? [];

        foreach ($dependencies as $dep_id) {
            if (in_array($dep_id, $resolved, true)) {
                continue;
            }

            if (!empty($unresolved[$dep_id])) {
                return [
                    'success'  => false,
                    'resolved' => [],
                    'errors'   => [sprintf('تشخیص چرخه وابستگی دوطرفه (Circular Dependency): بین %s و %s.', $package_id, $dep_id)],
                ];
            }

            $sub_res = $this->resolve_package_dependencies($dep_id, $packages, $resolved, $unresolved);
            if (!$sub_res['success']) {
                return $sub_res;
            }
        }

        unset($unresolved[$package_id]);
        if (!in_array($package_id, $resolved, true)) {
            $resolved[] = $package_id;
        }

        return [
            'success'  => true,
            'resolved' => $resolved,
            'errors'   => [],
        ];
    }

    /**
     * Check for conflicting packages or active plugins.
     *
     * @param string $package_id
     * @param array  $packages
     * @return array [ 'conflict' => bool, 'messages' => array ]
     */
    public function check_package_conflicts($package_id, array $packages) {
        $target = null;
        foreach ($packages as $pkg) {
            if ($pkg['id'] === $package_id) {
                $target = $pkg;
                break;
            }
        }

        if (!$target) {
            return ['conflict' => true, 'messages' => ['پکیج یافت نشد.']];
        }

        $conflicts = [];
        $conflicts_with = $target['conflicts'] ?? [];

        foreach ($conflicts_with as $conflict_slug) {
            $active = function_exists('is_plugin_active') && is_plugin_active($conflict_slug);
            if ($active || defined(strtoupper(str_replace('-', '_', $conflict_slug)) . '_VERSION')) {
                $conflicts[] = sprintf('تداخل ساختاری: پکیج %s با ماژول فعال %s در تضاد است.', $package_id, $conflict_slug);
            }
        }

        return [
            'conflict' => !empty($conflicts),
            'messages' => $conflicts,
        ];
    }

    /**
     * Recursively collect widgetType values from an Elementor JSON element tree.
     *
     * @param mixed $elements
     * @return array
     */
    public function extract_template_widgets_recursive($elements) {
        $found = [];
        if (!is_array($elements)) {
            return $found;
        }

        foreach ($elements as $el) {
            if (!is_array($el)) {
                continue;
            }
            if (!empty($el['widgetType'])) {
                $found[] = sanitize_key($el['widgetType']);
            }
            if (!empty($el['elements']) && is_array($el['elements'])) {
                $found = array_merge($found, $this->extract_template_widgets_recursive($el['elements']));
            }
        }

        return array_values(array_unique($found));
    }

    /**
     * Scan selected templates and resolve all required uas_* widgets, Theme Builder Bridge, and Query Engine.
     *
     * @param array $widgets
     * @param array $templates
     * @param array $widget_catalog
     * @param bool  $include_bridge
     * @param bool  $include_query
     * @return array
     */
    public function resolve_bundle_dependencies(array $widgets, array $templates, array $widget_catalog, $include_bridge = false, $include_query = false) {
        $template_widget_map = [];
        $auto_added_widgets  = [];
        $normalized_selected = [];

        foreach ($widgets as $w_raw) {
            $normalized_selected[] = strtolower(str_replace(['uas_', 'class-widget-', '.php', '-'], ['', '', '', '_'], $w_raw));
        }

        foreach ($templates as $t_slug) {
            $t_file = UAS_PATH . 'templates/' . $t_slug . '.json';
            if (!file_exists($t_file)) {
                $t_file = UAS_PATH . 'templates/popups/' . $t_slug . '.json';
            }
            if (!file_exists($t_file)) {
                continue;
            }

            $t_json = @json_decode((string) @file_get_contents($t_file), true);
            if (!is_array($t_json) || empty($t_json['content'])) {
                continue;
            }

            $used_types = $this->extract_template_widgets_recursive($t_json['content']);
            $template_widget_map[$t_slug] = $used_types;

            foreach ($used_types as $w_type) {
                if (strpos($w_type, 'theme-') === 0 || in_array($w_type, ['nav-menu', 'archive-posts'], true)) {
                    $include_bridge = true;
                }
                if (strpos($w_type, 'uas_') !== 0) {
                    continue;
                }
                $n_key = strtolower(str_replace(['uas_', '-'], ['', '_'], $w_type));
                if (!in_array($n_key, $normalized_selected, true)) {
                    $normalized_selected[] = $n_key;
                    $widgets[] = $w_type;
                    $auto_added_widgets[] = $w_type;
                }
            }
        }

        $widgets = array_values(array_unique($widgets));
        $auto_added_widgets = array_values(array_unique($auto_added_widgets));

        foreach ($widgets as $w_raw) {
            $normalized_key = strtolower(str_replace(['uas_', 'class-widget-', '.php', '-'], ['', '', '', '_'], $w_raw));
            if (!empty($widget_catalog[$normalized_key]['needs_query'])) {
                $include_query = true;
            }
        }

        return [
            'widgets'             => $widgets,
            'auto_added_widgets'  => $auto_added_widgets,
            'template_widget_map' => $template_widget_map,
            'include_bridge'      => (bool) $include_bridge,
            'include_query'       => (bool) $include_query,
        ];
    }

    /**
     * Validate and resolve selected Gutenberg blocks and CPT schemas for a Site Kit bundle.
     *
     * @param array $selected_blocks
     * @param array $selected_cpts
     * @param array $blocks_catalog
     * @param array $cpts_catalog
     * @return array
     */
    public function resolve_blocks_and_cpts(array $selected_blocks, array $selected_cpts, array $blocks_catalog, array $cpts_catalog) {
        $resolved_blocks = [];
        foreach ($selected_blocks as $raw_block) {
            $slug = strtolower(trim((string) $raw_block));
            $slug = str_replace('sedrazavi/', '', $slug);
            $slug = str_replace('_', '-', $slug);
            if (isset($blocks_catalog[$slug])) {
                $resolved_blocks[] = $slug;
            }
        }
        $resolved_blocks = array_values(array_unique($resolved_blocks));

        $resolved_cpts = [];
        foreach ($selected_cpts as $raw_cpt) {
            $slug = sanitize_key((string) $raw_cpt);
            if (isset($cpts_catalog[$slug])) {
                $resolved_cpts[] = $slug;
            }
        }
        $resolved_cpts = array_values(array_unique($resolved_cpts));

        return [
            'gutenberg_blocks'  => $resolved_blocks,
            'cpt_schemas'       => $resolved_cpts,
            'include_gutenberg' => !empty($resolved_blocks),
            'include_cpts'      => !empty($resolved_cpts),
        ];
    }
}
