$(document).ready(function () {
    window.i = 0;

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());
//    console.log($('#selectedCompanyNpk').val());

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



});

function listOfCertificates() {

//    console.log('Available Certificates');
    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {

        var currentPath = window.location.hostname;

        console.log(currentPath);

        var appending =
                "<hr>"
                + "<div class='col-xs-3'>"
                + "<img style='width:100px; height: 100px' "
                + "src= 'https://" + window.location.hostname + "/onyuz/standard/assets/img/sfClients/Images/Certificates/ISO_9001.jpg'"
                + "alt=''>"
                + "</div>"
                + "<div class='col-xs-9'>"
                + "<header>"
                + "<h3>"
                + window.lang.translate('ISO 9001')
                + "</h3>"
                + "</header>"
                + "<div>"
                + "<p>"
                + window.lang.translate('EMGE has ISO 9001 Quality Standard')
                + "</p>"
                + "</div>"
                + "</div>"
                + "<hr>";

        $("#qualityDetailsInsideDIV").append(appending);
        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }
}

function qualityHistory() {

//    console.log('Qulaity History');
    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {
        window.i++;
//        $("#qualityDetailsInsideDIV").append('history ' + i + ' , ');
        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }
}



function qualityPerformances() {

    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {

        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }

}


function performanceDetails() {

    if ($("#pastPerformanceDetailsDIV").hasClass('active')) {
        $("#pastPerformanceDetailsDIV").removeClass('active');
        $("#pastPerformanceDetailsDIV").slideUp('Slow');
        $("#pastPerformanceDetailsInsideDIV").empty();
    } else {

        $("#pastPerformanceDetailsDIV").addClass("active");
        $("#pastPerformanceDetailsDIV").slideDown("slow");
    }

}

function customerDetails() {

    if ($("#customerDetailsDIV").hasClass('active')) {
        $("#customerDetailsDIV").removeClass('active');
        $("#customerDetailsDIV").slideUp('Slow');
        $("#customerDetailsInsideDIV").empty();

    } else {

//        $("#customerDetailsInsideDIV").append();
        $("#customerDetailsDIV").addClass("active");
        $("#customerDetailsDIV").slideDown("slow");
    }

}