$(document).ready(function () {

    if ($('#pk').val()) {
        var verbal_service_url = 'pkFillUsersFirmVerbalNpk_infoFirmVerbal';
    } else {
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
//            console.log(data.rows);
            if (data.rows) {
                var settings_append = "<li><a id='setting_link_top_bar' href=''>" + window.lang.translate("Settings") + "</a></li>";
                var userprofile_append = "<li><a id='userprofile_link_top_bar' href=''>" + window.lang.translate("User Profile") + "</a></li>";
                var companyprofile_append = "<li><a id='companyprofile_link_top_bar' href=''>" + window.lang.translate("Company Profile") + "</a></li>";
                
                $('#topbar_menu_ul').prepend("<li class='topbar-devider'></li>");
                $('#topbar_menu_ul').prepend(companyprofile_append);                
                $('#topbar_menu_ul').prepend("<li class='topbar-devider'></li>");
                $('#topbar_menu_ul').prepend(userprofile_append);
                $('#topbar_menu_ul').prepend("<li class='topbar-devider'></li>");
                $('#topbar_menu_ul').prepend(settings_append);
            }
        }
    });




});


