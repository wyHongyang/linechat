/*!2015-07-29 */
!function(a){a.extend({formatTime:function(a){var b=(a.getHours()>9?a.getHours():"0"+a.getHours())+":"+(a.getMinutes()>9?a.getMinutes():"0"+a.getMinutes())+":"+(a.getSeconds()>9?a.getSeconds():"0"+a.getSeconds())+" "+(a.getMonth()+1)+"/"+a.getDate()+"/"+a.getFullYear();return b},notify:function(b){return this.opts={},this.opts.type="notice",this.opts.styling="fontawesome",this.opts.stack={dir1:"down",dir2:"right",push:"top",spacing1:"20",spacing2:"20",firstpos1:200,firstpos2:400,context:a("body")},this.opts.delay="3000",this.opts.width="500px",this.opts["min-height"]="300px",this.opts.button={closer:!0,sticker:!1,closer_hover:!0,sticker_hover:!1,labels:{}},this.opts=a.extend({},this.opts,b),new PNotify(this.opts)}})}(jQuery),function(a){a.ajaxSetup({dataType:"json",success:function(b,c){a.notify({title:"Success",text:b})},error:function(b,c,d){a.notify({title:"Error",text:b})}})}(jQuery);