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
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {
            url: 'fillCompanyInfoProductsGuest_infoFirmProfile',
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);
            var j;
            var dataSet = [];
            var properties = [];

            for (j = 0; j < data.length; j++) {

                var product = data[j].product_name;
                var product_image = data[j].product_picture;
                var product_desc = data[j].product_description;
                var product_video = data[j].product_video_link;
//                var category = data[j].product_category;
                var category = null;
//                var customer = data[j].product_customer;
                var customer = null;
//                var finished_good = data[j].product_fin_g;
                var finished_good = null;
//                var price = data[j].product_price;
                var price = null;

                if (category === null) {
                    category = 'Registration Required!';
                }
                if (customer === null) {
                    customer = 'Registration Required!';
                }
                if (finished_good === null) {
                    finished_good = 'Registration Required!';
                }
                if (price === null) {
                    price = 'Only Available for System Members';
                }
                dataSet.push([product, category, customer, finished_good, price, "Order Now"]);
                properties.push([{key: 'name', value: product}, {key: 'image', value: product_image}, {key: 'desc', value: product_desc}, {key: 'video_link', value: product_video}]);
            }

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
//                this.style.color = '#72c02c';
                var d = window.table.row(this).data();
                /*
                 * 
                 * @type type
                 * ajxa request to get product properties should be added here...
                 * for now a properties array is created...
                 */
//                
                if ($('#product_details_DIV').css('visibility') === 'hidden') {

                    $('#product_details_DIV').empty();

                    var appending = "<div class='left-inner'>"
                            + "<div class='progression'>"
                            + "<h3>"
                            + window.lang.translate('Product Details')
                            + "</h3>"
                            + "<div class='row'>"
                            + "<a href='"
                            + "https://"
                            + window.location.hostname
                            + "/onyuz/standard/assets/img/sfClients/products/"
                            + properties[selectedRowIndex][1].value
                            + "'>"
                            + "<img class='mach_sample' src='"
                            + "https://"
                            + window.location.hostname
                            + "/onyuz/standard/assets/img/sfClients/products/"
                            + properties[selectedRowIndex][1].value
                            + "' alt=''>"
                            + "</a>"
                            + "</div>"

                            + "<div class='row'>"
                            + "<table id=productPropertiesTable "
                            + "class='table table-hover table-striped table-condensed' "
                            + "cellspacing='0' style='font-size: 12px'>"
                            + "</table>"
                            + "</div>"
                            + "</div>"
                            + "</div>"
                            + "<hr>";


                    console.log(appending);

                    $('#product_details_DIV').append(appending);

                    var properties_temp = properties[selectedRowIndex];

                    $.each(properties_temp, function (key, value) {
                        var appending2 = "<tr>"
                                + "<td>"
                                + properties_temp[key].key
                                + "</td>"
                                + "<td>"
                                + properties_temp[key].value
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
                        $('#product_details_DIV').empty();

                        var appending =
                                "<div class='left-inner'>"
                                + "<div class='progression'>"
                                + "<h3>"
                                + window.lang.translate('Product Details')
                                + "</h3>"
                                + "<div class='row'>"
                                + "<a href='"
                                + "https://"
                                + window.location.hostname
                                + "/onyuz/standard/assets/img/sfClients/products/"
                                + properties[selectedRowIndex][1].value
                                + "'>"
                                + "<img class='mach_sample' src='"
                                + "https://"
                                + window.location.hostname
                                + "/onyuz/standard/assets/img/sfClients/products/"
                                + properties[selectedRowIndex][1].value
                                + "' alt=''>"
                                + "</a>"
                                + "</div>"

                                + "<div class='row'>"
                                + "<table id=productPropertiesTable "
                                + "class='table table-hover table-striped table-condensed' "
                                + "cellspacing='0' style='font-size: 12px'>"
                                + "</table>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "</div>"
                                + "<hr>";

                        console.log(appending);

                        $('#product_details_DIV').append(appending);

                        var properties_temp = properties[selectedRowIndex];

                        $.each(properties_temp, function (key, value) {
                            var appending2 = "<tr>"
                                    + "<td>"
                                    + properties_temp[key].key
                                    + "</td>"
                                    + "<td>"
                                    + properties_temp[key].value
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
        }

    });


    /*
     * Create list of products for each category service
     */

//    var dataSet = [
//        ["Product A", "Category A", "Customer A", "Yes", "$ 250.00", "Order Now"],
//        ["Product B", "Category A", "Customer B", "No", "$ 420.00", "Order Now"],
//        ["Product C", "Category B", "Customer E", "Yes", "Contact Company", "Order Now"],
//        ["Product D", "Category C", "Customer G", "No", "$ 1035.00", "Order Now"],
//        ["Product E", "Category A", "Customer A", "No", "$ 270.00", "Order Now"],
//        ["Product F", "Category A", "Customer B", "No", "$ 200.00", "Order Now"],
//        ["Product G", "Category B", "Customer E", "Yes", "Contact Company", "Order Now"],
//        ["Product H", "Category C", "Customer G", "No", "$ 1543.00", "Order Now"],
//        ["Product I", "Category A", "Customer Y", "Yes", "$ 250.00", "Order Now"],
//        ["Product J", "Category A", "Customer A", "No", "$ 420.00", "Order Now"],
//        ["Product K", "Category B", "Customer X", "Yes", "Contact Company", "Order Now"],
//        ["Product L", "Category C", "Customer Q", "No", "$ 1035.00", "Order Now"],
//        ["Product M", "Category A", "Customer T", "No", "$ 270.00", "Order Now"],
//        ["Product N", "Category A", "Customer B", "No", "$ 200.00", "Order Now"],
//        ["Product O", "Category B", "Customer E", "Yes", "Contact Company", "Order Now"],
//        ["Product P", "Category C", "Customer G", "No", "$ 1543.00", "Order Now"]
//    ];


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
