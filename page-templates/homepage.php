<?php
/**
 * Template Name: Home Page
 *
 * Template for displaying a page without sidebar even if a sidebar widget is published.
 *
 * @package UnderStrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();
$container = get_theme_mod( 'understrap_container_type' );
$logo = get_field('logo', 'option');
if ( is_front_page() ) {
	get_template_part( 'global-templates/hero' );
}
?>

<div class="wrapper" id="full-width-page-wrapper">

	<?php if(have_rows('specials', 'option')): ?>
		<section class="section-specials" id="specials" uk-scrollspy="target: .specials-slider .single-special, .slick-dots; cls: uk-animation-slide-bottom-medium; repeat: false; delay: 200;" <?php if(get_field('specials_background', 'option')): ?>style="background-image:url('<?php echo get_field('specials_background', 'option'); ?>');"<?php endif; ?>>
			<div class="overlay">
				<div class="container">
					<div class="specials-slider">
						<?php while(have_rows('specials', 'option')): the_row(); ?>
							<div class="single-special">
								<div class="row align-items-center justify-content-md-center">
									<div class="col-md-6">
										<div class="special-img">
											<?php $specialimg = get_sub_field('image'); ?>
											<?php if($specialimg): echo wp_get_attachment_image($specialimg, 'special'); else: echo wp_get_attachment_image($logo, 'full', '', ["class" => "special-default-img"]); endif; ?>
										</div>
									</div>
									<div class="col-md-6">
										<div class="special-content">
											<h2><?php echo get_sub_field('heading'); ?></h2>
											<p><?php echo get_sub_field('content'); ?></p>
										</div>
									</div>
								</div>
							</div>
						<?php endwhile; ?>
					</div>
				</div>
			</div>
		</section>
	<?php endif; ?>

	<section class="section-about" id="about" uk-scrollspy="target: .col-lg-6; cls: uk-animation-slide-bottom-medium; repeat: false; delay: 200;">
		<div class="container">
			<div class="row">
				<div class="col-lg-6">
					<h2 class="about-heading"><?php echo get_field('about_heading'); ?></h2>
					<p><?php echo get_field('about_text'); ?></p>
					<div style="display:none;"><?php the_content(); ?></div>
				</div>
				<div class="col-lg-6">
					<div class="about-image">
						<?php $about_img = get_field('about_image'); ?>
						<div class="about-logo"><?php echo wp_get_attachment_image($logo, 'small'); ?></div>
						<?php echo wp_get_attachment_image($about_img, 'full', '', ["class" => "rounded"]); ?>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section-menus" id="menu" uk-scrollspy="target: .row > div; cls: uk-animation-slide-bottom-medium; repeat: false; delay: 200;" style="background-image: url('<?php echo get_field('menus_background'); ?>');">
		<div class="overlay">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-md-12">
						<h2 class="section-heading">Menus</h2>
						<p>Click on a menu to view it.</p>
					</div>

					<?php if(have_rows('menus')): ?>
						<?php while(have_rows('menus')): the_row(); $icon = get_sub_field('menu_icon'); ?>
							<div class="col-6 col-md-4 col-lg-3">
								<div class="position-relative menu my-0 my-3">
									<div class="b-vlock"><?php echo wp_get_attachment_image($icon, 'thumbnail', '', ["class" => "menu-icon"]);  ?></div>
									<a href="<?php echo get_sub_field('menu_pdf'); ?>" target="_blank" rel="noopener,noreferrer,nofollow" class="btn btn-lg btn-block btn-primary stretched-link"><?php echo get_sub_field('menu_name'); ?></a>
								</div>
							</div>
						<?php endwhile; ?>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</section>

<?php if(have_rows('food')): ?>
	<section class="section-food" id="food" uk-scrollspy="target: .section-heading, .food-slider; cls: uk-animation-slide-bottom-medium; repeat: false; delay: 200;">
		<div class="container-fluid">
			<h2 class="section-heading">Order Online</h2>
			<div class="food-slider">
				<?php while(have_rows('food')): the_row(); ?>
					<div class="food-item card">
						<?php $foodimg = get_sub_field('image'); ?>
						<?php $loading = ['loading' => 'eager']; ?>
						<?php $foodlink = get_sub_field('link'); ?>

						<?php echo wp_get_attachment_image($foodimg, 'food', false, $loading); ?>
						<p><a class="stretched-link" href="<?php echo str_replace('https://www', 'https://order', $foodlink) ?>?utm_source=web-restaurant-manager" target="_blank" rel="noopener,noreferrer,nofollow"><?php echo get_sub_field('name'); ?></a></p>
					</div>
				<?php endwhile; ?>
			</div>
			<div class="ubereats">
				<p>See full menu on</p>
				<a href="<?php echo get_field('ubereats', 'option'); ?>" target="_blank" rel="noopener,noreferrer,nofollow"><img src="/wp-content/themes/chicagopub/images/ubereats.png" alt="Order Chicago Pub on UberEats"></a>
			</div>
		</div>
	</section>
<?php endif; ?>

	<section class="section-billiards" id="billiards" uk-scrollspy="target: .section-heading, .row > div; cls: uk-animation-slide-bottom-medium; repeat: false; delay: 200;" style="background-image:url('<?php echo get_field('billards_background');?>')">
		<div class="overlay">
			<div class="container">
				<h2 class="section-heading">Billiards</h2>
				<div class="row align-items-center">
					<div class="col-md-7">
						<?php $billiards_img = get_field('billiards_image'); ?>
						<?php if($billiards_img): echo wp_get_attachment_image($billiards_img, 'full'); endif; ?>
					</div>
					<div class="col-md-5">
						<?php if(get_field('billiards_text')): ?><div class="billiards-text"><?php echo get_field('billiards_text'); ?><div><?php endif; ?>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section-gallery" id="gallery" uk-scrollspy="target: .section-heading, .container > p, .container figure; cls: uk-animation-slide-bottom-medium; repeat: false; delay: 60;">
			<div class="container">
				<h2 class="section-heading">Gallery</h2>
				<p>Click on a photo to enlarge it.</p>
				<?php
				$image_ids = get_field('gallery');
				if( $image_ids ) { ?>
				<div class="gallery-container">
					<?php
				    // Generate string of ids ("123,456,789").
				    $images_string = implode( ',', $image_ids );
				
				    // Generate and do shortcode.
				    // Note: The following string is split to simply prevent our own website from rendering the gallery shortcode.
				    $shortcode = sprintf( '[' . 'gallery ids="%s" columns="6"]', esc_attr($images_string) );
				    echo do_shortcode( $shortcode );
				 } ?>
				</div>
			</div>
	</section>


</div><!-- #full-width-page-wrapper -->

<?php
get_footer();
