$(document).ready(function(){
	$(window).scroll(function(){
		var top=$(document).scrollTop();
		var nav=$("nav");
		var menu=$(".menu");
		var currentMenu="";
		
		menu.each(function(){
			var m=$(this);
			var menuTop=m.offset().top;
			console.log(menuTop);
			if(top>menuTop-200){
				currentMenu="#"+m.attr("id");
			}else{
				return false;
			}
		});
		
		var currentLink=nav.find(".current");
		if(currentMenu&&currentLink.attr("name")!=currentMenu){
			currentLink.removeClass("current");
			
			nav.find("[href="+currentMenu+"]").addClass("current");
		}
		
		
	});
});
