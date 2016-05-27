$(document).ready(function () {

    /*
     * multilanguage plugin 
     * @type Lang
     */

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#langCode').val());

    /*
     * Left menuyu olusturmak icin Ã§aÄŸÄ±rÄ±lan fonksiyon...
     */

    $.fn.leftMenuFunction();
    $('#communication_form').validationEngine({promptPosition: "topLeft:100%,0"});

    window.sel_count_id;
    window.sel_comp_count_id;
    window.cityList;
    window.boroughList;

    /*
     * Page consultant for box-header
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkGetFirmVerbalConsultant_infoFirmVerbal',
            language_code: $("#langCode").val(),
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

                var cons_image_url = "https://" + window.location.hostname + "/onyuz/standard/assets/img/sfClients/" + data[0].cons_picture;

                if (data[0].communications_no) {
                    var tel_number = data[0].communications_no;
                } else {
                    var tel_number = '';
                }

                $('#consultant_div').attr('data-balloon', 'Tel:' + tel_number);
                $('#consultant_div').attr('email_address', data[0].auth_email);
                $('#consultant_div').attr('page_consultant', data[0].name + " " + data[0].surname);
                $('#cons_image_ph').attr('src', cons_image_url);
                $('#cons_name_ph').empty();
                $('#cons_name_ph').append(data[0].name + " " +  data[0].surname);

            } else {
                console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"consultants" servis hatasÃ„Â±->' + textStatus);
        }
    });

    /*
     * form validation
     */

    $("#new_mt_details_form").validationEngine({promptPosition: "topLeft:100%,0"});

    /*
     * Bootstrap modals variables
     * @type @call;$@call;successMessage
     */

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Confirm')});



    /*
     * Get already registered addresses as Easyui Grid
     * 
     */

    $(function () {
        $('#reg_members_table').datagrid({
            title: window.lang.translate('List of Registered Addresses'),
            iconCls: 'icon-edit',
            width: '100%',
            height: 250,
            singleSelect: true,
            idField: 'itemid',
            url: '../../../../jsinline/datagrid_members_data.json',
            columns: [[
                    {field: 'itemid', title: 'Item ID', width: 100},
//                    {field: 'image', title: 'Image', width: 50, align: 'center', editor: 'text'},
                    {field: 'member_name', title: 'Name', width: 100, align: 'left', editor: {type: 'text', options: {precision: 1}}},
                    {field: 'position', title: 'Position', width: 100, align: 'left', editor: {type: 'text', options: {precision: 1}}},
                    {field: 'email_address', title: 'Email', width: 100, align: 'left', editor: 'text'},
                    {field: 'tel', title: 'Tel', width: 180, align: 'left', editor: 'text'},
                    {field: 'fax', title: 'Fax', width: 100, align: 'center', editor: 'text'},
                    {field: 'gsm', title: 'GSM', width: 100, align: 'center', editor: 'text'},
                    {field: 'action', title: 'Action', width: 80, align: 'center',
                        formatter: function (value, row, index) {
                            if (row.editing) {
                                var s = '<a href="javascript:void(0)" onclick="saverow(this)">' + window.lang.translate('Save') + '</a> ';
                                var c = '<a href="javascript:void(0)" onclick="cancelrow(this)">' + window.lang.translate('Cancel') + '</a>';
                                return s + c;
                            } else {
                                var e = '<a href="javascript:void(0)" onclick="editrow(this)">' + window.lang.translate('Edit') + '</a> ';
                                var d = '<a href="javascript:void(0)" onclick="deleterow(this)">' + window.lang.translate('Delete') + '</a>';
                                return e + d;
                            }
                        }
                    }
                ]],
            onEndEdit: function (index, row) {
                var ed = $(this).datagrid('getEditor', {
                    index: index,
                    field: 'productid'
                });
                row.productname = $(ed.target).combobox('getText');
            },
            onBeforeEdit: function (index, row) {
                row.editing = true;
                $(this).datagrid('refreshRow', index);
            },
            onAfterEdit: function (index, row) {
                row.editing = false;
                $(this).datagrid('refreshRow', index);
            },
            onCancelEdit: function (index, row) {
                row.editing = false;
                $(this).datagrid('refreshRow', index);
            }
        });
        $('#reg_members_table').datagrid('enableFilter');
    });



    /*
     * List of communication types combobox ajax
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'fillCommunicationsTypes_sysSpecificDefinitions',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            if (data.length !== 0) {
                $('#communicationTypes').ddslick({
                    data: data,
                    width: '100%',
                    background: false,
                    selectText: window.lang.translate("Select a Communication Type"),
                    imagePosition: "right",
                    onSelected: function (selectedData) {

                        $('#sel_comm_type').empty();
                        selectedCommunicationTypeId = selectedData.selectedData.value;

                        if (selectedCommunicationTypeId !== 0) {

                            var appending = "<label for='comm_type_"
                                    + selectedData.selectedData.value
                                    + "' style='margin-top: 20px'>"
                                    + selectedData.selectedData.text
                                    + "</label>"
                                    + "<div class='input-group'>"
                                    + "<div class='input-group-addon'>"
                                    + "<i class='icon-prepend fa fa-flag-o'></i>"
                                    + "</div>"
                                    + "<input type='text' class='form-control validate[custom[onlyNumberSp]]' name='comm_type_"
                                    + selectedData.selectedData.value
                                    + "' id='comm_type_"
                                    + selectedData.selectedData.value
                                    + "' placeholder='Enter number here please'>"
                                    + "<span class='input-group-btn'>"
                                    + "<button id='add_btn_"
                                    + selectedData.selectedData.value
                                    + "' sel_val='"
                                    + selectedData.selectedData.value
                                    + "' text_val='"
                                    + selectedData.selectedData.text
                                    + "' type='button' class='btn btn-info btn-flat' onclick='add_comm_num_func(this)'>"
                                    + window.lang.translate('Add')
                                    + "!</button>"
                                    + "</span>"
                                    + "</div>";

                            $('#sel_comm_type').append(appending);
                        }
                    }
                });
            } else {
                console.error('"fillCommunicationsTypes_sysSpecificDefinitions" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillCommunicationsTypes_sysSpecificDefinitions" servis hatasÄ±->' + textStatus);
        }
    });

});


var sm = $(window).successMessage();
var dm = $(window).dangerMessage();
var wm = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
    actionButtonLabel: window.lang.translate('Continue')});


/*
 * Easyui functions 
 */

function getRowIndex(target) {
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}
function editrow(target) {
    $('#reg_members_table').datagrid('beginEdit', getRowIndex(target));
}
function deleterow(target) {

    wcm.warningComplexMessage({onConfirm: function (event, data) {
            $('#reg_members_table').datagrid('deleteRow', getRowIndex(target));
        }
    });
    wcm.warningComplexMessage('show', window.lang.translate('Are you sure?'), window.lang.translate('Are You Sure?'));
}
function saverow(target) {
    $('#reg_members_table').datagrid('endEdit', getRowIndex(target));

    sm.successMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information saved successfully'));
}
function cancelrow(target) {
    $('#reg_members_table').datagrid('cancelEdit', getRowIndex(target));
}
function insert() {
    var row = $('#reg_members_table').datagrid('getSelected');
    if (row) {
        var index = $('#reg_members_table').datagrid('getRowIndex', row);
    } else {
        index = 0;
    }
    $('#reg_members_table').datagrid('insertRow', {
        index: index,
        row: {
            status: 'P'
        }
    });
    $('#reg_members_table').datagrid('selectRow', index);
    $('#reg_members_table').datagrid('beginEdit', index);
}

function add_comm_num_func(element) {

//    var isValid = !$('#' + element.id.replace('add_btn_', 'comm_type_')).validationEngine('validate');
    if ($('#' + element.id.replace('add_btn_', 'comm_type_')).val()!=='') {
        if (!$('#' + element.id.replace('add_btn_', 'comm_type_')).validationEngine('validate')) {
            var sel_comm_text = $('#' + element.id).attr('text_val');
            var sel_comm_val = $('#' + element.id).attr('sel_val');
            var input_value = $('#' + element.id.replace('add_btn_', 'comm_type_')).val();

            var appending =
                    "<div id='number_" + sel_comm_val + "_div' class='input-group margin'>"
                    + "<div class='input-group-btn'>"
                    + "<button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>"
                    + sel_comm_text
                    + "<span class='fa fa-caret-down'></span></button>"
                    + "<ul class='dropdown-menu'>"
                    + "<li id='number_" + sel_comm_val + "_div_delete' onclick='delete_number(this)'>" + window.lang.translate('Delete') + "</li>"
                    + "<li id='number_" + sel_comm_val + "_div_edit' onclick='edit_number(this)'>" + window.lang.translate('Edit') + "</li>"
                    + "<li class='divider'></li>"
                    + "<li disabled='disabled' id='number_" + sel_comm_val + "_div_save' onclick='save_number(this)'>" + window.lang.translate('Save') + "</li>"
                    + "</ul>"
                    + "</div>"
                    + "<!-- /btn-group -->"
                    + "<input id='number_" + sel_comm_val + "' name='number_" + sel_comm_val + "' type='text' class='form-control validate[custom[onlyNumberSp]]' disabled='disabled' value='" + input_value + "'>"
                    + "</div>";

            $('#added_comm_type').append(appending);
        }
    }



}

function delete_number(element) {
    $('#' + element.id.replace('_delete', '')).remove();

}

function edit_number(element) {

    $('#' + element.id.replace('_div_edit', '')).removeAttr('disabled');
    $('#' + element.id.replace('_edit', '_save')).removeAttr('disabled');
}

function save_number(element) {
    if (!$('#' + element.id.replace('_div_save', '')).validationEngine('validate')) {
        $('#' + element.id.replace('_div_save', '')).attr('disabled', 'disabled');
        $('#' + element.id).attr('disabled', 'disabled');
    }
}