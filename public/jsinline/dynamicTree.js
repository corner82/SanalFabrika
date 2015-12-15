$(document).ready(function () {

        $.ajax({
            url: '../../../slimProxyEkoOstim/SlimProxyBoot.php?url=getLeftMenu_navigationBar',
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