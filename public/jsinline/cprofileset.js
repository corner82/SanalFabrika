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
     * List of countries
     */

    window.sel_count_id;
    window.sel_comp_count_id;
    window.cityList;
    window.boroughList;

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({denyButtonLabel: 'Vazgeç',
        actionButtonLabel: 'İşleme devam et'});

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
                console.error('"fillComboBox_syscountrys" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_syscountrys" servis hatasÄ±->' + textStatus);
        }
    });

    /*
     * Address drop down list for cities
     * @returns {undefined}
     */
    function companyCityDropDownUpdate() {

        $("#company_city").empty();
        $("#company_district").empty();
        if (window.cityList === true) {
            $('#company_city_address_ph').hide();
            $('#city_dropdown').show();
        } else {
            $('#company_city_address_ph').show();
            $('#city_dropdown').hide();
        }

        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'fillComboBox_syscity',
                country_id: window.sel_count_id,
                language_code: $("#langCode").val(),
                component_type: 'ddslick'
            },
            type: 'GET',
            dataType: 'json',
            //data: 'rowIndex='+rowData.id,
            success: function (data, textStatus, jqXHR) {
                if (data.length !== 0) {

                    $('#company_city').ddslick('destroy');
                    $('#company_city').ddslick({
                        data: data,
                        width: '100%',
                        height: '500%',
                        background: false,
                        selectText: window.lang.translate("Please select a city from list..."),
                        imagePosition: 'right',
                        onSelected: function (selectedData) {
//                        console.log(selectedData.selectedData);
                            window.sel_city_id = selectedData.selectedData.value;
                            if (window.sel_city_id !== 0) {
                                window.boroughList = selectedData.selectedData.attributes.boroughlist;
                            }
//                            console.log(selectedData);
//                            console.log(selectedCityId);
                            districtDropDownUpdate();
                            //callback function: do something with selectedData;
                        }
                    });
                } else {
                    console.error('"fillComboBox_syscity" servis datasÄ± boÅŸtur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('"fillComboBox_syscity" servis hatasÄ±->' + textStatus);
            }
        });
    }

    /*
     * Address drop down list for districts
     * @returns {undefined}
     */
    function districtDropDownUpdate() {

        $("#company_district").empty();
        if (window.boroughList === true) {
            $('#district_dropdown').show();
        } else {
            $('#district_dropdown').hide();
        }

        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'fillComboBox_sysborough',
                country_id: window.sel_count_id,
                city_id: window.sel_city_id,
                language_code: $("#langCode").val(),
                component_type: 'ddslick'
            },
            type: 'GET',
            dataType: 'json',
            //data: 'rowIndex='+rowData.id,
            success: function (data, textStatus, jqXHR) {
                if (data.length !== 0) {
//                console.log(data);
                    $('#company_district').ddslick('destroy');
                    $('#company_district').ddslick({
                        data: data,
                        width: '100%',
                        height: '500%',
                        background: false,
                        selectText: window.lang.translate("Please select a district from list..."),
                        imagePosition: 'right',
                        onSelected: function (selectedData) {
                            window.sel_dis_id = selectedData.selectedData.value;
//                            console.log(selectedData);
//                            console.log(selectedDistrictId);
                            //callback function: do something with selectedData;
                        }
                    });
                } else {
                    console.error('"fillComboBox_sysborough" servis datasÄ± boÅŸtur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('"fillComboBox_sysborough" servis hatasÄ±->' + textStatus);
            }
        });
    }

    /*
     * Company's registrered but not approved social media links
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {url: "pkFillSingularFirmSocialMedia_infoFirmSocialmedia",
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $("#pk").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('#ava_med_ph').empty();
            var i;
            for (i = 0; i < data.rows.length; i++) {

                var social_media_name = data.rows[i].socialmedia_name;

                if (social_media_name === 'googleplus') {
                    social_media_name = 'google-plus';
                }

                var social_url = data.rows[i].firm_link;
                var appending =
                        "<div class='btn-group' id='"
                        + social_media_name
                        + "_btn_group' url_value='"
                        + social_url
                        + "' selected_soc_id='"
//                        + data[i].
                        + "'>"
                        + "<a id='"
                        + social_media_name
                        + "_button"
                        + "' class='btn btn-social-icon dropdown-toggle btn-"
                        + social_media_name
                        + "' data-toggle='dropdown' aria-expanded='false' target='_newtab' "
                        + " "
                        + "style='margin-left:5px'>"
                        + "<i class='fa fa-"
                        + social_media_name
                        + "'></i>"
                        + "</a>"
                        + "<button type='button' class='btn dropdown-toggle btn-"
                        + social_media_name
                        + "' data-toggle='dropdown' aria-expanded='false'>"
                        + "<span class='caret'></span>"
                        + "<span class='sr-only'>Toggle Dropdown</span>"
                        + "</button>"
                        + "<ul class='dropdown-menu' role='menu'>"
                        + "<li class='btn' id='"
                        + social_media_name
                        + "_goto_btn' onclick='goto_social(this)'>"
                        + window.lang.translate('Goto')
                        + "</li><br/>"
//                        + "<li class='btn' id='"
//                        + social_media_name
//                        + "_edit_btn' onclick='edit_social(this)'>"
//                        + window.lang.translate('Edit')
//                        + "</li><br/>"
                        + "<li class='btn' id='"
                        + social_media_name
                        + "_remove_btn' onclick='remove_social(this)'>"
                        + window.lang.translate('Delete')
                        + "</li>"
                        + "</ul>"
                        + "</div>";
                $('#ava_med_ph').append(appending);
            }
        }
    });

    /*
     * get the company's available social media links
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkFillCompanyInfoSocialedia_infoFirmProfile',
            language_code: $("#langCode").val(),
            component_type: 'ddslick',
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
                $('#social_media').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a social media from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        $('#social_media_name_ph').empty();
                        var appending =
                                "<label id='social_media_name_ph'></label>"
                                + "<div class='input-group'>"
                                + "<div class='input-group-addon'>"
                                + "<i id='social_icon' class=''></i>"
                                + "</div>"
                                + "<input id='social_address' type='text' class='form-control'>"
                                + "</div>";
                    }

                });
                var i;
                for (i = 0; i < data.length; i++) {

                    var social_media_name = data[i].text;
                    if (social_media_name === 'googleplus') {
                        social_media_name = 'google-plus';
                    }
                    var appending =
                            "<a class='btn btn-social-icon btn-"
                            + social_media_name
                            + "'>"
                            + "<i class='fa fa-"
                            + social_media_name
                            + "'></i>"
                            + "</a>";
                    if (appending.indexOf('undefined') < 0) {
                        $('#ava_med_ph').append(appending);
                    }

                }

            } else {
                console.error('"pkFillCompanyInfoSocialedia_infoFirmProfile" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"pkFillCompanyInfoSocialedia_infoFirmProfile" servis hatasÄ±->' + textStatus);
        }
    });

    /*
     * Fill system social media list drop down
     * ddslick drop down
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkFillSocicalMediaDdList_sysSocialMedia',
            language_code: $("#langCode").val(),
            component_type: 'ddslick',
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

                var i;
                for (i = 0; i < data.length; i++) {
                    var new_imagesrc = data[i].imageSrc.replace('/Logos/', '');
                    data[i].imageSrc = "https://" + window.location.hostname + "/onyuz/standard/assets/img/icons/social/socialmediav2/" + new_imagesrc;
                }

                $('#social_media_ph').ddslick('destroy');
                $('#social_media_ph').ddslick({
                    data: data,
                    imagePosition: "left",
                    width: '100%',
                    height: '500%',
                    background: true,
                    selectText: window.lang.translate("Please select a social media from list..."),
                    onSelected: function (selectedData) {

                        var selected = selectedData.selectedData.text;
                        if (selected === 'googleplus') {
                            selected = 'google-plus';
                        }

                        if ($('#sel_med_ph').find('.form-control').length) {

                            var remained_soc_med = $('#sel_med_ph').find('.form-control').attr('id').replace('_input_field', ''),
                                    default_url = "https://www." + remained_soc_med + ".com/",
                                    found_value = $('#sel_med_ph').find('.form-control').attr('value'),
                                    remained_soc_med_id = $('#sel_med_ph').find('.btn').attr('selected_soc_id');

                            window.remaining_temp_url = $("#" + remained_soc_med + "_input_field").val();

                            if (window.remaining_temp_url !== default_url && window.remaining_temp_url.indexOf((default_url)) > -1) {

                                wcm.warningComplexMessage({
                                    onConfirm: function () {
                                        $('#sel_med_ph').empty();
                                        var appending
                                                =
                                                "<div id='"
                                                + selected
                                                + "_ph' style='margin-top: 20px'>"
                                                + "<a id='"
                                                + selected
                                                + "_long' selected_soc_id='"
                                                + selectedData.selectedData.value
                                                + "' class='btn btn-block btn-social btn-"
                                                + selected
                                                + "' onclick='changecontent(this)'>"
                                                + "<i class='fa fa-"
                                                + selected
                                                + "'></i>"
                                                + "<span id='"
                                                + selected
                                                + "_span'>"
                                                + window.lang.translate("Enter your account")
                                                + "</span>"
                                                + "</a>"
                                                + "<div id='"
                                                + selected
                                                + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
                                                + "<span class='input-group-btn'>"
                                                + "<a id='"
                                                + selected
                                                + "_input_button' class='btn btn-social-icon btn-"
                                                + selected
                                                + "' onclick='checkContent(this)'><i class='fa fa-"
                                                + selected
                                                + "'></i></a>"
                                                + "</span>"
                                                + "<input id='"
                                                + selected
                                                + "_input_field' type='text' class='form-control' value='https://www."
                                                + selected
                                                + ".com/'>"
                                                + "</div>"
                                                + "</div>";
                                        $('#sel_med_ph').append(appending);
                                    }
                                });
                                wcm.warningComplexMessage('show', remained_soc_med + ' changes!!',
                                        'Changes for ' + remained_soc_med + ' will be lost. Do you want to continue?');
                            } else {
                                $('#sel_med_ph').empty();
                                var appending
                                        =
                                        "<div id='"
                                        + selected
                                        + "_ph' style='margin-top: 20px'>"
                                        + "<a id='"
                                        + selected
                                        + "_long' selected_soc_id='"
                                        + selectedData.selectedData.value
                                        + "' class='btn btn-block btn-social btn-"
                                        + selected
                                        + "' onclick='changecontent(this)'>"
                                        + "<i class='fa fa-"
                                        + selected
                                        + "'></i>"
                                        + "<span id='"
                                        + selected
                                        + "_span'>"
                                        + window.lang.translate("Enter your account")
                                        + "</span>"
                                        + "</a>"
                                        + "<div id='"
                                        + selected
                                        + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
                                        + "<span class='input-group-btn'>"
                                        + "<a id='"
                                        + selected
                                        + "_input_button' class='btn btn-social-icon btn-"
                                        + selected
                                        + "' onclick='checkContent(this)'><i class='fa fa-"
                                        + selected
                                        + "'></i></a>"
                                        + "</span>"
                                        + "<input id='"
                                        + selected
                                        + "_input_field' type='text' class='form-control' value='https://www."
                                        + selected
                                        + ".com/'>"
                                        + "</div>"
                                        + "</div>";
                                $('#sel_med_ph').append(appending);
                            }
                        } else {

                            $('#sel_med_ph').empty();
                            var appending
                                    =
                                    "<div id='"
                                    + selected
                                    + "_ph' style='margin-top: 20px'>"
                                    + "<a id='"
                                    + selected
                                    + "_long' selected_soc_id='"
                                    + selectedData.selectedData.value
                                    + "' class='btn btn-block btn-social btn-"
                                    + selected
                                    + "' onclick='changecontent(this)'>"
                                    + "<i class='fa fa-"
                                    + selected
                                    + "'></i>"
                                    + "<span id='"
                                    + selected
                                    + "_span'>"
                                    + window.lang.translate("Enter your account")
                                    + "</span>"
                                    + "</a>"
                                    + "<div id='"
                                    + selected
                                    + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
                                    + "<span class='input-group-btn'>"
                                    + "<a id='"
                                    + selected
                                    + "_input_button' class='btn btn-social-icon btn-"
                                    + selected
                                    + "' onclick='checkContent(this)'><i class='fa fa-"
                                    + selected
                                    + "'></i></a>"
                                    + "</span>"
                                    + "<input id='"
                                    + selected
                                    + "_input_field' type='text' class='form-control' value='https://www."
                                    + selected
                                    + ".com/'>"
                                    + "</div>"
                                    + "</div>";
                            $('#sel_med_ph').append(appending);
                        }
                    }
                });
            } else {
                console.error('"pkFillSocicalMediaDdList_sysSocialMedia" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"pkFillSocicalMediaDdList_sysSocialMedia" servis hatasÄ±->' + textStatus);
        }
    });
});


var sm = $(window).successMessage();
var dm = $(window).dangerMessage();
var wm = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({denyButtonLabel: 'Vazgeç',
    actionButtonLabel: 'İşleme devam et'});

/*
 * Change social media shape to edit content of url
 */

function changecontent(element) {
    window.selected_soc_med_id = $('#' + element.id).attr('selected_soc_id');
//    console.log(window.selected_soc_med_id);
    var social_media_name = element.id.replace('_long', '');
    $("#" + element.id).hide();
    $("#" + social_media_name + "_input").fadeIn('');
}


/*
 * After editing url checks for changes and edit or insert new social media link
 */


function checkContent(element) {

    var social_media_name = element.id.replace('_input_button', '');
    var social_media_name_ph = element.id.replace('_button', '');

    if ($("#" + social_media_name_ph + "_field").val() !== "https://www." + social_media_name + ".com/" && $("#" + social_media_name_ph + "_field").val().indexOf(("https://www." + social_media_name + ".com/")) > -1) {

        window.temp_url = $("#" + social_media_name_ph + "_field").val();
        $("#" + social_media_name + "_long").html("<i class='fa fa-" + social_media_name + "'></i>" + $("#" + social_media_name_ph + "_field").val());
        $("#" + social_media_name + "_long").hide();
        $("#" + social_media_name + "_input").hide();
        window.temp_soc_med_name = social_media_name;

        /*
         * Insert new url
         */

        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_infoFirmSocialmedia',
                pk: $("#pk").val(),
                npk: $("#selectedCompanyNpk").val(),
                language_code: $("#langCode").val(),
                sys_socialmedia_id: window.selected_soc_med_id,
                firm_link: window.temp_url,
                profile_public: 0
            },
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data['errorInfo'][0] === '00000') {

                    var appending =
                            "<div class='btn-group' id='"
                            + social_media_name
                            + "_btn_group' url_value='"
                            + window.temp_url
                            + "'>"
                            + "<a id='"
                            + social_media_name
                            + "_button"
                            + "' class='btn btn-social-icon dropdown-toggle btn-"
                            + social_media_name
                            + "' data-toggle='dropdown' aria-expanded='false' target='_newtab' "
                            + " "
                            + "style='margin-left:5px'>"
                            + "<i class='fa fa-"
                            + social_media_name
                            + "'></i>"
                            + "</a>"
                            + "<button type='button' class='btn dropdown-toggle btn-"
                            + social_media_name
                            + "' data-toggle='dropdown' aria-expanded='false'>"
                            + "<span class='caret'></span>"
                            + "<span class='sr-only'>Toggle Dropdown</span>"
                            + "</button>"
                            + "<ul class='dropdown-menu' role='menu'>"
                            + "<li class='btn' id='"
                            + social_media_name
                            + "_goto_btn' onclick='goto_social(this)'>"
                            + window.lang.translate('Goto')
                            + "</li><br/>"
//                            + "<li class='btn' id='"
//                            + social_media_name
//                            + "_edit_btn' onclick='edit_social(this)'>"
//                            + window.lang.translate('Edit')
//                            + "</li><br/>"
                            + "<li class='btn' id='"
                            + social_media_name
                            + "_remove_btn' onclick='remove_social(this)'>"
                            + window.lang.translate('Delete')
                            + "</li>"
                            + "</ul>"
                            + "</div>";

                    $('#ava_med_ph').append(appending);
                }
            }
        });


    } else {

        $("#" + social_media_name + "_long").show();
        $("#" + social_media_name + "_input").hide();
        var default_value = "https://www." + social_media_name + ".com/";
        $("#" + social_media_name_ph + "_field").val(default_value);
    }
}

function goto_social(element) {
    var selected = element.id.replace('_goto_btn', '');
    var sel_med_url = $('#' + selected + "_btn_group").attr('url_value');
    if (sel_med_url.indexOf('google-plus') > -1) {
        sel_med_url = sel_med_url.replace('google-plus', 'googleplus');
    }
    window.open(sel_med_url, '_newtab');
}


function remove_social(element) {

    var selected = element.id.replace('_remove_btn', '');

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'pkDeletedAct_infoFirmSocialmedia',
            pk: $("#pk").val(),
            npk: $("#selectedCompanyNpk").val(),
            language_code: $("#langCode").val(),
            sys_socialmedia_id: window.selected_soc_med_id,
            firm_link: window.temp_url,
            profile_public: 0
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data['errorInfo'][0] === '00000') {

                $('#sel_med_ph').empty();
                $('#' + selected + "_btn_group").remove();
                
            }
        }
    });


}


//function edit_social(element) {
//
//    var selected = element.id.replace('_edit_btn', '');
//    var sel_med_url = $('#' + selected + "_btn_group").attr('url_value');
//
//
//    if ($('#sel_med_ph').find('.form-control').length) {
//
//        var remained_soc_med = $('#sel_med_ph').find('.form-control').attr('id').replace('_input_field', ''),
//                default_url = "https://www." + remained_soc_med + ".com/",
//                found_value = $('#sel_med_ph').find('.form-control').attr('value'),
//                remained_soc_med_id = $('#sel_med_ph').find('.btn').attr('selected_soc_id');
//
//        window.remaining_temp_url = $("#" + remained_soc_med + "_input_field").val();
//
//        if (window.remaining_temp_url !== default_url && window.remaining_temp_url.indexOf((default_url)) > -1) {
//
//            wcm.warningComplexMessage({
//                onConfirm: function () {
//                    $('#sel_med_ph').empty();
//                    $('#' + selected + "_btn_group").remove();
//                    var appending
//                            =
//                            "<div id='"
//                            + selected
//                            + "_ph' style='margin-top: 20px'>"
//                            + "<a id='"
//                            + selected
//                            + "_long' class='btn btn-block btn-social btn-"
//                            + selected
//                            + "' onclick='changecontent(this)'>"
//                            + "<i class='fa fa-"
//                            + selected
//                            + "'></i>"
//                            + "<span id='"
//                            + selected
//                            + "_span'>"
//                            + sel_med_url
//                            + "</span>"
//                            + "</a>"
//                            + "<div id='"
//                            + selected
//                            + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
//                            + "<span class='input-group-btn'>"
//                            + "<a id='"
//                            + selected
//                            + "_input_button' class='btn btn-social-icon btn-"
//                            + selected
//                            + "' onclick='checkContent(this)'><i class='fa fa-"
//                            + selected
//                            + "'></i></a>"
//                            + "</span>"
//                            + "<input id='"
//                            + selected
//                            + "_input_field' type='text' class='form-control' value='"
//                            + sel_med_url
//                            + "'>"
//                            + "</div>"
//                            + "</div>";
//                    $('#sel_med_ph').append(appending);
//                }
//            });
//            wcm.warningComplexMessage('show', remained_soc_med + ' changes!!',
//                    'Changes for ' + remained_soc_med + ' will be lost. Do you want to continue?');
//        } else {
//            $('#sel_med_ph').empty();
//            $('#' + selected + "_btn_group").remove();
//            var appending
//                    =
//                    "<div id='"
//                    + selected
//                    + "_ph' style='margin-top: 20px'>"
//                    + "<a id='"
//                    + selected
//                    + "_long' class='btn btn-block btn-social btn-"
//                    + selected
//                    + "' onclick='changecontent(this)'>"
//                    + "<i class='fa fa-"
//                    + selected
//                    + "'></i>"
//                    + "<span id='"
//                    + selected
//                    + "_span'>"
//                    + sel_med_url
//                    + "</span>"
//                    + "</a>"
//                    + "<div id='"
//                    + selected
//                    + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
//                    + "<span class='input-group-btn'>"
//                    + "<a id='"
//                    + selected
//                    + "_input_button' class='btn btn-social-icon btn-"
//                    + selected
//                    + "' onclick='checkContent(this)'><i class='fa fa-"
//                    + selected
//                    + "'></i></a>"
//                    + "</span>"
//                    + "<input id='"
//                    + selected
//                    + "_input_field' type='text' class='form-control' value='"
//                    + sel_med_url
//                    + "'>"
//                    + "</div>"
//                    + "</div>";
//            $('#sel_med_ph').append(appending);
//        }
//    } else {
//
//        $('#sel_med_ph').empty();
//        $('#' + selected + "_btn_group").remove();
//        var appending
//                =
//                "<div id='"
//                + selected
//                + "_ph' style='margin-top: 20px'>"
//                + "<a id='"
//                + selected
//                + "_long' class='btn btn-block btn-social btn-"
//                + selected
//                + "' onclick='changecontent(this)'>"
//                + "<i class='fa fa-"
//                + selected
//                + "'></i>"
//                + "<span id='"
//                + selected
//                + "_span'>"
//                + sel_med_url
//                + "</span>"
//                + "</a>"
//                + "<div id='"
//                + selected
//                + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
//                + "<span class='input-group-btn'>"
//                + "<a id='"
//                + selected
//                + "_input_button' class='btn btn-social-icon btn-"
//                + selected
//                + "' onclick='checkContent(this)'><i class='fa fa-"
//                + selected
//                + "'></i></a>"
//                + "</span>"
//                + "<input id='"
//                + selected
//                + "_input_field' type='text' class='form-control' value='"
//                + sel_med_url
//                + "'>"
//                + "</div>"
//                + "</div>";
//        $('#sel_med_ph').append(appending);
//    }
//
//}