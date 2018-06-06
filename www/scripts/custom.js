//Preloader
$(window).on('load',function() {
	//Get page name
    var path = window.location.pathname;
    var page = path.split("/").pop();

    //On this pages custom preload will be defined
    if(page != "home.html" && page != "query.html" && page != "sources.html" && page != "article.html" && page != "profile.html"){
	    setTimeout(function(){$("#preloader").addClass('hide-preloader');},250);
	    $('#preloader').addClass('hide-objects');
	    $('body').prepend('<div class="page-change-preloader preloader-bg"><div id="preload-spinner"></div></div>');
    }
});


$(document).ready(function(){
    'use strict'
    function init_template(){

	/*
		// For Play Store without users

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDISnXF3r9Kae3gxFV2EAQ8YTvLCdduiEg",
            authDomain: "newly-49f97.firebaseapp.com",
            databaseURL: "https://newly-49f97.firebaseio.com",
            projectId: "newly-49f97",
            storageBucket: "newly-49f97.appspot.com",
            messagingSenderId: "655466437417"
        };
        firebase.initializeApp(config);


        firebase.auth().onAuthStateChanged(function(user) {
            var path = window.location.pathname;
            var page = path.split("/").pop();
            if (user) {
                if(user.isAnonymous)
                    localStorage.setItem('profile', false);
                else {
                	if(!user.displayName)
                        user.updateProfile({
                            displayName: window.localStorage.getItem('userName')
						});
                	window.localStorage.setItem('userName', user.displayName);
                	window.localStorage.setItem('userEmail', user.email);
				}

                if(page != 'home.html' && page != 'profile.html')
                window.location.href = 'home.html';
            } else {
                if(page != 'login.html' && page != 'index.html' && page != 'register.html')
                window.location.href = 'login.html';
            }
        });
		*/



		// Menus
		setTimeout(function(){
			$('#header, .scale-hover').css('transition','all 350ms ease');
			$('.menu-wrapper').addClass('activate-page');
		},250);
		$('.page-content-scroll').css('min-height', ($(window).height()));
		var page_height = $(window).height();
		$('#page-content').css({'min-height':page_height})
		$('.center-text-page').css('height', ($(window).height()) - 55);

		$('.menu-bottom').each(function(i) {
			var data_menu_size = $(this).data('menu-size');
        	$(this).css({'height':data_menu_size, 'transition': 'all 0ms ease', 'transform': 'translateY(' + data_menu_size + 'px)'});
    	});

        $('.menu-modal').each(function(i) {
            var data_menu_size = $(this).data('menu-size');
            var data_menu_size_negative = (data_menu_size/2)*(-1);
            $(this).css({'height':data_menu_size, 'margin-top':data_menu_size_negative, 'transition': 'all 0ms ease'});
        });
        setTimeout(function(){$('.menu-modal').css({'transition': 'all 250ms ease'});},150);
		setTimeout(function(){$('.menu-bottom').css({'transition': 'all 350ms ease'});},150);

		//Div for background wenn menu is active - for closing
		$('#page-transitions').append('<div class="delete-menu"></div>');

		//Tell link which menu to deploy
		$('a[data-deploy-menu]').on( "click", function(){
			submenu_icon()
			$('.menu-wrapper').removeClass('active-menu');
			var menu_ident = $(this).data('deploy-menu');
			$('#'+menu_ident).toggleClass('active-menu');
			$('.page-content').removeClass('body-left');

			if($(this).hasClass('deploy-perspective-left')){
				setTimeout(function(){$('#header').removeClass('body-left');},5);
				setTimeout(function(){$('#page-content').removeClass('body-left');},5);
				$('#header').addClass('perspective-left-header');
				$('#page-content').addClass('perspective-left');
				$('.delete-menu').addClass('perspective-delete');
			}

			if($(this).hasClass('dismiss-with-button')){} else {
				if($('.menu-sidebar').hasClass('active-menu')){$('.page-content, #header').addClass('body-left');}
				if($('.menu-bottom').hasClass('active-menu')){$('.page-content, #header').addClass('body-bottom');}
				$('.delete-menu').addClass('delete-menu-active');
			}
		});

		$('.delete-menu, .close-menu').on('click', function(){
			$(this).removeClass('perspective-delete');
			$('.search-results').addClass('disabled-search-list');
			$('[data-search]').val('');
			$('.menu-wrapper').removeClass('active-menu');
			$('.page-content, #header').removeClass('body-left body-right body-top body-bottom perspective-left perspective-left-header perspective-right perspective-right-header');
			$('.delete-menu').removeClass('delete-menu-active');
			setTimeout(function(){$('.hamburger-animated em, .dropdown-animated em, .plushide-animated em').removeClass('hm1a hm2a hm3a dm1a dm2a ph1a ph2a');},30);
		});

        //Hamburger icon header
        $('.hamburger-animated').html('<em class="hm1"></em><em class="hm2"></em><em class="hm3"></em>');
        $('.hamburger-animated').on("click",function(){$(this).find('.hm1').toggleClass('hm1a'); $(this).find('.hm2').toggleClass('hm2a'); $(this).find('.hm3').toggleClass('hm3a'); });

		function submenu_icon(){
			if($('a[data-submenu]').hasClass('active-item')){
				var sub_data = $('.active-item').attr('data-submenu');
				var sub_id =  $('#'+sub_data)
				var sub_nr = $('#'+sub_data).children().length;
				setTimeout(function(){$('.active-item').find('.ph1, .ph2').addClass('ph1a ph2a'); },150);
				sub_id.css("height", sub_nr * 50)
			}
			$('.submenu-item a').prepend('<i class="fa fa-angle-right"></i>');
		}

		//Back Button
		$('.back-button').on('click', function(){
			$('#page-transitions').addClass('back-button-clicked');
			$('#page-transitions').removeClass('back-button-not-clicked');
			window.history.go(-1);
		});

		//Tabs
		$('.active-tab').slideDown(0);
		$('a[data-tab]').on( "click", function(){
			var tab_number = $(this).data('tab');
			$(this).parent().find('[data-tab]').removeClass('active-tab-button');
			$(this).parent().parent().find('.tab-titles a').removeClass('active-tab-button');
			$(this).addClass('active-tab-button');
			$(this).parent().parent().find('.tab-item').slideUp(200);
			$('#'+tab_number).slideDown(200);
		});

        //Show Back To Home When Scrolling
        $(window).on('scroll', function () {
            var total_scroll_height = document.body.scrollHeight
            var inside_header = ($(this).scrollTop() <= 200);
            var passed_header = ($(this).scrollTop() >= 0); //250
            var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() + 300 )));

            if (inside_header === true) {
				$('.badge-position').removeClass('show-store-product-button');
				$('.back-to-top-badge').removeClass('back-to-top-badge-visible');
            } else if(passed_header === true){
				$('.badge-position').addClass('show-store-product-button');
				$('.back-to-top-badge').addClass('back-to-top-badge-visible');
			} if (footer_reached == true){
				$('.badge-position').removeClass('show-store-product-button');
				$('.back-to-top-badge').removeClass('back-to-top-badge-visible');
			}
        });

        //Back to top Badge
        $('.back-to-top-badge, .back-to-top').on("click", function(e){
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, 1000);
        });

		//Reading Line
		$(window).scroll(function() {
			var wintop = $(window).scrollTop(), docheight = $('#page-content').height(), winheight = $(window).height();
			var totalScroll = (wintop/(docheight-winheight))*100;
			$(".reading-line").css("width",totalScroll+"%");
		});

		//Tutorial Slider - Owl Carousel Plugin
		setTimeout(function(){
			$('.tutorial-slider').owlCarousel({loop:false, nav:false, items:1, autoplay: false, autoplayTimeout:3500});
			$('.next-slide-arrow, .next-slide-text, .next-slide-custom').on('click',function(){$(this).parent().find('.owl-carousel').trigger('next.owl.carousel');});
		},100);

		//Fullpage size
		setTimeout(function(){resize_coverpage();},250);
		$(window).on('resize', function(){resize_coverpage();})

		function resize_coverpage(){
			var cover_height = $(window).height();
			var cover_width = $(window).width();
			if($('.page-content-full').length > 0){
				var header_height = "0";
			} else{
				var header_height = "55";
			}

			$('.cover-item').css({"height":(cover_height - header_height), "width":cover_width})
			$('.cover-item-full').css({"margin-top": header_height * (-1), "height":cover_height, "width":cover_width})
			$('.coverpage-full .cover-item').css({"height":cover_height, "width":cover_width});
			$('.coverpage-full').css({"margin-top": header_height * (-1)});

			$('.cover-content-center').each(function(){
				var cover_content_center_height = $(this).innerHeight();
				var cover_content_center_width = $(this).innerWidth();
				$(this).css({"margin-left": (cover_content_center_width/2)*(-1), 	"margin-top": ((cover_content_center_height/2)*(-1)) })
			});
		}
	}
	//Activate all
	setTimeout(init_template, 0);
});

// Function for getting parameters from url
// Credit: https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/901144#901144
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// Shuffles array in place
// Credit: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
