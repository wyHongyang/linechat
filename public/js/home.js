/**
 * @version 0.0.1
 * @author hongyang
 * @description handle the event in home.html
 * 
 */
(function($){
	var $panelHeading = $('.panel-heading');
	var $pModal = $('.p-modal');
	var $pBadge = $('.p-badge');
	var $item   = $pModal.find('.list-group-item');
	var $pBody  = $('.panel-body dd');
	
	$panelHeading.on('click',function(e){
		var $this = $(this);
		$this.find('.switch-icon,.fa-angle-down,.fa-angle-up').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
	});
	
	$pBadge.on('click',function(e){
		animateInOut();
	});
	
	$item.on('click',function(e){
		$pModal.addClass('hidden');
	});
	
	function animateInOut(){
		$pModal.each(function(i,n){
			var $n = $(n);
//			$n.toggleClass('hidden');
			$n.animate({height: 'toggle', opacity: 'toggle'},"normal",function(){
				$n.toggleClass('hidden');
			});
		});		
	}
	
	$item.on('click',function(e){
		var $this = $(this);
		var send_from = $this.find('.message-user').data();
		$.ajax({
			url:'/home/chat',
			data:{
				send_from:send_from.id
			},
			type:'GET',
			dataType:'json',
			success:function(result){
				
			},
			error:function(result){
				
			}
		});
	});
	
//	$pBody.on('click',function(e){
//		var $this = $(this);
//		var send_to = $this.find('.u-name').text();
//		$.ajax({
//			url:'/chatWith',
//			data:{
//				chatWith : send_to
//			},
//			type:'POST',
//			dataType:'json',
//			success:function(result){
//				
//			},
//			error:function(result){
//				
//			}
//		});
//	});
	
})(jQuery)