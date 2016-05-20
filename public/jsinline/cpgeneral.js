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

    window.sel_count_id;
    window.sel_comp_count_id;
    window.cityList;
    window.boroughList;

    /*
     * Bootstrap modals variables
     * @type @call;$@call;successMessage
     */

     
     
     /*
      * 
      * Check textarea remaining characters
      */
    
    var desc_text_max = 3000;
//    var title_text_max = 150;
    var verbal_text_max = 2000;
    
    $('#desc_rem_char_alert').html(desc_text_max + ' characters remaining');
    $('#desc_en_rem_char_alert').html(desc_text_max + ' characters remaining');    
    
    $('#verb1_rem_char_alert').html(verbal_text_max + ' characters remaining');
    $('#verb1_en_rem_char_alert').html(verbal_text_max + ' characters remaining');
    
    $('#verb2_rem_char_alert').html(verbal_text_max + ' characters remaining');
    $('#verb2_en_rem_char_alert').html(verbal_text_max + ' characters remaining');
    
    $('#verb2_rem_char_alert').html(verbal_text_max + ' characters remaining');
    $('#verb2_en_rem_char_alert').html(verbal_text_max + ' characters remaining');

    $('.text-area').keyup(function() {
        var desc_text_length = $('#desc_text').val().length;
        var desc_en_text_length = $('#desc_text_en').val().length;
        
        var verb1_text_length = $('#verbal1_text').val().length;
        var verb1_en_text_length = $('#verbal1_text_en').val().length;
        
        var verb2_text_length = $('#verbal2_text').val().length;
        var verb2_en_text_length = $('#verbal2_text_en').val().length;
        
        var verb3_text_length = $('#verbal3_text').val().length;
        var verb3_en_text_length = $('#verbal3_text_en').val().length;
        
        var desc_text_remaining = desc_text_max - desc_text_length;
        var desc_text_en_remaining = desc_text_max - desc_en_text_length;
        
        var verb1_text_remaining = verbal_text_max - verb1_text_length;
        var verb1_text_en_remaining = verbal_text_max - verb1_en_text_length;
        
        var verb2_text_remaining = verbal_text_max - verb2_text_length;
        var verb2_text_en_remaining = verbal_text_max - verb2_en_text_length;
        
        var verb3_text_remaining = verbal_text_max - verb3_text_length;
        var verb3_text_en_remaining = verbal_text_max - verb3_en_text_length;

        $('#desc_rem_char_alert').html(desc_text_remaining + ' characters remaining');
        $('#desc_en_rem_char_alert').html(desc_text_en_remaining + ' characters remaining');
        
        $('#verb1_rem_char_alert').html(verb1_text_remaining + ' characters remaining');
        $('#verb1_en_rem_char_alert').html(verb1_text_en_remaining + ' characters remaining');
        
        $('#verb2_rem_char_alert').html(verb2_text_remaining + ' characters remaining');
        $('#verb2_en_rem_char_alert').html(verb2_text_en_remaining + ' characters remaining');
        
        $('#verb3_rem_char_alert').html(verb3_text_remaining + ' characters remaining');
        $('#verb3_en_rem_char_alert').html(verb3_text_en_remaining + ' characters remaining');
    });

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

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkInsert_infoFirmVerbal',
            pk: $("#pk").val(),
            npk:$("#selectedCompanyNpk").val(),
            lang_code:$('#langCode').val(),
            profile_public: 0,
            firm_name_full: $('#full_name_ph').val(),
            firm_name_en_full: $('#full_name_en_ph').val(),
            firm_name_short: $('#short_name_ph').val(),
            firm_name_en_short: $('#short_name_en_ph').val(),
            firm_country: $('#').val(),
            about: $('#desc_text').val(),
            about_eng: $('#desc_text_en').val(),
            verbal1_title: $('#first_text_title').val(),
            verbal2_title: $('#second_text_title').val(),
            verbal3_title: $('#third_text_title').val(),
            verbal1_title_eng: $('#first_text_title_en').val(),
            verbal2_title_eng: $('#second_text_title_en').val(),
            verbal3_title_eng: $('#third_text_title_en').val(),
            verbal1:$('#verbal1_text').val(),
            verbal2:$('#verbal2_text').val(),
            verbal3:$('#verbal3_text').val(),
            verbal1_eng:$('#verbal1_text_en').val(),
            verbal2_eng:$('#verbal2_text_en').val(),
            verbal3_eng:$('#verbal3_text_en').val()
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {

            

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('error');
            console.error(textStatus);
            
        }
    });

}

window.okan;

function milliseconds()
{
    var input_date = $('#compnay_foundation_date').val();
    var entered_date = new Date(input_date);
    window.date_value = entered_date.getTime();    
    window.okan = Math.round(window.date_value/1000.0);    
    console.log(window.date_value);
    console.log(okan);
    
};