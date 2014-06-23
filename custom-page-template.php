<?php
/*
Template Name: Solutions Page
*/
?>

<?php get_header(); ?>


	<div id="page-container">
		<div id="main-container">
			<section class="wrapper clearfix">
				<h2><?php the_title(); ?></h2>
				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>	                 
	                <div class="als-container" id="horz-slider">
				  <span class="als-prev hide"><img src="<?php echo get_template_directory_uri(); ?>/images/slider-prev.png" alt="prev" title="previous" /></span>
				  <div class="als-viewport slider-window">	                 
	                <ul class="int-services service-thumbs als-wrapper">
	                <?php $loop = new WP_Query( array( 'post_type' => 'services', 'posts_per_page' => 10, 'order' => 'DESC' ) ); ?>
					<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
						
						<?php $static_image = (get_template_directory_uri()) . '/images/services-icons/' . str_replace(" ", "-", strtolower($post->post_title)) .'.png'; ?>
						<?php $active_image = (get_template_directory_uri()) . '/images/services-icons/' . str_replace(" ", "-", strtolower($post->post_title)) .'-hover.png'; ?>
						<li><a href="#int-service-info" data-attr="<?php the_permalink() ?>" rel="<?php the_ID(); ?>"><?php the_post_thumbnail(array(115, 115), array('class' => 'hovericons service-thumb als-item', 'rel' => $active_image, 'data-attr' => $static_image, 'data-attr-thumb' => $active_image )); ?></a></li>

						<?php endwhile; ?>
						<?php  wp_reset_query(); ?>
					</ul>				
				  </div>
				  <span class="als-next show-largemobile"><img src="<?php echo get_template_directory_uri(); ?>/images/slider-next.png" alt="next" title="next" /></span>
				</div>				


				<div id="int-service-info" class="hide"></div>
						
				<?php  wp_reset_query(); ?>

	            <?php endwhile; else: ?>
	                <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
	            <?php endif; ?>
			</section>
		</div>
	</div>

<?php get_footer(); ?>
