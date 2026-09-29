<?php
/**
 * The template for displaying comments
 *
 * @package SedRazavi
 * @version 2.5.0
 */

if (post_password_required()) {
    return;
}
?>

<div id="comments" class="comments-area mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 space-y-8">

    <?php if (have_comments()) : ?>
        <h3 class="comments-title text-xl font-bold font-serif text-[#0B132B] dark:text-white flex items-center gap-2">
            <span>💬</span>
            <span>
                <?php
                $comment_count = get_comments_number();
                if ($comment_count === '1') {
                    esc_html_e('یک دیدگاه ثبت شده', 'sedrazavi');
                } else {
                    printf(
                        esc_html(_nx('%1$s پرسش و دیدگاه حقوقی', '%1$s پرسش و دیدگاه حقوقی', $comment_count, 'comments title', 'sedrazavi')),
                        number_format_i18n($comment_count)
                    );
                }
                ?>
            </span>
        </h3>

        <ol class="comment-list space-y-4">
            <?php
            wp_list_comments(array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 48,
            ));
            ?>
        </ol>

        <?php the_comments_pagination(array(
            'prev_text' => '‹ قبلی',
            'next_text' => 'بعدی ›',
        )); ?>

    <?php endif; ?>

    <?php
    // If comments are closed and there are comments, let's leave a little note
    if (!comments_open() && get_comments_number() && post_type_supports(get_post_type(), 'comments')) :
    ?>
        <p class="no-comments text-xs text-gray-500 dark:text-gray-400 py-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
            <?php esc_html_e('ارسال دیدگاه برای این یادداشت حقوقی بسته شده است.', 'sedrazavi'); ?>
        </p>
    <?php endif; ?>

    <div class="comment-form-wrapper bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
        <?php
        comment_form(array(
            'title_reply'          => '<span class="text-lg font-bold font-serif text-[#0B132B] dark:text-white">✍️ ' . __('ارسال پرسش یا دیدگاه به وکیل', 'sedrazavi') . '</span>',
            'title_reply_to'       => '<span class="text-sm font-bold text-[#D4AF37]">' . __('پاسخ به %s', 'sedrazavi') . '</span>',
            'cancel_reply_link'    => __('انصراف از پاسخ', 'sedrazavi'),
            'label_submit'         => __('ثبت دیدگاه حقوقی', 'sedrazavi'),
            'class_submit'         => 'btn-gold text-xs sm:text-sm px-6 py-2.5 rounded-xl cursor-pointer',
            'comment_notes_before' => '<p class="text-xs text-gray-500 dark:text-gray-400 mb-4">' . __('دیدگاه شما پس از بازبینی توسط وکیل یا تیم حقوقی منتشر خواهد شد. نشانی ایمیل شما نمایش داده نمی‌شود.', 'sedrazavi') . '</p>',
        ));
        ?>
    </div>

</div>
