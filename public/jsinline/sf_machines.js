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
            $('#machine_name').empty();
            $('#machine_image_ph').attr('href', '');
            $('#machine_image_ph').attr('title', '');
            $('#machine_image_ph_src').attr('src', '');


            $('#machine_name').append(row.machine_tool_name);
            if (row.attributes.picture !== "") {
                $('#machine_image_ph').css('visibility', 'visible');
                $('#machine_image_ph').css('display', '');
                $('#machine_image_ph').attr('href', "/onyuz/standard/assets/img/sfClients/" + row.attributes.picture);
                $('#machine_image_ph').attr('title', row.machine_tool_name);
                $('#machine_image_ph_src').attr('src', "/onyuz/standard/assets/img/sfClients/" + row.attributes.picture);
            }else{
                $('#machine_image_ph').css('visibility', 'hidden');
                $('#machine_image_ph').css('display', 'none');                
            }
            $('#mach_props_table').datagrid({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
                queryParams: {
                    url: 'pkGetMachineProperities_sysMachineTools',
                    pk: $('#pk').val(),
                    subject: 'datagrid',
                    machine_id: row.id
                            /*machine_groups_id : null,
                             filterRules:null*/
                },
                width: 'auto',
                singleSelect: true,
                pagination: false,
                collapsible: true,
                method: 'get',
                idField: 'id',
                //toolbar:'#tb5',
//                fit:true,         
//                fitColumns : true,
                remoteFilter: true,
                remoteSort: true,
                multiSort: false,
                columns: [[
                        {field: 'property_name', title: 'Property Name', width: 300},
                        {field: 'property_value', title: 'Property Value', width: 200, align: 'center'},
                        {field: 'unitcode', title: 'Unit', width: 160, align: 'center'}
                    ]]
            });

            $('#props_table_div').css('visibility', 'visible');
            $('#props_table_div').css('display', '');
            if ($('#props_table_div').css('visibility') === 'visible') {
                $('html, body').animate({
                    scrollTop: $("#props_table_div").offset().top
                }, 1000);                
            }
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
        width: 'auto',
        singleSelect: true,
        pagination: true,
        collapsible: true,
        method: 'get',
        idField: 'id',
        //toolbar:'#tb5',
        //fit:true,         //fitColumns : true,
        remoteFilter: true,
        remoteSort: true,
        multiSort: false,
        columns: [[
                {field: 'id', title: 'Id', width: 50},
                {field: 'machine_tool_name', title: 'Machine Name', width: 200},
                {field: 'manufacturer_name', title: 'Manufacturer', width: 190, align: 'center'},
                {field: 'group_name', title: 'Group', width: 150},
                {field: 'group_name_eng', title: 'Group (English)', width: 150},
                {field: 'model_year', title: 'Year', width: 100, align: 'center',
                    formatter: function (value, row, index) {
                        return row.attributes.model_year;
                    }
                }
            ]]

    });

    $('#reg_address_table').datagrid('enableFilter');



});

