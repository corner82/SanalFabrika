$(document).ready(function () {

    /**
     * multilanguage plugin 
     * @type Lang
     */

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#langCode').val());


    /*
     * Left menuyu oluÅŸturmak iÃ§in Ã§aÄŸÄ±rÄ±lan fonksiyon...
     */

    $.fn.leftMenuFunction();

    window.sel_count_id;
    window.sel_comp_count_id;
    window.cityList;
    window.boroughList;

    /*
     * Bootstrap modals variables
     * @type @call;$@call;successMessage
     */

    $("#new_mt_details_form").validationEngine({promptPosition: "topLeft:100%,0"});

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Confirm')});

    /*
     * Get countries list for address 
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syscountrys',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
//                console.log(data);
                $('#company_country_ph').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a country from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
                        window.sel_count_id = selectedData.selectedData.value;
                    }
                });
                $('#company_country_address_ph').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a country from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
                        window.sel_comp_count_id = selectedData.selectedData.value;
                        if (selectedData.selectedData.value !== 0) {

                            window.cityList = selectedData.selectedData.attributes.citylist;
                            window.boroughList = false;
                        }
                        window.sel_count_id = selectedData.selectedData.value;
//                    selectedCountryList = selectedData                    
                        companyCityDropDownUpdate();
                        //callback function: do something with selectedData;
                    }
                });
            } else {
                console.error('"fillComboBox_syscountrys" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_syscountrys" servis hatasÃ„Â±->' + textStatus);
        }
    });


});

