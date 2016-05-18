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


    /*
     * Left menuyu oluÅŸturmak iÃ§in Ã§aÄŸÄ±rÄ±lan fonksiyon...
     */

    $.fn.leftMenuFunction();

    window.sel_count_id;
    window.sel_comp_count_id;
    window.cityList;
    window.boroughList;

    /*
     * Bootstrap modals variables
     * @type @call;$@call;successMessage
     */

    $("#new_mt_details_form").validationEngine({promptPosition: "topLeft:100%,0"});

    var sm = $(window).successMessage();
    var dm = $(window).dangerMessage();
    var wm = $(window).warningMessage();
    var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
        actionButtonLabel: window.lang.translate('Confirm')});

    



});


var sm = $(window).successMessage();
var dm = $(window).dangerMessage();
var wm = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({denyButtonLabel: 'VazgeÃ§',
    actionButtonLabel: 'Ä°ÅŸleme devam et'});

/*
 * hides hidden sections of all tabs
 */

function hide_hidden_sections() {

    $('#hidden_send_ref').css('display', 'none');
    $('#hidden_send_ref').css('visibility', 'hidden');

    $('#sel_customer').val('');
    if ($('#hidden_send_ref').css('visibility') === 'hidden') {
        $('html, body').animate({
            scrollTop: $(".box-title").offset().top
        }, 1000);
    }
}
