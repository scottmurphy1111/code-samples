<?php /* Start loop */ ?>
<?php while (have_posts()) : the_post(); ?>
	
		<article <?php post_class() ?> id="product-<?php the_ID(); ?>">
			<div class="entry-content">
				<div class="grid_9 alpha">
				
					<div class="primary-product-photo-container">
						<div class="primary-product-photo">
							<div class="primary-product-photo-inner">
								<?php the_post_thumbnail('primary'); ?>
							</div>
							<div class="shop-now-icon-outer">
								<div class="shop-now-icon-inner">

									<span>
										<?php if($post->post_name === 'calabrese' || $post->post_name === 'chorizo' || $post->post_name === 'hot-chorizo' || $post->post_name === 'molisana' || $post->post_name === 'napoli' || $post->post_name === 'norcino' || $post->post_name === 'pepperoni' || $post->post_name === 'toscano' || $post->post_name === 'tartufo' || $post->post_name === 'wild-boar') { ?>
										<a href="<?php home_url(); ?>/product/salame-mix-and-match-pick-3/">SHOP<br />NOW</a>
										<?php } elseif($post->post_name === 'organic-norcino' || $post->post_name === 'organic-hot-chorizo' || $post->post_name === 'organic-molisana') { ?>
										<a href="<?php home_url(); ?>/product/organic-salame-mix-and-match-pick-3/">SHOP<br />NOW</a>
										<?php } elseif($post->post_name === 'calabrese-salamini' || $post->post_name === 'norcino-salamini' || $post->post_name === 'napoli-salamini' || $post->post_name === 'pepperoni-salamini') { ?>
										<a href="<?php home_url(); ?>/product/salamini-mix-and-match-pick-4/">SHOP<br />NOW</a>
										<?php } elseif($post->post_name === 'bresaola' || $post->post_name === 'hot-coppa' || $post->post_name === 'speck' || $post->post_name === 'duroc-prosciutto' || $post->post_name === 'sweet-coppa' || $post->post_name === 'berkshire-prosciutto-becker-lane-farms' || $post->post_name === 'mangalitsa-prosciutto' || $post->post_name === 'barley-fed-berkshire-prosciutto' || $post->post_name === 'prosciutto-di-paolo-sliced' ) { ?>
										<a href="<?php home_url(); ?>/product-category/shop-prosciutto/">SHOP<br />NOW</a>
										<?php } elseif($post->post_name === 'guanciale' || $post->post_name === 'lardo' || $post->post_name === 'pancetta' ) { ?>
										<a href="<?php home_url(); ?>/product-category/cooking-fats/">SHOP<br />NOW</a>
										<?php } elseif($post->post_name === 'large-maple-cutting-board' || $post->post_name === 'small-maple-cutting-board' || $post->post_name === 'large-pecan-cutting-board' || $post->post_name === 'small-pecan-cutting-board' ) { ?>
										<a href="<?php home_url(); ?>/product-category/cutting-boards/">SHOP<br />NOW</a>
										<?php } ?>
									</span>
								</div>
							</div>
						</div>				
					</div>

					<div class="ourproduct-info-container">
						<div class="product-nutrition-info">
							<?php $nutritionimage = $post->post_name; ?>
							<div class="<?php echo $nutritionimage ?>-label-pic"></div>
							<?php if($post->post_parent !== 8180 ) {?>
								<div class="nutrition-pic-bar"><a class="cbox-link" href="<?php home_url(); ?>/assets/natural-salamini.png">Nutrition Facts</a></div>

							<?php }  ?>

						</div>
						<div class="product-details-info">
							<h2><?php the_title(); ?></h2>
							<p class="excerpt"><?php the_excerpt(); ?></p>
							<?php

							$flavor = get_post_meta($post->ID,'olli_product-flavor', true);
							if($flavor){
								echo "<p class=\"flavor-entry\">FLAVOR PROFILE:  ".strtoupper($flavor)."</p>";
							} 

							?>
							<p>
						</div>
					</div>

					<?php wp_reset_postdata(); ?>	
					<h2>More Products</h2>
					<ul class="rand-products">

						<?php $args = array(
						'post_type' 		=> 'ourproducts',
						'taxonomy' 			=> 'producttype',
						'orderby'			=> 'rand',
						'posts_per_page'	=> '3',
						'post__not_in'		=> array($post->ID,8179,8180,8175,8178,8181,8176,8177)
						);
						$query = new WP_Query( $args );
						while ($query->have_posts()) : $query->the_post();  ?>
							<?php

							$homelink = home_url();
							$prodlink = $post->post_name;							

							?>

						
							<li>
								<a href="<?php echo $homelink . "/our-products/" . $prodlink ?>" /><img src="<?php echo $homelink; echo get_template_directory_uri() . "/img/random/" . $prodlink . "-label.jpg"?>" /></a>
								<p style="text-align:center;"><?php the_title(); ?></p>
							</li>
						<?php wp_reset_postdata(); ?>
						<?php endwhile; ?>
					</ul>
					
				</div>			
		</article>
<?php endwhile; // End the loop ?>