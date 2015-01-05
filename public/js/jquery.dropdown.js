/**
 * ajax dropdown
 * 
 */
(function(factory){
	if(typeof define==="function" && define['amd']){
		define(['jquery'],factory);
	}else{
		factory(jQuery);
	}
}(function($){
	var Dropdown = $.fn.dropwn =function(options){
		var me = this;
	    this.options = $.extend({},Dropdown.defaults,options);
	    Dropdown.init.apply(this,this.options);
	    return this;
	};
	
	Dropdown.defaults = {
		isFetching:false,
	    url : '',
	    selectClass : 'd-select',
	    currentSelect: '0',
	    onSelect : $.noop	
	};
	
	Dropdown.init = function(options){
		var me = this ;
	    this.options = $.extend({},this.options,options);
	    var html = '<select class="'+me.options.selectClass+'">';
//	    var result = $.extend({},{
//	            currentSelect:'2',
//	            content:[{
//	              value:'1',
//	              label:'1'
//	            },
//	            {
//	              value:'2',
//	              label:'2'
//	            }]   
//	         },Dropdown.fetch(this.options));
	    var result = Dropdown.fetch(this.options));
	    $.each(result.content,function(i,n){
	      if(result.currentSelect==n.value){
	        html+='<option data-value="'+n.value+'" selected="selected">'+n.label+'</option>';
	      }else{
	        html+='<option data-value="'+n.value+'">'+n.label+'</option>';
	      }
	    }); 
	    me.append(html+'</select>');
	    $(me).on('click','option',function(e){
	    	var $target = $(e.target);
	    	Dropdown.onSelect($target.data('value'));
	    });
	};
	
	Dropdown.fetch = function(options){
		var me = this ;
		Dropdown.defaults.isFetching = true;
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
	    	  Dropdown.defaults.isFetching = false;
	      }
	    });
	};
	
	Dropdown.onSelect = function(selected){
		if(selected){
			Dropdown.options.onSelect.call(this,selected);
			alert(selected);
		}
	};
}));