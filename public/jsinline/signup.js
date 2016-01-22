$(document).ready(function () {


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

        $("#userprovince").empty();

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
                        $(newprovinceappendingOption).appendTo($("#userprovince"));
                    }
                }
            }
        });
    });

    $('#userInfoFormSubmit').submit(submitUserInfoForm);
    $("#userInfoFormReset").on('click', resetForm);


});



    /*
     * Reset Form Elements
     * @Author: Bahram Lotfi Sadigh
     * @Since: 2016.1.21
     */


    function resetForm() {

        var clickedButton = event.target;
        var clickedForm = clickedButton.closest('form');

        clickedForm.reset();

        console.log('cleared');

    }

    /*
     * Submit User Form Elements
     * @Author: Bahram Lotfi Sadigh
     * @Since: 2016.1.21
     */
    function submitUserInfoForm() {
        
        $('#userInfo').attr('class', "tab-pane fade");
        $('#companyInfo').attr('class', "tab-pane fade in active");
        $('#userInfoTab').removeClass('active');
        $('#companyInfoTab').addClass('active');
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");

    }


