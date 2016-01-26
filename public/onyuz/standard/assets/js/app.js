/*
 * Template Name: Unify - Responsive Bootstrap Template
 * Description: Business, Corporate, Portfolio, E-commerce and Blog Theme.
 * Version: 1.7
 * Author: @htmlstream
 * Website: http://htmlstream.com
 */

var App = function () {
    //Fixed Header
    function handleHeader() {
        jQuery(window).scroll(function () {
            if (jQuery(window).scrollTop()) {
                jQuery(".header-fixed .header-sticky").addClass("header-fixed-shrink");
            }
            else {
                jQuery(".header-fixed .header-sticky").removeClass("header-fixed-shrink");
            }
        });
    }

    //Header Mega Menu
    function handleMegaMenu() {
        jQuery(document).on('click', '.mega-menu .dropdown-menu', function (e) {
            e.stopPropagation();
        })
    }

    //Search Box (Header)
    function handleSearch() {
        jQuery('.search').click(function () {
            if (jQuery('.search-btn').hasClass('fa-search')) {
                jQuery('.search-open').fadeIn(500);
                jQuery('.search-btn').removeClass('fa-search');
                jQuery('.search-btn').addClass('fa-times');
            } else {
                jQuery('.search-open').fadeOut(500);
                jQuery('.search-btn').addClass('fa-search');
                jQuery('.search-btn').removeClass('fa-times');
            }
        });
    }

    //Search Box v1 (Header v5)
    function handleSearchV1() {
        jQuery('.header-v5 .search-button').click(function () {
            jQuery('.header-v5 .search-open').slideDown();
        });

        jQuery('.header-v5 .search-close').click(function () {
            jQuery('.header-v5 .search-open').slideUp();
        });

        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 1)
                jQuery('.header-v5 .search-open').fadeOut('fast');
        });
    }

    // Search Box v2 (Header v8)
    function handleSearchV2() {
        $(".blog-topbar .search-btn").on("click", function () {
            if (jQuery(".topbar-search-block").hasClass("topbar-search-visible")) {
                jQuery(".topbar-search-block").slideUp();
                jQuery(".topbar-search-block").removeClass("topbar-search-visible");
            } else {
                jQuery(".topbar-search-block").slideDown();
                jQuery(".topbar-search-block").addClass("topbar-search-visible");
            }
        });
        $(".blog-topbar .search-close").on("click", function () {
            jQuery(".topbar-search-block").slideUp();
            jQuery(".topbar-search-block").removeClass("topbar-search-visible");
        });
        jQuery(window).scroll(function () {
            jQuery(".topbar-search-block").slideUp();
            jQuery(".topbar-search-block").removeClass("topbar-search-visible");
        });
    }

    // TopBar (Header v8)
    function handleTopBar() {
        $(".topbar-toggler").on("click", function () {
            if (jQuery(".topbar-toggler").hasClass("topbar-list-visible")) {
                jQuery(".topbar-menu").slideUp();
                jQuery(this).removeClass("topbar-list-visible");
            } else {
                jQuery(".topbar-menu").slideDown();
                jQuery(this).addClass("topbar-list-visible");
            }
        });
    }

    // TopBar SubMenu (Header v8)
    function handleTopBarSubMenu() {
        $(".topbar-list > li").on("click", function (e) {
            if (jQuery(this).children("ul").hasClass("topbar-dropdown")) {
                if (jQuery(this).children("ul").hasClass("topbar-dropdown-visible")) {
                    jQuery(this).children(".topbar-dropdown").slideUp();
                    jQuery(this).children(".topbar-dropdown").removeClass("topbar-dropdown-visible");
                } else {
                    jQuery(this).children(".topbar-dropdown").slideDown();
                    jQuery(this).children(".topbar-dropdown").addClass("topbar-dropdown-visible");
                }
            }
            //e.preventDefault();
        });
    }

    //Sidebar Navigation Toggle
    function handleToggle() {
        jQuery('.list-toggle').on('click', function () {
            jQuery(this).toggleClass('active');
        });

        /*
         jQuery('#serviceList').on('shown.bs.collapse'), function() {
         jQuery(".servicedrop").addClass('glyphicon-chevron-up').removeClass('glyphicon-chevron-down');
         }
         
         jQuery('#serviceList').on('hidden.bs.collapse'), function() {
         jQuery(".servicedrop").addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
         }
         */
    }

    //Equal Height Columns    
    function handleEqualHeightColumns() {
        var EqualHeightColumns = function () {
            $(".equal-height-columns").each(function () {
                heights = [];
                $(".equal-height-column", this).each(function () {
                    $(this).removeAttr("style");
                    heights.push($(this).height()); // write column's heights to the array
                });
                $(".equal-height-column", this).height(Math.max.apply(Math, heights)); //find and set max
            });
        }

        EqualHeightColumns();
        $(window).resize(function () {
            EqualHeightColumns();
        });
        $(window).load(function () {
            EqualHeightColumns("img.equal-height-column");
        });
    }

    //Hover Selector
    function handleHoverSelector() {
        $('.hoverSelector').on('hover', function (e) {
            $('.hoverSelectorBlock', this).toggleClass('show');
            e.stopPropagation();
        });
    }

    //Bootstrap Tooltips and Popovers
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

    return {
        init: function () {
            handleBootstrap();
            handleSearch();
            handleSearchV1();
            handleSearchV2();
            handleTopBar();
            handleTopBarSubMenu();
            handleToggle();
            handleHeader();
            handleMegaMenu();
            handleHoverSelector();
            handleEqualHeightColumns();
        },
        //Counters 
        initCounter: function () {
            jQuery('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        },
        //Parallax Backgrounds
        initParallaxBg: function () {
            jQuery(window).load(function () {
                jQuery('.parallaxBg').parallax("50%", 0.2);
                jQuery('.parallaxBg1').parallax("50%", 0.4);
            });
        },
        //Scroll Bar 
        initScrollBar: function () {
            jQuery('.mCustomScrollbar').mCustomScrollbar({
                theme: "minimal",
                scrollInertia: 200,
                scrollEasing: "linear"
            });
        },
        // Sidebar Menu Dropdown
        initSidebarMenuDropdown: function () {
            function SidebarMenuDropdown() {
                jQuery('.header-v7 .dropdown-toggle').on('click', function () {
                    jQuery('.header-v7 .dropdown-menu').stop(true, false).slideUp();
                    jQuery('.header-v7 .dropdown').removeClass('open');

                    if (jQuery(this).siblings('.dropdown-menu').is(":hidden") == true) {
                        jQuery(this).siblings('.dropdown-menu').stop(true, false).slideDown();
                        jQuery(this).parents('.dropdown').addClass('open');
                    }
                });
            }
            SidebarMenuDropdown();
        },
        //Animate Dropdown
        initAnimateDropdown: function () {
            function MenuMode() {
                jQuery('.dropdown').on('show.bs.dropdown', function () {
                    jQuery(this).find('.dropdown-menu').first().stop(true, true).slideDown();
                });
                jQuery('.dropdown').on('hide.bs.dropdown', function () {
                    jQuery(this).find('.dropdown-menu').first().stop(true, true).slideUp();
                });
            }

            jQuery(window).resize(function () {
                if (jQuery(window).width() > 768) {
                    MenuMode();
                }
            });

            if (jQuery(window).width() > 768) {
                MenuMode();
            }
        },
    };

}();

    
    /**
     * load imager widget for loading operations
     * @author Mustafa Zeynel Dağlı
     * @since 11/01/2016
     */

    $.widget("sanalfabrika.blockuiWrapper", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            message: '#growlUI-successfulReset',
            backgroundColor: '0080000',
            fadeOut: 700,
            showOverlay: false,
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            //this.element.append(this.options.overlay)
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        test: function () {
            //this.element.find(this.options.overlayKey).remove();
            $.blockUI({
                message: $(this.element),
                fadeIn: 700,
                fadeOut: this.options.fadeOut,
                timeout: 2000,
                showOverlay: this.options.showOverlay,
                centerY: true,
                css: {
                    width: '350px',
                    top: '50px',
                    left: '',
                    right: '10px',
                    border: 'none',
                    padding: '5px',
                    backgroundColor: '#' + this.options.backgroundColor,
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    'border-radius': '10px',
                    opacity: .9,
                    color: '#fff'
                }
            });
        }
    });

    /**
     * growlUI widget for approval growls with yes no buttons
     * without fadeout option. Fadeout happens uppon clicking on buttons
     * @author Bahram Lotfi Sadigh
     * @since 18/01/2016
     */

    $.widget("sanalfabrika.blockuiApprovalWrapper", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            message: '#growlUI-resetFormApproval',
            backgroundColor: '008080',
            showOverlay: false,
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            //this.element.append(this.options.overlay)
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        test: function () {
            //this.element.find(this.options.overlayKey).remove();
            $.blockUI({
                message: $(this.element),
                fadeIn: 700,  
                showOverlay: this.options.showOverlay,
                centerY: true,
                css: {
                    width: '350px',
                    top: '50px',
                    left: '',
                    right: '10px',
                    border: 'none',
                    padding: '5px',
                    backgroundColor: '#' + this.options.backgroundColor,
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    'border-radius': '10px',
                    opacity: .9,
                    color: '#fff'
                }
            });
        }
    });

    