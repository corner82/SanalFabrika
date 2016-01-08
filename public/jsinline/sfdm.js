$(document).ready(function () {

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


    jQuery("#resourceForm").validationEngine();
    jQuery("#privelegeForm").validationEngine();


    $('#tt_tree_roles').tree({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillComboBoxFullRoles_sysAclRoles&pk=' + $("#pk").val(),
        //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getNaceCodes_nace',
        //queryParams : { url:'getNaceCodes_nace' },
        method: 'get',
        animate: true,
        checkbox: false,
        cascadeCheck: false,
        onDblClick: function (node) {
            $(this).tree('beginEdit', node.target);

        },
        onClick: function (node) {
                    alert(node.text);  // alert node text property when clicked
                    if(node.getParent.text=== node.text){
                        
                    }
                }
            });
        


    $('#tt_tree_resources').tree({
        url: '../slimProxyEkoOstim/SlimProxyBoot.php?url=',
        //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getNaceCodes_nace',
        //queryParams : { url:'getNaceCodes_nace' },
        method: 'get',
        animate: true,
        checkbox: false,
        cascadeCheck: false,
    });

    $('#tt_tree_privilege').tree({
        url: '../slimProxyEkoOstim/SlimProxyBoot.php?',
        //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getNaceCodes_nace',
        //queryParams : { url:'getNaceCodes_nace' },
        method: 'get',
        animate: true,
        checkbox: false,
        cascadeCheck: false,
        onClick: function (node) {
            $(this).tree('beginEdit', node.target);
        }
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