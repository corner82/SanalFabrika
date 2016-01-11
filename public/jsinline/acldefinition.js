$(document).ready(function () {

    /*
     *  easyui da lazy loading de gereken sayfanin jsinline dosyasinin basina eklensin. 
     *  Aksi takdride, easyui getRoot fonksyonu dogru calismayacaktir.
     */

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
//    console.error("document ready adminIndex.js");


    /*$.getJSON( "http://slim.localhost.com/tezgah.php/getMachineryBySector", function( data ) {
     console.error("zeynel test jsonp");   
     console.warn(data);
     var dataArr = [];
     var catArr = [];
     $("#toplam_header_1_container").headerSetter(data[0]);
     $("#toplam_header_2_container").headerSetter(data[1]);
     $("#toplam_header_3_container").headerSetter(data[2]);
     $("#toplam_header_4_container").headerSetter(data[3]);
     });*/

    /*
     * Author: Abdullah A Almsaeed
     * Date: 4 Jan 2014
     * Description:
     *      This is a demo file used only for the main dashboard (index.html)
     **/
    "use strict";
    // Left menuyu oluşturmak için çağırılan fonksiyon...
    $.fn.leftMenuFunction();

    jQuery("#roleForm").validationEngine();
    jQuery("#resourceForm").validationEngine();
    jQuery("#privelegeForm").validationEngine();



    var selectedRoot;
    var selectedItem;

    $('#tt_tree_roles').tree({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillComboBoxFullRoles_sysAclRoles&pk=' + $("#pk").val(),
        method: 'get',
        animate: true,
        checkbox: true,
        lines: true,
        /*
         * selected boxlari silmek icin
         */
        cascadeCheck: false,
        onDblClick: function (node) {
            $(this).tree('beginEdit', node.target);
            /*
             * 
             * @param {type} node
             *
             * @returns {undefined}
             * edit işlemi
             */
        },
        onClick: function (node) {

            selectedRoot = $(this).tree('getRoot', node.traget);
            selectedItem = $(this).tree('getData', node.target);
//            console.log(selectedRoot.text + ' and ' + selectedItem.text); 
        }
    });



    $('#roleForm').submit(function (e) {
        //e.preventDefault();

        var enteredRoleName = $('#roleName').val();
        var roleDescription = $('#roleDescription').val();
//               
//        var vars = $("#roleForm").serialize();
//        
//        console.log('serlialized ' + vars);

        if ($("#roleForm").validationEngine('validate')) {
            $('#roleFormBlock').block({
                message: '<h1>İşlem yapılıyor..</h1>',
                css: {border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'}
            });

            console.log(selectedRoot.id);
            console.log(selectedItem.id);
            console.log(enteredRoleName);
            console.log(roleDescription);
            $.ajax({
                //url : '../slimProxyEkoOstim/SlimProxyBoot.php', 
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    url: 'pkInsert_sysAclRoles',
                    icon_class: null,
                    start_date: null,
                    end_date: null,
                    parent: selectedRoot.id,
                    root: selectedItem.id,
                    user_id: 0,
                    name: enteredRoleName,
                    description: roleDescription,
                    pk: $("#pk").val(),
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {


                console.log(data);

                    //$('#roleForm').unblock();
                    /*if (data['errorInfo'][0] == '00000') {
                        $.blockUI({
                            message: $('div.growlUI'),
                            fadeIn: 700,
                            fadeOut: 700,
                            timeout: 2000,
                            showOverlay: false,
                            centerY: false,
                            css: {
                                width: '350px',
                                top: '10px',
                                left: '',
                                right: '10px',
                                border: 'none',
                                padding: '5px',
                                backgroundColor: '#000',
                                '-webkit-border-radius': '10px',
                                '-moz-border-radius': '10px',
                                opacity: .6,
                                color: '#fff'
                            }
                        });
                    } else {
                        $.blockUI({
                            message: $('div.growlUI2'),
                            fadeIn: 700,
                            fadeOut: 700,
                            timeout: 2000,
                            showOverlay: false,
                            centerY: false,
                            css: {
                                width: '350px',
                                top: '10px',
                                left: '',
                                right: '10px',
                                border: 'none',
                                padding: '5px',
                                backgroundColor: '#000',
                                '-webkit-border-radius': '10px',
                                '-moz-border-radius': '10px',
                                opacity: .6,
                                color: '#fff'
                            }
                        });
                    }*/
                    return false;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                    console.log(jqXHR);
                    console.log(textStatus);
//                    console.warn('error text status-->' + textStatus);
//                    $('#roleForm').unblock();
//                    $.blockUI({
//                        message: $('div.growlUI2'),
//                        fadeIn: 700,
//                        fadeOut: 700,
//                        timeout: 2000,
//                        showOverlay: false,
//                        centerY: false,
//                        css: {
//                            width: '350px',
//                            top: '10px',
//                            left: '',
//                            right: '10px',
//                            border: 'none',
//                            padding: '5px',
//                            backgroundColor: '#000',
//                            '-webkit-border-radius': '10px',
//                            '-moz-border-radius': '10px',
//                            opacity: .6,
//                            color: '#fff'
//                        }
//                    });
                    return false;
                }
            });

        }
        return false;
    });


    $('#tt_tree_resources').tree({
//        url: '../slimProxyEkoOstim/SlimProxyBoot.php?url=',
//        //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getNaceCodes_nace',
//        //queryParams : { url:'getNaceCodes_nace' },
//        method: 'get',
//        animate: true,
//        checkbox: false,
//        cascadeCheck: false,
    });
    $('#tt_tree_privilege').tree({
//        url: '../slimProxyEkoOstim/SlimProxyBoot.php?',
//        //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getNaceCodes_nace',
//        //queryParams : { url:'getNaceCodes_nace' },
//        method: 'get',
//        animate: true,
//        checkbox: false,
//        cascadeCheck: false,
//        onClick: function (node) {
//            $(this).tree('beginEdit', node.target);
//        }
    });
//    // binds form submission and fields to the validation engine
//    jQuery("#formCompany").validationEngine();
//
//
//    $('#formCompany').submit(function (e) {
//        //e.preventDefault();
//        alert("test");
//        checkedArray = $("#tt_tree_roles").tree("getChecked");
//        console.log(checkedArray);
//        var vars = $("#formCompany").serialize();
//        if ($("#formCompany").validationEngine('validate')) {
//            console.log(vars);
//            alert("test 2 ");
//            /*$.ajax({
//             url:"sample.php"
//             });*/
//
//        }
//        return false;
//    });
});