
jQuery(function() {
	initLoad();
	initCustomSelect();
	initFlex();
	initCopyCode();
	initTabs();
	initLightbox();
	initPropValue();
});

function initLoad() {
	$('<span class="ajax-loader"></span>').appendTo('body');
	$('#wrapper').hide();
}
function pageLoad(){
	$('#wrapper').show();
	$('.ajax-loader').remove();
};

function initFlex(){
	flexCode();
	
	$('#display-select ul a').click(function(e){
		//jQuery('.options .box').show();
		flexCode();
	});
	jQuery('[type="radio"]').change(function(){
		flexCode();
	});
	
	jQuery('body').on('click', '.options .reset', function(e){
		e.preventDefault();
		jQuery(this).parent().find('input[type="radio"]').hide().prop('checked', false);
		flexCode();
	});
	
	function flexCode(){
		var flexDisplay = jQuery('#display-select .form-control').text(),
			
			flexDirection = jQuery('[name="flex-flow"]:checked').val(),
			flexWraping = jQuery('[name="flex-wrap"]:checked').val(),
			flexFlow = flexDirection + ' ' + flexWraping,
			
			justifyContent = jQuery('[name="justify-content"]:checked').val(),
			alignItems = jQuery('[name="align-items"]:checked').val(),
			alignContent = jQuery('[name="align-content"]:checked').val();
			
			
		if( flexDisplay == 'Flex') {
			flexDisplay = 'flex';
		} else if( flexDisplay == 'Inline Flex') {
			flexDisplay = 'inline-flex';
		} else {
			flexDisplay = '';
		};
		
		if(jQuery('[name="justify-content"]').is(':checked')){
			justifyContent = justifyContent;
		} else {
			justifyContent = '';
		};
		if(jQuery('[name="align-items"]').is(':checked')){
			alignItems = alignItems;
		} else {
			alignItems = '';
		};
		if(jQuery('[name="align-content"]').is(':checked')){
			alignContent = alignContent;
		} else {
			alignContent = '';
		};
		
		jQuery('.flex-box').css({
			'display': flexDisplay,
			'flex-flow': flexFlow,
			'justify-content': justifyContent,
			'align-items': alignItems,
			'align-content': alignContent,
		});
		
		
		if(jQuery('[name="justify-content"]').is(':checked')){
			justifyContentPrint = '	justify-content: ' + justifyContent +';<br>';
		} else {
			justifyContentPrint = '';
		};
		if(jQuery('[name="align-items"]').is(':checked')){
			alignItemsPrint = '	align-items: ' + alignItems +';<br>';
		} else {
			alignItemsPrint = '';
		};
		if(jQuery('[name="align-content"]').is(':checked')){
			alignContentPrint = '	align-content: ' +alignContent +';<br>';
		} else {
			alignContentPrint = '';
		};
		
		jQuery('.code pre').html(
			'	display: ' + flexDisplay + ';<br>' +
			'	flex-flow: ' + flexFlow + ';<br>' +
			justifyContentPrint +
			alignItemsPrint  +
			alignContentPrint
		);
	}
};

function initCopyCode(){
	jQuery(".code .copy").click(function(e) {
		e.preventDefault();
		copyToClipboard();
	});
	
	function copyToClipboard(e) {
		e.preventDefault();
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($('.code pre').text()).select();
		document.execCommand("copy");
		$temp.remove();
	};
}

// Tabs
function initTabs(){
	jQuery('.tabset').each(function() {
		var tabs    = jQuery(this),
			tabLink = tabs.find('a'),
			activeClass    = 'active',
			tabHiddenClass = 'tab-hidden';
			
		tabs.children('li:first-child').addClass(activeClass);
		jQuery('.tab').eq(0).siblings().addClass(tabHiddenClass);
		tabLink.on('click', function(e){
			var self       = jQuery(this),
				selfParent = self.parent(),
				selfTarget = self.attr('href');
			
			e.preventDefault();
			selfParent.addClass(activeClass).siblings().removeClass(activeClass);
			jQuery(selfTarget).removeClass(tabHiddenClass).siblings().addClass(tabHiddenClass);
		});
	});
}

// custom Lightbox
function initLightbox(){
	var lightbox        = '.popup',
		lightboxOpener  = '.popup-opener',
		lightboxoverlay = '.popup-overlay',
		lightboxClose   = '.popup-close' + ',' + lightboxoverlay,
		ActiveClass     = 'active';
	
	jQuery(lightboxOpener).on('click',function(e){
		e.preventDefault();
		var _targetLink = $(this).attr("data-target");
		jQuery(_targetLink).addClass(ActiveClass);
		jQuery(lightboxoverlay).addClass(ActiveClass);
	});
	
	jQuery(lightboxClose).on('click',function(e){
		e.preventDefault();
		$(lightbox + ',' + lightboxoverlay).removeClass(ActiveClass);
	});
}

// for Custom Select
function initCustomSelect(){
	var customSelect = jQuery('.custom-select'),
		activeClass = 'active';
	
	customSelect.each(function() {
		var self           = jQuery(this),
			opener         = self.find('.form-control, .opener'),
			dropdown       = self.find('ul'),
			dropdownItem   = dropdown.find('a'),
			hiddenInput    = self.find('.hidden-field'),
			activeSelected = 'selected';
		
		opener.on('click', function(e){
			e.preventDefault();
			if (self.hasClass(activeClass)) {
				self.removeClass(activeClass);
			} else {
				customSelect.removeClass(activeClass);
				self.toggleClass(activeClass);
			}
			return false;
		});
		dropdownItem.on('click', function(e){
			e.preventDefault();
			var curText = jQuery(this).text();
			opener.text(curText);
			hiddenInput.val(curText);
			self.removeClass(activeClass).addClass(activeSelected);
			initPropValue();
		});
	});
	
	$(document).on('click',function(e){
		//var container = $(".custom-select ul");
		
		if ($(e.target).is(customSelect) === false) {
			customSelect.removeClass(activeClass);
		}
	});
};

// for Custom Select
function initPropValue(){
	jQuery('.prop-group').each(function() {
		var self = jQuery(this),
			prop = self.find('.title').text(),
			value = self.find('.form-control').text(),
			result = self.find('code');
			
		result.text(prop + ': ' + value + ';');
	});
}