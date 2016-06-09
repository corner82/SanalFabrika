$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#langCode').val());
    $('#header_company_name').empty();
    $('#header_company_name').append("<i class='fa fa-user'></i>" + $('#selectedCompanyShN').val().toUpperCase());
    $('#loging_ph').empty();
    if ($('#pk').val()) {
        var loging_value = window.lang.translate('Log out');
    } else {
        var loging_value = window.lang.translate('Log in');
    }
    $('#loging_ph').append(loging_value);
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
            window.total_machines = parseFloat(0);
            $('#companymtprofile').attr('tot_mach_count', window.total_machines);
            for (i = 0; i < data.length; i++) {

                var appending =
                        "<li id='"
                        + data[i].machine_grup_id
                        + "' group_name='"
                        + data[i].group_name
                        + "' onclick=gotLink(this)>"
                        + "<span class='badge rounded badge-red'>"
                        + data[i].machine_count
                        + "</span>"
                        + "<a href='#' onmouseover='' style='cursor: pointer;'>"
                        + "<i class='fa fa-chevron-circle-right'>"
                        + "</i>"
                        + window.lang.translate(data[i].group_name)
                        + "</a>"
                        + "</li>";
                $('#collapse_mach_cats').append(appending);
                var appending2 =
                        "<div data-filter='."
                        + data[i].group_name
                        + "' class='cbp-filter-item'>"
                        + window.lang.translate(data[i].group_name)
                        + "</div> |";
                $('#filters-container').append(appending2);
                window.total_machines += parseFloat(data[i].machine_count);
            }

            /*
             * here total number of machines are populated
             * 
             * for getting number of cncs, unavailable and special machines machine attributes 
             * must be controled from service
             */

            $('#companymtprofile').attr('tot_mach_count', window.total_machines);
            $('#total_machs').empty();
            $('#total_machs').append(window.total_machines);
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

            var imageFolAddress = 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/';
            window.logosrc = imageFolAddress + data[0].logo;
            $('#profileLogosrc').attr('src', window.logosrc);
            $('#logoPlace1').attr('src', window.logosrc);
        }
    });
    $('#total_machs').append();
});
/*
 * 
 * here this function manages data table of machines on click event of company
 * machine tools sub menus
 * @author: Bahram
 * @Since: 2016.4.7
 */

function gotLink(clicked) {

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

    $('#tab_header').empty();
    $('#tab_header').append($('#' + clicked.id).attr('group_name'));
    $('#machines_table').bootstrapTable("destroy");
    $('#machines_table').bootstrapTable({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        queryParams: {
            url: 'pkFillUsersFirmMachinesNpk_infoFirmMachineTool',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $('#pk').val(),
            machine_grup_id: clicked.id
        },
        toolbar: '#toolbar',
//                data: data.rows,
//                total: data.rows.length,
        pagination: true,
        search: true,
        showRefresh: true,
        showToggle: true,
        showColumns: true,
//                detailView: true,
//                showPaginationSwitch: true,
        idField: "id",
        showFooter: false,
//                responseHandler:"responseHandler",
        pageList: '[10, 25, 50, 100, ALL]',
        undefinedText: '',
//                detailFormatter:
//                        function (index, row, element) {
//                            alert(row.id);
//                        },
        columns: [
            {
                field: 'id',
                title: window.lang.translate('Id'),
                sortable: true

            },
            {
                field: 'machine_id',
                title: window.lang.translate('Machine Id'),
                sortable: true
            },
            {
                field: 'machine_tool_names',
                title: window.lang.translate('Machine Name'),
                sortable: true
            },
            {
                field: 'manufacturer_name',
                title: window.lang.translate('Manufacturer Name'),
                sortable: true
            },
            {
                field: 'model',
                title: window.lang.translate('Model'),
                sortable: true
            },
            {
                field: 'model_year',
                title: window.lang.translate('Model Year'),
                sortable: true
            },
            {
                field: 'total',
                title: window.lang.translate('Number'),
                sortable: true
            },
            {
                field: 'picture',
                title: window.lang.translate('picture'),
                sortable: true,
                visibility: 'hidden',
                display: 'none'
            }]
    });
}

$('#machines_table').on('click-row.bs.table', function (e, row, $element) {

    if ($('#machine_details_DIV').css('display') === 'block') {

        if ($('#machine_details_DIV').attr('lastIndex') === row.machine_id) {

            $('#selected_machine_divider').css('visibility', 'hidden');
            $('#selected_machine_divider').css('display', 'none');

            $('#machine_details_DIV').css('visibility', 'hidden');
            $('#machine_details_DIV').css('display', 'none');

        } else {

            $('#machine_details_DIV').empty();
            $('#machine_details_DIV').attr('lastIndex', row.machine_id);

            $('#selectedMachineNamePH').empty();
            $('#selectedMachineNamePH').append(row.machine_tool_names);

            var appending =
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
                    + row.picture
                    + ">"
                    + "<img class='mach_sample' src="
                    + " https://" + window.location.hostname
                    + "/onyuz/standard/assets/img/sfClients/EMGE/"
                    + row.picture
                    + " alt=''>"
                    + "</a>"
                    + "</div>"
                    + "<div class='row'>"
                    + "<div class='panel panel-profile no-bg'>"
                    + "<div class='panel-heading overflow-h'>"
                    + "<h2 class='panel-title heading-sm pull-left'>"
                    + "<i class='fa fa-pencil'>"
                    + "</i>"
                    + row.manufacturer_name
                    + " "
                    + row.machine_tool_names
                    + " "
                    + window.lang.translate('detailed properties')
                    + "</h2>"
                    + "<a href='#'>"
                    + "<i class='fa fa-cog pull-right'></i>"
                    + "</a>"
                    + "</div>"
                    + "<div id='scrollbar' id='mach_det_prop' "
                    + "class='panel-body no-padding mCustomScrollbar' "
                    + "data-mcs-theme='minimal-dark'>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</div>";


            $('#machine_details_DIV').append(appending);

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                data: {
                    url: 'pkGetMachineProperities_sysMachineTools',
                    language_code: $("#langCode").val(),
//                    npk: $('#selectedCompanyNpk').val(),
                    pk: $('#pk').val(),
                    machine_id: row.machine_id
                },
                method: "GET",
                dataType: "json",
                success: function (data) {
                    window.colors = ["color-one", "color-two", "color-three", "color-four", "color-five", "color-six", "color-seven"];

                    for (var i = 0; i < data.length; i++) {
                        var picked_color = window.colors[Math.floor(Math.random() * window.colors.length)];

                        var appending2 =
                                "<div class='profile-post "
                                + picked_color
                                + "'>"
                                + "<span class='profile-post-numb' style='width:200px;font-size:12px'>"
                                + data[i].property_name
                                + "</span>"
                                + "<div class='profile-post-in'>"
                                + "<div class='col-md-6'>"
                                + "<h3 class='heading-xs'>"
                                + data[i].property_value
                                + "</h3>"
                                + "</div>"
                                + "<div class='col-md-6'>"
                                + "<h3 class='heading-xs'>"
                                + data[i].unitcode
                                + "</h3>"
                                + "</div>"
                                + "<p></p>"
                                + "</div>"
                                + "</div>";

                        $('#scrollbar').append(appending2);

                    }
                }
            });

            $('#machine_details_DIV').css('visibility', 'visible');
            $('#machine_details_DIV').css('display', 'block');

            if ($('#machine_details_DIV').css('visibility') === 'visible') {
                $('html, body').animate({
                    scrollTop: $("#machine_details_DIV").offset().top
                }, 1000);
            }
        }
    } else {

        $('#machine_details_DIV').empty();
        $('#machine_details_DIV').attr('lastIndex', row.machine_id);

        $('#selectedMachineNamePH').empty();
        $('#selectedMachineNamePH').append(row.machine_tool_names);

        $('#selected_machine_divider').css('visibility', 'visible');
        $('#selected_machine_divider').css('display', 'block');

        var appending =
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
                + row.picture
                + ">"
                + "<img class='mach_sample' src="
                + " https://" + window.location.hostname
                + "/onyuz/standard/assets/img/sfClients/EMGE/"
                + row.picture
                + " alt=''>"
                + "</a>"
                + "</div>"
                + "<div class='row'>"
                + "<div class='panel panel-profile no-bg'>"
                + "<div class='panel-heading overflow-h'>"
                + "<h2 class='panel-title heading-sm pull-left'>"
                + "<i class='fa fa-pencil'>"
                + "</i>"
                + row.manufacturer_name
                + " "
                + row.machine_tool_names
                + " "
                + window.lang.translate('detailed properties')
                + "</h2>"
                + "<a href='#'>"
                + "<i class='fa fa-cog pull-right'></i>"
                + "</a>"
                + "</div>"
                + "<div id='scrollbar' id='mach_det_prop' "
                + "class='panel-body no-padding mCustomScrollbar' "
                + "data-mcs-theme='minimal-dark'>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>"
                + "</div>";


        $('#machine_details_DIV').append(appending);

        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
            data: {
                url: 'pkGetMachineProperities_sysMachineTools',
                language_code: $("#langCode").val(),
//                    npk: $('#selectedCompanyNpk').val(),
                pk: $('#pk').val(),
                machine_id: row.machine_id
            },
            method: "GET",
            dataType: "json",
            success: function (data) {
                window.colors = ["color-one", "color-two", "color-three", "color-four", "color-five", "color-six", "color-seven"];

                for (var i = 0; i < data.length; i++) {
                    var picked_color = window.colors[Math.floor(Math.random() * window.colors.length)];

                    var appending2 =
                            "<div class='profile-post "
                            + picked_color
                            + "'>"
                            + "<span class='profile-post-numb' style='width:200px;font-size:12px'>"
                            + data[i].property_name
                            + "</span>"
                            + "<div class='profile-post-in'>"
                            + "<div class='col-md-6'>"
                            + "<h3 class='heading-xs'>"
                            + data[i].property_value
                            + "</h3>"
                            + "</div>"
                            + "<div class='col-md-6'>"
                            + "<h3 class='heading-xs'>"
                            + data[i].unitcode
                            + "</h3>"
                            + "</div>"
                            + "<p></p>"
                            + "</div>"
                            + "</div>";

                    $('#scrollbar').append(appending2);
                }
            }
        });

        $('#machine_details_DIV').css('visibility', 'visible');
        $('#machine_details_DIV').css('display', 'block');

        if ($('#machine_details_DIV').css('visibility') === 'visible') {
            $('html, body').animate({
                scrollTop: $("#machine_details_DIV").offset().top
            }, 1000);
        }

    }

//window.colors = ["color-one", "color-two", "color-three", "color-four", "color-five", "color-six", "color-seven"];
//var picked_color = window.colors[Math.floor(Math.random() * window.colors.length)];




});
//function gotLink(clicked_Id) {
//
//    window.target_machine_id = clicked_Id.id.toString().replace('_link', '');
//    window.machine_group_id = $(clicked_Id).attr('group_id');
//
//    $('#companymtprofile').addClass('.active');
//    if ($('#table_place_holder').css('visibility', 'hidden')) {
//        $('#table_place_holder').css('visibility', 'visible');
//        $('#table_place_holder').css('display', 'block');
//        $('#machine_details_DIV').empty();
//        $('#selectedMachineNamePH').empty();
//        $('#machine_details_DIV').css('visibility', 'hidden');
//        $('#machine_details_DIV').css('display', 'none');
//        $('#selected_machine_divider').css('visibility', 'hidden');
//        $('#selected_machine_divider').css('display', 'none');
//    }
//
//    $.ajax({
//        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
//        data: {
//            url: 'pkFillUsersFirmMachinesNpk_infoFirmMachineTool',
//            language_code: $("#langCode").val(),
//            npk: $('#selectedCompanyNpk').val(),
//            pk: $(pk).val(),
//            machine_grup_id: window.machine_group_id
//        },
//        method: "GET",
//        dataType: "json",
//        success: function (data) {
//
//            var dataSet = [];
//
//            var appending_list =
//                    "<div class='left-inner'>"
//                    + "<div class='row'>"
//                    + "<div id='"
//                    + window.target_machine_id
//                    + "'>"
//                    + "<table id='"
//                    + window.target_machine_id
//                    + "_table'"
//                    + " class='table table-hover table-striped table-condensed'"
//                    + " cellspacing='0' style='font-size: 12px'>"
//                    + " </table>"
//                    + " </div>"
//                    + " </div>"
//                    + " </div>";
//
//            $('#sel_mach_cat_list_div').empty();
//            $('#sel_mach_cat_list_div').append(appending_list);
//            $('#tab_header').empty();
//            var header = clicked_Id.id.toString().replace('_link', '');
//            header = header.replace('_machine', '');
//            header = header.replace('_', ' ');
//            $('#tab_header').append(header + ' ' + window.lang.translate("Machines List"));
//
//            for (var j = 0; j < data.rows.length; j++) {
//                dataSet.push(
//                        [
//                            data.rows[j].manufacturer_name,
//                            data.rows[j].machine_tool_names,
//                            data.rows[j].total,
//                            data.rows[j].model_year,
//                            data.rows[j].series
//                        ]);
//            }
//
//            $('#' + window.target_machine_id + "_table").DataTable({
//                data: dataSet,
//                fixedColumns: true,
//                scrollX: true,
//                select: {
//                    style: 'single'
//                },
//                columns: [
//                    {title: window.lang.translate("Manufacturer")},
//                    {title: window.lang.translate("Name")},
//                    {title: window.lang.translate("Number")},
//                    {title: window.lang.translate("Year")},
//                    {title: window.lang.translate("Series")}
//                ]
//            });
//
//
//            $('html, body').animate({
//                scrollTop: $("#sel_mach_cat_list_div").offset().top
//            }, 1000);
//
//            window.table = $('#' + window.target_machine_id + "_table").DataTable();
//            $('#' + window.target_machine_id + "_table" + ' tbody').on('click', 'tr', function () {
//                if ($(this).hasClass('selected')) {
//                    $(this).removeClass('selected');
//                }
//                else {
//                    window.table.$('tr.selected').removeClass('selected');
//                    $(this).addClass('selected');
//                }
//
//                var selectedRowIndex = $(this)[0]._DT_RowIndex;
////                console.log(selectedRowIndex);
////                console.log(data.rows[selectedRowIndex].picture);
////                this.style.color = '#72c02c';
//                var d = window.table.row(this).data();
//                /*
//                 * 
//                 * @type type
//                 * ajxa request to get product properties should be added here...
//                 * for now a properties array is created...
//                 */
//
//
//                var properties = [
//                    {key: 'Brand', value: d[0]},
//                    {key: 'Name', value: d[1]},
//                    {key: 'Number', value: d[2]},
//                    {key: 'Model', value: d[3]},
//                    {key: 'Series', value: d[4]}
//                ];
//
//                if ($('#machine_details_DIV').css('visibility') === 'hidden') {
//
//                    $('#machine_details_DIV').empty();
//                    $('#selectedMachineNamePH').empty();
//
//                    var appending =
//                            "<div class='funny-boxes funny-boxes-top-sea'>"
//                            + "<div class='row'>"
//                            + "<div class='left-inner'>"
//                            + "<div class='progression'>"
//                            + "<h3>"
//                            + window.lang.translate('Machine Details')
//                            + "</h3>"
//                            + "<div class='row'>"
//                            + "<a href="
//                            + "https://" + window.location.hostname
//                            + "/onyuz/standard/assets/img/sfClients/EMGE/"
//                            + data.rows[selectedRowIndex].picture
//                            + ">"
//                            + "<img class='mach_sample' src="
//                            + " https://" + window.location.hostname
//                            + "/onyuz/standard/assets/img/sfClients/EMGE/"
//                            + data.rows[selectedRowIndex].picture
//                            + " alt=''>"
//                            + "</a>"
//                            + "</div>"
//                            + "<div class='row'>"
//                            + "<div class='panel panel-profile no-bg'>"
//                            + "<div class='panel-heading overflow-h'>"
//                            + "<h2 class='panel-title heading-sm pull-left'>"
//                            + "<i class='fa fa-pencil'>"
//                            + "</i>"
//                            + d[0] + ' ' + d[1]
//                            + "</h2>"
//                            + "<a href='#'>"
//                            + "<i class='fa fa-cog pull-right'></i>"
//                            + "</a>"
//                            + "</div>"
//                            + "<div id='scrollbar' id='mach_det_prop' "
//                            + "class='panel-body no-padding mCustomScrollbar' "
//                            + "data-mcs-theme='minimal-dark'>"
//                            + "</div>"
//                            + "</div>"
//                            + "</div>"
//                            + "</div>"
//                            + "</div>";
//
////                    console.log(appending);
//
//                    $('#machine_details_DIV').append(appending);
//
//                    var appending2;
//                    window.colors = ["color-one", "color-two", "color-three", "color-four", "color-five", "color-six", "color-seven"];
//
//                    $.each(properties, function (key, value) {
//                        var picked_color = window.colors[Math.floor(Math.random() * window.colors.length)];
//
//                        appending2 =
//                                "<div class='profile-post "
//                                + picked_color
//                                + "'>"
//                                + "<span class='profile-post-numb' style='width:200px;font-size:12px'>"
//                                + properties[key].key
//                                + "</span>"
//                                + "<div class='profile-post-in'>"
//                                + "<h3 class='heading-xs'>"
//                                + properties[key].value
//                                + "</h3>"
//                                + "<p></p>"
//                                + "</div>"
//                                + "</div>";
//
//                        $('#scrollbar').append(appending2);
//                    });
//                    $('#selected_machine_divider').css('visibility', 'visible');
//                    $('#selected_machine_divider').css('display', 'block');
//                    $('#machine_details_DIV').css('visibility', 'visible');
//                    $('#machine_details_DIV').css('display', 'block');
//                    $('#machine_details_DIV').slideDown('slow');
//                    $('#machine_details_DIV').attr('lastIndex', selectedRowIndex);
//                } else {
//                    if ($('#machine_details_DIV').attr('lastIndex').toString() === selectedRowIndex.toString()) {
//
//                        $('#machine_details_DIV').attr('lastIndex', selectedRowIndex);
//                        $('#machine_details_DIV').slideUp('Slow');
//                        $('#machine_details_DIV').css('visibility', 'hidden');
//                        $('#machine_details_DIV').css('display', 'none');
//                        $('#selected_machine_divider').css('visibility', 'hidden');
//                        $('#selected_machine_divider').css('display', 'none');
//
//                    } else {
//
//                        $('#machine_details_DIV').attr('lastIndex', selectedRowIndex);
//                        $('#machine_details_DIV').slideUp('Slow');
//                        $('#machine_details_DIV').css('visibility', 'hidden');
//                        $('#machine_details_DIV').css('display', 'none');
//                        $('#machine_details_DIV').empty();
//                        $('#selected_machine_divider').css('visibility', 'hidden');
//                        $('#selected_machine_divider').css('display', 'none');
//                        $('#selectedMachineNamePH').empty();
//
//                        var appending =
//                                "<div class='funny-boxes funny-boxes-top-sea'>"
//                                + "<div class='row'>"
//                                + "<div class='left-inner'>"
//                                + "<div class='progression'>"
//                                + "<h3>"
//                                + window.lang.translate('Machine Details')
//                                + "</h3>"
//                                + "<div class='row'>"
//                                + "<a href="
//                                + "https://" + window.location.hostname
//                                + "/onyuz/standard/assets/img/sfClients/EMGE/"
//                                + data.rows[selectedRowIndex].picture
//                                + ">"
//                                + "<img class='mach_sample' src="
//                                + " https://" + window.location.hostname
//                                + "/onyuz/standard/assets/img/sfClients/EMGE/"
//                                + data.rows[selectedRowIndex].picture
//                                + " alt=''>"
//                                + "</a>"
//                                + "</div>"
//                                + "<div class='row'>"
//                                + "<div class='panel panel-profile no-bg'>"
//                                + "<div class='panel-heading overflow-h'>"
//                                + "<h2 class='panel-title heading-sm pull-left'>"
//                                + "<i class='fa fa-pencil'>"
//                                + "</i>"
//                                + d[0] + ' ' + d[1]
//                                + "</h2>"
//                                + "<a href='#'>"
//                                + "<i class='fa fa-cog pull-right'></i>"
//                                + "</a>"
//                                + "</div>"
//                                + "<div id='scrollbar' id='mach_det_prop' "
//                                + "class='panel-body no-padding mCustomScrollbar' "
//                                + "data-mcs-theme='minimal-dark'>"
//                                + "</div>"
//                                + "</div>"
//                                + "</div>"
//                                + "</div>"
//                                + "</div>";
//
//                        $('#machine_details_DIV').append(appending);
//
//                        var appending2;
//
//                        $.each(properties, function (key, value) {
//                            var picked_color = window.colors[Math.floor(Math.random() * window.colors.length)];
//                            appending2 =
//                                    "<div class='profile-post "
//                                    + picked_color
//                                    + "'>"
//                                    + "<span class='profile-post-numb' style='width:200px;font-size:12px'>"
//                                    + properties[key].key
//                                    + "</span>"
//                                    + "<div class='profile-post-in'>"
//                                    + "<h3 class='heading-xs'>"
//                                    + properties[key].value
//                                    + "</h3>"
//                                    + "<p></p>"
//                                    + "</div>"
//                                    + "</div>";
//
//                            $('#scrollbar').append(appending2);
//
//                        });
//                        $('#selectedMachineNamePH').append(d[0] + '- ' + d[1]);
//                        $('#selected_machine_divider').css('visibility', 'visible');
//                        $('#selected_machine_divider').css('display', 'block');
//                        $('#machine_details_DIV').css('visibility', 'visible');
//                        $('#machine_details_DIV').css('display', 'block');
//                        $('#machine_details_DIV').slideDown('slow');
//                    }
//                }
//
//                if ($('#machine_details_DIV').css('visibility') === 'visible') {
//                    $('html, body').animate({
//                        scrollTop: $("#machine_details_DIV").offset().top
//                    }, 1000);
//                }
//            });
//        }
//    });
//
//
//}





