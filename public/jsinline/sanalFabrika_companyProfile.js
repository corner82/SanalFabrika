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
        data: {url: 'fillUsersFirmVerbalNpkGuest_infoFirmVerbal',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
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
        data: {url: '',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

        }
    });

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {url: 'fillCompanyInfoReferencesGuest_infoFirmProfile',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);

            $('#referencesPH').empty();

            var i;
            if (data.length !== null) {
                for (i = 0; i < data.length; i++) {
                    var referencesPHAppending =
                            "<li><i class='fa fa-check color-green'></i>"
                            + data[i].ref_name
                            + "</li>";

                    $('#referencesPH').append(referencesPHAppending);
                }
            }
        }
    });




});
