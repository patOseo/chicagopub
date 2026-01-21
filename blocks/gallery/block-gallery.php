<?php
/**
* Chicago Pub Gallery Block
*
* @package chicagopub
*/

$class_name = 'block-chicago-gallery';
if ( ! empty( $block['className'] ) ) {
    $class_name .= ' ' . $block['className'];
}

?>

<div class="<?php echo esc_attr($class_name); ?>">
    <section class="section-gallery" uk-scrollspy="target: .section-heading, .container > p, .container figure; cls: uk-animation-slide-bottom-medium; repeat: false; delay: 60;">
        <div class="container">
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
</div>