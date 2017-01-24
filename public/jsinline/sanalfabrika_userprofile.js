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
 * user information
 */
$.ajax({
    url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
    data: {
        url: 'pkFillUsersProfileInformation_infoUsers',
        language_code: $("#langCode").val(),
        pk: $('#pk').val(),
        unpk: $('#unpk').val()
    },
    type: 'GET',
    dataType: 'json',
    //data: 'rowIndex='+rowData.id,
    success: function (data, textStatus, jqXHR) {        
        if (data.rows.length > 0) {
            $('#name').empty();
            $('#surname').empty();
            $('#pref_lang').empty();

            $('#user_name_breadcrumbs').empty();

            $('#name').append(data.rows[0].name);
            $('#surname').append(data.rows[0].surname);
            $('#regdate').append(data.rows[0].registration_date);
            $('#pref_lang').append(data.rows[0].preferred_language_name);

            $('#user_name_breadcrumbs').append("<i class='fa fa-user'></i>" + data.rows[0].name + " " + data.rows[0].surname);

            if (data.rows[0].picture) {
                $('#user_prof_pic').css('display', '');
                $('#user_prof_pic').css('visibility', 'visible');
                $('#user_prof_pic').attr('src', 'https://' + window.location.host + "/onyuz/standard/assets/img/sfClients/" + data.rows[0].picture);
                $('#user_prof_ico').css('display', 'none');
                $('#user_prof_ico').css('visibility', 'hidden');
            } else {
                $('#user_prof_pic').css('display', 'none');
                $('#user_prof_pic').css('visibility', 'hidden');
                $('#user_prof_ico').css('display', '');
                $('#user_prof_ico').css('visibility', 'visible');
            }
        } else {
            console.log('"pkFillUsersProfileInformation_infoUsers" servis datasi bostur!!');
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"pkFillUsersProfileInformation_infoUsers" servis hatasÃ„Â±->' + textStatus);
    }
});

/*
 * company information
 */
$.ajax({
    url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
    data: {
        url: 'pkFillUserFirmInformation_infoFirmProfile',
        language_code: $("#langCode").val(),
        pk: $('#pk').val(),
        unpk: $('#unpk').val()
    },
    type: 'GET',
    dataType: 'json',
    //data: 'rowIndex='+rowData.id,
    success: function (data, textStatus, jqXHR) {
        if (data.rows.length !== 0) {

            $('#company_name').empty();
            $('#position').empty();

            $('#company_name').append(data.rows[0].firm_name);
            $('#position').append(data.rows[0].title);


        } else {
            console.log('"pkFillUserFirmInformation_infoFirmProfile" servis datasi bostur!!');
        }
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('"pkFillUserFirmInformation_infoFirmProfile" servis hatasÃ„Â±->' + textStatus);
    }
});
