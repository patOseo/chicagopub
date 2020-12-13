<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function understrap_remove_scripts() {
    wp_dequeue_style( 'understrap-styles' );
    wp_deregister_style( 'understrap-styles' );

    wp_dequeue_script( 'understrap-scripts' );
    wp_deregister_script( 'understrap-scripts' );

    // Removes the parent themes stylesheet and scripts from inc/enqueue.php
}
add_action( 'wp_enqueue_scripts', 'understrap_remove_scripts', 20 );

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {

	// Get the theme data
	$the_theme = wp_get_theme();
    wp_enqueue_style('gfonts', 'https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    wp_enqueue_style( 'child-understrap-styles', get_stylesheet_directory_uri() . '/css/child-theme.min.css', array(), $the_theme->get( 'Version' ) );
    wp_enqueue_script( 'jquery');
    wp_enqueue_script( 'child-understrap-scripts', get_stylesheet_directory_uri() . '/js/child-theme.min.js', array(), $the_theme->get( 'Version' ), true );
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}

function add_child_theme_textdomain() {
    load_child_theme_textdomain( 'understrap-child', get_stylesheet_directory() . '/languages' );
}
add_action( 'after_setup_theme', 'add_child_theme_textdomain' );


if( function_exists('acf_add_options_page') ) {
    acf_add_options_page('Site Options');

    acf_add_options_page( array(
        'page_title' => 'Specials',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-star-filled', 
        'position' => 10
    ) );
}

// Custom sizes
add_image_size( 'special', 464, 464, true );
add_image_size( 'food', 220, 220, true );


// Adds lightbox to gallery links
// add_filter('wp_get_attachment_link', 'rc_add_rel_attribute');
// function rc_add_rel_attribute($link) {
//     global $post;
//     return str_replace('<a href', '<a uk-lightbox="" href', $link);
// }