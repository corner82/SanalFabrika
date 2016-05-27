$(document).ready(function () {

    /*
     * multilanguage plugin 
     * @type Lang
     */
    console.log($('#selectedCompanyNpk').val());

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#langCode').val());

    /*
     * Left menuyu olusturmak icin Ã§aÄŸÄ±rÄ±lan fonksiyon...
     */

    $.fn.leftMenuFunction();

    window.sel_count_id;
    window.sel_comp_count_id;
    window.cityList;
    window.boroughList;

    /*
     * 
     * Firm consultants for page header
     * 
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkGetFirmProfileConsultant_infoFirmProfile',
            language_code: $("#langCode").val(),
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

                for (var i = 0; i < data.length; i++) {

                    var cons_image_url = "https://" + window.location.hostname + "/onyuz/standard/assets/img/sfClients/" + data[0].cons_picture;

                    if (data[i].communications_no) {
                        var tel_number = data[i].communications_no;
                    } else {
                        var tel_number = '';
                    }

                    var appending_html =
                            "<li id='"
                            + "consultant_" +
                            i
                            + "' email_address='"
                            + data[i].auth_email
                            + "' page_consultant='"
                            + data[i].name + " " + data[i].surname
                            + "' onclick='send_email_to_consult(this)'><!-- start consultant -->"
                            + "<a href='#'>"
                            + "<div class='pull-left'>"
                            + "<img src='"
                            + cons_image_url
                            + "' class='img-circle' alt='User Image'/>"
                            + "</div>"
                            + "<h4>"
                            + data[i].name + " " +  data[i].surname
                            + "<small><i class='fa fa-clock-o'></i></small>"
                            + "</h4>"
                            + "<p>"
                            + "Tel: " + tel_number
                            + "</p>"
                            + "<p>"
                            + window.lang.translate('Assigned Company Consultant')
                            + "</p>"
                            + "</a>"
                            + "</li><!-- end message -->";

                    $('#list_consultants').append(appending_html);
                }
                $('#number_of_consultants').empty();
                $('#number_of_consultants_power').empty();
                $('#number_of_consultants').append(i + " " + window.lang.translate('Consultants'));
                $('#number_of_consultants_power').append(i);

            } else {
                console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"consultants" servis hatasÃ„Â±->' + textStatus);
        }
    });


/*
     * Page consultant for box-header
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkGetFirmVerbalConsultant_infoFirmVerbal',
            language_code: $("#langCode").val(),
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

                var cons_image_url = "https://" + window.location.hostname + "/onyuz/standard/assets/img/sfClients/" + data[0].cons_picture;
                
                if(data[0].communications_no){
                    var tel_number = data[0].communications_no;
                }else{
                    var tel_number = '';
                }
                
                $('#consultant_div').attr('data-balloon', 'Tel:' + tel_number);
                $('#consultant_div').attr('email_address', data[0].auth_email);
                $('#consultant_div').attr('page_consultant', data[0].name + " " + data[0].surname);
                $('#cons_image_ph').attr('src', cons_image_url);
                $('#cons_name_ph').empty();
                $('#cons_name_ph').append(data[0].name + " " +  data[0].surname);

            } else {
                console.error('"consultants" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"consultants" servis hatasÃ„Â±->' + textStatus);
        }
    });

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



    /*
     * Get already registered addresses as Easyui Grid
     * 
     */
//    var reg_address_data = {"total": 3, "rows": [
//            {"itemid": "1", "building_type": "Buidling A", "country": "country A", "address": "address 1", "city": "city A", "pobox": "11213", "website": "www.aaa.com", "email": "a@a.com", "tel": "213654897", "fax": "213654897"},
//            {"itemid": "2", "building_type": "Buidling B", "country": "country B", "address": "address 2", "city": "city B", "pobox": "15154", "website": "www.bbb.com", "email": "b@b.com", "tel": "234523452", "fax": "213654897"},
//            {"itemid": "3", "building_type": "Buidling C", "country": "country C", "address": "address 3", "city": "city C", "pobox": "89278", "website": "www.ccc.com", "email": "c@c.com", "tel": "675676634", "fax": "213654897"}
//        ]};


    var buildings = [
        {building_id: 'FI-SW-01', building_type: 'Koi'},
        {building_id: 'K9-DL-01', building_type: 'Dalmation'},
        {building_id: 'RP-SN-01', building_type: 'Rattlesnake'},
        {building_id: 'RP-LI-02', building_type: 'Iguana'},
        {building_id: 'FL-DSH-01', building_type: 'Manx'},
        {building_id: 'FL-DLH-02', building_type: 'Persian'},
        {building_id: 'AV-CB-01', building_type: 'Amazon Parrot'}
    ];
    $(function () {
        $('#reg_address_table').datagrid({
            title: window.lang.translate('List of Registered Addresses'),
            iconCls: 'icon-edit',
            width: '100%',
            height: 250,
            singleSelect: true,
            idField: 'itemid',
            url: '../../../../jsinline/datagrid_data.json',
            columns: [[
                    {field: 'itemid', title: 'Item ID', width: 60},
//                    {field: 'building_id', title: 'Building Type', width: 100,
//                        formatter: function (value, row) {
//                            return row.building_type || value;
//                        },
//                        editor: {
//                            type: 'combobox',
//                            options: {
//                                valueField: 'building_id',
//                                textField: 'building_type',
//                                data: buildings,
//                                required: true
//                            }
//                        }
//                    },
                    {field: 'building_type', title: 'Building Type', width: 80, align: 'left', editor: {type: 'text', options: {precision: 1}}},
                    {field: 'country', title: 'Country', width: 80, align: 'left', editor: {type: 'text', options: {precision: 1}}},
                    {field: 'city', title: 'City', width: 80, align: 'left', editor: 'text'},
                    {field: 'address', title: 'Address', width: 180, align: 'left', editor: 'text'},
                    {field: 'tel', title: 'Tel', width: 50, align: 'center', editor: 'text'},
                    {field: 'fax', title: 'Fax', width: 50, align: 'center', editor: 'text'},
                    {field: 'email', title: 'Email', width: 50, align: 'center', editor: 'text'},
                    {field: 'action', title: 'Action', width: 80, align: 'center',
                        formatter: function (value, row, index) {
                            if (row.editing) {
                                var s = '<a href="javascript:void(0)" onclick="saverow(this)">' + window.lang.translate('Save') + '</a> ';
                                var c = '<a href="javascript:void(0)" onclick="cancelrow(this)">' + window.lang.translate('Cancel') + '</a>';
                                return s + c;
                            } else {
                                var e = '<a href="javascript:void(0)" onclick="editrow(this)">' + window.lang.translate('Edit') + '</a> ';
                                var d = '<a href="javascript:void(0)" onclick="deleterow(this)">' + window.lang.translate('Delete') + '</a>';
                                return e + d;
                            }
                        }
                    }
                ]],
            onEndEdit: function (index, row) {
                var ed = $(this).datagrid('getEditor', {
                    index: index,
                    field: 'productid'
                });
                row.productname = $(ed.target).combobox('getText');
            },
            onBeforeEdit: function (index, row) {
                row.editing = true;
                $(this).datagrid('refreshRow', index);
            },
            onAfterEdit: function (index, row) {
                row.editing = false;
                $(this).datagrid('refreshRow', index);
            },
            onCancelEdit: function (index, row) {
                row.editing = false;
                $(this).datagrid('refreshRow', index);
            }
        });
        $('#reg_address_table').datagrid('enableFilter');
    });



    /*
     * Get Building types service
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'fillBuildingType_sysSpecificDefinitions',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {

            if (data.length !== 0) {
                $('#building_type_ph').ddslick({
                    data: data,
                    width: '100%',
                    background: false,
                    selectText: window.lang.translate("Select an Address Type"),
                    imagePosition: "right",
                    onSelected: function (selectedData) {
                        selectedBuildingTypeId = selectedData.selectedData.value;
//                        console.log(selectedData);
//                        console.log(selectedCommunicationTypeId);
                        //callback function: do something with selectedData;
                    }
                });
            } else {
                console.error('"fillCommunicationsTypes_sysSpecificDefinitions" servis datasÄ± boÅŸtur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillCommunicationsTypes_sysSpecificDefinitions" servis hatasÄ±->' + textStatus);
        }
    });

    /*
     * Get countries list for address 
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'fillComboBox_syscountrys',
            language_code: $("#langCode").val(),
            component_type: 'ddslick'
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {
//                console.log(data);
                $('#company_country_ph').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a country from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
                        window.sel_count_id = selectedData.selectedData.value;
                    }
                });
                $('#company_country_address_ph').ddslick({
                    data: data,
                    width: '100%',
                    height: '500%',
                    background: false,
                    selectText: window.lang.translate("Please select a country from list..."),
                    imagePosition: 'right',
                    onSelected: function (selectedData) {
                        window.sel_comp_count_id = selectedData.selectedData.value;
                        if (selectedData.selectedData.value !== 0) {

                            window.cityList = selectedData.selectedData.attributes.citylist;
                            window.boroughList = false;
                        }
                        window.sel_count_id = selectedData.selectedData.value;
//                    selectedCountryList = selectedData                    
                        companyCityDropDownUpdate();
                        //callback function: do something with selectedData;
                    }
                });
            } else {
                console.error('"fillComboBox_syscountrys" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"fillComboBox_syscountrys" servis hatasÃ„Â±->' + textStatus);
        }
    });

    /*
     * Address drop down list for cities
     * @returns {undefined}
     */
    function companyCityDropDownUpdate() {

        $("#company_city").empty();
        $("#company_district").empty();
        if (window.cityList === true) {
            $('#company_city_address_ph').hide();
            $('#city_dropdown').show();
        } else {
            $('#company_city_address_ph').show();
            $('#city_dropdown').hide();
        }

        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'fillComboBox_syscity',
                country_id: window.sel_count_id,
                language_code: $("#langCode").val(),
                component_type: 'ddslick'
            },
            type: 'GET',
            dataType: 'json',
            //data: 'rowIndex='+rowData.id,
            success: function (data, textStatus, jqXHR) {
                if (data.length !== 0) {

                    $('#company_city').ddslick('destroy');
                    $('#company_city').ddslick({
                        data: data,
                        width: '100%',
                        height: '500%',
                        background: false,
                        selectText: window.lang.translate("Please select a city from list..."),
                        imagePosition: 'right',
                        onSelected: function (selectedData) {
//                        console.log(selectedData.selectedData);
                            window.sel_city_id = selectedData.selectedData.value;
                            if (window.sel_city_id !== 0) {
                                window.boroughList = selectedData.selectedData.attributes.boroughlist;
                            }
//                            console.log(selectedData);
//                            console.log(selectedCityId);
                            districtDropDownUpdate();
                            //callback function: do something with selectedData;
                        }
                    });
                } else {
                    console.error('"fillComboBox_syscity" servis datasÃ„Â± boÃ…Å¸tur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('"fillComboBox_syscity" servis hatasÃ„Â±->' + textStatus);
            }
        });
    }

    /*
     * Address drop down list for districts
     * @returns {undefined}
     */
    function districtDropDownUpdate() {

        $("#company_district").empty();
        if (window.boroughList === true) {
            $('#district_dropdown').show();
        } else {
            $('#district_dropdown').hide();
        }

        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: {
                url: 'fillComboBox_sysborough',
                country_id: window.sel_count_id,
                city_id: window.sel_city_id,
                language_code: $("#langCode").val(),
                component_type: 'ddslick'
            },
            type: 'GET',
            dataType: 'json',
            //data: 'rowIndex='+rowData.id,
            success: function (data, textStatus, jqXHR) {
                if (data.length !== 0) {
//                console.log(data);
                    $('#company_district').ddslick('destroy');
                    $('#company_district').ddslick({
                        data: data,
                        width: '100%',
                        height: '500%',
                        background: false,
                        selectText: window.lang.translate("Please select a district from list..."),
                        imagePosition: 'right',
                        onSelected: function (selectedData) {
                            window.sel_dis_id = selectedData.selectedData.value;
//                            console.log(selectedData);
//                            console.log(selectedDistrictId);
                            //callback function: do something with selectedData;
                        }
                    });
                } else {
                    console.error('"fillComboBox_sysborough" servis datasÃ„Â± boÃ…Å¸tur!!');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('"fillComboBox_sysborough" servis hatasÃ„Â±->' + textStatus);
            }
        });
    }

    /*
     * Company's registrered but not approved social media links
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {url: "pkFillSingularFirmSocialMedia_infoFirmSocialmedia",
            language_code: $("#langCode").val(),
            npk: $('#selectedCompanyNpk').val(),
            pk: $("#pk").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
//            console.log(data);
            $('#ava_med_ph').empty();
            var i;
            for (i = 0; i < data.rows.length; i++) {

                var social_media_name = data.rows[i].socialmedia_name;

                if (social_media_name === 'googleplus') {
                    social_media_name = 'google-plus';
                }

                var social_url = data.rows[i].firm_link;
                var appending =
                        "<div class='btn-group' id='"
                        + social_media_name
                        + "_btn_group_"
                        + data.rows[i].id
                        + "' url_value='"
                        + social_url
                        + "' selected_soc_id='"
//                        + data[i].
                        + "'>"
                        + "<a id='"
                        + social_media_name
                        + "_button_"
                        + data.rows[i].id
                        + "' class='btn btn-social-icon dropdown-toggle btn-"
                        + social_media_name
                        + "' data-toggle='dropdown' aria-expanded='false' target='_newtab' "
                        + " "
                        + "style='margin-left:5px'>"
                        + "<i class='fa fa-"
                        + social_media_name
                        + "'></i>"
                        + "</a>"
                        + "<button type='button' class='btn dropdown-toggle btn-"
                        + social_media_name
                        + "' data-toggle='dropdown' aria-expanded='false'>"
                        + "<span class='caret'></span>"
                        + "<span class='sr-only'>Toggle Dropdown</span>"
                        + "</button>"
                        + "<ul class='dropdown-menu' role='menu'>"
                        + "<li class='btn' id='"
                        + social_media_name
                        + "_goto_btn_"
                        + data.rows[i].id
                        + "' onclick='goto_social(this)'>"
                        + window.lang.translate('Goto')
                        + "</li><br/>"
//                        + "<li class='btn' id='"
//                        + social_media_name
//                        + "_edit_btn' onclick='edit_social(this)'>"
//                        + window.lang.translate('Edit')
//                        + "</li><br/>"
                        + "<li class='btn' id='"
                        + social_media_name
                        + "_remove_btn_"
                        + data.rows[i].id
                        + "' soc_id_val='"
                        + data.rows[i].id
                        + "' onclick='remove_social(this)'>"
                        + window.lang.translate('Delete')
                        + "</li>"
                        + "</ul>"
                        + "</div>";
                $('#ava_med_ph').append(appending);
            }
        }
    });

    /*
     * Fill system social media list drop down
     * ddslick drop down
     */

    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: {
            url: 'pkFillSocicalMediaDdList_sysSocialMedia',
            language_code: $("#langCode").val(),
            component_type: 'ddslick',
            pk: $('#pk').val(),
            npk: $('#selectedCompanyNpk').val()
        },
        type: 'GET',
        dataType: 'json',
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            if (data.length !== 0) {

                var i;
                for (i = 0; i < data.length; i++) {
                    var new_imagesrc = data[i].imageSrc.replace('/Logos/', '');
                    data[i].imageSrc = "https://" + window.location.hostname + "/onyuz/standard/assets/img/icons/social/socialmediav2/" + new_imagesrc;
                }

                $('#social_media_ph').ddslick('destroy');
                $('#social_media_ph').ddslick({
                    data: data,
                    imagePosition: "left",
                    width: '100%',
                    height: '500%',
                    background: true,
                    selectText: window.lang.translate("Please select a social media from list..."),
                    onSelected: function (selectedData) {

                        var selected = selectedData.selectedData.text;
                        if (selected === 'googleplus') {
                            selected = 'google-plus';
                        }

                        if ($('#sel_med_ph').find('.form-control').length) {

                            var remained_soc_med = $('#sel_med_ph').find('.form-control').attr('id').replace('_input_field', ''),
                                    default_url = "https://www." + remained_soc_med + ".com/",
                                    found_value = $('#sel_med_ph').find('.form-control').attr('value'),
                                    remained_soc_med_id = $('#sel_med_ph').find('.btn').attr('selected_soc_id');

                            window.remaining_temp_url = $("#" + remained_soc_med + "_input_field").val();

                            if (window.remaining_temp_url !== default_url && window.remaining_temp_url.indexOf((default_url)) > -1) {

                                wcm.warningComplexMessage({
                                    onConfirm: function () {
                                        $('#sel_med_ph').empty();
                                        var appending
                                                =
                                                "<div id='"
                                                + selected
                                                + "_ph' style='margin-top: 20px'>"
                                                + "<a id='"
                                                + selected
                                                + "_long' selected_soc_id='"
                                                + selectedData.selectedData.value
                                                + "' class='btn btn-block btn-social btn-"
                                                + selected
                                                + "' onclick='changecontent(this)'>"
                                                + "<i class='fa fa-"
                                                + selected
                                                + "'></i>"
                                                + "<span id='"
                                                + selected
                                                + "_span'>"
                                                + window.lang.translate("Enter your account")
                                                + "</span>"
                                                + "</a>"
                                                + "<div id='"
                                                + selected
                                                + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
                                                + "<span class='input-group-btn'>"
                                                + "<a id='"
                                                + selected
                                                + "_input_button' class='btn btn-social-icon btn-"
                                                + selected
                                                + "' onclick='checkContent(this)'><i class='fa fa-"
                                                + selected
                                                + "'></i></a>"
                                                + "</span>"
                                                + "<input id='"
                                                + selected
                                                + "_input_field' type='text' class='form-control' value='https://www."
                                                + selected
                                                + ".com/'>"
                                                + "</div>"
                                                + "</div>";
                                        $('#sel_med_ph').append(appending);
                                    }
                                });
                                wcm.warningComplexMessage('show', remained_soc_med + ' changes!!',
                                        'Changes for ' + remained_soc_med + ' will be lost. Do you want to continue?');
                            } else {
                                $('#sel_med_ph').empty();
                                var appending
                                        =
                                        "<div id='"
                                        + selected
                                        + "_ph' style='margin-top: 20px'>"
                                        + "<a id='"
                                        + selected
                                        + "_long' selected_soc_id='"
                                        + selectedData.selectedData.value
                                        + "' class='btn btn-block btn-social btn-"
                                        + selected
                                        + "' onclick='changecontent(this)'>"
                                        + "<i class='fa fa-"
                                        + selected
                                        + "'></i>"
                                        + "<span id='"
                                        + selected
                                        + "_span'>"
                                        + window.lang.translate("Enter your account")
                                        + "</span>"
                                        + "</a>"
                                        + "<div id='"
                                        + selected
                                        + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
                                        + "<span class='input-group-btn'>"
                                        + "<a id='"
                                        + selected
                                        + "_input_button' class='btn btn-social-icon btn-"
                                        + selected
                                        + "' onclick='checkContent(this)'><i class='fa fa-"
                                        + selected
                                        + "'></i></a>"
                                        + "</span>"
                                        + "<input id='"
                                        + selected
                                        + "_input_field' type='text' class='form-control' value='https://www."
                                        + selected
                                        + ".com/'>"
                                        + "</div>"
                                        + "</div>";
                                $('#sel_med_ph').append(appending);
                            }
                        } else {

                            $('#sel_med_ph').empty();
                            var appending
                                    =
                                    "<div id='"
                                    + selected
                                    + "_ph' style='margin-top: 20px'>"
                                    + "<a id='"
                                    + selected
                                    + "_long' selected_soc_id='"
                                    + selectedData.selectedData.value
                                    + "' class='btn btn-block btn-social btn-"
                                    + selected
                                    + "' onclick='changecontent(this)'>"
                                    + "<i class='fa fa-"
                                    + selected
                                    + "'></i>"
                                    + "<span id='"
                                    + selected
                                    + "_span'>"
                                    + window.lang.translate("Enter your account")
                                    + "</span>"
                                    + "</a>"
                                    + "<div id='"
                                    + selected
                                    + "_input'  style='display:none; max-height: 20px;' class='input-group margin'>"
                                    + "<span class='input-group-btn'>"
                                    + "<a id='"
                                    + selected
                                    + "_input_button' class='btn btn-social-icon btn-"
                                    + selected
                                    + "' onclick='checkContent(this)'><i class='fa fa-"
                                    + selected
                                    + "'></i></a>"
                                    + "</span>"
                                    + "<input id='"
                                    + selected
                                    + "_input_field' type='text' class='form-control' value='https://www."
                                    + selected
                                    + ".com/'>"
                                    + "</div>"
                                    + "</div>";
                            $('#sel_med_ph').append(appending);
                        }
                    }
                });
            } else {
                console.error('"pkFillSocicalMediaDdList_sysSocialMedia" servis datasÃ„Â± boÃ…Å¸tur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('"pkFillSocicalMediaDdList_sysSocialMedia" servis hatasÃ„Â±->' + textStatus);
        }
    });


});


var sm = $(window).successMessage();
var dm = $(window).dangerMessage();
var wm = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({denyButtonLabel: window.lang.translate('Cancel'),
    actionButtonLabel: window.lang.translate('Continue')});

/*
 * Change social media shape to edit content of url
 */

function changecontent(element) {
    window.selected_soc_med_id = $('#' + element.id).attr('selected_soc_id');
//    console.log(window.selected_soc_med_id);
    var social_media_name = element.id.replace('_long', '');
    $("#" + element.id).hide();
    $("#" + social_media_name + "_input").fadeIn('');
}

/*
 * After editing url checks for changes and edit or insert new social media link
 */

function checkContent(element) {

    var social_media_name = element.id.replace('_input_button', '');
    var social_media_name_ph = element.id.replace('_button', '');

    if ($("#" + social_media_name_ph + "_field").val() !== "https://www." + social_media_name + ".com/" && $("#" + social_media_name_ph + "_field").val().indexOf(("https://www." + social_media_name + ".com/")) > -1) {

        window.temp_url = $("#" + social_media_name_ph + "_field").val();
        $("#" + social_media_name + "_long").html("<i class='fa fa-" + social_media_name + "'></i>" + $("#" + social_media_name_ph + "_field").val());
        $("#" + social_media_name + "_long").hide();
        $("#" + social_media_name + "_input").hide();
        window.temp_soc_med_name = social_media_name;

        /*
         * Insert new url
         */

        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
            data: {
                url: 'pkInsert_infoFirmSocialmedia',
                pk: $("#pk").val(),
                npk: $("#selectedCompanyNpk").val(),
                language_code: $("#langCode").val(),
                sys_socialmedia_id: window.selected_soc_med_id,
                firm_link: window.temp_url,
                profile_public: 0
            },
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data['errorInfo'][0] === '00000') {

                    var appending =
                            "<div class='btn-group' id='"
                            + social_media_name
                            + "_btn_group_"
                            + data.lastInsertId
                            + "' url_value='"
                            + window.temp_url
                            + "'>"
                            + "<a id='"
                            + social_media_name
                            + "_button_"
                            + data.lastInsertId
                            + "' class='btn btn-social-icon dropdown-toggle btn-"
                            + social_media_name
                            + "' data-toggle='dropdown' aria-expanded='false' target='_newtab' "
                            + " "
                            + "style='margin-left:5px'>"
                            + "<i class='fa fa-"
                            + social_media_name
                            + "'></i>"
                            + "</a>"
                            + "<button type='button' class='btn dropdown-toggle btn-"
                            + social_media_name
                            + "' data-toggle='dropdown' aria-expanded='false'>"
                            + "<span class='caret'></span>"
                            + "<span class='sr-only'>Toggle Dropdown</span>"
                            + "</button>"
                            + "<ul class='dropdown-menu' role='menu'>"
                            + "<li class='btn' id='"
                            + social_media_name
                            + "_goto_btn_'"
                            + data.lastInsertId
                            + "' onclick='goto_social(this)'>"
                            + window.lang.translate('Goto')
                            + "</li><br/>"
//                            + "<li class='btn' id='"
//                            + social_media_name
//                            + "_edit_btn' onclick='edit_social(this)'>"
//                            + window.lang.translate('Edit')
//                            + "</li><br/>"
                            + "<li class='btn' id='"
                            + social_media_name
                            + "_remove_btn_'"
                            + data.lastInsertId
                            + "' soc_id_val='"
                            + data.lastInsertId
                            + "' onclick='remove_social(this)'>"
                            + window.lang.translate('Delete')
                            + "</li>"
                            + "</ul>"
                            + "</div>";

                    $('#ava_med_ph').append(appending);
                }
            }
        });


    } else {

        $("#" + social_media_name + "_long").show();
        $("#" + social_media_name + "_input").hide();
        var default_value = "https://www." + social_media_name + ".com/";
        $("#" + social_media_name_ph + "_field").val(default_value);
    }
}

/*
 * function to redirect to the entered social media adderss
 */

function goto_social(element) {
//    var selected = element.id.replace('_goto_btn_', '');
//    var selected = element.id.substring(0, element.id.indexOf("_goto_btn_"));
//    console.log(selected);
    var parent_grp_btn_id = element.id.replace('_goto_btn_', '_btn_group_');
    var sel_med_url = $('#' + parent_grp_btn_id).attr('url_value');
    if (sel_med_url.indexOf('google-plus') > -1) {
        sel_med_url = sel_med_url.replace('google-plus', 'googleplus');
    }
    window.open(sel_med_url, '_newtab');
}

/*
 * removes selected social media link
 */

function remove_social(element) {

//    var selected = element.id.replace('_remove_btn', '');
//    var selected = element.id.substring(0, element.id.indexOf("_remove_btn"));
    var parent_grp_btn_id = element.id.replace('_remove_btn_', '_btn_group_');
    console.log(parent_grp_btn_id);
    var soc_id_val = $('#' + element.id).attr('soc_id_val');
//    console.log($('#element.id'));
    console.log(soc_id_val);
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
//                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',
        data: {
            url: 'pkDeletedAct_infoFirmSocialmedia',
            pk: $("#pk").val(),
            npk: $("#selectedCompanyNpk").val(),
            language_code: $("#langCode").val(),
            sys_socialmedia_id: window.selected_soc_med_id,
            firm_link: window.temp_url,
            profile_public: 0,
            id: soc_id_val
        },
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data['errorInfo'][0] === '00000') {

                $('#sel_med_ph').empty();
                $('#' + parent_grp_btn_id).remove();

            }
        }
    });
}


/*
 * Easyui functions
 * 
 */

function getRowIndex(target) {
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}
function editrow(target) {
    $('#reg_address_table').datagrid('beginEdit', getRowIndex(target));
}
function deleterow(target) {

    wcm.warningComplexMessage({onConfirm: function (event, data) {
            $('#reg_address_table').datagrid('deleteRow', getRowIndex(target));
        }
    });
    wcm.warningComplexMessage('show', window.lang.translate('Are you sure?'), window.lang.translate('Are You Sure?'));
}
function saverow(target) {
    $('#reg_address_table').datagrid('endEdit', getRowIndex(target));

    sm.successMessage('show', window.lang.translate('Saving operation'), window.lang.translate('Information saved successfully'));
}
function cancelrow(target) {
    $('#reg_address_table').datagrid('cancelEdit', getRowIndex(target));
}
function insert() {
    var row = $('#reg_address_table').datagrid('getSelected');
    if (row) {
        var index = $('#reg_address_table').datagrid('getRowIndex', row);
    } else {
        index = 0;
    }
    $('#reg_address_table').datagrid('insertRow', {
        index: index,
        row: {
            status: 'P'
        }
    });
    $('#reg_address_table').datagrid('selectRow', index);
    $('#reg_address_table').datagrid('beginEdit', index);
}


