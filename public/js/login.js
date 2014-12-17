/**
 * @version 0.0.1
 * @description login animation 
 * @author hongyang
 * 
 */
(function($){
	var $switch = $('.switch');
	var $container = $('.container');
	//switch icon
	var $birthDate = $('#birthDate');
	
	$switch.on('click','i.fa,.tooltips',function(e){
		var $this = $(this);
		if($this.is('.fa')){
			$this.toggleClass('fa-pencil');			
		}else{
			$this.siblings('i.fa').toggleClass('fa-pencil');
		}
		animateInOut();
	});
	
	function animateInOut(){
		$container.find('.form-horizontal').each(function(i,n){
			var $n = $(n);
//			$n.toggleClass('hidden');
			$n.animate({height: 'toggle', opacity: 'toggle'},"slow",function(){
				$n.toggleClass('hidden');
			});
		});		
	}
	
	$birthDate.datepicker({
		weekStart: 1,
		format:'yyyy/mm/dd'
	});
	
})(jQuery);