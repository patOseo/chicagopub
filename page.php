<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$container = get_theme_mod( 'understrap_container_type' );

?>

<div class="wrapper py-0" id="page-wrapper">

	<div id="content" tabindex="-1">

		<main class="site-main" id="main">

			<?php
			while ( have_posts() ) {
				the_post();
				get_template_part( 'loop-templates/content', 'page' );
			}
			?>

		</main>

	</div><!-- #content -->

</div><!-- #page-wrapper -->

<?php
get_footer();
