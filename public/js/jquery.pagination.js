/**
 *  ajax pagination for jquery
 * 
 */
/**
 * 
 * 常见匿名函数的写法
 * 1.最常见
 * (function(){})();
 * 2.void function(){
 * }();//效率最高
 * 3.+function(){
 * }();
 * 4.-function(){
 * }();
 * 5.~function(){
 * }();
 * 6.!funciton(){
 * }();
 * 7.(function(){
 * }());// 有点强制执行
 * 8.~(function(){
 * })();//cool
 * 
 */
//模块化写法
//(function(root,factory){
//	if(typeof define ==="function" && define['amd']){
//		define(['jquery'],function(root,$){
//			root.pagination = factory(root,$);
//		});
//	}else if(typeof exports !=="undefined"){
//		var target = module['jquery'] || exports ;
//		root.pagination = facroty(root,target);
//	}else{
//		root.pagination = factory(root,root.jQuery || root.Zepto );
//	}
//})(this,function($){
//	
//}));

//插件写法
(function(factory){
	if(typeof define==="function" && define['amd']){
		define(['jquery'],factory);
	}else{
		factory(jQuery);
	}
}(function($){
	var Pagination = function(el,options){
		var me = this ;
		this.$el = $(el);
		this.options = $.extend({},Pagination.defaults,options);
		this.params  = $.extend({},Pagination.defaults.params,options.params);
		this.isFetching = false ;
	    this.page = $.extend({},Pagination.page,options.page);
		this.$el.on('click','.page-prev:not(.disabled)',function(e){
			me.prev();
		});
		this.$el.on('click','.page-next:not(.disabled)',function(e){
			me.next();
		});
	    this.$el.on('click','.page-first:not(.disabled)',function(e){
			me.first();
		});
	    this.$el.on('click','.page-last:not(.disabled)',function(e){
			me.last();
		});
	    this.$el.on('click','.page-skip input[type="button"]',function(e){
	      var $this = $(this);
	      var skip = $this.siblings('input[type="text"]').val().trim().toLowerCase();
	      if(!isNaN(skip) && parseInt(skip)>=1 && parseInt(skip)<=me.options.totalPage){
	        me.skip(parseInt(skip));
	      }
	    });
	    this.$el.on('click','.page-number',function(e){
			var $this = $(e.currentTarget);
	        var val = $this.find('a').text().trim();
	        if(!isNaN(val)){
	          me.onClick($this);
	        }else{
	          var skip = parseInt(me.$el.find('.page-number.current a').text().trim());
	          if((!(skip%3) || skip>=3) && skip<me.options.totalPage ){
	            me.skip(skip+1);
	          }   
	        }
		});
	};
	
	Pagination.defaults = {
		params    : {
			pageSize:10,
			pageNumber:1
		},
		language  : 'en',
		totalPage : 1,
		ajaxUrl   : '',
		onSuccess : $.noop
	};
	
	Pagination.page = {
		en : {
		   prev : '<',
		   next : '>',
		   first: '<<',
		   last : '>>',
		   skipTo: 'skip to',  
		   skip : 'go'
		},
		cn : {
		   prev : '上一页',
		   next : '下一页',
		   first: '第一页',
		   last : '最后一页',
		   skipTo: '跳转到',
		   skip : '确定'
		}
	};
	
	//Pagination.prototype.constructor = Pagination;
	
  Pagination.prototype.init = function(params){
	 var me = this;
     var params = $.extend({},me.params,params); 
		me.fetch(params);
		var pageHtml = '<nav class="jq-pagination"><li class="page-first disabled"><a href="javascript:;">'+me.page[me.options.language].first+'</a></li>'
					   +'<li class="page-prev disabled"><a href="javascript:;">'+me.page[me.options.language].prev+'</a></li>'	
					   +'<li class="page-number current"><a href="javascript:;">'+1+'</a></li>'
					   +'<li class="page-next disabled"><a href="javascript:;">'+me.page[me.options.language].next+'</a></li>'
					   +'<li class="page-last disabled"><a href="javascript:;">'+me.page[me.options.language].last+'</a></li>'
					   +'<li class="page-skip">'+me.page[me.options.language].skipTo+' <input type="text" value="1"/><input type="button" value="'+me.page[me.options.language].skip+'"/></li></nav>';
		var append ;
		if(me.options.totalPage<=3){			
			me.options.totalPage<3?(append='<li class="page-number"><a href="javascript:;">'+2+'</a>'):(append+='<li class="page-number"><a href="javascript:;">'+2+'</a></li>'+
					'<li class="page-number"><a href="javascript:;">'+3+'</a></li>');				
        $(pageHtml).find('.current').after(append).end()
			.find('.page-next,.page-last').removeClass('disabled');
		}
		if(me.options.totalPage>3){
			append = '<li class="page-number"><a href="javascript:;">'+2+'</a></li>'
					 +'<li class="page-number"><a href="javascript:;">'+3+'</a></li>'
					 +'<li class="page-number"><a href="javascript:;">'+"..."+'</a></li>'
					 +'<li class="page-number"><a href="javascript:;">'+me.options.totalPage+'</a></li>';
			$(pageHtml).find('.current').after(append).end()
			.find('.page-next,.page-last').removeClass('disabled');
		}
     me.$el.append(pageHtml);
		if(append){
	       $(append).insertAfter($('.current')); 
	       me.$el.find('.page-next,.page-last').removeClass('disabled');
	    }			
	}
  
  Pagination.prototype.fetch = function(params){
	var me = this;
	//this.isFetching = true;
	this.request = $.ajax({
		url  : this.options.url,
		data : params,
		type : 'GET',
		dataType : 'json',
		success  : function(result){
			/**
			 * result
			 * @params totalPage 
			 * @params content //if you need
			 * 
			 * */
			var content ;
			me.options.totalPage = result.totalPage || 1;
			content = result.content ;
			me.$el.find('.page-prev,.page-first')[(params.pageNumber>1?'removeClass':(params.pageNumber==me.options.totalPage?'addClass':'removeClass'))]('disabled');
			me.$el.find('.page-next,.page-last')[(params.pageNumber<me.options.totalPage?'removeClass':'addClass')]('disabled');
			me.options.onSuccess.apply(me,[content]);
		},
		errot    : function(result){
			
		},
		done     : function(result){
			me.fetching = false;
		}
	});
  }
    
  Pagination.prototype.prev =  function(){
	if(this.isFetching){
		return false;
	}
	if(this.options.params.pageNumber>1){
		this.options.params.pageNumber -= 1;
		this.$el.find('.current').removeClass('current').prev('.page-number').addClass('current').end()
		.end().find('.page-next,.page-last').removeClass('disabled');       
		//this.fetch(this.options.params);
		this.skip(this.options.params.pageNumber);
		if(this.options.params.pageNumber==1){
		this.$el.find('.page-prev,.page-first').addClass('disabled');
		}
	  }
	}

  Pagination.prototype.next =  function(){
	  if(this.isFetching){
		  return false;
	  }
	  if(this.options.params.pageNumber<this.options.totalPage){
		  this.options.params.pageNumber += 1;
		  this.$el.find('.current').removeClass('current').next('.page-number').addClass('current').end()
		  	.end().find('.page-prev,.page-first').removeClass('disabled'); 
		  //this.fetch(this.options.params);      
      this.skip(this.options.params.pageNumber);
     if(this.options.params.pageNumber==this.options.totalPage){
    	 this.$el.find('.page-next,.page-last').addClass('disabled');
     	}      
	  }
  }
    
  Pagination.prototype.first = function(){
    if(this.isFetching){
		return false;
	}
    this.options.params.pageNumber = 1; 
    this.$el.find('.current').removeClass('current').end().find('.page-number').eq(0).addClass('current').end()
        .end().find('.page-prev,.page-first').addClass('disabled').end().find('.page-next,.page-last').removeClass('disabled');
		this.fetch(this.options.params);  
   }  

  Pagination.prototype.last = function(){
    if(this.isFetching){
		return false;
	}
    this.options.params.pageNumber = this.options.totalPage; 
    this.$el.find('.current').removeClass('current').end().find('.page-number').last().addClass('current').end()
        .end().find('.page-next,.page-last').addClass('disabled').end().find('.page-prev,.page-first').removeClass('disabled');
		this.fetch(this.options.params);  
  }
  
  Pagination.prototype.onClick =  function($obj){
	if(this.isFetching){
		return false;
	}
	$obj.addClass('current').siblings('.page-number').removeClass('current');
	this.fetch($.extend({},this.options.params,{
		pageNumber:$obj.text().trim().toLowerCase()
	}));
  }   
  
  Pagination.prototype.skip = function(skip){
    var me = this;
    if(this.isFetching){
		return false;
	}
    if(skip==1){
      me.first();
      if(me.$el.find('.page-number a').size()>4){
        me.$el.find('.page-number a').eq(0).html(skip).end().eq(1).html(skip+1)
          .end().eq(2).html(skip+2).end().eq(3).html('...').end().last().html(me.options.totalPage).end();
        me.$el.find('.page-number').eq(0).addClass('current').siblings().removeClass('current');
      }else{
        me.$el.find('.page-number a').eq(0).html(skip).end().eq(1).html(skip+1)
          .end().eq(2).html(skip+2).end().eq(3).html('...').end();
        me.$el.find('.page-number').eq(0).addClass('current').siblings().removeClass('current');
      }
          
    }else if(skip == me.options.totalPage){
      me.last();
      if(me.$el.find('.page-number a').size()>4){
        me.$el.find('.page-number a').last().html(skip).end().eq(1).html('...').end().eq(2).html(skip-2)
          .end().eq(3).html(skip-1).end().eq(0).html(1).end();
        me.$el.find('.page-number').last().addClass('current').siblings().removeClass('current');   
      }else{
        me.$el.find('.page-number a').last().html(skip).end().eq(0).html('...').end().eq(1).html(skip-2)
          .end().eq(2).html(skip-1).end();
        me.$el.find('.page-number').eq(skip-1).addClass('current').siblings().removeClass('current');   
      }
        
    }else{
      me.options.params.pageNumber = skip;
      me.fetch(this.options.params);
      if(skip>3){
        me.$el.find('.page-number a').eq(0).html('...').end().eq(1).html(skip-2)
          .end().eq(2).html(skip-1).end().eq(3).html(skip).end().last().html('...');
      }
      me.$el.find('.page-number').each(function(i,n){
        var $n = $(n);
        if(skip==$n.text().trim().toLowerCase()){
          $n.addClass('current').siblings('.page-number').removeClass('current');
        }
      });
    } 
  }
  
	$.fn.pagination = function(args,options){
		return this.each(function(){
			var $this = $(this);
			data = $this.data('pagination');
			if(!data){
				$this.data('pagination',new Pagination(this,options));
			   if(typeof args==='string'){
			     $this.data('pagination')[args](options.params);
			   	}
		}else if(typeof args==='string'){
			data[args](options);
		}
		});
	};
	/*var options= {
        params    : {
          pageSize:10,
          pageNumber:1
        }
        //language:'cn'
      };
    $('.test-pagination').pagination('init',options);*/
}));

