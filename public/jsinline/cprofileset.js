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
            } else {
                console.error('"pkFillCompanyInfoSocialedia_infoFirmProfile" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"pkFillCompanyInfoSocialedia_infoFirmProfile" servis hatasÄ±->' + textStatus);
        }
    });


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

                console.log(data);
                
                var i;
                for (i = 0; i < data.length; i++) {
                    var new_imagesrc = data[i].imageSrc.replace('/Logos/', '');
                    data[i].imageSrc = "https://" + window.location.hostname + "/onyuz/standard/assets/img/sfSystem/Logos/social-media/png/" + new_imagesrc;
                }


                $('#social_media_ph').ddslick('destroy');
                $('#social_media_ph').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a social media from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        $('#social_media_name_ph').empty();
                        var appending
                                =
                                "<div id='facebook_ph' style='margin-top: 20px'>"
                                + "<a id='facebook_long' class='btn btn-block btn-social btn-facebook' onclick='changecontent(this)'>"
                                + "<i class='fa fa-facebook'></i>"
                                + "<span id='facebook_span'>"
                                + window.lang.translate("Enter Company's Facebook Account")
                                + "</span>"
                                + "</a>"
                                + "<div id='facebook_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
                                + "<span class='input-group-btn'>"
                                + "<a id='facebook_input_button' class='btn btn-social-icon btn-facebook' onclick='checkContent(this)'><i class='fa fa-facebook'></i></a>"
                                + "</span>"
                                + "<input id='facebook_input_field' type='text' class='form-control' value='https://www.facebook.com/'>"
                                + "</div>"
                                + "</div>";

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
function changecontent(element) {


    var social_media_name = element.id.replace('_long', '');
    $("#" + element.id).hide();
    $("#" + social_media_name + "_input").fadeIn('');
}


function checkContent(element) {


    var social_media_name = element.id.replace('_input_button', '');
    var social_media_name_ph = element.id.replace('_button', '');
    if ($("#" + social_media_name_ph + "_field").val() !== "https://www." + social_media_name + ".com/" && $("#" + social_media_name_ph + "_field").val().indexOf(("https://www." + social_media_name + ".com/")) > -1) {

        $("#" + social_media_name + "_long").html("<i class='fa fa-" + social_media_name + "'></i>" + $("#" + social_media_name_ph + "_field").val());
        $("#" + social_media_name + "_long").show();
        $("#" + social_media_name + "_input").hide();
    } else {

        $("#" + social_media_name + "_long").show();
        $("#" + social_media_name + "_input").hide();
        var default_value = "https://www." + social_media_name + ".com/";
        $("#" + social_media_name_ph + "_field").val(default_value);
    }


}

