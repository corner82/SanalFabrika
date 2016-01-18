$(document).ready(function () {

    /*
     *  easyui da lazy loading de gereken sayfanin jsinline dosyasinin basina eklensin. 
     *  Aksi takdride, easyui getRoot fonksyonu dogru calismayacaktir.
     */
    var lang = new Lang();
    lang.dynamic('th', '/plugins/jquery-lang-js-master/langpack/th.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change('th');

    /**
     * blockUI wrappert test
     * @author Mustafa Zeynel Dağlı
     * @since 18/01/2016
     */
    var testBlockui = $("#growlUI-nullName").blockuiWrapper();
    var testBlockuiNameChangeApproval = $("#growlUI-nameChangeApproval").blockuiApprovalWrapper();

    $.extend($.fn.tree.methods, {
        getRoot: function (jq, nodeEl) {
            if (nodeEl) {
                var target = nodeEl;
                var p = jq.tree('getParent', target);
                while (p) {
                    target = p.target;
                    p = jq.tree('getParent', p.target);
                }
                return jq.tree('getNode', target);
            } else {
                var roots = jq.tree('getRoots');
                return roots.length ? roots[0] : null;
            }
        }
    })



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
    jQuery("#roleForm").validationEngine();
    jQuery("#resourceForm").validationEngine();
    jQuery("#privelegeForm").validationEngine();


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

    $('#tt_tree_roles').tree({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?\n\
                url=pkFillComboBoxFullRoles_sysAclRoles&pk=' + $("#pk").val(),
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
//            console.log('parent is ' + parent);
//            console.log(beforeEditValue.text);

            $(this).tree('beginEdit', node.target);
        },
        onAfterEdit: function (node) {

            id = editNode.id;
            root = $(this).tree('getRoot', node.target);
//            console.log(beforeEditValue.id);
//            console.log(beforeEditValue.text);
//            console.log('root id' + root.id);
//            console.log(root);
            if (editNode.text === '') {
                //$.ui.blockuiWrapper('test');
                //var testBlockui = $(this).blockuiWrapper();
                //testBlockui.option({'fadeOut' : 70000});


                testBlockui.blockuiWrapper('option', 'fadeOut', 700);
                testBlockui.blockuiWrapper('test');

//                console.log("entered value is null...");
                editNode.text = beforeEditTextValue;
//                console.log('old value is ' + beforeEditTextValue);
//                console.log('value is ' + editNode.text);

                $('#tt_tree_roles').tree('update', {
                    target: node.target,
                    text: beforeEditTextValue
                });
            } else {
                response = null;

                console.log('blockuiApprovalWrapper');

                testBlockuiNameChangeApproval.blockuiApprovalWrapper('option', {
                    showOverlay: true
                });
                testBlockuiNameChangeApproval.blockuiApprovalWrapper('test');

                active = editNode.attributes.active;
//                console.log(active);
            }
        },
        onLoadSuccess: function (node, data) {
            loader.loadImager('removeLoadImage');
        },
        onClick: function (node) {

            selectedRoot = $(this).tree('getRoot', node.target);
            selectedItem = $(this).tree('getData', node.target);
//            console.log(selectedRoot.text + ' and ' + selectedItem.text); 

        },
        onCheck: function (node) {

            checkedNodes = $('#tt_tree_roles').tree('getChecked');

            var z;
            var q;

            if (checkedNodes) {

//                console.log(checkedNodes);
//                console.log('length is ' + checkedNodes.length);

                for (z = 0; z < checkedNodes.length; z++) {

                    isLeaf = $(this).tree('isLeaf', checkedNodes[z].target);
                    if (!isLeaf) {

                        $('#tt_tree_roles').tree('expand', checkedNodes[z].target);

//                        console.log('checkedNode ' + z + ' is ' + checkedNodes[z].text);

                        checkedNodesChildren = $('#tt_tree_roles')
                                .tree('getChildren', checkedNodes[z].target);

                        if (checkedNodesChildren) {

                            for (q = 0; q < checkedNodesChildren.length; q++) {

//                                console.log('children nodes are ' 
//                                            + ($('#tt_tree_roles')
//                                            .tree('getData', checkedNodesChildren[q]
//                                            .target).text));
                                isLeaf = $(this).tree('isLeaf', checkedNodesChildren[q].target);
                                if (!isLeaf) {

                                    $('#tt_tree_roles').tree('expand', checkedNodesChildren[q].target);
                                }
                            }
                        }
                    }
                }
            }
        },
        formatter: function (node) {

            if (node.attributes.active == 0) {
                var s = node.text;
//                s += '&nbsp;<a href="#"><i class="fa fa-fw fa-trash-o"></i></a>&nbsp;<a href="#" ><i class="fa fa-fw fa-ban"></i></a>';
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" onclick="deleteRoleFunction()"></i>&nbsp;<i class="fa fa-fw fa-ban" onclick="activationChangeFunction()"></i>';
                //buda koşullu kullanım için örnek satır    
//                if (node.children) {
//                    s += '&nbsp;<a href=<span style=\'color:blue\'>(' + node.children.length + ')</span>';
//                }
                return s;

            } else if (node.attributes.active == 1) {

                var s = node.text;
                s += '&nbsp;<a href="#"><i class="fa fa-fw fa-trash-o" onclick="deleteRoleFunction()"></i></a>&nbsp;<i class="fa fa-fw fa-check-square-o" onclick="activationChangeFunction()"></i>';

                s = "<font color = '#B6B6B4'>" + s + "</font>"
                //buda koşullu kullanım için örnek satır    
//                if (node.children) {
//                    s += '&nbsp;<a href=<span style=\'color:blue\'>(' + node.children.length + ')</span>';
//                }
                return s;
            }
        }
    });

    $('#roleForm').submit(newRoleSubmission);

    $("#deleteRole").on('click', deleteRoleFunction);

    $("#activationRole").on('click', activationChangeFunction);

//    $("#searchForRoles").on('click', searchForRoles);
});

/*
 * 
 * @type @call;$@call;tree
 * variables defintion outside scopes
 * @author: bahram lotfi sadigh
 * @since: 2016.01.18
 */

var selectedRoot;
var selectedItem;
var beforeEditValue;
var parent;
var parentId;
var checkedNodes;
var checkedNodesChildren;
var rootId;
var nodesToCheck;
var search_name;
var root;
var id;
var enteredRoleName;
var roleDescription;
var i;
var active;
var response;

/*
 * 
 * @type @call;$@call;blockuiWrapper
 * blockUI variable calls
 * @author: bahram lotfi sadigh
 * @since: 2016.01.18
 */

var testBlockuiSuccessfulNameChange = $("#growlUI-successfulNameChange").blockuiWrapper();
var testBlockuiFailedNameChange = $("#growlUI-failedNameChange").blockuiWrapper();
var testBlockuiFailedNameChange23505 = $("#growlUI-failedNameChange23505").blockuiWrapper();

var testBlockuiNewRoleSubmitApproval = $("#growlUI-newRoleSubmitApproval").blockuiApprovalWrapper();
var testBlockuiNewPassiveRoleSubmitPrevention = $("#growlUI-newPassiveRoleSubmitPrevention").blockuiApprovalWrapper();
var testBlockuiSuccessfulSubmit = $("#growlUI-successfulSubmit").blockuiWrapper();
var testBlockuiFailedSubmit = $("#growlUI-failedSubmit").blockuiWrapper();
var testBlockuiFailedSubmit23505 = $("#growlUI-failedSubmit23505").blockuiWrapper();

var testBlockuiDeleteApproval = $("#growlUI-deleteApproval").blockuiApprovalWrapper();
var testBlockuiSuccessfulDelete = $("#growlUI-successfulDelete").blockuiWrapper();
var testBlockuiFailedDelete = $("#growlUI-failedDelete").blockuiWrapper();

var testBlockuiActivationChangeApproval = $("#growlUI-activationChangeApproval").blockuiApprovalWrapper();
var testBlockuiSuccessfulActivationChange = $("#growlUI-successfulActivationChange").blockuiWrapper();
var testBlockuiFailedActivationChange = $("#growlUI-failedActivationChange").blockuiWrapper();
var testBlockuiFailedActivationChange23505 = $("#growlUI-failedActivationChange23505").blockuiWrapper();

/* 
 * @returns {Boolean}
 * Role Tree de yeni role ekleme fonksiyonu
 * Bahram Lotfi Sadigh
 * 2016.01.13
 */

function newRoleSubmission() {
    //e.preventDefault();

    enteredRoleName = $('#roleName').val();
    roleDescription = $('#roleDescription').val();

    if ($("#roleForm").validationEngine('validate')) {
        $('#roleFormBlock').block({
            message: '<h1>İşlem yapılıyor..</h1>',
            css: {border: 'none',
                padding: '15px',
                backgroundColor: '#008000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'}
        });
//            console.log(selectedRoot.id);
//            console.log(selectedRoot);
//            console.log(selectedItem.id);
//            console.log(selectedItem);
//            console.log(enteredRoleName);
//            console.log(roleDescription);

        var passiveControl = $('#tt_tree_roles').tree('getData', selectedItem.target);

        if (passiveControl.attributes.active == 0) {
            if (selectedItem == null) {
                parentId = 0;
                rootId = 0;
//                console.log('there is no parent selection: ' + parentId);
//                console.log('there is no root selection: ' + rootId);
            } else {
                parentId = selectedItem.id;
                rootId = selectedRoot.id;
//                console.log('there is a selected parent: ' + parentId);
//                console.log('there is a selected root: ' + rootId);
            }

            testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiNewRoleSubmitApproval.blockuiApprovalWrapper('test');

        } else {

            testBlockuiNewPassiveRoleSubmitPrevention.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiNewPassiveRoleSubmitPrevention.blockuiApprovalWrapper('test');

        }

    }
    return false;
}

/* 
 * @returns {Boolean}
 * Role Tree de rol silme fonksiyonu
 * Bahram Lotfi Sadigh
 * 2016.01.13
 */

function deleteRoleFunction() {

//    console.log('deleteRoleFunction');


//                    console.log("remove");
//                    console.log(checkedNodes[i].text);


    testBlockuiDeleteApproval.blockuiApprovalWrapper('option', {
        showOverlay: true
    });
    testBlockuiDeleteApproval.blockuiApprovalWrapper('test');

}

/* 
 * @returns {Boolean}
 * Role Tree de rol aktif veya pasif degistirme fonksiyonu
 * Bahram Lotfi Sadigh
 * 2016.01.13
 */

function activationChangeFunction() {

    for (i = 0; i < checkedNodes.length; i++) {

//        console.log('1' + checkedNodes[i]);

        if (checkedNodes[i].attributes.active == 0) {
            active = 1;
            root = $('#tt_tree_roles').tree('getRoot', checkedNodes[i].target);
//                console.log('root ' + root);

            rootId = root.id;
//                console.log('rootId ' + rootId);

            parent = $('#tt_tree_roles').tree('getParent', checkedNodes[i].target);

            if (parent == null) {
                parentId = 0;
//                    console.log('parent ' + parentId);
            } else {
                parentId = parent.id;
//                    console.log('parent ' + parentId);
            }
//                console.log(checkedNodes[i].text + ' is active.');
//                console.log(checkedNodes[i].text + ' has id ' + checkedNodes[i].id);
//                console.log(checkedNodes[i].text + ' has activation code ' + checkedNodes[i].attributes.active);


            actChangeNode = $('#tt_tree_roles').tree('getData', checkedNodes[i].target);

            testBlockuiActivationChangeApproval.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiActivationChangeApproval.blockuiApprovalWrapper('test');


        } else if (checkedNodes[i].attributes.active == 1) {
//                console.log(checkedNodes[i].text + ' is deactivated.');
//                console.log(checkedNodes[i].text + ' has id ' + checkedNodes[i].id);
//                console.log(checkedNodes[i].text + ' has activation code ' + checkedNodes[i].attributes.active);

            root = $('#tt_tree_roles').tree('getRoot', checkedNodes[i].target);
//                console.log('root ' + root);
            rootId = root.id;
//                console.log('rootId ' + rootId);

            parent = $('#tt_tree_roles').tree('getParent', checkedNodes[i].target);

            if (parent == null) {
                parentId = 0;
//                    console.log('parent ' + parentId);
            } else {
                parentId = parent.id;
//                    console.log('parent ' + parentId);
            }
            active = 0;

            actChangeNode = $('#tt_tree_roles').tree('getData', checkedNodes[i].target);

//            console.log('1' + actChangeNode);
            testBlockuiActivationChangeApproval.blockuiApprovalWrapper('option', {
                showOverlay: true,
            });
            testBlockuiActivationChangeApproval.blockuiApprovalWrapper('test');

        }
    }
}

/*
 * Role search function- for searching roles in tree
 * Bahrma Lotfi Sadigh
 * 2016.01.15
 * 
 */

function searchForRoles() {

    if ($('#searchRole').val() == '') {
        console.log("Nothing entered....");
        search_name = '';

    } else {
        console.log($('#searchRole').val());
        search_name = $('#searchRole').val();

        /*
         * fill grid icin bir Grid eklenecek
         */

    }

}

/*
 * Role name change confirmation function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function nameChangeConfirmation() {

    response = 'confirm';
    console.log(response);

    $.ajax({
        //url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
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

            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
//                        location.reload();

            $.unblockUI();
            $('#roleFormBlock').unblock();

            console.log('errorInfo is ' + data['errorInfo']);
            if (data['errorInfo'] === '00000') {

                testBlockuiSuccessfulNameChange.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiSuccessfulNameChange.blockuiWrapper('test');

                $('#tt_tree_roles').tree('update', {
                    target: editNode.target
                });
            } else if (data['errorInfo'] === '23505') {

                testBlockuiFailedNameChange23505.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedNameChange23505.blockuiWrapper('test');

                $('#tt_tree_roles').tree('update', {
                    target: editNode.target,
                    text: beforeEditTextValue
                });
            } else {
                console.log('errorInfo is ' + data['errorInfo']);

                testBlockuiFailedNameChange.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedNameChange.blockuiWrapper('test');

                $('#tt_tree_roles').tree('update', {
                    target: editNode.target,
                    text: beforeEditTextValue
                });
            }
            $.unblockUI();
        },
        error: function (jqXHR, textStatus, errorThrown) {

//            console.log(errorThrown);
            console.log(jqXHR);
//            console.log(textStatus);
//            console.warn('error text status-->' + textStatus);

            testBlockuiFailedNameChange.blockuiWrapper('option', 'fadeOut', 700);
            testBlockuiFailedNameChange.blockuiWrapper('test');

            $('#tt_tree_roles').tree('update', {
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

function nameChangeRejection() {
    response = 'reject';
    console.log(response);

    $('#tt_tree_roles').tree('update', {
        target: editNode.target,
        text: beforeEditTextValue
    });

    $.unblockUI();
}

/*
 * new role submission confirmation function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function newRoleSubmissionConfirmation() {

    response = 'confirm';
    console.log(response);

    $.ajax({
        //url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkInsert_sysAclRoles',
            icon_class: null,
            start_date: null,
            end_date: null,
            root: rootId,
            parent: parentId,
            user_id: 0,
            name: enteredRoleName,
            description: roleDescription,
            pk: $("#pk").val(),
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {

            $('#roleFormBlock').unblock();
            console.log('errorInfo is ' + data['errorInfo']);
            if (data['errorInfo'][0] === '00000') {

                testBlockuiSuccessfulSubmit.blockuiWrapper('option', 'backgroundColor', '0080000');
                testBlockuiSuccessfulSubmit.blockuiWrapper('test');

            } else if (data['errorInfo'][0] === '23505') {

                console.log('errorInfo is ' + data['errorInfo']);

                testBlockuiFailedSubmit23505.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedSubmit23505.blockuiWrapper('test');

            } else {

                console.log('errorInfo is ' + data['errorInfo']);

                testBlockuiFailedSubmit.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedSubmit.blockuiWrapper('test');

            }
            return false;
        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.log(errorThrown);
            console.log(jqXHR);
            console.log(textStatus);
//            console.warn('error text status-->' + textStatus);

            $('#roleFormBlock').unblock();

            testBlockuiFailedSubmit.blockuiWrapper('option', 'fadeOut', 700);
            testBlockuiFailedSubmit.blockuiWrapper('test');

            return false;
        }
    });

    $('#tt_tree_roles').tree('reload');
    $.unblockUI();
}

/*
 * new role submission rejection function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function newRoleSubmissionRejection() {
    response = 'reject';
    console.log(response);

    $('#tt_tree_roles').tree('reload');
    $.unblockUI();
}


function newPassiveRoleSubmissionPrevention() {
    response = 'reject';
    console.log(response);
    
    $('#tt_tree_roles').tree('reload');
    $.unblockUI();
}

/*
 * role remove confirmation function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function deleteRoleConfirmation() {

    response = 'confirm';
    console.log(response);

    for (i = 0; i < checkedNodes.length; i++) {
        $.ajax({
            //url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'pkDelete_sysAclRoles',
                id: checkedNodes[i].id,
                user_id: 0,
                pk: $("#pk").val(),
            },
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {

                console.log(checkedNodes + 'removed');
//                            location.reload();
                $('#roleFormBlock').unblock();
                console.log('errorInfo is ' + data['errorInfo'][0]);
                if (data['errorInfo'][0] === '00000') {

                    testBlockuiSuccessfulDelete.blockuiWrapper('option', 'backgroundColor', '0080000');
                    testBlockuiSuccessfulDelete.blockuiWrapper('test');

                } else {

                    testBlockuiFailedDelete.blockuiWrapper('option', 'fadeOut', 700);
                    testBlockuiFailedDelete.blockuiWrapper('test');

                }
                return false;
            },
            error: function (jqXHR, textStatus, errorThrown) {
//            console.log(errorThrown);
//            console.log(jqXHR);
//            console.log(textStatus);
//            console.warn('error text status-->' + textStatus);
                $('#roleFormBlock').unblock();

                testBlockuiFailedDelete.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedDelete.blockuiWrapper('test');

            }
        });
    }
    $('#tt_tree_roles').tree('reload');
    $.unblockUI();
}

/*
 * role remove rejection function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function deleteRoleRejection() {
    response = 'reject';
    console.log(response);

    $('#tt_tree_roles').tree('reload');
    $.unblockUI();
}

/*
 * role activation change confirmation function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function activationChangeConfirmation() {

    console.log(i);
//    console.log(checkedNodes[i]);

    console.log('2' + actChangeNode);

    console.log(active);

    $.ajax({
        //url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkUpdateChild_sysAclRoles',
            id: actChangeNode.id,
            name: actChangeNode.text,
            active: active,
            user_id: 0,
            pk: $("#pk").val()
        },
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {

            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
//                        location.reload();

//            console.log('2' + actChangeNode);
//            console.log('2' + parent);


            $('#roleFormBlock').unblock();

            console.log('errorInfo is ' + data['errorInfo'][0]);

            if (data['errorInfo'][0] == '00000') {

                console.log('dogru ' + data['errorInfo'][0]);

                testBlockuiSuccessfulActivationChange.blockuiWrapper('option', 'backgroundColor', '0080000');
                testBlockuiSuccessfulActivationChange.blockuiWrapper('test');

                $('#tt_tree_roles').tree('reload');

            } else if (data['errorInfo'][0] == '23505') {

                testBlockuiFailedActivationChange23505.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedActivationChange23505.blockuiWrapper('test');

                $('#tt_tree_roles').tree('reload');


            } else {

                testBlockuiFailedActivationChange.blockuiWrapper('option', 'fadeOut', 700);
                testBlockuiFailedActivationChange.blockuiWrapper('test');

                $('#tt_tree_roles').tree('reload');
            }


//                    reloadNodeTarget = $('#tt_tree_roles').tree('getParent', checkedNodes[i].target);
            $('#tt_tree_roles').tree('update', {
                target: actChangeNode.target
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {

            console.log(errorThrown);
            console.log(jqXHR);
            console.log(textStatus);
            console.warn('error text status-->' + textStatus);

//                    console.log('3' + checkedNodes[i]);
            console.log('3' + parent);


            testBlockuiFailedActivationChange.blockuiWrapper('option', 'fadeOut', 700);
            testBlockuiFailedActivationChange.blockuiWrapper('test');

            $('#tt_tree_roles').tree('reload');
        }

    });

    $.unblockUI();
}

/*
 * role activation change rejection function
 * @auhtor: bahram lotfi sadigh
 * @since: 2016.01.18
 */

function activationChangeRejection() {
    response = 'reject';
    console.log(response);

    $('#tt_tree_roles').tree('reload');
    $.unblockUI();
}