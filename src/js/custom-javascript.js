// Add your custom JS here.
document.addEventListener("DOMContentLoaded", () => {
	const target = document.getElementById("single-wrapper");

	if (!target) return;

	const offset = 84;
	const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

	window.scrollTo({
		top,
		behavior: "auto", // change to 'smooth' if you want animation
	});
});
jQuery(function ($) {
	// Specials Slider
	$(".specials-slider").slick({
		dots: true,
		arrows: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		speed: 500,
		fade: true,
		pauseOnHover: false,
		cssEase: "linear",
	});

	// Food Slider
	$(".food-slider").slick({
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
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	});

	// Close mobile nav after clicking a link
	$(".navbar-nav li a").on("click", function () {
		if (!$(this).hasClass("dropdown-toggle")) {
			$(".navbar-collapse").collapse("hide");
		}
	});

	// Scrollspy classes
	$(".slide-in-bottom-md").attr(
		"uk-scrollspy",
		"cls: uk-animation-slide-bottom-medium; delay: 100",
	);
	$(".slide-in-left-md").attr(
		"uk-scrollspy",
		"cls: uk-animation-slide-left-medium; delay: 100",
	);
	$(".slide-in-right-md").attr(
		"uk-scrollspy",
		"cls: uk-animation-slide-right-medium; delay: 100",
	);
	$(".slide-in-bottom-sm").attr(
		"uk-scrollspy",
		"cls: uk-animation-slide-bottom-small; delay: 100",
	);
	$(".slide-in-left-sm").attr(
		"uk-scrollspy",
		"cls: uk-animation-slide-left-small; delay: 100",
	);
	$(".slide-in-right-sm").attr(
		"uk-scrollspy",
		"cls: uk-animation-slide-right-small; delay: 100",
	);
	$(".fade-in").attr("uk-scrollspy", "cls: uk-animation-fade; delay: 100");
	$(".fade-in-children").attr(
		"uk-scrollspy",
		"target: > *; cls: uk-animation-fade; delay: 100",
	);
	$(".slide-in-bottom-sm-children").attr(
		"uk-scrollspy",
		"target: > *; cls: uk-animation-slide-bottom-small; delay: 100",
	);
	$(".slide-in-bottom-md-children").attr(
		"uk-scrollspy",
		"target: > *; cls: uk-animation-slide-bottom-medium; delay: 100",
	);
	$(".slide-in-left-sm-children").attr(
		"uk-scrollspy",
		"target: > *; cls: uk-animation-slide-left-small; delay: 100",
	);
});
