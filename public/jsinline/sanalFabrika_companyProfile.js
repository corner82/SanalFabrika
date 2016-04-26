$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());


    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {url: 'fillCompanyInfoEmployeesGuest_infoFirmProfile',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);

            var imageFolAddress = 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/logos/';

            window.logosrc = imageFolAddress + data[0].logo;

            $('#profileLogosrc').attr('src', window.logosrc);
            $('#logoPlace1').attr('src', window.logosrc);

            $('#header_company_name').empty();
            $('#header_company_name').append(data[0].firm_name_short);
            var companyAddressPHAppending =
                    "<h2>Company Information</h2>"
                    + "<p style='text-align: center'>"
                    + "<a href='"
                    + data[0].web_address
                    + "'><h5>"
                    + data[0].web_address
                    + "</h5></a>"
                    + "<h5>"
                    + data[0].address
                    + "</h5>"
                    + "</p>";
            $('#companyAddressPH').empty();
            $('#companyAddressPH').prepend(companyAddressPHAppending);

            $('#logosrc').attr('src', window.logosrc);
            $('#logoName').empty();
            $('#logoName').append(data[0].firm_names);


            $('#company_name_PH').empty();
            $('#company_name_PH').append(data[0].firm_names);

            $('#companyInfoPH').empty();
            $('#companyInfoPH').append(data[0].country_names + "<br/>");
            $('#companyInfoPH').append(window.lang.translate("Total number of employees") + ": ");
            $('#companyInfoPH').append(data[0].number_of_employees + "<br/>");
            $('#companyInfoPH').append(window.lang.translate('Foundation Date') + ": ");
            $('#companyInfoPH').append(data[0].foundation_year + "<br/>");

            $('#company_desc_PH').empty();
            $('#company_desc_PH').append(data[0].about + "<br/>");
            /*
             $('#companyInfoPH').append(window.lang.translate('Engineers') + ": ");
             $('#companyInfoPH').append(data[0].number_of_engineer + "<br/>");
             $('#companyInfoPH').append(window.lang.translate('Adiminstrative staff') + ": ");
             $('#companyInfoPH').append(data[0].number_of_administrative_staff + "<br/>");
             $('#companyInfoPH').append(window.lang.translate('Foreign trade staff') + ": ");
             $('#companyInfoPH').append(data[0].number_of_foreign_trade_staff + "<br/>");
             $('#companyInfoPH').append(window.lang.translate('Sales staff') + ": ");
             $('#companyInfoPH').append(data[0].number_of_sales_staff + "<br/>");
             $('#companyInfoPH').append(window.lang.translate('Technicians') + ": ");
             $('#companyInfoPH').append(data[0].number_of_technician + "<br/>");
             $('#companyInfoPH').append(window.lang.translate('Workers') + ": ");
             $('#companyInfoPH').append(data[0].number_of_worker);
             */

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                data: {url: 'fillCompanyInfoSocialediaGuest_infoFirmProfile',
                    language_code: $("#langCode").val(),
                    npk: $('#selectedCompanyNpk').val()
                },
                method: "GET",
                dataType: "json",
                success: function (data2) {

                    $('#socialMediaHP').empty();

                    var i;
                    if (data2.length !== null) {
                        for (i = 0; i < data2.length; i++) {
                            var socialMediaHPAppending =
                                    "<li><a class='social_"
                                    + data2[i].socialmedia
                                    + " data-original-title='"
                                    + data2[i].socialmedia
                                    + "' href='"
                                    + data2[i].firm_link
                                    + "'></a></li>";

                            $('#socialMediaHP').append(socialMediaHPAppending);
                        }
                    }
                }
            });

            $('#briefDescPH').empty();
            $('#briefDescPH').append(data[0].descriptions);


            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                data: {url: 'fillCompanyInfoReferencesGuest_infoFirmProfile',
                    language_code: $("#langCode").val(),
                    npk: $('#selectedCompanyNpk').val()
                },
                method: "GET",
                dataType: "json",
                success: function (data3) {

                    $('#referencesPH').empty();

                    var i;
                    if (data3.length !== null) {
                        for (i = 0; i < data3.length; i++) {
                            var referencesPHAppending =
                                    "<li><i class='fa fa-check color-green'></i>"
                                    + data3[i].ref_name
                                    + "</li>";

                            $('#referencesPH').append(referencesPHAppending);
                        }
                    }
                }
            });


            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                data: {url: 'fillCompanyInfoCustomersGuest_infoFirmProfile',
                    language_code: $("#langCode").val(),
                    npk: $('#selectedCompanyNpk').val()
                },
                method: "GET",
                dataType: "json",
                success: function (data4) {

//                    console.log(data4);

                    $('#customersPH').empty();

                    var i;
                    var c_logo;

                    if (data4.length !== null) {
                        for (i = 0; i < data4.length; i++) {

//                            if (data4[i].customer_logo === null) {
//                                c_logo = "image_not_found.png";
//                            } else {
//                                c_logo = data4[i].customer_logo;
//                            }
                            var colors = ['dark', 'blue', 'aqua', 'red', 'yellow', 'purple', 'green', 'orange'];
//                            console.log(colors);
                            var ran_color = colors[Math.floor(Math.random() * colors.length)];
//                            console.log(ran_color);
                            var customersPHAppending =
                                    "<div style='float: left;margin-left:5px'>"
                                    + "<button class='btn-u btn-brd btn-brd-hover rounded-2x "
                                    + "btn-u-"
                                    + ran_color
                                    + " btn-u-lg'"
                                    + "type='button'>"
                                    + data4[i].customer_names
                                    + "</button>"
                                    + "</div>";

                            $('#customersPH').append(customersPHAppending);
                        }
                    }
                }
            });


            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                data: {url: 'fillCompanyInfoSectorsGuest_infoFirmProfile',
                    language_code: $("#langCode").val(),
                    npk: $('#selectedCompanyNpk').val()
                },
                method: "GET",
                dataType: "json",
                success: function (data5) {
                    $("#com_sec_list").empty();
                    var i;

                    for (i = 0; i < data5.length; i++) {

                        var appending =
                                "<tr>"
                                + "<td>"
                                + "<img class='sec_logo' src='"
                                + "https://"
                                + window.location.hostname
                                + "/onyuz/standard/assets/img/sfClients/logos/"
                                + data5[i].logo
                                + "' alt=''>"
                                + "</td>"
                                + "<td>"
                                + "<h5>"
                                + data5[i].sector_name
                                + "</h5>"
                                + "</td>"
                                + "</tr>";
//                        console.log(appending);
                        $("#com_sec_list").append(appending);
                    }

                }
            });
        }
    });
});
