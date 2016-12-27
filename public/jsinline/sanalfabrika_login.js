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
    
//    console.log($('#langCode').val());
    
    $("#userLoginForm").validationEngine({promptPosition : "topLeft"}); 
});