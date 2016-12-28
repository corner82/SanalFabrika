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
    } else {
        $('#login_place').css('visibility', 'hidden');
        $('#login_place').css('display', 'none');
        $('#logout_place').css('visibility', 'visible');
        $('#logout_place').css('display', '');
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


    /**
     * Notification container load spinner
     * @author Mustafa Zeynel Dağlı
     * @since 23/12/2016
     */
    var nonAttachedTreeLoadImage = $("#notificationContainer").loadSpinner();
    nonAttachedTreeLoadImage.loadSpinner('appendImage');

    /**
     * notification widget 
     * @author Mustafa Zeynel Dağlı
     * @since 23/12/2016
     */
    window.notificationWidget = $('#notificationContainer').notifications({
        container: $('#notificationWidget')
    });
    window.notificationWidget.notifications({
        onServiceSuccess: function (event, data) {
            nonAttachedTreeLoadImage.loadSpinner('removeLoadImage');
        }
    });
    window.notificationWidget.notifications('getNotifications');


    window.testLoadImage = $("#bannerWidget").loadSpinner();
    window.testLoadImage.loadSpinner('appendImage');

    window.testLoadImage_2 = $("#bannerWidget_mt").loadSpinner();
    window.testLoadImage_2.loadSpinner('appendImage');

    /*
     * Get left counter calculations
     * visitors information
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: "getUsersLeftNotifications_ActUsersActionStatistics",
//            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {

            $('#visitor_total').empty();
            $('#visitor_last_six').empty();
            $('#visitor_last_twelve').empty();
            $('#total_sys_visitors').empty();
            $('#visitor_rate_number').empty();

            $('#visitor_bar').css('width', "0%");
            $('#visitor_bar').attr("aria-valuenow", "0");

            $('#visitor_total').append(data[0].allfirmnotificationscount);
            $('#visitor_last_six').append(data[0].lastsix);
            $('#visitor_last_twelve').append(data[0].lasttwelve);
            $('#total_sys_visitors').append(data[0].allnotificationscount);
            $('#visitor_rate_number').append(data[0].lasttwelvepercent + "%");

            $('#visitor_bar').css('width', data[0].lasttwelvepercent + "%");
            $('#visitor_bar').attr("aria-valuenow", data[0].lasttwelvepercent);

            window.testLoadImage.loadSpinner('removeLoadImage');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('error');
            console.error(textStatus);
        }
    });

    /*
     * Get right counter calculations
     * machine tools infomation
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: "getUsersRightNotifications_ActUsersActionStatistics",
//            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {

            $('#total_mt').empty();
            $('#add_mt_last_six').empty();
            $('#add_mt_last_twelve').empty();
            $('#add_mt_rate').empty();
            $('#total_sys_mt').empty();

            $('#add_mt_rate_bar').css('width', "0%");
            $('#add_mt_rate_bar').attr("aria-valuenow", "0");

            $('#total_mt').append(data[0].firmmachinetotal);
            $('#add_mt_last_six').append(data[0].lastsix);
            $('#add_mt_last_twelve').append(data[0].lasttwelve);
            $('#total_sys_mt').append(data[0].allfirmmachinetotal);
            $('#add_mt_rate').append(data[0].lasttwelvepercent + "%");

            $('#add_mt_rate_bar').css('width', data[0].lasttwelvepercent + "%");
            $('#add_mt_rate_bar').attr("aria-valuenow", data[0].lasttwelvepercent);

            window.testLoadImage_2.loadSpinner('removeLoadImage');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('error');
            console.error(textStatus);
        }
    });


    /*
     * Get company historical activities
     */
    window.testLoadImage_history = $("#history_place").loadSpinner();
    window.testLoadImage_history.loadSpinner('appendImage');

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: "getFirmHistoryV1_ActUsersActionStatistics",
            npk: $('#selectedCompanyNpk').val(),
            language_code: $("#langCode").val()
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if (data.length) {
                $('#history_place').empty();
                console.log(data);
                for (var i = 0; i < data.length; i++) {
//                    console.log(data[i].picture);
                    if (data[i].picture === "") {
                        var app_history_li =
                                "<li>"
                                + "<time class='cbp_tmtime' datetime=''>"
                                + "<span><small>"
                                + data[i].s_date
                                + "</span></small>"
                                + "<span style='font-size:14px'>"
                                + data[i].category
                                + "</span>"
                                + "</time>"
                                + "<i class='cbp_tmicon rounded-x hidden-xs'></i>"
                                + "<div class='cbp_tmlabel'>"
                                + "<h2>"
                                + data[i].operation_name
                                + "</h2>"
                                + "<div class='row'>"
//                            + "<div class='col-md-2'>"
//                            + "<img class='img-responsive' src='"
//                            + "https://" + window.location.hostname + picture_address
//                            + "' alt=''>"
//                            + "<div class='md-margin-bottom-20'></div>"
//                            + "</div>"
                                + "<div class='col-md-12'>"
                                + "<p>"
                                + data[i].description
                                + "</p>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</li>";
                    } else {
                        var app_history_li =
                                "<li>"
                                + "<time class='cbp_tmtime' datetime=''>"
                                + "<span><small>"
                                + data[i].s_date
                                + "</span></small>"
                                + "<span style='font-size:14px'>"
                                + data[i].category
                                + "</span>"
                                + "</time>"
                                + "<i class='cbp_tmicon rounded-x hidden-xs'></i>"
                                + "<div class='cbp_tmlabel'>"
                                + "<h2>"
                                + data[i].operation_name
                                + "</h2>"
                                + "<div class='row'>"
                                + "<div class='col-md-2'>"
                                + "<img"
                                + " class='img-responsive' src='"
                                + data[i].picture
                                + "' alt=''>"
                                + "<div class='md-margin-bottom-20'></div>"
                                + "</div>"
                                + "<div class='col-md-10'>"
                                + "<p>"
                                + data[i].description
                                + "</p>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</li>";
                    }
                    $('#history_place').append(app_history_li);
                }
            }
            window.testLoadImage_history.loadSpinner('removeLoadImage');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('error');
//            console.error(textStatus);
        }
    });




});