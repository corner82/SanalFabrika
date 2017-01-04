$(document).ready(function () {

    /**
     * multilanguage plugin 
     * @type Lang
     */

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#langCode').val());
    
    var nonAttachedTreeLoadImage = $("#notificationContainer").loadSpinner();
    nonAttachedTreeLoadImage.loadSpinner('appendImage');

    window.notificationWidget = $('#notificationContainer').notifications({
        container: $('#notificationWidget')
    });
    window.notificationWidget.notifications({
        onServiceSuccess: function (event, data) {
            /*var elementData = data.element;
             var id = data.id;*/
            //window.deleteServicePrivilegeDialog(id, elementData);
            //console.warn(data.element);
            //console.warn(data.element.attr('attr-notification'));
            //alert('onServiceSucess');  
            nonAttachedTreeLoadImage.loadSpinner('removeLoadImage');

        }
    });

    //window.notificationWidget.notifications('test');
    window.notificationWidget.notifications('getNotifications');

});


$.ajax({
    url:'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
    data:{
        url:'',
        pk:$('#pk').val(),
        language_code: $('#langCode').val()
    },
    type:'GET',
    datatype: 'json',
    success:{
        
    },
    error:{
        
    }
            
});

