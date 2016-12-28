$(document).ready(function () {

    window.i = 0;

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());
    
    $('#header_company_name').empty();
    $('#header_company_name').append("<i class='fa fa-user'></i>" + $('#selectedCompanyShN').val().toUpperCase());

    
    /*
     * Checking pk value for login and logout actions
     */
    if (!$('#pk').val()) {
        $('#login_place').css('visibility', 'visible');
        $('#login_place').css('display', '');
        $('#logout_place').css('visibility', 'hidden');
        $('#logout_place').css('display', 'none');

        $('#setting_link').css('visibility', 'hidden');
        $('#setting_link_divider').css('visibility', 'hidden');
        $('#setting_link').css('display', 'none');
        $('#setting_link_divider').css('display', 'none');
        
    } else {
        $('#login_place').css('visibility', 'hidden');
        $('#login_place').css('display', 'none');
        $('#logout_place').css('visibility', 'visible');
        $('#logout_place').css('display', '');

        $('#setting_link').css('visibility', 'visible');
        $('#setting_link_divider').css('visibility', 'visible');
        $('#setting_link').css('display', '');
        $('#setting_link_divider').css('display', '');
        
    }
    
    

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {url: 'getFirmLogo_infoFirmProfile',
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            
            var imageFolAddress = 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/';
            window.logosrc = imageFolAddress + data.resultSet[0].logo;
            $('#profileLogosrc').attr('src', window.logosrc);
//            $('#logoPlace1').attr('src', window.logosrc);
        }
    });

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {
            url: 'pkFillGridSingularNpk_infoFirmUsers',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $('#pk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

//            console.log(data);

            $('#members_ph').empty();

            for (var i = 0; i < data.rows.length; i++) {

                var image_url =
                        "https://"
                        + window.location.hostname
                        + "/onyuz/standard/assets/img/sfClients/"
                        + data.rows[i].picture;

                var appending =
                        "<div class='col-sm-6 sm-margin-bottom-20' style='margin-bottom:20px'>"
                        + "<div class='profile-blog'>"
                        + "<img class='rounded-x' src='"
                        + image_url
                        + "' alt=''>"
                        + "<div class='name-location'>"
                        + "<strong>"
                        + data.rows[i].name + ' ' + data.rows[i].surname
                        + "</strong>"
                        + "<span><i class='fa fa-tag'></i>"
                        + window.lang.translate('Title') + ": " 
                        + window.lang.translate(data.rows[i].title)
                        + "</span>"
                        + "</div>"
                        + "<div class='clearfix margin-bottom-20'></div>"
                        + "<p>"
                        + window.lang.translate(data.rows[i].description)
                        + "</p>"
                        + "<hr>"
                        + "<ul class='list-inline team-social' id='" + data.rows[i].user_id + "_social_media_ph'>"
//                        + "<li><a data-placement='top' data-toggle='tooltip' class='fb tooltips' data-original-title='Facebook' href='#'><i class='fa fa-facebook'></i></a></li>"
//                        + "<li><a data-placement='top' data-toggle='tooltip' class='tw tooltips' data-original-title='Twitter' href='#'><i class='fa fa-twitter'></i></a></li>"
//                        + "<li><a data-placement='top' data-toggle='tooltip' class='gp tooltips' data-original-title='Google +' href='#'><i class='fa fa-google'></i></a></li>"
                        + "</ul>"
                        + "</div>"
                        + "</div>";

//                console.log(appending);
                $('#members_ph').append(appending);
            }

            social_media_call();

        }
    });


    
    window.notificationWidget = $('#notificationContainer').notifications({
        container : $('#notificationWidget')
    });
    window.notificationWidget.notifications({ 
        onServiceSuccess : function(event, data) {
            /*var elementData = data.element;
            var id = data.id;*/
            //window.deleteServicePrivilegeDialog(id, elementData);
            console.warn(data.element);
            console.warn(data.element.attr('attr-notification'));
            alert('onServiceSucess');
            
        }  
     });
    
    //window.notificationWidget.notifications('test');
    
    var nonAttachedTreeLoadImage = $("#notificationContainer").loadSpinner();
    nonAttachedTreeLoadImage.loadSpinner('appendImage');
    
    var testLoadImage = $("#bannerWidget").loadSpinner();
    testLoadImage.loadSpinner('appendImage');
    
    
    
});

function social_media_call() {
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {
            url: 'pkFillCompanyUsersSocialMediaNpk_infoUsersSocialmedia',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $('#pk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            for (var i = 0; i < data.rows.length; i++) {

                
                if(data.rows[i].socialmedia_name === 'googleplus'){
                    var social_media_name = 'google-plus';
                }else{
                    var social_media_name = data.rows[i].socialmedia_name;
                }

                $('#' + data.rows[i].user_id + '_social_media_ph').append(
                        "<li><a data-placement='top' data-toggle='tooltip' class='"
                        + data.rows[i].abbreviation
                        + " tooltips' data-original-title='"
                        + data.rows[i].socialmedia_name
                        + "' href='"
                        + data.rows[i].user_link
//                    + "'><i class='rounded-x social_" 
                        + "'><i class='fa fa-"
                        + social_media_name
                        + "'></i></a></li>");
            }

        }
    });
}
