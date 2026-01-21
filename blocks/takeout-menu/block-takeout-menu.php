<?php
/**
* Takeout Menu Block
*
* @package chicagopub
*/

$class_name = 'block-takeout-menu';
if ( ! empty( $block['className'] ) ) {
    $class_name .= ' ' . $block['className'];
}

?>

<div class="<?php echo esc_attr($class_name); ?>">
<?php if(have_rows('food')): ?>
	<section class="section-food" uk-scrollspy="target: .section-heading, .food-slider; cls: uk-animation-slide-bottom-medium; repeat: false; delay: 200;">
		<div class="container-fluid">
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
</div>