<?php
namespace UniversalElementorSuite;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Universal Widget Base Class
 *
 * Abstract base class extending Elementor's Widget_Base with common helpers.
 */
abstract class Universal_Widget_Base extends \Elementor\Widget_Base {

    /**
     * Get Widget Categories
     *
     * @return array
     */
    public function get_categories() {
        return [Plugin::CATEGORY_SLUG];
    }

    /**
     * Get Style Dependencies
     *
     * @return array
     */
    public function get_style_depends() {
        return ['uas-widgets-core'];
    }

    /**
     * Get Script Dependencies
     *
     * @return array
     */
    public function get_script_depends() {
        return ['uas-widgets-core'];
    }
}
