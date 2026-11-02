<?php
/**
 * Elementor Widget Plugin Maker - standalone, authenticated staging utility.
 * PHP 7.4+ recommended. Place outside the public web root when possible.
 */
declare(strict_types=1);
session_start();
const MAKER_VERSION = '1.0.0';
const MAX_UPLOAD = 64 * 1024 * 1024;
$base = __DIR__ . DIRECTORY_SEPARATOR . 'ewpm-workspace';
$cfgFile = __DIR__ . DIRECTORY_SEPARATOR . '.ewpm-config.php';

function h($v): string { return htmlspecialchars((string)$v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function json_out($data, int $status=200): void { http_response_code($status); header('Content-Type: application/json; charset=utf-8'); echo json_encode($data, JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES); exit; }
function safe_name(string $s): string { $s = strtolower(trim($s)); $s = preg_replace('/[^a-z0-9_-]+/', '-', $s) ?? ''; $s = trim($s, '-_'); return $s !== '' ? substr($s,0,70) : 'widget'; }
function inside(string $path, string $root): bool { $r=realpath($root); $p=realpath($path); return $r!==false && $p!==false && ($p===$r || strpos($p, $r.DIRECTORY_SEPARATOR)===0); }
function mkdir_safe(string $p): void { if (!is_dir($p) && !mkdir($p,0750,true) && !is_dir($p)) throw new RuntimeException('ساخت پوشه ناموفق بود.'); }
function rrmdir(string $dir): void { if (!is_dir($dir)) return; $it=new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir,FilesystemIterator::SKIP_DOTS),RecursiveIteratorIterator::CHILD_FIRST); foreach($it as $f){$f->isDir()?@rmdir($f->getPathname()):@unlink($f->getPathname());} @rmdir($dir); }
function csrf(): string { if(empty($_SESSION['csrf'])) $_SESSION['csrf']=bin2hex(random_bytes(24)); return $_SESSION['csrf']; }
function require_auth(): void { if(empty($_SESSION['ewpm_auth'])) json_out(['ok'=>false,'error'=>'ابتدا وارد شوید.'],401); }
function token_check(): void { if(!hash_equals($_SESSION['csrf']??'', $_POST['csrf']??'')) json_out(['ok'=>false,'error'=>'درخواست نامعتبر است. صفحه را تازه‌سازی کنید.'],403); }
function scan_widget_php(string $file): array {
    $src=@file_get_contents($file); if($src===false) return [];
    $tokens=token_get_all($src); $out=[]; $ns='';
    for($i=0;$i<count($tokens);$i++){
        $t=$tokens[$i];
        if(is_array($t) && $t[0]===T_NAMESPACE){$ns=''; for($j=$i+1;$j<count($tokens);$j++){ $x=$tokens[$j]; if($x===';'||$x==='{') break; if(is_array($x)&&in_array($x[0],[T_STRING,T_NAME_QUALIFIED,T_NS_SEPARATOR],true)) $ns.=$x[1]; } }
        if(is_array($t) && $t[0]===T_CLASS){
            $prev=null; for($k=$i-1;$k>=0;$k--){if(is_array($tokens[$k])&&$tokens[$k][0]===T_WHITESPACE)continue;$prev=$tokens[$k];break;}
            if(is_array($prev)&&$prev[0]===T_NEW) continue;
            for($j=$i+1;$j<count($tokens);$j++){if(is_array($tokens[$j])&&$tokens[$j][0]===T_STRING){$name=$tokens[$j][1];$fq=trim($ns,'\\');$out[]=['class'=>$name,'fqcn'=>($fq?'\\'.$fq.'\\':'\\').$name,'namespace'=>$fq];break;} if($tokens[$j]==='{')break;}
        }
    }
    return $out;
}
function find_widget_classes(string $dir): array {
    $found=[]; $it=new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir,FilesystemIterator::SKIP_DOTS));
    foreach($it as $f){if(!$f->isFile()||strtolower($f->getExtension())!=='php')continue; $classes=scan_widget_php($f->getPathname()); $src=(string)@file_get_contents($f->getPathname());
        foreach($classes as $c){ if(strpos($src,'Widget_Base')!==false || strpos($src,'\\Elementor\\Widget_Base')!==false || strpos($src,'extends Widget_Base')!==false){$found[]=['file'=>$f->getPathname(),'class'=>$c['class'],'fqcn'=>$c['fqcn'],'namespace'=>$c['namespace']];} }
    } return $found;
}
function copy_tree(string $src,string $dst): void {
    mkdir_safe($dst); $it=new RecursiveIteratorIterator(new RecursiveDirectoryIterator($src,FilesystemIterator::SKIP_DOTS),RecursiveIteratorIterator::SELF_FIRST);
    foreach($it as $f){$rel=substr($f->getPathname(),strlen($src)+1); if(preg_match('~(^|/)\.\.(?:/|$)|(^|/)\.git(?:/|$)~',$rel))continue; $to=$dst.DIRECTORY_SEPARATOR.$rel;
        if($f->isDir()) mkdir_safe($to); else { $ext=strtolower(pathinfo($rel,PATHINFO_EXTENSION)); if(in_array($ext,['php','css','js','json','svg','png','jpg','jpeg','webp','gif','woff','woff2','ttf','otf','txt','md'],true)) {mkdir_safe(dirname($to)); if(!copy($f->getPathname(),$to)) throw new RuntimeException('کپی فایل ناموفق: '.$rel);} }
    }
}
function unique_copy_name(string $src,string $destDir,string $preferred): string {
    $ext=pathinfo($src,PATHINFO_EXTENSION); $stem=safe_name($preferred); $name=$stem.($ext?'.'.$ext:''); $n=2;
    while(file_exists($destDir.DIRECTORY_SEPARATOR.$name)){ $name=$stem.'-'.$n.($ext?'.'.$ext:''); $n++; }
    if(!copy($src,$destDir.DIRECTORY_SEPARATOR.$name)) throw new RuntimeException('کپی فایل ویجت ناموفق بود.'); return $name;
}
function zip_plugin_dir(string $dir,string $zipPath): void {
    if(!class_exists('ZipArchive')) throw new RuntimeException('برای ساخت ZIP افزونه، PHP ZipArchive باید فعال باشد.');
    $zip=new ZipArchive(); if($zip->open($zipPath,ZipArchive::CREATE|ZipArchive::OVERWRITE)!==true) throw new RuntimeException('ساخت فایل ZIP ناموفق بود.');
    $root=realpath($dir); $it=new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir,FilesystemIterator::SKIP_DOTS));
    foreach($it as $f){if(!$f->isFile())continue; $path=$f->getPathname(); $rel=substr($path,strlen($root)+1); $zip->addFile($path,basename($dir).'/'.$rel);}
    $zip->close();
}
function generate_plugin(string $slug,string $title,string $version,string $workspace,bool $archiveOld): array {
    $slug=safe_name($slug); $title=trim($title)?:$slug; $version=preg_match('/^\d+\.\d+(\.\d+)?([.-][A-Za-z0-9.-]+)?$/',$version)?$version:'1.0.0';
    $incoming=$workspace.'/incoming'; $build=$workspace.'/build'; mkdir_safe($incoming); mkdir_safe($build);
    $sourceDirs=[]; foreach(glob($incoming.'/*',GLOB_ONLYDIR)?:[] as $d)$sourceDirs[]=$d;
    if(!$sourceDirs) throw new RuntimeException('ابتدا فایل PHP یا ZIP ویجت را بارگذاری کنید.');
    $dest=$build.'/'.$slug; $oldVersion='';
    if(is_dir($dest)){
        $oldMain=$dest.'/'.$slug.'.php'; if(is_file($oldMain)&&preg_match('/Version:\s*([^\r\n]+)/i',(string)file_get_contents($oldMain),$m))$oldVersion=trim($m[1]);
        if($archiveOld){$archive=$workspace.'/versions/'.$slug.'/'.date('Ymd-His');mkdir_safe(dirname($archive)); if(!rename($dest,$archive))throw new RuntimeException('آرشیو نسخه قبلی ناموفق بود.');}
        else rrmdir($dest);
    }
    mkdir_safe($dest.'/includes'); mkdir_safe($dest.'/widgets'); mkdir_safe($dest.'/assets');
    $widgets=[]; $used=[];
    foreach($sourceDirs as $sd){
        $classes=find_widget_classes($sd);
        if(!$classes){ // retain the package for manual review; do not execute uploaded code
            $pkg=safe_name(basename($sd)); copy_tree($sd,$dest.'/widgets/'.$pkg); continue;
        }
        foreach($classes as $c){$key=$c['fqcn']; if(isset($used[$key]))continue; $used[$key]=true;
            $widgetSlug=safe_name(preg_replace('/([a-z])([A-Z])/','$1-$2',$c['class'])); $folder=$dest.'/widgets/'.$widgetSlug; mkdir_safe($folder);
            $newFile=$widgetSlug.'.php'; if(file_exists($folder.'/'.$newFile))$newFile=$widgetSlug.'-'.substr(hash('sha256',$c['fqcn']),0,6).'.php';
            if(!copy($c['file'],$folder.'/'.$newFile))throw new RuntimeException('انتقال فایل کلاس ناموفق بود.');
            // Copy companion assets from the same package, preserving paths under assets/package.
            $widgets[]=['class'=>$c['fqcn'],'file'=>'widgets/'.$widgetSlug.'/'.$newFile,'slug'=>$widgetSlug];
        }
        // Copy non-PHP companion assets, while avoiding collisions between packages.
        $assetDest=$dest.'/assets/'.safe_name(basename($sd)); copy_tree($sd,$assetDest);
    }
    $autoload="<?php\nif (!defined('ABSPATH')) exit;\n";
    foreach($widgets as $w){$autoload.="require_once __DIR__ . '/../".str_replace("'","",$w['file'])."';\n";}
    $autoload.="\nadd_action('elementor/widgets/register', function(\$widgets_manager) {\n";
    foreach($widgets as $w){$autoload.="    if (class_exists('".str_replace("'","\\'",$w['class'])."')) { \$widgets_manager->register(new \\".ltrim($w['class'],'\\')."()); }\n";}
    $autoload.="});\n";
    file_put_contents($dest.'/includes/widgets-loader.php',$autoload);
    $main="<?php\n/**\n * Plugin Name: ".str_replace(['*/',"\n"],'',$title)."\n * Description: Custom Elementor widgets package.\n * Version: {$version}\n * Requires Plugins: elementor\n * Requires PHP: 7.4\n * Text Domain: {$slug}\n */\nif (!defined('ABSPATH')) exit;\n\nadd_action('plugins_loaded', function(){\n if (!did_action('elementor/loaded')) return;\n require_once __DIR__ . '/includes/widgets-loader.php';\n});\n";
    file_put_contents($dest.'/'.$slug.'.php',$main);
    file_put_contents($dest.'/readme.txt',"{$title}\nVersion: {$version}\n\nGenerated by Elementor Widget Plugin Maker. Review uploaded code before activation.\n");
    return ['slug'=>$slug,'path'=>$dest,'widgets'=>count($widgets),'old_version'=>$oldVersion,'version'=>$version];
}

if(!is_dir($base)) mkdir_safe($base); foreach(['incoming','build','versions','tmp'] as $d)mkdir_safe($base.'/'.$d);
// Deny direct web access to staged source files on Apache-compatible servers.
if(!file_exists($base.'/.htaccess')) @file_put_contents($base.'/.htaccess', "Require all denied\nDeny from all\n");
if(!file_exists($base.'/index.php')) @file_put_contents($base.'/index.php', "<?php http_response_code(404); exit;");
if(!file_exists($cfgFile)){
    if($_SERVER['REQUEST_METHOD']==='POST' && ($_POST['action']??'')==='setup'){
        $p=(string)($_POST['password']??''); if(strlen($p)<12) $setupError='رمز باید حداقل ۱۲ نویسه باشد.'; else {file_put_contents($cfgFile,"<?php return ".var_export(['password_hash'=>password_hash($p,PASSWORD_DEFAULT)],true).";",LOCK_EX); @chmod($cfgFile,0600); header('Location: '.$_SERVER['PHP_SELF']); exit;}
    }
    ?><!doctype html><html lang="fa" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>راه‌اندازی ابزار</title><style>body{font:15px Tahoma;background:#101827;color:#e8eef8;display:grid;place-items:center;min-height:100vh}.box{background:#1b2940;padding:28px;border-radius:18px;width:min(420px,90%)}input,button{box-sizing:border-box;width:100%;padding:13px;margin-top:12px;border:0;border-radius:9px}button{background:#7c5cff;color:white;font-weight:bold}</style><div class="box"><h2>راه‌اندازی Elementor Widget Plugin Maker</h2><p>یک رمز عبور قوی و منحصربه‌فرد بسازید.</p><?php if(!empty($setupError))echo '<p>'.h($setupError).'</p>';?><form method="post"><input type="hidden" name="action" value="setup"><input type="password" name="password" minlength="12" required placeholder="رمز حداقل ۱۲ نویسه"><button>ساخت حساب مدیر</button></form></div></html><?php exit;
}
$config=require $cfgFile;
if(($_POST['action']??'')==='login') {if(password_verify((string)($_POST['password']??''),$config['password_hash'])){session_regenerate_id(true);$_SESSION['ewpm_auth']=true;csrf();header('Location: '.$_SERVER['PHP_SELF']);exit;} $loginError='رمز عبور نادرست است.';}
if(isset($_GET['logout'])){$_SESSION=[];session_destroy();header('Location: '.$_SERVER['PHP_SELF']);exit;}
if(empty($_SESSION['ewpm_auth'])){?><!doctype html><html lang="fa" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>ورود</title><style>body{font:15px Tahoma;background:#101827;color:#e8eef8;display:grid;place-items:center;min-height:100vh}.box{background:#1b2940;padding:28px;border-radius:18px;width:min(420px,90%)}input,button{box-sizing:border-box;width:100%;padding:13px;margin-top:12px;border:0;border-radius:9px}button{background:#7c5cff;color:white}</style><div class="box"><h2>ورود به ابزار سازنده افزونه</h2><?php if(!empty($loginError))echo '<p>'.h($loginError).'</p>';?><form method="post"><input type="hidden" name="action" value="login"><input type="password" name="password" required placeholder="رمز عبور"><button>ورود</button></form></div></html><?php exit;}

if(isset($_GET['download'])) {
    require_auth(); $rel=str_replace(['..','\\'],['','/'],(string)$_GET['download']); $file=$base.'/'.$rel;
    if(!inside($file,$base)||!is_file($file)||strtolower(pathinfo($file,PATHINFO_EXTENSION))!=='zip'){http_response_code(404);exit('Not found');}
    header('Content-Type: application/zip'); header('Content-Length: '.filesize($file)); header('Content-Disposition: attachment; filename=\"'.basename($file).'\"'); readfile($file); exit;
}
if($_SERVER['REQUEST_METHOD']==='POST' && isset($_POST['api'])){
    token_check(); $action=(string)$_POST['api'];
    try{
        if($action==='upload'){
            if(empty($_FILES['files']))throw new RuntimeException('فایلی انتخاب نشده است.'); $done=[];
            foreach($_FILES['files']['name'] as $i=>$name){$tmp=$_FILES['files']['tmp_name'][$i]??'';$err=$_FILES['files']['error'][$i]??UPLOAD_ERR_NO_FILE;$size=(int)($_FILES['files']['size'][$i]??0); if($err!==UPLOAD_ERR_OK||$size>MAX_UPLOAD)throw new RuntimeException('خطای بارگذاری یا حجم بیش از ۶۴ مگابایت.');
                $ext=strtolower(pathinfo($name,PATHINFO_EXTENSION)); if(!in_array($ext,['php','zip','css','js','json','txt','svg','png','jpg','jpeg','webp','woff','woff2'],true))throw new RuntimeException('پسوند فایل مجاز نیست: '.$name);
                $id=date('YmdHis').'-'.bin2hex(random_bytes(4)); $target=$base.'/incoming/'.$id; mkdir_safe($target);
                if($ext==='zip'){
                    if(!class_exists('ZipArchive'))throw new RuntimeException('افزونه PHP ZipArchive فعال نیست.'); $z=new ZipArchive(); if($z->open($tmp)!==true)throw new RuntimeException('ZIP معتبر نیست.');
                    for($n=0;$n<$z->numFiles;$n++){ $entry=$z->getNameIndex($n); if(!$entry||strpos($entry,'..')!==false||strpos($entry,'/')===0||strpos($entry,"\\")!==false)continue; $z->extractTo($target,[$entry]); } $z->close();
                } else {if(!move_uploaded_file($tmp,$target.'/'.basename($name)))throw new RuntimeException('ذخیره فایل ناموفق بود.');}
                $done[]=$name;
            } json_out(['ok'=>true,'message'=>'بارگذاری انجام شد.','files'=>$done]);
        }
        if($action==='build'){$r=generate_plugin((string)$_POST['slug'],(string)$_POST['title'],(string)$_POST['version'],$base,($_POST['archive']??'1')==='1'); $zipRel='build/'.$r['slug'].'.zip'; zip_plugin_dir($r['path'],$base.'/'.$zipRel); $r['zip']=$zipRel; $r['download']='?download='.rawurlencode($zipRel); json_out(['ok'=>true,'result'=>$r]);}
        if($action==='clear') {foreach(glob($base.'/incoming/*')?:[] as $p) is_dir($p)?rrmdir($p):@unlink($p);json_out(['ok'=>true,'message'=>'فایل‌های ورودی پاک شدند.']);}
        if($action==='delete'){$rel=(string)($_POST['path']??'');$p=$base.'/'.str_replace(['..','\\'],['','/'],$rel);if(!inside($p,$base)||$p===$base)throw new RuntimeException('مسیر مجاز نیست.');is_dir($p)?rrmdir($p):@unlink($p);json_out(['ok'=>true,'message'=>'حذف شد.']);}
        if($action==='rename'){$rel=(string)($_POST['path']??'');$new=safe_name((string)($_POST['newname']??''));$p=$base.'/'.str_replace(['..','\\'],['','/'],$rel);if(!inside($p,$base)||$p===$base||!file_exists($p))throw new RuntimeException('مسیر نامعتبر است.');$to=dirname($p).'/'.$new.(is_file($p)?'.'.pathinfo($p,PATHINFO_EXTENSION):'');if(file_exists($to)||!rename($p,$to))throw new RuntimeException('تغییر نام انجام نشد.');json_out(['ok'=>true,'message'=>'نام تغییر کرد.']);}
        throw new RuntimeException('عملیات ناشناخته است.');
    }catch(Throwable $e){json_out(['ok'=>false,'error'=>$e->getMessage()],400);}
}
function tree_list(string $root,string $rel=''): array {$out=[];$dir=$root.($rel?'/'.$rel:''); if(!inside($dir,$root))return $out; foreach(scandir($dir)?:[] as $n){if($n==='.'||$n==='..'||$n[0]==='.')continue;$p=$dir.'/'.$n;$r=($rel?$rel.'/':'').$n;$out[]=['name'=>$n,'path'=>$r,'dir'=>is_dir($p),'size'=>is_file($p)?filesize($p):0];}return $out;}
$items=tree_list($base);
?><!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Elementor Widget Plugin Maker</title><style>
:root{--bg:#0b1220;--panel:#131f33;--panel2:#1a2942;--line:#2a3a55;--text:#edf3ff;--muted:#9fb0c9;--accent:#8b72ff;--cyan:#4ed6d0}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 85% 0,#1d2850 0,transparent 32%),var(--bg);color:var(--text);font:14px Tahoma,Arial}.wrap{max-width:1250px;margin:auto;padding:22px}.top{display:flex;justify-content:space-between;align-items:center;gap:15px;margin-bottom:20px}.brand{display:flex;gap:13px;align-items:center}.logo{width:48px;height:48px;border-radius:15px;background:linear-gradient(135deg,#927bff,#40d6ce);display:grid;place-items:center;font-size:23px;color:#101827;font-weight:bold}.muted{color:var(--muted)}.layout{display:grid;grid-template-columns:1.2fr .8fr;gap:16px}.panel{background:linear-gradient(160deg,var(--panel2),var(--panel));border:1px solid var(--line);border-radius:18px;padding:20px;box-shadow:0 14px 40px #0003}.panel h2{font-size:17px;margin:0 0 15px}.tabs{display:flex;gap:8px;margin:12px 0 18px}.tab{padding:10px 15px;border-radius:10px;background:#202e49;color:#cbd7eb;border:1px solid var(--line);cursor:pointer}.tab.active{background:var(--accent);color:white}.field{margin:12px 0}.field label{display:block;color:#bdcbe0;margin-bottom:7px}.field input{width:100%;padding:12px;border-radius:10px;background:#0c1728;border:1px solid var(--line);color:white}.btn{border:0;border-radius:10px;padding:11px 15px;background:var(--accent);color:white;font-weight:bold;cursor:pointer}.btn.secondary{background:#273854}.btn.danger{background:#9f405b}.row{display:flex;gap:9px;flex-wrap:wrap;align-items:center}.drop{border:1px dashed #61749a;border-radius:14px;padding:22px;text-align:center;background:#0c1728}.drop input{max-width:100%;margin-top:12px}.notice{padding:12px;border-radius:10px;background:#102e38;color:#a9eeeb;margin-top:12px;line-height:1.8}.warning{background:#392b20;color:#ffd7a3}.list{display:grid;gap:8px}.file{display:flex;justify-content:space-between;align-items:center;padding:10px;background:#0c1728;border:1px solid var(--line);border-radius:10px;gap:10px}.file small{color:var(--muted)}.hidden{display:none}.progress{height:8px;background:#273854;border-radius:20px;overflow:hidden;margin-top:12px}.progress i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--accent),var(--cyan))}@media(max-width:800px){.layout{grid-template-columns:1fr}.top{align-items:flex-start;flex-direction:column}}
</style></head><body><div class="wrap"><header class="top"><div class="brand"><div class="logo">W</div><div><h1 style="font-size:20px;margin:0 0 6px">Elementor Widget Plugin Maker</h1><div class="muted">سازنده و مدیر بسته‌های ویجت المنتور · نسخه <?php echo MAKER_VERSION;?></div></div></div><a class="btn secondary" href="?logout=1" style="text-decoration:none">خروج امن</a></header>
<div class="tabs"><button class="tab active" data-tab="maker">ساخت افزونه</button><button class="tab" data-tab="files">مدیریت فایل‌ها</button><button class="tab" data-tab="guide">راهنما</button></div>
<section id="maker" class="tabpane"><div class="layout"><div class="panel"><h2>۱. افزودن فایل‌های ویجت</h2><p class="muted">فایل PHP یا ZIP شامل ویجت و دارایی‌های آن را بارگذاری کنید. کد بارگذاری‌شده اجرا نمی‌شود؛ فقط در بستهٔ خروجی قرار می‌گیرد.</p><form id="uploadForm"><input type="hidden" name="csrf" value="<?php echo h(csrf());?>"><input type="hidden" name="api" value="upload"><div class="drop"><div style="font-size:30px">⇧</div><strong>فایل‌ها را انتخاب کنید</strong><div class="muted">ZIP / PHP / CSS / JS / JSON / SVG / فونت و تصویر · حداکثر ۶۴ مگابایت برای هر فایل</div><input type="file" name="files[]" multiple required></div><div class="progress"><i id="bar"></i></div><p id="uploadStatus" class="muted"></p><button class="btn" type="submit">بارگذاری فایل‌ها</button></form><div class="notice">برای ZIP، مسیرهای مشکوک و تلاش برای خروج از پوشه هنگام استخراج رد می‌شوند. پس از بارگذاری، فایل‌ها را بررسی و سپس افزونه را بسازید.</div></div>
<div class="panel"><h2>۲. مشخصات افزونه</h2><form id="buildForm"><input type="hidden" name="csrf" value="<?php echo h(csrf());?>"><input type="hidden" name="api" value="build"><div class="field"><label>نام افزونه</label><input name="title" value="افزونه ویجت‌های اختصاصی من" required></div><div class="field"><label>شناسه پوشه (slug انگلیسی)</label><input name="slug" value="my-elementor-widgets" pattern="[A-Za-z0-9_-]+" required></div><div class="field"><label>نسخه</label><input name="version" value="1.0.0" required></div><div class="field"><label><input type="checkbox" name="archive" value="1" checked style="width:auto"> قبل از جایگزینی، نسخه قبلی آرشیو شود</label></div><button class="btn" type="submit">ساخت / به‌روزرسانی افزونه</button></form><div id="buildStatus" class="notice hidden"></div></div></div></section>
<section id="files" class="tabpane hidden"><div class="panel"><h2>مدیریت فایل‌های فضای کاری</h2><p class="muted">دسترسی این فایل‌منیجر فقط به پوشه ewpm-workspace محدود است؛ فایل‌های اصلی وردپرس یا سایر مسیرهای سرور قابل مرور نیستند.</p><div class="list"><?php foreach($items as $it):?><div class="file"><div><strong><?php echo h($it['name']);?></strong><br><small><?php echo $it['dir']?'پوشه':number_format((int)$it['size']).' بایت';?></small></div><small><?php echo h($it['path']);?></small></div><?php endforeach;?></div><p class="muted">فایل‌های ورودی: incoming · افزونه‌های ساخته‌شده: build · نسخه‌های آرشیوشده: versions</p><button class="btn danger" id="clearIncoming">پاک‌کردن فایل‌های ورودی</button></div></section>
<section id="guide" class="tabpane hidden"><div class="panel"><h2>راهنمای نصب افزونه ساخته‌شده در وردپرس</h2><ol style="line-height:2.1"><li>یک ZIP شامل فایل‌های ویجت یا فایل PHP ویجت بارگذاری کنید.</li><li>نام و نسخه افزونه را تعیین و روی «ساخت افزونه» بزنید.</li><li>خروجی در پوشه <code>ewpm-workspace/build/شناسه-افزونه</code> ساخته می‌شود.</li><li>پوشه خروجی را ZIP کنید و از پیشخوان وردپرس ← افزونه‌ها ← افزودن افزونه ← بارگذاری افزونه نصب کنید.</li><li>پس از فعال‌سازی Elementor باید فعال باشد. ویجت‌ها در ویرایشگر المنتور ظاهر می‌شوند.</li></ol><div class="notice warning"><b>مهم:</b> این نسخه ابزار، ساختار اولیه و بارگذار را تولید می‌کند؛ همه قالب‌های کدنویسی ویجت‌ها را نمی‌توان با قطعیت خودکار تشخیص داد. قبل از نصب، کدها را بررسی کنید و روی سایت آزمایشی تست بگیرید. کدهای PHP مخرب یا ناشناس را فعال نکنید.</div><p>این ابزار فایل‌های ورودی را اجرا نمی‌کند و قفل لایسنس یا کنترل دسترسی کدهای ثالث را دور نمی‌زند. ویجت‌های دارای مجوز باید با کلید معتبر خودشان استفاده شوند.</p></div></section>
</div><script>
const csrf=document.querySelector('[name=csrf]').value;document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('.tabpane').forEach(x=>x.classList.toggle('hidden',x.id!==b.dataset.tab));}));
async function send(form){const fd=new FormData(form);const r=await fetch(location.href,{method:'POST',body:fd});return await r.json();}
document.getElementById('uploadForm').addEventListener('submit',async e=>{e.preventDefault();const s=document.getElementById('uploadStatus'),bar=document.getElementById('bar');s.textContent='در حال بارگذاری...';const xhr=new XMLHttpRequest();xhr.open('POST',location.href);xhr.upload.onprogress=e=>{if(e.lengthComputable)bar.style.width=(e.loaded/e.total*100)+'%'};xhr.onload=()=>{try{const d=JSON.parse(xhr.responseText);s.textContent=d.ok?d.message+' ('+d.files.join(', ')+')':d.error;if(d.ok)setTimeout(()=>location.reload(),900)}catch(_){s.textContent='پاسخ سرور قابل خواندن نیست.'}};xhr.onerror=()=>s.textContent='خطای ارتباط';xhr.send(new FormData(e.target));});
document.getElementById('buildForm').addEventListener('submit',async e=>{e.preventDefault();const box=document.getElementById('buildStatus');box.classList.remove('hidden');box.textContent='در حال ساخت افزونه...';try{const d=await send(e.target);if(d.ok){box.innerHTML='ساخت انجام شد. پوشه: <code>'+d.result.path+'</code> | تعداد ویجت‌های شناسایی‌شده: '+d.result.widgets+' | نسخه: '+d.result.version+(d.result.old_version?' | نسخه قبلی: '+d.result.old_version:'')+'<br><a class=\"btn\" href=\"'+d.result.download+'\">دانلود ZIP افزونه</a>';}else{box.textContent=d.error;}}catch(_){box.textContent='خطای ارتباط با سرور.'}});
document.getElementById('clearIncoming').addEventListener('click',async()=>{if(!confirm('تمام فایل‌های ورودی پاک شوند؟'))return;const fd=new FormData();fd.set('csrf',csrf);fd.set('api','clear');const d=await (await fetch(location.href,{method:'POST',body:fd})).json();alert(d.message||d.error);if(d.ok)location.reload();});
</script></body></html>
