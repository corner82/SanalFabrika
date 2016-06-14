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
     * projreg.js variables
     * 
     */    
    window.clickedButton;
    window.clickedForm;
    
    window.selectedCountryId;
    window.selectedCityId;
    window.selectedDistrictId;
    window.selectedPreferedLanguageId;
    window.selectedAddTypeId;
    window.selectedCommunicationTypeId;
    window.defaultContactNumber;


    /*
     * Content blocker
     */

//    contentBlocker = $("#tabsContentsSection").blockuiCentered();
//    contentBlockerWText = $("#tabsContentsSection").blockElementWithoutText();

    /*
     * Hide and show city input fields based on country dropdown input
     */

    $('#cityNameSection').show();
    $('#cityDropdownSection').hide();
    $('#districtDropdownSection').hide();

    /* 
     * Validation binder
     * 
     */

    $("#project_owner_info_form").validationEngine({promptPosition: "topLeft:100%,0"});
    $("#project_general_info_form").validationEngine({promptPosition: "topLeft:100%,0"});
    $("#userCommunicationInfoForm").validationEngine({promptPosition: "topLeft:100%,0"});

    /*
     * Buttons function binder
     */

    $('#project_owner_info_submit').submit(project_owner_info_submit);
    $('#project_general_info_submit').submit(project_general_info_submit);
//    $('#submitContactNumber').on('click', submitUserContactNumber);
    $("#project_owner_info_reset").on('click', resetForm);
    $("#userAddressInfoFormReset").on('click', resetForm);
    $("#userCommunicationInfoFormReset").on('click', resetForm);
//    $("#userCommunicationInfoFormFinalize").submit(completeUserSubmissionProcess);
//    $("#submitUserCommunicationInfoForm").on('click', submitUserInfoForm);

    /*
     * List of communication types combobox ajax
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'fillCommunicationsTypes_sysSpecificDefinitions',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {

            if (data.length !== 0) {
                $('#communicationTypes').ddslick({
                    data: data,
                    width: '100%',
                    background: false,
                    selectText: window.lang.translate("Select a Communication Type"),
                    imagePosition: "right",
                    onSelected: function (selectedData) {
                        selectedCommunicationTypeId = selectedData.selectedData.value;
//                        console.log(selectedData);
//                        console.log(selectedCommunicationTypeId);
                        //callback function: do something with selectedData;
                    }
                });
            } else {
                console.error('"fillCommunicationsTypes_sysSpecificDefinitions" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillCommunicationsTypes_sysSpecificDefinitions" servis hatasÄ±->' + textStatus);
        }
    });

});

/*
 * List of countries combobox ajax
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
            $('#usercountry').ddslick({
                data: data,
                width: '100%',
                height: '500%',
                background: false,
                selectText: window.lang.translate("Please select a country from list..."),
                imagePosition: 'right',
                onSelected: function (selectedData) {
                    if (selectedData.selectedData.value !== 0) {

                        window.cityList = selectedData.selectedData.attributes.citylist;
                        window.boroughList = false;
                    }
                    selectedCountryId = selectedData.selectedData.value;
//                    selectedCountryList = selectedData                    
                    userCityDropDownUpdate();
                    //callback function: do something with selectedData;
                }
            });
            $('#companyCountry').ddslick({
                data: data,
                width: '100%',
                height: '500%',
                background: false,
                selectText: window.lang.translate("Please select a country from list..."),
                imagePosition: 'right',
                onSelected: function (selectedData) {
                    selectedCompanyCountryId = selectedData.selectedData.value;
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
 * List of provinces combobox ajax 
 * based on selected country
 */
function userCityDropDownUpdate() {

    $("#usercity").empty();
    $("#userdistrict").empty();

    if (window.cityList === true) {
        $('#cityNameSection').hide();
        $('#cityDropdownSection').show();

    } else {
        $('#cityNameSection').show();
        $('#cityDropdownSection').hide();
    }

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syscity',
            country_id: selectedCountryId,
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

                $('#usercity').ddslick('destroy');
                $('#usercity').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a city from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
//                        console.log(selectedData.selectedData);
                        selectedCityId = selectedData.selectedData.value;
                        if (selectedCityId !== 0) {
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
 * List of districts combobox ajax 
 * based on selected country and province
 */
function districtDropDownUpdate() {

    $("#userdistrict").empty();
    $("#uservillage").empty();

    if (window.boroughList === true) {
        $('#districtDropdownSection').show();
    } else {
        $('#districtDropdownSection').hide();
    }

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_sysborough',
            country_id: selectedCountryId,
            city_id: selectedCityId,
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
//                console.log(data);
                $('#userdistrict').ddslick('destroy');
                $('#userdistrict').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a district from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
                        selectedDistrictId = selectedData.selectedData.value;
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
 * List of System languages combobox ajax
 */
$.ajax({
    url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
    data: {
        url: 'fillComboBox_syslanguage',
        language_code: $("#langCode").val(),
        component_type: 'ddslick'
    },
    type: 'GET',
    dataType: 'json',
    //data: 'rowIndex='+rowData.id,
    success: function (data, textStatus, jqXHR) {

        if (data.length !== 0) {
            $('#userPreferedLanguage').ddslick({
                data: data,
                width: '100%',
                background: false,
                selectText: window.lang.translate("Please select your prefered language from list..."),
                imagePosition: "right",
                onSelected: function (selectedData) {
                    selectedPreferedLanguageId = selectedData.selectedData.value;
                }
            });

        } else {
            console.error('"fillComboBox_syslanguage" servis datasÄ± boÅŸtur!!');
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"fillComboBox_syslanguage" servis hatasÄ±->' + textStatus);
    }
});

/*
 * Language bar on top of page...
 * @author:Bahram
 * @Since: 2016.2.12
 */
$.ajax({
    url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
    data: {
        url: 'fillComboBox_syslanguage',
        language_code: $("#langCode").val()
    },
    type: 'GET',
    dataType: 'json',
    //data: 'rowIndex='+rowData.id,
    success: function (data, textStatus, jqXHR) {
        if (data.length !== 0) {
            $.fn.multiLanguageBarSetter.defaults.requestUriTranslated = $("#requestUriRegulated").val();
            $.fn.multiLanguageBarSetter.defaults.langCode = $("#langCode").val();
            $.fn.multiLanguageBarSetter.defaults.basePath = 'ostim/sanalfabrika';
            $.fn.multiLanguageBarSetter.defaults.baseLanguage = 'tr';
            $(".languages").multiLanguageBarSetter(data);

        } else {
            console.error('"fillComboBox_syslanguage" servis datasÄ± boÅŸtur!!');
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"fillComboBox_syslanguage" servis hatasÄ±->' + textStatus);
    }
});


/*
 * Reset Form Elements
 * @Author: Bahram Lotfi Sadigh
 * @Since: 2016.1.21
 */
function resetForm() {

    event.stopImmediatePropagation();
    clickedButton = event.target;
    clickedForm = clickedButton.closest('form');
//    contentBlocker.blockElement('show');

    /*
     * Changes Growl icon to warning...
     * @author:Bahram Lotfi Sadigh
     * @Since:2016/2/1
     */

//    contentBlockerWText.blockElementWithoutText('show');
//    $('div.growlUI')
//            .css("background",
//                    "url(../../plugins/jquery-BlockUI/newWarning-1.png) no-repeat 10px 10px");


    var loader = $('#tabsContentsSection').loadImager();
    $('#tabsContentsSection').loadImager('appendImage');

    BootstrapDialog.confirm({
        title: window.lang.translate("Form Reset"),
        message: window.lang.translate("Are you sure to erase all form fields?"),
        type: BootstrapDialog.TYPE_WARNING,
        closable: false,
        // <-- Default value is BootstrapDialog.TYPE_PRIMARY
//        closable: true, // <-- Default value is false
//        draggable: true, // <-- Default value is false
        btnCancelLabel: window.lang.translate("Cancel"), // <-- Default value is 'Cancel',
        btnOKLabel: window.lang.translate("Reset"), // <-- Default value is 'OK',
        btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
        callback: function (result) {
            // result will be true if button was click, while it will be false if users close the dialog directly.
            if (result) {
                resetConfirmation();
                $('#tabsContentsSection').loadImager('removeLoadImage');
            } else {
                resetRejection();
                $('#tabsContentsSection').loadImager('removeLoadImage');
            }
        }
    });
}

/*
 * Confirm reset operation
 * @author:Bahram lotfi sadigh
 * @since:2016.1.26
 */
function resetConfirmation() {

    clickedForm.reset();
//    $.unblockUI();
//    $("#tabsContentsSection").unblock();
    event.preventDefault();
//    $('div.growlUI')
//            .css("background",
//                    "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");


    BootstrapDialog.show({
        title: window.lang.translate('Form Reset'),
        message: window.lang.translate('Form fields cleared'),
        type: BootstrapDialog.TYPE_SUCCESS,
//        closable: false
    });
    taskProgressPerTabs();
}

/*
 * Reject reset operation
 * @author:Bahram lotfi sadigh
 * @since:2016.1.26
 * 
 */
function resetRejection() {

//    $.unblockUI();
//    $("#tabsContentsSection").unblock();
    event.preventDefault();

//    $('div.growlUI')
//            .css("background",
//                    "url(../../plugins/jquery-BlockUI/

    BootstrapDialog.show({
        title: window.lang.translate('Form Reset'),
        message: window.lang.translate('Reset operation failed...'),
        type: BootstrapDialog.TYPE_DANGER,
//        closable: false
    });
}
function milliseconds() {
    var input_date = $('#companyFoundationDate').val();
    var entered_date = new Date(input_date);
    window.date_value = entered_date.getTime();
    window.okan = Math.round(window.date_value / 1000.0);
    console.log(window.date_value);
    console.log(okan);
}

function project_owner_info_submit(){
    
}

function project_general_info_submit(){
    
}