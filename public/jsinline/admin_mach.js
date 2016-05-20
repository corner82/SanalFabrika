$(document).ready(function () {



/**
 * Machine datagrid is being filled
 * @since 16/05/2016
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
            {field:'machine_tool_name',title:'Makina',sortable:true,width:300},
            {field:'machine_tool_name_eng',title:'İng. Makina',sortable:true, width:300},
            {field:'group_name',title:'Mak. Kategorisi', width:200},
            {field:'manufacturer_name',title:'Üretici', width:200},
        ]]   
});
$('#tt_grid_dynamic').datagrid('enableFilter');


/**
 * easyui tree extend for 'unselect' event
 * @author Mustafa Zeynel Dağlı
 * @since 04/04/2016
 */
$.extend($.fn.tree.methods,{
        unselect:function(jq,target){
                return jq.each(function(){
                        var opts = $(this).tree('options');
                        $(target).removeClass('tree-node-selected');
                        if (opts.onUnselect){
                                opts.onUnselect.call(this, $(this).tree('getNode',target));
                        }
                });
        }
});

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
* @Since 2016.01.16
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
                                            
 
 /*
* 
* @type @call;$@call;loadImager
* @Since 16/05/2016
* @Author Mustafa Zeynel Dagli
* @Purpose this variable is to create loader image for machine 
* producers dropdown. Loading image will be removed when dropdown filled data.
*/
$("#mach-prod-box").loadImager();
$("#mach-prod-box").loadImager('appendImage');

/**
 * machine insert form validation engine attached to work
 * @since 16/05/2016
 */
$('#machineForm').validationEngine();

 /**
* reset button function for machine insert form
* property insert
* for 'insert' and 'update' form buttons
* @returns null
* @author Mustafa Zeynel Dağlı  
* @since 16/05/2016
*/
window.resetMachineForm = function () {
   $('#machineForm').validationEngine('hide');
   return false;
}
                                            
/**
 * machine producers dropdown ajax call
 * @type @call;$@call;ajaxCallWidget
 * @since 16/05/2016
 */
var ajaxMacProducers = $(window).ajaxCallWidget({
    proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            data: { url:'pkFillManufacturerList_sysManufacturer' ,
                    language_code : 'tr',
                    pk : $("#pk").val() 
            }
   })
ajaxMacProducers.ajaxCallWidget ({
     onError : function (event, textStatus,errorThrown) {
         dm.dangerMessage({
            onShown : function() {
                $('#mach-prod-box').loadImager('removeLoadImage'); 
            }
         });
         dm.dangerMessage('show', 'Makina Üreticisi Bulunamamıştır...',
                                  'Makina üreticisi firma bulunamamıştır...');
     },
     onSuccess : function (event, data) {
         var data = $.parseJSON(data);
         $('#mach-prod-box').loadImager('removeLoadImage');
         $('#dropdownProducers').ddslick({
            height : 200,
            data : data, 
            width:'98%',
            selectText: "Select your preferred social network",
            //showSelectedHTML : false,
            defaultSelectedIndex: 3,
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
ajaxMacProducers.ajaxCallWidget('call')

   
/*
* 
* machine category tree
* Mustafa Zeynel Dağlı
* 25/04/2016
*/
$('#tt_tree_menu2').tree({  
   url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillJustMachineToolGroupsBootstrap_sysMachineToolGroups&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
   method: 'get',
   animate: true,
   checkbox: true,
   cascadeCheck: false,
   lines: true,
   onLoadSuccess: function (node, data) {
        loader.loadImager('removeLoadImage');
   },
   onClick: function (node) {
        selectedRoot = $(this).tree('getRoot', node.target);
        selectedItem = $(this).tree('getData', node.target);
    },
   onSelect : function(node) {
       alert('selected');
   },
   onCheck: function (node, checked) {
       var self = $(this);
       var tagBuilder = $('#test-cabin').tagCabin({
                tagCopy         : true,
                tagDeletable    : false,
                tagDeletableAll : true, 
                tagBox          : $('.tag-container').find('ul'),
                dataMapper      : {attributes : Array('machine_grup_id')}

        }); 
        tagBuilder.tagCabin({
            onTagCopied : function(event, data) {
                console.log(data.id);
                console.log(data);
                window.cloneMachPropDialog(data.id, data.element.text());
            }
        });
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
                window.getMachineDueCategories(node, self);
            }
        }
    },
   formatter: function (node) {
        var s = node.text;
        var id = node.id;
        var parent = $(this).tree('getParent', node.target);
        if(node.state == 'open') {
            s += '&nbsp;\n\
                <i class="fa fa-level-down" title="Kategoriye makina özelliği ekle" onclick="insertMachPropDialog('+id+', \''+node.text+'\')"></i>';
            return s;
        }
        return s;
    }
});
    
/**
* wrapper for machine property clone process
* @param {type} nodeID
* @param {type} nodeName
* @returns {Boolean}
* @author Mustafa Zeynel Dağlı
* @since 03/05/2016
*/
window.cloneMachPropDialog = function (nodeID, nodeName) {
var nodeID = nodeID;
var nodeName = nodeName;
BootstrapDialog.show({  
    title: '"'+ nodeName + '" makina özelliğini yeni makina katmanlarına eklemektesiniz...',
    message: function (dialogRef) {
                var dialogRef = dialogRef;
                var $message = $(' <div class="row">\n\
                                        <div class="col-md-12">\n\
                                            <div id="loading-image-clone-popup" class="box box-primary">\n\
                                                <form id="machPropFormInsertPopup" method="get" class="form-horizontal">\n\
                                                <div class="hr-line-dashed"></div>\n\
                                                    <div class="form-group" style="padding-top: 10px;" >\n\
                                                        <label class="col-sm-2 control-label">Makina Kategorileri</label>\n\
                                                        <div class="col-sm-10">\n\
                                                            <div class="input-group">\n\
                                                                <div class="input-group-addon">\n\
                                                                    <i class="fa fa-hand-o-right"></i>\n\
                                                                </div>\n\
                                                                <ul id="tt_tree_menu_popup_clone" class="easyui-tree" ></ul>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                    </div>\n\
                                                    <div class="hr-line-dashed"></div>\n\
                                                    <div class="form-group">\n\
                                                        <div class="col-sm-10 col-sm-offset-2">\n\
                                                        <button id="cloneMachPropPopUp" class="btn btn-primary" type="submit" onclick="return cloneMachPropWrapper(event, '+nodeID+', \''+nodeName+'\');">\n\
                                                            <i class="fa  fa-copy"></i> Kopyala </button>\n\
                                                        <button id="resetForm" onclick="regulateButtonsPopupClone();" class="btn btn-flat" type="reset" " >\n\
                                                            <i class="fa fa-remove"></i> Reset </button>\n\
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
        var loader = $('#loading-image-clone-popup').loadImager();
        loader.loadImager('appendImage');
       $("#machPropFormInsertPopup").validationEngine();


       $('#tt_tree_menu_popup_clone').tree({  
            url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillJustMachineToolGroupsNotInProperty_sysMachineToolGroups&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val()+ '&property_id='+nodeID,
            method: 'get',
            animate: true,
            checkbox: true,
            cascadeCheck: false,
            lines: true,
            onLoadSuccess: function (node, data) {
                 loader.loadImager('removeLoadImage');
            },
            onClick: function (node) {
                 selectedRoot = $(this).tree('getRoot', node.target);
                 selectedItem = $(this).tree('getData', node.target);
             },
            onCheck: function (node, checked) {
                var self = $(this);
                var tagBuilder = $('#test-cabin').tagCabin({
                         tagCopy         : true,
                         tagDeletable    : false,
                         tagDeletableAll : true, 
                         tagBox          : $('.tag-container').find('ul'),
                         dataMapper      : {attributes : Array('machine_grup_id')}

                 }); 
                 tagBuilder.tagCabin({
                     onTagCopied : function(event, data) {
                         console.log(data.id);
                         console.log(data);
                         window.cloneMachPropDialog(data.id, data.element.text());
                     }
                 });
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
                         //window.getMachineDueCategories(node, self, tagBuilder);
                     }
                 } else if(checked == false){
                     if(self.tree('isLeaf', node.target) && node.state=='open') {
                         window.clearMachineProp(node, tagBuilder);
                     }
                 }
             },
            formatter: function (node) {
                 var s = node.text;
                 var id = node.id;
                 var parent = $(this).tree('getParent', node.target);

                 return s;
             }
         });



    },
    onhide : function() {
    },
});
return false;
}
   
/**
 * insert unit item
 * @returns {Boolean}
 * @author Mustafa Zeynel Dağlı
 * @since 04/04/2016
 */
window.cloneMachPropWrapper = function (e, nodeID, nodeName) {
 e.preventDefault();
 var nodeID = nodeID;
 var nodeName = nodeName;
 console.log($('#tt_tree_menu_popup_clone').tree('getChecked'));
 if($('#tt_tree_menu_popup_clone').tree('getChecked').length === 0) {
     wm.warningMessage('resetOnShown');
     wm.warningMessage('show', 'Makina Kategorisi Seçiniz', 'Lütfen makina kategorisi Seçiniz!');
     return false;
 }
 cloneMachProp(nodeID, nodeName);

 return false;
}
   
   /**
    * clone machine property item to different machine categories
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 03/05/2016
    */
   window.cloneMachProp = function (nodeID, nodeName) {
        var loader = $("#loading-image-clone-popup").loadImager();
        loader.loadImager('appendImage');
 
        language_code = $('#langCode').val();
        checkedTreeItems = $('#tt_tree_menu_popup_clone').tree('getChecked');
        
        var machineGroupIDArray = [];
        $.each(checkedTreeItems, function(key, item) {
            machineGroupIDArray.push(parseInt(item.id));
        })
        var objmachineGroupID = $.extend({}, machineGroupIDArray);
        var jsonMachineGroupID = JSON.stringify(objmachineGroupID);
        

        var unitGrupIDArray = [];
        unitGrupIDArray.push(nodeID);
        var objUnitGroupID = $.extend({}, unitGrupIDArray);
        var jsonUnitGroupID = JSON.stringify(objUnitGroupID);

        var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',   
                        data : {
                            url:'pkInsert_sysMachineToolPropertyDefinition' ,
                            language_code : language_code,
                            unit_grup_id : jsonUnitGroupID,
                            machine_grup_id : jsonMachineGroupID,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({  
             onError : function (event, textStatus, errorThrown) {   
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Kopyalama İşlemi Başarısız...', 
                                          'Makina özelliği kopyalama işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
                 console.error('"pkInsert_sysMachineToolPropertyDefinition" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 console.log(data);
                 var data = data;
                sm.successMessage({
                    onShown: function( event, data ) {
                        regulateButtonsPopupClone()();
                        loader.loadImager('removeLoadImage');
                        
                    }
                });
                sm.successMessage('show', 'Makina Özelliği Kopyalama İşlemi Başarılı...', 
                                          'Makina özelliği kopyalama işlemini gerçekleştirdiniz... ',
                                          data);
                
             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Makina Özelliği Kopyalama İşlemi Başarısız...', 
                                          'Makina özelliği kopyalama işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                 console.error('"pkInsert_sysMachineToolPropertyDefinition" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Özelliği Kopyalama İşlemi Başarısız...', 
                                        'Makina özelliği kopyalama işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkInsert_sysMachineToolPropertyDefinition" servis hatası->'+textStatus);
             },
       }) 
       aj.ajaxCall('call');
   }
    
    
    /**
     * set machine due to machine categories
     * @param {type} node
     * @param {type} treeObj
     * @param {type} tagBuilder
     * @returns {undefined}
     * @since 17/05/2016
     */
    window.getMachineDueCategories = function(node, treeObj) {
        alert('getMachineDueCategories');
        var nodeID = node.id;
        var checkedArray = [];
        var checked = treeObj.tree('getChecked');
        if(checked.length >0) {
            $.each(checked, function(index, item) {
                checkedArray.push(parseInt(item.id));
            });
            //console.log(checked);

            var objChecked = $.extend({}, checkedArray);
            //console.log(objTest);
            var json=JSON.stringify(objChecked);
            //console.log(json);
            //console.log(JSON.stringify(demoArray));
            console.log(JSON.parse(json)); 
            //var filterRules = $('#tt_grid_dynamic').datagrid('getFilterRule', 'machine_tool_name');
            //console.log(filterRules);
            /*var filters = $('#tt_grid_dynamic').datagrid('filterStringify', function(data){
                        return JSON.stringify(data);
                });
            console.log(filters);*/

            //$('#tt_grid_dynamic').datagrid('disableFilter');
            $('#tt_grid_dynamic').datagrid({  

                //url : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                //url: 'http://proxy.localhost.com/SlimProxyBoot.php?url=getCompaniesInfo_company',
                queryParams: {
                        pk: $('#pk').val(),
                        subject: 'datagrid',
                        url : 'pkGetMachineTools_sysMachineTools',
                        machine_groups_id : json,
                        //filterRules:[{"field":"machine_tool_name","op":"contains","value":"e"}]
                },

            });
            $('#tt_grid_dynamic').datagrid('enableFilter');
        }
        /*$('#loading-image-grid-container').loadImager();
        $('#loading-image-grid-container').loadImager('appendImage');*/
    }
    

    // Left menuyu oluşturmak için çağırılan fonksiyon...
    $.fn.leftMenuFunction();

    //Validation forms binded...
    jQuery("#unitForm").validationEngine();
    
   
                                            
    //$('#mach_prop_tab_container a[href="#tab_mach_prop_update"]').tab('show');
    
    /**
     * machine property update  tab click
     * @author Mustafa Zeynel Dağlı
     * @since 21/04/2016
     */
    $('#mach_prop_tab_container #tab_mach_prop_update_clicker').click(function (e) {
        if(!$('#tab_mach_prop_update').hasClass('active')) {
            wm.warningMessage({ 
                onShown : function(event, data) {
                    $('#tab_mach_prop_update').loadImager();
                    $('#tab_mach_prop_update').loadImager('appendImage');
                    //$('#tab_image_loader').loadImager('removeLoadImage');  
                }
            });
            wm.warningMessage('show', 'Metrik Sistem Seçiniz', 'Lütfen Metrik sistem Seçiniz!');
        }
        e.preventDefault();
     })
    

   /**
    * wrapper class for pop up and delete machine property ultimately
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.deleteMachPropUltimatelyDialog= function(id, element, machine_group_id){
       var nodeID = nodeID;
       wcm.warningComplexMessage({onConfirm : function(event, data) {
           deleteMachPropUltimately(id, element, machine_group_id);
       }
       });
       wcm.warningComplexMessage('show', 'Makina Özelliğini Tüm Kategorilerden Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                         'Makina özelliğini tüm kategorilerden Öğesini silmek üzeresiniz, birim silme işlemi geri alınamaz!! ');
   }
   
   /**
    * wrapper class for pop up and delete machine property from specific
    * machine category
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.deleteMachPropDialog= function(id, element){
       var nodeID = nodeID;
       wcm.warningComplexMessage({onConfirm : function(event, data) {
           deleteMachProp(id, element);
       }
       });
       wcm.warningComplexMessage('show', 'Makina Özelliğini Kategoriden Silme İşlemi Gerçekleştirmek Üzeresiniz!', 
                                         'Makina özelliğini kategoriden  silmek üzeresiniz, makina özelliği silme işlemi geri alınamaz!! ');
   }
   
   /**
    * delete machine property from a specific machine category
    * @param {type} id
    * @param {type} element
    * @param {type} machine_group_id
    * @returns {undefined}
    * @since 03/05/2016
    */
   window.deleteMachProp = function(id, element) {
       var loader = $("#loading-image-crud-popup").loadImager();  
       loader.loadImager('appendImage');
       var ajPopUpDelete = $(window).ajaxCall({
                        proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                        data : {
                            url:'pkDeletePropertyMachineGroup_sysMachineToolPropertyDefinition' ,
                            property_id : id,
                            machine_grup_id : element.attr('data-machine_grup_id'),
                            pk : $("#pk").val()
                        }
       });
       ajPopUpDelete.ajaxCall ({
                onError : function (event, textStatus, errorThrown) {  
                    dm.dangerMessage('resetOnShown');  
                    dm.dangerMessage('show', 'Makina Özelliği Silme İşlemi Başarısız...',
                                              'Makina özelliği silinememiştir, sistem yöneticisi ile temasa geçiniz...');
                    console.error('"pkDeletePropertyMachineGroup_sysMachineToolPropertyDefinition" servis hatası->'+textStatus);
                },
                onSuccess : function (event, data) {
                    sm.successMessage({ 
                        onShown : function() {
                            loader.loadImager('removeLoadImage');
                            element.remove();
                        }
                    });
                    sm.successMessage('show', 'Makina Özelliği Silme İşleminiz Başarılı...',
                                              'Makina özelliğini silme işleminiz başarılı...')
                },                                   
        });
        ajPopUpDelete.ajaxCall('call');
   }
   
   /**
    * delete machine property from all kategories
    * @param {type} id
    * @param {type} element
    * @param {type} machine_group_id
    * @returns {undefined}
    * @since 03/05/2016
    */
   window.deleteMachPropUltimately = function(id, element, machine_group_id) {
       $('#mach-prop-box').loadImager();
       $('#mach-prop-box').loadImager('appendImage');

    var ajDeleteAll = $(window).ajaxCall({
                proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data : {
                    url:'pkDelete_sysMachineToolPropertyDefinition' ,
                    id : id,
                    pk : $("#pk").val()
                }
    });
    ajDeleteAll.ajaxCall ({
        onError : function (event, textStatus, errorThrown) {  
            dm.dangerMessage('resetOnShown');  
            dm.dangerMessage('show', 'Makina Özelliği Silme İşlemi Başarısız...',
                                      'Makina özelliği silinememiştir, sistem yöneticisi ile temasa geçiniz...');
            console.error('"pkDelete_sysMachineToolPropertyDefinition" servis hatası->'+textStatus);
        },
        onSuccess : function (event, data) {
            sm.successMessage({ 
                onShown : function() {
                    $('#mach-prop-box').loadImager('removeLoadImage');
                    element.remove();
                }
            });
            sm.successMessage('show', 'Makina Özelliği Silme İşleminiz Başarılı...',
                                      'Makina özelliğini silme işleminiz başarılı...')
        },                                   
    });
    ajDeleteAll.ajaxCall('call');
   }
   
   
   /**
    * reset button function for popup insert window for machine
    * property insert
    * for 'insert' and 'update' form buttons
    * @returns null
    * @author Mustafa Zeynel Dağlı
    * @since 28/04/2016
    */
   window.regulateButtonsPopupInsert = function () {
       $('#machPropFormInsertPopup').validationEngine('hide');
       return false;
   }
   
   /**
    * reset button function for popup clone window for machine
    * property insert
    * for 'insert' and 'update' form buttons
    * @returns null
    * @author Mustafa Zeynel Dağlı
    * @since 03/05/2016
    */
   window.regulateButtonsPopupClone = function () {
       var selectedItems = $('#tt_tree_menu_popup_clone').tree('getChecked');
       $.each(selectedItems, function(key, item) {
           $('#tt_tree_menu_popup_clone').tree('uncheck', item.target);
       });
       return false;
   }
   
   /**
    * insert unit item
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.insertMachPropWrapper = function (e, nodeID, nodeName) {
    e.preventDefault();
    var ddData = $('#dropdownProducers').data('ddslick');
    alert(ddData.selectedData.value);
    /*var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#machPropFormInsertPopup").validationEngine('validate')) {
        if($('#tt_tree_menu_popup').tree('getSelected') == null) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Birim Seçiniz', 'Lütfen birim kategorisi Seçiniz!');
            return false;
        }
        insertMachProp(nodeID, nodeName);
    }*/
    return false;
   }
   
   
   
   /**
    * wrapper for machine property insert process
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 19/04/2016
    */
   window.insertMachPropDialog = function (nodeID, nodeName) {
    var nodeID = nodeID;
    var nodeName = nodeName;
    BootstrapDialog.show({  
        title: '"'+ nodeName + '" makina katmanına yeni özellik eklemektesiniz...',
        message: function (dialogRef) {
                    var dialogRef = dialogRef;
                    var $message = $(' <div class="row">\n\
                                            <div class="col-md-12">\n\
                                                <div id="loading-image-crud-popup" class="box box-primary">\n\
                                                    <form id="machPropFormInsertPopup" method="get" class="form-horizontal">\n\
                                                    <div class="hr-line-dashed"></div>\n\
                                                        <div class="form-group" style="padding-top: 10px;" >\n\
                                                            <label class="col-sm-2 control-label">Birim Sistemi</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <ul id="tt_tree_menu_popup" class="easyui-tree" ></ul>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Mevcut Kategori Özellikleri</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <div style="margin-bottom: -10px;" class="tag-container-popup">\n\
                                                                        <ul id="test-cabin-popup" class="tag-box"></ul>\n\
                                                                    </div>\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">Makina Özelliği</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="property_name_popup" id="property_name_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="form-group">\n\
                                                            <label class="col-sm-2 control-label">İngilizce Makina Özelliği</label>\n\
                                                            <div class="col-sm-10">\n\
                                                                <div class="input-group">\n\
                                                                    <div class="input-group-addon">\n\
                                                                        <i class="fa fa-hand-o-right"></i>\n\
                                                                    </div>\n\
                                                                    <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="property_name_eng_popup" id="property_name_eng_popup" />\n\
                                                                </div>\n\
                                                            </div>\n\
                                                        </div>\n\
                                                        <div class="hr-line-dashed"></div>\n\
                                                        <div class="form-group">\n\
                                                            <div class="col-sm-10 col-sm-offset-2">\n\
                                                            <button id="insertUnitPopUp" class="btn btn-primary" type="submit" onclick="return insertMachPropWrapper(event, '+nodeID+', \''+nodeName+'\');">\n\
                                                                <i class="fa fa-save"></i> Kaydet </button>\n\
                                                            <button id="resetForm" onclick="regulateButtonsPopupInsert();" class="btn btn-flat" type="reset" " >\n\
                                                                <i class="fa fa-remove"></i> Reset </button>\n\
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
           $("#machPropFormInsertPopup").validationEngine();
            
           var ajPopUpMachProp = $(window).ajaxCallWidget({
                            proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                            data : {
                                url:'pkFillMachineGroupPropertyDefinitions_sysMachineToolPropertyDefinition' ,
                                language_code : $('#langCode').val(),
                                machine_grup_id : nodeID,
                                pk : $("#pk").val()
                            }
           })
           ajPopUpMachProp.ajaxCallWidget ({
                 onError : function (event, textStatus, errorThrown) {
                     dm.dangerMessage({
                         onShown : function () {
                            var loader = $("#loading-image-crud-popup").loadImager();
                            loader.loadImager('appendImage');
                         }
                     });
                     dm.dangerMessage('show', 'Kategoriye Ait Makina Özellikleri Yüklenememiştir...',
                                              'Kategoriye ait makina özellikleri yüklenememiştir,msistem yöneticisi ile temasa geçiniz...');
                 },
                 onSuccess : function (event, data) {  
                    //alert('on success');
                    var tagBuilderPopup = $('#test-cabin-popup').tagCabin({
                           tagCopy      : false,
                           tagDeletable : true,  
                           tagBox       : $('.tag-container-popup').find('ul'),
                           dataMapper   : {attributes : Array('machine_grup_id')} 
                   });
                   tagBuilderPopup.tagCabin({ 
                       onTagRemoved : function(event, data) {
                           var elementData = data.element;
                           var id = data.id;
                           window.deleteMachPropDialog(id, elementData);
                           
                       }
                    });
                   
                   tagBuilderPopup.tagCabin('addTags', data);
                 },
           }) 
           ajPopUpMachProp.ajaxCallWidget('call');

           $('#tt_tree_menu_popup').tree({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillUnitsTree_sysUnits&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
                method: 'get',
                animate: true,
                checkbox: false,
                cascadeCheck: false,
                lines: true,
                onLoadSuccess: function (node, data) {
                     loader.loadImager('removeLoadImage');
                 },
                onSelect: function(node) {
                    var self = $(this);
                    if(self.tree('isLeaf', node.target)) {
                        wm.warningMessage( {
                            onShown : function (event ,data ) {
                               var parent = self.tree('getParent', node.target);
                               self.tree('select', parent.target);
                            }
                        });
                        wm.warningMessage('show','Ana Kategori Seçiniz',
                                                 'Lütfen ana kategori seçiniz...');

                    } 
                },
                formatter: function (node) {
                    if(node.attributes.system != null) {
                        var s = node.text+' ('+node.attributes.system+')';
                    } else {
                        var s = node.text;
                    }
                    return s;
                 }
             });
        },
        onhide : function() {
        },
    });
    return false;
   }
   
   /**
    * insert machine property item
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 29/04/2016
    */
   window.insertMachProp = function (nodeID, nodeName) {
        var loader = $("#loading-image-crud-popup").loadImager();
        loader.loadImager('appendImage');
        property_name = $('#property_name_popup').val();
        property_name_eng = $('#property_name_eng_popup').val();     
        language_code = $('#langCode').val();
        selectedTreeItem = $('#tt_tree_menu_popup').tree('getSelected')

        var unitGrupIDArray = [];
        unitGrupIDArray.push(selectedTreeItem.id);
        var objUnitGroupID = $.extend({}, unitGrupIDArray);
        //console.log(objTest);
        var jsonUnitGroupID = JSON.stringify(objUnitGroupID);
        
        machineGroupID = nodeID;
        var machineGroupIDArray = [];
        machineGroupIDArray.push(machineGroupID);
        var objmachineGroupID = $.extend({}, machineGroupIDArray);
        //console.log(objTest);
        var jsonMachineGroupID = JSON.stringify(objmachineGroupID);
        
        var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',   
                        data : {
                            url:'pkInsert_sysMachineToolPropertyDefinition' ,
                            language_code : language_code,
                            property_name : property_name,
                            property_name_eng : property_name_eng,
                            unit_grup_id : jsonUnitGroupID,
                            machine_grup_id : jsonMachineGroupID,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({  
             onError : function (event, textStatus, errorThrown) {   
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Birim Aktifleştirme İşlemi Başarısız...', 
                                          'Birim aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ')
                 console.error('"pkUpdateMakeActiveOrPassive_sysUnits" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                 console.log(data);
                 var data = data;
                sm.successMessage({
                    onShown: function( event, data ) {
                        console.log(data);
                        $('#machPropFormInsertPopup')[0].reset();
                        regulateButtonsPopupInsert();
                        var tagBuilderInsertPopup = $('#test-cabin-popup').tagCabin({
                                tagCopy      : false,
                                tagDeletable : true,     
                                tagBox       : $('.tag-container-popup').find('ul'),  
                                dataMapper   : {attributes : Array('machine_grup_id')} 
                        });
                        tagBuilderInsertPopup.tagCabin('addTagManually', data.lastInsertId, 
                                                                        property_name,
                                                                        {machine_grup_id : nodeID});
                        loader.loadImager('removeLoadImage');
                        
                    }
                });
                sm.successMessage('show', 'Birim Kayıt İşlemi Başarılı...', 
                                          'Birim kayıt işlemini gerçekleştirdiniz... ',
                                          data);
                
             },
             onErrorDataNull : function (event, data) {
                 dm.dangerMessage('resetOnShown');
                 dm.dangerMessage('show', 'Birim Kayıt İşlemi Başarısız...', 
                                          'Birim kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                 console.error('"pkUpdateMakeActiveOrPassive_sysUnits" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Makina Özelliği Kayıt İşlemi Başarısız...', 
                                        'Makina özelliği kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdateMakeActiveOrPassive_sysUnits" servis hatası->'+textStatus);
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
                 dm.dangerMessage({
                    onShown : function(event, data) {
                        $('#machPropFormInsertPopup')[0].reset();
                        loader.loadImager('removeLoadImage');
                    }
                 });
                 dm.dangerMessage('show', 'Makina Özelliği Kayıt İşlemi Başarısız...', 
                                          'Aynı isim ile birim kaydı yapılmıştır, yeni bir isim deneyiniz... ');
             }
       }) 
       aj.ajaxCall('call');
   }
   

   /**
    * update unit item
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.updateUnitWrapper = function (e) {
    e.preventDefault();
    if ($("#unitForm").validationEngine('validate')) {
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        if(selectedTreeItem == null) {
            wm.warningMessage('resetOnShown');
            wm.warningMessage('show', 'Birim Öğesi Seçiniz', 'Lütfen Birim Öğesi Seçiniz!')
            return false;
        }
        
        if(selectedTreeItem.attributes.notroot == true) {
            var ddData = $('#dropdownUnitSystems').data('ddslick');
            if(ddData.selectedData.value>0) {
                updateUnit();
            } else {
                wm.warningMessage('resetOnShown');
                wm.warningMessage('show', 'Metrik Sistem Seçiniz', 'Lütfen Metrik Sistem Seçiniz!')
            }
            return false;
        }
        updateUnit();
    }
    return false;
   }
   
   /**
    * update unit item
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 05/04/2016
    */
   window.updateUnit = function () {
        var loader = $("#loading-image-crud").loadImager();
        loader.loadImager('appendImage');
        unit = $('#unit').val();
        unit_eng = $('#unit_eng').val();
        unitcode = $('#unitcode').val();
        unitcode_eng = $('#unitcode_eng').val();
        abbreviation = $('#abbreviation').val();
        abbreviation_eng = $('#abbreviation_eng').val();
        language_code = $('#langCode').val();
        var ddData = $('#dropdownUnitSystems').data('ddslick');
        system_id = ddData.selectedData.value;
        system = ddData.selectedData.text;
        system_eng = ddData.selectedData.description;
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        id = selectedTreeItem.id;
        
        var aj = $(window).ajaxCall({
                        proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                        data : {
                            url:'pkUpdate_sysUnits' ,
                            language_code : language_code,
                            unit : unit,
                            unit_eng : unit_eng,
                            unitcode : unitcode,
                            unitcode_eng : unitcode_eng,
                            abbreviation : abbreviation,
                            abbreviation_eng : abbreviation_eng,
                            id : id,
                            system_id : system_id,
                            pk : $("#pk").val()
                        }
       })
       aj.ajaxCall ({
             onError : function (event, textStatus, errorThrown) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Güncelleme İşlemi Başarısız...', 
                                              'Birim güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdate_sysUnits" servis hatası->'+textStatus);
             },
             onSuccess : function (event, data) {
                var data = data;
                sm.successMessage({
                    onShown: function( event, data ) {
                        $('#unitForm')[0].reset();
                        regulateButtons();
                        loader.loadImager('removeLoadImage');
                    }
                });
                sm.successMessage('show', 'Birim Güncelleme İşlemi Başarılı...', 
                                          'Birim güncelleme işlemini gerçekleştirdiniz... ',
                                          data);
                $('#tt_tree_menu').tree('update', {
                    target: selectedTreeItem.target,
                    text: unitcode,
                    attributes:{notroot: selectedTreeItem.attributes.notroot, 
                                unitcode_eng : unitcode_eng, 
                                system_id : system_id,
                                system : system,
                                system_eng : system_eng,
                                abbreviation : abbreviation,
                                abbreviation_eng : abbreviation_eng,
                                unit_eng : unit_eng,
                                unit : unit,
                                active: 0,}
               });
             },
             onErrorDataNull : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Güncelleme İşlemi Başarısız...', 
                                              'Birim güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
                console.error('"pkUpdate_sysUnits" servis datası boştur!!');
             },
             onErrorMessage : function (event, data) {
                dm.dangerMessage('resetOnShown');
                dm.dangerMessage('show', 'Birim Güncelleme İşlemi Başarısız...', 
                                         'Birim güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ');
             },
             onError23503 : function (event, data) {
             },
             onError23505 : function (event, data) {
             }
       }) 
       aj.ajaxCall('call');
   }
   
   
   
});
