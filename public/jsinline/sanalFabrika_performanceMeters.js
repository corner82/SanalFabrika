$(document).ready(function () {
    window.i = 0;
    
    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    

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
     * Company products meters Link
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
     * Company members meters Link
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
     * Company projects meters Link
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
     * Company projects meters Link
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
     * Company projects meters Link
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
//            console.log(data);
            var logosrc = "../../../onyuz/standard/assets/img/sfClients/" + data[0].logo;
            $('#profileLogosrc').attr('src', logosrc);



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