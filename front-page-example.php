<?php get_header(); ?>	
	
	<section id="top-section">
		<div class="wrapper clearfix">
			<div id="text-container">
				<h2>epitome networks</h2>
				<blockquote>a leader in business communications</blockquote>
			</div>
			<div id="top-tagline-bar">
				<div id="top-tagline-bar-left"></div>
				<div id="top-tagline-bar-center">We provide technologies that allow you to <br class="hide-desktop" />collaborate and communicate effectively.</div>
				<div id="top-tagline-bar-right"></div>
			</div>
		</div>
	</section>

	<section id="about-section" data-stellar-background-ratio="0.4">
		<div class="wrapper clearfix">
			<div class="box-hex">
				<h2>About Us</h2>
				<p><?php echo get_post_meta(52, "home_page_text", true); ?></p>
				<a href="<?php echo get_permalink(52); ?>">read more</a>				
			</div>
		</div>
	</section>

	<section id="services-section">
		<div class="wrapper clearfix">			
			<div id="services-inner">
				<h2>Services</h2>
				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>				

			    <ul class="service-thumbs">
                
	                <?php $loop = new WP_Query( array( 'post_type' => 'services', 'posts_per_page' => 10, 'order' => 'DESC' ) ); ?>
					<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
					<?php $static_image = (get_template_directory_uri()) . '/images/services-icons/' . str_replace(" ", "-", strtolower($post->post_title)) .'.png'; ?>
					<?php $active_image = (get_template_directory_uri()) . '/images/services-icons/' . str_replace(" ", "-", strtolower($post->post_title)) .'-hover.png'; ?>
						<li><a href="<?php the_permalink() ?>" rel="<?php the_ID(); ?>"><?php the_post_thumbnail(array(115, 115), array('class' => 'hovericons service-thumb als-item', 'rel' => $active_image, 'data-attr' => $static_image, 'data-attr-thumb' => $active_image )); ?></a></li>

						<?php endwhile; ?>
						<?php  wp_reset_query(); ?>
				</ul>			
			  			
				<div id="home-service-info" class="hide"></div>						

	            <?php endwhile; else: ?>
	                <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
	            <?php endif; ?>
						
			</div>			
		</div>
	</section>

	<section id="solutions-section">
		<div class="wrapper clearfix">			
			<div id="solutions-inner">
				<h2>Solutions</h2>
				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>				

			    <ul class="solution-thumbs">
                
	                <?php $loop = new WP_Query( array( 'post_type' => 'solutions', 'posts_per_page' => 10, 'order' => 'DESC' ) ); ?>
					<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
					<?php $static_image = (get_template_directory_uri()) . '/images/solutions-icons/' . str_replace(" ", "-", strtolower($post->post_title)) .'.png'; ?>
					<?php $active_image = (get_template_directory_uri()) . '/images/solutions-icons/' . str_replace(" ", "-", strtolower($post->post_title)) .'-hover.png'; ?>
						<li><a href="<?php the_permalink() ?>" rel="<?php the_ID(); ?>"><?php the_post_thumbnail(array(115, 115), array('class' => 'hovericons solution-thumb als-item', 'rel' => $active_image, 'data-attr' => $static_image, 'data-attr-thumb' => $active_image )); ?></a></li>

						<?php endwhile; ?>
						<?php  wp_reset_query(); ?>
				</ul>

				<div id="home-solution-info" class="hide"></div>

	            <?php endwhile; else: ?>
	                <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
	            <?php endif; ?>
						
			</div>			
		</div>
	</section>

	<section id="news-section" data-stellar-background-ratio="0.4">
		<div class="wrapper clearfix">
			<div class="box-hex">
				<h2 class="news-heading">News</h2>
				<p><?php echo get_post_meta(54, "home_page_text", true); ?></p>
				<a href="<?php echo get_permalink(54); ?>">read more</a>
			</div>
		</div>
	</section>

<?php get_footer(); ?>