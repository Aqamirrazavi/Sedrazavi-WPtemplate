<?php
/**
 * Template Name: خدمات حقوقی (Legal Services)
 * Description: Dedicated page template for all legal services
 *
 * @package SedRazavi
 * @version 2.6.0
 */

if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="py-16 bg-[#F4F6F9] min-h-screen text-[#0B132B]">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
        <div class="text-center max-w-3xl mx-auto space-y-4">
            <span class="px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#AA820A] text-xs font-bold border border-[#D4AF37]/40">حوزه‌های تخصصی وکالت</span>
            <h1 class="text-3xl sm:text-4xl font-black text-[#0B132B]">خدمات جامع حقوقی، کیفری و داوری بین‌المللی</h1>
            <p class="text-gray-600 text-sm sm:text-base leading-relaxed">از تدوین قراردادهای بین‌المللی تا دفاع تخصصی در دیوان عالی کشور و مراجع قضایی سراسر کشور</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
            <?php
            $services = new WP_Query(array('post_type' => 'service', 'posts_per_page' => 12));
            if ($services->have_posts()) :
                while ($services->have_posts()) : $services->the_post();
            ?>
                <div class="rounded-3xl p-6 bg-white border border-gray-200 hover:border-[#D4AF37] shadow-lg transition-all flex flex-col justify-between">
                    <div class="space-y-3">
                        <div class="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] font-bold text-xl">⚖️</div>
                        <h3 class="text-lg font-bold text-[#0B132B]"><?php the_title(); ?></h3>
                        <p class="text-xs text-gray-500 leading-relaxed"><?php echo wp_trim_words(get_the_excerpt(), 25); ?></p>
                    </div>
                    <div class="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                        <a href="<?php the_permalink(); ?>" class="text-xs font-bold text-[#D4AF37] hover:underline">مشاهده جزئیات &larr;</a>
                        <a href="#booking" class="btn-gold px-3.5 py-1.5 rounded-xl text-xs font-bold">رزرو نوبت</a>
                    </div>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            endif;
            ?>
        </div>

        <!-- Contract & Consultation Shortcode Integration -->
        <div class="pt-10 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-8 rounded-3xl bg-[#0B132B] text-white space-y-4 text-right border border-[#D4AF37]/30">
                <span class="text-xs font-bold text-[#D4AF37]">📝 سامانه آنلاین قراردادها</span>
                <h3 class="text-xl font-bold font-serif">ممیزی فوری قرارداد و شروط تعهدآور</h3>
                <p class="text-xs text-gray-300 leading-relaxed">
                    پیش از امضا، ریسک‌های حقوقی و شروط ضمانتی قرارداد خود را در سامانه ممیزی هوشمند ارزیابی کنید.
                </p>
                <a href="<?php echo esc_url(home_url('/contract-audit/')); ?>" class="btn-gold py-2.5 px-6 rounded-xl text-xs font-bold inline-block">
                    ورود به ممیزی قرارداد
                </a>
            </div>

            <div class="p-8 rounded-3xl bg-white border border-gray-200 shadow-lg space-y-4 text-right">
                <span class="text-xs font-bold text-[#AA820A]">📅 مشاوره حضوری یا تلفنی</span>
                <h3 class="text-xl font-bold font-serif text-[#0B132B]">رزرو وقت مشاوره با وکیل پایه یک</h3>
                <p class="text-xs text-gray-500 leading-relaxed">
                    نوبت مشاوره با سرکار خانم دکتر سیده مریم رضوی در دفتر ونک، تهران یا به‌صورت آنلاین.
                </p>
                <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn-gold py-2.5 px-6 rounded-xl text-xs font-bold inline-block">
                    درخواست نوبت مشاوره
                </a>
            </div>
        </div>
    </div>
</div>

<?php get_footer(); ?>