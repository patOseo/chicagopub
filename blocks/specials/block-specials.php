<?php
/**
* Specials Block
*
* @package chicagopub
*/

$class_name = 'block-specials';
if ( ! empty( $block['className'] ) ) {
    $class_name .= ' ' . $block['className'];
}

$logo = get_field('logo', 'option');

?>

<div class="<?php echo esc_attr($class_name); ?>">
    <?php if(have_rows('specials', 'option')): ?>
            <section class="section-specials" uk-scrollspy="target: .specials-slider .single-special, .slick-dots; cls: uk-animation-slide-bottom-medium; repeat: false; delay: 200;">
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
            </section>
        <?php endif; ?>
</div>