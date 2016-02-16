
// dasboard sayfasında birinci sütun özet bilgi başlıklarını yazdırır
(function($) {
           $.fn.headerSetter = function(data, options) {
                var data = data;
                //console.error(data);
                var opts = $.extend({}, $.fn.headerSetter.defaults, options);
                //console.log(opts);
               return this.each(function() {
                    $this = $(this);
                    //$this.find('div:first').html( data.adet);
                    if(typeof data!= 'undefined') { 
                        $this.find('div:first h3:first-child').html( data.adet);
                        $this.find('p:first').html(data.aciklama);
                    }
                    
                    //$this.find('span:last').html(data.adet);
                    //$this.attr('data-original-title', data.aciklama).tooltip('fixTitle');
                    //$('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement":"top",delay: { show: 400, hide: 200 }});
                });
            };
            
            $.fn.headerSetter.defaults = {
                class : 'test',
                background: 'yellow'
              };
            
}(jQuery));

(function($) {
    
    /**
     * load imager widget for loading operations
     * @author Mustafa Zeynel Dağlı
     * @since 11/01/2016
     */
    $.widget("sanalfabrika.loadImager", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            overlay: $("<div class='overlay'><div class='fa fa-refresh fa-spin'></div></div>"),
            overlayKey: ".overlay:first",
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            this.element.append(this.options.overlay);
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        removeLoadImage: function () {
            this.element.find(this.options.overlayKey).remove();
        },
        
        appendImage : function() {
            this.element.append(this.options.overlay);
        }
    });
    
    
  /**
   * any todo list vs. structures can be filled with data dynamically
   * @author Mustafa Zeynel Dağlı
   * @since 05/02/2016
   */
  $.widget("sanalfabrika.todolistFiller", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            data : null,
            domObjectKey: 'span[data-zeynel="true"]',
            domObjectKeyDataLabel : 'aciklama',
            otherDomObjectKeys  : null, 
            otherDomObjectKeysDataLabels : null,
        },
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            
        },
        /**
         * public method to remove loading image when necessary
         * @returns {null}
         */
        fill : function () {

            //console.warn(this.options.data[0].aciklama);  
            /**
             * main dom objects are found and data filled
             *  
             */
            var self = this;
            $(this.options.domObjectKey).each(function(key, value) {
                if(typeof self.options.data[key] != 'undefined') {
                    var test = self.options.domObjectKeyDataLabel;
                    $(this).html(self.options.data[key][test]);
                }
            });
            
            /**
             * secondary dom objects are found and filled with data
             */
            if(this.options.otherDomObjectKeys != null){
                var tobeSplited = this.options.otherDomObjectKeys;
                var arr = tobeSplited.split(',');
                $.each( arr,function (key, value) {
                    var dataLabel = self.options.otherDomObjectKeysDataLabels[key];
                    $(value).each(function(key, value) {
                        if(typeof self.options.data[key] != 'undefined') {
                            $(this).html(self.options.data[key][dataLabel]+' gün');
                        }
                    });
                });
            }
        },
        hide : function () {
            
        }
    });
    
    
  /**
    * error service widget for ajax and system errors
    * @author Mustafa Zeynel Dağlı
    * @since 11/02/2016
    */
   $.widget("sanalfabrika.errorService", {
       /**
        * Default options.
        * @returns {null}
        */
       options: {
           url : null,
           errorCode : null,
           pk : null,
           page : null,
           service : null,
           proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
           errorInfo : null,
           errorUrl : null
       },
       /**
        * private constructor method for jquery widget
        * @returns {null}
        */
       _create: function () {
       },
       /**
        * send error message to service
        * @returns {null}
        */
       send : function () {
           $.ajax({
                url: this.options.proxy,
                data: { url: this.options.url ,
                        error_code : this.options.errorCode,
                        pk : this.options.pk,
                        page_name : this.options.page,
                        service_name : this.options.service,
                        error_info : this.options.errorInfo,
                        url_full : this.options.errorUrl
}, 
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    
                }
            });
       },
       test : function() {
           alert('test');
       }
   });
   
   
   /**
    * widget for machine tools tree view
    * @author Mustafa Zeynel Dağlı
    * @since 12/02/2016
    */
   $.widget("sanalfabrika.machineTree", {
       /**
        * Default options.
        * @returns {null}
        */
       options: {
           proxy : 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
           url : null,
           pk : null,
           ajaxParams : null,
           treeClass : ' .tree ',
           treeID : ' #tree ',
           collapseTitle : 'Collapse',
           expandTitle : 'Expand',
           domFinderOnClick : ' li.parent_li > span ',
           domFinderChildren : ' > ul > li ',
           domFinderChildrenParent : 'li.parent_li',
           animationStyle : 'fast',
           language_code : 'tr',
           
       },
       
       setMainRoot : function() {
           self = this;
           $.ajax({
                url: this.options.proxy,
                data: { url: this.options.url ,
                        parent_id : 0,
                        pk : this.options.pk,
                        language_code : this.options.language_code,           
                }, 
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    if(data.length !==0) {
                        var datas = data;
                        var appendText = "<ul>";
                        $.each( data,function (key, value) {
                            /*self.element.append(function() {
                            return $('<li class="parent_li" data-test="attribute test"><span data-test="attribute test span"><i class="fa fa-calendar"></i>   '+data[key].text+'  </span></li>').click(function(value){ 
                                alert('week 5 alert');
                                //alert(datas[0].text);
                                console.log($(this).attr('data-test'));
                                console.log(value);
                            });*/
                            appendText+='<li class="parent_li" ><img src="/plugins/zeynel/img/node.png"><span id="'+data[key].id+'" data-action="false" ><i class="fa fa-calendar"></i>   '+data[key].text+'  </span></li>'; 
                        });
                        appendText+= "</ul>";
                        self.element.append(appendText);
                        
                        /**
                        * add action to newly appended dom elements
                        */
                        $('.tree2 li.parent_li > span[data-action="false"]').each(function (e) {
                                //self = this;
                                $(this).on('click', function(e) {
                                    self._loadSubNodes($(this).attr('id'), $(this));
                                });
                                /**
                                 * remove ['data-action'] not to add additional events to 
                                 * appended dom elements
                                 */
                                $(this).removeAttr('data-action');
                                $(this).removeData('data-action');
                        });

                        //jQuery._data( $('.tree li.parent_li > span'), "events" );
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
       },
       
       /**
        * private method to call sub nodes
        * @returns {null}
        */
       _create: function () {
           
       },
       
       _loadSubNodes: function (id, node) {
           self = this;
           //console.log(node.parent().find('>ul').length);
           /**
            * determine if loaded before,
            * if loaded alreadt , do not make service call anymore
            */
           if(node.parent().find('>ul').length==0) {
                $.ajax({
                    url: this.options.proxy,
                    data: { url: this.options.url ,
                            parent_id : id,
                            pk : this.options.pk,
                            language_code : this.options.language_code,           
                    }, 
                    type: 'GET',
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if(data.length !==0) {
                            var datas = data;
                            var appendText = "<ul>";
                            $.each( data,function (key, value) {
                                appendText+='<li  class="parent_li">'; 
                                appendText+='<img src="/plugins/zeynel/img/node.png"></img><span id="'+data[key].id+'" data-action="false" class="badge"><i class="fa fa-refresh fa-spin"></i>   '+data[key].text+'  </span>';
                                appendText+='</li>';
                            });
                            appendText+= "</ul>";

                            node.parent().hide();
                            node.parent().append(appendText);
                            node.parent().show('slow');
                            node.attr('title', 'Expand this node').find(' > i').addClass('fa-gears').removeClass('fa-spin');
                            
                            /**
                             * add action to newly appended dom elements
                             */
                            $('.tree2 li.parent_li > span[data-action="false"]').each(function (e) {
                                    $(this).on('click', function(e) {
                                        //alert($(this).attr('id'));
                                        self._loadSubNodes($(this).attr('id'), $(this));
                                    });
                                    /**
                                    * remove ['data-action'] not to add additional events to 
                                    * appended dom elements
                                    */
                                    $(this).removeAttr('data-action');
                                    $(this).removeData('data-action');
                            });

                            //jQuery._data( $('.tree li.parent_li > span'), "events" );
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
           } else {
               var children = node.parent('li.parent_li').find(' > ul > li');
                if (children.is(":visible")) {
                    children.hide('slow');
                    //alert('hide');
                    //$(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
                    node.attr('title', 'Expand this branch').find(' > i').addClass('fa-spin').removeClass('fa-gears');
                } else {
                    children.show('fast');
                    //$(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                    node.attr('title', 'Expand this branch').find(' > i').addClass('fa-gears').removeClass('fa-spin');
                }
           }
          
       },
       /**
        * send error message to service
        * @returns {null}
        */
       send : function () {
           $.ajax({
                url: this.options.proxy,
                data: { url: this.options.url ,
                        error_code : this.options.errorCode,
                        pk : this.options.pk,
                        page_name : this.options.page,
                        service_name : this.options.service,
                        error_info : this.options.errorInfo,
                        url_full : this.options.errorUrl
}, 
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    
                }
            });
       },
       test : function() {
           alert('test');
           this._trigger('tested');
       }
   });
   
   
   
   
}(jQuery));

