$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });

    lang.change($('#langCode').val());

//    console.log($('#pk').val());
    $('#loging_ph').empty();

    if ($('#pk').val()) {
        var loging_value = window.lang.translate('Log out');
    } else {
        var loging_value = window.lang.translate('Log in');
    }

    $('#loging_ph').append(loging_value);

   

});

