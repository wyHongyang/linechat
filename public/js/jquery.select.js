/**
 * ajax select
 * 
 */
(function($){
	var Select = $.fn.select = function(options){
		var that = this;
		var $this = $(this);
		this.options = $.extend({},Select.settings,options);
		return this.each(function(){
			init.call(that,$this,that.options);
			$this.find('.m-select').off('change').on('change',function(e){
				var $target = $(e.target);
				var selected = { 
					value : $target.val(),
					label : $target.find('.jq-option[selected="selected"]').text().trim().toLowerCase();
				};
				onSelect.call(that,selected,that,that.options);
			});
		});
	};
	
	Select.settings = {
		isFetching:false,
	    url : '',
	    selectClass : 'jq-select',
	    selectCss : {
	    	borderRadius:'4px',
			minWidth:'160px'
	    }, 
	    optionClass : 'jq-option',
	    currentSelect: '0',
	    onSelect : $.noop	
	};
	
	var init = function($this,options){
		var selectHtml = $('<select />',{
			'class': 'm-select '+options.selectClass,
			'css':{
				'min-width':options.selectCss.minWidth,
				'border-radius':options.selectCss.borderRadius
			}
		});
		var result = fetch(options);
		var option='';
		$.each(result.content,function(i,n){
	        if(result.currentSelect == n.value){
	        	option+='<option class="m-option '+options.optionClass+'" data-value="'+n.value+'" selected="selected">'+n.label+'</option>';
	        }else{
	        	option+='<option class="m-option '+options.optionClass+'" data-value="'+n.value+'">'+n.label+'</option>';
	        }
	    });
		selectHtml.append(option);
		$this.append(selectHtml);
	};
	
	var fetch = function(options){
		var me = this ;
		Select.settings.isFetching = true;
	    this.options = $.extend({},this.options,options);
	    this.request = $.ajax({
	      url : me.options.url,
	      type: 'GET',
	      dataType:'json',
	      success:function(result){
	        /**
			 * result
			 * @params currentSelect 
			 * @params content //if you need
			 *    @params value 
        	 *    @params label
			 * */
	        return result;           
	      },
	      error:function(result){
	        return false;
	      },
	      done:function(){
	    	  Select.settings.isFetching = false;
	      }
	    });
	};
	
	var onSelect = function(selected,that,options){
		if(selected != undefined){
			options.onSelect.call(that,selected);
		}
	};
	
})(jQuery);