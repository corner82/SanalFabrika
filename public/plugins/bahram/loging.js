/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    /*
     * Checking pk value for login and logout actions
     * Also checks setting link availabiliy
     */
    if (!$('#pk').val()) {
        $('#login_place').css('visibility', 'visible');
        $('#login_place').css('display', '');
        $('#logout_place').css('visibility', 'hidden');
        $('#logout_place').css('display', 'none');

        $('#setting_link').css('visibility', 'hidden');
        $('#setting_link_divider').css('visibility', 'hidden');
        $('#setting_link').css('display', 'none');
        $('#setting_link_divider').css('display', 'none');

        $('#setting_link_a').attr('href', '');

        $('#user_profile_link').css('visibility', 'hidden');
        $('#user_profile_link_divider').css('visibility', 'hidden');
        $('#user_profile_link').css('display', 'none');
        $('#user_profile_link_divider').css('display', 'none');

    } else {
        $('#login_place').css('visibility', 'hidden');
        $('#login_place').css('display', 'none');
        $('#logout_place').css('visibility', 'visible');
        $('#logout_place').css('display', '');

        /*
         * User name on toolbar
         */
        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'pkGetUserShortInformation_infoUsers',
                language_code: $("#langCode").val(),
                pk: $('#pk').val()
            },
            type: 'GET',
            dataType: 'json',
            //data: 'rowIndex='+rowData.id,
            success: function (data, textStatus, jqXHR) {
                if (data.length !== 0) {
                    $('#user_name').empty();
                    $('#user_name_hover').empty();
                    $('#user_membership').empty();
                    $('#user_reg_date').empty();

                    $('#user_image_ph').attr('src', 'https://' + window.location.host + '/onyuz/standard/assets/img/sfClients/' + data[0].user_picture);
                    $('#user_name').append(data[0].name + ' ' + data[0].surname);
                    $('#user_image_ph_hover').attr('src', 'https://' + window.location.host + '/onyuz/standard/assets/img/sfClients/' + data[0].user_picture);
                    $('#user_name_hover').append(data[0].name + ' ' + data[0].surname);
                    $('#user_membership').append(data[0].mem_type);
                    $('#user_reg_date').append(data[0].registration_date);
                    $('#user_profile_link').attr('unpk', data[0].unpk);

                    $('#setting_link_a').attr('href',
                            'https://' +
                            window.location.host +
                            '/' +
                            $('#langCode').val() +
                            '/ostim/sanalfabrika/cpgenelset' +                            
                            data[0].firm_name_short +
                            '/' +
                            data[0].npk);

                } else {
                    console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('"pkGetUserShortInformation_infoUsers" servis hatasÃ„Â±->' + textStatus);
            }
        });

        $('#setting_link').css('visibility', 'visible');
        $('#setting_link_divider').css('visibility', 'visible');
        $('#setting_link').css('display', '');
        $('#setting_link_divider').css('display', '');

        $('#user_profile_link').css('visibility', 'visible');
        $('#user_profile_link_divider').css('visibility', 'visible');
        $('#user_profile_link').css('display', '');
        $('#user_profile_link_divider').css('display', '');

    }
});

