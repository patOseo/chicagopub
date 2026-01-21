<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after
 *
 * @package UnderStrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$container = get_theme_mod( 'understrap_container_type' );
?>

<?php get_template_part( 'sidebar-templates/sidebar', 'footerfull' ); ?>

<footer class="site-footer" id="contact">
	<div class="site-info" uk-scrollspy="target: .row > div; cls: uk-animation-slide-bottom-medium; repeat: false; delay: 200;">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-lg-4">
					<?php $logo = get_field('logo', 'option'); ?>
					<div class="footer-logo"><?php echo wp_get_attachment_image($logo, 'full'); ?></div>
				</div>
				<div class="col-md-6 col-lg-3">
					<h3>Contact Us</h3>
					<div class="footer-address"><?php echo get_field('address', 'option'); ?></div>
					<p class="footer-email"><strong>Email: </strong><a class="link-underline" href="mailto:<?php echo get_field('email', 'option'); ?>"><?php echo get_field('email', 'option'); ?></a></p>
					<p class="footer-phone"><strong>Phone: </strong><a class="link-underline" href="tel:<?php echo get_field('phone_number', 'option'); ?>"><?php echo get_field('phone_number', 'option'); ?></a></p>
					<br>
					<?php echo get_field('additional_info', 'option'); ?>
				</div>
				<div class="col-md-6 col-lg-3">
					<h3>Hours</h3>
					<?php if(have_rows('hours', 'option')): ?>
						<div class="hours">
							<?php while(have_rows('hours', 'option')): the_row(); ?>
								<p><?php echo get_sub_field('day'); ?></p>
							<?php endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</div>
	<div class="site-map">
		<?php echo get_field('google_map', 'option'); ?>
	</div>
	<div class="copyright">
		<div class="container">
			© <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?> | All Rights Reserved
		</div>
	</div>
</footer><!-- #colophon -->

</div><!-- #page we need this extra closing tag here -->

<?php wp_footer(); ?>

</body>

</html>

