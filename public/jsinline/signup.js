$(document).ready(function () {
        
console.log('locale:'+ ($('#langCode').val()+ '-' + $('#langCode').val().toUpperCase()));
    /**
     * multilanguage plugin 
     * @type Lang
     */
    var lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#langCode').val());
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
     * List of countries combobox ajax
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syscountrys',
            language_code: $("#langCode").val()

        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            var i;
            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newappendingOption = $(appending_option_html);
                    $(newappendingOption).appendTo($("#usercountry"));
                }
            }
        }
    });
    /*
     * List of provinces combobox ajax based on selected country
     */

    $("select#usercountry").on('change', function () {

        var selectedCountryId = $('#usercountry :selected').val();
        $("#usercity").empty();
        $("#userdistrict").empty();
        $("#uservillage").empty();
        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
            data: {
                url: 'fillComboBox_syscity',
                country_id: selectedCountryId,
                language_code: $("#langCode").val()
            },
            method: "GET",
            dataType: "json",
            success: function (data) {

                var i;
                for (i = 0; i < data.length; i++) {
                    if (data[i].name === null) {

                    } else {

                        var province_appending_option_html = "<option value = '" + data[i].id + "' >" +
                                data[i].name +
                                "</option>";
                        var newprovinceappendingOption = $(province_appending_option_html);
                        $(newprovinceappendingOption).appendTo($("#usercity"));
                    }
                }
            }
        });
    });
    /*
     * List of districts combobox ajax based on selected country and province
     */

    $("select#usercity").on('change', function () {

        var selectedCityId = $('#usercity :selected').val();
        var selectedCountryId = $('#usercountry :selected').val();
        $("#userdistrict").empty();
        $("#uservillage").empty();
        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
            data: {
                url: 'fillComboBox_sysborough',
                country_id: selectedCountryId,
                city_id: selectedCityId,
                language_code: $("#langCode").val()
            },
            method: "GET",
            dataType: "json",
            success: function (data) {

                var i;
                for (i = 0; i < data.length; i++) {
                    if (data[i].name === null) {

                    } else {

                        var district_appending_option_html = "<option value = '" + data[i].id + "' >" +
                                data[i].name +
                                "</option>";
                        var newdistrictappendingOption = $(district_appending_option_html);
                        $(newdistrictappendingOption).appendTo($("#userdistrict"));
//                    $(newappendingOption).on("click", function (event) {

//                    });
                    }
                }
            }
        });
    });
    /*
     * List of villages combobox ajax based on selected country, province
     * and district
     */

    $("select#userdistrict").on('change', function () {

        var selectedDistrictId = $('#userdistrict :selected').val();
        var selectedCityId = $('#usercity :selected').val();
        var selectedCountryId = $('#usercountry :selected').val();
        $("#uservillage").empty();
        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
            data: {
                url: 'fillComboBox_sysvillage',
                country_id: selectedCountryId,
                city_id: selectedCityId,
                boroughs_id: selectedDistrictId,
                language_code: $("#langCode").val()
            },
            method: "GET",
            dataType: "json",
            success: function (data) {

                var i;
                for (i = 0; i < data.length; i++) {
                    if (data[i].name === null) {

                    } else {

                        var district_appending_option_html = "<option value = '" + data[i].id + "' >" +
                                data[i].name +
                                "</option>";
                        var newdistrictappendingOption = $(district_appending_option_html);
                        $(newdistrictappendingOption).appendTo($("#uservillage"));
//                    $(newappendingOption).on("click", function (event) {

//                    });
                    }
                }
            }
        });
    });
    /*
     * List of System languages combobox ajax
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syslanguage',
            language_code: $("#langCode").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            var i;
//            console.log(data);
            for (i = 0; i < data.length; i++) {
                if (data[i].language === null) {

                } else {

                    var appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].language +
                            "</option>";
                    var newappendingOption = $(appending_option_html);
                    $(newappendingOption).appendTo($("#userPreferedLanguage"));
                }
            }
        }
    });
    /*
     * List of communication types combobox ajax
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'fillCommunicationsTypes_sysSpecificDefinitions',
            language_code: $("#langCode").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;
            for (i = 0; i < data.length; i++) {
                if (data[i].text === null) {

                } else {

                    var appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].text +
                            "</option>";
                    var newappendingOption = $(appending_option_html);
                    $(newappendingOption).appendTo($("#communicationTypes"));
                }
            }
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
 * 
 * @type @exp;event@pro;target
 * Signup.js variables
 * 
 */
var clickedButton;
var clickedForm;
var makePublicProfile = 0;
var makePublicAddress = 0;
var makePublicCommunication = 0;
/*
 * Reset Form Elements
 * @Author: Bahram Lotfi Sadigh
 * @Since: 2016.1.21
 */

function resetForm() {

    clickedButton = event.target;
    clickedForm = clickedButton.closest('form');
    contentBlocker.blockElement('show');
    /*
     * Changes Growl icon to warning...
     * @author:Bahram Lotfi Sadigh
     * @Since:2016/2/1
     */
    $('div.growlUI')
            .css("background",
                    "url(../../plugins/jquery-BlockUI/newWarning-1.png) no-repeat 10px 10px");
    registrationBlockuiResetFormApproval.blockuiCentered('show');
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
                    preferred_language: $('#userPreferedLanguage').val(),
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
                        submitUserGeneralInfoSuccessful.blockuiFadingCentered('show');
                        $('#userGeneralInfo').attr('class', "tab-pane fade");
                        $('#userAddressInfo').attr('class', "tab-pane fade in active");
                        $('#userGeneralInfoTab').removeClass('active');
                        $('#userAddressInfoTab').addClass('active');
                        $('#userAddressInfoTab').removeClass('disabled');
                        /*
                         * OKan pktemp servisi yazilacak************************
                         * *****************************************************
                         */

                    } else if (data['errorInfo'] === '23505') {

                        console.log('insert success: ' + data['errorInfo']);
                        console.log(data);
                        var errorInfoColumn = data['errorInfoColumn'];
                        console.log('erroInfoColumn value is: ' + errorInfoColumn);
                        if (errorInfoColumn = 'auth_email') {
                            /*
                             * Changes Growl icon to fail cross...
                             * @author:Bahram Lotfi Sadigh
                             * @Since:2016/2/1
                             */
                            $('div.growlUI')
                                    .css("background",
                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            submitUserGeneralInfoUnsuccessful23505_auth_email.blockuiFadingCentered('show');
                        } else if (errorInfoColumn = 'username') {
                            $('div.growlUI')
                                    .css("background",
                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            submitUserGeneralInfoUnsuccessful23505_username.blockuiFadingCentered('show');
                        }

                    } else if (data['errorInfo'] === '23502') {

                        console.log('insert success: ' + data['errorInfo']);
                        console.log(data);
                        $('div.growlUI')
                                .css("background",
                                        "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                        submitUserGeneralInfoUnsuccessful23502.blockuiFadingCentered('show');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                    console.error('update error: ' + jqXHR);
                    console.error('update error text : ' + textStatus);
                    console.error('update error thrown : ' + errorThrown);
                    $('div.growlUI')
                            .css("background",
                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                    submitUserGeneralInfoUnsuccessful.blockuiFadingCentered('show');
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
                    preferred_language: $('#userPreferedLanguage').val(),
                    profile_public: makePublicProfile
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
                        submitUserGeneralInfoSuccessful.blockuiFadingCentered('show');
                        $('#userGeneralInfo').attr('class', "tab-pane fade");
                        $('#userAddressInfo').attr('class', "tab-pane fade in active");
                        $('#userGeneralInfoTab').removeClass('active');
                        $('#userAddressInfoTab').addClass('active');
                        $('#userAddressInfoTab').removeClass('disabled');
                        /*
                         * OKan pktemp servisi yazilacak************************
                         * *****************************************************
                         */

                    } else if (data['errorInfo'] === '23505') {

                        console.log('insert success: ' + data['errorInfo']);
                        console.log(data);
                        var errorInfoColumn = data['errorInfoColumn'];
                        console.log('erroInfoColumn value is: ' + errorInfoColumn);
                        if (errorInfoColumn = 'auth_email') {
                            $('div.growlUI')
                                    .css("background",
                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            submitUserGeneralInfoUnsuccessful23505_auth_email.blockuiFadingCentered('show');
                        } else if (errorInfoColumn = 'username') {
                            $('div.growlUI')
                                    .css("background",
                                            "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                            submitUserGeneralInfoUnsuccessful23505_username.blockuiFadingCentered('show');
                        }

                    } else if (data['errorInfo'] === '23502') {

                        console.log('insert success: ' + data['errorInfo']);
                        console.log(data);
                        $('div.growlUI')
                                .css("background",
                                        "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                        submitUserGeneralInfoUnsuccessful23502.blockuiFadingCentered('show');
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
                    submitUserGeneralInfoUnsuccessful.blockuiFadingCentered('option', {
                        backgroundColor: "#FF0000"
                    });
                    $('div.growlUI')
                            .css("background",
                                    "url(../../plugins/jquery-BlockUI/newCross-1.png) no-repeat 10px 10px");
                    submitUserGeneralInfoUnsuccessful.blockuiFadingCentered('show');
                }
            });
        }



        $("html, body").animate({scrollTop: 0}, "slow");
        event.preventDefault();
    }
}

function submitUserAddressInfoForm() {


    if ($('#userAddressInfoForm').validationEngine('validate')) {

        $('#checkAddressForm').val('1');
        $('#userAddressInfo').attr('class', "tab-pane fade");
        $('#userCommunicationInfo').attr('class', "tab-pane fade in active");
        $('#userAddressInfoTab').removeClass('active');
        $('#userCommunicationInfoTab').addClass('active');
        $('#userCommunicationInfoTab').removeClass('disabled');
        event.preventDefault();
        $("html, body").animate({scrollTop: 0}, "slow");
    }

}

function submitUserCommunicationInfoForm() {

    if ($('#userCommunicationInfoForm').validationEngine('validate')) {

        $('#userCommunicationInfoForm').val('1');
        $('#userCommunicationInfo').attr('class', 'tab-pane fade');
        $('#companyInfo').attr('class', 'tab-pane fade in active');
        $('#userCommunicationInfoTab').removeClass('active');
        $('#companyInfoTab').addClass('active');
        $('#companyInfoTab').removeClass('disabled');
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
            registrationBlockuiPreventAddressTab.blockuiCentered('show');
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
            registrationBlockuiPreventCommunicationTab.blockuiCentered('show');
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
            registrationBlockuiPreventCompanyTab.blockuiCentered('show');
        }
    }
}

/*
 * Growls js section
 * @author: Bahram Lotfi Sadigh
 * @since: 2016.1.26
 */

var registrationBlockuiResetFormApproval = $("#growlUI-resetFormApproval").blockuiCentered();
var registrationBlockuiSuccessfulReset = $("#growlUI-successfulReset").blockuiFadingCentered();
var registrationBlockuiCancelReset = $("#growlUI-cancelReset").blockuiFadingCentered();
/*
 * tab controller growls
 */
var registrationBlockuiPreventAddressTab = $("#growlUI-addressTabPrevention").blockuiCentered();
var registrationBlockuiPreventCommunicationTab = $("#growlUI-communicationTabPrevention").blockuiCentered();
var registrationBlockuiPreventCompanyTab = $("#growlUI-companyTabPrevention").blockuiCentered();
/*
 * @returns {undefined}
 * Info submission growls
 * @author: Bahram Lotfi Sadigh
 * @since: 2016.1.27
 * 
 * submit general info
 */
var submitUserGeneralInfoSuccessful = $("#growlUI-submitUserGeneralInfoSuccessful").blockuiFadingCentered();
var submitUserGeneralInfoUnsuccessful = $("#growlUI-submitUserGeneralInfoUnsuccessful").blockuiFadingCentered();
var submitUserGeneralInfoUnsuccessful23505_auth_email = $("#growlUI-submitUserGeneralInfoUnsuccessful23505_auth_email").blockuiFadingCentered();
var submitUserGeneralInfoUnsuccessful23505_username = $("#growlUI-submitUserGeneralInfoUnsuccessful23505_username").blockuiFadingCentered();
var submitUserGeneralInfoUnsuccessful23502 = $("#growlUI-submitUserGeneralInfoUnsuccessful23502").blockuiFadingCentered();
/* 
 * submit address info
 */
var submitUserAddressInfoSuccessful = $("#growlUI-submitUserAddressInfoSuccessful").blockuiCentered();
var submitUserAddressInfoUnsuccessful = $("#growlUI-submitUserAddressInfoUnsuccessful").blockuiCentered();
/* 
 * submit communication info
 */
var submitUserCommunicationInfoSuccessful = $("#growlUI-submitUserCommunicationInfoSuccessful").blockuiCentered();
var submitUserCommunicationInfoUnsuccessful = $("#growlUI-submitUserCommunicationInfoUnsuccessful").blockuiCentered();
/*
 * Content blocker
 */

var contentBlocker = $("#tabsContentsSection").blockuiCentered();
var contentBlockerWText = $("#tabsContentsSection").blockElementWithoutText();
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
    registrationBlockuiSuccessfulReset.blockuiFadingCentered('show');
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
    registrationBlockuiCancelReset.blockuiFadingCentered('show');
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
        makePublicProfile = 0;
    } else {
        makePublicProfile = 1;
    }
}

function changePublicAddress() {

    if ($("#makePublicAddress").attr('checked') === 'checked') {
        makePublicAddress = 0;
    } else {
        makePublicAddress = 1;
    }
}

function changePublicCommunication() {

    if ($("#makePubliccommunication").attr('checked') === 'checked') {
        makePubliccommunication = 0;
    } else {
        makePubliccommunication = 1;
    }
}

/*
 * Contact information table pop up on modal
 * @author:Bahram
 * @Since:2016.1.2
 */




$('#table_address_modal').bootstrapTable({
    onClickRow: function (row, $element) {
        // row: the record corresponding to the clicked row, 
        // $element: the tr element.
        console.log(row.name);
    },
    onCheck: function (row, $element) {
        // row: the record corresponding to the clicked row, 
        // $element: the tr element.
        console.log(row.id);
    },    
    locale:"'" + ($('#langCode').val()+ '-' + $('#langCode').val().toUpperCase()) + "'",
    toggle: "table",
    height: "300",
    pagination: "true",
    search: "true",
    toolbar: "#toolbar",
    url: "https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=fillComboBox_syscountrys",
    queryParams: function (p) {
        return{
            language_code: $('#langCode').val()
        };
    }
});


