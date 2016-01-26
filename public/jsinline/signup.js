$(document).ready(function () {

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

    $("select#usercity").on('change', function () {

        var selectedCity = $('#usercity option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
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


    $("select#userdistrict").on('change', function () {

        var selectedDistrict = $('#userdistrict option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
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


    $('#userGeneralInfoFormSubmit').submit(submitUserGeneralInfoForm);
    $('#userAddressInfoFormSubmit').submit(submitUserAddressInfoForm);
    $('#userCommunicationInfoFormSubmit').submit(submitUserCommunicationInfoForm);
    $("#userInfoFormReset").on('click', resetForm);
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


/*
 * Reset Form Elements
 * @Author: Bahram Lotfi Sadigh
 * @Since: 2016.1.21
 */

function resetForm() {

    clickedButton = event.target;
    clickedForm = clickedButton.closest('form');



    registrationBlockuiResetFormApproval.blockuiApprovalWrapper();
    $('#userGeneralInfoForm').block({
            message: '<h1>İşlem yapılıyor..</h1>',
            css: {border: 'none',
                padding: '15px',
                backgroundColor: '#008000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                'border-radius': '10px',
                opacity: .5,
                color: '#fff'}
        });
        
    registrationBlockuiResetFormApproval.blockuiApprovalWrapper('test');
}

/*
 * Submit User Form Elements
 * @Author: Bahram Lotfi Sadigh
 * @Since: 2016.1.21
 */
function submitUserGeneralInfoForm() {

    $('#userGeneralInfo').attr('class', "tab-pane fade");
    $('#userAddressInfo').attr('class', "tab-pane fade in active");
    $('#userGeneralInfoTab').removeClass('active');
    $('#userAddressInfoTab').addClass('active');
    event.preventDefault();
    $("html, body").animate({scrollTop: 0}, "slow");

}

function submitUserAddressInfoForm() {

    $('#userAddressInfo').attr('class', "tab-pane fade");
    $('#userCommunicationInfo').attr('class', "tab-pane fade in active");
    $('#userAddressInfoTab').removeClass('active');
    $('#userCommunicationInfoTab').addClass('active');
    event.preventDefault();
    $("html, body").animate({scrollTop: 0}, "slow");

}

function submitUserCommunicationInfoForm() {

    $('#userCommunicationInfo').attr('class', "tab-pane fade");
    $('#userInfo').attr('class', "tab-pane fade");
    $('#companyInfo').attr('class', "tab-pane fade in active");
    $('#userCommunicationInfoTab').removeClass('active');
    $('#userInfoTab').removeClass('active');
    $('#companyInfoTab').addClass('active');
    event.preventDefault();
    $("html, body").animate({scrollTop: 0}, "slow");

}

function finalizeUserCommunicationInfoForm() {

}


function activateButtons() {

    if ($("#terms").attr("checked") === "checked") {

        $('#userCommunicationInfoFormFinalize').removeClass('disabled');
        $('#userCommunicationInfoFormSubmit').removeClass('disabled');

        $('#userCommunicationInfoFormFinalize').attr('disabled', false);
        $('#userCommunicationInfoFormSubmit').attr('disabled', false);
    } else {
        $('#userCommunicationInfoFormFinalize').addClass('disabled');
        $('#userCommunicationInfoFormSubmit').addClass('disabled');

        $('#userCommunicationInfoFormFinalize').attr('disabled', true);
        $('#userCommunicationInfoFormSubmit').attr('disabled', true);
    }
}

/*
 * Growls js section
 * @author: Bahram Lotfi Sadigh
 * @since: 2016.1.26
 */

var registrationBlockuiResetFormApproval = $("#growlUI-resetFormApproval").blockuiApprovalWrapper();
var registrationBlockuiSuccessfulReset = $("#growlUI-successfulReset").blockuiWrapper();

function resetConfirmation() {
    clickedForm.reset();    
    $.unblockUI();
    return true;
}

function resetRejection() {
        
    return false;
}

