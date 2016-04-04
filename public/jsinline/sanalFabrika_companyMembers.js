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

    var companyProfileLink = window.location.href.replace('companymembersprofile', 'companyprofile');
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

    var companyPerformanceMetersProfileLink = window.location.href.replace('companymembersprofile', 'companyperformancemetersprofile');
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
    var companyProductsProfileLink = window.location.href.replace('companymembersprofile', 'companyproductsprofile'); 
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
    var companyMembersProfileLink = window.location.href;
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
    var companyProjectsProfileLink = window.location.href.replace('companymembersprofile', 'companyprojectsprofile');
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
     * Company comments meters Link
     */
    var companyCommentsProfileLink = window.location.href.replace('companymembersprofile', 'companycommentsprofile');
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
     * Company history meters Link
     */
    var companyHistoryProfileLink = window.location.href.replace('companymembersprofile', 'companyhistoryprofile');
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
        data: {
            url: 'fillCompanyInfoEmployeesGuest_infoFirmProfile',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);
            var logosrc = "../../../onyuz/standard/assets/img/sfClients/logos/" + data[0].logo;
            $('#profileLogosrc').attr('src', logosrc);
            

        }
    });
});