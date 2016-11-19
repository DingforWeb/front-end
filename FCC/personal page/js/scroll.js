$(document).ready(function(){
	$(window).scroll(function(){
		var top=$(document).scrollTop();
		var nav=$("nav");
		var menu=$(".menu");
		var currentMenu="";
		
		menu.each(function(){
			var m=$(this);
			var menuTop=m.offset().top;
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

$(document).ready(function(){
	$("#wechatImg").mouseover(function(e){
		var imgLink=this.href;
		var div_img="<div id='wechatImgBig'><img src='"+imgLink+"' /></div>";
		$("body").append(div_img);
		$("#wechatImgBig").css({
			"position":"absolute",
			"top":(e.pageY+20)+"px",
			"left":(e.pageX+10)+"px"
		}).show("fast");
	}).mouseout(function(){
		$("#wechatImgBig").remove();
	}).mousemove(function(e){
		$("#wechatImgBig").css({
			"position":"absolute",
			"top":(e.pageY+20)+"px",
			"left":(e.pageX+10)+"px"
		}).show("fast");
	});
});

//random word
$(document).ready(function(){
	var colors=["#fff","#CCCCFF","#99FFFF","#99FF66","#CC99CC","#FFCCFF"];
	var currentWord="";
	var currentAuther="";
	var word=$("#randomWord");
	var author=$("#author").find("span");
	var changeBtn=$("#changeWord");
	function getQuote(){
		$.ajax({
			headers: {
		      	"X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
		      	Accept: "application/json",
		      	"Content-Type": "application/x-www-form-urlencoded"
		    },
		    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    		success:function(data){
    			var r=JSON.parse(data);
    			currentWord=r.quote;
    			currentAuther=r.author;
    			word.text(currentWord);
    			author.text(currentAuther);
    			changeColor();
    		}
		});
	}
	changeBtn.on("click",getQuote);
	function changeColor(){
		var color=Math.floor(Math.random()*colors.length);
		word.css("color",colors[color]);
		author.css("color",colors[color]);
	}
	getQuote();
});

$(document).ready(function(){
	var submitBtn=$("#conSend");
	submitBtn.click(function(){
		alert("后台没写，嘻嘻");
		return false;
	});
})
