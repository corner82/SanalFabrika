$(document).ready(function () {

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });



});


function first_cat_sel(selected) {
//    console.log(selected.selectedIndex);
//    console.log(selected.value);

    if (selected.selectedIndex !== null) {

        $('#sec_lev_cat').css('visibility', 'visible');
        $('#sec_lev_cat').css('display', 'block');        
        $("#sec_lev_cat").fadeIn("slow");
        
        $('#thi_lev_cat').css('visibility', 'hidden');
        $('#thi_lev_cat').css('display', 'none');        
        $("#thi_lev_cat").fadeOut("slow");
        
        $('#for_lev_cat').css('visibility', 'hidden');
        $('#for_lev_cat').css('display', 'none');        
        $("#for_lev_cat").fadeOut("slow");
        
        $("#sec_lev_cat_label").empty();
        $("#sec_lev_cat_label").append(selected.value);

    }else{
        $('#sec_lev_cat').css('visibility', 'hidden');
        $('#sec_lev_cat').css('display', 'none');        
        $("#sec_lev_cat").fadeOut("slow");
        
        $('#thi_lev_cat').css('visibility', 'hidden');
        $('#thi_lev_cat').css('display', 'none');        
        $("#thi_lev_cat").fadeOut("slow");
        
        $('#for_lev_cat').css('visibility', 'hidden');
        $('#for_lev_cat').css('display', 'none');        
        $("#for_lev_cat").fadeOut("slow");
    }
}

function sec_cat_sel(selected) {
//    console.log(selected.selectedIndex);
//    console.log(selected.value);

    if (selected.selectedIndex !== null) {

        $('#thi_lev_cat').css('visibility', 'visible');
        $('#thi_lev_cat').css('display', 'block');        
        $("#thi_lev_cat").fadeIn("slow");        
        
        $('#for_lev_cat').css('visibility', 'hidden');
        $('#for_lev_cat').css('display', 'none');        
        $("#for_lev_cat").fadeOut("slow");
        
        $("#thi_lev_cat_label").empty();
        $("#thi_lev_cat_label").append(selected.value);

    }else{
        $('#thi_lev_cat').css('visibility', 'hidden');
        $('#thi_lev_cat').css('display', 'none');        
        $("#thi_lev_cat").fadeOut("slow");
        
        $('#for_lev_cat').css('visibility', 'hidden');
        $('#for_lev_cat').css('display', 'none');        
        $("#for_lev_cat").fadeOut("slow");
    }
}


function third_cat_sel(selected) {
//    console.log(selected.selectedIndex);
//    console.log(selected.value);

    if (selected.selectedIndex !== null) {

        $('#for_lev_cat').css('visibility', 'visible');
        $('#for_lev_cat').css('display', 'block');        
        $("#for_lev_cat").fadeIn("slow");
        
        $("#for_lev_cat_label").empty();
        $("#for_lev_cat_label").append(selected.value);

    }else{
        $('#for_lev_cat').css('visibility', 'hidden');
        $('#for_lev_cat').css('display', 'none');        
        $("#for_lev_cat").fadeOut("slow");
    }
}