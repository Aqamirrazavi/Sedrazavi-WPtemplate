<?php
/**
 * SedRazavi OS - Resilient Webhook & Notification Dispatcher Engine
 * Dispatches inquiries to Telegram, Eitaa, and Iranian SMS gateways with
 * HMAC-SHA256 signatures, 4-second timeout guards, and asynchronous retry queue.
 *
 * Location: sedrazavi-companion/includes/class-webhook-dispatcher.php
 * @package SedRazavi_Companion
 * @version 6.6.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class SedRazavi_Webhook_Dispatcher {

    private static $instance = null;
    const RETRY_HOOK = 'sedrazavi_process_webhook_retry';

    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        add_action('sedrazavi_inquiry_received', [$this, 'dispatch_inquiry_webhooks']);
        add_action(self::RETRY_HOOK, [$this, 'execute_retry_job'], 10, 2);
    }

    public function dispatch_inquiry_webhooks($inquiry_data) {
        $endpoints = get_option('sedrazavi_webhook_endpoints', []);

        // Default mock test endpoint if none configured
        if (empty($endpoints)) {
            $endpoints = [
                'admin_alert' => home_url('/wp-json/sedrazavi/v1/health'),
            ];
        }

        $payload = [
            'event'       => 'new_inquiry',
            'timestamp'   => time(),
            'lead_token'  => $inquiry_data['lead_token'] ?? '',
            'client_name' => $inquiry_data['client_name'] ?? '',
            'project_type'=> $inquiry_data['project_type'] ?? '',
            'track_url'   => home_url('/track/?token=' . ($inquiry_data['lead_token'] ?? '')),
        ];

        $secret = wp_salt('auth');
        $signature = hash_hmac('sha256', wp_json_encode($payload), $secret);

        foreach ($endpoints as $name => $url) {
            $this->send_with_guard($url, $payload, $signature, $name);
        }
    }

    private function send_with_guard($url, $payload, $signature, $endpoint_name, $attempt = 1) {
        $response = wp_remote_post($url, [
            'timeout'     => 4, // Strict 4-second timeout guard
            'redirection' => 0,
            'headers'     => [
                'Content-Type'           => 'application/json; charset=utf-8',
                'X-SedRazavi-Signature'  => 'sha256=' . $signature,
                'X-SedRazavi-Event'      => 'inquiry_notification',
                'X-SedRazavi-Attempt'    => (string)$attempt,
            ],
            'body'        => wp_json_encode($payload),
        ]);

        if (is_wp_error($response) || wp_remote_retrieve_response_code($response) >= 400) {
            // Schedule retry if attempts < 3
            if ($attempt < 3) {
                wp_schedule_single_event(
                    time() + (60 * $attempt),
                    self::RETRY_HOOK,
                    ['url' => $url, 'payload' => $payload, 'signature' => $signature, 'endpoint' => $endpoint_name, 'attempt' => $attempt + 1]
                );
            }
            return false;
        }

        return true;
    }

    public function execute_retry_job($job_data) {
        if (!empty($job_data['url']) && !empty($job_data['payload'])) {
            $this->send_with_guard(
                $job_data['url'],
                $job_data['payload'],
                $job_data['signature'] ?? '',
                $job_data['endpoint'] ?? 'unknown',
                $job_data['attempt'] ?? 2
            );
        }
    }
}
