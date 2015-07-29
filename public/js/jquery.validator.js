/**
 * ajax validator
 */

(function($){
	$.fn.extend({
		validator:function(options){
			var that = this;
			
			var setting = {
					
			};
			
			
			return this.each(function(){
				
			});
			
			/**
			 * 只允许输入数字
			 * */
			
			var conflict = function(event){
				var $target = $(event.target);
				var keyCode = event.keyCode;
				if($target[0].localName === 'input' && $target[0].type == 'text'){
					if(keyCode>=48 && keyCode<=57){
						event.returnvalue = true; 
					}else{
						event.returnvalue = false;
					}
				}
			};
		}
	});
})(jQuery);