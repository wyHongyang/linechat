/**
 * @version 0.0.1
 * @author hongyang
 * @description chat js
 */
(function($){
	var $borderDiv = $('.border-div');
	var $sendMessage = $('#sendMessage');
	var $message = $('#message');
	
	$sendMessage.on('click',function(){
		var date = new Date();
		var dateString = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" "+(date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear();
		var $this = $(this);
		var text = $message.val();
		var imageSrc = $this.parents('.chat-item').find('.img-circle').attr('src');
		if(text.trim()!= ""){
			var html = '<section class="re-chat-content">'+
					   '<article class="chat-item">'+
					   '<a href="javascript:;" class="pull-right ">'+
					   '<img class="img-circle head head-m" src='+imageSrc+' /></a>'+
					   '<section class="chat-body">'+
					   '<div class="panel text-sm">'+
					   '<div class="arrow-right-up"></div>'+
					   '<div class="arrow-right-down"></div>'+
					   '<div class="panel-body">'+
					   '<p>'+text+'</p></div></div>'+
					   '<small class="send-time">Sam ,'+dateString+'</small></section></article></section>';   
			$borderDiv.before(html);
			$message.val('');
			/*
			 * 这里需要将数据ajax给后台
			 * $.ajax({
			 * 	url:"",
			 * 	data: {message : text,
			 * 		   dateString : dateString 			
			 * 	},
			 * 	type: 'POST',
			 * 	dataType :'json',
			 * 	success: function(result){
			 * 
			 * 	},
			 * error: function(result){
			 * 	// 这里需要进行提示 可以采用notify 或者直接提示	
			 * }
			 * });
			 * */
		}
	});
	
	$message.on('keyup',function(e){
		var $this = $(this);
		e.preventDefault();
		e.stopPropagation();
		if(e.keyCode == '13'){
			$sendMessage.click();
		}		
	});
	
 })(jQuery);