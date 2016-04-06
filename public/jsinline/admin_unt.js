$(document).ready(function () {

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
    
    var selectedNode;
    
    
     /*
    * 
    * @type @call;$@call;tree
    * Menu tree
    * Mustafa Zeynel Dağlı
    * 04/04/2016
    */

   $('#tt_tree_menu').tree({
       url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillUnitsTree_sysUnits&pk=' + $("#pk").val()+ '&language_code='+$("#langCode").val(),
       method: 'get',
       animate: true,
       checkbox: true,
       cascadeCheck: false,
       lines: true,
       onBeforeCheck : function (node) {        
       },
       onDblClick: function (node) {
       },
       onAfterEdit: function (node) { 
        },
       onLoadSuccess: function (node, data) {
            loader.loadImager('removeLoadImage');
        },
       onClick: function (node) {
            selectedNode = node;
            selectedRoot = $(this).tree('getRoot', node.target);
            selectedItem = $(this).tree('getData', node.target);
            //console.log(selectedItem);
            $('#updateUnit').attr('disabled', false);
            $('#insertUnit').attr('disabled', true);
            if(selectedItem.attributes.notroot == 'true' ) {
                alert(selectedItem.attributes.system_id);
                $('#unit').attr('disabled',false);
                $('#unit_eng').attr('disabled',false);
                $('#abbreviation').attr('disabled',false);
                $('#abbreviation_eng').attr('disabled',false);
                
                $('#unitcode').val(selectedItem.text);
                $('#unitcode_eng').val(selectedItem.attributes.unitcode_eng);
                $('#abbreviation').val(selectedItem.attributes.abbreviation);
                $('#abbreviation_eng').val(selectedItem.attributes.abbreviation_eng);
                $('#unit').val(selectedItem.attributes.unit);
                $('#unit_eng').val(selectedItem.attributes.unit_eng);
                /*$('#dropdownUnitSystems').ddslick('select', 
                                            {index: selectedItem.attributes.system_id }
                                                );*/
                $('#dropdownUnitSystems').ddslick('selectByValue', 
                                            {index: selectedItem.attributes.system_id,
                                            text : selectedItem.text}
                                                );
                
            } else {
                $('#dropdownUnitSystems').ddslick('selectByValue', 
                                            {index: 999999,
                                            text : selectedItem.text}
                                                );
                //alert('root');
                $('#unitcode').val(selectedItem.text);
                $('#unitcode_eng').val(selectedItem.attributes.unitcode_eng);
                $('#unit').attr('disabled',true);
                $('#unit_eng').attr('disabled',true);
                $('#abbreviation').attr('disabled',true);
                $('#abbreviation_eng').attr('disabled',true);
                /*$('#dropdownUnitSystems').ddslick('select', 
                                            {index: -1 }
                                                );*/
               
            }
        },
        onCheck: function (node) {

        },
        formatter: function (node) {
            var s = node.text;
            var id = node.id;
            if (node.attributes.active == 0) {
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="birim sil" onclick="deleteUnitDialog('+id+')"></i>&nbsp;\n\
                     <i class="fa fa-fw fa-ban" title="pasif yap" onclick="passiveUnitDialog('+id+');"></i>&nbsp;&nbsp;\n\
                    <i class="fa fa-level-down" title="alt kırılıma birim ekle" onclick="insertUnitDialog('+id+', \''+node.text+'\')"></i>';
                return s;

            } else if (node.attributes.active == 1) {
                s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="birim sil" onclick="deleteUnitDialog('+id+')"></i>&nbsp;\n\
                <i class="fa fa-fw fa-check-square-o" title="aktif yap" onclick="activeUnitDialog('+id+');"></i>';
                s = "<font color = '#B6B6B4'>" + s + "</font>"
                //buda koşullu kullanım için örnek satır    
                /*if (node.children) {
                    s += '&nbsp;<a href=<span style=\'color:blue\'>(' + node.children.length + ')</span>';
                }*/
                return s;
            }
        }
    });
    
    /**
     * user roles  select box filling
     * @author Mustafa Zeynel Dağlı
     * @since 04/04/2016
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkGetUnitSystems_sysUnitSystems' ,
                language_code : 'tr',
                main_group : 2,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                $('#dropdownUnitSystems').ddslick({
                    height : 200,
                    data : data, 
                    width:'100%',
                    selectText: "Select your preferred social network",
                    //showSelectedHTML : false,
                    defaultSelectedIndex: 3,
                    //imagePosition:"right",
                    onSelected: function(selectedData){
                        if(selectedData.selectedData.value>0) {
                            /*$('#tt_tree_menu').tree({
                                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val(),
                            });*/
                        }
                    }   
                });
            } else {
                console.error('"pkGetUnitSystems_sysUnitSystems" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkGetUnitSystems_sysUnitSystems" servis hatası->'+textStatus);
        }
    });

    // Left menuyu oluşturmak için çağırılan fonksiyon...
    $.fn.leftMenuFunction();

    //Validation forms binded...
    jQuery("#unitForm").validationEngine();
    


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

   
   
    //$('#menuForm').submit(newRoleSubmission);
    
   /**
    * wrapper class for pop up and active menu item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.deleteUnitDialog= function(nodeID){
       var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Birim Silme İşlemi Gerçekleştirmek Üzeresiniz!',
            message: 'Birim Öğesini silmek üzeresiniz, birim silme işlemi geri alınamaz!! ',
            buttons: [ {
                icon: 'glyphicon glyphicon-ban-circle',
                label: 'Vazgeç',
                cssClass: 'btn-warning',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }, {
                icon: 'glyphicon glyphicon-ok-sign',
                label: 'Sil',
                cssClass: 'btn-success',
                action: function(dialogItself){
                    dialogItself.close();
                    deleteUnit(nodeID);
                }
            }]
        });
   }
   
   /**
    * set unit item delete
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.deleteUnit = function(nodeID) {
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkDelete_leftnavigation' ,
                id : nodeID,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Birim Silme İşlemi Başarılı...',
                    message: 'Birim Silme işlemini gerçekleştirdiniz... ',
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ok-sign',
                        label: 'Kapat',
                        cssClass: 'btn-success',
                        action: function(dialogItself){
                            dialogItself.close();
                        }
                    }]
                });
                selectedTreeItem = $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
                            
            } else {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Birim Silme İşlemi Başarısız...',
                    message: 'Birim Silme işlemini gerçekleştiremediniz,Sistem Yneticisi ile temasa geçiniz... ',
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ban-circle',
                        label: 'Kapat',
                        cssClass: 'btn-danger',
                        action: function(dialogItself){
                            dialogItself.close();
                        }
                    }]
                });
                console.error('"pkDelete_leftnavigation" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkDelete_leftnavigation" servis hatası->'+textStatus);
        }
    });
   }
   
   /**
    * wrapper class for pop up and passive unit item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.passiveUnitDialog= function(nodeID){
        var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Birim Ögesini Pasifleştirmek Üzeresiniz!',
            message: 'Birim öğesini pasifleştirmek üzeresiniz !! ',
            buttons: [ {
                icon: 'glyphicon glyphicon-ban-circle',
                label: 'Vazgeç',
                cssClass: 'btn-warning',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }, {
                icon: 'glyphicon glyphicon-ok-sign',
                label: 'Pasif Yap',
                cssClass: 'btn-success',
                action: function(dialogItself){
                    dialogItself.close();
                    passiveMenu(nodeID);
                }
            }]
        });
   }
   
   /**
    * set unit item passive
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.passiveUnit = function(nodeID) {
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkUpdateMakeActiveOrPassive_leftnavigation' ,
                id : nodeID,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                if(data.found) {
                   BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_SUCCESS,
                        title: 'Birim Pasif İşlemi Başarılı...',
                        message: 'Birim Pasifleştirme işlemini gerçekleştirdiniz... ',
                        buttons: [ {
                            icon: 'glyphicon glyphicon-ok-sign',
                            label: 'Kapat',
                            cssClass: 'btn-success',
                            action: function(dialogItself){
                                dialogItself.close();
                            }
                        }]
                    });
                    var childNodes;
                    var nodeState;
                    if($('#tt_tree_menu').tree('isLeaf', selectedTreeItem.target)) {
                        nodeState = 'open';
                    } else {
                        childNodes = $('#tt_tree_menu').tree('getChildren', selectedTreeItem.target);
                        nodeState = 'closed';
                    }
                    
                    var parentNode = $('#tt_tree_menu').tree('getParent', selectedTreeItem.target);
                    var node = selectedTreeItem;
                    $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
                    if(jQuery.type(parentNode) === "null") { 
                        $('#tt_tree_menu').tree('append', {
                            data: [{
                                    attributes:{notroot: node.attributes.notroot, 
                                                text_eng: node.attributes.text_eng, 
                                                active: 1, 
                                                url: node.attributes.url, 
                                                icon_class: node.attributes.icon_class},
                                    id: node.id,
                                    text: node.text,
                                    checked: false,
                                    state : nodeState,
                                },]
                        });
                    } else {
                        $('#tt_tree_menu').tree('append', {
                            parent: parentNode.target,
                            data: [{
                                    attributes:{notroot: node.attributes.notroot, 
                                                text_eng: node.attributes.text_eng, 
                                                active: 1, 
                                                url: node.attributes.url, 
                                                icon_class: node.attributes.icon_class},
                                    id: node.id,
                                    text: node.text,
                                    checked: false,
                                    state : nodeState,
                                },]
                        });
                    }
                            
                    
                } else {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Birim Pasifleştirme İşlemi Başarısız...',
                        message: 'Birim pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
                        buttons: [ {
                            icon: 'glyphicon glyphicon-ok-sign',
                            label: 'Kapat',
                            cssClass: 'btn-danger',
                            action: function(dialogItself){
                                dialogItself.close();
                            }
                        }]
                    });
                }           
            } else {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Birim Pasifleştirme İşlemi Başarısız...',
                    message: 'Birim pasifleştirme işlemini gerçekleştiremediniz,Sistem Yöneticisi ile temasa geçiniz... ',
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ban-circle',
                        label: 'Kapat',
                        cssClass: 'btn-danger',
                        action: function(dialogItself){
                            dialogItself.close();
                        }
                    }]
                });
                console.error('"pkDelete_leftnavigation" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkDelete_leftnavigation" servis hatası->'+textStatus);
        }
    });
   }
   
   /**
    * wrapper class for pop up and active unit item
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.activeUnitDialog= function(nodeID){
        var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Birim Ögesini Aktifleştirmek Üzeresiniz!',
            message: 'Birim öğesini aktifleştirmek üzeresiniz !! ',
            buttons: [ {
                icon: 'glyphicon glyphicon-ban-circle',
                label: 'Vazgeç',
                cssClass: 'btn-warning',
                action: function(dialogItself){
                    dialogItself.close();
                }
            }, {
                icon: 'glyphicon glyphicon-ok-sign',
                label: 'Aktif Yap',
                cssClass: 'btn-success',
                action: function(dialogItself){
                    dialogItself.close();
                    activeMenu(nodeID);
                }
            }]
        });
   }
   
   /**
    * set unit item active
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.activeUnit = function(nodeID) {
       selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
       $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkUpdateMakeActiveOrPassive_leftnavigation' ,
                id : nodeID,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                if(data.found) {
                    BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_SUCCESS,
                    title: 'Birim Aktifleştirme İşlemi Başarılı...',
                    message: 'Birim aktifleştirme işlemini gerçekleştirdiniz... ',
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ok-sign',
                        label: 'Kapat',
                        cssClass: 'btn-success',
                        action: function(dialogItself){
                            dialogItself.close();
                        }
                    }]
                });
                var childNodes;
                var nodeState;
                if($('#tt_tree_menu').tree('isLeaf', selectedTreeItem.target)) {
                    nodeState = 'open';
                } else {
                    childNodes = $('#tt_tree_menu').tree('getChildren', selectedTreeItem.target);
                    nodeState = 'closed';
                }
                
                var parentNode = $('#tt_tree_menu').tree('getParent', selectedTreeItem.target);
                var node = selectedTreeItem;
                $('#tt_tree_menu').tree('remove', selectedTreeItem.target);
                if(jQuery.type(parentNode) === "null") { 
                    $('#tt_tree_menu').tree('append', {
                        data: [{
                                attributes:{notroot: node.attributes.notroot, 
                                            text_eng: node.attributes.text_eng, 
                                            active: 0, 
                                            url: node.attributes.url, 
                                            icon_class: node.attributes.icon_class},
                                id: node.id,
                                text: node.text,
                                checked: false,
                                state : nodeState,
                            },]
                    });
                } else {
                    $('#tt_tree_menu').tree('append', {
                        parent: parentNode.target,
                        data: [{
                                attributes:{notroot: node.attributes.notroot, 
                                            text_eng: node.attributes.text_eng, 
                                            active: 0, 
                                            url: node.attributes.url, 
                                            icon_class: node.attributes.icon_class},
                                id: node.id,
                                text: node.text,
                                checked: false,
                                state : nodeState,
                            },]
                    });
                }
                
                
                } 
                else {
                   BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Birim Aktifleştirme İşlemi Başarısız...',
                        message: 'Birim aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
                        buttons: [ {
                            icon: 'glyphicon glyphicon-ok-sign',
                            label: 'Kapat',
                            cssClass: 'btn-danger',
                            action: function(dialogItself){
                                dialogItself.close();
                            }
                        }]
                    });
               }          
            } else {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Birim Aktifleştirme İşlemi Başarısız...',
                    message: 'Birim aktifleştirme işlemini gerçekleştiremediniz,Sistem Yöneticisi ile temasa geçiniz... ',
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ban-circle',
                        label: 'Kapat',
                        cssClass: 'btn-danger',
                        action: function(dialogItself){
                            dialogItself.close();
                        }
                    }]
                });
                console.error('"pkDelete_leftnavigation" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkDelete_leftnavigation" servis hatası->'+textStatus);
        }
    });
   }
   
   /**
    * reset button function setting disabled/ enabled
    * for 'insert' and 'update' form buttons
    * @returns null
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.regulateButtons = function () {
       $('#updateUnit').attr('disabled', true);
       $('#insertUnit').attr('disabled', false);
       /*var node = $('#tt_tree_menu').tree('getSelected');
       $('#tt_tree_menu').tree('unselect', node.target);*/
       //$('#tt_tree_menu').tree('unselect');
   }
   
   /**
    * insert unit item
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.insertUnitWrapper = function (e, nodeID, nodeName) {
    e.preventDefault();
    var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#unitFormInsert").validationEngine('validate')) {
        var ddData = $('#dropdownUnitSystems').data('ddslick');
        if(ddData.selectedData.value>0) {
            insertMenu(nodeID, nodeName);
        } else {
            BootstrapDialog.show({
                title: 'Metrik Sistem Seçiniz',
                message: 'Lütfen Metrik sistem Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
        //        closable: false
            });
        }
    }
    return false;
   }
   
   /**
    * wrapper for unit insert process
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.insertUnitDialog = function (nodeID, nodeName) {
    var nodeID = nodeID;
    var nodeName = nodeName;
    BootstrapDialog.show({
        title: '"'+ nodeName + '" Birim katmanına yeni birim eklemektesiniz...',
        message: function (dialogRef) {
                    var dialogRef = dialogRef;
                    var $message = $(' <form id="unitFormInsert" method="get" class="form-horizontal">\n\
                                        <div class="hr-line-dashed"></div>\n\
                                            <div class="form-group">\n\
                                                <label class="col-sm-2 control-label">Birim</label>\n\
                                                <div class="col-sm-10">\n\
                                                    <div class="input-group">\n\
                                                        <div class="input-group-addon">\n\
                                                            <i class="fa fa-hand-o-right"></i>\n\
                                                        </div>\n\
                                                        <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="unit_popup" id="unit_popup" />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\
                                            <div class="form-group">\n\
                                                <label class="col-sm-2 control-label">İngilizce Birim</label>\n\
                                                <div class="col-sm-10">\n\
                                                    <div class="input-group">\n\
                                                        <div class="input-group-addon">\n\
                                                            <i class="fa fa-hand-o-right"></i>\n\
                                                        </div>\n\
                                                        <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="unit_eng_popup" id="unit_eng_popup" />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\\n\
                                            <div class="form-group">\n\
                                                <label class="col-sm-2 control-label">Birim Kodu</label>\n\
                                                <div class="col-sm-10">\n\
                                                    <div class="input-group">\n\
                                                        <div class="input-group-addon">\n\
                                                            <i class="fa fa-hand-o-right"></i>\n\
                                                        </div>\n\
                                                        <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="unitcode_popup" id="unitcode_popup" />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\\n\
                                            <div class="form-group">\n\
                                                <label class="col-sm-2 control-label">İngilizce Birim Kodu</label>\n\
                                                <div class="col-sm-10">\n\
                                                    <div class="input-group">\n\
                                                        <div class="input-group-addon">\n\
                                                            <i class="fa fa-hand-o-right"></i>\n\
                                                        </div>\n\
                                                        <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="unitcode_eng_popup" id="unitcode_eng_popup" />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\\n\
                                            <div class="form-group">\n\
                                                <label class="col-sm-2 control-label">Birim Kısaltması</label>\n\
                                                <div class="col-sm-10">\n\
                                                    <div class="input-group">\n\
                                                        <div class="input-group-addon">\n\
                                                            <i class="fa fa-hand-o-right"></i>\n\
                                                        </div>\n\
                                                        <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="abbreviation_popup" id="abbreviation_popup" />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\\n\
                                            <div class="form-group">\n\
                                                <label class="col-sm-2 control-label">İngilizce Birim Kısaltması</label>\n\
                                                <div class="col-sm-10">\n\
                                                    <div class="input-group">\n\
                                                        <div class="input-group-addon">\n\
                                                            <i class="fa fa-hand-o-right"></i>\n\
                                                        </div>\n\
                                                        <input data-prompt-position="topLeft:70" class="form-control validate[required]" type="text" name="abbreviation_eng_popup" id="abbreviation_eng_popup" />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\
                                            <div class="hr-line-dashed"></div>\n\
                                            <div class="form-group">\n\
                                                <div class="col-sm-10 col-sm-offset-2">\n\
                                                <button id="insertUnitPopUp" class="btn btn-primary" type="submit" onclick="return insertUnitWrapper(event, '+nodeID+', \''+nodeName+'\');">\n\
                                                    <i class="fa fa-save"></i> Kaydet </button>\n\
                                                <button id="resetForm" class="btn btn-flat" type="reset" " >\n\
                                                    <i class="fa fa-remove"></i> Reset </button>\n\
                                            </div>\n\
                                        </div>\n\
                                    </form>');
                    return $message;
                },
        type: BootstrapDialog.TYPE_PRIMARY,
        onshown : function () {
            $("#unitFormInsert").validationEngine();
        },
        onhide : function() {
            $('#unitForm')[0].reset();
            regulateButtons();
        },
    });
    
    return false;
   }
   
   /**
    * insert unit item
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.insertUnit = function (nodeID, nodeName) {
        unit = $('#unit_popup').val();
        unit_eng = $('#unit_eng_popup').val();
        unitcode = $('#unitcode_popup').val();
        unitcode_eng = $('#unitcode_eng_popup').val();
        abbreviation = $('#abbreviation_popup').val();
        abbreviation_eng = $('#abbreviation_eng_popup').val();
        language_code = $('#langCode').val();
        var ddData = $('#dropdownUnitSystems').data('ddslick');
        system_id = ddData.selectedData.value;
        selectedTreeItem = $('#tt_tree_menu').tree('find', nodeID);
        //console.log(ddData);
        parent = nodeID;
       $.ajax({
           url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
           data: { url:'pkInsert_leftnavigation' ,
                   language_code : language_code,
                   unit : unit,
                   unit_eng : unit_eng,
                   unitcode : unitcode,
                   unitcode_eng : unitcode_eng,
                   abbreviation : abbreviation,
                   abbreviation_eng : abbreviation_eng,
                   //parent : parent,
                   system_id : system_id,
                   pk : $("#pk").val()},  
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Birim Kayıt İşlemi Başarılı...',
                            message: 'Birim kayıt işlemini gerçekleştirdiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-success',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#unitFormInsert')[0].reset();
                                    $('#unitForm')[0].reset();
                                    regulateButtons();
                                }
                            }]
                        });
                   } else {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Birim Kayıt İşlemi Başarısız...',
                            message: 'Birim kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-danger',
                                action: function(dialogItself){
                                    dialogItself.close();
                                }
                            }]
                        });
                   }
                //$('#tt_tree_menu').tree('reload');
                $('#tt_tree_menu').tree('append', {
                        parent: selectedTreeItem.target,
                        data: [{
                                attributes:{notroot: true, 
                                            text_eng: menu_name_eng, 
                                            active: 0, 
                                            url: url, 
                                            icon_class: icon_class},
                                id: data.lastInsertId,
                                text: menu_name,
                                checked: false,
                                state : 'open',
                            },]
                });
                
               } else {
                   console.error('"pkInsert_leftnavigation" servis datası boştur!!');
               }
           },
           error: function (jqXHR, textStatus, errorThrown) {           
               console.error('"pkInsert_leftnavigation" servis hatası->'+textStatus);
           }
       });
   }
   
   /**
    * insert unit item for root
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.insertUnitRootWrapper = function (e) {
    e.preventDefault();
    var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#unitForm").validationEngine('validate')) {
        var ddData = $('#dropdownUnitSystems').data('ddslick');
        if(ddData.selectedData.value>0) {
            insertUnitRoot();
        } else {
            BootstrapDialog.show({
                title: 'Metrik Sistem Seçiniz',
                message: 'Lütfen Metrik Sistem Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
            });
        }
    }
    return false;
   }
   
   /**
    * insert unit for root level
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.insertUnitRoot = function () {
        unit = $('#unit').val();
        unit_eng = $('#unit_eng').val();
        unitcode = $('#unitcode').val();
        unitcode_eng = $('#unitcode_eng').val();
        abbreviation = $('#abbreviation').val();
        abbreviation_eng = $('#abbreviation_eng').val();
        language_code = $('#langCode').val();
        var ddData = $('#dropdownUnitSystems').data('ddslick');
        system_id = ddData.selectedData.value;
        //console.log(ddData);
        
       $.ajax({
           url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
           data: { url:'pkInsert_leftnavigation' ,
                   language_code : language_code,
                   unit : unit,
                   unit_eng : unit_eng,
                   unitcode : unitcode,
                   unitcode_eng : unitcode_eng,
                   abbreviation : abbreviation,
                   abbreviation_eng : abbreviation_eng,
                   //parent : 0,
                   system_id : system_id,
                   pk : $("#pk").val()},  
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Birim Kayıt İşlemi Başarılı...',
                            message: 'Birim kayıt işlemini gerçekleştirdiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-success',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#menuForm')[0].reset();
                                }
                            }]
                        });
                   } else {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Birim Kayıt İşlemi Başarısız...',
                            message: 'Birim kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-danger',
                                action: function(dialogItself){
                                    dialogItself.close();
                                }
                            }]
                        });
                   }
                $('#tt_tree_menu').tree('append', {
                        //parent: selectedTreeItem.target,
                        data: [{
                                attributes:{notroot: false, 
                                            unit_eng: unit_eng, 
                                            active: 0, 
                                            },
                                id: data.lastInsertId,
                                text: unit,
                                checked: false,
                                state : 'open',
                            },]
                });
               } else {
                   console.error('"pkInsert_leftnavigation" servis datası boştur!!');
               }
           },
           error: function (jqXHR, textStatus, errorThrown) {           
               console.error('"pkInsert_leftnavigation" servis hatası->'+textStatus);
           }
       });
   }
   
   /**
    * update unit item
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 04/04/2016
    */
   window.updateUnitWrapper = function (e) {
    e.preventDefault();
    if ($("#menuForm").validationEngine('validate')) {
        var ddData = $('#dropdownUnitSystems').data('ddslick');
        
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        if(selectedTreeItem == null) {
            BootstrapDialog.show({
                title: 'Birim Öğesi Seçiniz',
                message: 'Lütfen Birim Öğesi Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
            });
            return false;
        }
        
        if(ddData.selectedData.value>0) {
            //alert(ddData.selectedData.text);
            updateUnit();
        } else {
            BootstrapDialog.show({
                title: 'Metrik Sistem Seçiniz',
                message: 'Lütfen Metrik Sistem Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
            });
        }
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
        unit = $('#unit').val();
        unit_eng = $('#unit_eng').val();
        unitcode = $('#unitcode').val();
        unitcode_eng = $('#unitcode_eng').val();
        abbreviation = $('#abbreviation').val();
        abbreviation_eng = $('#abbreviation_eng').val();
        language_code = $('#langCode').val();
        var ddData = $('#dropdownUnitSystems').data('ddslick');
        system_id = ddData.selectedData.value;
                selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        id = selectedTreeItem.id;
        
       $.ajax({
           url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
           data: { url:'pkUpdate_leftnavigation' ,
                   language_code : language_code,
                   unit : unit,
                   unit_eng : unit_eng,
                   unitcode : unitcode,
                   unitcode_eng : unitcode_eng,
                   abbreviation : abbreviation,
                   abbreviation_eng : abbreviation_eng,
                   id : id,
                   system_id : system_id,
                   pk : $("#pk").val()}, 
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Birim Güncelleme İşlemi Başarılı...',
                            message: 'Birim güncelleme işlemini gerçekleştirdiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-success',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    
                                }
                            }]
                        });
                   } else {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Birim Güncelleme İşlemi Başarısız...',
                            message: 'Birim güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-danger',
                                action: function(dialogItself){
                                    dialogItself.close();
                                }
                            }]
                        });
                   }
                $('#tt_tree_menu').tree('update', {
                     target: selectedTreeItem.target,
                     text: unit,
                     attributes:{notroot: true, unitcode_eng: unitcode_eng , active: 0}
                });
               } else {
                   console.error('"pkUpdate_leftnavigation" servis datası boştur!!');
               }
           },
           error: function (jqXHR, textStatus, errorThrown) {           
               console.error('"pkUpdate_leftnavigation" servis hatası->'+textStatus);
           }
       });
   }
   
   
   
});
