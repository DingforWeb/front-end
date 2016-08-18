重难点：
1、左侧栏目与右侧导航菜单的显示样式实现→
锚点（anchor）：是一种页面内的超级链接，href="#XXX"，点击时会跳转到相应id为"#XXX"的地方
CSS样式:
				position: fixed;
				top: 100px;
				left: 50%;
				margin-left: 400px;
				先让其到达中间位置，再向右偏移确定位置
2、导航与滚动条之间的定位关联→
scroll([daga],fn)：当用户滚动指定元素时会发生scroll事件。适用于所有可滚动的元素和window对象（浏览器对象）。比如
$(window).scroll(function(){});
scrollTop([val])：获取/设置匹配元素相对滚动条顶部的偏移。
offset()：获取匹配元素的相对偏移。返回的对象包括top和left两个整形属性，以像素计。
				//页面滚动触发事件
				$(window).scroll(function(){
					var top=$(document).scrollTop();//获取当前位置的top
					var menu=$("#menu");
					//通过id筛选效率高
					var item=$("#content").find(".item");
					
					var currentId="";//当前所在楼层id
					//遍历
					item.each(function(){
						var m=$(this);
						var itemTop=m.offset().top;//当前楼层高度
						if(top>itemTop-200){
							currentId="#"+m.attr("id");
						}else{
							return false;
						}
						
					});
					//给当前楼层添加class，去掉前楼层的class
					var currentLink=menu.find(".current");
					//判断currentid是否为空或是否处于当前位置
					if(currentId&&currentLink.attr("href")!=currentId){
						currentLink.removeClass("current");
						menu.find("[href="+currentId+"]").addClass("current");
					}
				});
