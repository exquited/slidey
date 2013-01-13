(function( $ ){
  $.fn.slidey = function(options) {
	  
		// some settings for starters, in future there should be more...
		var $settings = $.extend({
      'autoPlay': true,
      'pauseOnClick': true,
      'interval': 5000
    }, options);
	  
	  
	  return this.each(function () {
	  
			var $this = $(this),
		  		$track = $this.find('ul'),
		  		$slides = $this.find('li'),
		  		$position = 0,
		  		$running = false,
					
					$player = false,
			
					// advance to next slide
					nextSlide = function() {
						var left = ($position+1) * 100;
						
						// use CSS3 transitions if available
						if (Modernizr.csstransforms) {
							$track[0].style[Modernizr.prefixed('transform')] = 'translate3d(-'+(left / $slides.length)+'%, 0, 0)';
							window.setTimeout(function() {
								$position++;
								checkLastSlide();
							}, 1000);
						}
						else {
							$track.animate({ left: '-'+left+'%' }, 400, 'swing', function() {
								$position++;
								checkLastSlide();
							});
						}
					},
					
					// go to previous slide
					previousSlide = function() {
						var left = ($position-1) * 100;
						
						// use CSS3 transitions if available
						if (Modernizr.csstransforms) {
							$track[0].style[Modernizr.prefixed('transform')] = 'translate3d(-'+(left / $slides.length)+'%, 0, 0)';
							window.setTimeout(function() {
								$position--;
								checkLastSlide();
							}, 1000);
						}
						else {
							$track.animate({ left: '-'+left+'%' }, 400, 'swing', function() {
								$position--;
								checkLastSlide();
							});
						}
					},
					
					resizeVideos = function() {
						var height = $slides.not('.video').first().height();
						$slides.filter('.video').find('iframe').height(height);
					}
					
					checkLastSlide = function() {
						if ($position == ($slides.length - 1)) {
							goToSlide(0);
						}
						else {
							$running = false;
						}
					},
					
					goToSlide = function(position) {
						if ($position != position) {
							var left = position * 100;
							if (Modernizr.csstransforms) {
								$track.css(Modernizr.prefixed('transition'), 'all 0s ease-in-out');
								$track[0].style[Modernizr.prefixed('transform')] = 'translate3d(-'+(left / $slides.length)+'%, 0, 0)';
								window.setTimeout(function() {
									$track.css(Modernizr.prefixed('transition'), 'all 1s ease-in-out');
									$running = false;
								}, 300);
							}
							else {
								$track.css('left', '-'+left+'%');
								$running = false;
							}
							$position = position;
						}
					};
			
			$slides.first().clone().appendTo($track);
			$slides = $track.find('li');
			
			$track.width(100 * $slides.length + '%');
			$slides.width(100 / $slides.length + '%');
			
			$this.append('<span class="previous"></span>');
			$this.append('<span class="next"></span>');
			
			$this.find('.next').click(function() {
				if (!$running) {
					$running = true;
					if ($settings.pauseOnClick) {
						clearInterval($player);
					}
					nextSlide();
				}
			});
			
			$this.find('.previous').click(function() {
				if (!$running) {
					$running = true;
					if ($settings.pauseOnClick) {
						clearInterval($player);
					}
					if ($position == 0) {
						goToSlide($slides.length-1);
						window.setTimeout(function() {
							previousSlide();
						}, 300);
					}
					else {
						previousSlide();
					}
				}
			});
			
			if (Modernizr.csstransforms) {
				$track.css(Modernizr.prefixed('transition'), 'all 1s ease-in-out');
			}
			
			window.setTimeout(function() {
				resizeVideos();
				$(window).resize(function() {
					resizeVideos();
				});
			}, 500);
			
			
			if ($settings.autoPlay) {
				$player = setInterval(function() {
					nextSlide();
				}, $settings.interval);
			}
	  });
	  
  }
})(jQuery, this, 0);
