$(function(){
	var $li=$("#skin li");
	$li.click(function(){
		switchSkin(this.id);
	});//点击按钮换肤
	var cookie_skin=$.cookie("MyCssSkin");
	if(cookie_skin){
		switchSkin(cookie_skin);
	}//加载网页时换肤
});
function switchSkin(skinName){
	$("#"+skinName).addClass("selected")
		.siblings().removeClass("selected");
	$("#cssfile").attr("href","css/skin/"+skinName+".css");
	$.cookie("MyCssSkin",skinName,{path:'/',expires:10});
}

