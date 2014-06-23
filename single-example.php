<?php $currentpage = $_GET['_pageid']; ?>
        				
<?php

	//services home
	if($post->post_type == 'services' && $currentpage == 4) { ?>
		
		<div class="single-post post-<?php the_ID(); ?>">
			<p><strong><?php the_title(); ?></strong>: <?php echo $post->post_excerpt; ?></p>
			<a class="readmore-link" href="/services/">Read More</a>
			<br />
		</div>

<?php 

	//solutions home
	} elseif($post->post_type == 'solutions' && $currentpage == 4) { ?>		
		<div id="solutions" class="single-post post-<?php the_ID(); ?>">
			<p><strong><?php the_title(); ?></strong>: <?php echo $post->post_excerpt; ?></p>
			<a class="readmore-link" href="/solutions/">Read More</a>
			<br />
		</div>
<?php

	//blog single
	} elseif($post->post_type == 'post') { ?>

		<?php get_header(); ?>

		<div id="page-container">
			<div id="main-container">
				<section class="wrapper clearfix">					
					<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
			            <header>    
			                <h2><?php the_title();?></h2>
			                <p><?php echo get_the_date(); ?></p>
			                <hr class="news-hr" />
			            </header>						                
	                	<?php the_post_thumbnail(array(200, 200), array('class' => 'blog-thumb')); ?>
		                <?php the_content();?>
		                <a class="news-back" href="/news">Back to News</a>		                
		            <?php endwhile; else: ?>
		                <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
		            <?php endif; ?>		            
				</section>
			</div>		
		</div>

		<?php get_footer(); ?>
<?php

	//interior pages
	} else { 

		switch($post->post_type) {
			case 'employees' : 
		?>

		<div class="single-post post-<?php the_ID(); ?>">	
			<h3 class="emp-title"><?php the_title(); ?></h3>
			<?php $email = get_post_meta(get_the_ID(), 'email', true); ?>
			<p class="email-text"><?php echo $email; ?></p>
			<p><?php echo $post->post_excerpt; ?></p>
		</div>

			<?php break; ?>

		<?php
			case 'services' :		
		?>

		<div class="single-post post-<?php the_ID(); ?>">
			<h3><?php the_title(); ?></h3>
			<p><?php echo $post->post_content; ?></p>
			<br />
			<a class="partners-link" href="/partners">Our Strategic Partners</a>
		</div>

			<?php break; ?>

		<?php
			case 'solutions' :
		?>
		
		<div class="single-post post-<?php the_ID(); ?>">
			<h3><?php the_title(); ?></h3>
			<p><?php echo $post->post_content; ?></p>	
		</div>					
			<?php break; ?>

		<?php 
			default:						
				break;
		
		} 
	} ?>