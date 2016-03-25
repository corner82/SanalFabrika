$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    /*
     * Profile left menu links arrangement
     * @author: Bahram Lotfi
     * @Since: 2016.03.25
     */


  
    /*
     * Start of left menu links
     */
    

    /*
     * Company profile Link
     */

    var companyProfileLink = window.location.href;
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

    var companyPerformanceMetersProfileLink = window.location.href.replace('companyprofile', 'companyperformancemetersprofile');
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
    var companyProductsProfileLink = window.location.href.replace('companyprofile', 'companyproductsprofile');
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
    var companyMembersProfileLink = window.location.href.replace('companyprofile', 'companymembersprofile');
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
    var companyProjectsProfileLink = window.location.href.replace('companyprofile', 'companyprojectsprofile');
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
    var companyCommentsProfileLink = window.location.href.replace('companyprofile', 'companycommentsprofile');
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
    var companyHistoryProfileLink = window.location.href.replace('companyprofile', 'companyhistoryprofile');
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
            $('#header_company_name').empty();
            $('#header_company_name').append(data[0].firm_name_short);
            var companyAddressPHAppending =
                    "<h2>Company Information</h2>"
                    + "<p style='text-align: center'>"
                    + "<a href='"
                    + data[0].web_address
                    + "'><h5>"
                    + data[0].web_address
                    + "</h5></a>"
                    + "<h5>"
                    + data[0].address
                    + "</h5>"
                    + "</p>";
            $('#companyAddressPH').empty();
            $('#companyAddressPH').prepend(companyAddressPHAppending);

            var logosrc = "../../../onyuz/standard/assets/img/sfClients/" + data[0].logo;

            $('#logosrc').attr('src', logosrc);
            $('#logoName').empty();
            $('#logoName').append(data[0].firm_names);

            $('#companyInfoPH').empty();
            $('#companyInfoPH').append(data[0].country_names + "<br/>");
            $('#companyInfoPH').append(window.lang.translate("Total number of employees") + ": ");
            $('#companyInfoPH').append(data[0].number_of_employees + "<br/>");
            $('#companyInfoPH').append(window.lang.translate('Engineers') + ": ");
            $('#companyInfoPH').append(data[0].number_of_engineer + "<br/>");
            $('#companyInfoPH').append(window.lang.translate('Adiminstrative staff') + ": ");
            $('#companyInfoPH').append(data[0].number_of_administrative_staff + "<br/>");
            $('#companyInfoPH').append(window.lang.translate('Foreign trade staff') + ": ");
            $('#companyInfoPH').append(data[0].number_of_foreign_trade_staff + "<br/>");
            $('#companyInfoPH').append(window.lang.translate('Sales staff') + ": ");
            $('#companyInfoPH').append(data[0].number_of_sales_staff + "<br/>");
            $('#companyInfoPH').append(window.lang.translate('Technicians') + ": ");
            $('#companyInfoPH').append(data[0].number_of_technician + "<br/>");
            $('#companyInfoPH').append(window.lang.translate('Workers') + ": ");
            $('#companyInfoPH').append(data[0].number_of_worker);

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                data: {url: 'fillCompanyInfoSocialediaGuest_infoFirmProfile',
                    language_code: $("#langCode").val(),
                    npk: $('#selectedCompanyNpk').val()
                },
                method: "GET",
                dataType: "json",
                success: function (data2) {

                    $('#socialMediaHP').empty();

                    var i;
                    if (data2.length !== null) {
                        for (i = 0; i < data2.length; i++) {
                            var socialMediaHPAppending =
                                    "<li><a class='social_"
                                    + data2[i].socialmedia
                                    + " data-original-title='"
                                    + data2[i].socialmedia
                                    + "' href='"
                                    + data2[i].firm_link
                                    + "'></a></li>";

                            $('#socialMediaHP').append(socialMediaHPAppending);
                        }
                    }
                }
            });

            $('#briefDescPH').empty();
            $('#briefDescPH').append(data[0].descriptions);

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                data: {url: 'fillCompanyInfoReferencesGuest_infoFirmProfile',
                    language_code: $("#langCode").val(),
                    npk: $('#selectedCompanyNpk').val()
                },
                method: "GET",
                dataType: "json",
                success: function (data3) {

                    $('#referencesPH').empty();

                    var i;
                    if (data3.length !== null) {
                        for (i = 0; i < data3.length; i++) {
                            var referencesPHAppending =
                                    "<li><i class='fa fa-check color-green'></i>"
                                    + data3[i].ref_name
                                    + "</li>";

                            $('#referencesPH').append(referencesPHAppending);
                        }
                    }
                }
            });

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                data: {url: 'fillCompanyInfoCustomersGuest_infoFirmProfile',
                    language_code: $("#langCode").val(),
                    npk: $('#selectedCompanyNpk').val()
                },
                method: "GET",
                dataType: "json",
                success: function (data4) {

                    $('#customersPH').empty();

                    var i;
                    if (data4.length !== null) {
                        for (i = 0; i < data4.length; i++) {
                            var referencesPHAppending =
                                    "<li><i class='fa fa-check color-green'></i>"
                                    + data4[i].customer_names
                                    + "</li>";

                            $('#customersPH').append(referencesPHAppending);
                        }
                    }
                }
            });
        }
    });
});
