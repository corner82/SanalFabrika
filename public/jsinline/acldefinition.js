

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

            var id = editNode.id;
            var root = $(this).tree('getRoot', node.target);
//            console.log(beforeEditValue.id);
//            console.log(beforeEditValue.text);
//            console.log('root id' + root.id);
//            console.log(root);
            if (editNode.text === '') {

                $.blockUI({
                    message: $('#growlUI-nullName'),
                    fadeIn: 700,
                    fadeOut: 700,
                    timeout: 2000,
                    showOverlay: true,
                    centerY: true,
                    css: {
                        width: '350px',
                        top: '50px',
                        left: '',
                        right: '10px',
                        border: 'none',
                        padding: '5px',
                        backgroundColor: '#FF0000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .6,
                        color: '#fff'
                    }
                });
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
                $.blockUI({
                    message: $('#growlUI-nameChangeApproval'),
                    fadeIn: 700,
                    fadeOut: 7000,
                    timeout: 2000,
                    showOverlay: true,
                    centerY: false,
                    css: {
                        width: '350px',
                        top: '50px',
                        left: '',
                        right: '10px',
                        border: 'none',
                        padding: '5px',
                        backgroundColor: '#FFA500',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .6,
                        color: '#fff'
                    }
                });
                
                active = editNode.attributes.active;
//                console.log(active);
                console.log('111' + response);
                if (response == 'confirm') {
                    
                    console.log("it is confirmed... response is " + response );

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

                            $('#roleFormBlock').unblock();
                            console.log('errorInfo is ' + data['errorInfo'][0]);
                            if (data['errorInfo'][0] === '00000') {

                                $.blockUI({
                                    message: $('#growlUI-successfulNameChange'),
                                    fadeIn: 700,
                                    fadeOut: 700,
                                    timeout: 2000,
                                    showOverlay: true,
                                    centerY: false,
                                    css: {
                                        width: '350px',
                                        top: '50px',
                                        left: '',
                                        right: '10px',
                                        border: 'none',
                                        padding: '5px',
                                        backgroundColor: '#0080000',
                                        '-webkit-border-radius': '10px',
                                        '-moz-border-radius': '10px',
                                        opacity: .6,
                                        color: '#fff'
                                    }
                                });
                                $('#tt_tree_roles').tree('update', {
                                    target: node.target
                                });
                            } else {
                                console.log('errorInfo is ' + data['errorInfo'][0]);
                                $.blockUI({
                                    message: $('#growlUI-failedNameChange'),
                                    fadeIn: 700,
                                    fadeOut: 700,
                                    timeout: 2000,
                                    showOverlay: true,
                                    centerY: false,
                                    css: {
                                        width: '350px',
                                        top: '50px',
                                        left: '',
                                        right: '10px',
                                        border: 'none',
                                        padding: '5px',
                                        backgroundColor: '#FF0000',
                                        '-webkit-border-radius': '10px',
                                        '-moz-border-radius': '10px',
                                        opacity: .6,
                                        color: '#fff'
                                    }
                                });
                                $('#tt_tree_roles').tree('update', {
                                    target: node.target,
                                    text: beforeEditTextValue
                                });
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(errorThrown);
                            console.log(jqXHR);
//                        console.log(textStatus);
//                        console.warn('error text status-->' + textStatus);
                            $.blockUI({
                                message: $('#growlUI-failedNameChange'),
                                fadeIn: 700,
                                fadeOut: 700,
                                timeout: 2000,
                                showOverlay: true,
                                centerY: false,
                                css: {
                                    width: '350px',
                                    top: '50px',
                                    left: '',
                                    right: '10px',
                                    border: 'none',
                                    padding: '5px',
                                    backgroundColor: '#FF0000',
                                    '-webkit-border-radius': '10px',
                                    '-moz-border-radius': '10px',
                                    opacity: .6,
                                    color: '#fff'
                                }
                            });
                            $('#tt_tree_roles').tree('update', {
                                target: node.target,
                                text: beforeEditTextValue
                            });
                        }
                    });
                } else if(response == 'reject'){
                    console.log('it was rejected ... response is ' + response);
                }
            }
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

    $("#searchForRoles").on('click', searchForRoles);
});


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

/* 
 * @returns {Boolean}
 * Role Tree de yeni role ekleme fonksiyonu
 * Bahram Lotfi Sadigh
 * 2016.01.13
 */

function newRoleSubmission() {
    //e.preventDefault();

    var enteredRoleName = $('#roleName').val();
    var roleDescription = $('#roleDescription').val();

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

        $.blockUI({
            message: $('#growlUI-newRoleSubmitApproval'),
            fadeIn: 700,
            fadeOut: 7000,
            timeout: 2000,
            showOverlay: true,
            centerY: false,
            css: {
                width: '350px',
                top: '50px',
                left: '',
                right: '10px',
                border: 'none',
                padding: '5px',
                backgroundColor: '#0080000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .6,
                color: '#fff'
            }
        });

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
                console.log('errorInfo is ' + data['errorInfo'][0]);
                if (data['errorInfo'][0] === '00000') {
                    $.blockUI({
                        message: $('#growlUI-successfulSubmit'),
                        fadeIn: 700,
                        fadeOut: 7000,
                        timeout: 2000,
                        showOverlay: true,
                        centerY: false,
                        css: {
                            width: '350px',
                            top: '50px',
                            left: '',
                            right: '10px',
                            border: 'none',
                            padding: '5px',
                            backgroundColor: '#0080000',
                            '-webkit-border-radius': '10px',
                            '-moz-border-radius': '10px',
                            opacity: .6,
                            color: '#fff'
                        }
                    });

                } else {

                    console.log('errorInfo is ' + data['errorInfo'][0]);
                    $.blockUI({
                        message: $('#growlUI-failedSubmit'),
                        fadeIn: 700,
                        fadeOut: 700,
                        timeout: 2000,
                        showOverlay: true,
                        centerY: false,
                        css: {
                            width: '350px',
                            top: '50px',
                            left: '',
                            right: '10px',
                            border: 'none',
                            padding: '5px',
                            backgroundColor: '#FF0000',
                            '-webkit-border-radius': '10px',
                            '-moz-border-radius': '10px',
                            opacity: .6,
                            color: '#fff'
                        }
                    });
                }
                return false;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(jqXHR);
                console.log(textStatus);
//                console.warn('error text status-->' + textStatus);
                $('#roleFormBlock').unblock();
                $.blockUI({
                    message: $('#growlUI-failedSubmit'),
                    fadeIn: 700,
                    fadeOut: 700,
                    timeout: 2000,
                    showOverlay: true,
                    centerY: false,
                    css: {
                        width: '350px',
                        top: '50px',
                        left: '',
                        right: '10px',
                        border: 'none',
                        padding: '5px',
                        backgroundColor: '#FF0000',
                        '-webkit-border-radius': '10px',
                        '-moz-border-radius': '10px',
                        opacity: .6,
                        color: '#fff'
                    }
                });
                return false;
            }
        });
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
    var i;

//    console.log('deleteRoleFunction');

    for (i = 0; i < checkedNodes.length; i++) {
        if (confirm('Sure to remove roles ' +
                checkedNodes[i].text + ' ?')) {

//                    console.log("remove");
//                    console.log(checkedNodes[i].text);
            $.blockUI({
                message: $('#growlUI-newRoleSubmitApproval'),
                fadeIn: 700,
                fadeOut: 7000,
                timeout: 2000,
                showOverlay: true,
                centerY: false,
                css: {
                    width: '350px',
                    top: '50px',
                    left: '',
                    right: '10px',
                    border: 'none',
                    padding: '5px',
                    backgroundColor: '#0080000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .6,
                    color: '#fff'
                }
            });


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
                        $.blockUI({
                            message: $('#growlUI-successfulDelete'),
                            fadeIn: 700,
                            fadeOut: 700,
                            timeout: 2000,
                            showOverlay: true,
                            centerY: false,
                            css: {
                                width: '350px',
                                top: '50px',
                                left: '',
                                right: '10px',
                                border: 'none',
                                padding: '5px',
                                backgroundColor: '#0080000',
                                '-webkit-border-radius': '10px',
                                '-moz-border-radius': '10px',
                                opacity: .6,
                                color: '#fff'
                            }
                        });
                    } else {
                        $.blockUI({
                            message: $('#growlUI-failedDelete'),
                            fadeIn: 700,
                            fadeOut: 700,
                            timeout: 2000,
                            showOverlay: true,
                            centerY: false,
                            css: {
                                width: '350px',
                                top: '50px',
                                left: '',
                                right: '10px',
                                border: 'none',
                                padding: '5px',
                                backgroundColor: '#FF0000',
                                '-webkit-border-radius': '10px',
                                '-moz-border-radius': '10px',
                                opacity: .6,
                                color: '#fff'
                            }
                        });
                    }
                    return false;
                },
                error: function (jqXHR, textStatus, errorThrown) {
//                    console.log(errorThrown);
//                    console.log(jqXHR);
//                    console.log(textStatus);
//                    console.warn('error text status-->' + textStatus);
                    $('#roleFormBlock').unblock();

                    $.blockUI({
                        message: $('#growlUI-failedDelete'),
                        fadeIn: 700,
                        fadeOut: 700,
                        timeout: 2000,
                        showOverlay: true,
                        centerY: false,
                        css: {
                            width: '350px',
                            top: '50px',
                            left: '',
                            right: '10px',
                            border: 'none',
                            padding: '5px',
                            backgroundColor: '#FF0000',
                            '-webkit-border-radius': '10px',
                            '-moz-border-radius': '10px',
                            opacity: .6,
                            color: '#fff'
                        }
                    });
                }
            });
        }
    }
}

/* 
 * @returns {Boolean}
 * Role Tree de rol aktif veya pasif degistirme fonksiyonu
 * Bahram Lotfi Sadigh
 * 2016.01.13
 */

function activationChangeFunction() {
    var i;

    for (i = 0; i < checkedNodes.length; i++) {
        if (checkedNodes[i].attributes.active == 0) {
            var active = 1;
            var root = $('#tt_tree_roles').tree('getRoot', checkedNodes[i].target);
//                console.log('root ' + root);

            var rootId = root.id;
//                console.log('rootId ' + rootId);

            var parent = $('#tt_tree_roles').tree('getParent', checkedNodes[i].target);

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

            $.blockUI({
                message: $('#growlUI-activationChangeApproval'),
                fadeIn: 700,
                fadeOut: 700,
                timeout: 2000,
                showOverlay: true,
                centerY: false,
                css: {
                    width: '350px',
                    top: '50px',
                    left: '',
                    right: '10px',
                    border: 'none',
                    padding: '5px',
                    backgroundColor: '#0080000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .6,
                    color: '#fff'
                }
            });

            $.ajax({
                //url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    id: checkedNodes[i].id,
                    url: 'pkUpdate_sysAclRoles',
                    name: checkedNodes[i].text,
                    root: rootId,
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

                    $('#roleFormBlock').unblock();
                    console.log('errorInfo is ' + data['errorInfo'][0]);
                    if (data['errorInfo'][0] === '00000') {
                        $.blockUI({
                            message: $('#growlUI-successfulActivationChange'),
                            fadeIn: 700,
                            fadeOut: 700,
                            timeout: 2000,
                            showOverlay: true,
                            centerY: false,
                            css: {
                                width: '350px',
                                top: '50px',
                                left: '',
                                right: '10px',
                                border: 'none',
                                padding: '5px',
                                backgroundColor: '#0080000',
                                '-webkit-border-radius': '10px',
                                '-moz-border-radius': '10px',
                                opacity: .6,
                                color: '#fff'
                            }
                        });
                    } else {
                        $.blockUI({
                            message: $('#growlUI-failedActivationChange'),
                            fadeIn: 700,
                            fadeOut: 700,
                            timeout: 2000,
                            showOverlay: true,
                            centerY: false,
                            css: {
                                width: '350px',
                                top: '50px',
                                left: '',
                                right: '10px',
                                border: 'none',
                                padding: '5px',
                                backgroundColor: '#FF0000',
                                '-webkit-border-radius': '10px',
                                '-moz-border-radius': '10px',
                                opacity: .6,
                                color: '#fff'
                            }
                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {

                    console.log(errorThrown);
                    console.log(jqXHR);
//                    console.log(textStatus);
//                    console.warn('error text status-->' + textStatus);

                    $.blockUI({
                        message: $('#growlUI-failedActivationChange'),
                        fadeIn: 700,
                        fadeOut: 700,
                        timeout: 2000,
                        showOverlay: true,
                        centerY: false,
                        css: {
                            width: '350px',
                            top: '50px',
                            left: '',
                            right: '10px',
                            border: 'none',
                            padding: '5px',
                            backgroundColor: '#FF0000',
                            '-webkit-border-radius': '10px',
                            '-moz-border-radius': '10px',
                            opacity: .6,
                            color: '#fff'
                        }
                    });
                }
            });
        } else if (checkedNodes[i].attributes.active == 1) {
//                console.log(checkedNodes[i].text + ' is deactivated.');
//                console.log(checkedNodes[i].text + ' has id ' + checkedNodes[i].id);
//                console.log(checkedNodes[i].text + ' has activation code ' + checkedNodes[i].attributes.active);

            var root = $('#tt_tree_roles').tree('getRoot', checkedNodes[i].target);
//                console.log('root ' + root);
            var rootId = root.id;
//                console.log('rootId ' + rootId);

            var parent = $('#tt_tree_roles').tree('getParent', checkedNodes[i].target);

            if (parent == null) {
                parentId = 0;
//                    console.log('parent ' + parentId);
            } else {
                parentId = parent.id;
//                    console.log('parent ' + parentId);
            }
            var active = 0;

            $.blockUI({
                message: $('#growlUI-activationChangeApproval'),
                fadeIn: 700,
                fadeOut: 700,
                timeout: 2000,
                showOverlay: true,
                centerY: false,
                css: {
                    width: '350px',
                    top: '50px',
                    left: '',
                    right: '10px',
                    border: 'none',
                    padding: '5px',
                    backgroundColor: '#0080000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .6,
                    color: '#fff'
                }
            });


            $.ajax({
                //url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    id: checkedNodes[i].id,
                    url: 'pkUpdate_sysAclRoles',
                    name: checkedNodes[i].text,
                    root: rootId,
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
                    $('#roleFormBlock').unblock();
                    console.log('errorInfo is ' + data['errorInfo'][0]);
                    if (data['errorInfo'][0] === '00000') {
                        $.blockUI({
                            message: $('#growlUI-successfulActivationChange'),
                            fadeIn: 700,
                            fadeOut: 700,
                            timeout: 2000,
                            showOverlay: true,
                            centerY: false,
                            css: {
                                width: '350px',
                                top: '50px',
                                left: '',
                                right: '10px',
                                border: 'none',
                                padding: '5px',
                                backgroundColor: '#0080000',
                                '-webkit-border-radius': '10px',
                                '-moz-border-radius': '10px',
                                opacity: .6,
                                color: '#fff'
                            }
                        });
                    } else {
                        $.blockUI({
                            message: $('#growlUI-failedActivationChange'),
                            fadeIn: 700,
                            fadeOut: 700,
                            timeout: 2000,
                            showOverlay: true,
                            centerY: false,
                            css: {
                                width: '350px',
                                top: '50px',
                                left: '',
                                right: '10px',
                                border: 'none',
                                padding: '5px',
                                backgroundColor: '#FF0000',
                                '-webkit-border-radius': '10px',
                                '-moz-border-radius': '10px',
                                opacity: .6,
                                color: '#fff'
                            }
                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                    console.log(jqXHR);
//                    console.log(textStatus);
//                    console.warn('error text status-->' + textStatus);
                    $.blockUI({
                        message: $('#growlUI-failedActivationChange'),
                        fadeIn: 700,
                        fadeOut: 700,
                        timeout: 2000,
                        showOverlay: true,
                        centerY: false,
                        css: {
                            width: '350px',
                            top: '50px',
                            left: '',
                            right: '10px',
                            border: 'none',
                            padding: '5px',
                            backgroundColor: '#FF0000',
                            '-webkit-border-radius': '10px',
                            '-moz-border-radius': '10px',
                            opacity: .6,
                            color: '#fff'
                        }
                    });
                }
            });
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

var response;

function confirmation() {
    response = 'confirm';
    console.log(response);
    return true;
}

function rejection() {
    response = 'reject';
    console.log(response);
    return false;
}