
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
           baseNodeCollapsedIcon: 'fa-calendar',
           baseNodeExpandedIcon: 'fa-calendar',
           //leafNodeCollapsedIcon: 'fa-spin',
           leafNodeExpandedIcon: 'fa-gear',
           leafNodeCollapsedIcon :'fa-refresh fa-spin',
           
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
                            appendText+='<li class="parent_li" data-state="'+data[key].state+'" data-lastNode="'+data[key].attributes.last_node+'" data-machine="'+data[key].attributes.machine+'" data-root="'+data[key].attributes.root+'" ><img src="/plugins/zeynel/img/node.png"><span id="'+data[key].id+'" data-action="false" ><i class="fa '+self.options.baseNodeCollapsedIcon+'"></i>   '+data[key].text+'  </span></li>'; 
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
       
       /**
        * set leaf nodes
        * @param {type} id
        * @param {type} node
        * @returns {undefined}
        * @author Mustafa Zeynel Dağlı
        */
       _loadSubNodes: function (id, node) {
           self = this;
           var listItem = node.parent('li.parent_li');
           if(listItem.attr('data-lastnode')=='true') {
               //alert('test true');
           }

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
                            last_node : listItem.attr('data-lastnode'),
                            machine : listItem.attr('data-machine'),
                            state : listItem.attr('data-state'),
                    }, 
                    type: 'GET',
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if(data.length !==0) {
                            var datas = data;
                            var appendText = "<ul>";
                            $.each( data,function (key, value) {
                                appendText+='<li data-state="'+data[key].state+'" data-lastNode="'+data[key].attributes.last_node+'" data-machine="'+data[key].attributes.machine+'"  class="parent_li" data-root="'+data[key].attributes.root+'">'; 
                                var leafNodeIcons = self.setLeafNodeIcons(data, key);
                                appendText+= leafNodeIcons;
                                appendText+='</li>';
                            });
                            appendText+= "</ul>";

                            node.parent().hide();
                            node.parent().append(appendText);
                            node.parent().show('slow');
                            
                            self.expandNodeIcons(node, listItem);

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
               var nodesUl = node.children().find('>ul');
               nodesUl.html('');
               //node.html('');
               var listItem = node.parent('li.parent_li');
               var children = node.parent('li.parent_li').find(' > ul > li');
                if (children.is(":visible")) {
                    children.hide('slow');
                    self.collapseNodeIcons(node, listItem);
                } else {
                    children.show('slow');
                    self.expandNodeIcons(node, listItem);
                }
           }
          
       },
       
       /**
        * return leaf node <i> ans <span>
        * @param {type} data
        * @param {type} key
        * @returns {String}
        * @author Mustafa Zeynel Dağlı
        * @since 19/02/2016
        */
       setLeafNodeIcons: function(data, key) {
           self = this;
           var appendText = '';
           if(data[key].attributes.last_node=='true' && data[key].state=='open' && data[key].attributes.machine=='false') {
                appendText+='<img src="/plugins/zeynel/img/node.png"></img><span id="'+data[key].id+'" data-action="false" class="badge"><i class="fa fa-gears"></i>   '+data[key].text+'  </span>';
            } else if(data[key].attributes.last_node=='true' && data[key].state=='closed' && data[key].attributes.machine=='false') {
                appendText+='<img src="/plugins/zeynel/img/node.png"></img><span id="'+data[key].id+'" data-action="false" class="badge"><i class="fa '+self.options.leafNodeCollapsedIcon +'"></i>   '+data[key].text+'  </span>';
            } else if(data[key].attributes.last_node=='true' && data[key].state=='open' && data[key].attributes.machine=='true') {
                appendText+='<img src="/plugins/zeynel/img/node.png"></img><span id="'+data[key].id+'" data-action="false" class="badge"><i class="fa fa-gear"></i>   '+data[key].text+'  </span>';
            }
            else {
                appendText+='<img src="/plugins/zeynel/img/node.png"></img><span id="'+data[key].id+'" data-action="false" class="badge"><i class="fa '+self.options.leafNodeCollapsedIcon +'"></i>   '+data[key].text+'  </span>';
            }
            return appendText;
       },
       
       /**
        * change node icons due to  collapse
        * @author Mustafa Zeynel Dağlı
        */
       collapseNodeIcons : function(node, listItem) {
           self = this;
           if(listItem.attr('data-root')=='true') {
                //alert('test');
                node.attr('title', 'Expand this branch').find(' > i').addClass(self.options.baseNodeCollapsedIcon).removeClass(self.options.baseNodeExpandedIcon);
            } else {
                node.attr('title', 'Expand this branch').find(' > i').addClass('fa-spin').addClass('fa-refresh').removeClass('fa-gears');
            }
            
            if(listItem.attr('data-lastnode')=='true' && 
                        listItem.attr('data-machine')=='false' &&
                        listItem.attr('data-state')=='closed') {
                //alert('test deneme');
                if(node.parent('li').find('>div button').length>0) {
                    node.parent('li').find('>div').remove();
                    //node.parent('li').find('>div button').remove();
                    //alert('ddeneme');
                    //node.parent('li').prepend('<button style="padding:0px;" onclick="event.preventDefault();" class="pull-left btn btn-default">Makina Ara <i class="fa fa-arrow-circle-right"></i></button>'); 
                }
            }
            
       },
       
       /**
        * change node icons due to  expand
        * @author Mustafa Zeynel Dağlı
        * @since 19/02/2016
        */
       expandNodeIcons : function(node, listItem) {
           self = this;
           var node = node;
           /**
            * base node icon changing due to collapse / expanse
            */
           if(listItem.attr('data-root')=='true') {
                node.attr('title', 'Expand this branch').find(' > i').addClass(self.options.baseNodeExpandedIcon).removeClass(self.options.baseNodeCollapsedIcon);
            } else {
                node.attr('title', 'Expand this branch').find(' > i').addClass('fa-gears').removeClass('fa-refresh').removeClass('fa-spin');
            }
            
            /**
             * if node is last node and not a machine and data state closed
             * then serach dom elements are appended
             */
            if(listItem.attr('data-lastnode')=='true' && 
                        listItem.attr('data-machine')=='false' &&
                        listItem.attr('data-state')=='closed') {
                //alert('test deneme');
                if(node.parent('li').find('>div button').length==0) {
                    node.parent('li').prepend('<div><button  onclick="event.preventDefault();" class="pull-left btn btn-default machine-tree-search-displayer">Makina Ara <i class="fa fa-arrow-circle-right"></i></button></div>'); 
                    node.parent('li').find('>div button').on('click', function(e) {
                       //alert('test click deneme');
                       if($(this).parent().find('>.machine-search').length==0) {
                           //$(this).parent('div').append('<button style="padding:0px;margin-left:10px;" onclick="event.preventDefault();" class="pull-left btn btn-default tree-search">Makina Ara <i class="fa fa-arrow-circle-right"></i></button>');
                           $(this).parent('div').append('<input class="machine-search"  type="text" value="Ara" />\n\
                                                                        <button  onclick="event.preventDefault();" class=" btn btn-default machine-search-btn machine-tree-search-button">\n\
                                                                        <i class="fa fa-search"></i>\n\
                                                                        </button>');
                            $(this).parent().find('>.machine-search-btn').on('click', function(){
                                alert('search click');
                                self.searchAndDeployMachines(node, listItem);
                            });
                       } else {
                           $(this).parent().find('>.machine-search').remove();
                           $(this).parent().find('>.machine-search-btn').remove();
                       }
                       
                   });
                }
            }
       },
       
       /**
        * search and display serached machines
        * @author Mustafa Zeynel Dağlı
        * @since 22/02/2016
        */
       searchAndDeployMachines: function (node, listItem) {
           self = this;
           var searchText = node.parent('li').find('>div .machine-search').val();
           //alert(node.parent('li').find('>div .machine-search').val());
           node.parent('li').find('>ul').remove();
           $.ajax({
                    url: self.options.proxy,
                    data: { url: this.options.url ,
                            parent_id : node.attr('id'),
                            pk : self.options.pk,
                            language_code : self.options.language_code,
                            last_node : listItem.attr('data-lastnode'),
                            machine : listItem.attr('data-machine'),
                            state : listItem.attr('data-state'),
                            search : searchText,
                    }, 
                    type: 'GET',
                    dataType: 'json',
                    success: function (data, textStatus, jqXHR) {
                        if(data.length !==0) {
                            var datas = data;
                            var appendText = "<ul>";
                            $.each( data,function (key, value) {
                                appendText+='<li data-state="'+data[key].state+'" data-lastNode="'+data[key].attributes.last_node+'" data-machine="'+data[key].attributes.machine+'"  class="parent_li" data-root="'+data[key].attributes.root+'">'; 
                                var leafNodeIcons = self.setLeafNodeIcons(data, key);
                                appendText+= leafNodeIcons;
                                appendText+='</li>';
                            });
                            appendText+= "</ul>";

                            node.parent().hide();
                            node.parent().append(appendText);
                            node.parent().show('slow');
                            
                            //self.expandNodeIcons(node, listItem);

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
       },
       
       
       /**
        * set machine serach dom elements
        * @param {type} node
        * @param {type} listItem
        * @returns {undefined}
        * @author Mustafa Zeynel Dağlı
        * @since 22/02/2016
        * @todo to implemented in 'expandNodeIcons' function
        */
       setSearchElements : function(node, listItem, clickedSpan) {
           self = this;
           if(listItem.attr('data-lastnode')=='true' && 
                        listItem.attr('data-machine')=='false' &&
                        listItem.attr('data-state')=='closed') {
                //alert('test deneme');
                if(node.parent('li').find('>div button').length==0) {
                    node.parent('li').prepend('<div><button  onclick="event.preventDefault();" class="pull-left btn btn-default machine-tree-search-displayer">Makina Ara <i class="fa fa-arrow-circle-right"></i></button></div>'); 
                    node.parent('li').find('>div button').on('click', function(e) {
                       alert('test click deneme');
                       if(clickedSpan.parent().find('>.machine-search').length==0) {
                           alert('ddddd');
                           //$(this).parent('div').append('<button style="padding:0px;margin-left:10px;" onclick="event.preventDefault();" class="pull-left btn btn-default tree-search">Makina Ara <i class="fa fa-arrow-circle-right"></i></button>');
                           clickedSpan.parent('div').append('<input class="machine-search"  type="text" value="Ara" />\n\
                                                                        <button  onclick="event.preventDefault();" class=" btn btn-default machine-search-btn machine-tree-search-button">\n\
                                                                        <i class="fa fa-search"></i>\n\
                                                                        </button>');
                            clickedSpan.parent().find('>.machine-search-btn').on('click', function(){
                                alert('search click');
                            });
                       } else {
                           clickedSpan.parent().find('>.machine-search').remove();
                           clickedSpan.parent().find('>.machine-search-btn').remove();
                       }
                   });
                }
                
                
            }
       },
       
       
       test : function() {
           alert('test');
           this._trigger('tested');
       }
   });
   
   
   
   
}(jQuery));

