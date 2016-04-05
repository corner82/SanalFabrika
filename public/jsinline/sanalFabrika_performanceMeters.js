$(document).ready(function () {
    window.i = 0;

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    console.log($('#selectedCompanyNpk').val());

    /*
     * Start of left menu links
     ****************************
     * Company profile Link
     */

    var companyProfileLink = window.location.href.replace('companyperformancemetersprofile', 'companyprofile');
    var profilelink = "<a href='"
            + companyProfileLink
            + "'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.lang.translate('Company Profile')
            + "</a>";
    $('#companyprofilelink').empty();
    $('#companyprofilelink').append(profilelink);

    /*
     * Company performance meters Link
     */

    var companyPerformanceMetersProfileLink = window.location.href;
    var perfromancelink = "<a href='"
            + companyPerformanceMetersProfileLink
            + "'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.lang.translate('Performance Meters')
            + "</a>";
    $('#companyperformancemetersprofilelink').empty();
    $('#companyperformancemetersprofilelink').append(perfromancelink);

    /*
     * Company products Link
     */
    var companyProductsProfileLink = window.location.href.replace('companyperformancemetersprofile', 'companyproductsprofile');
    var productslink = "<a href='"
            + companyProductsProfileLink
            + "'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.lang.translate('Company Products')
            + "</a>";
    $('#companyproductsprofilelink').empty();
    $('#companyproductsprofilelink').append(productslink);

     /*
     * Company machine tools Link
     */
    var companyProfileMTLink = window.location.href.replace('companyperformancemetersprofile', 'companyprofilemt');
    var mtslink = "<a href='"
            + companyProfileMTLink
            + "'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.lang.translate('Company Machine Tools')
            + "</a>";
    $('#companyprofilemtlink').empty();
    $('#companyprofilemtlink').append(mtslink);
    
    /*
     * Company members Link
     */
    var companyMembersProfileLink = window.location.href.replace('companyperformancemetersprofile', 'companymembersprofile');
    var memberslink = "<a href='"
            + companyMembersProfileLink
            + "'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.lang.translate('Company Members')
            + "</a>";
    $('#companymembersprofilelink').empty();
    $('#companymembersprofilelink').append(memberslink);

    /*
     * Company projects Link
     */
    var companyProjectsProfileLink = window.location.href.replace('companyperformancemetersprofile', 'companyprojectsprofile');
    var projectslink = "<a href='"
            + companyProjectsProfileLink
            + "'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.lang.translate('Company Projects')
            + "</a>";
    $('#companyprojectsprofilelink').empty();
    $('#companyprojectsprofilelink').append(projectslink);

    /*
     * Company comments Link
     */
    var companyCommentsProfileLink = window.location.href.replace('companyperformancemetersprofile', 'companycommentsprofile');
    var commentslink = "<a href='"
            + companyCommentsProfileLink
            + "'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.lang.translate('Comments')
            + "</a>";
    $('#companycommentsprofilelink').empty();
    $('#companycommentsprofilelink').append(commentslink);

    /*
     * Company history Link
     */
    var companyHistoryProfileLink = window.location.href.replace('companyperformancemetersprofile', 'companyhistoryprofile');
    var historylink = "<a href='"
            + companyHistoryProfileLink
            + "'>"
            + "<i class='fa fa-bar-chart-o'>"
            + "</i>"
            + window.lang.translate('Company History')
            + "</a>";
    $('#companyhistoryprofilelink').empty();
    $('#companyhistoryprofilelink').append(historylink);

    /*
     * End of left menu links
     */


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
            console.log(data);
            var logosrc = "../../../onyuz/standard/assets/img/sfClients/logos/" + data[0].logo;
            $('#profileLogosrc').attr('src', logosrc);
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
});

function listOfCertificates() {

    console.log('Available Certificates');
    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {
        window.i++;
        $("#qualityDetailsInsideDIV").append('Certificates ' + i + ' , ');
        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }

}

function qualityHistory() {

    console.log('Qulaity History');
    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {
        window.i++;
        $("#qualityDetailsInsideDIV").append('history ' + i + ' , ');
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

        $("#customerDetailsInsideDIV").append();
        $("#customerDetailsDIV").addClass("active");
        $("#customerDetailsDIV").slideDown("slow");
    }

}