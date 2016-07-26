$(document).ready(function () {


/**
 * Actions / menu types datagrid is being filled
 * @since 26/07/2016
 */
$('#tt_grid_dynamic').datagrid({
    onDblClickRow : function (index, row) {
        
    },  
    url : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
    queryParams: {
            pk: $('#pk').val(),
            subject: 'datagrid',
            url : 'pkFillMenuTypesActionLeftList_sysAclMenuTypesActions',
            sort : 'id',
            order : 'desc',
            /*machine_groups_id : null,
            filterRules:null*/
    },
    width : '100%',
    singleSelect:true,
    pagination : true,
    collapsible:true,
    method:'get',
    idField:'id',
    //fit:true,
    //fitColumns : true,
    remoteFilter: true,
    remoteSort:true,
    multiSort:false,
    rowStyler: function(index,row){
        if (row.resource_name == 'Firma İşlemleri'){
            return 'background-color:#d2d6de;color:#444;font-weight:bold;';
        }
    },
    columns:
        [[
            {field:'id',title:'ID'},
            {field:'module_name',title:'Modül',sortable:true,width:150},
            {field:'action_name',title:'Action',sortable:true,width:150},
            {field:'menu_type_name',title:'Menü Tipi',sortable:true,width:200},
            {field:'action',title:'Action',width:80,align:'center',
                formatter:function(value,row,index){
                    if(row.attributes.active == 0) {
                        var e = '<button style="padding : 2px 4px;" title="Pasif yap"  class="btn btn-primary" type="button" onclick="return activePassiveACLPrivilegesWrapper(event, '+row.id+');"><i class="fa fa-minus-circle"></i></button>';
                    } else {
                        var e = '<button style="padding : 2px 4px;" title="Aktif yap"  class="btn btn-warning" type="button" onclick="return activePassiveACLPrivilegesWrapper(event, '+row.id+');"><i class="fa fa-plus-circle"></i></button>';
                    }
                    var d = '<button style="padding : 2px 4px;" title="Sil"  class="btn btn-danger" type="button" onclick="return deleteACLPrivilegeUltimatelyDialog('+row.id+', '+index+');"><i class="fa fa-eraser"></i></button>';
                    var u = '<button style="padding : 2px 4px;" title="Güncelle"  class="btn btn-info" type="button" onclick="return updateMenuTypeActionDialog('+row.id+', { name : \''+row.name+'\',\n\
                                                                                                                                                name_eng : \''+row.name_eng+'\'} );"><i class="fa fa-arrow-circle-up"></i></button>';
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


var sm  = $(window).successMessage();
var dm  = $(window).dangerMessage();
var wm  = $(window).warningMessage();
var wcm = $(window).warningComplexMessage({ denyButtonLabel : 'Vazgeç' ,
                                           actionButtonLabel : 'İşleme devam et'});
                                            
// Left menuyu oluşturmak için çağırılan fonksiyon...
$.fn.leftMenuFunction();


/**
 * wrapper for Zend Action / Menu Types insert process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 */
window.insertMenuTypeActionDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" Action için menü tipi atamaktasınız...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <form id="aclPrivilegeFormPopup" method="get" class="form-horizontal">\n\
                                                     <input type="hidden" id="machine_tool_group_id_popup" name="machine_tool_group_id_popup"  />\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Menü Tipi</label>\n\
                                                         <div class="col-sm-10">\n\
                                                            <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div id="dropdownMenuTypesInsertPopup" ></div>\n\
                                                            </div>\n\
                                                          </div>\n\
                                                        </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return insertMenuTypeActionWrapper(event, '+id+');">\n\
                                                                 <i class="fa fa-save"></i> Kaydet </button>\n\
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
            $('#aclPrivilegeFormPopup').validationEngine();
             
            $("#mach-prod-box-popup").loadImager();
            $("#mach-prod-box-popup").loadImager('appendImage');
            
            var ajaxACLResourcesPopup = $(window).ajaxCallWidget({
            proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                    data: { url:'pkFillResourcesDdList_sysAclResources' ,
                            pk : $("#pk").val() 
                    }
       })
        ajaxACLResourcesPopup.ajaxCallWidget ({
            onError : function (event, textStatus,errorThrown) {
                dm.dangerMessage({
                   onShown : function() {
                       //$('#mach-prod-box').loadImager('removeLoadImage'); 
                   }
                });
                dm.dangerMessage('show', 'ACL Resource (Kaynak) Bulunamamıştır...',
                                         'ACL resource (kaynak) bulunamamıştır...');
            },
            onSuccess : function (event, data) {
                var data = $.parseJSON(data);
                    $('#mach-prod-box-popup').loadImager('removeLoadImage');
                    $('#dropdownMenuTypesInsertPopup').ddslick({
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
                    /*$('#dropdownMenuTypesPopup').ddslick('selectByValue', 
                                                {index: ''+row.resource_id+'' ,
                                                 text : ''+row.resource_name+''}
                                                );*/
                },
                onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'ACL Resource (Kaynak) Bulunamamıştır...',
                                              'ACL resource (kaynak) bulunamamıştır...');
                 },
            }) 
            ajaxACLResourcesPopup.ajaxCallWidget('call');
            
            
         },
         onhide : function() {
             if(window.gridReloadController == true) {
                 $('#tt_grid_dynamic').datagrid('reload');
             }

         },
     });
     return false;
}
   
 /**
 * attach (Insert) Action / Menu Type wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 */
window.insertMenuTypeActionWrapper = function (e, id) {
    e.preventDefault();
    var id = id;
    
   var ddData = $('#dropdownMenuTypesInsertPopup').data('ddslick');
   if(ddData.selectedData.value>0) {
       insertActionMenuType(id);
   } else {
       wm.warningMessage('resetOnShown');
       wm.warningMessage('show', 'Menü Tipi Seçiniz', 'Lütfen Menü Tip seçiniz!')
   }
   return false;
 

}

/**
 * insert (attach) Action / Menu Type
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 */
window.insertActionMenuType = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var ddData = $('#dropdownMenuTypesInsertPopup').data('ddslick');
     var menu_type_id = ddData.selectedData.value;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysAclPrivilege' ,
                         id : id,
                         menu_type_id : menu_type_id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Action / Menü Tip Ekleme İşlemi Başarısız...', 
                                      'Action / Menü Tip ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclPrivilege" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'Action / Menü Tip Ekleme İşlemi Başarılı...', 
                                       'Action / Menü Tip ekleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Action / Menü Tip Ekleme İşlemi Başarısız...', 
                                      'Action / Menü Tip ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclPrivilege" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'Action / Menü Tip Ekleme Güncelleme İşlemi Başarısız...', 
                                      'Action / Menü Tip ekleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   
/**
 * wrapper for Action / Menu Type update process
 * @param {type} nodeID
 * @param {type} nodeName
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 26/07/2016
 */
window.updateMenuTypeActionDialog = function (id, row) {
    window.gridReloadController = false;
    //console.log(row);
    BootstrapDialog.show({  
         title: '"'+ row.name + '" ACL yetkisini güncellemektesiniz...',
         message: function (dialogRef) {
                     var dialogRef = dialogRef;
                     var $message = $(' <div class="row">\n\
                                             <div class="col-md-12">\n\
                                                 <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                     <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                         <label class="col-sm-2 control-label">Menü Tipi</label>\n\
                                                         <div class="col-sm-10">\n\
                                                             <div class="input-group">\n\
                                                                 <div class="input-group-addon">\n\
                                                                     <i class="fa fa-hand-o-right"></i>\n\
                                                                 </div>\n\
                                                                 <div id="dropdownMenuTypesPopup" ></div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                     </div>\n\
                                                         <div class="form-group">\n\
                                                             <label class="col-sm-2 control-label">Açıklama</label>\n\
                                                             <div id="mach-prod-box-popup" class="col-sm-10">\n\
                                                                 <div class="input-group">\n\
                                                                     <div class="input-group-addon">\n\
                                                                         <i class="fa fa-hand-o-right"></i>\n\
                                                                     </div>\n\
                                                                     <textarea data-prompt-position="topLeft:70" class="form-control validate[required]" rows="3" name="description_popup" id="description_popup" placeholder="Açıklama ...">'+row.description+'</textarea>\n\
                                                                 </div>\n\
                                                             </div>\n\
                                                         </div>\n\
                                                         <div class="hr-line-dashed"></div>\n\
                                                         <div class="form-group">\n\
                                                             <div class="col-sm-10 col-sm-offset-2">\n\
                                                             <button id="insertMachPopUp" class="btn btn-primary" type="submit" onclick="return updateMenuTypeActionWrapper(event, '+id+');">\n\
                                                                 <i class="fa fa-save"></i> Güncelle </button>\n\
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
            $('#aclPrivilegeFormPopup').validationEngine();
             
            $("#mach-prod-box-popup").loadImager();
            $("#mach-prod-box-popup").loadImager('appendImage');
            
            var ajaxACLResourcesPopup = $(window).ajaxCallWidget({
            proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                    data: { url:'pkFillResourcesDdList_sysAclResources' ,
                            pk : $("#pk").val() 
                    }
       })
        ajaxACLResourcesPopup.ajaxCallWidget ({
            onError : function (event, textStatus,errorThrown) {
                dm.dangerMessage({
                   onShown : function() {
                       //$('#mach-prod-box').loadImager('removeLoadImage'); 
                   }
                });
                dm.dangerMessage('show', 'ACL Resource (Kaynak) Bulunamamıştır...',
                                         'ACL resource (kaynak) bulunamamıştır...');
            },
            onSuccess : function (event, data) {
                var data = $.parseJSON(data);
                    $('#mach-prod-box-popup').loadImager('removeLoadImage');
                    $('#dropdownMenuTypesPopup').ddslick({
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
                    $('#dropdownMenuTypesPopup').ddslick('selectByValue', 
                                                {index: ''+row.resource_id+'' ,
                                                 text : ''+row.resource_name+''}
                                                );
                },
                onErrorDataNull : function (event, data) {
                     dm.dangerMessage({
                        onShown : function() {
                            //$('#mach-prod-box-popup').loadImager('removeLoadImage'); 
                        }
                     });
                     dm.dangerMessage('show', 'ACL Resource (Kaynak) Bulunamamıştır...',
                                              'ACL resource (kaynak) bulunamamıştır...');
                 },
            }) 
            ajaxACLResourcesPopup.ajaxCallWidget('call');
            
            
         },
         onhide : function() {
             if(window.gridReloadController == true) {
                 $('#tt_grid_dynamic').datagrid('reload');
             }

         },
     });
     return false;
}

/**
 * update ACL privilege wrapper
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 14/07/2016
 */
window.updateMenuTypeActionWrapper = function (e, id) {
 e.preventDefault();
 var id = id;
 if ($("#aclPrivilegeFormPopup").validationEngine('validate')) {
     
     var ddData = $('#dropdownMenuTypesPopup').data('ddslick');
    if(ddData.selectedData.value>0) {
        updateActionMenuType(id);
    } else {
        wm.warningMessage('resetOnShown');
        wm.warningMessage('show', 'ACL Resource Seçiniz', 'Lütfen ACL resource seçiniz!')
    }
    return false;
 }
 return false;
}

/**
 * update ACL privilege
 * @returns {undefined}
 * @author Mustafa Zeynel Dağlı
 * @since 14/07/2016
 */
window.updateActionMenuType = function (id) {
     var loader = $('#loading-image-crud-popup').loadImager();
     loader.loadImager('appendImage');
     
     var ddData = $('#dropdownMenuTypesPopup').data('ddslick');
     var resource_id = ddData.selectedData.value;
     
     var aj = $(window).ajaxCall({
                     proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                     data : {
                         url:'pkUpdate_sysAclPrivilege' ,
                         id : id,
                         name : $('#name_popup').val(),
                         name_eng : $('#name_eng_popup').val(),
                         description : $('#description_popup').val(),
                         resource_id : resource_id,
                         pk : $("#pk").val()
                     }
    })
    aj.ajaxCall ({
          onError : function (event, textStatus, errorThrown) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Yetki Güncelleme İşlemi Başarısız...', 
                                      'ACL yetki güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclPrivilege" servis hatası->'+textStatus);
          },
          onSuccess : function (event, data) {
             var data = data;
             sm.successMessage({
                 onShown: function( event, data ) {
                     loader.loadImager('removeLoadImage');
                 }
             });
             sm.successMessage('show', 'ACL Yetki Güncelleme İşlemi Başarılı...', 
                                       'ACL yetki güncelleme işlemini gerçekleştirdiniz... ',
                                       data);
             window.gridReloadController = true;
          },
          onErrorDataNull : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Yetki Güncelleme İşlemi Başarısız...', 
                                      'ACL yetki güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             console.error('"pkUpdate_sysAclPrivilege" servis datası boştur!!');
          },
          onErrorMessage : function (event, data) {
             dm.dangerMessage('resetOnShown');
             dm.dangerMessage('show', 'ACL Yetki Güncelleme İşlemi Başarısız...', 
                                      'ACL yetki güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
          },
          onError23503 : function (event, data) {
          },
          onError23505 : function (event, data) {
          }
    }) 
    aj.ajaxCall('call');
}
   

   
   
   
});
