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

    $('#general_firm_form').validationEngine({promptPosition: "topLeft:100%,0"});
//Datemask dd/mm/yyyy
//    $("#found_date").inputmask("yyyy/mm/dd", {"placeholder": "yyyy/mm/dd"});
    $("#date").inputmask("99/99/9999");
    window.sel_count_id;
    window.sel_comp_count_id;
    window.cityList;
    window.boroughList;
    /*
     * Fill form fields
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkFillCompanyProfile_infoFirmProfile',
            language_code: $("#langCode").val(),
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
//                console.log(data);
                /*
                 * change coming foundation date from milliseconds to year/month/day
                 * if there is not submitted found_date, it comes back empty
                 */

                if (data[0].foundation_yearx > 0) {
                    var found_date = new Date(data[0].foundation_yearx * 1000);
                    var new_date = new Date(found_date);
                    window.year = new_date.getFullYear().toString();
                    window.month = (new_date.getMonth() + 1).toString();
                    if (window.month < 10) {
                        window.month = '0' + (new_date.getMonth() + 1).toString();
                    }
                    window.day = new_date.getDate().toString();
                    if (window.day < 10) {
                        window.day = '0' + new_date.getDate().toString();
                    }
                } else {
                    window.year = '0000';
                    window.month = '00';
                    window.day = '00';
                }

                window.sel_count_id = data[0].country_id;
                window.sel_count_name = data[0].country_name;
                $('#company_country_ph li').each(function (index) {
                    if ($(this)[0].innerText.indexOf(window.sel_count_name) > 0) {
                        $('#company_country_ph').ddslick('select', {index: $(this).index()});
                    }
                });
                window.image_url = "https://"
                        + window.location.hostname
                        + "/onyuz/standard/assets/img/sfClients/"
                        + data[0].logo;

                console.log(window.year + '/' + window.month + '/' + window.day);
                $('#full_name_ph').val(data[0].firm_name);
                $('#full_name_en_ph').val(data[0].firm_name_eng);
                $('#short_name_ph').val(data[0].firm_name_short);
                $('#short_name_en_ph').val(data[0].firm_name_short_eng);
                $('#website').val(data[0].web_address);
                $('#company_logo').attr('src', window.image_url);
                $('#found_date').val(window.year + "-" + window.month + "-" + window.day);
                $('#tax_office').val(data[0].tax_office);
                $('#tex_number').val(data[0].tax_no);
                $('#desc_text').val(data[0].description);
                $('#desc_text_en').val(data[0].description_eng);

                window.verbal_id = data[0].id;
            } else {
                console.error('"fill verbal service" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fill verbal service" servis hatasÃ„Â±->' + textStatus);
        }
    });
    /*
     * 
     * Check textarea remaining characters
     */
    var desc_text_max = 3000;
//    var title_text_max = 150;
    var verbal_text_max = 2000;
    $('#desc_rem_char_alert').html(desc_text_max + ' characters remaining');
    $('#desc_en_rem_char_alert').html(desc_text_max + ' characters remaining');

    $('.text-area').keyup(function () {
        var desc_text_length = $('#desc_text').val().length;
        var desc_en_text_length = $('#desc_text_en').val().length;

        var desc_text_remaining = desc_text_max - desc_text_length;
        var desc_text_en_remaining = desc_text_max - desc_en_text_length;

        $('#desc_rem_char_alert').html(desc_text_remaining + ' characters remaining');
        $('#desc_en_rem_char_alert').html(desc_text_en_remaining + ' characters remaining');

    });
    
    /*
     * Page consultant for box-header
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkcpkGetFirmVerbalConsultant_infoFirmVerbal',
            language_code: $("#langCode").val(),
            pk: $('#pk').val(),
            cpk: $('#cpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
                var cons_image_url = "https://" + window.location.hostname + "/onyuz/standard/assets/img/sfClients/" + data[0].cons_picture;
                if (data[0].communications_no) {
                    var tel_number = data[0].communications_no;
                } else {
                    var tel_number = '';
                }

                $('#consultant_div').css('display', 'block');
                $('#consultant_div').css('visibility', 'visible');
                $('#consultant_div').attr('data-balloon', 'Tel:' + data[0].phone);
                $('#consultant_div').attr('email_address', data[0].auth_email);
                $('#consultant_div').attr('page_consultant', data[0].name + " " + data[0].surname);
                $('#cons_image_ph').attr('src', cons_image_url);
                $('#cons_name_ph').empty();
                $('#cons_name_ph').append(data[0].name + " " + data[0].surname);
            } else {
                $('#consultant_div').css('display', 'none');
                $('#consultant_div').css('visibility', 'hidden');
                console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"consultants" servis hatasÃ„Â±->' + textStatus);

            $('#consultant_div').css('display', 'none');
            $('#consultant_div').css('visibility', 'hidden');
        }
    });
    /* 
     * Messages popups
     */
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


function send_general_info() {
    if ($('#general_firm_form').validationEngine('validate')) {
        if (window.verbal_id) {
//  console.log('update');
//  update url is used to update data
            milliseconds();
            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    url: 'pkUpdate_infoFirmProfile',
                    pk: $("#pk").val(),
                    cpk: $("#cpk").val(),
                    language_code: $('#langCode').val(),
                    profile_public: 0,
                    firm_name: $('#full_name_ph').val(),
                    firm_name_eng: $('#full_name_en_ph').val(),
                    firm_name_short: $('#short_name_ph').val(),
                    firm_name_en_short: $('#short_name_en_ph').val(),
                    description: $('#desc_text').val(),
                    description_eng: $('#desc_text_en').val(),
                    country_id: window.sel_count_id,
                    tax_office: $('#tax_office').val(),
                    tax_no: $('#tex_number').val(),
                    foundation_yearx: window.okan,
//                    duns_number: $('#tax_office').val(),
                    web_address: $('#website').val(),
                    id: window.verbal_id
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    sm.successMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information saved successfully'));
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    console.error(textStatus);
                    wm.warningMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information did not saved!!! Please check fiels and try again...'));
                }
            });
        } else {

//  console.log('insert');
//  insert url is used to insert data

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    url: 'pkInsert_infoFirmProfile',
                    pk: $("#pk").val(),
                    cpk: $("#cpk").val(),
                    language_code: $('#langCode').val(),
                    profile_public: 0,
                    firm_name: $('#full_name_ph').val(),
                    firm_name_eng: $('#full_name_en_ph').val(),
                    firm_name_short: $('#short_name_ph').val(),
                    firm_name_short_eng: $('#short_name_en_ph').val(),
                    description: $('#desc_text').val(),
                    description_eng: $('#desc_text_en').val(),
                    country_id: window.sel_count_id,
                    tax_office: $('#tax_office').val(),
                    tax_no: $('#tex_number').val(),
                    foundation_yearx: window.okan,
//                    duns_number: $('#tax_office').val(),
                    web_address: $('#website').val()
//                    logo: $('#tax_office').val()
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    console.log('here');
                    sm.successMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information saved successfully'));
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    console.error(textStatus);
                    dm.successMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information did not saved!!! Please check fields and try again...'));
                }
            });
        }
    }
}

function reset_verbal_info() {
    wcm.warningComplexMessage('show', 'Are you sure?',
            'You are going to delete all verbal information. Do you want to continue?');

    wcm.warningComplexMessage({
        onConfirm: function () {
            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    url: 'pkcpkDeletedAct_infoFirmVerbal',
                    id: window.verbal_id,
                    pk: $('#pk').val(),
                    cpk: $('#cpk').val()
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if (data.length !== 0) {

                        sm.successMessage('show', window.lang.translate('Delete operation'), window.lang.translate('All verbal information erased successfully'))

                    } else {
                        console.error('"pkcpkDeletedAct_infoFirmVerbal" servis datasÃ„Â± boÃ…Å¸tur!!');
                        wm.warningMessage('show', window.lang.translate('Delete operation'), window.lang.translate('Unable to remove verbal information'))

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error('"pkcpkDeletedAct_infoFirmVerbal" servis hatasÃ„Â±->' + textStatus);
                    wm.warningMessage('show', window.lang.translate('Delete operation'), window.lang.translate('Unable to remove verbal information'))

                }
            });
        }
    });

}

function milliseconds() {
    if ($('#found_date').val() !== "") {
        var input_date = $('#found_date').val();
        var entered_date = new Date(input_date);
        window.date_value = entered_date.getTime();
        window.okan = Math.round(window.date_value / 1000.0);
//    console.log(window.date_value);
//    console.log(okan);
    } else {
        window.okan = "";
    }
}
