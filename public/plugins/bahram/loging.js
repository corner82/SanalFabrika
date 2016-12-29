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

    } else {
        $('#login_place').css('visibility', 'hidden');
        $('#login_place').css('display', 'none');
        $('#logout_place').css('visibility', 'visible');
        $('#logout_place').css('display', '');

        $('#setting_link').css('visibility', 'visible');
        $('#setting_link_divider').css('visibility', 'visible');
        $('#setting_link').css('display', '');
        $('#setting_link_divider').css('display', '');

    }
});

