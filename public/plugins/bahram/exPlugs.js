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




}(jQuery));

