// JavaScript Document
//确认网页加载完成后执行函数
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


function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if(parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}
//将只为gallery.js服务的图片与文字,与html分开.所以使用DOM方法来创建
function preparePlaceholder(){
//	检查方法
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
//	创建img元素节点,设置id属性为placeholder,设置src属性,设置alt属性.
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id" ,"placeholder");
	placeholder.setAttribute("src","images/Chrysanthemum.jpg");
	placeholder.setAttribute("alt","my image gallery");
//	创建p元素节点,设置id为description,创建文本节点,追加到P上
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var destext=document.createTextNode("Choose an image");
	description.appendChild(destext);
//	将img元素与p元素插入文档中
	var gallery=document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);
}

function prepareGallery(){
//	向后兼容,确认浏览器是否理解这些方法
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
//	遍历imagegallery元素中的所有连接
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
//	遍历元素,添加onclick事件函数,改变其行为,就不用在html中添加事件函数了
	for (var i=0;i<links.length;i++){
		links[i].onclick=function(){
//			this代表了此刻与onclick方法相关联的那个元素
			return showPic(this);
		}
//		键盘访问
		links[i].onKeypress=links[i].onclick;
	}
}

//负责:1.找出id为placeholder的图片并修改其src属性2.找出id为description的元素
//并修改其第一个子元素的nodeValue属性
function showPic(whichpic){
//	检查特定元素是否存在
	if(!document.getElementById("placeholder")) return false;
//	修改图片
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	
	if(!document.getElementById("description")) return false;
	if(whichpic.getAttribute("title")){
		var text=whichpic.getAttribute("title");
	}else{
		text="";
	}
	var description=document.getElementById("description");
//	文本节点的nodeType属性为3
	if(description.firstChild.nodeType==3){
		description.firstChild.nodeValue=text;
	}
	
	return false;
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);