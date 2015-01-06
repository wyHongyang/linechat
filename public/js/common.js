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
		},
		notify : function(options){
			var that = this ;
			this.opts = {};
			this.opts['type'] = 'notice';
			this.opts['styling'] = 'fontawesome';
			this.opts['stack'] = {
				dir1:'down',
				dir2:'right',
				push:'top',
				spacing1:'20',
				spacing2:'20',
				firstpos1:200,
				firstpos2:400,
				context:$('body'),
			};
			this.opts['delay'] = '3000';
			this.opts['width'] = '500px';
			this.opts['min-height'] = '300px';
			this.opts['button'] = {
				closer: true,
		    	sticker: false,
		    	closer_hover: true,
		    	sticker_hover: false,
		    	labels: {}
			};
			this.opts = $.extend({},this.opts,options);
			return new PNotify(this.opts);
			/**
			 * $.notify({
			 * 	 @param title
			 * 	 @param text
			 * });
			 * */
		},
		
	});
	
})(jQuery);

$(function(){
	/**
	 * data
	 * @param type
	 * @param message
	 * */
	$.ajaxSetup({
		dataType:'json',
		success:function(data,status){
			$.notify({
				title:'Success',
				text : data
			});
		},
		error:function(data,status,xhr){
			$.notify({
				title:'Error',
				text : data
			});
		}
	});
});