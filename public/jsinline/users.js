$(document).ready(function () {

//    console.error("document ready adminIndex.js");

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