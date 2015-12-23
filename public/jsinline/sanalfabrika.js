$(document).ready(function () {

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',              
        data: {
            parent: 0,
            pk : '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url : 'fillComboBox_syslanguage',
            language_id: 647                           
            },
        method: "GET",
        async: false,
        dataType: "json",
        success: function (data) {
            var data = data;
            $(".languages").multiLanguageBarSetter(data);     
        }   
    });
});