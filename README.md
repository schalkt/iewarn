IEWARN
=============
Internet Explorer warning message

Show a bottom alert message when the visitor is using Internet Explorer 8 or lower browser.
Informing visitor of the modern browsers download links.

Features:
- no jQuery needed
- customizable style
- easy language adding (en, de, fr and hu already available)
- cookie based close button (timeout by session or days)
- the webpage is still visible above the warning box 

![Example Screenshot](http://schalk.hu/projects/iewarn/demo/screenshot.jpg)

Easy usage: call it AFTER THE BODY tag.
-------

```

    <body>
	<!--[if lte IE 7]>
		<link type="text/css" rel="stylesheet" href="js/iewarn/iewarn.css" />
		<script type="text/javascript" src="js/iewarn/iewarn.js" ></script>
	<![endif]-->

```
