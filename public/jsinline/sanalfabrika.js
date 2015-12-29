$(document).ready(function () {
    
    /**
     * Multi language bar is being formed
     * @author Mustafa Zeynel Dağlı
     * @since 23/12/2015
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',              
        data: {
            //pk : '3441df0babc2a2dda551d7cd39fb235bc4e09cd1e4556bf261bb49188f548348',
            url : 'fillComboBox_syslanguage',                          
            },
        method: "GET",
        //async: false,
        dataType: "json",
        success: function (data) {
            var data = data;
            
            $.fn.multiLanguageBarSetter.defaults.requestUriTranslated = $("#requestUriRegulated").val();
            $.fn.multiLanguageBarSetter.defaults.langCode = $("#langCode").val();
            $.fn.multiLanguageBarSetter.defaults.basePath = 'ostim/sanalfabrika';
            $.fn.multiLanguageBarSetter.defaults.baseLanguage = 'tr';
            $(".languages").multiLanguageBarSetter(data); 
            
        }   
    });  
    
    
    /*$('.js-newTab').click(function (event) {
        event.preventDefault();

        var $this = $(this);

        var url = $this.attr("href");
        var windowName = "popUp";
        var windowSize = $this.data("popup");
        //window.open('http://www.pageresource.com/jscript/jex5.htm','mywindow','width=400,height=200,toolbar=yes, location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes, resizable=yes');
        window.open(url, windowName, ''+windowSize+',toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,Sresizable=yes');
    });*/
    //$('#js-newWindow').openNewTab();
    
    $('.js-newTab').testWidget();
});