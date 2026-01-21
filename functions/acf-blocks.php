<?php

// Create custom Gutenberg block category for ACF Blocks
function chicagopub_custom_block_category( $categories, $post ) {
    array_unshift( $categories, array(
		'slug'	=> 'custom-blocks',
		'title' => 'Custom Blocks'
	) );

	return $categories;
}
add_filter( 'block_categories_all', 'chicagopub_custom_block_category', 1, 2);


/**
 * Registers custom ACF blocks.
 */
add_action( 'init', 'chicagopub_register_acf_blocks' );
function chicagopub_register_acf_blocks() {
	register_block_type( __DIR__ . '/../blocks/menus' );
    register_block_type( __DIR__ . '/../blocks/specials' );
    register_block_type( __DIR__ . '/../blocks/takeout-menu' );
    register_block_type( __DIR__ . '/../blocks/gallery' );
}