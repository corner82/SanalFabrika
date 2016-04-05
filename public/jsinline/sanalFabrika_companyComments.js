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

    var companyProfileLink = window.location.href.replace('companycommentsprofile', 'companyprofile');
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

    var companyPerformanceMetersProfileLink = window.location.href.replace('companycommentsprofile', 'companyperformancemetersprofile');
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
    var companyProductsProfileLink = window.location.href.replace('companycommentsprofile', 'companyproductsprofile');
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
     * Company machine Link
     */
    var companyProfileMTLink = window.location.href.replace('companycommentsprofile', 'companyprofilemt');
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
    var companyMembersProfileLink = window.location.href.replace('companycommentsprofile', 'companymembersprofile');
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
    var companyProjectsProfileLink = window.location.href.replace('companycommentsprofile', 'companyprojectsprofile');
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
    var companyCommentsProfileLink = window.location.href;
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
    var companyHistoryProfileLink = window.location.href.replace('companycommentsprofile', 'companyhistoryprofile');
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