/**
 * Global variables
 */
"use strict";

var userAgent = navigator.userAgent.toLowerCase(),
	initialDate = new Date(),

	$document = $(document),
	$window = $(window),
	$html = $("html"),
	$body = $("body"),

	isDesktop = $html.hasClass("desktop"),
	isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1]) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
	isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
	isTouch = "ontouchstart" in window,
	windowReady = false,
	isNoviBuilder = false,
	livedemo = true,

	plugins = {
		fullPage: $(".page-scroller"),
		rdNavbar: $(".rd-navbar"),
		owl: $(".owl-carousel"),
		viewAnimate: $('.view-animate'),
		rdInputLabel: $(".form-label"),
		radio: $("input[type='radio']"),
		checkbox: $("input[type='checkbox']"),
		customToggle: $("[data-custom-toggle]"),
		rdMailForm: $(".rd-mailform"),
		regula: $("[data-constraints]"),
		search: $(".rd-search"),
		searchResults: $('.rd-search-results'),
		preloader:               $( '.preloader' ),
		copyrightYear:           $( '.copyright-year' ),
		wow:                     $( '.wow' ),
		maps:                    $( '.google-map-container' ),
		scroller: $(".scroll-wrap"),
	};

/**
 * @desc Check the element was been scrolled into the view
 * @param {object} elem - jQuery object
 * @return {boolean}
 */
function isScrolledIntoView ( elem ) {
	if ( isNoviBuilder ) return true;
	return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
}

/**
 * @desc Calls a function when element has been scrolled into the view
 * @param {object} element - jQuery object
 * @param {function} func - init function
 */
function lazyInit( element, func ) {
	var scrollHandler = function () {
		if ( ( !element.hasClass( 'lazy-loaded' ) && ( isScrolledIntoView( element ) ) ) ) {
			func.call();
			element.addClass( 'lazy-loaded' );
		}
	};

	scrollHandler();
	$window.on( 'scroll', scrollHandler );
}

$(window).on('load', function () {
    $('html').addClass('page-loaded');
	// Page loader & Page transition
	if (plugins.preloader.length && !isNoviBuilder) {
		pageTransition({
			target: document.querySelector( '.page' ),
			delay: 0,
			duration: 500,
			classIn: 'fadeIn',
			classOut: 'fadeOut',
			classActive: 'animated',
			conditions: function (event, link) {
				return link && !/(\#|javascript:void\(0\)|callto:|tel:|mailto:|:\/\/)/.test(link) && !event.currentTarget.hasAttribute('data-lightgallery');
			},
			onTransitionStart: function ( options ) {
				setTimeout( function () {
					plugins.preloader.removeClass('loaded');
				}, options.duration * .75 );
			},
			onReady: function () {
				plugins.preloader.addClass('loaded');
				windowReady = true;
			}
		});
	}
	
});

/**
 * Initialize All Scripts
 */
$document.ready(function () {

	isNoviBuilder = window.xMode;

	/**
	 * @desc Create live search results
	 * @param {object} options
	 */
	function liveSearch(options) {
		$('#' + options.live).removeClass('cleared').html();
		options.current++;
		options.spin.addClass('loading');
		$.get(handler, {
			s: decodeURI(options.term),
			liveSearch: options.live,
			dataType: "html",
			liveCount: options.liveCount,
			filter: options.filter,
			template: options.template
		}, function (data) {
			options.processed++;
			var live = $('#' + options.live);
			if ((options.processed === options.current) && !live.hasClass('cleared')) {
				live.find('> #search-results').removeClass('active');
				live.html(data);
				setTimeout(function () {
					live.find('> #search-results').addClass('active');
				}, 50);
			}
			options.spin.parents('.rd-search').find('.input-group-addon').removeClass('loading');
		})
	}

	/**
	 * attachFormValidator
	 * @description  attach form validation to elements
	 */
	function attachFormValidator(elements) {
		for (var i = 0; i < elements.length; i++) {
			var o = $(elements[i]), v;
			o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
			v = o.parent().find(".form-validation");
			if (v.is(":last-child")) {
				o.addClass("form-control-last-child");
			}
		}

		elements
			.on('input change propertychange blur', function (e) {
				var $this = $(this), results;

				if (e.type != "blur") {
					if (!$this.parent().hasClass("has-error")) {
						return;
					}
				}

				if ($this.parents('.rd-mailform').hasClass('success')) {
					return;
				}

				if ((results = $this.regula('validate')).length) {
					for (i = 0; i < results.length; i++) {
						$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")
					}
				} else {
					$this.siblings(".form-validation").text("").parent().removeClass("has-error")
				}
			})
			.regula('bind');
	}

	/**
	 * isValidated
	 * @description  check if all elemnts pass validation
	 */
	function isValidated(elements) {
		var results, errors = 0;
		if (elements.length) {
			for (j = 0; j < elements.length; j++) {

				var $input = $(elements[j]);

				if ((results = $input.regula('validate')).length) {
					for (k = 0; k < results.length; k++) {
						errors++;
						$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
					}
				} else {
					$input.siblings(".form-validation").text("").parent().removeClass("has-error")
				}
			}

			return errors == 0;
		}
		return true;
	}

	/**
	 * @desc Initialize owl carousel plugin
	 * @param {object} carousel - carousel jQuery object
	 */
	function initOwlCarousel ( carousel ) {
		var
			aliaces = [ '-', '-sm-', '-md-', '-lg-', '-xl-', '-xxl-' ],
			values = [ 0, 576, 768, 992, 1200, 1600 ],
			responsive = {};

		for ( var j = 0; j < values.length; j++ ) {
			responsive[ values[ j ] ] = {};
			for ( var k = j; k >= -1; k-- ) {
				if ( !responsive[ values[ j ] ][ 'items' ] && carousel.attr( 'data' + aliaces[ k ] + 'items' ) ) {
					responsive[ values[ j ] ][ 'items' ] = k < 0 ? 1 : parseInt( carousel.attr( 'data' + aliaces[ k ] + 'items' ), 10 );
				}
				if ( !responsive[ values[ j ] ][ 'stagePadding' ] && responsive[ values[ j ] ][ 'stagePadding' ] !== 0 && carousel.attr( 'data' + aliaces[ k ] + 'stage-padding' ) ) {
					responsive[ values[ j ] ][ 'stagePadding' ] = k < 0 ? 0 : parseInt( carousel.attr( 'data' + aliaces[ k ] + 'stage-padding' ), 10 );
				}
				if ( !responsive[ values[ j ] ][ 'margin' ] && responsive[ values[ j ] ][ 'margin' ] !== 0 && carousel.attr( 'data' + aliaces[ k ] + 'margin' ) ) {
					responsive[ values[ j ] ][ 'margin' ] = k < 0 ? 30 : parseInt( carousel.attr( 'data' + aliaces[ k ] + 'margin' ), 10 );
				}
			}
		}

		// Enable custom pagination
		if ( carousel.attr( 'data-dots-custom' ) ) {
			carousel.on( 'initialized.owl.carousel', function ( event ) {
				var
					carousel = $( event.currentTarget ),
					customPag = $( carousel.attr( 'data-dots-custom' ) ),
					active = 0;

				if ( carousel.attr( 'data-active' ) ) {
					active = parseInt( carousel.attr( 'data-active' ), 10 );
				}

				carousel.trigger( 'to.owl.carousel', [ active, 300, true ] );
				customPag.find( '[data-owl-item="' + active + '"]' ).addClass( 'active' );

				customPag.find( '[data-owl-item]' ).on( 'click', function ( event ) {
					event.preventDefault();
					carousel.trigger( 'to.owl.carousel', [ parseInt( this.getAttribute( 'data-owl-item' ), 10 ), 300, true ] );
				} );

				carousel.on( 'translate.owl.carousel', function ( event ) {
					customPag.find( '.active' ).removeClass( 'active' );
					customPag.find( '[data-owl-item="' + event.item.index + '"]' ).addClass( 'active' )
				} );
			} );
		}

		carousel.owlCarousel( {
			autoplay:           isNoviBuilder ? false : carousel.attr( 'data-autoplay' ) !== 'false',
			autoplayTimeout:    carousel.attr( "data-autoplay" ) ? Number( carousel.attr( "data-autoplay" ) ) : 3000,
			autoplayHoverPause: true,
			loop:               isNoviBuilder ? false : carousel.attr( 'data-loop' ) !== 'false',
			items:              1,
			center:             carousel.attr( 'data-center' ) === 'true',
			dotsContainer:      carousel.attr( 'data-pagination-class' ) || false,
			navContainer:       carousel.attr( 'data-navigation-class' ) || false,
			mouseDrag:          isNoviBuilder ? false : carousel.attr( 'data-mouse-drag' ) !== 'false',
			nav:                carousel.attr( 'data-nav' ) === 'true',
			dots:               carousel.attr( 'data-dots' ) === 'true',
			dotsEach:           carousel.attr( 'data-dots-each' ) ? parseInt( carousel.attr( 'data-dots-each' ), 10 ) : false,
			animateIn:          carousel.attr( 'data-animation-in' ) ? carousel.attr( 'data-animation-in' ) : false,
			animateOut:         carousel.attr( 'data-animation-out' ) ? carousel.attr( 'data-animation-out' ) : false,
			responsive:         responsive,
			navText:            carousel.attr( 'data-nav-text' ) ? $.parseJSON( carousel.attr( 'data-nav-text' ) ) : [],
			navClass:           carousel.attr( 'data-nav-class' ) ? $.parseJSON( carousel.attr( 'data-nav-class' ) ) : [ 'owl-prev', 'owl-next' ]
		} );
	}

	// Copyright Year (Evaluates correct copyright year)
	if (plugins.copyrightYear.length) {
		plugins.copyrightYear.text(initialDate.getFullYear());
	}

	// Additional class on html if mac os.
	if (navigator.platform.match(/(Mac)/i)) {
		$html.addClass("mac-os");
	}

	// Adds some loosing functionality to IE browsers (IE Polyfills)
	if (isIE) {
		if (isIE === 12) $html.addClass("ie-edge");
		if (isIE === 11) $html.addClass("ie-11");
		if (isIE < 10) $html.addClass("lt-ie-10");
		if (isIE < 11) $html.addClass("ie-10");
	}

	// Add custom styling options for input[type="radio"]
	if (plugins.radio.length) {
		for (var i = 0; i < plugins.radio.length; i++) {
			$(plugins.radio[i]).addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
		}
	}

	// Add custom styling options for input[type="checkbox"]
	if (plugins.checkbox.length) {
		for (var i = 0; i < plugins.checkbox.length; i++) {
			$(plugins.checkbox[i]).addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
		}
	}

	/**
	 * @desc Google map function for getting latitude and longitude
	 */
	function getLatLngObject(str, marker, map, callback) {
		var coordinates = {};
		try {
			coordinates = JSON.parse(str);
			callback(new google.maps.LatLng(
				coordinates.lat,
				coordinates.lng
			), marker, map)
		} catch (e) {
			map.geocoder.geocode({'address': str}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();

					callback(new google.maps.LatLng(
						parseFloat(latitude),
						parseFloat(longitude)
					), marker, map)
				}
			})
		}
	}
	
	/**
	 * @desc Initialize Google maps
	 */
	function initMaps() {
		var key;

		for ( var i = 0; i < plugins.maps.length; i++ ) {
			if ( plugins.maps[i].hasAttribute( "data-key" ) ) {
				key = plugins.maps[i].getAttribute( "data-key" );
				break;
			}
		}

		$.getScript('//maps.google.com/maps/api/js?'+ ( key ? 'key='+ key + '&' : '' ) +'sensor=false&libraries=geometry,places&v=quarterly', function () {
			var head = document.getElementsByTagName('head')[0],
				insertBefore = head.insertBefore;

			head.insertBefore = function (newElement, referenceElement) {
				if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') !== -1 || newElement.innerHTML.indexOf('gm-style') !== -1) {
					return;
				}
				insertBefore.call(head, newElement, referenceElement);
			};
			var geocoder = new google.maps.Geocoder;
			for (var i = 0; i < plugins.maps.length; i++) {
				var zoom = parseInt(plugins.maps[i].getAttribute("data-zoom"), 10) || 11;
				var styles = plugins.maps[i].hasAttribute('data-styles') ? JSON.parse(plugins.maps[i].getAttribute("data-styles")) : [];
				var center = plugins.maps[i].getAttribute("data-center") || "New York";

				// Initialize map
				var map = new google.maps.Map(plugins.maps[i].querySelectorAll(".google-map")[0], {
					zoom: zoom,
					styles: styles,
					scrollwheel: false,
					center: {lat: 0, lng: 0}
				});

				// Add map object to map node
				plugins.maps[i].map = map;
				plugins.maps[i].geocoder = geocoder;
				plugins.maps[i].keySupported = true;
				plugins.maps[i].google = google;

				// Get Center coordinates from attribute
				getLatLngObject(center, null, plugins.maps[i], function (location, markerElement, mapElement) {
					mapElement.map.setCenter(location);
				});

				// Add markers from google-map-markers array
				var markerItems = plugins.maps[i].querySelectorAll(".google-map-markers li");

				if (markerItems.length){
					var markers = [];
					for (var j = 0; j < markerItems.length; j++){
						var markerElement = markerItems[j];
						getLatLngObject(markerElement.getAttribute("data-location"), markerElement, plugins.maps[i], function(location, markerElement, mapElement){
							var icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
							var activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
							var info = markerElement.getAttribute("data-description") || "";
							var infoWindow = new google.maps.InfoWindow({
								content: info
							});
							markerElement.infoWindow = infoWindow;
							var markerData = {
								position: location,
								map: mapElement.map
							}
							if (icon){
								markerData.icon = icon;
							}
							var marker = new google.maps.Marker(markerData);
							markerElement.gmarker = marker;
							markers.push({markerElement: markerElement, infoWindow: infoWindow});
							marker.isActive = false;
							// Handle infoWindow close click
							google.maps.event.addListener(infoWindow,'closeclick',(function(markerElement, mapElement){
								var markerIcon = null;
								markerElement.gmarker.isActive = false;
								markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
								markerElement.gmarker.setIcon(markerIcon);
							}).bind(this, markerElement, mapElement));


							// Set marker active on Click and open infoWindow
							google.maps.event.addListener(marker, 'click', (function(markerElement, mapElement) {
								if (markerElement.infoWindow.getContent().length === 0) return;
								var gMarker, currentMarker = markerElement.gmarker, currentInfoWindow;
								for (var k =0; k < markers.length; k++){
									var markerIcon;
									if (markers[k].markerElement === markerElement){
										currentInfoWindow = markers[k].infoWindow;
									}
									gMarker = markers[k].markerElement.gmarker;
									if (gMarker.isActive && markers[k].markerElement !== markerElement){
										gMarker.isActive = false;
										markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")
										gMarker.setIcon(markerIcon);
										markers[k].infoWindow.close();
									}
								}

								currentMarker.isActive = !currentMarker.isActive;
								if (currentMarker.isActive) {
									if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")){
										currentMarker.setIcon(markerIcon);
									}

									currentInfoWindow.open(map, marker);
								}else{
									if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
										currentMarker.setIcon(markerIcon);
									}
									currentInfoWindow.close();
								}
							}).bind(this, markerElement, mapElement))
						})
					}
				}
			}
		});
	}
	
	// Google maps
	if( plugins.maps.length ) {
		lazyInit( plugins.maps, initMaps );
	}

	// UI To Top
	if (isDesktop && !isNoviBuilder) {
		$().UItoTop({
			easingType: 'easeOutQuad',
			containerClass: 'ui-to-top fa fa-angle-up'
		});
	}

	// Add class in viewport
	if (plugins.viewAnimate.length) {
		for (var i = 0; i < plugins.viewAnimate.length; i++) {
			var $view = $(plugins.viewAnimate[i]).not('.active');
			$document.on("scroll", $.proxy(function () {
				if (isScrolledIntoView(this)) {
					this.addClass("active");
				}
			}, $view))
				.trigger("scroll");
		}
	}

	/**
	 * JQuery mousewheel plugin
	 * @description  Enables jquery mousewheel plugin
	 */
	if (plugins.scroller.length) {
		var i;
		for (i = 0; i < plugins.scroller.length; i++) {
			var scrollerItem = $(plugins.scroller[i]);

			scrollerItem.mCustomScrollbar({
				scrollInertia: 200,
				scrollButtons: {enable: true}
			});
		}
	}

	/**
	 * RD Navbar
	 * @description Enables RD Navbar plugin
	 */
	if (plugins.rdNavbar.length) {
		plugins.rdNavbar.RDNavbar({
			anchorNavSpeed: 700,
			anchorNavOffset: -10,
			stickUpClone: true,
			anchorNavEasing: 'easeInOutQuart',
		});
		if (plugins.rdNavbar.attr("data-body-class")) {
			document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
		}
	}
	
	// RD Search
	if (plugins.search.length || plugins.searchResults) {
		var handler = "bat/rd-search.php";
		var defaultTemplate = '<h5 class="search-title"><a target="_top" href="#{href}" class="search-link">#{title}</a></h5>' +
			'<p>...#{token}...</p>' +
			'<p class="match"><em>Terms matched: #{count} - URL: #{href}</em></p>';
		var defaultFilter = '*.html';

		if (plugins.search.length) {
			for (var i = 0; i < plugins.search.length; i++) {
				var searchItem = $(plugins.search[i]),
					options = {
						element: searchItem,
						filter: (searchItem.attr('data-search-filter')) ? searchItem.attr('data-search-filter') : defaultFilter,
						template: (searchItem.attr('data-search-template')) ? searchItem.attr('data-search-template') : defaultTemplate,
						live: (searchItem.attr('data-search-live')) ? searchItem.attr('data-search-live') : false,
						liveCount: (searchItem.attr('data-search-live-count')) ? parseInt(searchItem.attr('data-search-live'), 10) : 4,
						current: 0, processed: 0, timer: {}
					};

				var $toggle = $('.rd-navbar-search-toggle');
				if ($toggle.length) {
					$toggle.on('click', (function (searchItem) {
						return function () {
							if (!($(this).hasClass('active'))) {
								searchItem.find('input').val('').trigger('propertychange');
							}
						}
					})(searchItem));
				}

				if (options.live) {
					var clearHandler = false;

					searchItem.find('input').on("input propertychange", $.proxy(function () {
						this.term = this.element.find('input').val().trim();
						this.spin = this.element.find('.input-group-addon');

						clearTimeout(this.timer);

						if (this.term.length > 2) {
							this.timer = setTimeout(liveSearch(this), 200);

							if (clearHandler === false) {
								clearHandler = true;

								$body.on("click", function (e) {
									if ($(e.toElement).parents('.rd-search').length === 0) {
										$('#rd-search-results-live').addClass('cleared').html('');
									}
								})
							}

						} else if (this.term.length === 0) {
							$('#' + this.live).addClass('cleared').html('');
						}
					}, options, this));
				}

				searchItem.submit($.proxy(function () {
					$('<input />').attr('type', 'hidden')
						.attr('name', "filter")
						.attr('value', this.filter)
						.appendTo(this.element);
					return true;
				}, options, this))
			}
		}

		if (plugins.searchResults.length) {
			var regExp = /\?.*s=([^&]+)\&filter=([^&]+)/g;
			var match = regExp.exec(location.search);

			if (match !== null) {
				$.get(handler, {
					s: decodeURI(match[1]),
					dataType: "html",
					filter: match[2],
					template: defaultTemplate,
					live: ''
				}, function (data) {
					plugins.searchResults.html(data);
				})
			}
		}
	}
	
	// Owl carousel
	if ( plugins.owl.length ) {
		for ( var i = 0; i < plugins.owl.length; i++ ) {
			var carousel = $( plugins.owl[ i ] );
			plugins.owl[ i ].owl = carousel;
			initOwlCarousel( carousel );
		}
	}
	
	// WOW
	if ($html.hasClass("wow-animation") && plugins.wow.length && !isNoviBuilder && isDesktop) {
		new WOW().init();
	}

	// RD Input Label
	if (plugins.rdInputLabel.length) {
		plugins.rdInputLabel.RDInputLabel();
	}

	// Regula
	if (plugins.regula.length) {
		attachFormValidator(plugins.regula);
	}

	/**
	 * FullPage
	 * @description  Scroll sections as slider
	 */
	if (plugins.fullPage.length) {
		var isFullPage = true;

		plugins.fullPage.fullpage({
			navigation: true,
			navigationPosition: 'right',
			responsiveWidth: 1201,
			scrollOverflow: false,
			sectionSelector: '.scrollerSection',
			scrollBar: true
		});


		$window.on('resize', function (e) {
			if(window.innerWidth < 1199 && isFullPage){
				$.fn.fullpage.destroy('all');
				isFullPage = false;
			}
			if(window.innerWidth >= 1200 && !isFullPage){
				plugins.fullPage.fullpage({
					navigation: true,
					navigationPosition: 'right',
					responsiveWidth: 1201,
					scrollOverflow: false,
					sectionSelector: '.scrollerSection',
					scrollBar: true,
				});
				isFullPage = true;
			}
		});

		$window.trigger('resize');
	}
	
	
	
	
	// RD Mailform
	if (plugins.rdMailForm.length) {
		var i, j, k,
			msg = {
				'MF000': 'Successfully sent!',
				'MF001': 'Recipients are not set!',
				'MF002': 'Form will not work locally!',
				'MF003': 'Please, define email field in your form!',
				'MF004': 'Please, define type of your form!',
				'MF254': 'Something went wrong with PHPMailer!',
				'MF255': 'Aw, snap! Something went wrong.'
			};

		for (i = 0; i < plugins.rdMailForm.length; i++) {
			var $form = $(plugins.rdMailForm[i]),
				formHasCaptcha = false;

			$form.attr('novalidate', 'novalidate').ajaxForm({
				data: {
					"form-type": $form.attr("data-form-type") || "contact",
					"counter": i
				},
				beforeSubmit: function (arr, $form, options) {
					if (isNoviBuilder)
						return;

					var form = $(plugins.rdMailForm[this.extraData.counter]),
						inputs = form.find("[data-constraints]"),
						output = $("#" + form.attr("data-form-output")),
						captcha = form.find('.recaptcha'),
						captchaFlag = true;

					output.removeClass("active error success");

					if (isValidated(inputs, captcha)) {

						// veify reCaptcha
						if (captcha.length) {
							var captchaToken = captcha.find('.g-recaptcha-response').val(),
								captchaMsg = {
									'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
									'CPT002': 'Something wrong with google reCaptcha'
								};

							formHasCaptcha = true;

							$.ajax({
								method: "POST",
								url: "bat/reCaptcha.php",
								data: {'g-recaptcha-response': captchaToken},
								async: false
							})
								.done(function (responceCode) {
									if (responceCode !== 'CPT000') {
										if (output.hasClass("snackbars")) {
											output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>')

											setTimeout(function () {
												output.removeClass("active");
											}, 3500);

											captchaFlag = false;
										} else {
											output.html(captchaMsg[responceCode]);
										}

										output.addClass("active");
									}
								});
						}

						if (!captchaFlag) {
							return false;
						}

						form.addClass('form-in-process');

						if (output.hasClass("snackbars")) {
							output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
							output.addClass("active");
						}
					} else {
						return false;
					}
				},
				error: function (result) {
					if (isNoviBuilder)
						return;

					var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),
						form = $(plugins.rdMailForm[this.extraData.counter]);

					output.text(msg[result]);
					form.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}
				},
				success: function (result) {
					if (isNoviBuilder)
						return;

					var form = $(plugins.rdMailForm[this.extraData.counter]),
						output = $("#" + form.attr("data-form-output")),
						select = form.find('select');

					form
						.addClass('success')
						.removeClass('form-in-process');

					if (formHasCaptcha) {
						grecaptcha.reset();
					}

					result = result.length === 5 ? result : 'MF255';
					output.text(msg[result]);

					if (result === "MF000") {
						if (output.hasClass("snackbars")) {
							output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
						} else {
							output.addClass("active success");
						}
					} else {
						if (output.hasClass("snackbars")) {
							output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
						} else {
							output.addClass("active error");
						}
					}

					form.clearForm();

					if (select.length) {
						select.select2("val", "");
					}

					form.find('input, textarea').trigger('blur');

					setTimeout(function () {
						output.removeClass("active error success");
						form.removeClass('success');
					}, 3500);
				}
			});
		}
	}
	
	/**
	 * Custom Toggles
	 */
	if (plugins.customToggle.length) {
		var i;

		for (i = 0; i < plugins.customToggle.length; i++) {
			var $this = $(plugins.customToggle[i]);

			$this.on('click', $.proxy(function (event) {
				event.preventDefault();
				var $ctx = $(this);
				$($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
			}, $this));

			if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
				$("body").on("click", $this, function (e) {
					if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length == 0 && e.data.find($(e.target)).length == 0) {
						$(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
					}
				})
			}
		}
	}
	
});

