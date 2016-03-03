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
    // Left menuyu oluÅŸturmak iÃ§in Ã§aÄŸÄ±rÄ±lan fonksiyon...

    $.fn.leftMenuFunction();
    /*
     * Variables
     */

    window.selectedRow;
    window.rowIndex;


    /* 
     * Validation binder
     * 
     */

    $("#proposedMTForm").validationEngine({promptPosition: "topLeft:100%,0"});

    /*
     * List of countries combobox ajax
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syscountrys',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
                $('#machineTypeDropDown').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select related manufacturing category from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                        selectedCategoryId = selectedData.selectedData.value;
                    }
                });
            } else {
                console.error('servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(' servis hatasÄ±->' + textStatus);
        }
    });


    var tree = $('.tree2').machineTree();
    tree.machineTree('option', 'url', 'pkFillMachineToolGroups_sysMachineToolGroups');
    tree.machineTree('option', 'pk', $("#pk").val());
    tree.machineTree('option', 'language_code', $("#langCode").val());
//    tree.machineTree('option', 'profile_id', 97);
    tree.machineTree('setMainRoot');

    tree.machineTree({
        getMachineProp: function (event, tree, node) {
//            console.log(tree.options.url);
//            console.log(node.attr('id'));

            tree.options.alpacaFormCreator = $('#selectedMTInformation').machinePropertyFormCreater();
            tree.options.alpacaFormCreator.machinePropertyFormCreater('option', 'machineID', node.attr('id'));
            tree.options.alpacaFormCreator.machinePropertyFormCreater('option', 'url', 'pkFillMachineToolGroupsMachineProperties_sysMachineToolGroups');
            tree.options.alpacaFormCreator.machinePropertyFormCreater('setMachinePropertyForm');
        }
    });

    tree.machineTree({
        getMachineGenProp: function (event, tree, node) {
//            console.log(tree.options.url);
//            console.log(node.attr('id'));

            $('#addMTtoCompany').loadImager();
            $('#addMTtoCompany').loadImager('appendImage');

            $('#selectedMTGenInformation').alpaca("destroy");
            $('#selectedMTGenInformation').empty();

            $('#selectedMTHeader').empty();
            $('#selectedMTHeader').append(node.attr('text'));

//            tree.options.alpacaFormCreator = $('#selectedMTGenInformation').machinePropertyFormCreater();
//            var machineID = tree.options.alpacaFormCreator.machinePropertyFormCreater('option', 'machineID', node.attr('id'));
//            var url = tree.options.alpacaFormCreator.machineGeneralInfoFormCreater('option', 'url', 'pkFillUsersFirmMachines_infoFirmMachineTool');
//            tree.options.alpacaFormCreator.machineGeneralInfoFormCreater('setMachineGeneralInfoForm');

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    url: 'pkFillUsersFirmMachines_infoFirmMachineTool',
                    pk: $("#pk").val(),
                    machine_id: node.attr('id')
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {


                    $('#addMTtoCompany').loadImager('removeLoadImage');
                    $('#addMTtoCompany').removeClass('hidden');

                    if (data.rows.length !== 0) {

                        $('html, body').animate({
                            scrollTop: $("#addMTtoCompany").offset().top
                        }, 1000);

                        $('#selectedMTGenInformation').alpaca({
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
                                "manufacturer": data.rows[0].manufacturer_name,
                                "name": data.rows[0].machine_tool_names,
                                "model": data.rows[0].model_year,
                                "type": data.rows[0].machine_tool_grup_names
                            }
                        });

                        $('#selectedMTHeader').empty();
                        $('#selectedMTHeader').append(data.rows[0].machine_tool_names);

                    } else {
                        BootstrapDialog.show({
                            title: window.lang.translate('No data is available for this machine tool'),
                            message: window.lang.translate('Required information for this machine are missing'),
                            type: BootstrapDialog.TYPE_WARNING,
//                        closable: false
                        });

                        $("#selectedMTGenInformation").empty();
                        $("#selectedMTInformation").empty();
                        $("#addMTtoCompany").addClass('hidden');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    console.error(textStatus);

                    BootstrapDialog.show({
                        title: window.lang.translate('No data is available for this machine tool'),
                        message: window.lang.translate('An error occured during processing machine information'),
                        type: BootstrapDialog.TYPE_WARNING,
//                        closable: false
                    });
                }
            });
        }
    });

    /**
     * machine tool tree
     * @author Mustafa Zeynel DaÄŸlÄ±
     * @since 12/02/2016
     */

    $('.tree2 li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');

    $('.tree2 li.parent_li > span').on('click', function (e) {

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
     * @author Mustafa Zeynel DaÄŸlÄ±
     * @since 10/02/2016
     */


    $('#grid_company_machines').datagrid({
        onDblClickRow: function (index, row) {
            selectedRow = $("#grid_company_machines").datagrid("getSelected");
            rowIndex = $("#grid_company_machines").datagrid("getRowIndex", selectedRow);
            $('#selectedMTInformationHeader').empty();
            $('#selectedMTInformationHeader').prepend(selectedRow.machine_tool_names + window.lang.translate(' properties'));
            gridMachineProperties(this);

//            $('.nav-tabs a[href="#tab_mt_properties"]').tab('show');
//            alert('test');
        },
        onBeforeLoad: function () {
            $('#companyMachinesGridBox').loadImager();
            $('#companyMachinesGridBox').loadImager('appendImage');
        },
        onLoadSuccess: function () {
            $('#companyMachinesGridBox').loadImager('removeLoadImage');
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
     * @author Mustafa Zeynel DaÄŸlÄ±
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
     * @author Mustafa Zeynel DaÄŸlÄ±
     * @since 09/02/2016
     */

    window.gridMachineProperties = function (target) {
//        console.log(selectedRow.machine_id);
        $("#mtGenPropsDynamicForm").alpaca("destroy");
        $("#mtGenPropsDynamicForm").empty();

        $("#mtSpecPropsDynamicForm").alpaca("destroy");
        $("#mtSpecPropsDynamicForm").empty();

        $('#selectedMTInformationRow').removeClass('hidden');

        $('html, body').animate({
            scrollTop: $("#selectedMTInformationBox").offset().top
        }, 1000);

        $('#selectedMTInformationBox').loadImager();
        $('#selectedMTInformationBox').loadImager('appendImage');

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
                $('#selectedMTInformationBox').loadImager('removeLoadImage');
                ;
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

    $('#proposedMTPropertiesFormBilder').formBuilder();

});
//End of ready function....


function editMachineToolProps() {

    /*
     * machine tools property edit function comes here
     */

}

function addMTtoCompany() {

    $("#selectedMTGenInformation").empty();
    $("#selectedMTInformation").empty();
    $("#addMTtoCompany").addClass('hidden');

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkInsert_infoFirmMachineTool',
            pk: $("#pk").val(),
            language_code: $('#langCode').val(),
            profile_public: 0,
            availability_id: 0,
            machine_id: $(this)[0].id
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            if (data['errorInfo'][0] === '00000') {
                BootstrapDialog.show({
                    title: window.lang.translate('Submission Process'),
                    message: window.lang.translate('Congratulations! New machine tool added successfuly to your company inventory. \n\
Please note that new machine registration is not finished yet. \n\
            Assigned system consultant will immediately analyze inventory chnages. \n\
            You will be informed about assessment results as soon as possible.\n\ '),
                    type: BootstrapDialog.TYPE_SUCCESS,
//                            closable: false
                    buttons: [{
                            label: 'OK',
                            cssClass: 'btn-success btn-sm',
                            action: function (dialogItself) {
                                dialogItself.close();
                            }
                        }]
                });
            } else if (data['errorInfo'] === '23502') {
                BootstrapDialog.show({
                    title: window.lang.translate('Submission Process'),
                    message: window.lang.translate('This machine is already registered in your company inventory. There is no need to add it again.'),
                    type: BootstrapDialog.TYPE_WARNING,
//                            closable: false
                    buttons: [{
                            label: 'OK',
                            cssClass: 'btn-warning btn-sm',
                            action: function (dialogItself) {
                                dialogItself.close();
                            }
                        }]
                });
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.log('error');
            console.error(textStatus);
        }
    });

}


function scrollDown(url) {
    $('html, body').animate({
        scrollTop: url.offset().top
    }, 1000);
}






