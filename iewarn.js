/*
 * iewarn.js
 * v1.2 - 2013.06.30
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

(function (fn) {

    var expire, message, button, browsers, close, cookie;

    // the cookie will expire after this (day), set to null for session expire
    expire = 1;

    var icons_url = './../icons/';

    // the title
    title = {
        'hu-hu': "Tud róla, hogy az Ön Internet Explorer böngészője elavult?",
        'en-us': "Did you know that your Internet Explorer is out of date?",
        'fr': "Saviez-vous que votre Internet Explorer n'est pas à jour?",
        'de': "Wussten Sie, dass Ihr Internet Explorer nicht mehr aktuell ist?"
    };

    // the message
    message = {
        'hu-hu': "Weboldalunk az Ön képernyőjén hibásan jelenhet meg! A jobb böngészési élményért és a biztonságos internethasználathoz javasoljuk, hogy frissítse Internet Explorer-ét a legújabb verzióra, vagy próbáljon ki más korszerű böngészőprogramot. Az alábbi lista tartalmazza a legnépszerűbb, ingyenesen elérhető alternatívákat. Letöltéshez kattintson az ikonok egyikére.",
        'en-us': "Our website may be displayed incorrectly on your screen! To get safe and best possible browsing experience we recommend that you upgrade to a newer version or other web browser. A list of the most popular web browsers can be found below. Just click on the icons to get to the download page.",
        'fr': "Notre site Web peut ne pas s'afficher correctement sur ​​votre écran! Pour obtenir de l'expérience de navigation sécuritaire et meilleur possible, nous vous recommandons de mettre à jour vers une nouvelle version ou un autre navigateur Web. Une liste des navigateurs les plus populaires se trouve ci-dessous. Il suffit de cliquer sur les icônes pour accéder à la page de téléchargement.",
        'de': "Unsere Website kann nicht korrekt auf dem Bildschirm angezeigt werden! Um einen sicheren und bestmögliche Surferlebnis zu bekommen, empfehlen wir, dass Sie auf eine neuere Version oder andere Web-Browser aktualisieren. Eine Liste der beliebtesten Web-Browser können unten gefunden werden. Einfach auf die Symbole klicken, um zur Download-Seite zu bekommen."
    };

    // the close button
    button = {
        'hu-hu': ' Figyelmeztetés bezárása és emkékeztetés később.',
        'en-us': ' Remind me later.',
        'fr': "Rappelez-moi plus tard.",
        'de': "Später erinnern."
    };

    // browser name, url and icon
    browsers = {
        ff: {
            name: "Firefox",
            url: "http://www.mozilla.com/firefox/",
            icon: "firefox-32.png"
        },
        chrome: {
            name: "Google Chrome",
            url: "http://www.google.com/chrome",
            icon: "chrome-32.png"
        },
        ie: {
            name: "Internet Explorer",
            url: "http://www.microsoft.com/windows/Internet-explorer/default.aspx",
            icon: "explorer-32.png"
        },
        opeara: {
            name: "Opera",
            url: "http://www.opera.com/download/",
            icon: "opera-32.png"
        }

    };

    // warning box close function
    window[fn] = {

        close: function () {

            // set the cookie
            cookie(fn, true);

            // remove warning box
            var obj = document.getElementById('iewarn');

            if (obj) {
                obj.parentNode.removeChild(obj);
            }

        }

    };

    // set and get cookie function
    cookie = function (name, value, days) {

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

            for (i = 0; i < cookies.length; i++) {
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
    if (cookie(fn)) {
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
    wbox = document.createElement('div');
    list = '';

    // generate browsers informations
    for (key in browsers) {

        browser = browsers[key];
        img = '<span><img src="' + icons_url + browser.icon + '" alt="" /></span>';
        link = '<a href="' + browser.url + '" target="_blank">' + img + '<span>' + browser.name + '</span></a>';
        list = list + link;

    }

    // set warning box id and html
    wbox.setAttribute("id", "iewarn");
    button = '<span id="iewarn-close" onclick="javascript: ' + fn + '.close();">' + button[language] + '</span>';
    html = '<h1>' + title[language] + '</h1>';
    html += '<div class="text">' + message[language] + '<div class="list">' + list + '</div>' + button + '</div>';

    wbox.innerHTML = html;

    // append to body
    body.appendChild(wbox);

})('iewarn');

