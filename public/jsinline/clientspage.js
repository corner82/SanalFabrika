$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());

//    console.log($('#pk').val());
    $('#loging_ph').empty();

    if ($('#pk').val()) {
        var list_service_url = 'pkFillCompanyLists_infoFirmProfile';
        var loging_value = window.lang.translate('Log out');
    } else {
        var list_service_url = 'fillCompanyListsGuest_infoFirmProfile';
        var loging_value = window.lang.translate('Log in');
    }
    $('#loging_ph').append(loging_value);


    $("#pagination_content").empty();
//    console.log('reloaded');
    //    $("#pagination_content").html("Page " + num); // or some ajax content loading...
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {
            url: list_service_url,
            pk: $('#pk').val(),
            language_code: $("#langCode").val(),
            page: 1,
            rows: 10,
            sort: null,
            order: null
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);
            var i;
            // @companyperpage = 10 company will be shown per page
            window.companyperpage = 10;
            var numberofpages = ~~(data.total / window.companyperpage);
            var remainingcompanynumber = data.total % window.companyperpage;
            window.totalnumberofpages;
            if (remainingcompanynumber > 0) {
                window.totalnumberofpages = numberofpages + 1;
            } else {
                window.totalnumberofpages = numberofpages;
            }
            for (i = 0; i < window.companyperpage; i++) {
                $('#selectedCompanyNpk').val(data.rows[i].npk);
                var rep_firm_short_name = data.rows[i].firm_name_short.toString().replace(" ", "-");
                $('#selectedCompanyShN').val(rep_firm_short_name);  
                var companyProfileLink = window.location.href.replace(/clientspage/, "companyprofile/" + $('#selectedCompanyShN').val() + "/" + $('#selectedCompanyNpk').val());

                var appending_html =
                        "<!-- Clients Block-->"
//                        + "<a href='#'>"
                        + "<div class='row clients-page' style='border-bottom: solid 5px #eee;'  >"
                        + "<div class = 'col-md-2'  style='box-shadow: 0 0 30px #7c8082;'>"
                        + "<img src='/onyuz/standard/assets/img/sfClients/"
                        + data.rows[i].logo
                        + "' "
                        + "class = 'img-responsive hover-effect' alt = '' / >"
                        + "</div>"
                        + "<div class = 'col-md-10' id='"
                        + data.rows[i].npk
                        + "'>"
                        + "<a href='"
                        + companyProfileLink
                        + "'>"
                        + "<h3>"
                        + data.rows[i].firm_names  
                        + "</h3>"
                        + "</a>"
                        + "<p>"
                        + data.rows[i].fim_description
                        + "</p>"
                        + "<ul class = 'list-inline'>"
                        + "<li>"
                        + "<i class = 'fa fa-map-marker color-green' style='padding-right:5px;'></i>"
                        + data.rows[i].country_names
                        + "</li>"
                        + "<li><i class = 'fa fa-globe color-green' style='padding-right:5px;'></i>"
                        + data.rows[i].web_address
                        + "</li>"
                        + "<li>"
                        + "<i class = 'fa fa-mail-forward color-green' style='padding-right:5px;'> </i>"
                        + data.rows[i].email
                        + "</li>"
                        + "<li>"
                        + "<i class = 'fa fa-microphone color-green' style='padding-right:5px;'> </i>"
                        + data.rows[i].tel
                        + "</li>"
                        + "<li>"
                        + "<i class = 'fa fa-fax color-green' style='padding-right:5px;'> </i>"
                        + data.rows[i].fax
                        + "</li>"
                        + "<li>"
                        + "<i class = 'fa fa-asterisk color-green' style='padding-right:5px;'> </i>"
                        + data.rows[i].total_machines
                        + "</li>"
                        + "<li>"
                        + "<i class = 'fa fa-sitemap color-green' style='padding-right:5px;'> </i>"
                        + data.rows[i].firm_sectoral  
                        + "</li>"
                        + "</ul>"
                        + "</div>"
//                                    + "</div>"
//                                    + "</a>"
                        + "<!-- End Clinets Block --> ";
//                            console.log(appending_html);
                var newappend = $(appending_html);
                $(newappend).appendTo($("#pagination_content"));

            }
            $("html, body").animate({scrollTop: $(".header").offset().top}, "slow");
            event.preventDefault();

            $('#paginationBar').paginator();
            $('#paginationBar').paginator('option', 'total', window.totalnumberofpages);
            $('#paginationBar').paginator('option', 'maxVisible', 5);
            $('#paginationBar').paginator('paginate');
        },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"fillAddressTypes_sysSpecificDefinitions" servis hatasÄ±->' + textStatus);
    }
    });
    
});

