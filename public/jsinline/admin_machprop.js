$(document).ready(function () {

    /**
     * easyui tree extend for 'unselect' event
     * @author Mustafa Zeynel Dağlı
     * @since 31/03/2016
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
     * user roles  select box filling
     * @author Mustafa Zeynel Dağlı
     * @since 31/03/2016
     */
    $.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        data: { url:'pkFillComboBoxRoles_sysAclRoles' ,
                language_code : 'tr',
                main_group : 2,
                pk : $("#pk").val()}, 
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            if(data.length!==0) {
                $('#dropdownRoles').ddslick({
                    height : 200,
                    data : data, 
                    width:'100%',
                    //selectText: "Select your preferred social network",
                    imagePosition:"right",
                    onSelected: function(selectedData){
                        if(selectedData.selectedData.value>0) {
                            /*$('#tt_tree_menu').tree({
                                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val(),
                            });*/
                            
                            
                             /*
                            * 
                            * @type @call;$@call;tree
                            * Menu tree
                            * Mustafa Zeynel Dağlı
                            * 29/03/2016
                            */

                           $('#tt_tree_menu').tree({
                               url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php?url=pkFillForAdminTree_leftnavigation&pk=' + $("#pk").val()+ '&role_id='+selectedData.selectedData.value+'&language_code='+$("#langCode").val(),
                               method: 'get',
                               animate: true,
                               checkbox: true,
                               cascadeCheck: false,
                               lines: true,
                               onBeforeCheck : function (node) {        
                               },
                               onDblClick: function (node) {
                                   
                                /*var checked = $('#tt_tree_menu').tree('getChecked');
                                    console.log(node);
                                    $.each(checked , function(index, element) {
                                        console.log(element);
                                        if(node.id!=element.id) {

                                            $('#tt_tree_menu').tree('uncheck', element.target); 
                                        }

                                })*/
                                      
                                /*editNode = $(this).tree('getData', node.target);
                                beforeEditTextValue = $(this).tree('getData', node.target).text;
                                parent = $(this).tree('getParent', node.target);

                                if (parent == null) {
                                    parentId = 0;
                                } else {
                                    parentId = parent.id;
                                }

                                $(this).tree('beginEdit', node.target);*/
                               },
                               onAfterEdit: function (node) {

                                   id = editNode.id;
                                   root = $(this).tree('getRoot', node.target);
                                   if (editNode.text === '') {

                                       testBlockuiRoleNameChangeNull.blockuiWrapper('option', 'fadeOut', 700);
                                       testBlockuiRoleNameChangeNull.blockuiWrapper('show');

                                       editNode.text = beforeEditTextValue;

                                       $('#tt_tree_menu').tree('update', {
                                           target: node.target,
                                           text: beforeEditTextValue
                                       });

                                   } else {

                                       testBlockuiRoleNameChangeApproval.blockuiApprovalWrapper('option', {
                                           showOverlay: true
                                       });
                                       testBlockuiRoleNameChangeApproval.blockuiApprovalWrapper('show');
                                       active = editNode.attributes.active;
                                   }
                                   },
                                onLoadSuccess: function (node, data) {
                                loader.loadImager('removeLoadImage');
                                },
                                onClick: function (node) {

                                    selectedRoot = $(this).tree('getRoot', node.target);
                                    selectedItem = $(this).tree('getData', node.target);
                                    console.log(selectedItem);
                                    $('#menu_name').val(selectedItem.text);
                                    $('#menu_name_eng').val(selectedItem.attributes.text_eng);
                                    $('#url').val(selectedItem.attributes.url);
                                    $('#icon_class').val(selectedItem.attributes.icon_class);
                                    $('#updateMenu').attr('disabled', false);
                                    $('#insertMenu').attr('disabled', true);

                                },
                                onCheck: function (node) {
                              
                                },
                                formatter: function (node) {
                                    var s = node.text;
                                    var id = node.id;
                                    if (node.attributes.active == 0) {
                                        s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="menü sil" onclick="deleteMenuDialog('+id+')"></i>&nbsp;\n\
                                             <i class="fa fa-fw fa-ban" title="pasif yap" onclick="passiveMenuDialog('+id+');"></i>&nbsp;&nbsp;\n\
                                            <i class="fa fa-level-down" title="alt kırılıma menü ekle" onclick="insertMenuDialog('+id+', \''+node.text+'\')"></i>';
                                        return s;

                                    } else if (node.attributes.active == 1) {
                                        s += '&nbsp;<i class="fa fa-fw fa-trash-o" title="menü sil" onclick="deleteMenuDialog('+id+')"></i>&nbsp;\n\
                                        <i class="fa fa-fw fa-check-square-o" title="aktif yap" onclick="activeMenuDialog('+id+');"></i>';
                                        s = "<font color = '#B6B6B4'>" + s + "</font>"
                                        //buda koşullu kullanım için örnek satır    
                                        /*if (node.children) {
                                            s += '&nbsp;<a href=<span style=\'color:blue\'>(' + node.children.length + ')</span>';
                                        }*/
                                        return s;
                                    }
                                }
                            });
                        }
                        //console.log(selectedData.selectedData.value);
                       /* if(selectedData.selectedData.value==6) {
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
                console.error('"pkFillComboBoxRoles_sysAclRoles" servis datası boştur!!');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {           
            console.error('"pkFillComboBoxRoles_sysAclRoles" servis hatası->'+textStatus);
        }
    });

    
    // Left menuyu oluşturmak için çağırılan fonksiyon...
    $.fn.leftMenuFunction();

    //Validation forms binded...
    jQuery("#machinePropForm").validationEngine();
    


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

   

    
   /**
    * wrapper class for pop up and delet machine property
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.deleteMachinePropDialog= function(nodeID){
       var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Makina Özellik Silme İşlemi Gerçekleştirmek Üzeresiniz!',
            message: 'Makina özellik Öğesini silmek üzeresiniz, menü silme işlemi geri alınamaz!! ',
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
                    deleteMachineProp(nodeID);
                }
            }]
        });
   }
   
   /**
    * set machine property delete
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.deleteMachineProp = function(nodeID) {
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
                    title: 'Makina Özellik Silme İşlemi Başarılı...',
                    message: 'Makina özellik Silme işlemini gerçekleştirdiniz... ',
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ok-sign',
                        label: 'Kapat',
                        cssClass: 'btn-success',
                        action: function(dialogItself){
                            dialogItself.close();
                        }
                    }]
                });
                $('#tt_tree_menu').tree('reload');
                            
            } else {
                BootstrapDialog.show({
                    type: BootstrapDialog.TYPE_DANGER,
                    title: 'Makina Özellik Silme İşlemi Başarısız...',
                    message: 'Makina özellik Silme işlemini gerçekleştiremediniz,Sistem Yneticisi ile temasa geçiniz... ',
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
    * wrapper class for pop up and passive machine property
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.passiveMachinePropDialog= function(nodeID){
        var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Makina Özellik Ögesini Pasifleştirmek Üzeresiniz!',
            message: 'Makina özellik öğesini pasifleştirmek üzeresiniz !! ',
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
                    passiveMachineProp(nodeID);
                }
            }]
        });
   }
   
   /**
    * set machine property passive
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.passiveMachineProp = function(nodeID) {
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
                        title: 'Makina Özellik Pasif İşlemi Başarılı...',
                        message: 'Makina özellik Pasifleştirme işlemini gerçekleştirdiniz... ',
                        buttons: [ {
                            icon: 'glyphicon glyphicon-ok-sign',
                            label: 'Kapat',
                            cssClass: 'btn-success',
                            action: function(dialogItself){
                                dialogItself.close();
                            }
                        }]
                    });
                    $('#tt_tree_menu').tree('reload'); 
                } else {
                    BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Makina Özellik Pasifleştirme İşlemi Başarısız...',
                        message: 'Makina özellik pasifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
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
                    title: 'Makina Özellik Pasifleştirme İşlemi Başarısız...',
                    message: 'Makina özellik pasifleştirme işlemini gerçekleştiremediniz,Sistem Yöneticisi ile temasa geçiniz... ',
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
    * wrapper class for pop up and active machine property
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.activeMachinePropDialog= function(nodeID){
        var nodeID = nodeID;
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: 'Makina Özellik Ögesini Aktifleştirmek Üzeresiniz!',
            message: 'Makina özellik öğesini aktifleştirmek üzeresiniz !! ',
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
                    activeMachineProp(nodeID);
                }
            }]
        });
   }
   
   /**
    * set machine property active
    * @param {integer} nodeID
    * @returns {null}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.activeMachineProperty = function(nodeID) {
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
                    title: 'Makina Özellik Aktifleştirme İşlemi Başarılı...',
                    message: 'Makina özellik aktifleştirme işlemini gerçekleştirdiniz... ',
                    buttons: [ {
                        icon: 'glyphicon glyphicon-ok-sign',
                        label: 'Kapat',
                        cssClass: 'btn-success',
                        action: function(dialogItself){
                            dialogItself.close();
                        }
                    }]
                });
                $('#tt_tree_menu').tree('reload');
                } 
                else {
                   BootstrapDialog.show({
                        type: BootstrapDialog.TYPE_DANGER,
                        title: 'Makina Özellik Aktifleştirme İşlemi Başarısız...',
                        message: 'Makina özellik aktifleştirme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
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
                    title: 'Menü Aktifleştirme İşlemi Başarısız...',
                    message: 'Menü aktifleştirme işlemini gerçekleştiremediniz,Sistem Yöneticisi ile temasa geçiniz... ',
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
    * @since 31/03/2016
    */
   window.regulateButtons = function () {
       $('#updateMachineProp').attr('disabled', true);
       $('#insertMachineProp').attr('disabled', false);
       /*var node = $('#tt_tree_menu').tree('getSelected');
       $('#tt_tree_menu').tree('unselect', node.target);*/
       //$('#tt_tree_menu').tree('unselect');
   }
   
   /**
    * insert machine property
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.insertMachinePropWrapper = function (e, nodeID, nodeName) {
    e.preventDefault();
    var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#machinePropFormInsert").validationEngine('validate')) {
        var ddData = $('#dropdownRoles').data('ddslick');
        if(ddData.selectedData.value>0) {
            insertMachineProp(nodeID, nodeName);
        } else {
            BootstrapDialog.show({
                title: 'Rol Seçiniz',
                message: 'Lütfen Kullanıcı Rolü Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
        //        closable: false
            });
        }
    }
    return false;
   }
   
   /**
    * opens pop upfor machine property insert
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.insertMachinePropDialog = function (nodeID, nodeName) {
    var nodeID = nodeID;
    var nodeName = nodeName;
    BootstrapDialog.show({
        title: '"'+ nodeName + '" Makina kategorisine  yeni kategori eklemektesiniz...',
        message: function (dialogRef) {
                    var dialogRef = dialogRef;
                    var $message = $(' <form id="machinePropFormInsert" method="get" class="form-horizontal">\n\
                                        <div class="hr-line-dashed"></div>\n\
                                            <div class="form-group">\n\
                                                <label class="col-sm-2 control-label">Özellik</label>\n\
                                                <div class="col-sm-10">\n\
                                                    <div class="input-group">\n\
                                                        <div class="input-group-addon">\n\
                                                            <i class="fa fa-hand-o-right"></i>\n\
                                                        </div>\n\
                                                        <input class="form-control validate[required]" type="text" name="property_name_popup" id="property_name_popup" />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\
                                            <div class="form-group">\n\
                                                <label class="col-sm-2 control-label">İngilizce Özellik</label>\n\
                                                <div class="col-sm-10">\n\
                                                    <div class="input-group">\n\
                                                        <div class="input-group-addon">\n\
                                                            <i class="fa fa-hand-o-right"></i>\n\
                                                        </div>\n\
                                                        <input class="form-control validate[required]" type="text" name="property_name_eng_popup" id="property_name_eng_popup" />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\
                                            <div class="form-group">\n\
                                                <label class="col-sm-2 control-label">Url</label>\n\
                                                <div class="col-sm-10">\n\
                                                    <div class="input-group">\n\
                                                        <div class="input-group-addon">\n\
                                                            <i class="fa fa-hand-o-right"></i>\n\
                                                        </div>\n\
                                                        <input class="form-control validate[required]" type="text" name="url_popup" id="url_popup" />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\
                                            <div class="form-group">\n\
                                                <label class="col-sm-2 control-label">Özellik İkon</label>\n\
                                                <div class="col-sm-10">\n\
                                                    <div class="input-group">\n\
                                                        <div class="input-group-addon">\n\
                                                            <i class="fa fa-hand-o-right"></i>\n\
                                                        </div>\n\
                                                        <input value="fa-circle-o" class="form-control validate[required]" type="text" name="icon_class_popup" id="icon_class_popup" />\n\
                                                    </div>\n\
                                                </div>\n\
                                            </div>\n\
                                            <div class="hr-line-dashed"></div>\n\
                                            <div class="form-group">\n\
                                                <div class="col-sm-10 col-sm-offset-2">\n\
                                                <button id="insertMenuPopUp" class="btn btn-primary" type="submit" onclick="return insertMachinePropWrapper(event, '+nodeID+', \''+nodeName+'\');">\n\
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
            $("#machinePropFormInsert").validationEngine();
        },
        onhide : function() {
            $('#machinePropForm')[0].reset();
            regulateButtons();
        },
    });
    
    return false;
   }
   
   /**
    * insert machine property
    * @param {type} nodeID
    * @param {type} nodeName
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.insertMachineProp = function (nodeID, nodeName) {
        property_name = $('#property_name_popup').val();
        property_name_eng = $('#property_name_eng_popup').val();
        icon_class = $('#icon_class_popup').val();
        url = $('#url_popup').val();
        language_code = $('#langCode').val();
        var ddData = $('#dropdownRoles').data('ddslick');
        role_id = ddData.selectedData.value;
        //console.log(ddData);
        parent = nodeID;
       $.ajax({
           url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
           data: { url:'pkInsert_leftnavigation' ,
                   language_code : language_code,
                   icon_class : icon_class,
                   menu_name_eng : menu_name_eng,
                   menu_name : menu_name,
                   urlx : url,
                   parent : parent,
                   role_id : role_id,
                   pk : $("#pk").val()},  
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Makina Özellik Kayıt İşlemi Başarılı...',
                            message: 'Makina özellik kayıt işlemini gerçekleştirdiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-success',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#machinePropFormInsert')[0].reset();
                                    $('#machinePropForm')[0].reset();
                                    regulateButtons();
                                }
                            }]
                        });
                   } else {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Makina Özellik Kayıt İşlemi Başarısız...',
                            message: 'Makina özellik kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
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
                $('#tt_tree_menu').tree('reload');
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
    * insert machine property to root wrapper
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.insertMachinePropRootWrapper = function (e) {
    e.preventDefault();
    var nodeID = nodeID;
    var nodeName = nodeName;

    if ($("#machinePropForm").validationEngine('validate')) {
        var ddData = $('#dropdownRoles').data('ddslick');
        if(ddData.selectedData.value>0) {
            insertMachinePropRoot();
        } else {
            BootstrapDialog.show({
                title: 'Rol Seçiniz',
                message: 'Lütfen Kullanıcı Rolü Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
            });
        }
    }
    return false;
   }
   
   /**
    * insert machine property for root
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.insertMachinePropRoot = function () {
        property_name = $('#property_name').val();
        property_name_eng = $('#property_name_eng').val();
        icon_class = $('#icon_class').val();
        url = $('#url').val();
        language_code = $('#langCode').val();
        var ddData = $('#dropdownRoles').data('ddslick');
        role_id = ddData.selectedData.value;
        //console.log(ddData);
        
       $.ajax({
           url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
           data: { url:'pkInsert_leftnavigation' ,
                   language_code : language_code,
                   icon_class : icon_class,
                   menu_name_eng : menu_name_eng,
                   menu_name : menu_name,
                   urlx : url,
                   parent : 0,
                   role_id : role_id,
                   pk : $("#pk").val()},  
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Makina Özellik Kayıt İşlemi Başarılı...',
                            message: 'Makina özellik kayıt işlemini gerçekleştirdiniz... ',
                            buttons: [ {
                                icon: 'glyphicon glyphicon-ok-sign',
                                label: 'Kapat',
                                cssClass: 'btn-success',
                                action: function(dialogItself){
                                    dialogItself.close();
                                    $('#machinePropForm')[0].reset();
                                }
                            }]
                        });
                   } else {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_DANGER,
                            title: 'Makina Özellik Kayıt İşlemi Başarısız...',
                            message: 'Makina özellik kayıt işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
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
                $('#tt_tree_menu').tree('reload');
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
    * update machine property wrapper
    * @returns {Boolean}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.updateMachinePropWrapper = function (e) {
    e.preventDefault();
    if ($("#machinePropForm").validationEngine('validate')) {
        var ddData = $('#dropdownRoles').data('ddslick');
        
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        if(selectedTreeItem == null) {
            BootstrapDialog.show({
                title: 'Makina Özellik Öğesi Seçiniz',
                message: 'Lütfen Makina Özellik Öğesi Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
            });
            return false;
        }
        
        if(ddData.selectedData.value>0) {
            //alert(ddData.selectedData.text);
            updateMachineProp();
        } else {
            BootstrapDialog.show({
                title: 'Rol Seçiniz',
                message: 'Lütfen Kullanıcı Rolü Seçiniz!',
                type: BootstrapDialog.TYPE_WARNING,
            });
        }
    }
    return false;
   }
   
   /**
    * update machine property
    * @returns {undefined}
    * @author Mustafa Zeynel Dağlı
    * @since 31/03/2016
    */
   window.updateMachineProp = function () {
        property_name = $('#property_name').val();
        property_name_eng = $('#property_name_eng').val();
        icon_class = $('#icon_class').val();
        url = $('#url').val();
        language_code = $('#langCode').val();
        selectedTreeItem = $('#tt_tree_menu').tree('getSelected');
        console.log(selectedTreeItem);
        var ddData = $('#dropdownRoles').data('ddslick');
        role_id = ddData.selectedData.value;
        console.log(ddData);
        id = selectedTreeItem.id;
        
       $.ajax({
           url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
           data: { url:'pkUpdate_leftnavigation' ,
                   language_code : language_code,
                   icon_class : icon_class,
                   menu_name_eng : menu_name_eng,
                   menu_name : menu_name,
                   urlx : url,
                   id : id,
                   role_id : role_id,
                   pk : $("#pk").val()}, 
           type: 'GET',
           dataType: 'json',
           success: function (data, textStatus, jqXHR) {
               if(data.length!==0) {
                   if(data.found) {
                       BootstrapDialog.show({
                            type: BootstrapDialog.TYPE_SUCCESS,
                            title: 'Makina Özellik Güncelleme İşlemi Başarılı...',
                            message: 'Makina özellik güncelleme işlemini gerçekleştirdiniz... ',
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
                            title: 'Makina Özellik Güncelleme İşlemi Başarısız...',
                            message: 'Makina özellik güncelleme işlemi başarısız, sistem yöneticisi ile temasa geçiniz... ',
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
                $('#tt_tree_menu').tree('reload');
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
