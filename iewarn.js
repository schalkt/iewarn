/*
 * iewarn.js
 * v1.0 - 2013.05.17
 *
 * The iewarn is a javascript that displays a warning message on the webpage
 * bottom
 * for informing the visitor to upgrade the Internet Explorer to a newer version
 * or
 * install another browser.
 *
 *
 * <!--[if lt IE 8]>
 *   <script type="text/javascript"
 * src="/[path_to_js_files]/iewarning/iewarning.js" ></script>
 * <![endif]-->
 *
 *
 * Copyright 2013, Tamás Schalk (http://schalk.hu)
 * Licensed under the MIT
 *
 */

var iewarn = {

    // url for the browser icons - CHANGE THIS!!!
    path : '/swems/include/iewarn/',

    // the cookie will expire after this (day), set to null for session expire
    expire : 1,

    // the message
    message : {
        'hu-hu' : "<h1>Tud róla, hogy az Ön Internet Explorer böngészője elavult?</h1>Weboldalunk az Ön képernyőjén hibásan jelenhet meg! A jobb böngészési élményért és a biztonságos internethasználathoz javasoljuk, hogy frissítse Internet Explorer-ét a legújabb verzióra, vagy próbáljon ki más korszerű böngészőprogramot. Az alábbi lista tartalmazza a legnépszerűbb, ingyenesen elérhető alternatívákat. Letöltéshez kattintson az ikonok egyikére.",
        'en-us' : "<h1>Did you know that your Internet Explorer is out of date?</h1>Our website may be displayed incorrectly on your screen! To get safe and best possible browsing experience we recommend that you upgrade to a newer version or other web browser. A list of the most popular web browsers can be found below. Just click on the icons to get to the download page."
    },

    // the close button
    button : {
        'hu-hu' : ' Amennyiben most nem szeretné, kattintson erre: <span id="iewarning-close" onclick="javascript: iewarn.close();">Későbbi emlékeztetést kérek!</span>',
        'en-us' : ' <span id="iewarning-close" onclick="javascript: iewarn.close();">Remind me later.</span>'
    },

    // browser name, link and icon
    browsers : {
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

    },

    // the styles for box, etc.
    styles : function() {

        //@formatter:off
        var styles = [
            "#iewarning { position: fixed; z-index: 99999; bottom: 0px; left: 0px; right: 0px; background: #f5f5f5; padding: 20px 5%; color: #555555; font-size: 16px; font-family: Arial; border-top: 5px solid #303030; text-align: center; }",
            "#iewarning h1 { letter-spacing: 0px; font-size: 18px; color: #202020; padding: 0px; margin: 0px 0px 10px 0px; }",
            "#iewarning table { margin: 20px auto 0px auto; }",
            "#iewarning td { font-size: 12px; padding: 0px 20px; }",
            "#iewarning a { color: #707070; }",
            "#iewarning a:hover { color: #202020; }",
            "#iewarning-close { color: #202020; cursor: pointer; font-weight: bold; }",
            "* html,* html body /* IE6 Fixed Position Jitter Fix */{background-image:url(about:blank);background-attachment:fixed;}",
            "* html #iewarning /* IE6 position fixed Bottom */{position:absolute;bottom:auto;top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));}"
        ];
        //@formatter:on

        var data = '';

        for (key in styles) {
            data += styles[key] + ' ';
        }

        this.style(data);

    },

    // show the warning box
    show : function() {

        if (this.cookie('iewarning'))
            return;

        // set styles
        this.styles();

        // get browser language
        var language = window.navigator.userLanguage || window.navigator.language;
        language = language.toLowerCase();

        if (language == 'hu')
            language = 'hu-hu';

        if (!this.message[language])
            language = 'en-us';

        var body = document.getElementsByTagName('body')[0];
        var iebox = document.createElement('div');
        var browsers = '';

        for (key in this.browsers) {

            var browser = this.browsers[key];
            var img = '<img width="18" src="' + browser.icon + '" alt="" />';
            var link = '<a href="' + browser.url + '" target="_blank">' + img + '<br />' + browser.name + '</a>';
            browsers = browsers + '<td>' + link + '</td>';

        }

        iebox.setAttribute("id", "iewarning");
        iebox.innerHTML = this.message[language] + this.button[language] + '<table width="10%"><tr>' + browsers + '</tr></table>';
        body.appendChild(iebox);

    },

    // close the warning box
    close : function() {

        this.cookie('iewarning', true);

        var obj = document.getElementById('iewarning');

        if (obj)
            obj.parentNode.removeChild(obj);

    },

    // add new style function
    style : function(str) {

        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('style');

        style.type = 'text/css';
        style.media = 'screen';

        if (style.styleSheet) {
            style.styleSheet.cssText = str;
        } else {
            style.appendChild(document.createTextNode(str));
        }

        head.appendChild(style);

    },

    // set and get cookie function
    cookie : function(name, value, days) {

        if (days == undefined)
            days = this.expire;

        // if value not undefined set the cookie else read
        if (value !== undefined) {

            var expire = new Date();
            expire.setDate(expire.getDate() + days);
            var value = escape(value) + ((days == null) ? "" : "; expires=" + expire.toGMTString());
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

}

iewarn.show();
