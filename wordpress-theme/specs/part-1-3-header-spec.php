<?php
/**
 * The header for SedRazavi Law Firm Theme
 *
 * @package SedRazavi
 * @version 2.8.5
 */
if (!defined('ABSPATH')) exit;
?><!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl" class="scroll-smooth">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="theme-color" content="#0B132B">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-[#F4F6F9] dark:bg-[#070D1E] text-[#0B132B] dark:text-gray-100 antialiased'); ?>>
<?php wp_body_open(); ?>

<!-- اسلایدر متنی عبارات حکیمانه و آیات قرآنی (بالاترین نوار سایت) -->
<div class="bg-[#070D1E] text-white border-b border-[#D4AF37]/30 py-1.5 px-4 text-xs font-serif overflow-hidden">
    <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2 text-[#D4AF37]">
            <span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span class="font-bold">حکمت روز:</span>
            <span class="text-gray-200 text-xs">«اَلْعَدْلُ اَسَاسُ الْمُلْكِ وَ قِوَامُ الرَّعِیَّةِ» — حضرت علی (ع)</span>
        </div>
        <div class="hidden md:flex items-center gap-4 text-[11px] text-gray-300">
            <span>شماره پروانه کانون وکلای مرکز: ۱۸۴۵۲</span>
            <span class="text-[#D4AF37]">|</span>
            <a href="tel:02188888888" class="hover:text-[#D4AF37] font-mono">۰۲۱-۸۸۸۸۸۸۸۸</a>
        </div>
    </div>
</div>

<!-- ناوبری اصلی سایت -->
<header class="sticky top-0 z-50 bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all shadow-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- لوگو و عنوان وکیل -->
        <div class="flex items-center gap-3">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-2.5">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#AA820A] flex items-center justify-center text-white font-bold shadow-md shadow-[#D4AF37]/25">
                    ⚖️
                </div>
                <div class="text-right">
                    <span class="block text-base font-black font-serif text-[#0B132B] dark:text-white">دکتر سیده مریم رضوی</span>
                    <span class="block text-[10px] text-[#AA820A] dark:text-[#D4AF37] font-bold">وکیل پایه یک دادگستری و داور حقوقی</span>
                </div>
            </a>
        </div>

        <!-- فهرست منوی وردپرس -->
        <nav class="hidden lg:flex items-center gap-6 text-xs font-bold text-gray-700 dark:text-gray-300">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="hover:text-[#D4AF37] transition-colors">صفحه نخست</a>
            <a href="#services" class="hover:text-[#D4AF37] transition-colors">دعاوی و حوزه‌ها</a>
            <a href="#about" class="hover:text-[#D4AF37] transition-colors">درباره وکیل</a>
            <a href="#testimonials" class="hover:text-[#D4AF37] transition-colors">روایت پرونده‌ها</a>
            <a href="#articles" class="hover:text-[#D4AF37] transition-colors">یادداشت حقوقی</a>
            <a href="#faq" class="hover:text-[#D4AF37] transition-colors">پرسش و پاسخ</a>
            <a href="#booking" class="hover:text-[#D4AF37] transition-colors">تماس و رزرو</a>
        </nav>

        <!-- اکشن‌های سریع -->
        <div class="flex items-center gap-3">
            <a href="#booking" class="btn-gold px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-[#D4AF37]/25 hover:shadow-lg transition-all">
                رزرو نوبت مشاوره
            </a>
        </div>
    </div>
</header>