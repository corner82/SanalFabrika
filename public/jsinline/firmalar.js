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
//            pk: '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url: 'getLeftMenu_leftnavigation',
            language_code: $("#langCode").val()
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

$("select#city1").on('change', function () {

    var selectedCity1 = $('#city1 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedCity1Id = $('#city1 :selected').val();
    var selectedCountry1Id = $('#country1 :selected').val();

    $("#district1").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            pk: '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url: 'fillComboBox_sysborough',
            country_id: selectedCountry1Id,
            city_id: selectedCity1Id,
            language_id: 647
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var district_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newdistrictappendingOption = $(district_appending_option_html);
                    $(newdistrictappendingOption).appendTo($("#district1"));

//                    $(newappendingOption).on("click", function (event) {

//                    });

                }
            }
        }
    });
});

$("select#city2").on('change', function () {

    var selectedCity2 = $('#city2 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedCity2Id = $('#city2 :selected').val();
    var selectedCountry2Id = $('#country2 :selected').val();

    $("#district2").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            pk: '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url: 'fillComboBox_sysborough',
            country_id: selectedCountry2Id,
            city_id: selectedCity2Id,
            language_id: 647
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var district_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newdistrictappendingOption = $(district_appending_option_html);
                    $(newdistrictappendingOption).appendTo($("#district2"));

//                    $(newappendingOption).on("click", function (event) {

//                    });

                }
            }
        }
    });
});

$("select#district1").on('change', function () {

    var selectedDistrict1 = $('#district1 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedDistrict1Id = $('#district1 :selected').val();
    var selectedCity1Id = $('#city1 :selected').val();
    var selectedCountry1Id = $('#country1 :selected').val();

    $("#village1").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            pk: '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url: 'fillComboBox_sysvillage',
            country_id: selectedCountry1Id,
            city_id: selectedCity1Id,
            boroughs_id: selectedDistrict1Id,
            language_id: 647
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var district_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newdistrictappendingOption = $(district_appending_option_html);
                    $(newdistrictappendingOption).appendTo($("#village1"));

//                    $(newappendingOption).on("click", function (event) {

//                    });
                }
            }
        }
    });
});

$("select#district2").on('change', function () {

    var selectedDistrict2 = $('#district2 option:selected');
//    console.log($('#country1 :selected').text()); 
//    console.log($('#country1 :selected').val());
    var selectedDistrict2Id = $('#district2 :selected').val();
    var selectedCity2Id = $('#city2 :selected').val();
    var selectedCountry2Id = $('#country2 :selected').val();

    $("#village2").empty();

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//        url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            pk: '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url: 'fillComboBox_sysvillage',
            country_id: selectedCountry1Id,
            city_id: selectedCity1Id,
            boroughs_id: selectedDistrict1Id,
            language_id: 647
        },
        method: "GET",
        dataType: "json",
        success: function (data) {

            var i;

            for (i = 0; i < data.length; i++) {
                if (data[i].name === null) {

                } else {

                    var district_appending_option_html = "<option value = '" + data[i].id + "' >" +
                            data[i].name +
                            "</option>";
                    var newdistrictappendingOption = $(district_appending_option_html);
                    $(newdistrictappendingOption).appendTo($("#village2"));

//                    $(newappendingOption).on("click", function (event) {

//                    });
                }
            }
        }
    });
});



