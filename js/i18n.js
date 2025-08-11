/* js/i18n.js
   Drop-in translations for your existing index.html (RD Navbar template).
   Make sure this file is included AFTER js/script.js in the page.
*/
(function ($) {
  "use strict";

  // helper: convert western digits to arabic-indic digits
  function toArabicDigits(s) {
    return s.replace(/\d/g, function (d) {
      return ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"][+d];
    });
  }

  const translations = {
    en: {
      // small/used keys (we map them to selectors below)
      "meta.title": "Home",
      "preloader.loading": "Loading...",
      "nav.home": "Home",
      "nav.about": "About",
      "nav.who": "Who We Are",
      "nav.gallery": "Gallery",
      "nav.machines": "Machines",
      "nav.cnc": "CNC",
      "nav.edgeband": "Edge Band",
      "nav.material": "Material",
      "nav.contacts": "Contacts",
      "label.tel": "tel:",
      "hero.brand_html": "WoodCut <span style='color:#FF7F2F'>Pro</span>",
      "hero.subtitle": "Furniture Manufacturing",
      "about.title": "About",
      "about.text": "At WoodCut Pro, we deliver smart, integrated solutions in furniture manufacturing — combining CNC precision, automated edge finishing, concealed assembly systems, and integrated connections — to create sleek, functional designs that serve specialized spaces with style and efficiency.",
      "who.title": "Who We Are",
      "who.text": "At WoodCut Pro, we craft furniture tailored to every space. We provide comprehensive solutions executed with precision, blending functionality with aesthetics, from homes and offices to hotels, retail spaces, and medical facilities, all customized to each client's vision.",
      "cnc.title": "CNC - Computer Numerical Control",
      "cnc.text": "This smart system delivers exceptional precision and efficiency, tailored for high-speed production lines. It handles complex tasks like panel cutting, drilling for runners, hinges, handles, adjustable shelves, and concealed connectors such as Mini Fix and wooden dowels — all with unmatched accuracy.",
      "edge.title": "Edge Banding Machine",
      "edge.text": "A fully automated edge finishing solution using PVC or ABS tapes, designed to deliver premium-quality results. From precise trimming and rounding to final polishing, the machine transforms edge banding into a refined process.",
      "material.title": "Material",
      "material.post1.title": "Mini Fix",
      "material.post1.text": "A smart, widely used assembly system in modern furniture manufacturing. It ensures strong, hidden joints for clean aesthetics — ideal for kitchens, cabinets, and office furniture.",
      "material.post2.title": "Wooden Dowel",
      "material.post2.text": "An invisible fastening method that ensures clean, solid joints — ideal for assembling cabinets, drawers, and fixed shelves.",
      "material.post3.title": "Furniture Screw",
      "material.post3.text": "Used to securely assemble and connect cabinets with precision, allowing safe disassembly and reassembly without compromising aesthetics.",
      "material.post4.title": "Metal Shelf Studs",
      "material.post4.text": "High-quality metal studs engineered to provide reliable, secure support and a refined finish for shelving units.",
      "contacts.title": "Contacts",
      "contacts.address": "Amman - Jordan",
      "contacts.telLabel": "Tel:",
      "contacts.emailLabel": "E-Mail:",
      "footer.privacy": "Privacy Policy",
      "footer.copy_html": "© <span class='copyright-year'></span> WoodCut Pro. All rights reserved.",
      "brand.logoAlt": "WoodCut Pro logo"
    },
    ar: {
      "meta.title": "الرئيسية",
      "preloader.loading": "جارٍ التحميل...",
      "nav.home": "الرئيسية",
      "nav.about": "من نحن",
      "nav.who": "من نحن",
      "nav.gallery": "المعرض",
      "nav.machines": "الآلات",
      "nav.cnc": "CNC",
      "nav.edgeband": "تشطيب الحواف",
      "nav.material": "الخام",
      "nav.contacts": "اتصل بنا",
      "label.tel": "هاتف:",
      "hero.brand_html": "وود كت <span style='color:#FF7F2F'>برو</span>",
      "hero.subtitle": "تصنيع الأثاث",
      "about.title": "من نحن",
      "about.text": "في وود كت برو، نقدم حلولاً ذكية ومتكاملة في تصنيع الأثاث — نجمع بين دقة CNC وتشطيب الحواف الآلي وأنظمة التجميع المخفية والاتصالات المدمجة — لإنشاء تصاميم أنيقة وعملية تلبي احتياجات المساحات بكفاءة وأناقة.",
      "who.title": "من نحن",
      "who.text": "في وود كت برو، نصنع أثاثًا مخصصًا لكل مساحة. نوفر حلولًا متكاملة تُنفَّذ بدقة تمزج الوظيفة بالجمال، من المنازل والمكاتب إلى الفنادق والمتاجر والمؤسسات الطبية.",
      "cnc.title": "CNC - التحكم الرقمي بالحاسوب",
      "cnc.text": "يوفر هذا النظام دقة وكفاءة استثنائية، مصمم لخطوط الإنتاج عالية السرعة. يتعامل مع مهام معقدة مثل قطع الألواح، حفر المواضع للدرزات والمفصلات والمقابض والرفوف القابلة للتعديل والموصلات المخفية مثل Mini Fix والأوتاد الخشبية.",
      "edge.title": "آلة تشطيب الحواف",
      "edge.text": "حل تشطيب حواف آلي بالكامل باستخدام أشرطة PVC أو ABS لتقديم نتائج عالية الجودة من التشذيب إلى التلميع النهائي، مما يمنح كل قطعة متانة ومظهرًا أنيقًا.",
      "material.title": "الخامات",
      "material.post1.title": "Mini Fix",
      "material.post1.text": "نظام تجميع ذكي وشائع في تصنيع الأثاث الحديث؛ يوفر وصلات قوية ومخفية لمظهر نظيف ومثالي للمطابخ والخزائن والأثاث المكتبي.",
      "material.post2.title": "وتد خشبي",
      "material.post2.text": "طريقة تثبيت مخفية تضمن وصلات متينة ونظيفة — مناسبة لتجميع الخزائن والأدراج والرفوف الثابتة.",
      "material.post3.title": "برغي أثاث",
      "material.post3.text": "يُستخدم لتجميع الوحدات بدقة ويتيح فكًا وتركيبًا آمنًا دون التأثير على المظهر النهائي.",
      "material.post4.title": "مشابك رفوف معدنية",
      "material.post4.text": "مشابك معدنية عالية الجودة مصممة لتوفير دعم موثوق ومظهر أنيق لرفوف التخزين.",
      "contacts.title": "اتصل بنا",
      "contacts.address": "عمان - الأردن",
      "contacts.telLabel": "هاتف:",
      "contacts.emailLabel": "البريد الإلكتروني:",
      "footer.privacy": "سياسة الخصوصية",
      "footer.copy_html": "© <span class='copyright-year'></span> وود كت برو. جميع الحقوق محفوظة.",
      "brand.logoAlt": "شعار وود كت برو"
    }
  };

  // small helper to set element text or html
  function setText($el, txt, htmlMode) {
    if (!$el || !$el.length) return;
    if (htmlMode) $el.html(txt);
    else $el.text(txt);
  }

  function applyLang(lang) {
    // set html lang, body dir
    $('html').attr('lang', lang);
    $('body').attr('dir', lang === 'ar' ? 'rtl' : 'ltr');

    const t = translations[lang] || translations.en;

    // title
    $('title').text(t['meta.title']);

    // preloader
    setText($('.preloader p'), t['preloader.loading']);

    // navbar: common href-based anchors
    $('.rd-navbar-nav a[href="#home"]').first().text(t['nav.home']);
    $('.rd-navbar-nav a[href="#about"]').first().text(t['nav.about']);
    $('.rd-navbar-nav a[href="#who"]').first().text(t['nav.who']);
    $('.rd-navbar-nav a[href="#gallery"]').first().text(t['nav.gallery']);

    // Machines top-level: find first li with a dropdown (child ul)
    var $machinesLi = $('.rd-navbar-nav > li').filter(function () {
      return $(this).children('ul').length > 0;
    }).first();
    if ($machinesLi && $machinesLi.length) {
      $machinesLi.children('a').first().text(t['nav.machines']);
      // dropdown items
      $machinesLi.find('ul.rd-navbar-dropdown a[href="#CNC"]').first().text(t['nav.cnc']);
      $machinesLi.find('ul.rd-navbar-dropdown a[href="#edge-band"]').first().text(t['nav.edgeband']);
    } else {
      // fallback: anchors by href
      $('.rd-navbar-nav a[href="#CNC"]').first().text(t['nav.cnc']);
      $('.rd-navbar-nav a[href="#edge-band"]').first().text(t['nav.edgeband']);
    }

    $('.rd-navbar-nav a[href="#service"]').first().text(t['nav.material']);
    $('.rd-navbar-nav a[href="#contacts"]').first().text(t['nav.contacts']);

    // rd-navbar-contact (preserve phone anchor, replace label text)
    var $navContact = $('.rd-navbar-contact p');
    if ($navContact.length) {
      var $phone = $navContact.find('a').first();
      var phoneHtml = $phone.length ? $phone.prop('outerHTML') : '';
      $navContact.html(t['label.tel'] + ' ' + phoneHtml);
    }

    // hero: preserve the fancy span structure by replacing inner html of .word1
    var $heroWord = $('#home .intro-text .word1').first();
    if ($heroWord.length) {
      setText($heroWord, t['hero.brand_html'], true);
      // the subtitle paragraph:
      setText($('#home .intro-text p.small'), t['hero.subtitle'], false);
    }

    // About
    setText($('#about h2').first(), t['about.title'], false);
    setText($('#about .shady-box p.lead').first(), t['about.text'], false);

    // Who We Are
    setText($('#who h2').first(), t['who.title'], false);
    setText($('#who .shady-box p').first(), t['who.text'], false);

    // CNC section
    setText($('#CNC h2').first(), t['cnc.title'], false);
    // pick the first paragraph in CNC section (be conservative)
    setText($('#CNC .bg-cell p').first(), t['cnc.text'], false);

    // Edge Band
    setText($('#edge-band h2').first(), t['edge.title'], false);
    setText($('#edge-band .bg-cell p').first(), t['edge.text'], false);

    // Material / services section title
    setText($('#service h2').first(), t['material.title'], false);

    // service posts: map by order (post1..post4)
    $('.post-service').each(function (i, el) {
      var idx = i + 1;
      var titleKey = 'material.post' + idx + '.title';
      var textKey = 'material.post' + idx + '.text';
      var $a = $(el).find('h6 a').first();
      var $p = $(el).find('p').first();
      if ($a.length && t[titleKey]) $a.text(t[titleKey]);
      if ($p.length && t[textKey]) $p.text(t[textKey]);
    });

    // Contacts box (left shady-box)
    var $contactsBox = $('#contacts .shady-box').first();
    if ($contactsBox.length) {
      setText($contactsBox.find('h2').first(), t['contacts.title'], false);
      // first small paragraph is address
      setText($contactsBox.find('> .offset-top-28 p').first() || $contactsBox.find('p').first(), t['contacts.address'], false);

      // Tel h6 (find h6 containing a tel link)
      var $telH6 = $contactsBox.find('h6').filter(function () {
        return $(this).find('a[href^="tel"]').length > 0;
      }).first();
      if ($telH6.length) {
        var $telA = $telH6.find('a[href^="tel"]').first();
        var href = $telA.attr('href') || '';
        var num = $telA.text() || href.replace('tel:', '');
        $telH6.html(t['contacts.telLabel'] + ' <a href="' + (href || 'tel:' + num) + '">' + num + '</a>');
      }

      // Email h6
      var $emailH6 = $contactsBox.find('h6').filter(function () {
        return $(this).find('a[href^="mailto"]').length > 0;
      }).first();
      if ($emailH6.length) {
        var $emailA = $emailH6.find('a[href^="mailto"]').first();
        var hrefE = $emailA.attr('href') || '';
        var eText = $emailA.text() || hrefE.replace('mailto:', '');
        $emailH6.html(t['contacts.emailLabel'] + ' <a href="' + (hrefE || 'mailto:' + eText) + '">' + eText + '</a>');
      }
    }

    // Footer: privacy link and copyright center column
    $('a[href="privacy.html"]').text(t['footer.privacy']);

    // Update center copyright column (to keep consistent structure)
    var $copyrightCol = $('.page-footer .col-md-4.text-md-center').first();
    if ($copyrightCol.length) {
      // build HTML using current year
      var year = new Date().getFullYear().toString();
      if (lang === 'ar') year = toArabicDigits(year);
      // Use provided footer.copy_html translation so it contains the copyright-year placeholder
      var copyTemplate = t['footer.copy_html'] || ("© <span class='copyright-year'></span> WoodCut Pro. All rights reserved.");
      // replace inner copyright-year immediately
      copyTemplate = copyTemplate.replace("<span class='copyright-year'></span>", "<span class='copyright-year'>" + year + "</span>");
      copyrightCol.html(copyTemplate.replace(/<a href="privacy.html">.*<\/a>/, '<a href="privacy.html">' + t['footer.privacy'] + '</a>'));
    }

    // logo alt attributes
    $('.rd-navbar-brand img, .page-footer .logo img').attr('alt', t['brand.logoAlt']);

    // If RTL needed, add small class toggles for layout (these CSS rules are in style.css)
    if (lang === 'ar') {
      $('body').addClass('i18n-rtl');
    } else {
      $('body').removeClass('i18n-rtl');
    }
  }

  // init on doc ready
  $(function () {
    var saved = localStorage.getItem('siteLang') || 'en';
    applyLang(saved);

    $('#lang-en').off('click.i18n').on('click.i18n', function () {
      localStorage.setItem('siteLang', 'en');
      applyLang('en');
    });
    $('#lang-ar').off('click.i18n').on('click.i18n', function () {
      localStorage.setItem('siteLang', 'ar');
      applyLang('ar');
    });
  });

})(jQuery);
