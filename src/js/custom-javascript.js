// Add your custom JS here.

jQuery(function($){
	// Specials Slider
	$('.specials-slider').slick({
	  dots: true,
	  arrows: false,
	  infinite: true,
	  autoplay: true,
	  autoplaySpeed: 5000,
	  speed: 500,
	  fade: true,
	  pauseOnHover: false,
	  cssEase: 'linear',
	});

	// Food Slider
	$('.food-slider').slick({
	  slidesToShow: 5,
	  slidesToScroll: 1,
	  arrows: true,
	  infinite: true,
	  autoplay: true,
	  autoplaySpeed: 4000,
	  speed: 600,
	  responsive: [
    	{
    	  breakpoint: 1200,
    	  settings: {
    	    slidesToShow: 3
    	  }
    	},
    	{
    	  breakpoint: 992,
    	  settings: {
    	    slidesToShow: 2
    	  }
    	},
    	{
    	  breakpoint: 768,
    	  settings: {
    	    slidesToShow: 1
    	  }
    	}
      ]
	});

	// Close mobile nav after clicking a link
	$('.navbar-nav li a').on('click', function(){
	    if(!$( this ).hasClass('dropdown-toggle')){
	        $('.navbar-collapse').collapse('hide');
	    }
	});
});
