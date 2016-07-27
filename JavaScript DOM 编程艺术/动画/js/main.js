function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function'){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
			
		}
	}
}
//原始位置
function positionMessage(){
	if(!document.getElementById) return false;
	if(!document.getElementById("message")) return false;
	var elem=document.getElementById("message");
	elem.style.position="absolute";
	elem.style.left="500px";
	elem.style.top="100px";
	//设置5秒后调用移动函数
//	movement=setTimeout("moveMessage()",5000);
	moveElement("message",200,100,10);
}
/*
改变位置
function moveMessage(){
	if(!document.getElementById) return false;
	if(!document.getElementById("message")) return false;
	var elem=document.getElementById("message");
	elem.style.left="200px";
}
*/
addLoadEvent(positionMessage);
//addLoadEvent(moveMessage);

//新移动位置,特定版
/*
function moveMessage(){
	if(!document.getElementById) return false;
	if(!document.getElementById("message")) return false;
	var elem=document.getElementById("message");
	//获得元素当前位置,并提取数值信息
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	//判断元素是否已到目的地
	if(xpos==200&&ypos==100){
		return true;
	}
	//如果没有，则将其往目的地移动一段距离
	if(xpos<200){
		xpos++;
	}
	if(xpos>200){
		xpos--;
	}
	if(ypos<100){
		ypos++;
	}
	if(ypos>100){
		ypos--;
	}
	//改变元素位置
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	//设置时间间隔
	movement=setTimeout("moveMessage()",10);
}
*/

//新移动位置,灵活版
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem=document.getElementById(elementID);	
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
		if(xpos==final_x&&ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		xpos++;
	}
	if(xpos>final_x){
		xpos--;
	}
	if(ypos<final_y){
		ypos++;
	}
	if(ypos>final_y){
		ypos--;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	movement=setTimeout(repeat,interval);
}
