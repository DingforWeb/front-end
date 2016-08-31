//封装jQuery对象方法的插件
//一个设置和获取颜色的插件,功能:1 设置匹配元素的颜色;2 获取匹配的元素的颜色
//框架

//			if(value==undefined){
//				//返回颜色
//				return this.css("color");
//			}else{
//				//设置字体颜色
//				return this.css("color",value);
//	

;(function($){
	//扩展方法
	jQuery.fn.extend({
		"color":function(value){
			return this.css("color",value);
		}
	});
})(jQuery);
