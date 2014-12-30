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
		this.options = $.extend({},Pagination.options,options);
		this.params  = $.extend({},Pagination.options.params,options.params);
		this.isFetching = false ;
		this.$el.on('click','.page-prev:not(.disabled)',function(e){
			me.prev();
		});
		this.$el.on('click','.page-next:not(.disabled)',function(e){
			me.next();
		});
		this.$el.on('click','.page-number',function(e){
			var $this = $(e.target);
			me.onClick($this);
		});
	};
	
	Pagination.options = {
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
		   skip : 'go'
		},
		cn : {
		   prev : '上一页',
		   next : '下一页',
		   first: '第一页',
		   last : '最后一页',
		   skip : '确定'
		}
	};
	
	Pagination.prototype.constructor = Pagination;
	
	Pagination.prototype = {
		init  : function(this.params){
			var me = this;
			me.fetch(params);
			var pageHtml = '<nav><li class="page-first disabled"><a href="javascript:;">'+me.page[me.options.language].first+'</a></li>'
						   +'<li class="page-prev disabled"><a href="javascript;;">'+me.page[me.options.language].prev+'</a></li>'	
						   +'<li class="page-number current"><a href="javascript:;">'+1+'</a></li>'
						   +'<li class="page-next disabled"><a href="javascript:;">'+me.page[me.options.language].next+'</a></li>'
						   +'<li class="page-last disabled"><a href="javascript:;">'+me.page[me.options.language].last+'</a></li>'
						   +'<li class="page-skip disabled">skip to <input type="text" value="1"/><input type="button" value="'+me.page[me.options.language].skip+'"/></li></nav>';
			
			if(me.options.totalPage<=3){
				var append ;
				me.options.totalPage<3?(append='<li class="page-number"><a href="javascript:;">'+2+'</a>'):(append='<li class="page-number"><a href="javascript:;">'+2+'</a></li>'+
						'<li class="page-number"><a href="javascript:;">'+3+'</a></li>');
				
				$(pageHtml).find('.current').append(append).end()
				.find('.page-next,.page-last').removeClass('disabled');
			}
			if(me.options.totalPage>3){
				var append = '<li class="page-number"><a href="javascript:;">'+2+'</a></li>'
							 +'<li class="page-number"><a href="javascript:;">'+3+'</a></li>'
							 +'<li class="page-number"><a href="javascript:;">'+"..."+'</a></li>'
							 +'<li class="page-number"><a href="javascript:;">'+me.options.totalPage+'</a></li>';
				$(pageHtml).find('.current').append(append).end()
				.find('.page-next,.page-last').removeClass('disabled');
			}
			
			me.$el.append(pageHtml);
		},	
		fetch : function(params){
			var me = this;
			this.isFetching = true;
			this.request = $.ajax({
				url  : this.options.url,
				data : { params : params },
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
					// content = result.content ;
					me.$el.find('.page-prev,.page-first')[(params.pageNumber>1?'removeClass':(params.pageNumber==me.options.totalPage?'addClass':'removeClass'))]('.disabled');
					me.$el.find('.page-next,.page-last')[(params.pageNumber<me.options.totalPage?'removeClass':'addClass')]('.disabled');
					me.options.onSuccess.apply(me,[content]);
				},
				errot    : function(result){
					
				},
				done     : function(result){
					me.fetching = false;
				}
			});
		},
		next : function(){
			if(isFetching){
				return false;
			}
			if(this.options.pageNumber<this.options.totalPage){
				this.options.params.pageNumber += 1;
				this.$el.find('.current').removeClass('.current').next('.page-number').addClass('.current');
				this.fetch(this.options.params);
			}
		},
		prev : function(){
			if(isFetching){
				return false;
			}
			if(this.options.pageNumber>1){
				this.options.params.pageNumber -= 1;
				this.$el.find('.current').removeClass('.current').prev('.page-number').addClass('.current');
				this.fetch(this.options.params);
			}
		},
		onClick : function($obj){
			if(isFetching){
				return false;
			}
			$obj.addClass('.current').siblings('.page-number').removeClass('.current');
			this.fetch($.extend({},this.options.params,{
				pageNumber:$obj.find('a').text().trim()
			}));
		}
	};
	
	$.fn.pagination = function(options,args){
		return this.each(function(){
			var $this = $(this);
			data = $this.data('pagination');
			if(!data){
				$this.data('pagination',new Pagination(this,options));
			}else if(typeof options==='string'){
				data[options](args);
			}
		});
	};
	
}));
