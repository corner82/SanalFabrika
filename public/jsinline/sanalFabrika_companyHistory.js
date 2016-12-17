$(document).ready(function () {

    window.i = 0;

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());
    
    $('#header_company_name').empty();
    $('#header_company_name').append("<i class='fa fa-user'></i>" + $('#selectedCompanyShN').val().toUpperCase());


    
    $('#loging_ph').empty();

    if ($('#pk').val()) {
        var loging_value = window.lang.translate('Log out');
    } else {
        var loging_value = window.lang.translate('Log in');
    }
    $('#loging_ph').append(loging_value);

    

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {url: 'getFirmLogo_infoFirmProfile',
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            
            var imageFolAddress = 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/';
            window.logosrc = imageFolAddress + data.resultSet[0].logo;
            $('#profileLogosrc').attr('src', window.logosrc);
//            $('#logoPlace1').attr('src', window.logosrc);
        }
    });

    
    window.notificationWidget = $('#notificationContainer').notifications({
        container : $('#notificationWidget')
    });
    window.notificationWidget.notifications({ 
        onServiceSuccess : function(event, data) {
            /*var elementData = data.element;
            var id = data.id;*/
            //window.deleteServicePrivilegeDialog(id, elementData);
            console.warn(data.element);
            console.warn(data.element.attr('attr-notification'));
            alert('onServiceSucess');
            
        }  
     });
    
    //window.notificationWidget.notifications('test');
    
    var nonAttachedTreeLoadImage = $("#notificationContainer").loadSpinner();
    nonAttachedTreeLoadImage.loadSpinner('appendImage');
    
    var testLoadImage = $("#bannerWidget").loadSpinner();
    testLoadImage.loadSpinner('appendImage');
    
    
    
});