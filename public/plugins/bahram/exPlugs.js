// multilanguage bar setter
(function ($) {
    /**
     * this function sets languga bar <li> for language bar front end interfaces
     * @param {json object} data
     * @param {array} options
     * @returns {null}
     * @author Mustafa Zeynel Dağlı
     * @since 23/12/2015
     */
    $.fn.multiLanguageBarSetter = function (data, options) {
        var data = data;
        $this = this;
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
        $.each(data, function (index, element) {
            var requestUriTranslatedLocal = $.fn.multiLanguageBarSetter.defaults.requestUriTranslated;
            requestUriTranslatedLocal = requestUriTranslatedLocal.replace("--dil--", element.language_main_code);

            if ($.fn.multiLanguageBarSetter.defaults.langCode == element.language_main_code) {
                $this.append('<li class="active" ><a href="' + requestUriTranslatedLocal + '" >' + element.language + ' <i class="fa fa-check"></i> </a></li>');
            } else {
                $this.append('<li><a href="' + requestUriTranslatedLocal + '" >' + element.language + ' </a></li>');
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
        var uriSlasher = '/';
        if ($.fn.multiLanguageBarSetter.defaults.requestUriTranslated.match(/\/$/)) {
            //console.warn('--/ karakteri ile bitiyor-->'+$.fn.multiLanguageBarSetter.defaults.requestUriTranslated);
            uriSlasher = '';
        }
        $.each(data, function (index, element) {
            if ($.fn.multiLanguageBarSetter.defaults.requestUriTranslated == '/') {
                if ($.fn.multiLanguageBarSetter.defaults.baseLanguage == element.language_main_code) {
                    $this.append('<li class="active" ><a href="/' + element.language_main_code + '/' + $.fn.multiLanguageBarSetter.defaults.basePath + '" >' + element.language + ' <i class="fa fa-check"></i> </a></li>');
                } else {
                    $this.append('<li><a href="/' + element.language_main_code + '/' + $.fn.multiLanguageBarSetter.defaults.basePath + '" >' + element.language + ' </a></li>');
                }
            } else {
                if ($.fn.multiLanguageBarSetter.defaults.baseLanguage == element.language_main_code) {
                    $this.append('<li class="active" ><a href="/' + element.language_main_code + '' + $.fn.multiLanguageBarSetter.defaults.requestUriTranslated + '" >' + element.language + ' <i class="fa fa-check"></i> </a></li>');
                } else {
                    $this.append('<li><a href="/' + element.language_main_code + '' + $.fn.multiLanguageBarSetter.defaults.requestUriTranslated + '" >' + element.language + ' </a></li>');
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
        basePath: '/',
        baseLanguage: 'en',
        requestUriTranslated: '/',
        langCode: 'tr',
    };
}(jQuery));

(function ($) {

    /**
     * set alpaca form due to machine tree selected machine item
     * @author Mustafa Zeynel Dağlı
     * @Edit: Bahram Lotfi
     * @since 29/02/2016
     */
    $.widget("sanalfabrika.machineGeneralInfoFormCreater", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            proxy: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            pk: $("#pk").val(),
            ajaxParams: null,
            machineID: null,
            //treeClass: ' .tree ',
            //treeID: ' #tree ',
            alpacaGenFormContainer: '#selectedMTGenInformation'
        },
        /**
         * private method to call sub nodes
         * @returns {null}
         */
        _create: function () {

        },
        /**
         * set alpaca plugin form
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 29/02/2016
         */
        setMachineGeneralInfoForm: function () {

            $(this.options.alpacaGenFormContainer).alpaca("destroy");
            $(this.options.alpacaGenFormContainer).empty();

            this._getGeneralServiceForAlpacaForm();
        },
        /**
         * 
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 29/02/2016
         */

        _getGeneralServiceForAlpacaForm: function () {
            self = this;

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    url: self.options.url,
                    pk: $("#pk").val(),
                    machine_id: self.options.machineID
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {

                    if (data.rows.length !== 0) {
                        $(self.options.alpacaGenFormContainer).alpaca({
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "manufacturer": {
                                        "type": "text"
                                    },
                                    "name": {
                                        "type": "text"
                                    },
                                    "model": {
                                        "type": "text"
                                    },
                                    "type": {
                                        "type": "text"
                                    }
                                }
                            },
                            "options": {
                                "fields": {
                                    "manufacturer": {
                                        "label": window.lang.translate("Machine Manufacturer"),
                                        "type": "text",
                                        "readonly": true
                                    },
                                    "name": {
                                        "label": window.lang.translate("Machine Name"),
                                        "type": "text",
                                        "disabled": true,
                                    },
                                    "model": {
                                        "label": window.lang.translate("Machine Model"),
                                        "type": "text",
                                        "disabled": true
                                    },
                                    "type": {
                                        "label": window.lang.translate("Machine Type"),
                                        "type": "text",
                                        "disabled": true
                                    }
                                }
                            },
                            "data": {
                                "manufacturer": data.rows[0].manufacturer_name,
                                "name": data.rows[0].machine_tool_names,
                                "model": data.rows[0].model_year,
                                "type": data.rows[0].machine_tool_grup_names
                            }
                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    console.error(textStatus);
                }
            });
        }
    });

    /*
     * paginator widget 
     * @author: Bahram Lotfi Sadigh
     * @Since: 2016.03.20
     */

    if ($('#pk').val()) {
        window.list_service_url = 'pkFillCompanyLists_infoFirmProfile';
    } else {
        window.list_service_url = 'fillCompanyListsGuest_infoFirmProfile';
    }
    $.widget("sanalfabrika.paginator", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            total: 50,
            page: 1,
            maxVisible: 5,
            leaps: true,
            firstLastUse: true,
            first: '<span aria-hidden="true">&larr;</span>',
            last: '<span aria-hidden="true">&rarr;</span>',
            wrapClass: 'pagination',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        paginate: function () {

            $('#paginationBar').bootpag({
                total: this.options.total,
                page: this.options.page,
                maxVisible: this.options.maxVisible,
                leaps: this.options.leaps,
                firstLastUse: this.options.firstLastUse,
                first: this.options.first,
                last: this.options.last,
                wrapClass: this.options.wrapClass,
                activeClass: this.options.activeClass,
                disabledClass: this.options.disabledClass,
                nextClass: this.options.nextClass,
                prevClass: this.options.prevClass,
                lastClass: this.options.lastClass,
                firstClass: this.options.firstClass
            }).on("page", function (event, num) {

                $("#pagination_content").empty();

                window.testLoadImage = $("#clients_left_side").loadSpinner();
                window.testLoadImage.loadSpinner('appendImage');

                $.ajax({
                    url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                    //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                    data: {url: window.list_service_url,
                        pk: $('#pk').val(),
                        language_code: $("#langCode").val(),
                        page: num,
                        rows: window.companyperpage,
                        sort: null,
                        order: null
                    },
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
//                        console.log(data);
                        var i;
                        for (i = 0; i < 10; i++) {

                            $('#selectedCompanyNpk').val(data.rows[i].npk);
                            var rep_firm_short_name = data.rows[i].firm_name_short.toString().replace(" ", "-");
                            $('#selectedCompanyShN').val(rep_firm_short_name);
                            var companyProfileLink = window.location.href.replace(/clientspage/, "companyprofile/" + $('#selectedCompanyShN').val() + "/" + $('#selectedCompanyNpk').val());

                            var appending_html =
                                    "<!-- Clients Block-->"
//                        + "<a href='#'>"
                                    + "<div class='row clients-page ' style='border-bottom: solid 5px #eee;'>"
                                    + "<div class = 'col-md-2' style='box-shadow: 0 0 30px #7c8082;'>"
                                    + "<img src='/onyuz/standard/assets/img/sfClients/"
                                    + data.rows[i].logo
                                    + "' "
                                    + "class = 'img-responsive hover-effect' alt = '' / >"
                                    + "</div>"
                                    + "<div class = 'col-md-10' id='"
                                    + data.rows[i].npk
                                    + "'>"
                                    + "<a href='"
                                    + companyProfileLink
                                    + "'>"
                                    + "<h3>"
                                    + data.rows[i].firm_names
                                    + "</h3>"
                                    + "</a>"
                                    + "<p>"
                                    + data.rows[i].fim_description
                                    + "</p>"
                                    + "<ul class = 'list-inline'>"
                                    + "<li>"
                                    + "<i class = 'fa fa-map-marker color-green' style='padding-right:5px;'></i>"
                                    + data.rows[i].country_names
                                    + "</li>"
                                    + "<li><i class = 'fa fa-globe color-green' style='padding-right:5px;'></i>"
                                    + data.rows[i].web_address
                                    + "<li>"
                                    + "<i class = 'fa fa-mail-forward color-green' style='padding-right:5px;'> </i>"
                                    + data.rows[i].email
                                    + "</li>"
                                    + "<li>"
                                    + "<i class = 'fa fa-microphone color-green' style='padding-right:5px;'> </i>"
                                    + data.rows[i].tel
                                    + "</li>"
                                    + "<li>"
                                    + "<i class = 'fa fa-fax color-green' style='padding-right:5px;'> </i>"
                                    + data.rows[i].fax
                                    + "</li>"
                                    + "<li>"
                                    + "<i class = 'fa fa-asterisk color-green' style='padding-right:5px;'> </i>"
                                    + data.rows[i].total_machines
                                    + "</li>"
                                    + "<li>"
                                    + "<i class = 'fa fa-sitemap color-green' style='padding-right:5px;'> </i>"
                                    + data.rows[i].firm_sectoral
                                    + "</li>"
                                    + "</ul>"
                                    + "</div>"
//                                    + "</div>"
//                                    + "</a>"
                                    + "<!-- End Clinets Block --> ";
//                            console.log(appending_html);
                            var newappend = $(appending_html);
                            $(newappend).appendTo($("#pagination_content"));

                        }
                        window.testLoadImage.loadSpinner('removeLoadImage');
                    }
                });
                $("html, body").animate({scrollTop: $(".header").offset().top}, "slow");
                event.preventDefault();
            });
        }
    });



    $.widget("sanalfabrika.search_paginator", {
        /**
         * Default options.
         * @returns {null}
         */

        options: {
            total: 50,
            page: 1,
            maxVisible: 5,
            leaps: true,
            firstLastUse: true,
            first: '<span aria-hidden="true">&larr;</span>',
            last: '<span aria-hidden="true">&rarr;</span>',
            wrapClass: 'pagination',
            activeClass: 'active',
            disabledClass: 'disabled',
            nextClass: 'next',
            prevClass: 'prev',
            lastClass: 'last',
            firstClass: 'first'
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        search_paginate: function () {

            $('#paginationBar').bootpag({
                total: this.options.total,
                page: this.options.page,
                maxVisible: this.options.maxVisible,
                leaps: this.options.leaps,
                firstLastUse: this.options.firstLastUse,
                first: this.options.first,
                last: this.options.last,
                wrapClass: this.options.wrapClass,
                activeClass: this.options.activeClass,
                disabledClass: this.options.disabledClass,
                nextClass: this.options.nextClass,
                prevClass: this.options.prevClass,
                lastClass: this.options.lastClass,
                firstClass: this.options.firstClass
            }).on("page", function (event, num) {

                $("#pagination_content").empty();

                window.testLoadImage = $("#pagination_content").loadSpinner();
                window.testLoadImage.loadSpinner('appendImage');

                $.ajax({
                    url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                    //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                    data: {
                        url: 'fillCompanyListsGuest_infoFirmProfile',
                        pk: $('#pk').val(),
                        language_code: $("#langCode").val(),
                        page: num,
                        rows: 10,
                        sort: null,
                        order: null,
                        company_name: $('#company_name').val(),
                        country_id: window.selected_country_id,
                        sector_id: window.selected_sector_id
                    },
                    method: "GET",
                    dataType: "json",
                    success: function (data) {
//                        console.log(data);
                        if (data.rows) {
                            var i;
                            for (i = 0; i < 10; i++) {

                                $('#selectedCompanyNpk').val(data.rows[i].npk);
                                var rep_firm_short_name = data.rows[i].firm_name_short.toString().replace(" ", "-");
                                $('#selectedCompanyShN').val(rep_firm_short_name);
                                var companyProfileLink = window.location.href.replace(/clientspage/, "companyprofile/" + $('#selectedCompanyShN').val() + "/" + $('#selectedCompanyNpk').val());

                                var appending_html =
                                        "<!-- Clients Block-->"
//                        + "<a href='#'>"
                                        + "<div class='row clients-page ' style='border-bottom: solid 5px #eee;'>"
                                        + "<div class = 'col-md-2' style='box-shadow: 0 0 30px #7c8082;'>"
                                        + "<img src='/onyuz/standard/assets/img/sfClients/"
                                        + data.rows[i].logo
                                        + "' "
                                        + "class = 'img-responsive hover-effect' alt = '' / >"
                                        + "</div>"
                                        + "<div class = 'col-md-10' id='"
                                        + data.rows[i].npk
                                        + "'>"
                                        + "<a href='"
                                        + companyProfileLink
                                        + "'>"
                                        + "<h3>"
                                        + data.rows[i].firm_names
                                        + "</h3>"
                                        + "</a>"
                                        + "<p>"
                                        + data.rows[i].fim_description
                                        + "</p>"
                                        + "<ul class = 'list-inline'>"
                                        + "<li>"
                                        + "<i class = 'fa fa-map-marker color-green' style='padding-right:5px;'></i>"
                                        + data.rows[i].country_names
                                        + "</li>"
                                        + "<li><i class = 'fa fa-globe color-green' style='padding-right:5px;'></i>"
                                        + data.rows[i].web_address
                                        + "<li>"
                                        + "<i class = 'fa fa-mail-forward color-green' style='padding-right:5px;'> </i>"
                                        + data.rows[i].email
                                        + "</li>"
                                        + "<li>"
                                        + "<i class = 'fa fa-microphone color-green' style='padding-right:5px;'> </i>"
                                        + data.rows[i].tel
                                        + "</li>"
                                        + "<li>"
                                        + "<i class = 'fa fa-fax color-green' style='padding-right:5px;'> </i>"
                                        + data.rows[i].fax
                                        + "</li>"
                                        + "<li>"
                                        + "<i class = 'fa fa-asterisk color-green' style='padding-right:5px;'> </i>"
                                        + data.rows[i].total_machines
                                        + "</li>"
                                        + "<li>"
                                        + "<i class = 'fa fa-sitemap color-green' style='padding-right:5px;'> </i>"
                                        + data.rows[i].firm_sectoral
                                        + "</li>"
                                        + "</ul>"
                                        + "</div>"
//                                    + "</div>"
//                                    + "</a>"
                                        + "<!-- End Clinets Block --> ";
//                            console.log(appending_html);
                                var newappend = $(appending_html);
                                $(newappend).appendTo($("#pagination_content"));

                            }
                            window.testLoadImage.loadSpinner('removeLoadImage');
                        }
                    }
                });
                $("html, body").animate({scrollTop: $(".header").offset().top}, "slow");
                event.preventDefault();
            });
        }
    });


    /**
     * widget for front page notifications
     * @author Mustafa Zeynel Dağlı
     * @since 13/12/2016
     */
    $.widget("sanalfabrika.notifications", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            proxy: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            pk: $("#pk").val(),
            langCode: $('#langCode').val(),
            serviceUrl: 'getUsersCompanyNotifications_ActUsersActionStatistics',
            container: $('#notificationWidget'),
            appendText: '',
        },
        /**
         * @returns {null}
         */
        _create: function () {

        },
        /**
         * get notifications from service
         * @author Mustafa Zeynel Dağlı
         * @since 13/12/2016
         */
        getNotifications: function () {
            var self = this;
            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    url: self.options.serviceUrl,
                    zk: self.options.pk,
                    language_code: self.options.langCode,
                    machine_id: self.options.machineID
                },
                type: 'GET',
                dataType: 'json',
                async: true,
                success: function (data, textStatus, jqXHR) {
                    self._trigger('onServiceSuccess', event, {
                        element: this.element
                    });
                    self._setNotifications(data);
                    $("#notificationWidget").mCustomScrollbar()
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //console.log('error');
                    console.error(textStatus);
                }
            });
        },
        /**
         * set notifications from rest service data
         * @param {type} data
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 21/12/2016
         */
        _setNotifications: function (data) {
            var self = this;
            self._setNotificationsHeader();
            //console.log(data);
            $.each(data, function (key, row) {
                //console.log(row);
                var iconPath = null;
                if (row.icon_path != null) {
                    iconPath = '<img class="rounded-x" src="' + row.icon_path + '" alt="">'
                } else {
                    iconPath = '<i class="' + row.icon_class + '"></i>';
                }


                self.options.appendText += '<li class="notification"> \n\
                                        ' + iconPath + '\n\
                                        <div class="overflow-h">\n\
                                            <span>\n\
                                                    <strong>' + row.name + ' ' + row.surname + '</strong>&nbsp&nbsp&nbsp' + row.notification + '\
                                            </span>\n\
                                                <small>' + row.processingtime + ' </small>\n\
                                        </div>\n\
                                    </li>';
            });
            self._setNotificationsFooter();
            self.element.append(self.options.appendText);
        },
        /**
         * set notifications footer html text
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 21/12/2016
         */
        _setNotificationsFooter: function () {
            var self = this;
            self.options.appendText += '</ul>\n\
                                        </div>';
        },
        /**
         * set notifications header html text
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 2/12/2016
         */
        _setNotificationsHeader: function () {
            var self = this;
            self.options.appendText += '<div class="panel-heading-v2 overflow-h " style="margin-top: 20px">\n\
                                        <h2 class="heading-xs pull-left">\n\
                                            <i class="fa fa-bell-o"></i> ' + self.element.attr('attr-notification') + '</h2>\n\
                                            <a href="#">\n\
                                                <i class="fa fa-cog pull-right"></i>\n\
                                            </a>\n\
                                        </div>\n\
                                        <div class="margin-bottom-20 "  >\n\
                                        <ul class="list-unstyled mCustomScrollbar margin-bottom-20 box" data-mcs-theme="minimal-dark" id="notificationWidget">';
        }

    });

    /**
     * load imager widget for loading operations, same class used for admin pages
     * @author Mustafa Zeynel Dağlı
     * @since 14/12/2016
     */
    $.widget("sanalfabrika.loadSpinner", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            overlay: "<div class='overlay'><div class='fa fa-refresh fa-spin'></div></div>",
            overlayKey: ".overlay:first",
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            var self = this;
            //self.element.append(self.options.overlay);
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        removeLoadImage: function () {
            var self = this;
            self.element.find(self.options.overlayKey).remove();
        },
        appendImage: function () {
            var self = this;
            if (typeof self.element.find(self.options.overlayKey) != 'undefined') {
                self.element.append(self.options.overlay);
            }

        }
    });

    /**
     * Widget for banner info modules(ex. companyProfile page)
     * @author Mustafa Zeynel Dağlı
     * @since 23/12/2016
     * @deprecated not used yet, some development must be made before use
     */
    $.widget('sanalfabrika.pageGuests', {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            proxy: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            pk: $("#pk").val(),
            npk: $('#selectedCompanyNpk').val(),
            //langCode : $('#langCode').val(),
            serviceUrl: 'getUsersLeftNotifications_ActUsersActionStatistics',
            container: $('#guestBannerWidget'),
            appendText: null,
            template: null,
            mainHeader: null,
            leftColumnMainHeader: null,
            rightColumnMainHeader: null,
            footerHeader: null,
            mainContentHeader: null,
        },
        /**
         * @returns {null}
         */
        _create: function () {

        },
        /**
         * get guest info from service
         * @author Mustafa Zeynel Dağlı
         * @since 21/12/2016
         */
        getGuestsData: function () {
            var self = this;
            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    url: self.options.serviceUrl,
                    //pk: self.options.pk,
                    npk: self.options.npk,
                    //langCode : self.options.langCode,
                },
                type: 'GET',
                dataType: 'json',
                //async: true,
                success: function (data, textStatus, jqXHR) {
                    /*self._trigger('onServiceSuccess',event, { 
                     element : this.element
                     } );*/
                    self._setGuestsData(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //console.log('error');
                    console.error(textStatus);
                }
            });
        },
        /**
         * set Guests data from rest service data
         * @param {type} data
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 21/12/2016
         */
        _setGuestsData: function (data) {
            var self = this;
            var ob = self.element.find("span.counter");
            console.log(ob);
            var test = ob.attr('attr-test');
            console.log(test);
        },
        _setTemplate: function () {
            var self = this;
            self.options.template = '<div class="service-block-v3 service-block-aviation" >\n\
                            <i class="icon-users"></i>\n\
                            <span class="service-heading">\n\
                                ' + self.options.mainHeader + '\n\
                            </span>\n\
                            <span id="visitor_total" class="counter"></span>\n\
                            <div class="clearfix margin-bottom-10"></div>\n\
                            <div class="row margin-bottom-20">\n\
                                <div class="col-xs-6 service-in">\n\
                                    <small>' + self.options.leftColumnMainHeader + '</small>\n\
                                    <h4 id="visitor_last_six" class="counter"></h4>\n\
                                </div>\n\
                                <div class="col-xs-6 text-right service-in">\n\
                                    <small>' + self.options.rightColumnMainHeader + '</small>\n\
                                    <h4 id="visitor_last_twelve" class="counter"></h4>\n\
                                </div>\n\
                            </div>\n\
                            <div class="statistics">\n\
                                <h3 class="heading-xs">' + self.options.mainContentHeader + '\n\
                                    <span id="visitor_rate_number" class="pull-right"></span></h3>\n\
                                <div class="progress progress-u progress-xxs">\n\
                                    <div id="visitor_bar" style="width" aria-valuemax="100" aria-valuemin="0" aria-valuenow="" role="progressbar" class="progress-bar progress-bar-light">\n\
                                    </div>\n\
                                </div>\n\
                                <small id="total_sys_visitors"></small>\n\
                                <small> 378 <strong> ' + self.options.mainHeader + ' </strong></small>\n\
                            </div>\n\
                        </div>'
        }


    });
    
    
    


}(jQuery));



function setredirect() {
    var currenturl = window.location.href;
    var action = $('#controller').val();
//    console.log(currenturl);
    var targeturl = currenturl.replace(action, 'cpgeneralset');
//    console.log(targeturl);
    window.location.replace(targeturl);
}

function setredirectprofile() {
    var currenturl = window.location.href;
    var upnk = $('#user_profile_link_a').attr('unpk');

    if (currenturl.indexOf($('#selectedCompanyShN').val()) > 0) {

        var replacing_part = $('#controller').val()
                + '/'
                + $('#selectedCompanyShN').val()
                + '/'
                + $('#selectedCompanyNpk').val();
    } else {
        var replacing_part = $('#controller').val();
    }

    var targeturl = currenturl.replace(replacing_part, 'userprofile');
    window.location.replace(targeturl);
}

function showuserdetails() {
    $('#user_detailed_info_bulb').css('visibility', 'visible');
    $('#user_detailed_info_bulb').css('display', '');
}

function hideuserdetails() {
    $('#user_detailed_info_bulb').css('visibility', 'hidden');
    $('#user_detailed_info_bulb').css('display', 'none');
}

function showcompanydetails() {
    $('#company_detailed_info_bulb').css('visibility', 'visible');
    $('#company_detailed_info_bulb').css('display', '');
}

function hidecompanydetails() {
    $('#company_detailed_info_bulb').css('visibility', 'hidden');
    $('#company_detailed_info_bulb').css('display', 'none');
}

