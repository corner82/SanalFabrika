$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    console.log($('#selectedCompanyNpk').val());
    /*
     * Profile left menu links arrangement
     * @author: Bahram Lotfi
     * @Since: 2016.03.25     
     *
     * Start of left menu links
     */


    /*
     * Company profile Link
     */

    var companyProfileLink = window.location.href.replace('companyprofilemt', 'companyprofile');
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

    var companyPerformanceMetersProfileLink = window.location.href.replace('companyprofilemt', 'companyperformancemetersprofile');
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
    var companyProductsProfileLink = window.location.href.replace('companyprofilemt', 'companyproductsprofile');
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
    var companyProfileMTLink = window.location.href;
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
    var companyMembersProfileLink = window.location.href.replace('companyprofilemt', 'companymembersprofile');
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
    var companyProjectsProfileLink = window.location.href.replace('companyprofilemt', 'companyprojectsprofile');
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
    var companyCommentsProfileLink = window.location.href.replace('companyprofilemt', 'companycommentsprofile');
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
    var companyHistoryProfileLink = window.location.href.replace('companyprofilemt', 'companyhistoryprofile');
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
            window.logosrc = "../../../onyuz/standard/assets/img/sfClients/logos/" + data[0].logo;
            $('#profileLogosrc').attr('src', window.logosrc);
        }
    });
    /*
     * Company machine tools information
     */

    var machinesCNC = [
        ["Mazak", "VariAxis II", "1", "2000", "Yes"],
        ["Mazak", "INTEGREX j-200 (500U)", "1", "2000", "Yes"],
        ["EMCO", "TURN CNC with C axes", "1", "2000", "Yes"],
        ["YANG", "CNC Turning Lathe", "1", "2000", "Yes"],
        ["TSUGAMI", "CNC Automatic Lathe", "1", "2000", "Yes"]
    ];

    var machinesLathe = [
        ["METAL SUPER 2000", "Turning Lathe Universal", "1", "2000", "Yes"],
        ["TEZSAN TOS", "Turning Lathe Universal", "1", "2000", "Yes"],
        ["MEUSER", "Turning Lathe Universal", "1", "2000", "Yes"],
        ["ROVELVER 20", "Turning Lathe", "1", "2000", "Yes"],
        ["SCHAUBLIN ROVELVER", "102N Turning Lathe", "2", "2000", "Yes"],
        ["EMCO Mailer ", "maximat V13 Turning lathe", "1", "2000", "Yes"],
        ["BECHLER", "Automat Turning Lathe", "2", "2000", "Yes"],
        ["STROHM SLIDING", "Turning Lathe", "4", "No", "Yes"]
    ];

    var machinesMilling = [
        ["UMF RUHLA", "NC Mold Milling Machine", "1", "2000", "Yes"],
        ["TAKSAN", "Universal Milling Machine", "1", "2000", "Yes"]
    ];

    var machinesDrilling = [
        ["LUS-SAN", "Drilling Machine", "2", "2000", "Yes"],
        ["BILMAKSAN", "Drilling Machine", "1", "2000", "Yes"],
        ["TOS", "Drilling Machine", "1", "2000", "Yes"],
        ["MITAS", "Drilling Machine", "1", "2000", "Yes"],
        ["ACIERA", "Drilling and Tapping Machine", "1", "2000", "Yes"]
    ];

    var machinesGrinding = [
        ["BRANSON", "2000 Ultrasonic Welding Machine", "2", "2000", "Yes"],
        ["BRANSON", "900 Ultrasonic Welding Machine", "1", "2000", "Yes"],
        ["MAXWIDE", "Ultrasonic Welding Machine", "1", "2000", "Yes"]
    ];

    var machinesUSWelding = [
        ["BRANSON", "2000 Ultrasonic Welding Machine", "2", "2000", "Yes"],
        ["BRANSON", "900 Ultrasonic Welding Machine", "1", "2000", "Yes"],
        ["MAXWIDE", "Ultrasonic Welding Machine", "1", "2000", "Yes"]
    ];

    var machinesEDMs = [
        ["CHARMILE", "D20 EDM", "1", "2000", "Yes"],
        ["SODICK", "AG600 L CNC WIRE EDM", "1", "2000", "Yes"],
        ["SODICK", "AQ750LH CNC WIRE EDM", "1", "2000", "Yes"],
        ["OSCAR", "MAX CNC SINK EDM", "1", "2000", "2000", "Yes"]
    ];



    $('#cnc_machine_table').DataTable({
        data: machinesCNC,
        fixedColumns: true,
        scrollX: true,
        select: {
            style: 'single'
        },
        columns: [
            {title: window.lang.translate("Manufacturer")},
            {title: window.lang.translate("Series")},
            {title: window.lang.translate("Number")},
            {title: window.lang.translate("Model")},
            {title: window.lang.translate("Owner")}
        ]
    });
    
    window.table = $('#cnc_machine_table').DataTable();
    $('#cnc_machine_table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            window.table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }

        var selectedRowIndex = $(this)[0]._DT_RowIndex;
        this.style.color = '#72c02c';
        var d = window.table.row(this).data();
        /*
         * 
         * @type type
         * ajxa request to get product properties should be added here...
         * for now a properties array is created...
         */
        var properties = [
            {key: 'name', value: 'machine_name'},
            {key: 'code', value: 'machine_series'},
            {key: 'prop 1', value: 'machine_prop1'},
            {key: 'prop 2', value: 'machine_prop2'}
        ];

        if ($('#machine_details_DIV').css('visibility') === 'hidden') {

            $('#machine_details_DIV').empty();
            var appending = "<div class='left-inner'>"
                    + "<div class='progression'>"
                    + "<h3>"
                    + window.lang.translate('Machine Details')
                    + "</h3>"
                    + "<div class='row'>"
                    + "<a href="
                    + "https://www.bahram.sanalfabrika.com/onyuz/standard/assets/img/main/img12.jpg"
                    + ">"
                    + "<img class='mach_sample' src="
                    + "../../../onyuz/standard/assets/img/main/img12.jpg"
                    + " alt=''>"
                    + "</a>"
                    + "</div>"

                    + "<div class='row'>"
                    + "<table id=machinePropertiesTable "
                    + "class='table table-hover table-striped table-condensed' "
                    + "cellspacing='0' style='font-size: 12px'>"

                    + "<tr>"
                    + "<td>"
                    + d[0]
                    + "</td>"
                    + "<td>"
                    + d[1]
                    + "</td>"
                    + "</tr>"

                    + "</table>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "<hr>";
            $('#machine_details_DIV').append(appending);
            var appending2;
            $.each(properties, function (key, vlaue) {

                appending2 = "<tr>"
                        + "<td>"
                        + properties[key].key
                        + "</td>"
                        + "<td>"
                        + properties[key].value
                        + "</td>"
                        + "</tr>";
                $('#machinePropertiesTable').append(appending2);
            });
            $('#machine_details_DIV').css('visibility', 'visible');
            $('#machine_details_DIV').slideDown('slow');
            $('#machine_details_DIV').attr('lastIndex', selectedRowIndex);
        } else {
            if ($('#machine_details_DIV').attr('lastIndex').toString() === selectedRowIndex.toString()) {

                $('#machine_details_DIV').attr('lastIndex', selectedRowIndex);
                $('#machine_details_DIV').slideUp('Slow');
                $('#machine_details_DIV').css('visibility', 'hidden');
            } else {

                $('#machine_details_DIV').attr('lastIndex', selectedRowIndex);
                $('#machine_details_DIV').slideUp('Slow');
                $('#machine_details_DIV').css('visibility', 'hidden');
                $('#machine_details_DIV').empty();
                var appending = "<div class='left-inner'>"
                        + "<div class='progression'>"
                        + "<h3>"
                        + window.lang.translate('Product Details')
                        + "</h3>"
                        + "<div class='row'>"
                        + "<a href="
                        + "https://www.bahram.sanalfabrika.com/onyuz/standard/assets/img/main/img12.jpg"
                        + ">"
                        + "<img class='prod_sample' src="
                        + "../../../onyuz/standard/assets/img/main/img12.jpg"
                        + " alt=''>"
                        + "</a>"
                        + "</div>"

                        + "<table id=productPropertiesTable "
                        + "class='table table-hover table-striped table-condensed' "
                        + "cellspacing='0' style='font-size: 12px'>"

                        + "<tr>"
                        + "<td>"
                        + d[0]
                        + "</td>"
                        + "<td>"
                        + d[1]
                        + "</td>"
                        + "</tr>"

                        + "</table>"

                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "<hr>";
                $('#machine_details_DIV').append(appending);
                var appending2;
                $.each(properties, function (key, vlaue) {

                    appending2 = "<tr>"
                            + "<td>"
                            + properties[key].key
                            + "</td>"
                            + "<td>"
                            + properties[key].value
                            + "</td>"
                            + "</tr>";
                    $('#machinePropertiesTable').append(appending2);
                });
                $('#machine_details_DIV').css('visibility', 'visible');
                $('#machine_details_DIV').slideDown('slow');
            }
        }

        if ($('#machine_details_DIV').css('visibility') === 'visible') {
            $('html, body').animate({
                scrollTop: $("#machine_details_DIV").offset().top
            }, 1000);
        }

    });
});
