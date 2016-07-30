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
function prepareSlideshow(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("linklist")) return false;
	if(!document.getElementById("preview")) return false;
	
	
	//设置图片应用样式
	var preview=document.getElementById("preview");
	preview.style.position="absolute";
	//在下文的安全检查中已经设值了值的位置了
//	preview.style.left="0px";
//	preview.style.top="0px";
	//取得列表中的所有链接
	var list=document.getElementById("linklist");
	var links=list.getElementsByTagName("a");
	//为mouseover添加动画效果
	links[0].onmouseover=function(){
		moveElement("preview",-100,0,10);
	}
	links[1].onmouseover=function(){
		moveElement("preview",-200,0,10);
	}
	links[2].onmouseover=function(){
		moveElement("preview",-300,0,10);
	}
	
}

function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem=document.getElementById(elementID);	
	//清除队列事件，防止动画混乱
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	//检查是否元素位置存在，若不存在，则设值
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	//dist为xpos与final_x的距离
	var dist=0;
//		if(xpos==final_x&&ypos==final_y){
//		return true;
//	}
//	if(xpos<final_x){
//		xpos++;
//	}
//	if(xpos>final_x){
//		xpos--;
//	}
//	if(ypos<final_y){
//		ypos++;
//	}
//	if(ypos>final_y){
//		ypos--;
//	}
//使滑动更平滑
	if(xpos<final_x){
		dist=Math.ceil((final_x-xpos)/10);
		xpos=xpos+dist;
	}
	if(xpos>final_x){
		dist=Math.ceil((xpos-final_x)/10);
		xpos=xpos-dist;
	}
	if(ypos<final_y){
		dist=Math.ceil((final_y-ypos)/10);
		ypos=ypos+dist;
	}
	if(ypos>final_y){
		dist=Math.ceil((ypos-final_y)/10);
		ypos=ypos-dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
//	movement=setTimeout(repeat,interval);
//	将movement作为elem的属性，当其存在时，使用clearTimeout函数
	elem.movement=setTimeout(repeat,interval);
}
addLoadEvent(prepareSlideshow);