<?php
/**
* Menus Block
*
* @package chicagopub
*/

$class_name = 'block-menus';
if ( ! empty( $block['className'] ) ) {
    $class_name .= ' ' . $block['className'];
}

?>

<div class="<?php echo esc_attr($class_name); ?>">
    <section class="section-menus" uk-scrollspy="target: .row > div; cls: uk-animation-slide-bottom-medium; repeat: false; delay: 200;" style="background-image: url('<?php echo get_field('menus_background'); ?>');">
		<div class="overlay">
			<div class="container">
				<div class="row justify-content-center">
					<?php if(have_rows('menus')): ?>
						<?php while(have_rows('menus')): the_row(); $icon = get_sub_field('menu_icon'); ?>
							<div class="col-6 col-md-4 col-lg-3">
								<div class="position-relative menu my-0 my-3">
									<div class="d-block"><?php echo wp_get_attachment_image($icon, 'thumbnail', '', ["class" => "menu-icon"]);  ?></div>
									<a href="<?php echo get_sub_field('menu_pdf'); ?>" target="_blank" rel="noopener,noreferrer,nofollow" class="btn btn-lg btn-block btn-primary stretched-link"><?php echo get_sub_field('menu_name'); ?></a>
								</div>
							</div>
						<?php endwhile; ?>
					<?php endif; ?>
				</div>
			</div>
		</div>
	</section>
</div>