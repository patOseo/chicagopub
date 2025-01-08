<section class="header-panel" id="home" style="background-image:url('<?php echo get_field('background_image', 'option'); ?>');">
	<div class="header-content">
		<?php $logo = get_field('logo', 'option'); ?>
		<div class="header-logo uk-animation-slide-bottom-medium"><?php echo wp_get_attachment_image($logo, 'full'); ?></div>
		<div class="header-heading uk-animation-slide-bottom-medium">Kitchener, Ontario</div>
		<div class="header-contact uk-animation-slide-bottom-medium"><a class="link-underline header-phone" href="tel:<?php echo get_field('phone_number', 'option'); ?>"><?php echo get_field('phone_number', 'option'); ?></a><a class="link-underline header-email" href="mailto:<?php echo get_field('email', 'option'); ?>"><?php echo get_field('email', 'option'); ?></a></div>
		<div class="header-social uk-animation-slide-bottom-medium">
			<?php if(get_field('facebook', 'option')): ?>
				<a href="<?php echo get_field('facebook', 'option'); ?>" target="_blank" rel="noopener,noreferrer,nofollow">
					<span class="fa-stack fa-2x">
					  <i class="fa fa-circle fa-stack-2x"></i>
					  <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
					</span>
				</a>
			<?php endif; ?>
			<?php if(get_field('instagram', 'option')): ?>
				<a href="<?php echo get_field('instagram', 'option'); ?>" target="_blank" rel="noopener,noreferrer,nofollow">
					<span class="fa-stack fa-2x">
					  <i class="fa fa-circle fa-stack-2x"></i>
					  <i class="fa fa-instagram fa-stack-1x fa-inverse"></i>
					</span>
				</a>
			<?php endif; ?>
		</div>
		<div class="ubereats uk-animation-slide-bottom-medium">
			<p>Order on</p>
			<a href="<?php echo get_field('ubereats', 'option'); ?>" target="_blank" rel="noopener,noreferrer,nofollow"><img src="/wp-content/themes/chicagopub/images/ubereats.png" alt="Order Chicago Pub on UberEats"></a>
		</div>
	</div>
</section>