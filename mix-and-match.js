/**Mix and Match for Olli**/
jQuery(document).ready(function() {	
	var _c = 0;
		jQuery('a.product_gallery').click(function(){
		jQuery('.primary-product-photo .product_gallery').html("<img src='"+jQuery(this).attr('href')+" class='primaryborderimage'>");
		return false;
	});

	jQuery('.shop-category-image-placeholder').hover(function(){
		jQuery(this).find('.overlay').slideToggle();
	});

	var errorExists = 0,
	currentPrice = 39.99;
	
	jQuery('#options li').draggable({
		appendTo: "body",
		helper: "clone",
		stop: function() {
			_c = $('#choices li').length;
			_cname = $('#choices li:nth('+(_c - 1)+')').attr('id');

			function selectedChoices(select) {
				switch(select) {
					case "molisana":
						$('.product-addon-choice-'+_c+" option[value='molisana-1']").attr('selected', 'selected').change();
					break;

					case "norcino":
						$('.product-addon-choice-'+_c+" option[value='norcino-2']").attr('selected', 'selected').change();
					break;

					case "tartufo":
						$('.product-addon-choice-'+_c+" option[value='tartufo-3']").attr('selected', 'selected').change();
					break;

					case "wildBoar":
						$('.product-addon-choice-'+_c+" option[value='wild-boar-4']").attr('selected', 'selected').change();
					break;

					case "toscano":
						$('.product-addon-choice-'+_c+" option[value='toscano-5']").attr('selected', 'selected').change();
					break;

					case "calabrese":
						$('.product-addon-choice-'+_c+" option[value='calabrese-6']").attr('selected', 'selected').change();
					break;

					case "napoli":
						$('.product-addon-choice-'+_c+" option[value='napoli-7']").attr('selected', 'selected').change();
					break;

					case "chorizo":
						$('.product-addon-choice-'+_c+" option[value='chorizo-8']").attr('selected', 'selected').change();
					break;

					case "pepperoni":
						$('.product-addon-choice-'+_c+" option[value='pepperoni-9']").attr('selected', 'selected').change();
					break;

					default: 
						$('.product-addon-choice-'+_c+" option[value='']").attr('selected', 'selected').change();
					break;
				}
			};
			
			selectedChoices(_cname);
			
			$choices 	= jQuery('#choices');
			selections 	= $choices.find('li').length;
			
			if (selections == 3) {
				$('.shopp-description').css('height', '200px');
				$('.shopp-product-quantity').show();
				$('.shopp-product-add-to-cart').show();
			}
			
			
		}

	}).click(function() {
		var $this = jQuery(this);
		
		if ( $this.is('.ui-draggable-dragging') ) {
			return;
		}
		
		jQuery('li.ui-sortable-placeholder').remove();
		var	selection 	= $this,
			$choices 	= jQuery('#choices'),
			$selectId 	= selection.attr('id'),
			$selectHTML = selection.html(), 
			selections 	= $choices.find('li').length,
			$option1 	= jQuery('#product-addons-1'),
			$option2 	= jQuery('#product-addons-2'),
			$option3 	= jQuery('#product-addons-3'),
			$thisName 	= selection.data('name');
		
			if (selections == 3) { return false;}
			
			jQuery("<li></li>").html( $selectHTML )
				.appendTo($choices)
				.attr('id', $selectId)
				.attr('data-choice-num', selections+1)
				.addClass('cart-item')
				.insertAfter($thisName);
			

			addPrice($selectId);			

			selections = $choices.find('li').length;
			
			if (selections == 1) {
				var productId = productId($selectId, 0);
				$option1.find('option[value='+productId+']').prop('selected', true);
			} else if (selections == 2) {
				var productId = productId($selectId, 1);
				$option2.find('option[value='+productId+']').prop('selected', true);	
				selection.data('select-num', 2);
			} else if (selections == 3) {
				var productId = productId($selectId, 2);
				$option3.find('option[value='+productId+']').prop('selected', true);	
				selection.data('select-num', 3);
			}
			
			if (selections == 3) {
				$('.shopp-description').css('height', '200px');
				$('.shopp-product-quantity').show();
				$('.shopp-product-add-to-cart').show();
			}

			_c = $('#choices li').length;
			_cname = $('#choices li:nth('+(_c - 1)+')').attr('id');

			selectedChoices(_cname);

	});
		
	jQuery('#shopp').on('click', '#choices li', function(event) {
		var $this 		= jQuery(this),
			choiceNum 	= $this.data('choice-num'),
			$option1 	= jQuery('.product-addon-choice-1').find('option:selected').attr('value'),
			$option2 	= jQuery('.product-addon-choice-2').find('option:selected').attr('value'),
			$option3 	= jQuery('.product-addon-choice-3').find('option:selected').attr('value'),
			$choice1 	= jQuery('[data-choice-num="1"]').attr('id'),
			$choice2 	= jQuery('[data-choice-num="2"]').attr('id'),
			$choice3 	= jQuery('[data-choice-num="3"]').attr('id'),
			$choices 	= jQuery('#choices'),			 
			numChoices 	= $this.parent().find('li').length;			
			
			$choice1    = choiceMade($choice1);
			$choice2    = choiceMade($choice2);
			$choice3    = choiceMade($choice3);

		$this.remove();	

			if ($this.attr('id') == 'tartufo') {				
				currentPrice = currentPrice - 1.50;
				jQuery('.price, .mobile-price').text('$' + currentPrice);
			} else if ($this.attr('id') == 'wildBoar') {
				currentPrice = currentPrice - 3;				
				jQuery('.price, .mobile-price').text('$' + currentPrice);
			} else {
				currentPrice = currentPrice;
				jQuery('.price, .mobile-price').text('$' + currentPrice);
			}

			jQuery('#price, .mobile-price').text('$' + currentPrice);


		if (numChoices === 1) { 			
			$('.product-addon-choice-1 option').removeAttr('selected');
		} 
		else if (numChoices === 2) {
			if (choiceNum === 1) {
				$(".product-addon-choice-1 option").removeAttr('selected');
				$(".product-addon-choice-1 option[value='"+$option2+"']").attr('selected', 'selected');
				$('#choices li:first-child').attr('data-choice-num', 1);
				$('.product-addon-choice-2 option').removeAttr('selected');
			} else if (choiceNum === 2) {
				$('.product-addon-choice-2 option').removeAttr('selected');
			}
		}
		else if (numChoices === 3) {
			$('.shopp-description').css('height', '174px');
			$('.shopp-product-quantity').hide();
			$('.shopp-product-add-to-cart').hide();
			if (choiceNum === 1) {
				$(".product-addon-choice-1 option").removeAttr('selected');
				$(".product-addon-choice-1 option[value='"+$option2+"']").attr('selected', 'selected');
				$(".product-addon-choice-2 option").removeAttr('selected');
				$(".product-addon-choice-2 option[value='"+$option3+"']").attr('selected', 'selected');
				$('#choices li:nth-child(1)').attr('data-choice-num', 1);
				$('#choices li:nth-child(2)').attr('data-choice-num', 2);
				$('.product-addon-choice-3 option').removeAttr('selected');
			}
			else if (choiceNum === 2) {
				$(".product-addon-choice-2 option").removeAttr('selected');
				$(".product-addon-choice-2 option[value='"+$option3+"']").attr('selected', 'selected');
				$('#choices li:nth-child(2)').attr('data-choice-num', 2);
				$('.product-addon-choice-3 option').removeAttr('selected');
			} else if (choiceNum === 3) {
				$('.product-addon-choice-3 option').removeAttr('selected');
			}
		}		

		function choiceMade(choice) {
				switch(choice) {
					case "molisana":
						return "molisana-1";						
					break;

					case "norcino":
						return "norcino-2";
					break;

					case "tartufo":
						return "tartufo-3";
					break;

					case "wildBoar":
						return "wild-boar-4";
					break;

					case "toscano":
						return "toscano-5";
					break;

					case "calabrese":
						return "calabrese-6";
					break;

					case "napoli":
						return "napoli-7";
					break;

					case "chorizo":
						return "chorizo-8";
					break;

					case "pepperoni":
						return "pepperoni-9";
					break;

					default: 
						return "";
					break; 
				}
			}
   	});
   	
	jQuery('#choices').droppable({
		activeClass: 'ui-state-default',
		hoverClass: 'ui-state-hover',
		accept: ":not(.ui-sortable-helper)",
		drop: function(ev, ui) {			
			jQuery('li.ui-sortable-placeholder').remove();
			var $this 		= jQuery(this);
			var	selection 	= ui.draggable,
				$selectId 	= selection.attr('id'),
				$selectHTML = selection.html(), 
				selections 	= $this.find('li').length,
				$option1 	= jQuery('#product-addons-1'),
				$option2 	= jQuery('#product-addons-2'),
				$option3 	= jQuery('#product-addons-3'),
				$thisName 	= selection.data('name');			
			
			if (selections == 3) { return false;}
			
			jQuery("<li></li>").html( $selectHTML )
				.appendTo(this)
				.attr('id', $selectId)
				.attr('data-choice-num', selections+1)
				.addClass('cart-item')
				.insertAfter($thisName);
			
			addPrice($selectId);
			selections = $this.find('li').length;
			
			if (selections == 1) {
				var productId = productId($selectId, 0);
				$option1.find('option[value='+productId+']').prop('selected', true);
			} else if (selections == 2) {
				var productId = productId($selectId, 1);
				$option2.find('option[value='+productId+']').prop('selected', true);	
				selection.data('select-num', 2);
			} else if (selections == 3) {
				var productId = productId($selectId, 2);
				$option3.find('option[value='+productId+']').prop('selected', true);	
				selection.data('select-num', 3);
			}
			
		},
	});

	function addPrice($selectId) {
		if ($selectId == 'tartufo') {
				currentPrice = currentPrice + 1.50;
			} else if ($selectId == 'wildBoar') {
				currentPrice = currentPrice + 3;
			} else {
				currentPrice = currentPrice;
			}

		jQuery('.price, .mobile-price').text('$' + currentPrice);
	}
});