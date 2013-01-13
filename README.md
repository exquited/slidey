slidey
======

A small jQuery plugin for a completely responsive picture/video slider.


Features
=====

* Completely responsive layout (no fixed width/height needed)
* Minimal HTML structure needed (just a div and an ul, li list)
* Uses CSS3 transitions when supported
* Supports Video embeds (currently only from vimeo.com, more to come in the future)


Usage
=====

1. Download and move to your desired location
2. Add slidey.js, modernizr.min.js and slidey.css to the `<head>`-portion of your HTML page
3. Add this markup for the slider:
```
	<div id="mySlidey" class="slidey">
		<ul>
			<li><img src="pic1.jpg" alt=""></li>
			<li><img src="pic2.jpg" alt=""></li>
			<li><img src="pic3.jpg" alt=""></li>
			<li class="video"><iframe src="http://player.vimeo.com/video/52123602" width="100%" height="400" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></li>
		</ul>
	</div>
```

4. Call `$('#mySlidey').slidey();`


Options
=====

* interval: Time (in ms) before next slide (when autoPlay is true)
* autoPlay: Boolean whether to advance to next slide automatically
* pauseOnClick: Boolean whether to pause autoPlay when user clicks previous/next button
