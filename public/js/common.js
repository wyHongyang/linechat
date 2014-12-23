/**
 * @version 0.0.1
 * @author hongyang
 * @description common function collection
 * 
 */
(function($){
	$.extend({
		formatTime : function(date){
			var dateFormat = (date.getHours()>9?date.getHours():"0"+date.getHours())+":"
							+(date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes())+":"
							+(date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds())+" "
							+(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
			return dateFormat;
		}
	});
	
})(jQuery);