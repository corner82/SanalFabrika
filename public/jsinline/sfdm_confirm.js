$(document).ready(function () {

/**
 * while widget todolist is being filled, loading image is displayed
 * @author Mustafa Zeynel Dağlı
 * @since 09/02/2016
 */
$('#todolistbox').loadImager();
//$('#todolistbox').loadImager('appendImage');
    
    
var sm  = $(window).successMessage();
var dm  = $(window).dangerMessage();
var wm  = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                           actionButtonLabel : 'İşleme devam et'});
    
    
    
/**
 * todo list box widget is being filled
 * @author Mustafa Zeynel Dağlı
 * @since 09/02/2016
 */
var filler = $('#todolistbox').todolistFiller();
    
/**
 * operation type tool select box filling for please select item
 * @author Mustafa Zeynel Dağlı
 * @since 11/02/2016
 */
window.getOperationTypeToolsPleaseSelect = function() {
    var dropdownOperationsToolsData = [
        {
            text: "Lütfen Onay Aracı Seçiniz",
            value: -1,
            selected: true,
            description: "Operasyon tipi 'Onay' olarak seçilirse bu alan dolacaktır...",
            imageSrc: ""
        }
    ];

    $('#dropdownOperationsTools').ddslick({
        data : dropdownOperationsToolsData, 
        width:'100%',
        //selectText: "Select your preferred social network",
        imagePosition:"right",
        onSelected: function(selectedData){
            //console.log(selectedData.selectedData.text);
        }   
    });
    if($('#dropdownOperationsToolsContainer').loadImager()!='undefined') {
        $('#dropdownOperationsToolsContainer').loadImager('removeLoadImage');
    }

}
window.getOperationTypeToolsPleaseSelect();

    /**
     * return operation type tools
     * @returns {boolean}
     * @author Mustafa Zeynel Dağlı
     * @since 10/02/2016
     */
    window.getOperationTypeTools = function () {
        
        /*try {
            writeMyFile(theData); //This may throw a error
          } catch(e) {  
            handleError(e); // If we got a error we handle it
          } finally {
            closeMyFile(); // always close the resource
          }*/
        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: { url:'pkFillConsultantOperationsToolsDropDown_sysOperationTypesTools' ,
                    language_code : 'tr',
                    main_group : 2,
                    pk : $("#pk").val()}, 
            type: 'GET',
            dataType: 'json',
            success: function (datas, textStatus, jqXHR) {
                if(datas.length!==0) {
                    $('#dropdownOperationsTools').ddslick('destroy');
                    $('#dropdownOperationsTools').ddslick({
                        data : datas,
                        width:'100%',
                        imagePosition:"right",
                    });
                } else {
                    console.error('"pkFillConsultantOperationsDropDown_sysOperationTypes" servis datası boştur!!');
                }
                $('#dropdownOperationsToolsContainer').loadImager('removeLoadImage');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                BootstrapDialog.show({
                    title: 'Servis Hatası- Hata Kodu : AAA11',
                    message: 'Servis hatası oluşmuştur, hata kodu sistem yöneticine yollanacaktır!!',
                    description: 'Servis hatası oluşmuştur, hata kodu sistem yöneticine yollanacaktır!!',
                    type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                    closable: true, // <-- Default value is false
                    draggable: true, // <-- Default value is false
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ban-circle',
                        label: 'Tamam',
                        cssClass: 'btn-warning',
                        action: function(dialogItself){
                            var error = $(this).errorService();
                            error.errorService('option', 'url', 'pkInsert_infoError');
                            error.errorService('option', 'errorCode', 'AAA11');
                            error.errorService('option', 'errorInfo', textStatus);
                            error.errorService('option', 'errorUrl', 'sfdm/confirm');
                            error.errorService('option', 'page', 'Danışman Onay Sayfası');
                            error.errorService('option', 'pk', $("#pk").val());
                            error.errorService('option', 'service', 'pkFillConsultantOperationsToolsDropDown_sysOperationTypesTools');
                            error.errorService('send');
                            dialogItself.close();
                        }
                    }]
                });
                console.error('"pkFillConsultantOperationsToolsDropDown_sysOperationTypes" servis hatası->'+textStatus);
                $('#dropdownOperationsToolsContainer').loadImager('removeLoadImage');
            }
        });
    }
    
    /**
     * operation type select box filling
     * @author Mustafa Zeynel Dağlı
     * @since 10/02/2016
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkFillConsultantOperationsDropDown_sysOperationTypes' ,
                language_code : 'tr',
                main_group : 2,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                $('#dropdownOperations').ddslick({
                    data : data, 
                    width:'100%',
                    //selectText: "Select your preferred social network",
                    imagePosition:"right",
                    onSelected: function(selectedData){
                        //console.log(selectedData.selectedData.value);
                        $('#dropdownOperationsToolsContainer').loadImager();
                        $('#dropdownOperationsToolsContainer').loadImager('appendImage');
                        window.getOperationTypeTools();
                       /*if(selectedData.selectedData.value==6) {
                            $('#dropdownOperationsToolsContainer').loadImager();
                            $('#dropdownOperationsToolsContainer').loadImager('appendImage');
                            window.getOperationTypeTools();
                        } else {
                            $('#dropdownOperationsToolsContainer').loadImager();
                            $('#dropdownOperationsToolsContainer').loadImager('appendImage');
                            $('#dropdownOperationsTools').ddslick('destroy');
                            window.getOperationTypeToolsPleaseSelect();
                        }*/
                    }   
                });
            } else {
                console.error('"pkFillConsultantOperationsDropDown_sysOperationTypes" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkFillConsultantOperationsDropDown_sysOperationTypes" servis hatası->'+textStatus);
        }
    });
    
 
    /**
     * consultant detail  tab click
     * @author Mustafa Zeynel Dağlı
     * @since 08/02/2016
     */
    $('#tab_confirm_container #tab_confirm_clicker').click(function (e) {
        if(!$('#tab_confirm').hasClass('active')) {
            BootstrapDialog.alert({
                title: 'Kulllanıcı seçiniz',
                message: 'Lütfen önce "kullanıcı onayı" tablosundan bir kullanıcı seçiniz...',
                description: 'Kullanıcı belirleyip onay için işlem yapınız.',
                type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                closable: true, // <-- Default value is false
                draggable: true, // <-- Default value is false
                buttonLabel: 'Tamam', // <-- Default value is 'OK',
            });
            $('#tab_confirm_image_loader').loadImager();
            $('#tab_confirm_image_loader').loadImager('appendImage');
            //$('#tab_confirm_container a:first').tab('show');
        }
        e.preventDefault();
     })
    
    /**
     * 'grid_confirm_registration' easyui grid detail click function
     * @param {type} target
     * @returns {undefined}
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */
    window.gridDetailClick= function (target) {
        var rows = $('#grid_confirm_registration').datagrid('getRows'); 
        var row = rows[getRowIndex(target)];
        //console.log(row);
        $.ajax({
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: { url:'pkGetConsConfirmationProcessDetails_sysOsbConsultants' ,
                    pk : $("#pk").val(),
                    profile_id : row.id}, 
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, jqXHR) {
                if(data.length!==0) {
                    $("#formID").val(row.id);
                    $("#username").val(data[0]['username']);
                    $("#languagecode").val(data[0]['languagecode']);
                    $("#firmname").val(data[0]['firmname']);
                    $("#sgkno").val(data[0]['sgkno']);
                    $("#irtibattel").val(data[0]['irtibattel']);
                    $("#irtibatcep").val(data[0]['irtibatcep']);
                    $("#iletisimadresi").val(data[0]['iletisimadresi']);
                    $("#faturaadresi").val(data[0]['faturaadresi']);
                    $("#sdate").val(data[0]['sdate']);
                    $("#foundation_year").val(data[0]['foundation_year']);
                    
                    if($('#tab_confirm_image_loader').loadImager() != 'undefined') {
                        $('#tab_confirm_image_loader').loadImager('removeLoadImage');
                        $('#tab_confirm_container a[href="#tab_confirm"]').tab('show');
                    }
                } else {
                    BootstrapDialog.alert({
                        title: 'DİKKAT!! Kullanıcı detayları belirlenememiştir',
                        message: 'Kullanıcı dateyları belirlenememiştir, lütfen başka kullanıcı seçiniz!!',
                        type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
                        closable: true, // <-- Default value is false
                        draggable: true, // <-- Default value is false
                        buttonLabel: 'Tamam', // <-- Default value is 'OK',
                    });
                } 
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.error(textStatus);
            }
        });  
    }
    
    /**
     * trying to get row index from easyui grid
     * @param {type} target
     * @returns integer
     * @author Mustafa Zeynel Dağlı
     * @since 09/02/2016
     */
    window.getRowIndex = function (target){
        var tr = $(target).closest('tr.datagrid-row');
        return parseInt(tr.attr('datagrid-row-index'));
    }

    /**
     * grid_confirm_registration easyui datagrid
     * user confirmation datagrid listing for confirmation
     * @author Mustafa Zeynel Dağlı
     * @since 10/02/2016
     */
    $('#grid_confirm_registration').datagrid({
            onDblClickRow : function (index, row) {
                //$('.nav-tabs a[href="#tab_1-1"]').tab('show');  
                //alert('test');
            },  
            url : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            queryParams : { url:'pkGetConsPendingFirmProfile_sysOsbConsultants' ,
                            pk : $('#pk').val()}, 
            //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
            width : '100%',
            singleSelect:true,
            pagination : true,
            collapsible:true,
            method:'get',
            idField:'id',
            //toolbar:'#tb5',
            //fit:true,
            //fitColumns : true,
            remoteFilter: true,
            remoteSort:true,
            multiSort:false,
            sortable : true,
            columns:
                [[
                    {field:'id',title:'ID'},
                    {field:'username',title:'Kullanıcı Adı',sortable:true,width:250},
                    //{field:'operation_name',title:'İşlem',sortable:true, width:100},
                    {field:'company_name',title:'Firma',sortable:true, width:250},
                    //{field:'c_date',title:'Fat. Adres', width:200},
                    {field:'s_date',title:'Kayıt Tarihi',sortable:true, width:200},
                    {field:'detay',title:'Detay',sortable:false, align:'center', 
                        width:100,  
                        formatter:function(value,row,index){
                            //var e = '<a style="color:#f39c12" href="javascript:void(0)" onclick="gridDetailClick(this)">Detay</a> ';
                            var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return gridDetailClick(this);"><i class="fa fa-minus-circle"></i></button>';
                            return e;
                        }
                    },
                    /*{field:'c_date',title:'İşlem Tarihi', width:200},
                    {field:'c_date',title:'İlet. Adres', width:200},
                    {field:'c_date',title:'Fat. Adres', width:200},*/
                ]]   
      }); 
      
    /** 
     * grid_confirm_registration datagrid filter 
     * @author Mustafa Zeynel Dağlı
     * @since 11/02/2016  
     */  
    var grid_confirm_registration_filter = $('#grid_confirm_registration').datagrid();
    grid_confirm_registration_filter.datagrid('enableFilter');
      

    /**
     * page contetnt header widgets are filled here (small colorfull boxes)
     * @author Mustafa Zeynel Dağlı
     * @since 11/02/2016
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkGetConsultantUpDashBoardCount_blActivationReport' ,
                pk : $("#pk").val()},
        type: 'GET',
        dataType: 'json',
        language_id:647,
        //data: 'rowIndex='+rowData.id,
        success: function (data, textStatus, jqXHR) {
            $("#toplam_header_1_container").headerSetter(data[0]);
            $("#toplam_header_2_container").headerSetter(data[1]);
            $("#toplam_header_3_container").headerSetter(data[2]);
            $("#toplam_header_4_container").headerSetter(data[3]);
            //$('#todolistbox').loadImager("removeLoadImage");
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
//            console.error(textStatus);
        }

    });


   /*var testdate = Math.round(new Date("2017-01-18").getTime()/1000);
   alert(testdate);
   var date = new Date(testdate*1000);
   alert(date);*/

    // Left menuyu oluşturmak için çağırılan fonksiyon...
    $.fn.leftMenuFunction();
    
    
    /**
 * update company data wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 26/01/2017
 */
window.updateApprovalWrapper = function (e) {
 e.preventDefault();
 
 var ddOperationsData = $('#dropdownOperations').data('ddslick');
 if(!ddOperationsData.selectedData.value > 0) {
    wm.warningMessage('resetOnShown');
    wm.warningMessage('show', 'Danışman Operasyon Tipi Seçiniz', 'Lütfen danışman operasyonu seçiniz!');
    return false;
}

 var ddOperationToolsData = $('#dropdownOperationsTools').data('ddslick');
 if(!ddOperationToolsData.selectedData.value > 0) {
    wm.warningMessage('resetOnShown');
    wm.warningMessage('show', 'Danışman Operasyon Aracı Seçiniz', 'Lütfen danışma operasyon aracı seçiniz!');
    return false;
}
 
 var id = $('#formID').val();
 if(id>0){
    /*if ($("#updateApprovalForm").validationEngine('validate')) {
         console.log('tester');
        return false
        updateApproval(id);
    }*/ 
     updateApproval(id);
    return false;
 } else {
     dm.dangerMessage('resetOnShown');
     dm.dangerMessage('İşlemde Hata Oluştu', 'İşlem için gerekli parametreler eksik, işlem başlatılamadı, sistem yöneticisi ile temasa geçiniz!');
 }
 
 return false;
}

/**
 * update company data
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 26/01/2017
 */
window.updateApproval = function (id) {
    var loader = $('#tab_confirm_image_loader').loadImager();
    loader.loadImager('appendImage');
     
    var ddOperationsData = $('#dropdownOperations').data('ddslick');
    var operation_id = ddOperationsData.selectedData.value;
     
     var total = $('#updateTotalPopup').val();
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateConsConfirmAct_infoFirmProfile' ,
                         language_code : $('#langCode').val(),
                         pk : $("#pk").val(),
                         id : id,
                         operation_id : operation_id
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Onaylama  İşlemi Başarısız...', 
                                           'Onay işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMachineTools" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
            sm.successMessage('show', 'Onay İşlemi Başarılı...', 
                                       'Firma sözel bilgisi onaylama işlemini gerçekleştirdiniz... ',
                                       data);
                                       $('#tab_confirm_container a[href="#tab_confirm_company"]').tab('show');
                                       $('#grid_confirm_registration').datagrid('reload');
            window.dataGridControler = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Onaylama İşlemi Başarısız...', 
                                      'Onay işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMachineTools" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Onaylama İşlemi Başarısız...', 
                                      'Onay işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}


    
});