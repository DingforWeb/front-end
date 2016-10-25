function inIframe(){
	try{
		return window.self !== window.top;
	}catch(e){
		//TODO handle the exception
		return true;
	}
}

var colors=["#16a085","#27ae60","#2c3e50","#f39c12","#fb6964"]
//var quotes=["自在飞花轻似梦，无边丝雨细如愁。","此情可待成追忆？只是当时已惘然。",
//"凄凉千古事，日暮倚阊门。","大漠沙如雪，燕山月似钩。","粉骨碎身浑不怕，要留清白在人间。",
//"野旷天低树，江清月近人。"];
//var authors=["秦观","李商隐","杜甫","韦应物","李贺","于谦","孟浩然"]
var currentQuote="",currentAuthor="";

function openURL(url){
	window.open(url,"share","width=550,height=400,toolbars=1,location=0,statusbar=0,menubar=0,resizable=0");
	
}
function getQuote(){
	//ajax
	$.ajax({
		type:"get",
		url:"http://api.jirengu.com/fm/getLyric.php",
		async:true,
		data:{
			sid:Math.floor(Math.random()*100000)
		},
		success:function(data){
			
		}
	});
	
	var quote=Math.floor(Math.random()*quotes.length);
	var color=Math.floor(Math.random()*colors.length);
	//确定当前句子
	currentQuote=quotes[quote];
	currentAuthor=authors[quote];
//	if(inIframe()){
//		$("#wechat-quote").attr("href","#");
//		$("#weibo-quote").attr("href","#");
//	}
	$(".quote-text").animate({
		opacity:"0"
	},500,function(){
		$(this).animate({
			opacity:"1"
		},500);
		$("#text").text(currentQuote);
	});
	$(".quote-author").animate({
		opacity:"0"
	},500,function(){
		$(this).animate({
			opacity:"1"
		},500);
		$("#author").text(currentAuthor);
	});
	//改变颜色
	$("html body").animate({
		backgroundColor:colors[color],
		color:colors[color]
	},1000);
	$(".button").animate({
		backgroundColor:colors[color]
	},1000);
}


$(document).ready(function(){
	getQuote();
	$("#new-quote").bind("click",getQuote);
//	$("#wechat-quote").on("click",function(){
//		if(!inIframe()){
//			openURL("#")
//		}
//	});
//	$("#weibo-quote").on("click",function(){
//		if(!inIframe()){
//			openURL("#")
//		}
//	});
});
