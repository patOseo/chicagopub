<?php
if( function_exists('acf_add_options_page') ) {

    acf_add_options_page( array(
        'page_title' => 'Top Header',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-table-row-before', 
        'position' => 5
    ) );

    acf_add_options_page( array(
        'page_title' => 'Specials',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-star-filled', 
        'position' => 6
    ) );

    acf_add_options_page( array(
        'page_title' => 'Contact Info',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-info-outline', 
        'position' => 7
    ) );

    acf_add_options_page( array(
        'page_title' => 'Hours',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-clock', 
        'position' => 8
    ) );

    acf_add_options_page( array(
        'page_title' => 'Social Media',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-facebook', 
        'position' => 9
    ) );
}