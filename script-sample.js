/**Epitome scripts**/
/**set cookie**/
var cookieset;

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**mobile detector**/
(function ($) {

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    /**when dom is ready**/
	$(document).ready(function(){ 
        if( !isMobile.any()){
            $.stellar({
                horizontalScrolling: false,
                verticalOffset: 50
            });

            $('iframe').attr('scrolling', 'yes');
        }

        if( isMobile.any()) {
            $('.employee-thumbs li').localScroll({duration:1500, offset:-80, easing: 'swing'});
            $('.int-services li').localScroll({duration:1500, offset:-80, easing: 'swing'});
            $('.int-solutions li').localScroll({duration:1500, offset:-80, easing: 'swing'});
            $('.partners-list li').localScroll({duration:1500, offset:-80, easing: 'swing'});
            $('iframe body').attr('width', 300);
        }
        
        $('#home-service-info').attr('data-attr', pageid);
        $('#int-service-info').attr('data-attr', pageid);
        $('#home-solution-info').attr('data-attr', pageid);
        $('#int-solution-info').attr('data-attr', pageid);

		// Mobile Menu		
        $(".mtoggle").click(function(e) {
            $("#mmenu").slideToggle(500);
            $("#mmenu").toggleClass("active-mmenu inactive-mmenu");
            e.preventDefault();
        });   

        //scroll to next/prev section button
        var $window = $(window);
        $('.next').on('click', function(){
            $('section').each(function() {
                var pos = $(this).offset().top;   
                if ($window.scrollTop() < pos) {
                    $('html, body').animate({
                        scrollTop: pos
                    }, 1500, 'swing');
                    return false;
                }
            });
        });

        $('.previous').click(function(){
            $($('section').get().reverse()).each(function() {
                var pos = $(this).offset().top;   
                if ($window.scrollTop() > pos) {
                    $('html, body').animate({
                        scrollTop: pos
                    }, 1500, 'swing');
                    return false;
                }
            });
        });
       
        //ajax for employees
        $('.employee-thumbs a').click(function(e){
            
            post_url = $(this).attr("data-attr");  
            $.ajax({
                    url: post_url,
                    type: "GET",
                    cache: false,
                    contentType: "html",
                    success: function(data) {
                        $('#employee-info').html(data);                        
                    }
                    
                });
            e.preventDefault();
        });
                    
        //ajax for services
        if ($(window).width() >= 768) {
            $('#services-inner .service-thumbs a').click(function(e){
                
                var datathumb = $(this).find('img').attr("data-attr");
                var datathumbhover = $(this).find('img').attr("data-attr-thumb");
                
                $('.active-thumb').removeClass('active-thumb');
                $(this).addClass('active-thumb');
                $('.service-thumbs img').attr('src', datathumb);
                $('.service-thumbs img').each(function() {
                    var img = $(this).attr('data-attr');                    
                    $(this).attr('src', img);
                });

                
                $(this).find('img').attr('src', datathumbhover);                    

                post_url = $(this).attr("href");  
                $.ajax({                    
                        url: post_url,
                        type: "GET",                    
                        cache: false,
                        contentType: "html",
                        data: { '_pageid': pageid },
                        success: function(data) {
                            $('#home-service-info').html(data);
                            $('#home-service-info').hide();
                            $('#home-service-info').fadeIn();                            
                            cookieset = $.cookie('last', $('.active-thumb').attr('rel'), {path: '/services/'});  
                        }
                        
                    });

                e.preventDefault();
            });

        } else {
             
            $('#services-inner .service-thumbs a').click(function(e){
                
                var datathumb = $(this).find('img').attr("data-attr");
                var datathumbhover = $(this).find('img').attr("data-attr-thumb");
                
                $('.active-thumb').removeClass('active-thumb');
                $(this).addClass('active-thumb');
                $('.service-thumbs img').attr('src', datathumb);
                $('.service-thumbs img').each(function() {
                    var img = $(this).attr('data-attr');                    
                    $(this).attr('src', img);
                });

                $(this).attr('href', '/services/');
                cookieset = $.cookie('last', $('.active-thumb').attr('rel'), {path: '/services/'});
                window.location.href = $(this).attr('href');
                e.preventDefault;             
            });
        }

        //custom carousel
        if ($(window).width() < 1024) {
            $('.page-id-60 #main-container').find('.slider-window').removeClass('als-viewport');
            $('.page-id-60 #main-container').find('.slider-window').removeAttr('style');
        } else {
            $('.page-id-60 #main-container').find('.slider-window').addClass('als-viewport');
        }


        //interior-services-page
        $('.int-services a').click(function(e){            

            var datathumb = $(this).find('img').attr("data-attr");
            var datathumbhover = $(this).find('img').attr("data-attr-thumb");            
            
            $('.active-thumb').removeClass('active-thumb');
            $(this).addClass('active-thumb');
            $('.int-services img').attr('src', datathumb);
            $('.int-services img').each(function() {
                var img = $(this).attr('data-attr');
                $(this).attr('src', img);
            });

            
            $(this).find('img').attr('src', datathumbhover);
            

                

            post_url = $(this).attr('data-attr');  
            $.ajax({                    
                    url: post_url,
                    type: "GET",                    
                    cache: false,
                    contentType: "html",
                    data: { '_pageid': pageid },
                    success: function(data) {
                        $('#int-service-info').html(data);
                        $('#int-service-info').hide();
                        $('#int-service-info').fadeIn();   
                                            
                    }
                    
                });
            e.preventDefault();
        });


        //ajax for solutions 
        if ($(window).width() >= 768) {
            $('#solutions-inner .solution-thumbs a').click(function(e){                
                var datathumb = $(this).find('img').attr('data-attr');
                var datathumbhover = $(this).find('img').attr('data-attr-thumb');
                
                $('.active-thumb').removeClass('active-thumb');
                $(this).addClass('active-thumb');
                $('.solution-thumbs img').attr('src', datathumb);
                $('.solution-thumbs img').each(function() {
                    var img = $(this).attr('data-attr');                    
                    $(this).attr('src', img);
                });
                
                $(this).find('img').attr('src', datathumbhover);                  

                post_url = $(this).attr("href");  
                $.ajax({                    
                        url: post_url,
                        type: "GET",                    
                        cache: false,
                        contentType: "html",
                        data: { '_pageid': pageid },
                        success: function(data) {
                            $('#home-solution-info').html(data);
                            $('#home-solution-info').hide();
                            $('#home-solution-info').fadeIn();   
                            cookieset = $.cookie('last', $('.active-thumb').attr('rel'), {path: '/solutions/'});
                        }
                        
                    });
                e.preventDefault();
            });
        } else {
             
            $('#solutions-inner .solution-thumbs a').click(function(e){
                
                var datathumb = $(this).find('img').attr("data-attr");
                var datathumbhover = $(this).find('img').attr("data-attr-thumb");
                
                $('.active-thumb').removeClass('active-thumb');
                $(this).addClass('active-thumb');
                $('.solution-thumbs img').attr('src', datathumb);
                $('.solution-thumbs img').each(function() {
                    var img = $(this).attr('data-attr');                    
                    $(this).attr('src', img);
                });

                $(this).attr('href', '/solutions/');
                cookieset = $.cookie('last', $('.active-thumb').attr('rel'), {path: '/solutions/'});
                window.location.href = $(this).attr('href');
                e.preventDefault;             
            });
        }
        

        //interior-solutions-page
        $('.int-solutions a').click(function(e){

            var datathumb = $(this).find('img').attr("data-attr");
            var datathumbhover = $(this).find('img').attr("data-attr-thumb");
            
            $('.active-thumb').removeClass('active-thumb');
            $(this).addClass('active-thumb');
            $('.int-solutions img').attr('src', datathumb);
            $(".int-solutions img").each(function() {
                var img = $(this).attr('data-attr');
                $(this).attr('src', img);
            });

            
            $(this).find('img').attr('src', datathumbhover);

            post_url = $(this).attr("data-attr");  
            $.ajax({                    
                    url: post_url,
                    type: "GET",                    
                    cache: false,
                    contentType: "html",
                    data: { '_pageid': pageid },
                    success: function(data) {
                        $('#int-solution-info').html(data);
                        $('#int-solution-info').hide();
                        $('#int-solution-info').fadeIn();   
                                            
                    }
                    
                });
            e.preventDefault();
        });        
        
        //ajax for partners
        $('.pulliframe a').click(function(e){
            $('.current-li').removeClass('current-li');
            $(this).parents('li:first').addClass('current-li');           

            post_url = $(this).attr("data-attr");  
            $.ajax({
                    url: post_url,
                    type: "GET",
                    cache: false,
                    contentType: "html",
                    success: function(data) {
                        $('#partner-info').html(data);                                         
                        $('#partner-info').hide();
                        //$('.pulliframe a').hide();
                        $('iframe').fadeIn();
                        $('iframe').attr('src', $('.current-li').attr('data-attribute'));
                        $('.close-frame-button').fadeIn();                        
                        e.preventDefault();
                       

                        $('.close-frame-button').click(function(e){                        
                            $('#partner-info').fadeIn();
                            //$('.pulliframe a').fadeIn();
                            $('iframe').hide();
                            $('.close-frame-button').hide();
                            e.preventDefault();
                            
                        });
                     }
                    
                });
                e.preventDefault();

            });
        if ($(window).width() >= 768) {
            $('.pulliframe a').first().click();
        }

        //contact page
        $('.contact-form').click(function(e){
            $('.contact-info').hide();
            $('.support-show').hide();
            if ($(window).width() < 768) {
                $('.contact-buttons').hide();
            }

            $('.contact-show').fadeIn();            
            e.preventDefault();
        });

        $('.support-form').click(function(e){
            $('.contact-info').hide();
            $('.contact-show').hide();
            if ($(window).width() < 768) {
                $('.contact-buttons').hide();
            }
            $('.support-show').fadeIn();
            e.preventDefault();
        });

        $('.close-button img').click(function(e) {
            $('.contact-info').fadeIn();
            $('.contact-show').hide();

            if ($(window).width() < 768) {
                $('.contact-buttons').show();
            }

            $('.support-show').hide();
            e.preventDefault();  
        });

        //media queries
        if ($(window).width() < 480) {
            var logoheight = ($('#top-section').height()/2) - 100;
            $('#text-container').css('top', logoheight);

            var aboutheight = ($('#about-section').height()/2) - 135;
            $('#about-section .box-hex').css('top', aboutheight);

            var newsheight = ($('#news-section').height()/2) - 135;
            $('#news-section .box-hex').css('top', newsheight);

            var servicesinnerheight = ($('#services-section').height()/2) - 195;
            $('#services-inner').css('top', servicesinnerheight);

            var solutionsinnerheight = ($('#solutions-section').height()/2) - 180;
            $('#solutions-inner').css('top', solutionsinnerheight);            
        } 
        
        else if ($(window).width() < 768) {     
            var logoheight = ($('#top-section').height()/2) - 50;
            $('#text-container').css('top', logoheight);

            var aboutheight = ($('#about-section').height()/2) - 122;
            $('#about-section .box-hex').css('top', aboutheight);

            var newsheight = ($('#news-section').height()/2) - 122;
            $('#news-section .box-hex').css('top', newsheight);

            var servicesinnerheight = ($('#services-section').height()/2) - 120;
            $('#services-inner').css('top', servicesinnerheight);

            var solutionsinnerheight = ($('#solutions-section').height()/2) - 120;
            $('#solutions-inner').css('top', solutionsinnerheight);           
        } 

        else if ($(window).width() < 1024) {     
            var logoheight = ($('#top-section').height()/2) - 70;
            $('#text-container').css('top', logoheight);  

            var aboutheight = ($('#about-section').height()/2) - 192;
            $('#about-section .box-hex').css('top', aboutheight);

            var newsheight = ($('#news-section').height()/2) - 192;
            $('#news-section .box-hex').css('top', newsheight);

            var servicesinnerheight = ($('#services-section').height()/2) -260;
            $('#services-inner').css('top', servicesinnerheight);

            var solutionsinnerheight = ($('#solutions-section').height()/2) -260;
            $('#solutions-inner').css('top', solutionsinnerheight);
        }

        else {
            var logoheight = ($('#top-section').height()/2) - 95;
            $('#text-container').css('top', logoheight);

            var aboutheight = ($('#about-section').height()/2) - 275;
            $('#about-section .box-hex').css('top', aboutheight);

            var newsheight = ($('#news-section').height()/2) - 275;
            $('#news-section .box-hex').css('top', newsheight);

            var servicesinnerheight = ($('#services-section').height()/2) -265;
            $('#services-inner').css('top', servicesinnerheight);

            var solutionsinnerheight = ($('#solutions-section').height()/2) -265;
            $('#solutions-inner').css('top', solutionsinnerheight);
        }  

        //rollover swap images with rel 
        var img_src = ""; 
        var new_src = "";   

        $(".rollover").hover(function(){ 
            //mouseover   
            img_src = $(this).attr('src'); //grab original image 
            new_src = $(this).attr('rel'); //grab rollover image 
            $(this).attr('src', new_src);  //swap images 
            $(this).attr('rel', img_src);  //swap images   
            },

            function(){ 
            //mouse out   
            $(this).attr('src', img_src);  //swap images 
            $(this).attr('rel', new_src);  //swap images 
        });        

        //preload images 
        var cache = new Array(); 
        //cycle through all rollover elements and add rollover img src to cache array 
        $(".rollover").each(function(){ 
            var cacheImage = document.createElement('img'); 
            cacheImage.src = $(this).attr('rel'); 
            cache.push(cacheImage); 

        });


        //rollover swap images with data-attr-thumb 
        var datathumb = ""; 
        var datathumbhover = "";  

        $(".hovericons").hover(function(){ 
            //mouseover   
            datathumb = $(this).attr("data-attr");
            datathumbhover = $(this).attr("data-attr-thumb");
            $(this).attr('src', datathumbhover);
            
            },

            function(){ 
            //mouse out
            if($(this).parent().hasClass('active-thumb')) { 
                $(this).attr('src', datathumbhover);  //swap images 
            } else {
                $(this).attr('src', datathumb);  //swap images 
            }
        });        

        //preload images 
        var cache = new Array(); 
        //cycle through all rollover elements and add rollover img src to cache array 
        $(".hovericons").each(function(){ 
            var cacheImage = document.createElement('img'); 
            cacheImage.src = $(this).attr('rel'); 
            cache.push(cacheImage); 

        });       

        $('.als-next').click(function() {
            $(this).addClass('hide');
            $(this).removeClass('show-largemobile');
            $(this).removeClass('show');
            $('.als-prev').addClass('show');
            $('.als-wrapper').animate({"left": "-294px"}, "slow");
        });

        $('.als-prev').click(function() {
            $(this).addClass('hide');
            $(this).removeClass('show');
            $('.als-next').removeClass('hide');
            $('.als-next').addClass('show');
            $('.als-wrapper').animate({"left": "0"}, "slow");
        });
        
	});

        $(document).mouseup(function (e) {
            var servicescontainer = $('#home-service-info');

            if (!servicescontainer.is(e.target)
                && servicescontainer.has(e.target).length === 0) {
                servicescontainer.hide();
                
                if ($(window).width() >= 768) {

                    var datathumb = $('.active-thumb').find('img').attr("data-attr");
                    $('#services-inner .service-thumbs img').attr('src', datathumb);

                    $("#services-inner .service-thumbs img").each(function() {
                        var img = $(this).attr('data-attr');                                          
                        $(this).attr('src', img);
                    });
                }
            }

            var solutionscontainer = $('#home-solution-info');

            if (!solutionscontainer.is(e.target)
                && solutionscontainer.has(e.target).length === 0)
            {
                solutionscontainer.hide();
                
                if ($(window).width() >= 768) {

                    var datathumb = $('.active-thumb').find('img').attr("data-attr");
                    $('#solutions-inner .solution-thumbs img').attr('src', datathumb);
                    $("#solutions-inner .solution-thumbs img").each(function() {
                        var img = $(this).attr('data-attr');
                        $(this).attr('src', img);
                    });
                }
            }
        });

        //resize media queries
	    $(window).resize(function() {

            if ($(window).width() < 480) {
                var logoheight = ($('#top-section').height()/2) - 100;
                $('#text-container').css('top', logoheight);

                var aboutheight = ($('#about-section').height()/2) - 135;
                $('#about-section .box-hex').css('top', aboutheight);

                var newsheight = ($('#news-section').height()/2) - 135;
                $('#news-section .box-hex').css('top', newsheight);

                var servicesinnerheight = ($('#services-section').height()/2) - 195;
                $('#services-inner').css('top', servicesinnerheight);

                var solutionsinnerheight = ($('#solutions-section').height()/2) - 180;
                $('#solutions-inner').css('top', solutionsinnerheight);
            } 
            
            else if ($(window).width() < 768) {     
                var logoheight = ($('#top-section').height()/2) - 50;
                $('#text-container').css('top', logoheight);

                var aboutheight = ($('#about-section').height()/2) - 122;
                $('#about-section .box-hex').css('top', aboutheight);

                var newsheight = ($('#news-section').height()/2) - 122;
                $('#news-section .box-hex').css('top', newsheight);

                var servicesinnerheight = ($('#services-section').height()/2) - 120;
                $('#services-inner').css('top', servicesinnerheight);

                var solutionsinnerheight = ($('#solutions-section').height()/2) - 120;
                $('#solutions-inner').css('top', solutionsinnerheight);
            } 

            else if ($(window).width() < 1024) {     
                var logoheight = ($('#top-section').height()/2) - 70;
                $('#text-container').css('top', logoheight);  

                var aboutheight = ($('#about-section').height()/2) - 192;
                $('#about-section .box-hex').css('top', aboutheight);

                var newsheight = ($('#news-section').height()/2) - 192;
                $('#news-section .box-hex').css('top', newsheight);

                var servicesinnerheight = ($('#services-section').height()/2) - 260;
                $('#services-inner').css('top', servicesinnerheight);

                var solutionsinnerheight = ($('#solutions-section').height()/2) - 260;
                $('#solutions-inner').css('top', solutionsinnerheight);
            }

            else {
                var logoheight = ($('#top-section').height()/2) - 95;
                $('#text-container').css('top', logoheight);

                var aboutheight = ($('#about-section').height()/2) - 275;
                $('#about-section .box-hex').css('top', aboutheight);

                var newsheight = ($('#news-section').height()/2) - 275;
                $('#news-section .box-hex').css('top', newsheight);

                var servicesinnerheight = ($('#services-section').height()/2) -265;
                $('#services-inner').css('top', servicesinnerheight);

                var solutionsinnerheight = ($('#solutions-section').height()/2) -265;
                $('#solutions-inner').css('top', solutionsinnerheight);
            }

            if ($(window).width() < 1024) {
                $('.page-id-60 #main-container').find('.slider-window').removeClass('als-viewport');
                $('.page-id-60 #main-container').find('.slider-window').removeAttr('style');
            } else {
                $('.page-id-60 #main-container').find('.slider-window').addClass('als-viewport');
            }

	    });

        //images have loaded
        window.onload = function() {


            $("#mmenu").addClass('inactive-mmenu'); 
            
            

            if($('body').find('.int-services').length > 0){                
                var _id = readCookie('last');
                var _obj = $('a[rel="'+_id+'"]');               
                _obj.trigger('click');
                if ($(window).width() >= 768) { 
                    if($('.service-thumbs li').index($('.active-thumb').parent('li')) > 5) {
                        $('.als-next img').trigger('click');
                    }
                } 
            }

            if($('body').find('.int-solutions').length > 0){                
                var _id = readCookie('last');
                var _obj = $('a[rel="'+_id+'"]');                
                _obj.trigger('click');
            }

            if($('body').find('.int-services').length < 1){  
                cookieset = $.cookie('last', '0', {path: '/services/'});
            } else {
                if(readCookie('last') == 0) {
                    $('.int-services a').first().click();
                }
            }

            if($('body').find('.int-solutions').length < 1){  
                cookieset = $.cookie('last', '0', {path: '/solutions/'});
            } else {
                if(readCookie('last') == 0) {
                    $('.int-solutions a').first().click();
                }
            }


        };
        

})(jQuery);