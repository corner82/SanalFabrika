$(document).ready(function () {

    /*
     * Hide and show city input fields based on country dropdown input
     */

    $('#cityNameSection').show();
    $('#cityDropdownSection').hide();
    $('#districtDropdownSection').hide();
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
     * Signup.js variables
     * 
     */

    window.clickedButton;
    window.clickedForm;
    window.makePublicProfile = 0;
    window.makePublicAddress = 0;
    window.makePublicCommunication = 0;
    window.selectedCountryId;
    window.selectedCityId;
    window.selectedDistrictId;
    window.selectedPreferedLanguageId;
    window.selectedPreferedLanguageId;
    window.pktemp;
    /*
     * Content blocker
     */

    window.contentBlocker = $("#tabsContentsSection").blockuiCentered();
    window.contentBlockerWText = $("#tabsContentsSection").blockElementWithoutText();


    /*
     * Disable finalize registration and submit user info before checking 
     * agreement terms and conditions...
     * @author: Bahram Lotfi Sadigh
     * @Since:2016.1.25
     */

    $('#userCommunicationInfoFormFinalize').addClass('disabled');
    $('#userCommunicationInfoFormSubmit').addClass('disabled');
    $('#userCommunicationInfoFormFinalize').attr('disabled', true);
    $('#userCommunicationInfoFormSubmit').attr('disabled', true);
    /* 
     * Validation binder
     * 
     */

    $("#userGeneralInfoForm").validationEngine();
    $("#userAddressInfoForm").validationEngine();
    $("#userCommunicationInfoForm").validationEngine();
    $("#companyInfoForm").validationEngine();
    /*
     * Show or hide password content
     * @author: Bahram Lotfi Sadigh
     * @Since: 2016.2.1
     * 
     */

    $('#showPassword').change(function () {
        var isChecked = $(this).prop('checked');
        if (isChecked) {
            $('#userPreferedPassword').attr('type', 'text');
            $('#repeatedUserPreferedPassword').attr('type', 'text');
        }
        else {
            $('#userPreferedPassword').attr('type', 'password');
            $('#repeatedUserPreferedPassword').attr('type', 'password');
        }
    });
    /*
     * Address types
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'fillAddressTypes_sysSpecificDefinitions',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
                $('#addressTypesCombo').ddslick({
                    data: data,
                    width: '100%',
                    background: false,
                    selectText: window.lang.translate("Please select a communication type from list..."),
                    imagePosition: "right",
                    onSelected: function (selectedData) {
                        console.log(selectedData);
                        //callback function: do something with selectedData;
                    }
                });
            } else {
                console.error('"fillAddressTypes_sysSpecificDefinitions" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillAddressTypes_sysSpecificDefinitions" servis hatası->' + textStatus);
        }
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
                console.log(data);
                $('#usercountry').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a country from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        selectedCountryId = selectedData.selectedData.value;
                        console.log(selectedCountryId);
                        userCityDropDownUpdate();
//                        console.log(selectedData);
//                        console.log(selectedCountryId);
                        //callback function: do something with selectedData;
                    }
                });
            } else {
                console.error('"fillComboBox_syscountrys" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_syscountrys" servis hatası->' + textStatus);
        }
    });
    /*
     * List of provinces combobox ajax based on selected country
     */

    function userCityDropDownUpdate() {

        $("#usercity").empty();
        $("#userdistrict").empty();
        if (selectedCountryId === '91') {

            $('#cityNameSection').hide();
            $('#cityDropdownSection').show();
            $('#districtDropdownSection').show();
        } else {
            $('#cityNameSection').show();
            $('#cityDropdownSection').hide();
            $('#districtDropdownSection').hide();
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
                    console.log(data);
                    $('#usercountry').ddslick({
                        data: data,
                        width: '100%',
                        height: '500%',
                        background: false,
                        selectText: window.lang.translate("Please select a city from list..."),
                        imagePosition: 'right',
                        onSelected: function (selectedData) {
                            selectedCityId = selectedData.selectedData.value;
                            console.log(selectedData);
                            console.log(selectedCityId);
                            districtDropDownUpdate();
                            //callback function: do something with selectedData;
                        }
                    });
                } else {
                    console.error('"fillComboBox_syscity" servis datası boştur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('"fillComboBox_syscity" servis hatası->' + textStatus);
            }
        });
    }
    ;
    /*
     * List of districts combobox ajax based on selected country and province
     */

    function districtDropDownUpdate() {

        $("#userdistrict").empty();
        $("#uservillage").empty();
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
                    console.log(data);
                    $('#usercountry').ddslick({
                        data: data,
                        width: '100%',
                        height: '500%',
                        background: false,
                        selectText: window.lang.translate("Please select a district from list..."),
                        imagePosition: 'right',
                        onSelected: function (selectedData) {
                            selectedDistrictId = selectedData.selectedData.value;
                            console.log(selectedData);
                            console.log(selectedDistrictId);
                            //callback function: do something with selectedData;
                        }
                    });
                } else {
                    console.error('"fillComboBox_sysborough" servis datası boştur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('"fillComboBox_sysborough" servis hatası->' + textStatus);
            }
        });
    }
    ;
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
                        console.log(selectedData);
                        console.log(selectedPreferedLanguageId);
                        //callback function: do something with selectedData;
                    }
                });
            } else {
                console.error('"fillComboBox_syslanguage" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_syslanguage" servis hatası->' + textStatus);
        }
    });
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
                console.log(data);
                $('#communicationTypes').ddslick({
                    data: data,
                    width: '100%',
                    background: false,
                    selectText: window.lang.translate("Select a Communication Type"),
                    imagePosition: "right",
                    onSelected: function (selectedData) {
                        selectedCommunicationTypeId = selectedData.selectedData.value;
                        console.log(selectedData);
                        console.log(selectedCommunicationTypeId);
                        //callback function: do something with selectedData;
                    }
                });
            } else {
                console.error('"fillCommunicationsTypes_sysSpecificDefinitions" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillCommunicationsTypes_sysSpecificDefinitions" servis hatası->' + textStatus);
        }
    });
    /*
     * Buttons function binder
     */

    $('#userGeneralInfoFormSubmit').submit(submitUserGeneralInfoForm);
    $('#userAddressInfoFormSubmit').submit(submitUserAddressInfoForm);
    $('#userCommunicationInfoFormSubmit').submit(submitUserCommunicationInfoForm);
    $("#userGeneralInfoFormReset").on('click', resetForm);
    $("#userAddressInfoFormReset").on('click', resetForm);
    $("#userCommunicationInfoFormReset").on('click', resetForm);
    $("#userCommunicationInfoFormFinalize").on('click', finalizeUserCommunicationInfoForm);
    $("#submitUserCommunicationInfoForm").on('click', submitUserCommunicationInfoForm);
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


    contentBlockerWText.blockElementWithoutText('show');
    $('div.growlUI')
            .css("background",
                    "url(../../plugins/jquery-BlockUI/newWarning-1.png) no-repeat 10px 10px");
    BootstrapDialog.confirm({
        title: window.lang.translate("Form Reset"),
        message: window.lang.translate("Are you sure to erase all form fields?"),
        type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
//        closable: true, // <-- Default value is false
//        draggable: true, // <-- Default value is false
        btnCancelLabel: window.lang.translate("Cancel"), // <-- Default value is 'Cancel',
        btnOKLabel: window.lang.translate("Reset"), // <-- Default value is 'OK',
        btnOKClass: 'btn-warning', // <-- If you didn't specify it, dialog type will be used,
        callback: function (result) {
            // result will be true if button was click, while it will be false if users close the dialog directly.
            if (result) {
                resetConfirmation();
            } else {
                resetRejection();
            }
        }
    });
}

/*
 * 
 * functions section
 * 
 */

function resetConfirmation() {

    clickedForm.reset();
    $.unblockUI();
    $("#tabsContentsSection").unblock();
    event.preventDefault();
    $('div.growlUI')
            .css("background",
                    "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");
    BootstrapDialog.show({
        title: window.lang.translate('Form Reset'),
        message: window.lang.translate('Form fields cleared'),
        type: BootstrapDialog.TYPE_SUCCESS

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

    $.unblockUI();
    $("#tabsContentsSection").unblock();
    event.preventDefault();
//    registrationBlockuiCancelReset.blockuiFadingCentered('option', {
//                .div.growlUI { 
//    background: url(check48.png) no-repeat 10px 10px 
//}
//    });
    $('div.growlUI')
            .css("background",
                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
    BootstrapDialog.show({
        title: window.lang.translate('Form Reset'),
        message: window.lang.translate('Reset operation failed...'),
        type: BootstrapDialog.TYPE_DANGER
    });
//    registrationBlockuiCancelReset.blockuiFadingCentered('show');
}

/*
 * Submit User Form Elements
 * @Author: Bahram Lotfi Sadigh
 * @Since: 2016.1.21
 */

function submitUserGeneralInfoForm() {

    if ($('#userGeneralInfoForm').validationEngine('validate')) {

        if (!$("#pktemp") === null) {

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
                data: {
                    url: 'pkUpdate_infoUsers',
                    language_code: $("#langCode").val(),
                    name: $("#userFirstName").val(),
                    surname: $('#userLastName').val(),
                    username: $('#preferedUsername').val(),
                    password: $('#userPreferedPassword').val(),
                    auth_email: $('#useremail').val(),
                    preferred_language: $('#userPreferedLanguage :selected').val(),
                    profile_public: makePublicProfile,
                    operation_type_id: 2,
                    active: 0,
                    act_parent_id: 0
                },
                method: "GET",
                dataType: "json",
                success: function (data) {

                    if (data['errorInfo'][0] === '00000') {
                        $("#checkGeneralForm").val("1");
                        $("#pktemp").val(data.pktemp);
                        pktemp = data.pktemp;
                        $('#lastInsertId').val(data.lastInsertId);
                        console.log('update success: ' + data);
                        /*
                         * Changes Growl icon to success check...
                         * @author:Bahram Lotfi Sadigh
                         * @Since:2016/2/1
                         */
                        $('div.growlUI')
                                .css("background",
                                        "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");
                        BootstrapDialog.show({
                            title: window.lang.translate('Submission Process'),
                            message: window.lang.translate('General information submitted successfully'),
                            type: BootstrapDialog.TYPE_SUCCESS

                        });
                        $('#userGeneralInfo').attr('class', "tab-pane fade");
                        $('#userAddressInfo').attr('class', "tab-pane fade in active");
                        $('#userGeneralInfoTab').removeClass('active');
                        $('#userAddressInfoTab').addClass('active');
                        $('#userAddressInfoTab').removeClass('disabled');
                        /*
                         * OKan pktemp servisi yazilacak************************
                         * *****************************************************
                         */

                        taskProgressPerTabs();
                    } else if (data['errorInfo'] === '23505') {

                        console.log('insert success: ' + data['errorInfo']);
                        console.log(data);
                        var errorInfoColumn = data['errorInfoColumn'];
                        console.log('erroInfoColumn value is: ' + errorInfoColumn);
                        if (errorInfoColumn === 'auth_email') {
                            /*
                             * Changes Growl icon to fail cross...
                             * @author:Bahram Lotfi Sadigh
                             * @Since:2016/2/1
                             */
                            $('div.growlUI')
                                    .css("background",
                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            BootstrapDialog.show({
                                title: window.lang.translate('Submission Process'),
                                message: window.lang.translate('This email address has already been registered in the system'),
                                type: BootstrapDialog.TYPE_DANGER

                            });
                        } else if (errorInfoColumn === 'username') {
                            $('div.growlUI')
                                    .css("background",
                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            BootstrapDialog.show({
                                title: window.lang.translate('Submission Process'),
                                message: window.lang.translate('This username has already been registered in the system'),
                                type: BootstrapDialog.TYPE_DANGER

                            });
                        }

                    } else if (data['errorInfo'] === '23502') {

                        console.log('insert success: ' + data['errorInfo']);
                        console.log(data);
                        $('div.growlUI')
                                .css("background",
                                        "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                        BootstrapDialog.show({
                            title: window.lang.translate('Submission Process'),
                            message: window.lang.translate('System is unable to find required information'),
                            type: BootstrapDialog.TYPE_DANGER

                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                    console.error('update error: ' + jqXHR);
                    console.error('update error text : ' + textStatus);
                    console.error('update error thrown : ' + errorThrown);
                    $('div.growlUI')
                            .css("background",
                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                    BootstrapDialog.show({
                        title: window.lang.translate('Submission Process'),
                        message: window.lang.translate('System is unable to find required information'),
                        type: BootstrapDialog.TYPE_DANGER

                    });
                }
            });
        } else {

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
                data: {
                    url: 'tempInsert_infoUsers',
                    language_code: $("#langCode").val(),
                    name: $("#userFirstName").val(),
                    surname: $('#userLastName').val(),
                    username: $('#preferedUsername').val(),
                    password: $('#userPreferedPassword').val(),
                    auth_email: $('#useremail').val(),
                    preferred_language: $('#userPreferedLanguage :selected').val(),
                    profile_public: makePublicProfile
                },
                method: "GET",
                dataType: "json",
                success: function (data) {

                    if (data['errorInfo'][0] === '00000') {

                        $("#pktemp").val(data.pktemp);
                        pktemp = data.pktemp;
                        $('#lastInsertId').val(data.lastInsertId);
                        $("#checkGeneralForm").val("1");
                        console.log('insert success: ' + data['errorInfo'][0]);
                        $('div.growlUI')
                                .css("background",
                                        "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");
                        BootstrapDialog.show({
                            title: window.lang.translate('Submission Process'),
                            message: window.lang.translate('General information submitted successfully'),
                            type: BootstrapDialog.TYPE_SUCCESS

                        });
                        $('#userGeneralInfo').attr('class', "tab-pane fade");
                        $('#userAddressInfo').attr('class', "tab-pane fade in active");
                        $('#userGeneralInfoTab').removeClass('active');
                        $('#userAddressInfoTab').addClass('active');
                        $('#userAddressInfoTab').removeClass('disabled');
                        /*
                         * OKan pktemp servisi yazilacak************************
                         * *****************************************************
                         */


                        taskProgressPerTabs();
                    } else if (data['errorInfo'] === '23505') {

                        console.log('insert success: ' + data['errorInfo']);
                        console.log(data);
                        var errorInfoColumn = data['errorInfoColumn'];
                        console.log('erroInfoColumn value is: ' + errorInfoColumn);
                        if (errorInfoColumn === 'auth_email') {
                            $('div.growlUI')
                                    .css("background",
                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            BootstrapDialog.show({
                                title: window.lang.translate('Submission Process'),
                                message: window.lang.translate('This email address has already been registered in the system'),
                                type: BootstrapDialog.TYPE_DANGER

                            });
                        } else if (errorInfoColumn === 'username') {
                            $('div.growlUI')
                                    .css("background",
                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            BootstrapDialog.show({
                                title: window.lang.translate('Submission Process'),
                                message: window.lang.translate('This username has already been registered in the system'),
                                type: BootstrapDialog.TYPE_DANGER

                            });
                        }

                    } else if (data['errorInfo'] === '23502') {

                        console.log('insert success: ' + data['errorInfo']);
                        console.log(data);
                        $('div.growlUI')
                                .css("background",
                                        "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                        BootstrapDialog.show({
                            title: window.lang.translate('Submission Process'),
                            message: window.lang.translate('System is unable to find required information'),
                            type: BootstrapDialog.TYPE_DANGER

                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                    console.error('insert error: ' + jqXHR);
                    console.error('insert error text : ' + textStatus);
                    console.error('insert error thrown : ' + errorThrown);
                    $("#checkGeneralForm").val("0");
                    $('div.growlUI')
                            .css("background",
                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                    $('div.growlUI')
                            .css("background",
                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                    BootstrapDialog.show({
                        title: window.lang.translate('Submission Process'),
                        message: window.lang.translate('System is unable to find required information'),
                        type: BootstrapDialog.TYPE_DANGER

                    });
                }
            });
        }
        $("html, body").animate({scrollTop: 0}, "slow");
        event.preventDefault();
    }
}

function submitUserAddressInfoForm() {

    if ($('#userAddressInfoForm').validationEngine('validate')) {
        if ($('#usercountry :selected').val() === "91") {
            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
                data: {
                    url: 'pktempInsert_infoUsersAddresses',
                    pktemp: $("#pktemp").val(),
                    profile_public: makePublicAddress,
                    language_code: $("#langCode").val(),
                    operation_type_id: '1',
                    address_type_id: $('#addressTypesCombo :selected').val(),
                    address1: $('#userAddress1').val(),
                    address2: $('#userAddress2').val(),
                    postal_code: $('#userPostalCode').val(),
                    country_id: $('#usercountry :selected').val(),
                    city_id: $('#usercity :selected').val(),
                    borough_id: $('#userdistrict :selected').val(),
                    city_name: "",
                    description: $('#addressDescription').val()
                },
                method: "GET",
                dataType: "json",
                success: function (data) {
                    if (data['errorInfo'][0] === '00000') {

                        $("#pktemp").val(data.pktemp);
                        $('#lastInsertId').val(data.lastInsertId);
                        $("#checkGeneralForm").val("1");
                        console.log('insert success: ' + data['errorInfo'][0]);
                        $('div.growlUI')
                                .css("background",
                                        "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");
                        BootstrapDialog.show({
                            title: window.lang.translate('Submission Process'),
                            message: window.lang.translate('Address information submitted successfully'),
                            type: BootstrapDialog.TYPE_SUCCESS

                        });
                        $('#checkAddressForm').val('1');
                        $('#userAddressInfo').attr('class', "tab-pane fade");
                        $('#userCommunicationInfo').attr('class', "tab-pane fade in active");
                        $('#userAddressInfoTab').removeClass('active');
                        $('#userCommunicationInfoTab').addClass('active');
                        $('#userCommunicationInfoTab').removeClass('disabled');
                        taskProgressPerTabs();
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {

                    console.error(jqXHR);
                    console.error(textStatus);
                    console.error(errorThrown);
                    $("#checkAddressForm").val("0");
                    $('div.growlUI')
                            .css("background",
                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                    $('div.growlUI')
                            .css("background",
                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                    BootstrapDialog.show({
                        title: window.lang.translate('Submission Process'),
                        message: window.lang.translate('Address information submission failed'),
                        type: BootstrapDialog.TYPE_SUCCESS

                    });
                }
            });
        } else {

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
                data: {
                    url: 'pktempInsert_infoUsersAddresses',
                    pktemp: $("#pktemp").val(),
                    profile_public: makePublicAddress,
                    language_code: $("#langCode").val(),
                    operation_type_id: '1',
                    address_type_id: $('#addressTypesCombo :selected').val(),
                    address1: $('#userAddress1').val(),
                    address2: $('#userAddress2').val(),
                    postal_code: $('#userPostalCode').val(),
                    country_id: $('#usercountry :selected').val(),
                    city_id: "0",
                    borough_id: "0",
                    city_name: $('#userCityName').val(),
                    description: $('#addressDescription').val()
                },
                method: "GET",
                dataType: "json",
                success: function (data) {

                    if (data['errorInfo'][0] === '00000') {

                        $("#pktemp").val(data.pktemp);
                        $('#lastInsertId').val(data.lastInsertId);
                        $("#checkGeneralForm").val("1");
                        console.log('insert success: ' + data['errorInfo'][0]);
                        $('div.growlUI')
                                .css("background",
                                        "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");
                        submitUserAddressInfoSuccessful.blockuiFadingCentered('show');
                        $('#checkAddressForm').val('1');
                        $('#userAddressInfo').attr('class', "tab-pane fade");
                        $('#userCommunicationInfo').attr('class', "tab-pane fade in active");
                        $('#userAddressInfoTab').removeClass('active');
                        $('#userCommunicationInfoTab').addClass('active');
                        $('#userCommunicationInfoTab').removeClass('disabled');
                        $('#primaryTabs a[href ="#userCommunicationInfo"]').tab('show');
                        taskProgressPerTabs();
                    }
                }, error: function (jqXHR, textStatus, errorThrown) {

                    console.error(jqXHR);
                    console.error(textStatus);
                    console.error(errorThrown);
                    $("#checkAddressForm").val("0");
                    $('div.growlUI')
                            .css("background",
                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                    submitUserAddressInfoUnsuccessful.blockuiFadingCentered('option', {
                        backgroundColor: "#FF0000"
                    });
                    $('div.growlUI')
                            .css("background",
                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                    submitUserAddressInfoUnsuccessful.blockuiFadingCentered('show');
                }
            });
        }
        event.preventDefault();
        $("html, body").animate({scrollTop: 0}, "slow");
    }
}

function submitUserCommunicationInfoForm() {

    if ($('#userCommunicationInfoForm').validationEngine('validate')) {

        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
            data: {
                url: 'pktempInsert_infoUsersCommunications',
                pktemp: pktemp,
                profile_public: makePublicCommunication,
                language_code: $("#langCode").val(),
                communications_type_id: $('#communicationTypes :selected').val(),
                communications_no: $('#contactNumber').val(),
                description: $('#contactDescription').val(),
                description_eng: ''
            },
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data['errorInfo'][0] === '00000') {

                    $("#pktemp").val(data.pktemp);
                    $('#lastInsertId').val(data.lastInsertId);
                    $("#checkGeneralForm").val("1");
                    console.log('insert success: ' + data['errorInfo'][0]);
                    $('div.growlUI')
                            .css("background",
                                    "url(../../plugins/jquery-BlockUI/newCheck-1.png) no-repeat 10px 10px");
                    submitUserCommunicationInfoSuccessful.blockuiFadingCentered('show');
                    $('#userCommunicationInfoForm').val('1');
                    $('#userCommunicationInfo').attr('class', 'tab-pane fade');
                    $('#companyInfo').attr('class', 'tab-pane fade in active');
                    $('#userCommunicationInfoTab').removeClass('active');
                    $('#companyInfoTab').addClass('active');
                    $('#companyInfoTab').removeClass('disabled');
                    taskProgressPerTabs();
                }
            }, error: function (jqXHR, textStatus, errorThrown) {

                console.error(jqXHR);
                console.error(textStatus);
                console.error(errorThrown);
                $("#checkAddressForm").val("0");
                $('div.growlUI')
                        .css("background",
                                "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                submitUserCommunicationInfoUnsuccessful.blockuiFadingCentered('option', {
                    backgroundColor: "#FF0000"
                });
                $('div.growlUI')
                        .css("background",
                                "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                submitUserCommunicationInfoUnsuccessful.blockuiFadingCentered('show');
            }
        });
        $('#contactsListSection').html();
        event.preventDefault();
        $("html, body").animate({scrollTop: 0}, "slow");
    }
}


function finalizeUserCommunicationInfoForm() {

}


function activateButtons() {

    if ($("#terms").attr("checked") === "checked") {

        $('#userCommunicationInfoFormFinalize').removeClass('disabled');
        $('#userCommunicationInfoFormSubmit').removeClass('disabled');
    } else {
        $('#userCommunicationInfoFormFinalize').addClass('disabled');
        $('#userCommunicationInfoFormSubmit').addClass('disabled');
    }
}


/*
 * Function: Checks tabs (in this function user address info tab) activation, 
 * based on user general information form conditions. 
 * @author: bahram lotfi sadigh
 * @since: 2016.1.26
 */


function checkUGI() {

    if ($("#checkGeneralForm").val() === "1") {

    } else if ($("#checkGeneralForm").val() === "0") {

        if ($('#userAddressInfoTab').hasClass('active')) {

        } else if ($('#userAddressInfoTab').hasClass('disabled')) {

            contentBlockerWText.blockElementWithoutText('show');
            $('div.growlUI')
                    .css("background",
                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
            BootstrapDialog.show({
                title: window.lang.translate('Warning'),
                message: window.lang.translate('Please fill user general information form first'),
                type: BootstrapDialog.TYPE_WARNING,
                buttons: [{
                        label: 'Close',
                        action: function (dialogItself) {
                            dialogItself.close();
                            onclick:{
                                preventTab();
                            }
                        }
                    }]
            });
        }
    }
}

/*
 * Function: Checks tabs (in this function user communication info tab) activation, 
 * based on user address information form conditions. 
 * @author: bahram lotfi sadigh
 * @since: 2016.1.26
 */

function checkUAI() {

    if ($("#checkAddressForm").val() === "1") {

    } else if ($("#checkAddressForm").val() === "0") {

        if ($('#userCommunicationInfoTab').hasClass('active')) {

        } else if ($('#userCommunicationInfoTab').hasClass('disabled')) {

            contentBlockerWText.blockElementWithoutText('show');
            $('div.growlUI')
                    .css("background",
                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
            BootstrapDialog.show({
                title: window.lang.translate('Warning'),
                message: window.lang.translate('Please fill user general and address information forms first'),
                type: BootstrapDialog.TYPE_WARNING,
                buttons: [{
                        label: 'Close',
                        action: function (dialogItself) {
                            dialogItself.close();
                            onclick:{
                                preventTab();
                            }
                        }
                    }]
            });
        }
    }
}

/*
 * Function: Checks tabs (in this function user communication info tab) activation, 
 * based on user address information form conditions. 
 * @author: bahram lotfi sadigh
 * @since: 2016.1.26
 */

function checkCI() {

    if ($("#checkCommunicationForm").val() === "1") {

        /*
         * last insert id test on query success will be written here 
         */

    } else if ($("#checkCommunicationForm").val() === "0") {

        if ($('#companyInfoTab').hasClass('disabled')) {

            contentBlockerWText.blockElementWithoutText('show');
            $('div.growlUI')
                    .css("background",
                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
            BootstrapDialog.show({
                title: window.lang.translate('Warning'),
                message: window.lang.translate('Please fill user information forms first'),
                type: BootstrapDialog.TYPE_WARNING,
                buttons: [{
                        label: 'Close',
                        action: function (dialogItself) {
                            dialogItself.close();
                            onclick:{
                                preventTab();
                            }
                        }
                    }]
            });
        }
    }
}


/*
 * Function to prevent openning of unallowed tab and return to previous tab
 * @author:Bahram lotfi sadigh
 * @since:2016.1.26
 * 
 */

function preventTab() {

    $.unblockUI();
    $("#tabsContentsSection").unblock();
    event.preventDefault();
    if ($("#checkCommunicationForm").val() === "1") {
        $("#companyInfoTab").addClass('active');
    } else {
        $("#companyInfoTab").removeClass('active');
        $("#companyInfoTab").addClass('disabled');
        if ($("#checkAddressForm").val() === "1") {
            $("#userCommunicationInfoTab").addClass('active');
            $('#primaryTabs a[href ="#userCommunicationInfo"]').tab('show');
        } else {
            if ($("#checkGeneralForm").val() === "1") {
                $('#primaryTabs a[href ="#userAddressInfo"]').tab('show');
            } else {
                $('#primaryTabs li:eq(0) a').tab('show');
            }
        }
    }
}

function changePublicProfile() {

    if ($("#makePublicProfile").attr('checked') === 'checked') {
        makePublicProfile = '0';
    } else {
        makePublicProfile = '1';
    }
}

function changePublicAddress() {

    if ($("#makePublicAddress").attr('checked') === 'checked') {
        makePublicAddress = '0';
    } else {
        makePublicAddress = '1';
    }
}

function changePublicCommunication() {

    if ($("#makePubliccommunication").attr('checked') === 'checked') {
        makePubliccommunication = '0';
    } else {
        makePubliccommunication = '1';
    }
}

/*
 * Contact information table pop up on modal
 * @author:Bahram
 * @Since:2016.1.2
 */

$('#table_address_modal').bootstrapTable({
    onClickRow: function (row, $element) {
//        row: the record corresponding to the clicked row, 
//        $element: the tr element.
        console.log($("#pktemp").val());
        console.log(pktemp);
    },
    onCheck: function (row, $element) {
//        row: the record corresponding to the clicked row, 
//        $element: the tr element.
//        console.log(row.id);
    },
    url: "https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pktempFillGridSingular_infoUsersAddresses",
    method: 'GET',
    locale: "'" + ($('#langCode').val() + '-' + $('#langCode').val().toUpperCase()) + "'",
    toggle: "table",
    height: "300",
    width: "500",
    pagination: "true",
    search: "true",
    toolbar: "#toolbar",
    showColumns: true,
    showRefresh: true,
    showToggle: true,
    queryParams: function (p) {
        return {
            language_code: $('#langCode').val(),
            pktemp: pktemp,
//            pktemp: $("#pktemp").val()
            table_type: 'bootstrap'
        };
    },
    total: {field: 'total'},
    columns:
            [
                {checkbox: true},
                {field: 'address_type', sortable: true, width: 100},
                {field: 'tr_country_name', sortable: true, width: 100},
                {field: 'tr_city_name', sortable: true, width: 100},
                {field: 'tr_borough_name', sortable: true, width: 100},
                {field: 'city_name', sortable: true, width: 100},
                {field: 'address1', sortable: true, width: 200},
                {field: 'address2', sortable: true, width: 200},
                {field: 'postal_code', sortable: true, width: 50},
                {field: 'description', width: 300}
            ]
});

var userGeneralInformationProgress = "0";
var userAddressInformationProgress = "0";
var userCommunicationInformationProgress = "0";
var overallRegistrationProgress = "0";
function taskProgressPerTabs() {

    if ($('#checkGeneralForm').val() === '0') {

        userGeneralInformationProgressNumber = 0;
        overallRegistrationProgressNumber = 0;
        if ($('#userFirstName').val()) {
            userGeneralInformationProgressNumber += 20;
            overallRegistrationProgressNumber += 6;
        }
        if ($('#userLastName').val()) {
            userGeneralInformationProgressNumber += 20;
            overallRegistrationProgressNumber += 6;
        }
        if ($('#preferedUsername').val()) {
            userGeneralInformationProgressNumber += 20;
            overallRegistrationProgressNumber += 6;
        }
        if (!$('#useremail').validationEngine('validate')) {
            userGeneralInformationProgressNumber += 20;
            overallRegistrationProgressNumber += 6;
        }
        if (!$('#userPreferedPassword').validationEngine('validate')) {
            userGeneralInformationProgressNumber += 20;
            overallRegistrationProgressNumber += 6;
        }
        userGeneralInformationProgress = userGeneralInformationProgressNumber.toString();
        $("#userGeneralInfoRegistrationProgress").
                html(userGeneralInformationProgress + '%');
        $("#userGeneralInfoRegistrationProgressStyle").
                css({"width": userGeneralInformationProgress +
                            '%', "aria-valuenow": userGeneralInformationProgress});
        /*
         * popup a prompt on task progress and hide after 3 secs.
         */

        if (userGeneralInformationProgressNumber === 100) {

            $("#userGeneralInfoRegistrationProgress").validationEngine(
                    'showPrompt',
                    'You may now continue to Address section ...',
                    'load',
                    true);
            setTimeout(function () {
                $('#userGeneralInfoRegistrationProgress').validationEngine('hide');
            }, 3000);
        }

        overallRegistrationProgress = overallRegistrationProgressNumber.toString();
        $("#overallRegistrationProgress").
                html(overallRegistrationProgress + '%');
        $("#overallRegistrationProgressStyle").
                css({"width": overallRegistrationProgress +
                            '%', "aria-valuenow": overallRegistrationProgress});
    } else if ($('#checkGeneralForm').val() === '1') {
        if ($('#checkAddressForm').val() === '0') {

            userAddressInformationProgressNumber = 0;
            overallRegistrationProgressNumber = 30;
            if ($('#addressTypesCombo :selected').val()) {
                userAddressInformationProgressNumber += 25;
            }
            if ($('#usercountry :selected').val() === "91") {
                userAddressInformationProgressNumber += 25;
                if ($('#usercity :selected').val() >= 0) {
                    userAddressInformationProgressNumber += 15;
                }
                if ($('#userdistrict :selected').val() >= 0) {
                    userAddressInformationProgressNumber += 10;
                }
            } else if ($('#usercountry :selected').val() === "-1") {
            } else {
                userAddressInformationProgressNumber += 25;
                if ($('#userCityName').val()) {
                    userAddressInformationProgressNumber += 25;
                }
            }
            if ($('#userAddress1').val()) {
                userAddressInformationProgressNumber += 10;
            }
            if ($('#userAddress2').val()) {
                userAddressInformationProgressNumber += 10;
            }
            if ($('#userPostalCode').val()) {
                userAddressInformationProgressNumber += 5;
            }
            userAddressInformationProgress = userAddressInformationProgressNumber.toString();
            $("#userAddressInfoRegistrationProgress").
                    html(userAddressInformationProgress + '%');
            $("#userAddressInfoRegistrationProgressStyle").
                    css({"width": userAddressInformationProgress +
                                '%', "aria-valuenow": userAddressInformationProgress});
            overallRegistrationProgress = overallRegistrationProgressNumber.toString();
            $("#overallRegistrationProgress").
                    html(overallRegistrationProgress + '%');
            $("#overallRegistrationProgressStyle").
                    css({"width": overallRegistrationProgress +
                                '%', "aria-valuenow": overallRegistrationProgress});
            /*
             * popup a prompt on task progress and hide after 3 secs.
             */

            if (userAddressInformationProgressNumber === 100) {

                $("#userAddressInfoRegistrationProgress").validationEngine(
                        'showPrompt',
                        'You may now continue to communication section ...',
                        'load',
                        true);
                setTimeout(function () {
                    $('#userAddressInfoRegistrationProgress').validationEngine('hide');
                }, 3000);
            }
        } else if ($('#checkGeneralForm').val() === '1') {
            if ($('#checkAddressForm').val() === '1') {
                if ($('#checkCommunicationForm').val() === '0') {

                    userCommunicationInformationProgressNumber = 0;
                    overallRegistrationProgressNumber = 60;
                    if ($('#communicationTypes :selected').val()) {
                        userCommunicationInformationProgressNumber += 50;
                        overallRegistrationProgressNumber += 15;
                    }

                    if ($('#contactNumber').val()) {
                        userCommunicationInformationProgressNumber += 50;
                        overallRegistrationProgressNumber += 15;
                    }

                    if ($("#terms").attr("checked") === "checked") {
                        overallRegistrationProgressNumber += 10;
                    }

                    userCommunicationInfoRegistrationProgress = userCommunicationInformationProgressNumber.toString();
                    overallRegistrationProgress = overallRegistrationProgressNumber.toString();
                    $("#userCommunicationInfoRegistrationProgress").
                            html(userCommunicationInfoRegistrationProgress + '%');
                    $("#userCommunicationInfoRegistrationProgressStyle").
                            css({"width": userCommunicationInfoRegistrationProgress +
                                        '%', "aria-valuenow": userCommunicationInfoRegistrationProgress});
                    overallRegistrationProgress = overallRegistrationProgressNumber.toString();
                    $("#overallRegistrationProgress").
                            html(overallRegistrationProgress + '%');
                    $("#overallRegistrationProgressStyle").
                            css({"width": overallRegistrationProgress +
                                        '%', "aria-valuenow": overallRegistrationProgress});
                    /*
                     * popup a prompt on task progress and hide after 3 secs.
                     */

                    if (userCommunicationInformationProgressNumber === 100) {

                        if ($("#terms").attr("checked") === "checked") {

                            $("#userCommunicationInfoRegistrationProgress").validationEngine(
                                    'showPrompt',
                                    'You may now continue to company section ...',
                                    'load',
                                    true);
                            setTimeout(function () {
                                $('#userCommunicationInfoRegistrationProgress').validationEngine('hide');
                            }, 3000);
                        } else {
                            $("#userCommunicationInfoRegistrationProgress").validationEngine(
                                    'showPrompt',
                                    'After accepting conditions and terms you may continue ...',
                                    'load',
                                    true);
                            setTimeout(function () {
                                $('#userCommunicationInfoRegistrationProgress').validationEngine('hide');
                            }, 3000);
                        }
                    }
                }
            }
        }
    }
}



