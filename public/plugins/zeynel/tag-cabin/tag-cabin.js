

(function ($) {

    /**
     * load imager widget for loading operations
     * @author Mustafa Zeynel Dağlı
     * @since 11/01/2016
     */
    $.widget("sanalfabrika.tagCabin", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            tagCopy             : true,
            tagDeletable        : true,
            tagDeletableAll     : false,     
            tagBox              : $('.tag-container').find("ul"),
            closeTag            : '<i class="fa fa-fw fa-trash-o delete-icon" title="Sil" onclick=""></i>',
            closeAllTag         : '<i class="fa fa-fw fa-remove delete-all-icon" title="Tüm Alanlardan Sil" onclick=""></i>',
            copyTag             : '<i class="fa fa-copy copy-icon" title="Kopyala" onclick=""></i>',
            tagRemovable        : '<li data-id="{id}" class="tags">{tag}</li>',
            tagNotRemovable     : '<li class="tags">{tag}</li>',
            tagContainer        : '.tag-container', 
        },
        deleteTag : function() {
            
        },
        
        removeTags : function(tagsToBeRemoved) {
            var self = this;
            items = self.findTags();
        },
        
        removeTag : function() {
            var self = this;
            //self.findTag()
        },
        
        /**
         * find and remove specific tags due to given value
         * @param {type} value
         * @param {type} tagAttribute
         * @returns {undefined}
         */
        removeSpecificTags : function(value, tagAttribute) {
            var self = this;
            var listItems = $(self.options.tagBox).find('li'); 
            var controlor = true; 
            $.each(listItems, function(key, item) {
                //console.log($(item));
                //console.log(item);
                if($(item).attr(tagAttribute) == value) {
                    $(item).remove();  
                }
            })
            self._trigger('onSpecificTagsRemoved', event);
            return true;
        },
        
        findTags : function() {
            var self = this;
            var listItems = $(self.options.tagBox).find('li'); 
            $.each(listItems, function(key, item) {
                self._trigger('tagsFound', event, item);
                /*console.log($(item).attr('data-attribute'));
                console.log($(item).attr('data-tree-item'));*/
            })
        },
        
        /**
         * find specific tags due to given value
         * @param {type} value
         * @param {type} tagAttribute
         * @returns {undefined}
         */
        findSpecificTags : function(value, tagAttribute) {
            var self = this;
            var listItems = $(self.options.tagBox).find('li'); 
            var controlor = true;
            //console.log(listItems);  
            $.each(listItems, function(key, item) {
                //console.log($(item));
                if($(item).attr(tagAttribute) == value) {
                    //alert('daha önce yüklenmiş');
                    controlor = false;  
                    return false;
                }
                //self._trigger('tagsFound', event, item);
                /*console.log($(item).attr('data-attribute'));
                console.log($(item).attr('data-tree-item'));*/
            })
            return controlor;
        },
        
        /**
         * public function to add tag individually 
         * @param {type} id
         * @param {type} tag
         * @param {type} infoArray
         * @param {type} infoArrayManual
         * @returns {undefined}
         * @since 29/04/2016
         */
        addTagManually : function(id, tag, infoArray) {
            var self = this;
            var tag = tag;
            var icons = '';
            var tagCustom = '';
            
            if(typeof infoArray!= "undefined") {
                $.each(infoArray, function(key, item) {
                    //console.error(key+'--'+item);
                    tagCustom += ' '+key+'="'+item+'" ';  
                })
            }
            
            if(self.options.tagCopy) {
               icons += self.options.copyTag;
            }
            
            if(self.options.tagDeletableAll) {
               icons += self.options.closeAllTag;
            }
            
            if(self.options.tagDeletable) {
                icons += self.options.closeTag;       
            }
            self.options.tagBox.append('<li class="tags" data-attribute="'+id+'"  '+tagCustom+' >'+tag+icons+'</li>');
        },
        
        /**
         * add tags due to given data
         * @param {type} data
         * @param {type} infoArrayManual
         * @returns {undefined}
         */
        addTags : function(data, infoArrayManual) {  
            var self = this;
            var infoArrayManual = infoArrayManual;
            var dataArr = $.parseJSON(data);
            var infoArray = {};
            $.each(dataArr, function(key, row) {
                if(typeof self.options.dataMapper!= "undefined") { 
                    $.each(self.options.dataMapper, function(index, item) {
                        /*console.warn(item);
                        console.log(index);*/
                        $.each(item, function(index2, item2) {
                            //console.warn(row[index][item2]);  
                            if(typeof row[index][item2]!= "undefined") { 
                                infoArray['data-'+item2] = row[index][item2]; 
                            }

                        })                    
                    })
                    //console.warn(infoArray);
                } 
                self._addTag(row.id, row.text, infoArray, infoArrayManual);  
                //self._addTag(row.id, row.text);    
            })
        },
        
        /**
         * private function to add tag individually used in 'addTags' function
         * @param {type} id
         * @param {type} tag
         * @param {type} infoArray
         * @param {type} infoArrayManual
         * @returns {undefined}
         */
        _addTag : function(id, tag, infoArray, infoArrayManual) {
            var self = this;
            var tag = tag;
            var icons = '';
            
            var tagCustom = '';
            if(typeof infoArray!= "undefined") {
                $.each(infoArray, function(key, item) {
                    //console.error(key+'--'+item);
                    tagCustom += ' '+key+'="'+item+'" ';  
                })
            }
            
            if(typeof infoArrayManual!= "undefined") { 
                $.each(infoArrayManual, function(key, item) {
                    //console.error(key+'--'+item);
                    tagCustom += ' '+key+'="'+item+'" ';  
                })
            }
            
            if(self.options.tagCopy) {
               icons += self.options.copyTag;
            }
            
            if(self.options.tagDeletableAll) {
               icons += self.options.closeAllTag;
            }
            
            if(self.options.tagDeletable) {
                icons += self.options.closeTag;       
            }
            self.options.tagBox.append('<li class="tags" data-attribute="'+id+'"  '+tagCustom+' >'+tag+icons+'</li>');
        },
        
        /**
         * private constructor method for jquery widget
         * @returns {null}
         */
        _create: function () {
            
            var self = $(this);
            
            /**
             * delete icon click event binding
             */
            this._on(this.element, {
            'click.delete-icon': function(event, self) {
                    var event = event;
                    var element = $(event.target).parent();
                    var id = element.attr('data-attribute');
                    this._trigger('onTagRemoved',event, { 
                        element : element,
                        id : id
                    } );   
                }
            });
            
            /**
             * delete all icon click event binding
             */
            this._on(this.element, {
            'click.delete-all-icon': function(event, self) {
                    var event = event;
                        var element = $(event.target).parent();
                        var id = element.attr('data-attribute');
                        this._trigger('onTagRemovedUltimately',event, { 
                            element : element,  
                            id : id
                    } );
   
                }
            });
            
            /**
             * copy icon click event binding
             */
            this._on(this.element, {
            'click.copy-icon': function(event, self) {
                    var event = event;
                    var element = $(event.target).parent();    
                    var id = element.attr('data-attribute');
                    this._trigger('onTagCopied',event, { 
                        element : element,
                        id : id
                    } );   
                }
            });

        },  
        
        _init : function() {
        },
    });  

}(jQuery));

