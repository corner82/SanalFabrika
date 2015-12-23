/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            pk: '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url: 'fillComboBox_syscountrys',
            language_id: 647

        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {
                    var appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newappendingOption = $(appending_option_html);
                    $(newappendingOption).appendTo($("#country1"));

//                    $(newappendingOption).on("click", function (event) {

//                    });

                    var appending_option_html_2 = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newappendingOption_2 = $(appending_option_html_2);
                    $(newappendingOption_2).appendTo($("#country2"));

//                    $(newappendingOption).on("click", function (event) {

//                    });
                }
            }
        }
    });

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            parent: 0,
            pk: '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url: 'getLeftMenu_leftnavigation',
            language_id: 647
        },
        method: "GET",
        async: false,
        dataType: "json",
        success: function (data) {

            var len = data.length;
            var i = 0;
            for (i; i < len; i++) {

                if (data[i].collapse === 0) {

                    var appending_html = "<li id='menu_" +
                            data[i].id + "'><a href='" +
                            data[i].url + "'><i class='fa " +
                            data[i].icon_class + "'></i>" +
                            data[i].menu_name + "</a></li>";

                    var newappend = $(appending_html);

                } else {

                    var appending_html = "<li class='treeview' id='menu_" +
                            data[i].id + "'><a href='" +
                            data[i].url + "'><i class='fa " +
                            data[i].icon_class + "'></i><span>" +
                            data[i].menu_name +
                            "</span><i class='fa fa-angle-left pull-right'></i></a></li>";

                    var newappend = $(appending_html);
                }

                $(newappend).appendTo($("#leftside-menu"));
                $(newappend).on("click", function (event) {

                    //alert(event.target);
                    //alert(this);
                    $.AdminLTE.dynamicTree(this);
                });

                newappend = null;
            }
        }
    });

    $(function () {
        //Initialize Select2 Elements
        $(".select2").select2();

        //Datemask dd/mm/yyyy
        $("#datemask").inputmask("dd/mm/yyyy", {"placeholder": "dd/mm/yyyy"});
        //Datemask2 mm/dd/yyyy
        $("#datemask2").inputmask("mm/dd/yyyy", {"placeholder": "mm/dd/yyyy"});
        //Money Euro
        $("[data-mask]").inputmask();

        //Date range picker
        $('#reservation').daterangepicker();
        //Date range picker with time picker
        $('#reservationtime').daterangepicker({timePicker: true, timePickerIncrement: 30, format: 'MM/DD/YYYY h:mm A'});
        //Date range as a button
        $('#daterange-btn').daterangepicker(
                {
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                    },
                    startDate: moment().subtract(29, 'days'),
                    endDate: moment()
                },
        function (start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
        );
    });

    $(function () {

        var currentpath = window.location.pathname;
        var pathArray = window.location.pathname.split( '/' );        
        console.log('request path array is: ' + pathArray);
        
//        currentpath = currentpath.replace(/\/$/, "");
//        currentpath = decodeURIComponent(currentpath);
//        currentpath = 'http://www.sanalfabrika.bahram.com:9990' + currentpath;

//        console.log(currentpath);

        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//            url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
            data: {
                pk: '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
                url: 'getLeftMenuFull_leftnavigation',
                language_id: 647
            },
            method: "GET",
            async: false,
            dataType: "json",
            success: function (data) {
//                console.log(data);
                var i;
                if (data[i] === null) {
                    console.log('it is empty');
                } else {
                    for (i = 0; i < data.length; i++) {
                        if (currentpath === data[i].uri) {
                            console(data[i].id, data[i].menu_name, data[i].url);                            

                        } else {
//                            console.log(data[i].id);
//                            console.log(data[i].menu_name);
//                            console.log(currentpath);
//                            console.log(data[i].url);
//                            console.log('empty' + data[i].menu_name , data[i].url);
                        }
                    }
                }
            }
        });
    });
});

$("select#country1").on('change', function () {

    var selectedCountry1 = $('#country1 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedCountry1Id = $('#country1 :selected').val();

    $("#city1").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            pk: '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url: 'fillComboBox_syscity',
            country_id: selectedCountry1Id,
            language_id: 647
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var city_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newcityappendingOption = $(city_appending_option_html);
                    $(newcityappendingOption).appendTo($("#city1"));

//                    $(newappendingOption).on("click", function (event) {

//                    });

                }
            }
        }
    });
});

$("select#country2").on('change', function () {

    var selectedCountry2 = $('#country2 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedCountry2Id = $('#country2 :selected').val();

    $("#city2").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            pk: '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url: 'fillComboBox_syscity',
            country_id: selectedCountry2Id,
            language_id: 647
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var city_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newcityappendingOption = $(city_appending_option_html);
                    $(newcityappendingOption).appendTo($("#city2"));
//                    $(newappendingOption).on("click", function (event) {
//                    
//                    });
                }
            }
        }
    });
});




