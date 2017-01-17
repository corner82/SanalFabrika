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

//        $('#setting_link_a').attr('href', '');

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
                    if (data[0].user_picture) {
                        $('#user_image_ph').css('display', '');
                        $('#user_image_ph').css('visibility', 'visible');
                        $('#user_image_ph').attr('src', 'https://' + window.location.host + '/onyuz/standard/assets/img/sfClients/' + data[0].user_picture);
                        $('#user_name').append(data[0].name + ' ' + data[0].surname);
                        $('#icon_ph').css('display', 'none');
                        $('#icon_ph').css('visibility', 'hidden');
                        $('#user_image_ph_hover').css('display', '');
                        $('#user_image_ph_hover').css('visibility', 'visible');
                        $('#user_image_ph_hover').attr('src', 'https://' + window.location.host + '/onyuz/standard/assets/img/sfClients/' + data[0].user_picture);
                    
                    } else {
                        $('#user_image_ph').css('display', 'none');
                        $('#user_image_ph').css('visibility', 'hidden');
                        $('#user_name').append("<i class='fa fa-user'>  </i>  " + data[0].name + ' ' + data[0].surname);                        
                        $('#user_image_ph_hover').css('display', 'none');
                        $('#user_image_ph_hover').css('visibility', 'hidden');
                        $('#icon_ph').css('display', '');
                        $('#icon_ph').css('visibility', 'visible');
                        $('#user_image_ph_hover').css('display', 'none');
                        $('#user_image_ph_hover').css('visibility', 'hidden');
                        $('#user_image_ph_hover').append('');
                        
                    }
//                    $('#user_name').append("<i class='fa fa-user'></i>" + data[0].name + ' ' + data[0].surname);
                    $('#user_name_hover').append(data[0].name + ' ' + data[0].surname);
                    $('#user_membership').append(data[0].mem_type);
                    $('#user_reg_date').append(data[0].registration_date);
                    $('#user_profile_link').attr('unpk', data[0].unpk);
                    $('#membership_tag').attr('src', 'https://' + window.location.host + '/onyuz/standard/assets/img/sfSystem/' + data[0].mem_logo)
//                    $('#setting_link_a').attr('href',
//                            'https://' +
//                            window.location.host +
//                            '/' +
//                            $('#langCode').val() +
//                            '/ostim/sanalfabrika/cpgenelset' +                            
//                            data[0].firm_name_short +
//                            '/' +
//                            data[0].npk);

                } else {
                    console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('"pkGetUserShortInformation_infoUsers" servis hatasÃ„Â±->' + textStatus);
            }
        });

        /*
         * User companies list
         */
        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'pkGetUserCompanyShortInformation_infoFirmProfile',
                language_code: $("#langCode").val(),
                pk: $('#pk').val()
            },
            type: 'GET',
            dataType: 'json',
            //data: 'rowIndex='+rowData.id,
            success: function (data, textStatus, jqXHR) {
                if (data.rows.length !== 0) {
                    $('#topCompaniesBar_div').empty();
                    for (var i = 0; i < data.rows.length; i++) {
                        var company_link = "https://" + window.location.host + "/" + $('#langCode').val() +
                                "/ostim/sanalfabrika/companyprofile/" + data.rows[i].folder_name + "/" + data.rows[i].npk;

                        var appending =
                                "<li style ='text-align: center;" +
                                "vertical-align: middle; line-height: 40px;'>" +
                                "<a href='" + company_link + "'>" +
                                "<img style='float:left; padding-right:20px;max-height:40px' src='" +
                                "https://" + window.location.host +
                                "/onyuz/standard/assets/img/sfClients/" +
                                data.rows[i].logo + "'></img>" +
                                data.rows[i].network_name +
                                "</a></li>";

                        $('#topCompaniesBar_div').append(appending);

                        $('#no_sub_company').css('visibility', 'hidden');
                        $('#no_sub_company').css('display', 'none');
                    }
                } else {
                    $('#no_sub_company').css('visibility', 'visible');
                    $('#no_sub_company').css('display', '');
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

