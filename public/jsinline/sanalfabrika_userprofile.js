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


/*
         * User name on toolbar
         */
        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'pkFillUsersProfileInformation_infoUsers',
                language_code: $("#langCode").val(),
                pk: $('#pk').val()
            },
            type: 'GET',
            dataType: 'json',
            //data: 'rowIndex='+rowData.id,
            success: function (data, textStatus, jqXHR) {
                if (data.length !== 0) {
                    
                    $('#name').empty();
                    $('#surname').empty();
                    $('#pref_lang').empty();
                    
                    console.log(data.rows[0]);
                    
                    $('#name').append(data.rows[0].name);                    
                    $('#surname').append(data.rows[0].surname);        
                    $('#regdate').append(data.rows[0].registration_date);                
                    $('#pref_lang').append(data.rows[0].preferred_language_name);
                                    

                } else {
                    console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('"pkGetUserShortInformation_infoUsers" servis hatasÃ„Â±->' + textStatus);
            }
        });

