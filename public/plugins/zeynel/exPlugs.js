
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
                    $this.find('div:first h3:first-child').html( data.adet);
                    $this.find('p:first').html(data.aciklama);
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
}(jQuery));

