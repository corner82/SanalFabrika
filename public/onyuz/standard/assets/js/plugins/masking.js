var Masking = function () {

    return {
        //Masking
        initMasking: function () {
            $("#date1").mask('99/99/9999', {placeholder: 'X'});
            $("#phone").mask('(999) 999-9999', {placeholder: 'X'});
            $("#card").mask('9999-9999-9999-9999', {placeholder: 'X'});
            $("#serial").mask('***-***-***-***-***-***', {placeholder: '_'});
            $("#tax").mask('99-9999999', {placeholder: 'X'});
            $("#userPostalCode").mask('99999', {placeholder: 'X'});
            $("#userPhone").mask('(999) 999-9999', {placeholder: 'X'});
            $("#userGSM").mask('(999) 999-9999', {placeholder: 'X'});
            $("#userFax").mask('(999) 999-9999', {placeholder: 'X'});
            
            if(selectedCountry == 'Turkey'){
                
            }


            $("#companyTaxNumber").mask('9999999999', {placeholder: 'X'});
            if (selectedCountry == 'Turkey') {
                
                
            }
        }

    };

}();