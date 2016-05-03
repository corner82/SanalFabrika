$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());


    if ($('#pk').val()) {
        var ref_service_url = 'pkFillCompanyInfoReferences_infoFirmProfile';
        var soc_med_service_url = 'pkFillCompanyInfoSocialedia_infoFirmProfile';
        var verbal_service_url = 'pkFillUsersFirmVerbalNpk_infoFirmVerbal';
    } else {
        var ref_service_url = 'fillCompanyInfoReferencesGuest_infoFirmProfile';
        var soc_med_service_url = 'fillCompanyInfoSocialediaGuest_infoFirmProfile ';
        var verbal_service_url = 'fillUsersFirmVerbalNpkGuest_infoFirmVerbal';
    }


    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {url: verbal_service_url,
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $('#pk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data.rows[0]);

            $('#firm_name_ph').empty();
            $('#header_company_name').empty();
            $('#about_firm_ph').empty();
            $('#title_1_ph').empty();
            $('#verbal_1_ph').empty();
            $('#title_2_ph').empty();
            $('#verbal_2_ph').empty();
            $('#title_3_ph').empty();
            $('#verbal_3_ph').empty();
            $('#profileLogosrc').empty();

            var about_company = data.rows[0].about;
            var firm_name = data.rows[0].firm_name;
            var title_1 = data.rows[0].verbal1_title;
            var verbal_1 = data.rows[0].verbal1;
            var title_2 = data.rows[0].verbal2_title;
            var verbal_2 = data.rows[0].verbal2;
            var title_3 = data.rows[0].verbal3_title;
            var verbal_3 = data.rows[0].verbal3;
            var imageFolAddress = 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/';
            var logo_src = imageFolAddress + data.rows[0].logo;

            $('#header_company_name').append("<i class='fa fa-user'></i>" + firm_name);
            $('#firm_name_ph').append(firm_name);
            $('#about_firm_ph').append(about_company);
            $('#title_1_ph').append(title_1);
            $('#verbal_1_ph').append(verbal_1);
            $('#title_2_ph').append(title_2);
            $('#verbal_2_ph').append(verbal_2);
            $('#title_3_ph').append(title_3);
            $('#verbal_3_ph').append(verbal_3);
            $('#profileLogosrc').attr('src', logo_src);
        }
    });


    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {url: ref_service_url,
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $("#pk").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            $('#effect-2').empty();

            var i;
            if (data.length !== null) {
                for (i = 0; i < data.length; i++) {
                    var ref_image_url = "https://"
                            + window.location.hostname
                            + "/onyuz/standard/assets/img/sfClients/"
                            + data[i].firm_logo;
                    var referencesPHAppending =
                            "<li>"
                            + "<figure>"
                            + "<img src='"
                            + ref_image_url
                            + "' alt=''>"
                            + "<div class='img-hover'>"
                            + "<h4 style='font-size:10px'>"
                            + data[i].ref_name
                            + "</h4>"
                            + "</div>"
                            + "</figure>"
                            + "</li>";

                    $('#effect-2').append(referencesPHAppending);
                }
            }
        }
    });

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {url: soc_med_service_url,
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $("#pk").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);
            $('#social_media_ph').empty();
            
            var i;
            for (i = 0; i < data.length; i++) {
                var soc_appending =
                        "<li>"
                        + "<a id='"
                        + data[i].socialmedia
                        + "' href='"
                        + data[i].firm_link
                        +"' data-original-title='"
                        + data[i].socialmedia
                        +"' class='rounded-x social_"
                        + data[i].socialmedia
                        + "'></a></li>";
                
                $('#social_media_ph').append(soc_appending);
                
            }
        }
    });


});
