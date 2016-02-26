$(document).ready(function () {

    /**
     * multilanguage plugin 
     * @type Lang
     */

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#langCode').val());

    // Left menuyu oluşturmak için çağırılan fonksiyon...

    $.fn.leftMenuFunction();

    /*
     * Variables
     */

    window.selectedRow;
    window.rowIndex;

    var tree = $('.tree2').machineTree();
    tree.machineTree('option', 'url', 'pkFillMachineToolGroups_sysMachineToolGroups');
    tree.machineTree('option', 'pk', $("#pk").val());
    tree.machineTree('option', 'language_code', $("#langCode").val());
//    tree.machineTree('option', 'profile_id', 97);
    tree.machineTree('setMainRoot');





    /**
     * machine tool tree
     * @author Mustafa Zeynel Dağlı
     * @since 12/02/2016
     */

    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {


//        alert('test');

        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            //$(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-cogs').removeClass('fa-spin');
        } else {
            children.show('fast');
            //$(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-spin').removeClass('fa-cogs');
        }
        e.stopPropagation();
    });



    /**
     * grid_confirm_registration easyui datagrid
     * user confirmation datagrid listing for confirmation
     * @author Mustafa Zeynel Dağlı
     * @since 10/02/2016
     */


    $('#grid_company_machines').datagrid({
        onDblClickRow: function (index, row) {
            selectedRow = $("#grid_company_machines").datagrid("getSelected");
            rowIndex = $("#grid_company_machines").datagrid("getRowIndex", selectedRow);
            gridMachineProperties(this);
            $('.nav-tabs a[href="#tab_mt_properties"]').tab('show');
//            alert('test');
        },
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        queryParams: {url: 'pkFillUsersFirmMachines_infoFirmMachineTool',
            pk: $('#pk').val(),
            language_code: $("#langCode").val()
        },
        //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
        width: '100%',
        singleSelect: true,
        pagination: true,
        collapsible: true,
        method: 'get',
        idField: 'id',
//        toolbar:'#tb5',
//        fit:true,
//        fitColumns: true,
        remoteFilter: true,
        remoteSort: true,
        multiSort: false,
        sortable: true,
        frozenColumns:
                [[
                        {field: 'machine_id', title: window.lang.translate('Machine ID'), sortable: true}

                    ]],
        columns:
                [[
                        {field: 'manufacturer_name', title: window.lang.translate('Machine Manufacturer'), sortable: true},
                        {field: 'machine_tool_names', title: window.lang.translate('Machine Name'), sortable: true},
                        {field: 'machine_tool_grup_names', title: window.lang.translate('Machine Category'), sortable: true},
                        {field: 'model', title: window.lang.translate('Machine Model'), sortable: true},
                        {field: 'model_year', title: window.lang.translate('Machine Production Year'), sortable: true}
                    ]]
    });
    /**
     * trying to get row index from easyui grid
     * @param {type} target
     * @returns integer
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */

    window.getRowIndex = function (target) {
        var tr = $(target).closest('tr.datagrid-row');
        return parseInt(tr.attr('datagrid-row-index'));
    };
    /**
     * 'grid_confirm_registration' easyui grid detail click function
     * @param {type} target
     * @returns {undefined}
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */

    window.gridMachineProperties = function (target) {
        console.log(selectedRow.machine_id);

        $("#mtGenPropsDynamicForm").alpaca("destroy");
        $("#mtGenPropsDynamicForm").empty();
        $("#mtSpecPropsDynamicForm").alpaca("destroy");
        $("#mtSpecPropsDynamicForm").empty();

        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'pkFillUsersFirmMachineProperties_infoFirmMachineTool',
                pk: $("#pk").val(),
                machine_id: selectedRow.machine_id
            },
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
//                console.log(data);
//                console.log(data.rows.length);  


                $("#mtGenPropsDynamicForm").alpaca({
                    "schema": {
                        "type": "object",
                        "properties": {
                            "manufacturer": {
                                "type": "text"
                            },
                            "name": {
                                "type": "text"
                            },
                            "model": {
                                "type": "text"
                            },
                            "type": {
                                "type": "text"
                            }
                        }
                    },
                    "options": {
                        "fields": {
                            "manufacturer": {
                                "label": window.lang.translate("Machine Manufacturer"),
                                "type": "text",
                                "readonly": true
                            },
                            "name": {
                                "label": window.lang.translate("Machine Name"),
                                "type": "text",
                                "disabled": true,
                            },
                            "model": {
                                "label": window.lang.translate("Machine Model"),
                                "type": "text",
                                "disabled": true
                            },
                            "type": {
                                "label": window.lang.translate("Machine Type"),
                                "type": "text",
                                "disabled": true
                            }
                        }
                    },
                    "data": {
                        "manufacturer": selectedRow.manufacturer_name,
                        "name": selectedRow.machine_tool_names,
                        "model": selectedRow.model_year,
                        "type": selectedRow.machine_tool_grup_names
                    },
                    "postRender": function () {
                        // at some point in the future, refresh this bad boy
                        var control = $("#mtGenPropsDynamicForm").alpaca("get");
                        control.refresh(function () {
                            // behold, i am the callback that is fired once the refresh completes
                        });
                    }
                });

                if (data.rows.length !== 0) {

                    for (var i = 0; i < data.rows.length; i++) {

                        var property_name = data.rows[i].property_names;
                        var property_value = data.rows[i].property_value;
                        var property_unit = data.rows[i].unitcodes;
                        var property_name_english = data.rows[i].property_name_eng;
                        /*
                         * Machine tools properties alpaca dynamic form
                         * @author:Bahram Lotfi Sadigh
                         * @Since: 2016.2.18
                         */
                        if (property_name !== null) {

                            $("#mtSpecPropsDynamicForm").alpaca({
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        property_name: {
                                            "type": "string"
                                        }
                                    }
                                },
                                "options": {
                                    "fields": {
                                        property_name: {
                                            "label": property_name,
                                            "type": "text",
                                            "helper": property_name_english,
                                            "disabled": true
                                        }
                                    }
                                },
                                "data": {
                                    property_name: property_value + '  ' + property_unit
                                }
                            });
                        } else {
                            $("#mtSpecPropsDynamicForm")
                                    .append("<div class='box-header'><h5>"
                                            + window.lang.translate('This machine properties are missing')
                                            + "</h5></div>");
                            $("#mtSpecPropsDynamicForm")
                                    .append("<div class='box-header'><h5>"
                                            + window.lang.translate('If you are interested to compelete machine information click edit button below')
                                            + "</h5></div>");
                            $("#mtSpecPropsDynamicForm")
                                    .append("<button class='btn btn-block btn-dark btn-sm' onclick='editMachineToolProps()'>"
                                            + window.lang.translate('Edit')
                                            + "</button>");
                        }
                    }

                    if ($('#tab_confirm_image_loader').loadImager() !== 'undefined') {
                        $('#tab_confirm_image_loader').loadImager('removeLoadImage');
                        $('#tab_confirm_container a[href="#tab_confirm"]').tab('show');
                    }
                } else {
                    console.log('error');
                    BootstrapDialog.alert({
                        title: 'DİKKAT!! Kullanıcı detayları belirlenememiştir',
                        message: 'Kullanıcı dateyları belirlenememiştir, lütfen başka kullanıcı seçiniz!!',
                        type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                        closable: true, // <-- Default value is false
                        draggable: true, // <-- Default value is false
                        buttonLabel: 'Tamam' // <-- Default value is 'OK',
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

                console.log('error');
                console.error(textStatus);
            }
        });
    };
    /**
     * Machine properties tab blocker
     * @author Bahram Lotfi
     * @since 25/02/2016
     */
    $('#machineToolsPropertiesTab').click(function (e) {
        if (!$('#tab_mt_properties').hasClass('active')) {
            BootstrapDialog.alert({
                title: window.lang.translate('Warning'),
                message: window.lang.translate('Please first select a machine tool from machine tools list'),
                description: window.lang.translate('Select a machine tool to view machine information details'),
                type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                closable: true, // <-- Default value is false
                draggable: true, // <-- Default value is false
                buttonLabel: 'OK' // <-- Default value is 'OK',
            });
            $('#tab_mt_properties_image_loader').loadImager();
            $('#tab_mt_properties_image_loader').loadImager('appendImage');
            //$('#tab_confirm_container a:first').tab('show');
        }
        e.preventDefault();
    });




});



function editMachineToolProps() {

    /*
     * machine tools property edit function comes here
     */

}

$(".tree2").on("click", "li.parent_li > span.badge.machine", function (event) {
    //alert('root action');
    console.log($(this));
    console.log($(this).attr('id'));
    console.log($(this)[0].id);
    console.log($(this)[0].innerText);
    
    console.log($(this)[0].machine);
});
