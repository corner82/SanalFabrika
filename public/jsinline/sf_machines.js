$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());



    $('#reg_address_table').datagrid({
        onDblClickRow: function (index, row) {
            $("#machine_details_table").empty();
            
            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
                data: {url: 'pkGetMachineProperities_sysMachineTools',
                    language_code: $('#langCode').val(),
                    pk: $('#pk').val(),
                    machine_id: row.id
                },
                method: "GET",
                dataType: "json",
                success: function (data) {
                    if (data.length > 0) {
                        console.log(data);
                        for (var i = 0; i < data.length; i++) {

                            var appending_prop =
                                    "<tr>"
                                    + "<td>"
                                    + data[i].property_name
                                    + "</td>"
                                    + "<td>"
                                    + data[i].property_value
                                    + "</td>"
                                    + "<td>"
                                    + data[i].unitcode
                                    + "</td>"
                                    + "</tr>";

                            $('#machine_details_table').append(appending_prop);
                        }


                        $('#table_row').css('visibility', 'visible');
                        $('#table_row').css('display', 'block');

                        if ($('#table_row').css('visibility') === 'visible') {
                            $('html, body').animate({
                                scrollTop: $("#machine_details_table").offset().top
                            }, 1000);
                        }
                    } else {
                        console.log('no data');
                    }

                },
                error: function (jqXHR, textStatus, errorThrown) {                     //console.log('error');
                    console.error(textStatus);
                }
            });

        },
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
        queryParams: {
            url: 'pkGetMachineTools_sysMachineTools',
            pk: $('#pk').val(),
            subject: 'datagrid'
                    /*machine_groups_id : null,
                     filterRules:null*/
        },
        width: '100%',
        singleSelect: true,
        pagination: true,
        collapsible: true,
        method: 'get',
        idField: 'firm_id',
        //toolbar:'#tb5',
        //fit:true,         //fitColumns : true,
        remoteFilter: true,
        remoteSort: true,
        multiSort: false,
        columns: [[
                {field: 'id', title: 'Id', width: 50},
                {field: 'machine_tool_name', title: 'Machine Name', width: 200},
                {field: 'manufacturer_name', title: 'Manufacturer', width: 150, align: 'center'},
                {field: 'group_name', title: 'Group', width: 150},
                {field: 'group_name_eng', title: 'Group', width: 150},
                {field: 'model_year', title: 'Year', width: 100, align: 'center',
                    formatter: function (value, row, index) {
                        return row.attributes.model_year;
                    }
                }
                //                {field: 'picture', title: 'Picture', width: 300, align: 'center',
                //                    formatter: function (value, row, index) {
//                        var image_address = row.attributes.picture;
//                        var image_place_holder = "<img style='height:20px' src='/onyuz/standard/assets/img/sfClients/" +image_address + "'></img>";
//                        return image_place_holder;
//                    }
//                }
            ]]
    });
    $('#reg_address_table').datagrid('enableFilter');
});

