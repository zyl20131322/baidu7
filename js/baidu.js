//单例模式
// 作用：1.模块间通信
// 2.系统中某个类的对象只能存在一个
// 3.保护自己的属性和方法

$(function(){
	
	var index = {
	    init: function() {
	        var _this = this;
	        _this.isToTop();
	        _this.checkLocalStorage();
	        _this.render();
	        _this.bind();
	    },
	    render: function() {
	    	var _this = this;
	    	_this.top=$("#to-top");//返回顶部
	    	_this.mp= $("#hidemp,#moreproduct");//更多产品
	    	_this.arrow=$("#animate-arrow");//箭头
	    	_this.nav=$("#mine-nav");//我的导航
	    	_this.skinChanged=$("#skin-change");//换肤
	    	_this.skinUp=$("#skin-up");//收起皮肤
	    	_this.skinRemove=$("#skin-remove");//不使用皮肤
	    	_this.menuItem=$(".s-main-menu li");//主标签
	    	_this.skinNav=$(".s-skin-nav li");//皮肤导航
	    	_this.skinItem=$(".skin-img-item");//皮肤图片
	    },
	    bind: function() {
	    	var _this = this;
	    	_this.top.on("mouseover",function(){//返回顶部
				$(".to-top-text").show();
				$(".to-top").css("background","#eee");
				$(".to-top-icon").hide();
			}).on("mouseout",function(){
				$(".to-top-text").hide();
				$(".to-top").css("background","#fff");
				$(".to-top-icon").show();
			}).on("click",function(){
		        $('body,html').animate({scrollTop:0},500);
			});
			 _this.mp.on("mouseover", function() {//更多产品侧边栏隐藏和显示
	            $("#moreproduct").show();
	        }).on("mouseout", function() {
	            $("#moreproduct").hide();
	        });
	        _this.aArrow=function(){_this.arrow.animate({top:"13px"},500).animate({top:"7px"},500)};//箭头动画
	    	_this.arrow.click(function(){//箭头点击展开
				_this.showMainContent();		
				$(".s-more-bar").hide();
			});
			_this.animateArrow();
			_this.nav.on("click",function(){//我的导航展开合上
				if($("#mine-nav .nav-hide").length>0){
					$("#mine-nav .nav-hide").removeClass("nav-hide");
				}else{
					$("#mine-nav i").addClass("nav-hide");
				}	
				$("#mine-nav-content").toggle();
			});
			_this.skinChanged.on("click",function(){
				$(".s-skin-layer").slideDown();				
			});
			_this.skinUp.on("click",function(){
				$(".s-skin-layer").slideUp();
			});
			_this.skinRemove.on("click",function(){
				_this.skinChange("");
			});
			_this.menuItem.each(function(index){//标签切换
				var tab=$(this);
				$(this).on("click",function(){	
					$(".s-main-menu .tabin").addClass("tab").removeClass("tabin");
					tab.removeClass("tab").addClass("tabin");
					$(".s-main-content .content-show").removeClass("content-show");
					$(".s-main-content .s-main-item").eq(index).addClass("content-show");
					if($(".s-more-bar").is(':hidden')){
						_this.showMainContent();	
					}
				});
			});
			_this.skinNav.each(function(index){	//换肤切换风格
				$(this).on("click",function(){
					$(".s-skin-nav .choose-nav").removeClass("choose-nav");
					$(this).addClass("choose-nav");
					$(".show-skin-type-content").removeClass("show-skin-type-content");
					$(".skin-type-content").eq(index).addClass("show-skin-type-content");
				});
			});
			_this.skinItem.each(function(){//换肤更换背景
				$(this).on("click",function(){
					 var imgurl=$(this).find('img').attr('src');
					 imgurl=imgurl.replace(/skin_plus/,"skin");
					 _this.skinChange(imgurl);
				});
			});
			window.onscroll = function(){//反回顶部
				_this.isToTop();
			}

	    },
	    animateArrow:function(){
	    	var _this = this;
	    	setInterval(_this.aArrow);
	    },
	    showMainContent:function(){//展开主要内容
			if($(".s-main-content .content-show").eq(0).height()>$(".s-main-content").eq(0).height()){
					$(".s-main-content").css({
						"overflow":"visible",
						"height":"auto",
						"min-height":"363px"
					});
				}
		},
		isToTop:function(){//判断是否出现反回顶部
			var scrollHeight=$(window).scrollTop();
			if(scrollHeight>0){
				$("#to-top").show();
			}else{
				$("#to-top").hide();
			}
		},
		skinChange:function(url){
			var _this=this;
			if(url==""){
				$(".s-skin-container").css({
				"background-color":"#fff",
				"background-image":""
				});
				$(".baidulogo").attr("src","https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png");
				_this.setLocalStorage("skin-image","");
			}else{
				$(".s-skin-container").css({
				"background-image":"url("+url+")"
				});
				$(".baidulogo").attr("src","https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/logo_white_fe6da1ec.png");
				_this.setLocalStorage("skin-image",url);
			}
			
		},
		setLocalStorage:function(lname,lvalue){//设置LocalStorage
			localStorage.setItem(lname,lvalue);
		},
		checkLocalStorage:function(){//检查LocalStorage
			var _this=this;
			var skinImage=_this.getLocalStorage("skin-image");
			if (skinImage!=""){
				_this.skinChange(skinImage);
			}
			else {
				_this.skinChange("");
			}
		},
		getLocalStorage:function(lname){//获得LocalStorage
			var name = lname + "=";
			var value = localStorage.getItem(lname);
			if(value=="null"){
				return "";
			}else{
			return value;		
			}
		}
	};
	//初始化
	index.init();

});