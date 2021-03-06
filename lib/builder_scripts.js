/*----------------------------------------

Example generator

------------------------------------------*/

// Form serialization
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$( document ).ready(function() {

	$(window).resize(function() {
		if ($('.sidebar-wrapper').height() > $(window).height()){
			var formHeight = $(window).height()-$('.sidebar-wrapper .intro').outerHeight()-$('.sidebar-wrapper .buttons-wrap').outerHeight()-30;
			$('.generator-form-wrap').css('height', formHeight+'px');
		}
	});

	$(window).resize();

	var niceScroll;

	$(window).on('mousemove touchmove', function(e) {
		if(e.clientX < 220) {
			$(".sidebar-wrapper, #ascrail2000").css("display", "flex");
			niceScroll = $('.generator-form-wrap').niceScroll(); // Init nicescroll
		} else {
			$(".sidebar-wrapper, #ascrail2000").hide();
		}
	});

	// Init Flux
	window.flux = $('#wavybg-wrapper').flux().data('flux');

	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split('&');
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split('=');
			if (decodeURIComponent(pair[0]) == variable) {
				return decodeURIComponent(pair[1]);
			}
		}
		console.log('Query variable %s not found', variable);
	}

	// Params for samples
	var sampleParams = [
		{
			bgColorInner: "#2b2b2b",
			bgColorOuter: "#000000",
			gradientEnd: "#f5883b",
			gradientStart: "#ff5500",
			lineWidth: 1,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#ffffff",
			bgColorOuter: "#cccccc",
			gradientEnd: "#7a7a7a",
			gradientStart: "#000000",
			lineWidth: 2,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 10
		},
		{
			bgColorInner: "#2b2b2b",
			bgColorOuter: "#000000",
			gradientEnd: "#6b71e3",
			gradientStart: "#fa05fa",
			lineWidth: 1.5,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#2b2b2b",
			bgColorOuter: "#000000",
			gradientEnd: "#7d7d7d",
			gradientStart: "#e0e0e0",
			lineWidth: 1.2,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#ffffff",
			bgColorOuter: "#ffffff",
			gradientEnd: "#404040",
			gradientStart: "#000000",
			lineWidth: 3,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#292929",
			bgColorOuter: "#000000",
			gradientEnd: "#001eff",
			gradientStart: "#51ff00",
			lineWidth: 1.5,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#400000",
			bgColorOuter: "#000000",
			gradientEnd: "#400000",
			gradientStart: "#ff0000",
			lineWidth: 1.5,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 10
		},
		{
			bgColorInner: "#ffffff",
			bgColorOuter: "#000000",
			gradientEnd: "#000000",
			gradientStart: "#000000",
			lineWidth: 2.2,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 10
		},
		{
			bgColorInner: "#ffffff",
			bgColorOuter: "#ffffff",
			gradientEnd: "#696969",
			gradientStart: "#636363",
			lineWidth: 1,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#3b003b",
			bgColorOuter: "#630063",
			gradientEnd: "#cccc00",
			gradientStart: "#ffff00",
			lineWidth: 1,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#ffffff",
			bgColorOuter: "#ebebeb",
			gradientEnd: "#012e82",
			gradientStart: "#2600ff",
			lineWidth: 1.5,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 10
		},
		{
			bgColorInner: "#4d4d4d",
			bgColorOuter: "#000000",
			gradientEnd: "#00c48d",
			gradientStart: "#03ffea",
			lineWidth: 1,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		}
	];

	// Go to samples
    $('.sidebar-wrapper').on('click', '.btn-samples', function(){
    	niceScroll.doScrollTop($('.generator-form-wrap').scrollTop() + $('#samples-section').position().top - 89);
    	console.log($('.generator-form-wrap').scrollTop);
    	return false;
	});

	// Generate
    $('.sidebar-wrapper').on('click', '.btn-generate', function(){
    	setNewParams();
    	flux.init();
    	return false;
	});

    // Download
    $('.sidebar-wrapper').on('click', '.btn-download', function(){
    	var width = $('#downloadWidth').val(),
    		height = $('#downloadHeight').val();
		flux.download(width, height);
    	return false;
	});

	// Recording
    $('.sidebar-wrapper').on('click', '.btn-record', function(){
		var enable = $(".btn-record").text() == "Start Recording";
		flux.toggleCapture(enable);
		$(".btn-record").text((enable ? "Stop" : "Start") + " Recording");

    	return false;
	});

	// Generate sample
    $('.sidebar-wrapper').on('click', '.sample-smoke', function(){
    	var sampleID = $(this).attr('data-id');
    	loadParams(sampleParams[sampleID]);
    	$('.btn-generate').click();
    	return false;
	});

    // Init color pickers
	var gradientStartObj = $('#gradientStart').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('border-color','#'+hex);
			$(el).val('#'+hex);
		}
	}).keyup(function(){
		$(this).colpickSetColor(this.value);
	});

	var gradientEndObj = $('#gradientEnd').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('border-color','#'+hex);
			$(el).val('#'+hex);
		}
	}).keyup(function(){
		$(this).colpickSetColor(this.value);
	});

	var bgColorOuterObj = $('#bgColorOuter').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('border-color','#'+hex);
			$(el).val('#'+hex);
		}
	}).keyup(function(){
		$(this).colpickSetColor(this.value);
	});

	var bgColorInnerObj = $('#bgColorInner').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('border-color','#'+hex);
			$(el).val('#'+hex);
		}
	}).keyup(function(){
		$(this).colpickSetColor(this.value);
	});

	// Ratio slider
	$('.ratio-slider').parents('.input-group').find('.value').html(flux.settings.displayRatio);
	var ratioSlider = $('.ratio-slider').noUiSlider({
		start: [ flux.settings.displayRatio*10 ],
		range: {
			'min': [ 1 ],
			'max': [ 50 ]
		},
		step: 1,
		serialization: {
			lower: [
			  $.Link({
				target: $('#ratio')
			  })
			],
			format: {
				decimals: 0,
				mark: '.'
			}
		}
	});
	ratioSlider.on({
		slide: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue/10);
		},
		change: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue/10);
		}
	});

	// Smoke Opacity slider
	var smokeOpacitySlider = $('.smokeOpacity-slider').noUiSlider({
		start: [ 10 ],
		range: {
			'min': [ 0 ],
			'max': [ 100 ]
		},
		step: 5,
		serialization: {
			lower: [
			  $.Link({
				target: $('#smokeOpacity')
			  })
			],
			format: {
				decimals: 0,
				mark: '.'
			}
		}
	});
	smokeOpacitySlider.on({
		slide: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'%');
		},
		change: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'%');
		}
	});

	// //Speed/interval slider
	// var speedSlider = $('.speed-slider').noUiSlider({
	// 	start: [ 15 ],
	// 	range: {
	// 		'min': [ 1 ],
	// 		'max': [ 50 ]
	// 	},
	// 	step: 1,
	// 	serialization: {
	// 		lower: [
	// 		  $.Link({
	// 			target: $('#speed')
	// 		  })
	// 		],
	// 		format: {
	// 			decimals: 0,
	// 			mark: '.'
	// 		}
	// 	}
	// });
	// speedSlider.on({
	// 	slide: function(){
	// 		var sliderValue = $(this).val();
	// 		$(this).parents('.input-group').find('.value').html(sliderValue + "ms");
	// 	},
	// 	change: function(){
	// 		var sliderValue = $(this).val();
	// 		$(this).parents('.input-group').find('.value').html(sliderValue + "ms");
	// 	}
	// });

	// Fade Speed/interval slider
	// var fadeSpeedSlider = $('.fadeSpeed-slider').noUiSlider({
	// 	start: [ 50 ],
	// 	range: {
	// 		'min': [ 0 ],
	// 		'max': [ 300 ]
	// 	},
	// 	step: 1,
	// 	serialization: {
	// 		lower: [
	// 			$.Link({
	// 			target: $('#fadeSpeed')
	// 			})
	// 		],
	// 		format: {
	// 			decimals: 0,
	// 			mark: '.'
	// 		}
	// 	}
	// });
	// fadeSpeedSlider.on({
	// 	slide: function(){
	// 		var sliderValue = $(this).val();
	// 		$(this).parents('.input-group').find('.value').html(sliderValue + "ms");
	// 	},
	// 	change: function(){
	// 		var sliderValue = $(this).val();
	// 		$(this).parents('.input-group').find('.value').html(sliderValue + "ms");
	// 	}
	// });

	// Mouse power slider
	// var mousePowerSlider = $('.mousePower-slider').noUiSlider({
	// 	start: [ 20 ],
	// 	range: {
	// 		'min': [ 0 ],
	// 		'max': [ 100 ]
	// 	},
	// 	step: 1,
	// 	serialization: {
	// 		lower: [
	// 			$.Link({
	// 				target: $('#mousePower')
	// 			})
	// 		],
	// 		format: {
	// 			decimals: 0,
	// 			mark: '.'
	// 		}
	// 	}
	// });
	// mousePowerSlider.on({
	// 	slide: function(){
	// 		var sliderValue = $(this).val();
	// 		$(this).parents('.input-group').find('.value').html(sliderValue/100);
	// 	},
	// 	change: function(){
	// 		var sliderValue = $(this).val();
	// 		$(this).parents('.input-group').find('.value').html(sliderValue/100);
	// 	}
	// });

	// Replay power slider
	// var replayPowerSlider = $('.replayPower-slider').noUiSlider({
	// 	start: [ 50 ],
	// 	range: {
	// 		'min': [ 0 ],
	// 		'max': [ 100 ]
	// 	},
	// 	step: 1,
	// 	serialization: {
	// 		lower: [
	// 			$.Link({
	// 				target: $('#replayPower')
	// 			})
	// 		],
	// 		format: {
	// 			decimals: 0,
	// 			mark: '.'
	// 		}
	// 	}
	// });
	// replayPowerSlider.on({
	// 	slide: function(){
	// 		var sliderValue = $(this).val();
	// 		$(this).parents('.input-group').find('.value').html(sliderValue/100);
	// 	},
	// 	change: function(){
	// 		var sliderValue = $(this).val();
	// 		$(this).parents('.input-group').find('.value').html(sliderValue/100);
	// 	}
	// });

	// Number of Fluxes slider
	// var numCirclesSlider = $('.numCircles-slider').noUiSlider({
	// 	start: [ 1 ],
	// 	range: {
	// 		'min': [ 1 ],
	// 		'max': [ 5 ]
	// 	},
	// 	step: 1,
	// 	serialization: {
	// 		lower: [
	// 		  $.Link({
	// 			target: $('#numCircles')
	// 		  })
	// 		],
	// 		format: {
	// 			decimals: 0,
	// 			mark: '.'
	// 		}
	// 	}
	// });
	// numCirclesSlider.on({
	// 	slide: function(){
	// 		var sliderValue = $(this).val();
	// 		$(this).parents('.input-group').find('.value').html(sliderValue);
	// 	},
	// 	change: function(){
	// 		var sliderValue = $(this).val();
	// 		$(this).parents('.input-group').find('.value').html(sliderValue);
	// 	}
	// });

	// Smoke Radius Size slider
	var radiusSlider = $('.radius-slider').noUiSlider({
		start: [ 100 ],
		range: {
			'min': [ 10 ],
			'max': [ 300 ]
		},
		step: 1,
		serialization: {
			lower: [
			  $.Link({
				target: $('#radius')
			  })
			],
			format: {
				decimals: 0,
				mark: '.'
			}
		}
	});
	radiusSlider.on({
		slide: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'%');
		},
		change: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'%');
		}
	});

	// Smoke Line Width slider
	var lineWidthSlider = $('.lineWidth-slider').noUiSlider({
		start: [ 2 ],
		range: {
			'min': [ 0.1 ],
			'max': [ 10 ]
		},
		step: 0.1,
		serialization: {
			lower: [
			  $.Link({
				target: $('#lineWidth')
			  })
			],
			format: {
				decimals: 1,
				mark: '.'
			}
		}
	});
	lineWidthSlider.on({
		slide: function() {
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'px');
		},
		change: function() {
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'px');
		}
	});

	$("#path").on("change", function(event) {
		flux.setPath(this.value);
	});

	// Set new params
	function setNewParams() {
		var params = $('.generator-params').serializeObject();
		$('.generator-params input[type=checkbox]:not(:checked)').each(function() {
			// checkboxes set to false are usually not included in forms
			params[this.name] = false;
		});
		flux.setOptions(params);
	}

	// Load params (samples)
	function loadParams(params) {
		gradientStartObj.colpickSetColor(params.gradientStart.replace('#', ''));
		gradientEndObj.colpickSetColor(params.gradientEnd.replace('#', ''));
		smokeOpacitySlider.val(params.smokeOpacity).change();
		numCirclesSlider.val(params.numCircles).change();
		radiusSizeSlider.val(params.radiusSize).change();
		lineWidthSlider.val(params.lineWidth).change();
		bgColorOuterObj.colpickSetColor(params.bgColorOuter.replace('#', ''));
		bgColorInnerObj.colpickSetColor(params.bgColorInner.replace('#', ''));
	}
});










