<?php
/**
 * Template Name: صندوق پیام‌ها و ایمیل‌های ورودی (Front-end Email Manager)
 * Description: Front-end inbox for contact form messages & consultation requests
 *
 * @package SedRazavi
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!is_user_logged_in() || !current_user_can('edit_others_posts')) {
    auth_redirect();
    exit;
}

get_header();

// Query incoming message logs
$messages_query = new WP_Query(array(
    'post_type'      => 'sedrazavi_message',
    'post_status'    => 'publish',
    'posts_per_page' => 20,
));
?>

<div class="py-12 bg-[#F4F6F9] dark:bg-[#070D1E] min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 shadow-sm mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-3">
                    <span>📬</span>
                    <span><?php esc_html_e('صندوق پیام‌ها و درخواست‌های مشاوره موکلین', 'sedrazavi'); ?></span>
                </h1>
                <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    <?php esc_html_e('مشاهده، مدیریت وضعیت و پاسخ مستقیم از طریق سرور ایمیل امن وکیل.', 'sedrazavi'); ?>
                </p>
            </div>
            <div class="text-xs px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-bold">
                ● سرور پیام‌رسان فعال
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- Message List (7 Cols) -->
            <div class="lg:col-span-7 space-y-4">
                <?php if ($messages_query->have_posts()) : ?>
                    <?php while ($messages_query->have_posts()) : $messages_query->the_post(); 
                        $msg_id = get_the_ID();
                        $sender_name = get_post_meta($msg_id, '_sedrazavi_sender_name', true) ?: get_the_title();
                        $sender_email = get_post_meta($msg_id, '_sedrazavi_sender_email', true);
                        $sender_phone = get_post_meta($msg_id, '_sedrazavi_sender_phone', true);
                        $msg_status = get_post_meta($msg_id, '_sedrazavi_msg_status', true) ?: 'unread';
                    ?>
                        <div class="bg-white dark:bg-[#0B132B] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm space-y-3 cursor-pointer hover:border-[#D4AF37]" onclick="sedrazaviSelectMsg('<?php echo esc_js($sender_name); ?>', '<?php echo esc_js($sender_email); ?>', '<?php echo esc_js(get_the_title()); ?>')">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <span class="w-3 h-3 rounded-full <?php echo $msg_status === 'unread' ? 'bg-amber-500 animate-pulse' : 'bg-gray-400'; ?>"></span>
                                    <span class="font-bold text-sm text-[#0B132B] dark:text-white"><?php echo esc_html($sender_name); ?></span>
                                </div>
                                <span class="text-xs text-gray-400"><?php echo get_the_date('j F Y - H:i'); ?></span>
                            </div>

                            <p class="text-sm font-semibold text-gray-800 dark:text-gray-200"><?php the_title(); ?></p>
                            <p class="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2"><?php echo get_the_content(); ?></p>

                            <div class="text-xs text-gray-400 flex items-center gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                                <span>📱 <?php echo esc_html($sender_phone); ?></span>
                                <span dir="ltr">✉️ <?php echo esc_html($sender_email); ?></span>
                            </div>
                        </div>
                    <?php endwhile; wp_reset_postdata(); ?>
                <?php else : ?>
                    <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-12 text-center text-gray-500">
                        <p><?php esc_html_e('هیچ پیامی در صندوق ورودی وجود ندارد.', 'sedrazavi'); ?></p>
                    </div>
                <?php endif; ?>
            </div>

            <!-- Quick Reply Composer (5 Cols) -->
            <div class="lg:col-span-5">
                <div class="bg-white dark:bg-[#0B132B] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg sticky top-28 space-y-4">
                    <h3 class="font-bold font-serif text-[#0B132B] dark:text-white pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                        <span>✍️</span>
                        <span><?php esc_html_e('ارسال پاسخ رسمی به موکل', 'sedrazavi'); ?></span>
                    </h3>

                    <form id="front-email-reply-form" class="space-y-3">
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">گیرنده:</label>
                            <input type="text" id="reply-to" readonly class="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-mono text-gray-600 dark:text-gray-300">
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">موضوع پاسخ:</label>
                            <input type="text" id="reply-subject" class="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs font-medium focus:border-[#D4AF37]">
                        </div>
                        <div>
                            <label class="block text-xs text-gray-500 mb-1">متن پاسخ رسمی:</label>
                            <textarea id="reply-body" rows="6" placeholder="متن پاسخ وکیل یا منشی حقوقی..." class="w-full px-3 py-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xs leading-relaxed focus:border-[#D4AF37]"></textarea>
                        </div>
                        <button type="button" onclick="sedrazaviSendEmailReply()" class="btn-gold w-full text-xs py-2.5">
                            <span>ارسال پاسخ از طریق سرور امن</span>
                        </button>
                    </form>
                </div>
            </div>

        </div>

    </div>
</div>

<script>
function sedrazaviSelectMsg(name, email, subject) {
    document.getElementById('reply-to').value = name + ' <' + email + '>';
    document.getElementById('reply-subject').value = 'پاسخ به: ' + subject;
}

function sedrazaviSendEmailReply() {
    var to = document.getElementById('reply-to').value;
    var subject = document.getElementById('reply-subject').value;
    var body = document.getElementById('reply-body').value;

    if (!to || !body) {
        alert('لطفاً ابتدا یک پیام را انتخاب کرده و متن پاسخ را درج نمایید.');
        return;
    }

    jQuery.post(sedrazavi_ajax_obj.ajax_url, {
        action: 'sedrazavi_send_reply_email',
        security: sedrazavi_ajax_obj.nonce,
        to: to,
        subject: subject,
        body: body
    }, function(res) {
        if (res.success) {
            alert('پاسخ با موفقیت برای موکل ارسال شد.');
            document.getElementById('reply-body').value = '';
        } else {
            alert(res.data.message || 'خطا در ارسال ایمیل');
        }
    });
}
</script>

<?php get_footer(); ?>
