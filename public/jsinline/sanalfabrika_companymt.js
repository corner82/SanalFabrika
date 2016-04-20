$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
//    console.log($('#selectedCompanyNpk').val());

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {
            url: 'pkFillFirmMachineGroupsCounts_infoFirmMachineTool',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $('#pk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            $('#collapse_mach_cats').empty();
            $('#filters-container').empty();
            $('#filters-container').append(
                    "<div data-filter='*' class='cbp-filter-item-active cbp-filter-item'>"
                    + window.lang.translate('All')
                    + "</div> |");
            var i;
            for (i = 0; i < data.length; i++) {

                var id_name = data[i].group_name.replace(/\s+/, "_") + "_machine_link";
                var appending =
                        "<li id='"
                        + id_name
                        + "' group_id="
                        + data[i].machine_grup_id
                        + " onclick=gotLink(this)>"
                        + "<span class='badge rounded badge-red'>"
                        + data[i].machine_count
                        + "</span>"
                        + "<a onmouseover='' style='cursor: pointer;'>"
                        + "<i class='fa fa-chevron-circle-right'>"
                        + "</i>"
                        + window.lang.translate(data[i].group_name)
                        + "</a>"
                        + "</li>";
                $('#collapse_mach_cats').append(appending);
                var appending2 =
                        "<div data-filter='."
                        + id_name
                        + "' class='cbp-filter-item'>"
                        + window.lang.translate(data[i].group_name)
                        + "</div> |";
                $('#filters-container').append(appending2);
                $.ajax({
                    url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                    //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                    data: {
                        url: '',
                        language_code: $("#langCode").val(),
                        npk: $('#selectedCompanyNpk').val(),
                        pk: $('#pk').val()
                    },
                    method: "GET",
                    dataType: "json",
                    success: function (data2) {

                    }
                });
            }
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

            var imageFolAddress = 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/Logos/';
            window.logosrc = imageFolAddress + data[0].logo;
            $('#profileLogosrc').attr('src', window.logosrc);
            $('#logoPlace1').attr('src', window.logosrc);
        }
    });
});
/*
 * 
 * here this function manages data table of machines on click event of company
 * machine tools sub menus
 * @author: Bahram
 * @Since: 2016.4.7
 */


function gotLink(clicked_Id) {

    window.target_machine_id = clicked_Id.id.toString().replace('_link', '');
    window.machine_group_id = $(clicked_Id).attr('group_id');

    $('#companymtprofile').addClass('.active');
    if ($('#table_place_holder').css('visibility', 'hidden')) {
        $('#table_place_holder').css('visibility', 'visible');
        $('#table_place_holder').css('display', 'block');
        $('#machine_details_DIV').empty();
        $('#selectedMachineNamePH').empty();
        $('#machine_details_DIV').css('visibility', 'hidden');
        $('#machine_details_DIV').css('display', 'none');
        $('#selected_machine_divider').css('visibility', 'hidden');
        $('#selected_machine_divider').css('display', 'none');
    }

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {
            url: 'pkFillUsersFirmMachinesNpk_infoFirmMachineTool',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $(pk).val(),
            machine_grup_id: window.machine_group_id
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var dataSet = [];

            var appending_list =
                    "<div class='left-inner'>"
                    + "<div class='row'>"
                    + "<div id='"
                    + window.target_machine_id
                    + "'>"
                    + "<table id='"
                    + window.target_machine_id
                    + "_table'"
                    + " class='table table-hover table-striped table-condensed'"
                    + " cellspacing='0' style='font-size: 12px'>"
                    + " </table>"
                    + " </div>"
                    + " </div>"
                    + " </div>";
            $('#sel_mach_cat_list_div').empty();
            $('#sel_mach_cat_list_div').append(appending_list);

            for (var j = 0; j < data.rows.length; j++) {
                dataSet.push(
                        [
                            data.rows[j].manufacturer_name,
                            data.rows[j].machine_tool_names,
                            data.rows[j].total,
                            data.rows[j].model_year,
                            data.rows[j].series
                        ]);
            }

            $('#' + window.target_machine_id + "_table").DataTable({
                data: dataSet,
                fixedColumns: true,
                scrollX: true,
                select: {
                    style: 'single'
                },
                columns: [
                    {title: window.lang.translate("Manufacturer")},
                    {title: window.lang.translate("Name")},
                    {title: window.lang.translate("Number")},
                    {title: window.lang.translate("Year")},
                    {title: window.lang.translate("Series")}
                ]
            });


            $('html, body').animate({
                scrollTop: $("#sel_mach_cat_list_div").offset().top
            }, 1000);

            window.table = $('#' + window.target_machine_id + "_table").DataTable();
            $('#' + window.target_machine_id + "_table" + ' tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    window.table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }

                var selectedRowIndex = $(this)[0]._DT_RowIndex;
                console.log(selectedRowIndex);
                console.log(data.rows[selectedRowIndex].picture);
//        this.style.color = '#72c02c';
                var d = window.table.row(this).data();
                /*
                 * 
                 * @type type
                 * ajxa request to get product properties should be added here...
                 * for now a properties array is created...
                 */


                var properties = [
                    {key: 'Brand', value: d[0]},
                    {key: 'Name', value: d[1]},
                    {key: 'Number', value: d[2]},
                    {key: 'Model', value: d[3]},
                    {key: 'Series', value: d[4]}
                ];
                if ($('#machine_details_DIV').css('visibility') === 'hidden') {

                    $('#machine_details_DIV').empty();
                    $('#selectedMachineNamePH').empty();
                    var appending =
//                    "<hr>"
                            "<div class='funny-boxes funny-boxes-top-sea'>"
                            + "<div class='row'>"
                            + "<div class='left-inner'>"
                            + "<div class='progression'>"
                            + "<h3>"
                            + window.lang.translate('Machine Details')
                            + "</h3>"
                            + "<div class='row'>"
                            + "<a href="
                            + "https://" + window.location.hostname
                            + "/onyuz/standard/assets/img/sfClients/EMGE/"
                            + data.rows[selectedRowIndex].picture
                            + ">"
                            + "<img class='mach_sample' src="
                            + "https://" + window.location.hostname
                            + "/onyuz/standard/assets/img/sfClients/EMGE/"
                            + data.rows[selectedRowIndex].picture
                            + " alt=''>"
                            + "</a>"
                            + "</div>"

                            + "<div class='row'>"
                            + "<table id='machinePropertiesTable' "
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
                            + "</div>";
                    $('#machine_details_DIV').append(appending);
                    $('#sel_mach_manuf').append(d[0]);
                    $('#sel_mach_series').append(d[1]);
                    $('#selectedMachineNamePH').append(d[0] + '- ' + d[1]);
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
                    $('#selected_machine_divider').css('visibility', 'visible');
                    $('#selected_machine_divider').css('display', 'block');
                    $('#machine_details_DIV').css('visibility', 'visible');
                    $('#machine_details_DIV').css('display', 'block');
                    $('#machine_details_DIV').slideDown('slow');
                    $('#machine_details_DIV').attr('lastIndex', selectedRowIndex);
                } else {
                    if ($('#machine_details_DIV').attr('lastIndex').toString() === selectedRowIndex.toString()) {

                        $('#machine_details_DIV').attr('lastIndex', selectedRowIndex);
                        $('#machine_details_DIV').slideUp('Slow');
                        $('#machine_details_DIV').css('visibility', 'hidden');
                        $('#machine_details_DIV').css('display', 'none');
                        $('#selected_machine_divider').css('visibility', 'hidden');
                        $('#selected_machine_divider').css('display', 'none');
                    } else {

                        $('#machine_details_DIV').attr('lastIndex', selectedRowIndex);
                        $('#machine_details_DIV').slideUp('Slow');
                        $('#machine_details_DIV').css('visibility', 'hidden');
                        $('#machine_details_DIV').css('display', 'none');
                        $('#machine_details_DIV').empty();
                        $('#selected_machine_divider').css('visibility', 'hidden');
                        $('#selected_machine_divider').css('display', 'none');
                        $('#selectedMachineNamePH').empty();
                        var appending =
//                        "<hr>"
                                "<div class='funny-boxes funny-boxes-top-sea'>"
                                + "<div class='row'>"
                                + "<div class='left-inner'>"
                                + "<div class='progression'>"
                                + "<h3>"
                                + window.lang.translate('Machine Details')
                                + "</h3>"
                                + "<div class='row'>"
                                + "<a href="
                                + "https://" + window.location.hostname
                                + "/onyuz/standard/assets/img/sfClients/EMGE/"
                                + data.rows[selectedRowIndex].picture
                                + ">"
                                + "<img class='mach_sample' src="
                                + " https://" + window.location.hostname
                                + "/onyuz/standard/assets/img/sfClients/EMGE/"
                                + data.rows[selectedRowIndex].picture
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
                                + "</div>";
                        $('#machine_details_DIV').append(appending);
                        var appending2;
                        $.each(properties, function (key, value) {

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
                        $('#selectedMachineNamePH').append(d[0] + '- ' + d[1]);
                        $('#selected_machine_divider').css('visibility', 'visible');
                        $('#selected_machine_divider').css('display', 'block');
                        $('#machine_details_DIV').css('visibility', 'visible');
                        $('#machine_details_DIV').css('display', 'block');
                        $('#machine_details_DIV').slideDown('slow');
                    }
                }

                if ($('#machine_details_DIV').css('visibility') === 'visible') {
                    $('html, body').animate({
                        scrollTop: $("#machine_details_DIV").offset().top
                    }, 1000);
                }
            });
        }
    });


}

function getCategoryImages() {
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

            var j;
            for (j = 0; j < data.length; j++) {

//                var appending = 

            }

        }
    });
}





