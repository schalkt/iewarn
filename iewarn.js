/*
 * iewarn.js
 * v1.1 - 2013.06.30
 *
 * The iewarn is a javascript code that displays a warning message
 * on the webpage bottom for informing the visitor to upgrade
 * the Internet Explorer to a newer version or install another browser.
 *
 * <!--[if lte IE 7]>
 *   <script type="text/javascript" src="/js/iewarn/iewarn.js"></script>
 * <![endif]-->
 *
 *
 * Copyright 2013, Tamás Schalk (http://schalk.hu)
 * Licensed under the MIT
 *
 */

(function(fn) {

    var expire, message, button, browsers, close, cookie;

    // the cookie will expire after this (day), set to null for session expire
    expire = 1;

    // the title
    title = {
        'hu-hu' : "Tud róla, hogy az Ön Internet Explorer böngészője elavult?",
        'en-us' : "Did you know that your Internet Explorer is out of date?"
    };

    // the message
    message = {
        'hu-hu' : "Weboldalunk az Ön képernyőjén hibásan jelenhet meg! A jobb böngészési élményért és a biztonságos internethasználathoz javasoljuk, hogy frissítse Internet Explorer-ét a legújabb verzióra, vagy próbáljon ki más korszerű böngészőprogramot. Az alábbi lista tartalmazza a legnépszerűbb, ingyenesen elérhető alternatívákat. Letöltéshez kattintson az ikonok egyikére.",
        'en-us' : "Our website may be displayed incorrectly on your screen! To get safe and best possible browsing experience we recommend that you upgrade to a newer version or other web browser. A list of the most popular web browsers can be found below. Just click on the icons to get to the download page."
    };

    // the close button
    button = {
        'hu-hu' : ' Figyelmeztetés bezárása és emkékeztetés később.',
        'en-us' : ' Remind me later.'
    };

    // browser name, url and icon
    browsers = {
        ff : {
            name : "Firefox",
            url : "http://www.mozilla.com/firefox/",
            icon : "http://www.mozilla.org/favicon.ico"
        },
        chrome : {
            name : "Google Chrome",
            url : "http://www.google.com/chrome",
            icon : "http://www.google.com/images/icons/product/chrome-32.png"
        },
        ie : {
            name : "Internet Explorer",
            url : "http://www.microsoft.com/windows/Internet-explorer/default.aspx",
            icon : "http://icons.iconarchive.com/icons/zerode/plump/128/Internet-Explorer-icon.png"
        },
        opeara : {
            name : "Opera",
            url : "http://www.opera.com/download/",
            icon : "http://www.opera.com/favicon.ico"
        },
        safari : {
            name : "Safari",
            url : "http://www.apple.com/safari/download/",
            icon : "http://extensions.apple.com/home/images/required_safari_icon_20110501.png"
        },
        iron : {
            name : "SRWare Iron",
            url : "http://www.srware.net/en/software_srware_iron_download.php",
            icon : "http://www.srware.net/favicon.ico"

        }

    };

    // close the warning box
    window[fn] = {

        close : function() {

            // set the cookie
            cookie('iewarn', true);

            // remove warning box
            var obj = document.getElementById('iewarn');
            if (obj) {
                obj.parentNode.removeChild(obj);
            }

        }

    };

    // set and get cookie function
    cookie = function(name, value, days) {

        if (days == undefined) {
            days = expire;
        }

        // if value not undefined set the cookie else read
        if (value !== undefined) {

            var expire = new Date();
            expire.setDate(expire.getDate() + days);
            value = escape(value) + ((days == null) ? "" : "; expires=" + expire.toGMTString());
            document.cookie = name + "=" + value;

        } else {

            var i, x, y, cookies = document.cookie.split(";");

            for ( i = 0; i < cookies.length; i++) {
                x = cookies[i].substr(0, cookies[i].indexOf("="));
                y = cookies[i].substr(cookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == name) {
                    return unescape(y);
                }
            }

        }

    }

    // if cookie true return
    if (cookie('iewarn')) {
        return;
    }

    var body, iebox, browser, language, img, link, list, html;

    // get browser language
    language = window.navigator.userLanguage || window.navigator.language;
    language = language.toLowerCase();

    if (language == 'hu') {
        language = 'hu-hu';
    }

    if (!message[language]) {
        language = 'en-us';
    }

    // get body and create warning box
    body = document.getElementsByTagName("body")[0];
    iebox = document.createElement('div');
    list = '';

    // generate browsers informations
    for (key in browsers) {

        browser = browsers[key];
        img = '<img src="' + browser.icon + '" alt="" />';
        link = '<a href="' + browser.url + '" target="_blank">' + img + browser.name + '</a>';
        list = list + link;

    }

    // set warning box id and html
    iebox.setAttribute("id", "iewarn");
    button = '<span id="iewarn-close" onclick="javascript: iewarn.close();">' + button[language] + '</span>';
    html = '<h1>' + title[language] + '</h1>';
    html += '<div class="text">' + message[language] + '<div class="list">' + list + '</div>' + button + '</div>';

    iebox.innerHTML = html;

    // append to body
    body.appendChild(iebox);

})('iewarn');

