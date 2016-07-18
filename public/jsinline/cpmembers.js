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
                $('#cons_name_ph').append(data[0].name + " " + data[0].surname);

            } else {
                console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"consultants" servis hatasÃ„Â±->' + textStatus);
        }
    });
    
    /*
     * Sex types
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'fillSexTypes_sysSpecificDefinitions',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

//                console.log(data);
                $('#psex').ddslick('destroy');
                $('#psex').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a category from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
//                            console.log(selectedData.selectedData.description);
//                            console.log(selectedData.selectedData.value);
                    }
                });
            } else {
                console.error('sex types servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('sex types servis hatasÃ„Â±->' + textStatus);
        }
    });

    /*
    * Countries
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
                $('#member_university_country_ph').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a country from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {

                    }
                });
            } else {
                console.error('"fillComboBox_syscountrys" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_syscountrys" servis hatasÄ±->' + textStatus);
        }
    });

    /*
     * Universities
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkFillUniversityDdList_sysUniversities',
            language_code: $("#langCode").val(),
            component_type: 'ddslick',
            pk: $('#pk').val(),
            country_id: 91
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

//                console.log(data);
                $('#member_university_ph').ddslick('destroy');
                $('#member_university_ph').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a university from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
//                            console.log(selectedData.selectedData.description);
//                            console.log(selectedData.selectedData.value);
                    }
                });
            } else {
                console.error('list of universities servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('list of universities servis hatasÃ„Â±->' + textStatus);
        }
    });








    /*
     * form validation
     */
    $("#personel_gen_info").validationEngine();

    /*
     * Bootstrap modals variables
     * @type @call;$@call;successMessage
     */

//    var sm = $(window).successMessage();
//    var dm = $(window).dangerMessage();
//    var wm = $(window).warningMessage();
//    var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
//        actionButtonLabel: window.lang.translate('Confirm')});




    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Confirm')});

    /*
     * Get already registered addresses as Easyui Grid 
     */
    $('#reg_members_table').datagrid({
        onDblClickRow: function (index, row) {

        },
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url: 'pkFillPrivilegesList_sysAclPrivilege',
            sort: 'id',
            order: 'desc'
                    /*machine_groups_id : null,
                     filterRules:null*/
        },
        width: '100%',
        singleSelect: true,
        pagination: true,
        collapsible: true,
        method: 'get',
        idField: 'id',
        //fit:true,
        //fitColumns : true,
        remoteFilter: true,
        remoteSort: true,
        multiSort: false,
        columns:
                [[
                        {field: 'id', title: 'ID', sortable: true, width: 30},
                        {field: 'title', title: 'Title', sortable: true, width: 80},
                        {field: 'name', title: 'Name', sortable: true, width: 150},
                        {field: 'last_name', title: 'Last Name', sortable: true, width: 150},
                        {field: 'position', title: 'Position', sortable: true, width: 150},
                        {field: 'sex', title: 'Sex', sortable: true, width: 80},
                        {field: 'actions', title: 'Actions', width: 80, align: 'center',
                            formatter: function (value, row, index) {
                                if (row.attributes.active == 0) {
                                    var e = '<button style="padding : 2px 4px;" title="MakePassive"  class="btn btn-primary" type="button" onclick="return activePassivePersonnelWrapper(event, ' + row.id + ');"><i class="fa fa-minus-circle"></i></button>';
                                } else {
                                    var e = '<button style="padding : 2px 4px;" title="Make Active"  class="btn btn-warning" type="button" onclick="return activePassivePersonnelWrapper(event, ' + row.id + ');"><i class="fa fa-plus-circle"></i></button>';
                                }
                                var d = '<button style="padding : 2px 4px;" title="Delete"  class="btn btn-danger" type="button" onclick="return deletePersonnelUltimatelyDialog(' + row.id + ', ' + index + ');"><i class="fa fa-eraser"></i></button>';
                                var u = '<button style="padding : 2px 4px;" title="Edit"  class="btn btn-info" type="button" onclick="return updatePersonnelDialog(' + row.id + ', { name : \'' + row.name + '\',\n\                                                                                                                   \n\
                                                                                                                                                                       description : \'' + row.description + '\',\n\
                                                                                                                                                                       resource_id : ' + row.resource_id + ',\n\
                                                                                                                                                                       resource_name : \'' + row.resource_name + '\',\n\
                                                                                                                                                                       name_eng : \'' + row.name_eng + '\'} );"><i class="fa fa-arrow-circle-up"></i></button>';
                                return e + d + u;
                            }
                        }
                    ]]
    });
    $('#reg_members_table').datagrid('enableFilter');


    window.activePassivePersonnelWrapper = function (e, id) {
        e.preventDefault();
        var id = id;
        var domElement = e.target;
        wcm.warningComplexMessage({onConfirm: function (event, data) {
                activePassivePersonnel(id, domElement);
            }
        });
        wcm.warningComplexMessage('show', window.lang.translate('You are going to activate/passivate your company personel!'),
                window.lang.translate('You are going to activate/passivate your company personel!'));
        return false;
    };

    /**
     * active or passive ACL privilege
     * @returns {undefined}
     * @author Mustafa Zeynel Dağlı
     * @since 14/07/2016
     */
    window.activePassivePersonnel = function (id, domElement) {
        var loader = $("#loading-image-grid-container").loadImager();
        loader.loadImager('appendImage');
        var id = id;
        //console.log(domElement);

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'pkUpdateMakeActiveOrPassive_sysAclPrivilege',
                id: id,
                pk: $("#pk").val()
            }
        });
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', window.lang.translate('Unsuccessful activate/passivate action!'),
                        window.lang.translate('Please contact system administrator!'));
                console.error('"pkUpdateMakeActiveOrPassive_sysAclPrivilege" servis hatası->' + textStatus);
            },
            onSuccess: function (event, data) {
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', window.lang.translate('Successful activate/passivate action!'),
                        window.lang.translate('Personnel activate/passivate action done successfully!'),
                        data);
                if ($(domElement).hasClass("fa-minus-circle")) {
                    $(domElement).removeClass("fa-minus-circle");
                    $(domElement).addClass("fa-plus-circle");

                    $(domElement).parent().removeClass("btn-primary");
                    $(domElement).parent().addClass("btn-warning");
                } else if ($(domElement).hasClass("fa-plus-circle")) {
                    $(domElement).removeClass("fa-plus-circle");
                    $(domElement).addClass("fa-minus-circle");

                    $(domElement).parent().removeClass("btn-warning");
                    $(domElement).parent().addClass("btn-primary");
                }


            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', window.lang.translate('Unsuccessful activate/passivate action!'),
                        window.lang.translate('Please contact system administrator!'));
                console.error('"pkUpdateMakeActiveOrPassive_sysAclPrivilege" servis datası boştur!!');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', window.lang.translate('Unsuccessful activate/passivate action!'),
                        window.lang.translate('Please contact system administrator!'));
            },
            onError23503: function (event, data) {
            },
            onError23505: function (event, data) {
            }
        });
        aj.ajaxCall('call');
    };

    /**
     * wrapper class for pop up and delete ACL privilege ultimately
     * @param {integer} nodeID
     * @returns {null}
     * @author Mustafa Zeynel Dağlı
     * @since 14/07/2016
     */
    window.deletePersonnelUltimatelyDialog = function (id, index) {
        var id = id;
        var index = index;
        wcm.warningComplexMessage({onConfirm: function (event, data) {
                deletePersonnelUltimately(id, index);
            }
        });
        wcm.warningComplexMessage('show', window.lang.translate('You are going to remove your company personel!'),
                window.lang.translate('You are going to remove your company personel! You will be unable to undo this action'));
    };

    /**
     * delete ACL privilege
     * @param {type} id
     * @param {type} element
     * @param {type} machine_group_id
     * @returns {undefined}
     * @since 14/07/2016
     */
    window.deletePersonnelUltimately = function (id, index) {
        var loaderGridBlock = $("#loading-image-grid-container").loadImager();
        loaderGridBlock.loadImager('appendImage');

        var id = id;
        var index = index;
        var ajDeleteAll = $(window).ajaxCall({
            proxy: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'pkDelete_sysAclPrivilege',
                id: id,
                pk: $("#pk").val()
            }
        });
        ajDeleteAll.ajaxCall({
            onError: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', window.lang.translate('Unsuccessful personnel remove action!'),
                        window.lang.translate('Unsuccessful personnel remove action! Please contact system administrator'));
                console.error('"personel silme servisi" servis hatası->' + data.errorInfo);
            },
            onSuccess: function (event, data) {
                sm.successMessage({
                    onShown: function () {
                        //console.warn(index);
                        loaderGridBlock.loadImager('removeLoadImage');

                        /*var node = $('#tt_tree_menu2').tree('find', id);
                         $('#tt_tree_menu2').tree('remove', node.target);*/

                        $('#tt_grid_dynamic').datagrid('reload');
                        //$('#tt_grid_dynamic').datagrid('deleteRow', index);
                    }
                });
                sm.successMessage('show', window.lang.translate('Successful personnel remove action!'),
                        window.lang.translate('Successful personnel remove action!'));
            }
        });
        ajDeleteAll.ajaxCall('call');
    };


    /**
     * wrapper for ACL privilege update process
     * @param {type} nodeID
     * @param {type} nodeName
     * @returns {Boolean}
     * @author Mustafa Zeynel Dağlı
     * @since 14/07/2016
     */
    window.updatePersonnelDialog = function (id, row) {
        window.gridReloadController = false;
        //console.log(row);
        BootstrapDialog.show({
            title: '"' + row.name + '"' +  window.lang.translate('You are going to update personnel information'),            
            message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $('<div class="box box-solid">'+
                                    '<div class="box-header with-border">'+
                                        '<h3 class="box-title">Collapsible Accordion</h3>'+
                                    '</div>'+
                                    '<!-- /.box-header -->'+
                                    '<div class="box-body">'+
                                        '<div class="box-group" id="accordion">'+
                                            '<!-- we are adding the .panel class so bootstrap.js collapse plugin detects it -->'+
                                            '<div class="panel box box-primary">'+
                                                '<div class="box-header with-border">'+
                                                    '<h4 class="box-title">'+
                                                        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" class="">'+
                                                            window.lang.translate('General Information')+
                                                        '</a>'+
                                                   '</h4>'+
                                                '</div>'+
                                                '<div id="collapseOne" class="panel-collapse collapse in" aria-expanded="true">'+
                                                    '<div class="box-body">'+
                                                        '<form id="personel_gen_info_edit">'+
                                                            '<label for="ptitle" style="margin-top: 20px">'+ 
                                                                window.lang.translate("Title") +
                                                            '</label>'+
                                                            '<div class="input-group">'     +                       
                                                                '<div class="input-group-addon">' +                                      
                                                                    '<i class="icon-prepend fa fa-flag-o"></i>'+
                                                                '</div>'+
                                                                '<input type="text" class="form-control validate[required, maxSize[30]]" '+
                                                                       'id="ptitle_edit" placeholder="Enter title here please">'+
                                                            '</div>'+
                                                            '<label for="ptitle_edit_eng" style="margin-top: 20px">'+
                                                                window.lang.translate("Title (English)") +
                                                            '</label>'+
                                                            '<div class="input-group"> '               +            
                                                                '<div class="input-group-addon">'       +                                 
                                                                    '<i class="icon-prepend fa fa-flag-o"></i>'+
                                                                '</div>'+
                                                                '<input type="text" class="form-control validate[required, maxSize[30]]"' +
                                                                       'id="ptitle_edit_eng" placeholder="Enter title in English here please">'+
                                                            '</div>'+
                                                            '<label for="pname_edit" style="margin-top: 20px">'+
                                                                window.lang.translate("First Name")+
                                                            '</label>'+
                                                            '<div class="input-group">'+
                                                                '<div class="input-group-addon">'  +                                    
                                                                    '<i class="icon-prepend fa fa-flag-o"></i>'+
                                                                '</div>'+
                                                                '<input type="text" class="form-control validate[required, maxSize[200]]"' +
                                                                       'id="pname_edit" placeholder="Enter first name here please">'+
                                                            '</div>'+
                                                            '<label for="plast_edit" style="margin-top: 20px">' + 
                                                                window.lang.translate("Last Name") +
                                                            '</label>'+
                                                            '<div class="input-group">'+
                                                                '<div class="input-group-addon">'+
                                                                    '<i class="icon-prepend fa fa-flag-o"></i>'+
                                                                '</div>'+
                                                                '<input type="text" class="form-control validate[required, maxSize[200]]"'+ 
                                                                      'id="plast_edit" placeholder="Enter last name here please">'+
                                                            '</div>'+
                                                            '<label for="ppos_edit" style="margin-top: 20px">'+
                                                                window.lang.translate("Position") +
                                                            '</label>'+
                                                            '<div class="input-group">' +
                                                                '<div class="input-group-addon">' +                                       
                                                                    '<i class="icon-prepend fa fa-flag-o"></i>'+
                                                                '</div>'+
                                                                '<input type="text" class="form-control validate[required, maxSize[200]]"' +
                                                                       'id="ppos_edit" placeholder="Enter member position here please">'+
                                                            '</div>'+
                                                            '<label for="ppos_edit_eng" style="margin-top: 20px">'+
                                                                window.lang.translate("Position (English)") +
                                                            '</label>'+
                                                            '<div class="input-group">'+
                                                                '<div class="input-group-addon">'       +                                 
                                                                    '<i class="icon-prepend fa fa-flag-o"></i>'+
                                                                '</div>'+
                                                                '<input type="text" class="form-control validate[required, maxSize[200]]"' +
                                                                       'id="ppos_edit_eng" placeholder="Enter member position in English here please">'+
                                                            '</div>'+
                                                            '<br/>'+
                                                            '<div class="form-group">'        +                      
                                                                '<label for="psex_edit">'+
                                                                    window.lang.translate("Sex") +
                                                                '</label>'+
                                                                '<div id="psex_edit">'+
                                                                '</div>'+
                                                            '</div>'+
                                                            '<br/>' +
                                                            '<div class="box-footer col-lg-12">'+
                                                                '<button type="button" class="btn btn-primary" onclick="update_personnel_gen_info()">'+
                                                                    window.lang.translate("Update General Information") +
                                                                '</button>'+
                                                            '</div>'       +                                                                 
                                                        '</form>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="panel box box-danger">'+
                                                '<div class="box-header with-border">'+
                                                    '<h4 class="box-title">'+
                                                        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" class="collapsed" aria-expanded="false">'+
                                                            window.lang.translate('Education Information')+
                                                        '</a>'+
                                                    '</h4>'+
                                                '</div>'+
                                                '<div id="collapseTwo" class="panel-collapse collapse" aria-expanded="false">'+
                                                    '<div class="box-body">'+
                                                        '<form id="personel_edu_info_edit">'+
                                                            '<label for="member_diploma_ph_edit" style="margin-top: 20px">'+
                                                                window.lang.translate("Diploma")+
                                                            '</label>'+
                                                            '<div class="input-group">' +                                 
                                                                '<div class="input-group-addon">'+
                                                                    '<i class="icon-prepend fa fa-flag-o"></i>'+
                                                                '</div>'+
                                                                '<input type="text" class="form-control validate[required, maxSize[200]]"'+
                                                                       'id="member_diploma_ph_edit" placeholder="Enter diploma name in english here please">'+
                                                            '</div>'        +                                                                                      
                                                            '<br/>'+
                                                            '<div class="form-group">' +                               
                                                                '<label for="member_university_country_ph_edit">' + 
                                                                    window.lang.translate("Country of Graduation")+
                                                                '</label>'+
                                                                '<div id="member_university_country_ph_edit">'+
                                                                '</div>'+
                                                            '</div>'                   +                                                             
                                                            '<br/>'+
                                                            '<div class="form-group">'+                              
                                                                '<label for="member_university_ph_edit">'  +
                                                                    window.lang.translate("University or Institute")+
                                                                '</label>'+
                                                                '<div id="member_university_ph_edit">'+
                                                                '</div>'+
                                                            '</div>'+
                                                            '<label for="grad_date_ph_edit" style="margin-top: 20px">'+
                                                                window.lang.translate("Graduation Date") +
                                                            '</label>'+
                                                            '<div class="input-group">' + 
                                                                '<div class="input-group-addon">'+
                                                                    '<i class="icon-prepend fa fa-flag-o"></i>'+
                                                                '</div>'+
                                                                '<input type="date" class="form-control" id="grad_date_ph_edit">'+
                                                            '</div>'+
                                                            '<br/>'+
                                                            '<div class="box-footer col-lg-12">'+
                                                                '<button type="button" class="btn btn-primary" onclick="update_personnel_edu_info()">'+
                                                                    window.lang.translate("Update Education Information") +
                                                                '</button>'+
                                                            '</div>'+
                                                        '</form>'+
                                                    '</div>'+
                                               '</div>'+
                                            '</div>'+
                                            '<div class="panel box box-success">'+
                                                '<div class="box-header with-border">'+
                                                    '<h4 class="box-title">'+
                                                        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseThree" class="collapsed" aria-expanded="false">'+
                                                            window.lang.translate("Language Information")+
                                                        '</a>'+
                                                    '</h4>'+
                                                '</div>'+
                                                '<div id="collapseThree" class="panel-collapse collapse" aria-expanded="false">'+
                                                    '<div class="box-body">'+
                                                        '<form id="personel_lang_info_edit">'+
                                                            '<label for="member_language_ph_edit" style="margin-top: 20px">'+
                                                                window.lang.translate("Language") +
                                                            '</label>'+
                                                            '<div class="input-group">'+
                                                                '<div class="input-group-addon">'+
                                                                    '<i class="icon-prepend fa fa-flag-o"></i>'+
                                                                '</div>'+
                                                                '<input type="text" class="form-control"' +
                                                                       'id="member_language_ph_edit" placeholder="Enter member language here please">'+
                                                            '</div>'+
                                                            '<br/>'+
                                                            '<div class="box-footer col-lg-12">'+
                                                                '<button type="button" class="btn btn-primary" onclick="update_personnel_lang_info()">'+
                                                                    window.lang.translate("Update Language Information") +
                                                                '</button>'+
                                                            '</div>'+
                                                        '</form>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="panel box box-success">'+
                                                '<div class="box-header with-border">'+
                                                    '<h4 class="box-title">'+
                                                        '<a data-toggle="collapse" data-parent="#accordion" href="#collapseFour" class="collapsed" aria-expanded="false">'+
                                                            window.lang.translate("Certificate Information")+
                                                        '</a>'+
                                                    '</h4>'+
                                                '</div>'+
                                                '<div id="collapseFour" class="panel-collapse collapse" aria-expanded="false">'+
                                                    '<div class="box-body">'+
                                                        '<form id="personel_cert_info_edit">'+
                                                            '<label for="member_certificate_ph_edit" style="margin-top: 20px">'+
                                                                window.lang.translate("Certificate") +
                                                            '</label>'+
                                                            '<div class="input-group">'+
                                                                '<div class="input-group-addon">'+
                                                                    '<i class="icon-prepend fa fa-flag-o"></i>'+
                                                                '</div>'+
                                                                '<input type="text" class="form-control" '+
                                                                       'id="member_certificate_ph_edit" placeholder="Enter member certificate here please">'+
                                                            '</div>'+
                                                            '<br/>'+
                                                            '<div class="box-footer col-lg-12">'+
                                                                '<button type="button" class="btn btn-primary" onclick="update_personnel_cert_info()">'+
                                                                    window.lang.translate("Update Certificate Information") +
                                                                '</button>'+
                                                            '</div> '+
                                                        '</form>'+
                                                    '</div>'+
                                                '</div>'    +                
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<!-- /.box-body -->'+
                                '</div>');
                            
                                /*
                                * Sex types
                                */                               
                               $.ajax({
                                   url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                                   data: {
                                       url: 'fillSexTypes_sysSpecificDefinitions',
                                       language_code: $("#langCode").val(),
                                       component_type: 'ddslick'
                                   },
                                   type: 'GET',
                                   dataType: 'json',
                                   //data: 'rowIndex='+rowData.id,
                                   success: function (data, textStatus, jqXHR) {
                                       if (data.length !== 0) {

                           //                console.log(data);
                                           $('#psex_edit').ddslick('destroy');
                                           $('#psex_edit').ddslick({
                                               data: data,
                                               width: '100%',
                                               height: '500%',
                                               background: false,
                                               selectText: window.lang.translate("Please select a category from list..."),
                                               imagePosition: 'right',
                                               onSelected: function (selectedData) {
                           //                            console.log(selectedData.selectedData.description);
                           //                            console.log(selectedData.selectedData.value);
                                               }
                                           });
                                       } else {
                                           console.error('sex types servis datasÃ„Â± boÃ…Å¸tur!!');
                                       }
                                   },
                                   error: function (jqXHR, textStatus, errorThrown) {
                                       console.error('sex types servis hatasÃ„Â±->' + textStatus);
                                   }
                               });
                               
                               /*
                                * Countries
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
                                            $('#member_university_country_ph_edit').ddslick({
                                                data: data,
                                                width: '100%',
                                                height: '500%',
                                                background: false,
                                                selectText: window.lang.translate("Please select a country from list..."),
                                                imagePosition: 'right',
                                                onSelected: function (selectedData) {
                                                    
                                                }
                                            });
                                        } else {
                                            console.error('"fillComboBox_syscountrys" servis datasÄ± boÅŸtur!!');
                                        }
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        console.error('"fillComboBox_syscountrys" servis hatasÄ±->' + textStatus);
                                    }
                                });

                               /*
                                * Universities
                                */
                               $.ajax({
                                   url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                                   data: {
                                       url: 'pkFillUniversityDdList_sysUniversities',
                                       language_code: $("#langCode").val(),
                                       component_type: 'ddslick',
                                       pk: $('#pk').val(),
                                       country_id: 91
                                   },
                                   type: 'GET',
                                   dataType: 'json',
                                   //data: 'rowIndex='+rowData.id,
                                   success: function (data, textStatus, jqXHR) {
                                       if (data.length !== 0) {

                           //                console.log(data);
                                           $('#member_university_ph_edit').ddslick('destroy');
                                           $('#member_university_ph_edit').ddslick({
                                               data: data,
                                               width: '100%',
                                               height: '500%',
                                               background: false,
                                               selectText: window.lang.translate("Please select a university from list..."),
                                               imagePosition: 'right',
                                               onSelected: function (selectedData) {
                           //                            console.log(selectedData.selectedData.description);
                           //                            console.log(selectedData.selectedData.value);
                                               }
                                           });
                                       } else {
                                           console.error('list of universities servis datasÃ„Â± boÃ…Å¸tur!!');
                                       }
                                   },
                                   error: function (jqXHR, textStatus, errorThrown) {
                                       console.error('list of universities servis hatasÃ„Â±->' + textStatus);
                                   }
                               });
                return $message;
            },
            type: BootstrapDialog.TYPE_PRIMARY,
            onshown: function () {
                $('#personnelFormPopup').validationEngine();

                $("#mach-prod-box-popup").loadImager();
                $("#mach-prod-box-popup").loadImager('appendImage');

                var ajaxACLResourcesPopup = $(window).ajaxCallWidget({
                    proxy: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                    data: {url: 'pkFillResourcesDdList_sysAclResources',
                        pk: $("#pk").val()
                    }
                });
                ajaxACLResourcesPopup.ajaxCallWidget({
                    onError: function (event, textStatus, errorThrown) {
                        dm.dangerMessage({
                            onShown: function () {
                                //$('#mach-prod-box').loadImager('removeLoadImage'); 
                            }
                        });
                        dm.dangerMessage('show', 'ACL Resource (Kaynak) Bulunamamıştır...',
                                'ACL resource (kaynak) bulunamamıştır...');
                    },
                    onSuccess: function (event, data) {
                        var data = $.parseJSON(data);
                        $('#mach-prod-box-popup').loadImager('removeLoadImage');
                        $('#dropdownACLResourcesPopup').ddslick({
                            height: 200,
                            data: data,
                            width: '98%',
                            search: true,
                            //imagePosition:"right",
                            onSelected: function (selectedData) {
                                if (selectedData.selectedData.value > 0) {
                                    /*$('#tt_tree_menu').tree({
                                     url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val(),
                                     });*/
                                }
                            }
                        });
                        $('#dropdownACLResourcesPopup').ddslick('selectByValue',
                                {index: '' + row.resource_id + '',
                                    text: '' + row.resource_name + ''}
                        );
                    },
                    onErrorDataNull: function (event, data) {
                        dm.dangerMessage({
                            onShown: function () {
                                //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                            }
                        });
                        dm.dangerMessage('show', 'ACL Resource (Kaynak) Bulunamamıştır...',
                                'ACL resource (kaynak) bulunamamıştır...');
                    }
                });
                ajaxACLResourcesPopup.ajaxCallWidget('call');


            },
            onhide: function () {
                if (window.gridReloadController == true) {
                    $('#tt_grid_dynamic').datagrid('reload');
                }

            }
        });
        return false;
    };

    /**
     * update ACL privilege wrapper
     * @returns {Boolean}
     * @author Mustafa Zeynel Dağlı
     * @since 14/07/2016
     */
    window.updatePersonnelWrapper = function (e, id) {
        e.preventDefault();
        var id = id;
        if ($("#personnelFormPopup").validationEngine('validate')) {

            var ddData = $('#dropdownACLResourcesPopup').data('ddslick');
            if (ddData.selectedData.value > 0) {
                updateACLPrivilege(id);
            } else {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', 'ACL Resource Seçiniz', 'Lütfen ACL resource seçiniz!')
            }
            return false;
        }
        return false;
    }

    /**
     * update ACL privilege
     * @returns {undefined}
     * @author Mustafa Zeynel Dağlı
     * @since 14/07/2016
     */
    window.updatePersonnel = function (id) {
        var loader = $('#loading-image-crud-popup').loadImager();
        loader.loadImager('appendImage');

        var ddData = $('#dropdownACLResourcesPopup').data('ddslick');
        var resource_id = ddData.selectedData.value;

        var aj = $(window).ajaxCall({
            proxy: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'pkUpdate_sysAclPrivilege',
                id: id,
                name: $('#name_popup').val(),
                name_eng: $('#name_eng_popup').val(),
                description: $('#description_popup').val(),
                resource_id: resource_id,
                pk: $("#pk").val()
            }
        })
        aj.ajaxCall({
            onError: function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'ACL Yetki Güncelleme İşlemi Başarısız...',
                        'ACL yetki güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdate_sysAclPrivilege" servis hatası->' + textStatus);
            },
            onSuccess: function (event, data) {
                var data = data;
                sm.successMessage({
                    onShown: function (event, data) {
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', 'ACL Yetki Güncelleme İşlemi Başarılı...',
                        'ACL yetki güncelleme işlemini gerçekleştirdiniz... ',
                        data);
                window.gridReloadController = true;
            },
            onErrorDataNull: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'ACL Yetki Güncelleme İşlemi Başarısız...',
                        'ACL yetki güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdate_sysAclPrivilege" servis datası boştur!!');
            },
            onErrorMessage: function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'ACL Yetki Güncelleme İşlemi Başarısız...',
                        'ACL yetki güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
            },
            onError23503: function (event, data) {
            },
            onError23505: function (event, data) {
            }
        })
        aj.ajaxCall('call');
    }







});

var sm = $(window).successMessage();
var dm = $(window).dangerMessage();
var wm = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
    actionButtonLabel: window.lang.translate('Confirm')});


function add_comm_num_func(element) {

//    var isValid = !$('#' + element.id.replace('add_btn_', 'comm_type_')).validationEngine('validate');
    if ($('#' + element.id.replace('add_btn_', 'comm_type_')).val() !== '') {
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

function send_personel_general_info() {

    if ($('#personel_gen_info').validationEngine('validate')) {


        /*
         * Service cagirilip ve kayit yapilacak, 
         * kaydin yapilmasi ile bir personnel id geri donecek
         * bu personnel id #gen_info_tab in personnel_id attributuna yazilip
         * tekrar bu taba geri donus yapildiginda eger mevcutsa update degilse 
         * insert komutu calistirilacak
         */

        if ($('#gen_info_tab').attr('personnel_id')) {

            /*
             * update service
             */

            $('#gen_info_tab').removeClass('active');
            $('#edu_info_tab').addClass('active');

            $('#gen_info_tab_btn').removeClass('active');
            $('#edu_info_tab_btn').addClass('active');

        } else {
            /*
             * insert service
             */

            /*
             * personnel id must be written in #gen_info_tab 's personnel_id attr
             */

            $('#gen_info_tab').attr('personnel_id', '');

            $('#gen_info_tab').removeClass('active');
            $('#edu_info_tab').addClass('active');

            $('#edu_tab_toggle').attr('href', '#edu_info_tab');
            $('#edu_tab_toggle').attr('data-toggle', 'tab');

            $('#gen_info_tab_btn').removeClass('active');
            $('#edu_info_tab_btn').addClass('active');
            $('#edu_info_tab_btn').removeClass('disabled');
        }
    } else {
        $('.control-sidebar').hide();
    }

}

function add_new_personnel_grad() {

    /*
     * update education service
     */

    $('#edu_info_tab').removeClass('active');
    $('#lang_info_tab').addClass('active');

    $('#lang_tab_toggle').attr('href', '#lang_info_tab');
    $('#lang_tab_toggle').attr('data-toggle', 'tab');

    $('#edu_info_tab_btn').removeClass('active');
    $('#lang_info_tab_btn').addClass('active');
    $('#lang_info_tab_btn').removeClass('disabled');


}

function add_new_personnel_lang() {

    /*
     * update lang service
     */

    $('#lang_info_tab').removeClass('active');
    $('#cert_info_tab').addClass('active');

    $('#cert_tab_toggle').attr('href', '#cert_info_tab');
    $('#cert_tab_toggle').attr('data-toggle', 'tab');

    $('#lang_info_tab_btn').removeClass('active');
    $('#cert_info_tab_btn').addClass('active');
    $('#cert_info_tab_btn').removeClass('disabled');
}

function send_personel_cert_info() {

//    $('#personel_gen_info').reset();
    $('#personel_gen_info')[0].reset();
    $('#cert_info_tab').removeClass('active');
    $('#gen_info_tab').addClass('active');
    $('#cert_info_tab_btn').removeClass('active');
    $('#gen_info_tab_btn').addClass('active');

    $('#edu_tab_toggle').removeAttr('href');
    $('#edu_tab_toggle').removeAttr('data-toggle');
    $('#edu_info_tab_btn').addClass('disabled');
    $('#lang_tab_toggle').removeAttr('href');
    $('#lang_tab_toggle').removeAttr('data-toggle');
    $('#lang_info_tab_btn').addClass('disabled');
    $('#cert_tab_toggle').removeAttr('href');
    $('#cert_tab_toggle').removeAttr('data-toggle');
    $('#cert_info_tab_btn').addClass('disabled');

    sm.successMessage('show', window.lang.translate('Congratulations...'),
            'Personnel information submitted successfully...');

}

function update_personnel_info(){
    
}

