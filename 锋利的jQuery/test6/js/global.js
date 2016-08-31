$(function(){
	//导航栏滑下收起效果
	$("#navigation ul li:has(ul)").hover(function(){
		$(this).children("ul").stop(true,true).slideDown(400);
	},function(){
		$(this).children("ul").stop(true,true).slideUp("fast");
	});

	
});
	//左侧模块展开和关闭
//$(function(){
//		 $(".module_up_down").toggle(function(){
//					var $self = $(this);
//					$self.prev().slideUp(600,function(){
//						$self.find("img").attr("src","images/up.gif");
//					});
//			 },function(){
//					var $self = $(this);
//					$self.prev().slideDown(600,function(){
//						$self.find("img").attr("src","images/down.gif");
//					});
//		 });
//});
//内容滚动
$(function(){
	var $this=$(".scrollNews");
	var scrollTimer;
	$this.hover(function(){
		clearInterval(scrollTimer);
	},function(){
		scrollTimer=setInterval(function(){
			scrollNews($this);
		},3000);
	}).trigger("mouseleave");
});
function scrollNews(obj){
	var $self=obj.find("ul:first");
	var lineHeight=$self.find("li:first").height();
	$self.animate({"marginTop":-lineHeight+"px"},600,function(){
		$self.css({marginTop:0}).find("li:first").appendTo($self);
	})
}
//最新动态模块内容引入超链接提示
$(function(){
	var x=10,y=20;
	$("a.tooltip").mouseover(function(e){
		this.myTitle=this.title;
		this.title="";
		var tooltip="<div id='tooltip'>"+this.myTitle+"</div>";
		$("body").append(tooltip);
		$("#tooltip").css({"top":(e.pageY+y)+"px",
		"left":(e.pageX+x)+"px","position":"absolute"})
			.show("fast");
	}).mouseout(function(){
		this.title=this.myTitle;
		$("#tooltip").remove();
	}).mousemove(function(e){
		$("#tooltip").css({"top":(e.pageY+y)+"px",
		"left":(e.pageX+x)+"px"});
	});
});
//产品分类树
$(function(){
	$(".m-treeview>li>span").click(function(){
		var $ul=$(this).siblings("ul");
		if($ul.is(":visible")){
			$(this).parent().attr("class","m-collapsed");
			$ul.hide();
		}else{
			$(this).parent().attr("class","m-expanded");
			$ul.show();
		}
		return false;
	});
});
//滚动广告
$(function(){
	var index=0;
	var len=$(".num>li").length;
	var adTimer;
	$(".num li").mouseover(function(){
		index=$(".num li").index(this);
		showImg(index);
	}).eq(0).mouseover();
	$(".ad").hover(function(){
		clearInterval(adTimer);
	},function(){
		adTimer=setInterval(function(){
			showImg(index);
			index++;
			if(index==len){index=0;}
		},3000);
	}).trigger("mouseleace");
});
function showImg(index){
	var adHeight=$(".content_right .ad").height();
	$(".slider").stop(true,false).animate({top:-adHeight*index},1000);
	$(".num li").removeClass("on").eq(index).addClass("on");
}
//产品横向滚动
$(function(){
	var page=1;
	var i=4;
	var len=$(".prolist_content ul li").length;
	var page_count=Math.ceil(len/i);
	var none_unit_width=$(".prolist").width();
	var $parent=$(".prolist_content");
	//向右
	$(".goRight").click(function(){
		if(!$parent.is(":animated")){
			if(page==page_count){
				$parent.animate({left:0},800);
				page=1;
			}else{
				$parent.animate({left:'-='+none_unit_width},800);
				page++;
			}
		}
	});
	//向左
	$(".goLeft").click(function(){
		if(!$parent.is(":animated")){
			if(page==1){
				$parent.animate({left:'-='+none_unit_width*(page_count-1)},800);
				page=page_count;
			}else{
				$parent.animate({left:"+="+none_unit_width},800);
				page--;
			}
		}
	});
});
//光标滑过
$(function(){
	$(".content_right .prolist ul li").each(function(index){
		var position=$(this).position();
		var li_left=position.left;
		var li_top=position.top;
		var img_width=$(this).find("img").width();
		var img_height=$(this).find("img").height();
		var spanHtml='<span style="position: absolute;top:'+li_top+
			'px;left:'+li_left+'px;width:'+img_width+'px;height:'+
			img_height+'px;cursor:pointer;" class="imageMask"></span>';
		$(spanHtml).hover(function(){
			$(this).addClass("imageOver");
		},function(){
			$(this).removeClass("imageOver");
		}).appendTo($(this).find("a"));
	});
});
//产品放大镜
$(function(){
	$("j.jqzoom").jqueryzoom({
		xzoom:300,
		yzoon:300,
		offset:10,
		position:"right",
		preload:1
	});
});
//切换图片
$(function(){
	$(".pro_detail_left ul li img").click(function(){
		var imgSrc=$(this).attr("src");
		var i=imgSrc.lastIndexOf(".");
		var unit=imgSrc.substring(i);
		imgSrc=imgSrc.substring(0,i);
		var imgSrc_small=imgSrc+"_small"+unit;
		var imgSrc_big=imgSrc+"_big"+unit;
		$("#bigImg").attr({"src":imgSrc_small,"jqimg":imgSrc_big});
		$("#thickImg").attr("href",imgSrc_big);
	});

});
//属性介绍选项卡
$(function(){
	var $div_li=$("div.tab_menu ul li");
	$div_li.click(function(){
		$(this).addClass("selected")
		    .siblings(.removeClass("selected"));
		    var index=$div_li.index(this);
		    $("div.tab_box>div").eq(index).show()
		    	.siblings().hide();
	}).hover(function(){
	$(this).addClass("hover");	
	},function(){
		$(this).removeClass("hover");
	});
});

