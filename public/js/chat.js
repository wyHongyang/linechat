/**
 * @version 0.0.1
 * @author hongyang
 * @description chat js
 */
(function($){
	var $borderDiv = $('.border-div');
	var $sendMessage = $('#sendMessage');
	var $message = $('#message');
	var $chatTitle = $('.chat-title span');
	var $panelGroup = $('.panel-group');
	var $dd = $panelGroup.find('dd');
	var $container = $('.chat-reply-container');
	var $chater = $('.chat-title .chater');
	
	$sendMessage.on('click',function(){
		var date = new Date();
		var dateString = $.formatTime(date);
		var $this = $(this);
		var text = $message.val();
		var imageSrc = $this.parents('.chat-item').find('.img-circle').attr('src');
		if(text.trim()!= ""){
			$.ajax({
				url:'/home/chat',
				data:{
					message:text,
					dateString:dateString,
					sendTo:$chater.text().toLowerCase(),
					type : "send"
				},
				type:'POST',
				dataType:'json',
				success : function(result){
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
					   '<small class="send-time">'+result.username+' ,'+dateString+'</small></section></article></section>';   
					$container.append(html);
					$message.val('');
				},
				error:function(result){
					
				}
			});
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