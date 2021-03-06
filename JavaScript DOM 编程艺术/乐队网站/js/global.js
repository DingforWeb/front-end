//文档加载完全方法
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
//使当前页的导航高亮显示，并在body中添加id属性
function highlightPage(){
//	检查方法与元素是否可用/存在
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers=document.getElementsByTagName("header");
	if(headers.length==0) return false;
	var navs=headers[0].getElementsByTagName("nav");
	if(navs==0) return false;
	//取得导航链接，并遍历循环
	var links=navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i=0;i<links.length;i++){
		//比较当前页url与此链接url
		linkurl=links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl)!=-1){
			//添加class属性
			links[i].setAttribute("class","here");
//			links[i].className="here";
			//向body中添加id属性
			var linktext=links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id",linktext);
		}
	}
}
addLoadEvent(highlightPage);

//幻灯片
function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	
	var elem=document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if(xpos==final_x&&ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		var dist=Math.ceil((final_x-xpos)/10);
		xpos=xpos+dist;
	}
	if(xpos>final_x){
		var dist=Math.ceil((xpos-final_x)/10);
		xpos=xpos-dist;
	}
	if(ypos<final_y){
		var dist=Math.ceil((final_y-ypos)/10);
		ypos=ypos+dist;
	}
	if(ypos>final_y){
		var dist=Math.ceil((ypos-final_y)/10);
		ypos=ypos-dist;
	}
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}

function prepareSlideshow(){
	if(!document.getElementsByName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	//将幻灯片放在intro文档之后
	var intro=document.getElementById("intro");
	var slideshow=document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var preview=document.createElement("img");
	preview.setAttribute("src","img/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	
	var frame=document.createElement("img");
	frame.setAttribute("src","img/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	//遍历intro中所有的链接，并根据链接移动preview元素
	var links=document.getElementsByTagName("a");
//	var links=intro.getElementsByTagName("a");
	var destination;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover=function(){
			destination=this.getAttribute("href");
			if(destination.indexOf("index.html")!=-1){
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html")!=-1){
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html")!=-1){
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("live.html")!=-1){
				moveElement("preview",-450,0,5);
			}
			if(destination.indexOf("contact.html")!=-1){
				moveElement("preview",-600,0,5);
			}
		}
	}
	
}
addLoadEvent(prepareSlideshow);

//内部导航
function showSection(id){
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id")!=id){
			sections[i].style.display="none";
		}else{
			sections[i].style.display="block";
		}
	}
}

function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	//遍历article中的nav链接
	var articles=document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs=articles[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var nav=navs[0];
	var links=nav.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
//		以#分隔字符串,得到#后的字符
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		//默认隐藏所有部分
		document.getElementById(sectionId).style.display="none";
		//destination为自定义属性，保存局部变量sectionid
		links[i].destination=sectionId;
		links[i].onclick=function(){
			showSection(this.destination);
			return false;
		}
	}
}
addLoadEvent(prepareInternalnav);

//图片库
function preparePlaceholder(){
//	检查方法
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
//	创建img元素节点,设置id属性为placeholder,设置src属性,设置alt属性.
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id" ,"placeholder");
	placeholder.setAttribute("src","img/placeholder.gif");
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

function stripeTables(){
	if(!document.getElementsByTagName) return false;
	var tables=document.getElementsByTagName("table");
	for(var i=0; i<tables.length ; i++){
		var odd=false;
		var rows=tables[i].getElementsByTagName("tr");
		for(var j=0 ; j<rows.length ; j++){
			if(odd==true){
				addClass(rows[j],"odd");
				odd=false;
			}else{
				odd=true;
			}
		}
	}
}

function highlightRows(){
	if(!document.getElementsByTagName) return false;
	var rows=document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].oldClassName=rows[i].className;
		rows[i].onmouseover=function(){
			addClassName(this,"highlight");
		}
		rows[i].onmouseout=function(){
			this.className=this.oldClassName;
		}
	}
}

function displayAbbreviations(){
	if(!document.getElementsByTagName||!document.createElement||!document.createTextNode) return false;
	var abbreviations=document.getElementsByTagName("abbr");
	if(abbreviations.length<1) return false;
	var defs=new Array();
	for(var i=0;i<abbreviations.length;i++){
		var current_abbr=abbreviations[i];
		if(current_abbr.childNodes.length<1) continue;
		var definition=current_abbr.getAttribute("title");
		var key=current_abbr.lastChild.nodeValue;
		defs[key]=definition;
	}
	var dlist=document.createElement("dl");
	for(key in defs){
		var definition=defs[key];
		var dtitle=document.createElement("dt");
		var dtitle_text=document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc=document.createElement("dd");
		var ddesc_text=document.createTextNode(definition);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if(dlist.childNodes.length<1) return false;
	var header=document.createElement("h3");
	var header_text=document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles=document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var container=articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
}

addLoadEvent(stripeTables);
addLoadEvent(highlightPage);
addLoadEvent(displayAbbreviations);

//使表单字段获得焦点 
function focusLables(){
	if(!document.getElementsByTagName) return false;
	var labels=document.getElementsByTagName("label");
	for(var i=0;i<labels.length;i++){
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick=function(){
			var id=this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element=document.getElementById(id);
			element.focus();
		}
	}
}
addLoadEvent(focusLables);

//placeholder的js表达法
function resetFields(whichform){
	if(Modernizr.input.placeholder) return false;
	//遍历表单中的每个元素
	for(var i=0;i<whichform.elements.length;i++){
		var element=whichform.elements[i];
		//若为提交按钮，跳过
		if(element.type=="submit") continue;
		var check=element.placeholder||element.getAttribute("placeholder");
		if(!check) continue;
		//设置焦点事件处理函数，若字段的值等于占位符的值，则将字段的值设为空
		element.onfocus=function(){
			var text=this.placeholder||this.getAttribute("placeholder");
			if(this.value==text){
				this.className='';
				this.value='';
			}
		}
		//设置失去焦点事件的处理函数，若字段的值为空，则添加占位符值
		element.onblur=function(){
			if(this.value=""){
				this.className='placeholder';
				this.value=this.placeholder||this.getAttribute("placeholder");
			}
		}
		element.onblur();
	}
}

function prepareForms(){
	for(var i=0; i<document.forms.length;i++){
		var thisform=document.forms[i];
		resetFields(thisform);
		thisform.onsubmit=function(){
			return validateForm(this);
		}
	}
}
addLoadEvent(prepareForms);

//验证表单
function validateForm(form){
	for(var i=o;i<whichform.elements.length;i++){
		var element=whichform.elements[i];
		if(element.required=="required"){
			if(!isFilled(element)){
				alert("请填写");
				return false;
			}
		}
		if(element.type=="email"){
			if(!isEmail(element)){
				alert("The"+element.name+"field must be a valid email address");
				return false;
			}
		}
	}
	return false;
}

function isFilled(field){
	if(field.value.replace("","").length==0) return false;
	var placeholder=field.placeholder||field.getAttribute("placeholder");
	return (field.value!=placeholder);
}
function isEmail(field){
	return (field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1);
}

//提交表单
function getHTTPObject(){
	if(typeof XMLHttpRequest=="undefined")
	XMLHttpRequest=function(){
		try{
			return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			catch(e){}
			return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			catch(e){}
			return new ActiveXObject("Msxml2.XMLHTTP");
			catch(e){}
			return false;
		}
		return new XMLHttpRequest();
	}
}
