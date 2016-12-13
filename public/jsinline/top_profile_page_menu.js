$(document).ready(function () {
       
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {url: 'pkFillUsersFirmVerbalNpk_infoFirmVerbal',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $('#pk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data.rows);
            if (data.rows) {
                 var settings_append = "<li><a id='setting_link_top_bar' href=''>" + window.lang.translate("Settings")+ "</a></li>";
                $('#topbar_menu_ul').prepend("<li class='topbar-devider'></li>");
                $('#topbar_menu_ul').prepend(settings_append);
                
            }
        }
    });    
    
                    
    
    
});


