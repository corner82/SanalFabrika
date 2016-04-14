$(document).ready(function () {

    window.i = 0;
    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
//    console.log($('#selectedCompanyNpk').val());
    

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {
            url: 'fillCompanyInfoEmployeesGuest_infoFirmProfile',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);
            var imageFolAddress = 'https://' + window.location.hostname + '/onyuz/standard/assets/img/sfClients/logos/';
                                
            window.logosrc = imageFolAddress + data[0].logo;
            
            $('#profileLogosrc').attr('src', window.logosrc);
        }
    });
    /*
     * Products categories and category products service
     *
     *
     * 
     *
     $.ajax({
     url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
     //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
     data: {
     url: '',
     language_code: $("#langCode").val(),
     npk: $('#selectedCompanyNpk').val()
     },
     method: "GET",
     dataType: "json",
     success: function (data) {
     //      console.log(data);
     if (data.length !== null) {
     var prod_cat_num;
     for (prod_cat_num = 0; prod_cat_num < data.category.length; prod_cat_num++) {
     if (prod_cat_num === 0) {
     var cat_tab_id = data[prod_cat_num].product_category_name.replace(/\s/g, '_');
     var appending =
     "<li class='active'><a href='#"
     + cat_tab_id
     + "' data-toggle='tab'>"
     + data[prod_cat_num].product_category_name
     + "</a></li>";
     $('#products_nav_tabs').append(appending);
     }else if (prod_cat_num > 0){
     var appending =
     "<li><a href="
     + cat_tab_id
     + " data-toggle='tab'>"
     + data[prod_cat_num].product_category_name
     + "</a></li>";
     $('#products_nav_tabs').append(appending);
     }
     }
     
     
     }
     }
     });
     */

    /*
     * Create list of products for each category service
     */

    var dataSet = [
        ["Product A", "Category A", "Customer A", "Yes", "$ 250.00", "Order Now"],
        ["Product B", "Category A", "Customer B", "No", "$ 420.00", "Order Now"],
        ["Product C", "Category B", "Customer E", "Yes", "Contact Company", "Order Now"],
        ["Product D", "Category C", "Customer G", "No", "$ 1035.00", "Order Now"],
        ["Product E", "Category A", "Customer A", "No", "$ 270.00", "Order Now"],
        ["Product F", "Category A", "Customer B", "No", "$ 200.00", "Order Now"],
        ["Product G", "Category B", "Customer E", "Yes", "Contact Company", "Order Now"],
        ["Product H", "Category C", "Customer G", "No", "$ 1543.00", "Order Now"],
        ["Product I", "Category A", "Customer Y", "Yes", "$ 250.00", "Order Now"],
        ["Product J", "Category A", "Customer A", "No", "$ 420.00", "Order Now"],
        ["Product K", "Category B", "Customer X", "Yes", "Contact Company", "Order Now"],
        ["Product L", "Category C", "Customer Q", "No", "$ 1035.00", "Order Now"],
        ["Product M", "Category A", "Customer T", "No", "$ 270.00", "Order Now"],
        ["Product N", "Category A", "Customer B", "No", "$ 200.00", "Order Now"],
        ["Product O", "Category B", "Customer E", "Yes", "Contact Company", "Order Now"],
        ["Product P", "Category C", "Customer G", "No", "$ 1543.00", "Order Now"]
    ];
    $('#product_table').DataTable({
        data: dataSet,
        fixedColumns: true,
        scrollX: true,
        select: {
            style: 'single'
        },
        columns: [
            {title: "Product"},
            {title: "Category"},
            {title: "Customer"},
            {title: "Finished Good"},
            {title: "Price"},
            {title: "Order"}
        ]
    });
    window.table = $('#product_table').DataTable();
    $('#product_table tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            window.table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }

        var selectedRowIndex = $(this)[0]._DT_RowIndex;
        this.style.color = '#72c02c';
        var d = window.table.row(this).data();
        /*
         * 
         * @type type
         * ajxa request to get product properties should be added here...
         * for now a properties array is created...
         */
        var properties = [
            {key: 'name', value: 'product_name'},
            {key: 'code', value: 'product_code'},
            {key: 'prop 1', value: 'product_prop1'},
            {key: 'prop 2', value: 'product_prop2'}
        ];
        if ($('#product_details_DIV').css('visibility') === 'hidden') {

            $('#product_details_DIV').empty();

            var appending = "<div class='left-inner'>"
                    + "<div class='progression'>"
                    + "<h3>"
                    + window.lang.translate('Product Details')
                    + "</h3>"
                    + "<div class='row'>"
                    + "<a href="
                    + "https://www.bahram.sanalfabrika.com/onyuz/standard/assets/img/main/img12.jpg"
                    + ">"
                    + "<img class='prod_sample' src="
                    + "../../../onyuz/standard/assets/img/main/img12.jpg"
                    + " alt=''>"
                    + "</a>"
                    + "</div>"

                    + "<div class='row'>"
                    + "<table id=productPropertiesTable "
                    + "class='table table-hover table-striped table-condensed' "
                    + "cellspacing='0' style='font-size: 12px'>"

                    + "<tr>"
                    + "<td>"
                    + d[0]
                    + "</td>"
                    + "<td>"
                    + d[1]
                    + "</td>"
                    + "</tr>"

                    + "</table>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "</div>"
                    + "<hr>";

            $('#product_details_DIV').append(appending);
            var appending2;
            $.each(properties, function (key, vlaue) {

                appending2 = "<tr>"
                        + "<td>"
                        + properties[key].key
                        + "</td>"
                        + "<td>"
                        + properties[key].value
                        + "</td>"
                        + "</tr>";
                $('#productPropertiesTable').append(appending2);
            });
            $('#product_details_DIV').css('visibility', 'visible');
            $('#product_details_DIV').slideDown('slow');
            $('#product_details_DIV').attr('lastIndex', selectedRowIndex);
        } else {
            if ($('#product_details_DIV').attr('lastIndex').toString() === selectedRowIndex.toString()) {

                $('#product_details_DIV').attr('lastIndex', selectedRowIndex);
                $('#product_details_DIV').slideUp('Slow');
                $('#product_details_DIV').css('visibility', 'hidden');
            } else {

                $('#product_details_DIV').attr('lastIndex', selectedRowIndex);
                $('#product_details_DIV').slideUp('Slow');
                $('#product_details_DIV').css('visibility', 'hidden');
                $('#product_details_DIV').empty();
                var appending = "<div class='left-inner'>"
                        + "<div class='progression'>"
                        + "<h3>"
                        + window.lang.translate('Product Details')
                        + "</h3>"
                        + "<div class='row'>"
                        + "<a href="
                        + "https://www.bahram.sanalfabrika.com/onyuz/standard/assets/img/main/img12.jpg"
                        + ">"
                        + "<img class='prod_sample' src="
                        + "../../../onyuz/standard/assets/img/main/img12.jpg"
                        + " alt=''>"
                        + "</a>"
                        + "</div>"

                        + "<table id=productPropertiesTable "
                        + "class='table table-hover table-striped table-condensed' "
                        + "cellspacing='0' style='font-size: 12px'>"

                        + "<tr>"
                        + "<td>"
                        + d[0]
                        + "</td>"
                        + "<td>"
                        + d[1]
                        + "</td>"
                        + "</tr>"

                        + "</table>"

                        + "</div>"
                        + "</div>"
                        + "</div>"
                        + "<hr>";
                $('#product_details_DIV').append(appending);
                var appending2;
                $.each(properties, function (key, vlaue) {

                    appending2 = "<tr>"
                            + "<td>"
                            + properties[key].key
                            + "</td>"
                            + "<td>"
                            + properties[key].value
                            + "</td>"
                            + "</tr>";
                    $('#productPropertiesTable').append(appending2);
                });
                $('#product_details_DIV').css('visibility', 'visible');
                $('#product_details_DIV').slideDown('slow');
            }
        }

        if ($('#product_details_DIV').css('visibility') === 'visible') {
            $('html, body').animate({
                scrollTop: $("#product_details_DIV").offset().top
            }, 1000);
        }

    });
});
/*
 * fixed first column js call
 * 
 */

//    $("#product_table").tableHeadFixer({"head": false, "left": 2});


function listOfCertificates() {

    console.log('Available Certificates');
    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {
        window.i++;
        $("#qualityDetailsInsideDIV").append('Certificates ' + i + ' , ');
        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }

}

function qualityHistory() {

    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {
        window.i++;
        $("#qualityDetailsInsideDIV").append('history ' + i + ' , ');
        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }
}



function qualityPerformances() {

    if ($("#qualityDetaildDIV").hasClass('active')) {
        $("#qualityDetaildDIV").removeClass('active');
        $("#qualityDetaildDIV").slideUp('Slow');
        $("#qualityDetailsInsideDIV").empty();
    } else {

        $("#qualityDetaildDIV").addClass("active");
        $("#qualityDetaildDIV").slideDown("slow");
    }

}


function performanceDetails() {

    if ($("#pastPerformanceDetailsDIV").hasClass('active')) {
        $("#pastPerformanceDetailsDIV").removeClass('active');
        $("#pastPerformanceDetailsDIV").slideUp('Slow');
        $("#pastPerformanceDetailsInsideDIV").empty();
    } else {

        $("#pastPerformanceDetailsDIV").addClass("active");
        $("#pastPerformanceDetailsDIV").slideDown("slow");
    }

}

function customerDetails() {

    if ($("#customerDetailsDIV").hasClass('active')) {
        $("#customerDetailsDIV").removeClass('active');
        $("#customerDetailsDIV").slideUp('Slow');
        $("#customerDetailsInsideDIV").empty();
    } else {

        $("#customerDetailsInsideDIV").append();
        $("#customerDetailsDIV").addClass("active");
        $("#customerDetailsDIV").slideDown("slow");
    }

}
