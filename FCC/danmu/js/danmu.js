$(document).ready(function(){
	var dmArr=[];//存放弹幕
	//创建Wilddog Sync实例
	var config = {
	  syncURL: "https://danmu-ding.wilddogio.com" //输入节点 URL
	};
	wilddog.initializeApp(config);
	var ref = wilddog.sync().ref();
	
	//监听数据
	ref.child("message").on("child_added",function(snapshot){
		var text=snapshot.val();
		dmArr.push(text);
		var dmItem=$("<div class='dm-item'></div>");//弹幕
		dmItem.text(text);
		$(".danmu-show").append(dmItem);
		moveDM(dmItem)//弹幕移动
		setTimeout(function(){},2000);
	});
	ref.on("child_removed",function(){
		dmArr=[];
		$(".danmu-show").empty();
	})
	
	//写入数据
	$("#send").click(function(){
		var text=$("#danmu-text").val();
		if(text){
			ref.child("message").push(text);
			$("#danmu-text").val("");
		}else{
			alert("弹幕不能为空");
		}
	});
	$("#danmu-text").keypress(function(event){
		if(event.keyCode=="13"){
			$("#send").trigger("click");
		}
	});
	
	//弹幕清除
	$("#reset").click(function(){
		ref.remove();
	});
	
	//弹幕样式（移动、颜色）
	var topMin=0;//弹幕池顶部高度
	var topMax=$(".danmu-show").height();//弹幕池底部高度
	var _top=topMin-30;//弹幕高度
	
	var moveDM=function(dmItem){
		var _left=$(".danmu-show").width()-dmItem.width();//弹幕右侧初始位置
		_top=_top+30;
		if(_top>topMax-30){
			_top=topMin;
		}
		dmItem.css({
			color:getColor(),
			left:_left,
			top:_top
		});
		var time = 10000 + 10000 * Math.random();//弹幕存在时间
	    dmItem.animate({
	      left: "0px"
	    }, time, function() {
	      dmItem.remove();//清除弹幕
	    });	
	}
	    
    //随机颜色
    function getColor(){
    	return '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).slice(-6);
    }
    
    //随机重现已有弹幕
    var getAndRun=function(){
    	if(dmArr.length>0){
    		var num=Math.floor(Math.random()*dmArr.length);
    		var dmItem=$("<div class='dm-item'>"+dmArr[num]+"</div>");
	    	$(".danmu-show").append(dmItem);
	    	moveDM(dmItem);
    	}
    	setTimeout(getAndRun,2000);
    }
    
    getAndRun();
});
