$(document).ready(function () {



/**
 * Menu type datagrid is being filled
 * @since 21/07/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
    //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkGetMachineTools_sysMachineTools',
            /*machine_groups_id : null,
            filterRules:null*/
    },
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
    columns:
        [[
            {field:'id',title:'ID'},
            {field:'group_name',title:'Mak. Kategorisi', width:100},
            {field:'manufacturer_name',title:'Üretici', width:150},
            {field:'machine_tool_name',title:'Makina',sortable:true,width:300},
            {field:'machine_tool_name_eng',title:'İng. Makina',sortable:true, width:300},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveMenuTypeWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveMenuTypeWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    
                    //var d = '<a href="javascript:void(0)" onclick="deleteISScenario(this);">Delete</a>';
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteMenuTypeUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateMenuTypeDialog('+row.id+', { machine_tool_name : \''+row.machine_tool_name+'\',\n\
                                                                                                                                                      group_name : \''+row.group_name+'\',\n\
                                                                                                                                                      machine_tool_name_eng : \''+row.machine_tool_name_eng+'\',\n\
                                                                                                                                                      model : \''+row.attributes.model+'\',\n\
                                                                                                                                                      model_year : \''+row.attributes.model_year+'\',\n\
                                                                                                                                                      machine_code : \''+row.attributes.machine_code+'\',\n\
                                                                                                                                                      machine_tool_grup_id : \''+row.attributes.machine_tool_grup_id+'\',\n\
                                                                                                                                                      manufactuer_id : \''+row.attributes.manufactuer_id+'\',\n\
                                                                                                                                                      manufacturer_name : \''+row.manufacturer_name+'\' } );"><i class="fa fa-arrow-circle-up"></i></button>';
                    return e+d+u;    
                }
            },

        ]]   
});
$('#tt_grid_dynamic').datagrid('enableFilter');




/**
 * multilanguage plugin 
 * @type Lang
 */
var lang = new Lang();
lang.dynamic($('#ln').val(), '/plugins/jquery-lang-js-master/langpack/'+$('#ln').val()+'.json');
lang.init({
    defaultLang: 'en'
});
lang.change($('#ln').val());

/**
 * !! Important , do not delete
 * @type node
 */
var selectedNode;

/*
* 
* @type @call;$@call;loadImager
* @Since 16/05/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for roles tree 
* this imager goes to #loading-image div in html.
* imager will be removed on roles tree onLoadSuccess method.
*/
var loader = $("#loading-image").loadImager();

var sm  = $(window).successMessage();
var dm  = $(window).dangerMessage();
var wm  = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                           actionButtonLabel : 'İşleme devam et'});
                                            
 


/**
 * menu  insert form validation engine attached to work
 * @since 21/07/2016
 */
$('#menuTypesForm').validationEngine();

 /**
* reset button function for menu type insert form
* property insert
* for 'insert' and 'update' form buttons
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 21/07/2016
*/
window.resetMenuTypesForm = function () {
   $('#menuTypesForm').validationEngine('hide');
   return false;
}
                                            


/**
 * get all menu types and fill to datagrid
 * @param {type} node
 * @param {type} treeObj
 * @returns {undefined}
 * @since 21/07/2016
 */
window.getAllMenuTypesToDatagrid = function(node, treeObj) {
    //alert('getAllMenuTypesToDatagrid');
    var nodeID = node.id;
    var checkedArray = [];
    var checked = treeObj.tree('getChecked');
    if(checked.length == 0) {
        $('#tt_grid_dynamic').datagrid({  
            queryParams: {
                    pk: $('#pk').val(),
                    subject: 'datagrid',
                    url : 'pkGetMachineTools_sysMachineTools',
            },
        });
        $('#tt_grid_dynamic').datagrid('enableFilter');
    } 
}
    

// Left menuyu oluşturmak için çağırılan fonksiyon...
$.fn.leftMenuFunction();

    
/**
 * wrapper class for pop up and delete menu type ultimately
 * @param {integer} nodeID
 * @returns {null}
 * @author Mustafa Zeynel Dağlı
 * @since 20/05/2016
 */
window.deleteMenuTypeUltimatelyDialog= function(id, index){
    var nodeID = nodeID;
    var id = id;
    var index = index;
    wcm.warningComplexMessage({onConfirm : function(event, data) {
        deleteMachUltimately(id, index);
    }
    });
    wcm.warningComplexMessage('show', 'Makina Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                      'Makina  silmek üzeresiniz, silme işlemi geri alınamaz!! ');
}
   
/**
* delete machine 
* @param {type} id
* @param {type} element
* @param {type} machine_group_id
* @returns {undefined}
* @since 20/05/2016
*/
window.deleteMachUltimately = function(id, index) {
   var loaderGridBlock = $("#loading-image-grid-container").loadImager();
    loaderGridBlock.loadImager('appendImage');

    var id = id;
    var index = index;
    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysMachineTools' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, data) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Makina Silme İşlemi Başarısız...',
                                      'Makina özelliği silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysMachineTools" servis hatası->'+data.errorInfo);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    loaderGridBlock.loadImager('removeLoadImage');
                    //$('#tt_grid_dynamic').datagrid('deleteRow', index);
                    $('#tt_grid_dynamic').datagrid('reload');
                    
                }
            });
            sm.successMessage('show', 'Makina  Silme İşleminiz Başarılı...',
                                      'Makina  silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
}
   
 
/**
 * insert menu item
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.insertMenuTypesWrapper = function (e) {
 e.preventDefault();


 if ($("#menuTypesForm").validationEngine('validate')) {
     

     
     insertMenuType();
 }
 return false;
}
   
   
   
/**
 * wrapper for menu type update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.updateMenuTypeDialog = function (id, row) {
//console.log(row);
BootstrapDialog.show({  
     title: '"'+ row.machine_tool_name + '" menü tipini güncellemektesiniz...',
     message: function (dialogRef) {
                 var dialogRef = dialogRef;
                 var $message = $(' <div class="row">\n\
                                         <div class="col-md-12">\n\
                                             <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                 <form id="menuTypesFormPopup" method="get" class="form-horizontal">\n\
                                                 <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                 <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group" style="padding-top: 10px;" >\n\
                                                         <label class="col-sm-2 control-label">Birim Sistemi</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <ul id="tt_tree_menu2_popup" class="easyui-tree" ></ul>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Mevcut Makina Kategorisi</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div  class="tag-container-popup">\n\
                                                                     <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.group_name+'" name="group_name_popup" id="group_name_popup" disabled="true"  />\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Makina Adı</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.machine_tool_name+'" name="machine_tool_name_popup" id="machine_tool_name_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">İngilizce Makina Adı</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.machine_tool_name_eng+'" name="machine_tool_name_eng_popup" id="machine_tool_name_eng_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Üretici Firma</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div id="dropdownProducersPopup" ></div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Model</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.model+'" name="model_popup" id="model_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Model Yılı</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" value="'+row.model_year+'" name="model_year_popup" id="model_year_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Makina Kodu</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <input data-prompt-position="topLeft:70" class="form-control" type="text" value="'+row.machine_code+'" name="machine_code_popup" id="machine_code_popup" />\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                     <div class="form-group">\n\
                                                         <div class="col-sm-10 col-sm-offset-2">\n\
                                                         <button id="insertMenuTypePopUp" class="btn btn-primary" type="submit" onclick="return updateMenuTypeWrapper(event, '+id+');">\n\
                                                             <i class="fa fa-save"></i> Kaydet </button>\n\
                                                         <!--<button id="resetForm" onclick="regulateButtonsPopupInsert();" class="btn btn-flat" type="reset" " >\n\
                                                             <i class="fa fa-remove"></i> Reset </button>-->\n\
                                                     </div>\n\
                                                 </div>\n\
                                             </form>\n\
                                         </div>\n\
                                     </div>\n\
                                 </div>');
                 return $message;
             },
     type: BootstrapDialog.TYPE_PRIMARY,
     onshown : function () {         
        $('#machine_tool_group_id_popup').val(''+row.machine_tool_grup_id+'');
        
        //alert($("input[name=machine_tool_group_id]:hidden").val());
        $('#machFormPopup').validationEngine();
        $('#tt_tree_menu2_popup').tree({  
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillJustMachineToolGroupsBootstrap_sysMachineToolGroups&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
            method: 'get',
            animate: true,
            checkbox: false,
            cascadeCheck: false,
            lines: true,
            onLoadSuccess: function (node, data) {
                 //loader.loadImager('removeLoadImage');
            },
            onSelect : function(node) {
                var self = $(this);
                if(!self.tree('isLeaf', node.target)) {
                    wm.warningMessage( {
                        onShown : function (event ,data ) {
                           self.tree('unselect', node.target); 
                        }
                    });
                    wm.warningMessage('show','Alt Kategori Seçiniz',
                                             'Lütfen alt kategori seçiniz...');
                } else {
                    $('#group_name_popup').val(node.text);
                    $('#machine_tool_group_id_popup').val(''+node.id+'');
                }
            },
            onCheck: function (node, checked) {
                 var self = $(this);
                 if(checked) {
                     if(!self.tree('isLeaf', node.target)) {
                         wm.warningMessage( {
                             onShown : function (event ,data ) {
                                self.tree('uncheck', node.target); 
                             }
                         });
                         wm.warningMessage('show','Alt Kategori Seçiniz',
                                                  'Lütfen alt kategori seçiniz...');

                     } else {
                         window.getMachineDueCategories(node, self);
                     }
                 } else if(checked == false){
                     if(self.tree('isLeaf', node.target) && node.state=='open') {
                         //window.getMachineDueCategories(node, self);  
                         window.getAllMenuTypesToDatagrid(node, self);
                     }
                 }
             },
        });
         
        var ajaxMacProducersPopup = $(window).ajaxCallWidget({
            proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                    data: { url:'pkFillManufacturerList_sysManufacturer' ,
                            language_code : 'tr',
                            pk : $("#pk").val() 
                    }
       })
        ajaxMacProducersPopup.ajaxCallWidget ({
            onError : function (event, textStatus,errorThrown) {
                dm.dangerMessage({
                   onShown : function() {
                       //$('#mach-prod-box').loadImager('removeLoadImage'); 
                   }
                });
                dm.dangerMessage('show', 'Makina Üreticisi Bulunamamıştır...',
                                         'Makina üreticisi firma bulunamamıştır...');
            },
            onSuccess : function (event, data) {
                var data = $.parseJSON(data);
                    //$('#mach-prod-box').loadImager('removeLoadImage');
                    $('#dropdownProducersPopup').ddslick({
                            height : 200,
                            data : data, 
                            width:'98%',
                            search : true,
                            //imagePosition:"right",
                            onSelected: function(selectedData){
                                if(selectedData.selectedData.value>0) {
                                    /*$('#tt_tree_menu').tree({
                                        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val(),
                                    });*/
                             }
                         }   
                    });  
                    $('#dropdownProducersPopup').ddslick('selectByValue', 
                                                {index: ''+row.manufactuer_id+'' ,
                                                text : ''+row.manufacturer_name+''}
                                                );
                },
                onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            $('#mach-prod-box').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'Makina Üreticisi Bulunamamıştır...',
                                              'Makina üreticisi firma bulunamamıştır...');
                 },
            }) 
            ajaxMacProducersPopup.ajaxCallWidget('call');
     },
     onhide : function() {
     },
 });
 return false;
}

/**
 * update menu type
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.updateMenuTypeWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#menuTypesFormPopup").validationEngine('validate')) {

    updateMenuType(id);
 }
 return false;
}

/**
 * update menu type
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.updateMenuType = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     var machine_tool_group_id_popup = $('#machine_tool_group_id_popup').val();
     var machine_tool_name = $('#machine_tool_name_popup').val();
     var machine_tool_name_eng = $('#machine_tool_name_eng_popup').val();
     var ddData = $('#dropdownProducersPopup').data('ddslick');
     var manufactuer_id = ddData.selectedData.value;
     var model = $('#model_popup').val();
     var model_year = $('#model_year_popup').val();
     var machine_code = $('#machine_code_popup').val();
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysMachineTools' ,
                         language_code : $('#langCode').val(),
                         machine_tool_grup_id : machine_tool_group_id_popup,
                         machine_tool_name : machine_tool_name,
                         machine_tool_name_eng : machine_tool_name_eng,
                         manufactuer_id : manufactuer_id,
                         model : model,
                         model_year : model_year,
                         id : id,
                         machine_code : machine_code,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Güncelleme İşlemi Başarısız...', 
                                           'Makina güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMachineTools" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Makina Güncelleme İşlemi Başarılı...', 
                                       'Makina güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Güncelleme İşlemi Başarısız...', 
                                      'Makina güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysMachineTools" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Makina Güncelleme İşlemi Başarısız...', 
                                      'Makina güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * insert menu type
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.insertMenuType = function (nodeID, nodeName) {
     var loaderInsertBlock = $("#loading-image-crud").loadImager();
     loaderInsertBlock.loadImager('appendImage');

     var machine_code = $('#machine_code').val();
     var model_year = $('#model_year').val();     
     var model = $('#model').val();

     var ddData = $('#dropdownProducers').data('ddslick')
     var manufactuer_id = ddData.selectedData.value;

     var machine_tool_name_eng = $('#machine_tool_name_eng').val();
     var machine_tool_name = $('#machine_tool_name').val();
     var machine_code = $('#machine_code').val();

     var selectedTreeItem = $('#tt_tree_menu2').tree('getSelected');
     var machine_tool_grup_id = selectedTreeItem.id;

     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',   
                     data : {
                         url:'pkInsert_sysMachineTools' ,
                         machine_code : machine_code,
                         model_year : model_year,
                         model : model,
                         manufactuer_id : manufactuer_id,
                         machine_tool_name_eng : machine_tool_name_eng,
                         machine_tool_name : machine_tool_name,
                         machine_tool_grup_id : machine_tool_grup_id,
                         machine_code : machine_code,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({  
          onError : function (event, textStatus, errorThrown) {   
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Menü Tipi Ekleme İşlemi Başarısız...', 
                                       'Menü tipi ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
              console.error('"pkInsert_sysMachineTools" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
              console.log(data);
              var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     $('#machineForm')[0].reset();
                     $('#dropdownProducers').ddslick('select', {index: '0' });
                     //var nodeSelected = $('#tt_tree_menu2').tree('find', machine_tool_grup_id); 
                     var nodeSelected = $('#tt_tree_menu2').tree('getSelected');
                     $('tt_tree_menu2').tree('unselect', nodeSelected); 

                     loaderInsertBlock.loadImager('removeLoadImage');
                     $('#tt_grid_dynamic').datagrid({
                         queryParams: {
                                 pk: $('#pk').val(),
                                 subject: 'datagrid',
                                 url : 'pkGetMachineTools_sysMachineTools',
                                 sort : 'id',
                                 order : 'desc',
                         },
                     });
                     $('#tt_grid_dynamic').datagrid('enableFilter');
                     $('#tt_grid_dynamic').datagrid('reload');
                 }
             });
             sm.successMessage('show', 'Menü Tipi Kayıt İşlemi Başarılı...', 
                                       'Menü tipi kayıt işlemini gerçekleştirdiniz... ',
                                       data);

          },
          onErrorDataNull : function (event, data) {
              dm.dangerMessage('resetOnShown');
              dm.dangerMessage('show', 'Menü Tipi Kayıt İşlemi Başarısız...', 
                                       'Menü tipi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
              console.error('"pkInsert_sysMachineTools" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Menü Tipi Kayıt İşlemi Başarısız...', 
                                     'Menü tipi kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkInsert_sysMachineTools" servis hatası->'+data.errorInfo);
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
              dm.dangerMessage({
                 onShown : function(event, data) {
                     $('#machineForm')[0].reset();
                     loaderInsertBlock.loadImager('removeLoadImage');
                 }
              });
              dm.dangerMessage('show', 'Menü Tipi Kayıt İşlemi Başarısız...', 
                                       'Aynı isim ile menü tipi kaydı yapılmıştır, yeni bir menü tipi ismi deneyiniz... ');
          }
    }) 
    aj.ajaxCall('call');
}
   

/**
 * active/passive menu type
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.activePassiveMenuTypeWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 var domElement = e.target;
 wcm.warningComplexMessage({onConfirm : function(event, data) {
        activePassiveMenuType(id, domElement);
    }
    });
wcm.warningComplexMessage('show', 'Menü Tipi Aktif/Pasif İşlemi Gerçekleştirmek Üzeresiniz!', 
                                  'Meni tipi aktif/pasif işlemi gerçekleştirmek  üzeresiniz.... ');
 return false;
}

/**
 * update menu type
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 21/07/2016
 */
window.activePassiveMenuType = function (id, domElement) {
    var loader = $("#loading-image-grid-container").loadImager();
    loader.loadImager('appendImage');
    var id = id;
    console.log(domElement);
    
     
    var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdateMakeActiveOrPassive_sysMachineTools' ,
                         id : id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Menü Tip Aktif/Pasif İşlemi Başarısız...', 
                                      'Menü tip aktif/pasif işlemi, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysMachineTools" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Menü Tip Aktif/Pasif İşlemi Başarılı...', 
                                       'Menü tip aktif/pasif işlemini gerçekleştirdiniz... ',
                                       data);
            if($(domElement).hasClass("fa-minus-circle")){
                $(domElement).removeClass("fa-minus-circle");
                $(domElement).addClass("fa-plus-circle");
                
                $(domElement).parent().removeClass("btn-primary");
                $(domElement).parent().addClass("btn-warning");
            } else if($(domElement).hasClass("fa-plus-circle" )) {
                $(domElement).removeClass("fa-plus-circle");
                $(domElement).addClass("fa-minus-circle");
                
                $(domElement).parent().removeClass("btn-warning");
                $(domElement).parent().addClass("btn-primary");
            }
                
                
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Menü Tip Aktif/Pasif İşlemi Başarısız...', 
                                      'Menü tip aktif/pasif işlemi güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdateMakeActiveOrPassive_sysMachineTools" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Menü Tip Aktif/Pasif İşlemi Başarısız...', 
                                      'Menü tip aktif/pasif işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}

   
   
   
});
