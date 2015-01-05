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
			
			var conflict = funciton(event){
				var $target = $(event.target);
				var keyCode = event.keyCode;
				if($target[0].localName === 'input' && $target[0].type == 'text'){
					if(keyCode>=48 && keyCode<=57){
						event.returnvalue = true; 
					}esle{
						event.returnvalue = false;
					}
				}
			};
		}
	});
})(jQuery);