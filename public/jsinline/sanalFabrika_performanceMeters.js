$(document).ready(function () {
    window.i = 0;
    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#langCode').val());



    if ($('#pk').val()) {
        window.certificate_url = 'pkFillFirmCertificateNpk_infoFirmCertificate';
        window.nace = 'pkFillFirmWhatWorksForNace_infoFirmNace';
        window.sectors = 'pkFillFirmSectorNpk_infoFirmSectoral';
    } else {
        window.certificate_url = 'FillFirmCertificateNpkQuest_infoFirmCertificate';
        window.nace = 'fillFirmWhatWorksForNace_infoFirmNace';
        window.sectors = 'fillFirmSectorNpk_infoFirmSectoral';
    }

    $('#header_company_name').empty();
    $('#header_company_name').append("<i class='fa fa-user'></i>" + $('#selectedCompanyShN').val().toUpperCase());
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
        data: {url: 'fillCompanyInfoEmployeesGuest_infoFirmProfile',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);

//            var imageFolAddress = 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/';

//            window.logosrc = imageFolAddress + data[0].logo;

//            $('#profileLogosrc').attr('src', window.logosrc);

            var total_employees = data[0].number_of_employees;
            $('#number_of_employees').append(total_employees);
            document.getElementById('employee_per_bar').style.width = '100%';
            var number_of_engineers = data[0].number_of_engineer;
            $('#number_of_engineers').append(number_of_engineers);
            var engineer_percentage = (number_of_engineers / total_employees) * 100;
            $('#eng_per_bar').attr('aria-valuenow', engineer_percentage);
            document.getElementById('eng_per_bar').style.width = engineer_percentage + '%';
            var number_of_technicians = data[0].number_of_technician;
            $('#number_of_technicians').append(number_of_technicians);
            var technician_percentage = (number_of_technicians / total_employees) * 100;
            $('#tech_per_bar').attr('aria-valuenow', technician_percentage);
            document.getElementById('tech_per_bar').style.width = technician_percentage + '%';
            var number_of_for_trd_staff = data[0].number_of_foreign_trade_staff;
            $('#number_of_for_trd_staff').append(number_of_for_trd_staff);
            var for_trd_staff_percentage = (number_of_for_trd_staff / total_employees) * 100;
            $('#for_per_bar').attr('aria-valuenow', for_trd_staff_percentage);
            document.getElementById('for_per_bar').style.width = for_trd_staff_percentage + '%';
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
     * Get left counter calculations
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

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: window.certificate_url,
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            $("#qualityDetailsInsideDIV").empty();
            for (var i = 0; i < data.rows.length; i++) {
                var appending =
                        "<div class='row'>"
                        + "<div class='col-md-3'>"
                        + "<img class='img-responsive' src='https://" + window.location.hostname + data.rows[i].logo + "' alt=''>"
                        + "</div>"
                        + "<div class='col-md-9'>"
                        + data.rows[i].certificate_short
                        + "</div>"
                        + "</div>"
                        + "<hr>";
                $("#qualityDetailsInsideDIV").append(appending);
                window.testLoadImage_2.loadSpinner('removeLoadImage');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('error');
            console.error(textStatus);
        }
    });

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: window.nace,
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val(),
            language_code: $("#langCode").val()
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            $("#naceDetailsTable").empty();
            for (var i = 0; i < data.length; i++) {
                var appending =
                        "<tr>" +
                        "<td>" +
                        data[i].nace_code +
                        "</td>" +
                        "<td>" +
                        data[i].description +
                        "</td>" +
                        "</tr>";
                $("#naceDetailsTable").append(appending);
                window.testLoadImage_2.loadSpinner('removeLoadImage');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('error');
            console.error(textStatus);
        }
    });
    
    
    

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: window.sectors,
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val(),
            language_code: $("#langCode").val()
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            $("#sectorsDetailsTable").empty();
            for (var i = 0; i < data.rows.length; i++) {
                
                var appending =
                        "<tr>" +
                        "<td>" +
                        data.rows[i].sector_name +
                        "</td>" +                         
                        "</tr>";
                $("#sectorsDetailsTable").append(appending);
                window.testLoadImage_2.loadSpinner('removeLoadImage');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('error');
            console.error(textStatus);
        }
    });
});





