/*
 * Template Name: Unify - Responsive Bootstrap Template
 * Description: Business, Corporate, Portfolio and Blog Theme.
 * Version: 1.8
 * Author: @htmlstream
 * Website: http://htmlstream.com
*/

var App = function() {

  function handleBootstrap() {
    /*Bootstrap Carousel*/
    jQuery('.carousel').carousel({
      interval: 15000,
      pause: 'hover'
    });

    /*Tooltips*/
    jQuery('.tooltips').tooltip();
    jQuery('.tooltips-show').tooltip('show');
    jQuery('.tooltips-hide').tooltip('hide');
    jQuery('.tooltips-toggle').tooltip('toggle');
    jQuery('.tooltips-destroy').tooltip('destroy');

    /*Popovers*/
    jQuery('.popovers').popover();
    jQuery('.popovers-show').popover('show');
    jQuery('.popovers-hide').popover('hide');
    jQuery('.popovers-toggle').popover('toggle');
    jQuery('.popovers-destroy').popover('destroy');
  }

  var handleFullscreen = function() {
    var WindowHeight = $(window).height();

    if ($(document.body).hasClass("promo-padding-top")) {
      HeaderHeight = $(".header").height();
    } else {
      HeaderHeight = 0;
    }

    $(".fullheight").css("height", WindowHeight - HeaderHeight);

    $(window).resize(function() {
      var WindowHeight = $(window).height();
      $(".fullheight").css("height", WindowHeight - HeaderHeight);
    });
  }

  // handleLangs
  function handleLangs() {
    $(".lang-block").click(function() {
      console.log("click!");
    });
  }

  var handleValignMiddle = function() {
    $(".valign__middle").each(function() {
      $(this).css("padding-top", $(this).parent().height() / 2 - $(this).height() / 2);
    });
    $(window).resize(function() {
      $(".valign__middle").each(function() {
        $(this).css("padding-top", $(this).parent().height() / 2 - $(this).height() / 2);
      });
    });
  }

  function handleHeader() {
    //jQuery to collapse the navbar on scroll
    $(window).scroll(function() {
      if ($(".navbar").offset().top > 150) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        $(".topbar").addClass("topbarCollapse");
      } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        $(".topbar").removeClass("topbarCollapse");
      }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function() {
      $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
      });
    });

    //Collapse Navbar When It's Clickicked
    $(window).scroll(function() {
      $(".navbar-collapse.in").collapse('hide');
    });
  }
  
    //Hover Selector
    function handleHoverSelector() {
        $('.hoverSelector').on('hover', function(e) {        
            $('.hoverSelectorBlock', this).toggleClass('show');
            e.stopPropagation();            
        });
    } 

  return {
    init: function() {
      handleHeader();
      handleBootstrap();
      //handleLangs();
      handleFullscreen();
      handleValignMiddle();
      handleHoverSelector();
    },

    initCounter: function() {
      jQuery('.counter').counterUp({
        delay: 10,
        time: 1000
      });
    },

    initParallaxBg: function() {
      $(window).load(function() {
        jQuery('.parallaxBg').parallax("50%", 0.4);
        jQuery('.parallaxBg1').parallax("50%", 0.2);
      });
    },

    initParallaxBg2: function() {
      $(window).load(function() {
        jQuery('.parallaxBg').parallax("50%", "50%");
      });
    },

  };

}();

// multilanguage bar setter
(function($) {
    /**
     * this function sets languga bar <li> for language bar front end interfaces
     * @param {json object} data
     * @param {array} options
     * @returns {null}
     * @author Mustafa Zeynel Dağlı
     * @since 23/12/2015
     */
    $.fn.multiLanguageBarSetter = function(data, options) {
         var data = data;
         $this = $(this);
         //console.warn($.fn.multiLanguageBarSetter.defaults.langCode);
         //console.warn($.fn.multiLanguageBarSetter.defaults.requestUriTranslated);
         if ($.fn.multiLanguageBarSetter.defaults.requestUriTranslated.toLowerCase().indexOf("--dil--") >= 0) {
             //console.warn('--dil-- bulundu');
             $.fn.multiLanguageBarSetter.setLanguageLinkByLangCode(data);

         } else {
             //console.warn('--dil-- bulunamadı'); 
             $.fn.multiLanguageBarSetter.setLanguageLinkBase(data);
         }  

         var opts = $.extend({}, $.fn.multiLanguageBarSetter.defaults, options);
     };

     /**
      * if language set in the request this fıunction prepares url links for language bar
      * and sets langugage bar
      * @param {json object} data
      * @returns {null}
      * @author Mustafa Zeynel Dağlı
      * @since 24/12/2015
      */
     $.fn.multiLanguageBarSetter.setLanguageLinkByLangCode = function (data) { 
         var data = data;
         $.each(data, function(index, element) {
             var requestUriTranslatedLocal = $.fn.multiLanguageBarSetter.defaults.requestUriTranslated;
             requestUriTranslatedLocal = requestUriTranslatedLocal.replace("--dil--", element.language_main_code);
             if($.fn.multiLanguageBarSetter.defaults.langCode == element.language_main_code) {
                 $this.append('<li class="active" ><a href="'+requestUriTranslatedLocal+'" >'+element.language+' <i class="fa fa-check"></i> </a></li>');
             } else {
                 $this.append('<li><a href="'+requestUriTranslatedLocal+'" >'+element.language+' </a></li>');
             }
         });
     };  

     /**
      * 
      * @param {json object} data
      * @returns {null}
      * @author Mustafa Zeynel Dağlı
      * @since 24/12/2015
      */
     $.fn.multiLanguageBarSetter.setLanguageLinkBase = function (data) {
         var data = data;  
         $.each(data, function(index, element) {
             if($.fn.multiLanguageBarSetter.defaults.requestUriTranslated == '/') {  
                 if($.fn.multiLanguageBarSetter.defaults.baseLanguage == element.language_main_code) {
                 $this.append('<li class="active" ><a href="'+$.fn.multiLanguageBarSetter.defaults.basePath+''+element.language_main_code+'" >'+element.language+' <i class="fa fa-check"></i> </a></li>');
                 } else {
                     $this.append('<li><a href="'+$.fn.multiLanguageBarSetter.defaults.basePath+''+element.language_main_code+'" >'+element.language+' </a></li>');
                 }
             } else {
                 if($.fn.multiLanguageBarSetter.defaults.baseLanguage == element.language_main_code) {
                 $this.append('<li class="active" ><a href="'+$.fn.multiLanguageBarSetter.defaults.requestUriTranslated+'" >'+element.language+' <i class="fa fa-check"></i> </a></li>');
                 } else {
                     $this.append('<li><a href="'+$.fn.multiLanguageBarSetter.defaults.requestUriTranslated+'/'+element.language_main_code+'" >'+element.language+' </a></li>');
                 }
             }   

         }); 
     };

     /**
      * sets global variables for language bar widget functions
      * @author Mustafa Zeynel Dağlı
      * @since 24/12/2015
      */
     $.fn.multiLanguageBarSetter.defaults = {
         basePath : '/',
         baseLanguage : 'en',
         requestUriTranslated : '/',
         langCode : 'tr',
       };
}(jQuery));
        
