
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


