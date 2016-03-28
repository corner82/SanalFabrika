$(document).ready(function () {

    /**
     * multilanguage plugin 
     * @type Lang
     */
    var lang = new Lang();
    lang.dynamic($('#ln').val(), '/plugins/jquery-lang-js-master/langpack/'+$('#ln').val()+'.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#ln').val());
    
    
    /**
     * user roles  select box filling
     * @author Mustafa Zeynel Dağlı
     * @since 28/03/2016
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkFillComboBoxRoles_sysAclRoles' ,
                language_code : 'tr',
                main_group : 2,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                $('#dropdownRoles').ddslick({
                    height : 200,
                    data : data, 
                    width:'100%',
                    //selectText: "Select your preferred social network",
                    imagePosition:"right",
                    onSelected: function(selectedData){
                        if(selectedData.selectedData.value>0) {
                            $('#tt_tree_menu').tree({
                                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillComboBoxFullRoles_sysAclRoles&pk=' + $("#pk").val()+ '&role='+selectedData.selectedData.value,
                            });
                        }
                        //console.log(selectedData.selectedData.value);
                       /* if(selectedData.selectedData.value==6) {
                            $('#dropdownOperationsToolsContainer').loadImager();
                            $('#dropdownOperationsToolsContainer').loadImager('appendImage');
                            window.getOperationTypeTools();
                        } else {
                            $('#dropdownOperationsToolsContainer').loadImager();
                            $('#dropdownOperationsToolsContainer').loadImager('appendImage');
                            $('#dropdownOperationsTools').ddslick('destroy');
                            window.getOperationTypeToolsPleaseSelect();
                        }*/
                    }   
                });
            } else {
                console.error('"pkFillComboBoxRoles_sysAclRoles" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkFillComboBoxRoles_sysAclRoles" servis hatası->'+textStatus);
        }
    });
    
    

    /**
     * blockUI wrappert test
     * @author Mustafa Zeynel Dağlı
     * @since 18/01/2016
     */
    /*var testBlockuiRoleNameChangeNull = $("#growlUI-nullRoleName").blockuiWrapper();
    var testBlockuiRoleNameChangeApproval = $("#growlUI-roleNameChangeApproval").blockuiApprovalWrapper();
    var aclProcessing = $("#roleForm").blockElement();
    var test = $("#roleForm").test();*/


    

    /*
     * Author: Abdullah A Almsaeed
     * Date: 4 Jan 2014
     * Description:
     *      This is a demo file used only for the main dashboard (index.html)
     **/
    "use strict";
    // Left menuyu oluşturmak için çağırılan fonksiyon...
    $.fn.leftMenuFunction();

    //Validation forms binded...
    jQuery("#menuForm").validationEngine();
    


    /*
     * 
     * @type @call;$@call;loadImager
     * @Since 2016.01.16
     * @Author Mustafa Zeynel Dagli
     * @Purpose this variable is to create loader image for roles tree 
     * this imager goes to #loading-image div in html.
     * imager will be removed on roles tree onLoadSuccess method.
     */
    var loader = $("#loading-image").loadImager();

    /*
     * 
     * @type @call;$@call;tree
     * Role Tree Fonksiyonu
     * Bahram Lotfi Sadigh
     * 2016.01.13
     */

    $('#tt_tree_menu').tree({
        //url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillComboBoxFullRoles_sysAclRoles&pk=' + $("#pk").val(),
        method: 'get',
        animate: true,
        checkbox: true,
        cascadeCheck: false,
        lines: true,
        onDblClick: function (node) {
            editNode = $(this).tree('getData', node.target);
            beforeEditTextValue = $(this).tree('getData', node.target).text;
            parent = $(this).tree('getParent', node.target);

            if (parent == null) {
                parentId = 0;
            } else {
                parentId = parent.id;
            }

            $(this).tree('beginEdit', node.target);
        },
        onAfterEdit: function (node) {

            id = editNode.id;
            root = $(this).tree('getRoot', node.target);
            if (editNode.text === '') {

                testBlockuiRoleNameChangeNull.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiRoleNameChangeNull.blockuiWrapper('show');

                editNode.text = beforeEditTextValue;

                $('#tt_tree_menu').tree('update', {
                    target: node.target,
                    text: beforeEditTextValue
                });

            } else {

                testBlockuiRoleNameChangeApproval.blockuiApprovalWrapper('option', {
                    showOverlay: true
                });
                testBlockuiRoleNameChangeApproval.blockuiApprovalWrapper('show');
                active = editNode.attributes.active;
            }
        },
        onLoadSuccess: function (node, data) {
            loader.loadImager('removeLoadImage');
        },
        onClick: function (node) {

            selectedRoot = $(this).tree('getRoot', node.target);
            selectedItem = $(this).tree('getData', node.target);

        },
        onCheck: function (node) {
            checkedNodes = $('#tt_tree_menu').tree('getChecked');
            
        },
        formatter: function (node) {

            if (node.attributes.active == 0) {
                var s = node.text;
//                s += '&nbsp;<a href="#"><i class="fa fa-fw fa-trash-o"></i></a>&nbsp;<a href="#" ><i class="fa fa-fw fa-ban"></i></a>';
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" onclick="deleteRoleFunction()"></i>&nbsp;<i class="fa fa-fw fa-ban" onclick="roleActivationChangeFunction()"></i>';
                //buda koşullu kullanım için örnek satır    
//                if (node.children) {
//                    s += '&nbsp;<a href=<span style=\'color:blue\'>(' + node.children.length + ')</span>';
//                }
                return s;

            } else if (node.attributes.active == 1) {

                var s = node.text;
                s += '&nbsp;<a href="#"><i class="fa fa-fw fa-trash-o" onclick="deleteRoleFunction()"></i></a>&nbsp;<i class="fa fa-fw fa-check-square-o" onclick="roleActivationChangeFunction()"></i>';

                s = "<font color = '#B6B6B4'>" + s + "</font>"
                //buda koşullu kullanım için örnek satır    
//                if (node.children) {
//                    s += '&nbsp;<a href=<span style=\'color:blue\'>(' + node.children.length + ')</span>';
//                }
                return s;
            }
        }
    });

    $('#menuForm').submit(newRoleSubmission);
    $("#deleteRole").on('click', deleteRoleFunction);
    $("#activationRole").on('click', roleActivationChangeFunction);
    
    
    function newRoleSubmission() {

    enteredRoleName = $('#roleName').val();
    roleDescription = $('#roleDescription').val();

    if ($("#menuForm").validationEngine('validate')) {
        var ddData = $('#dropdownRoles').data('ddslick');
        if(ddData.selectedData.value>0) {
            alert(ddData.selectedData.text);
        } else {
            BootstrapDialog.show({
                title: 'Rol Seçiniz',
                message: 'Lütfen Kullanıcı Rolü Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
        //        closable: false
            });
        }
    }
    return false;
}

    /*
    * new role submission rejection function
    * @auhtor: bahram lotfi sadigh
    * @since: 2016.01.18
    */
   window.newRoleSubmissionRejection = function () {
       test.test('hide',testBlockuiNewRoleSubmitApproval);
       //testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('hide');
       aclProcessing.blockElement('hide');
       testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('find');
       return false;
   }
    
});


/* 
 * @returns {Boolean}
 * Role Tree de rol silme fonksiyonu
 * Bahram Lotfi Sadigh
 * 2016.01.13
 */
function deleteRoleFunction() {
    testBlockuiRoleDeleteApproval.blockuiApprovalWrapper('option', {
        showOverlay: true
    });
    testBlockuiRoleDeleteApproval.blockuiApprovalWrapper('show');

}

/* 
 * @returns {Boolean}
 * Role Tree de rol aktif veya pasif degistirme fonksiyonu
 * Bahram Lotfi Sadigh
 * 2016.01.13
 */
function roleActivationChangeFunction() {

    for (i = 0; i < checkedNodes.length; i++) {
        if (checkedNodes[i].attributes.active == 0) {
            active = 1;
            root = $('#tt_tree_menu').tree('getRoot', checkedNodes[i].target);
            rootId = root.id;
            parent = $('#tt_tree_menu').tree('getParent', checkedNodes[i].target);

            if (parent == null) {
                parentId = 0;
            } else {
                parentId = parent.id;
            }
            actChangeNode = $('#tt_tree_menu').tree('getData', checkedNodes[i].target);
            testBlockuiRoleActivationChangeApproval.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiRoleActivationChangeApproval.blockuiApprovalWrapper('show');


        } else if (checkedNodes[i].attributes.active == 1) {

            root = $('#tt_tree_menu').tree('getRoot', checkedNodes[i].target);
            rootId = root.id;

            parent = $('#tt_tree_menu').tree('getParent', checkedNodes[i].target);
            if (parent == null) {
                parentId = 0;
            } else {
                parentId = parent.id;
            }
            active = 0;

            actChangeNode = $('#tt_tree_menu').tree('getData', checkedNodes[i].target);
            testBlockuiRoleActivationChangeApproval.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiRoleActivationChangeApproval.blockuiApprovalWrapper('show');
        }
    }
}

/*
 * Role name change confirmation function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function roleNameChangeConfirmation() {
    response = 'confirm';
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            id: editNode.id,
            url: 'pkUpdate_sysAclRoles',
            name: editNode.text,
            root: root.id,
            parent: parentId,
            icon_class: null,
            active: active,
            start_date: null,
            end_date: null,
            user_id: 0,
            description: null,
            pk: $("#pk").val(),
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
//                $.unblockUI();
//                $('#roleFormBlock').unblock();

            if (data['errorInfo'][0] === '00000') {

                testBlockuiSuccessfulRoleNameChange.blockuiWrapper('option', 'backgroundColor', '0080000');
                testBlockuiSuccessfulRoleNameChange.blockuiWrapper('show');

                $('#tt_tree_menu').tree('update', {
                    target: editNode.target
                });

            } else if (data['errorInfo'] === '23505') {

                testBlockuiFailedRoleNameChange23505.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedRoleNameChange23505.blockuiWrapper('show');

                $('#tt_tree_menu').tree('update', {
                    target: editNode.target,
                    text: beforeEditTextValue
                });
            } else {
                testBlockuiFailedRoleNameChange.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedRoleNameChange.blockuiWrapper('show');

                $('#tt_tree_menu').tree('update', {
                    target: editNode.target,
                    text: beforeEditTextValue
                });
            }
            $.unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {

            testBlockuiFailedRoleNameChange.blockuiWrapper('option', 'fadeOut', 700);
            testBlockuiFailedRoleNameChange.blockuiWrapper('show');

            $('#tt_tree_menu').tree('update', {
                target: editNode.target,
                text: beforeEditTextValue
            });
        }
    });
    $.unblockUI();
}

/*
 * Role name change rejection function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */
function roleNameChangeRejection() {
    response = 'reject';
    $('#tt_tree_menu').tree('update', {
        target: editNode.target,
        text: beforeEditTextValue
    });
    $.unblockUI();
    return false;
}







