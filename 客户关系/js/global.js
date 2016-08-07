function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!="function"){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}
//当前页导航高亮
function highlightPage(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var bodyid=document.getElementsByTagName("body");
	if(bodyid==0) return false;
	var nav=bodyid[0].getAttribute("id");
	var navs=document.getElementById("nav");
	if(navs==0) return false;
	var links=navs.getElementsByTagName("a");
	var linkurl;
	for(var i=0;i<links.length;i++){
		linkurl=links[i].getAttribute("href");
		if(linkurl.indexOf(nav)!=-1){
			links[i].className="here";
			links[i].parentNode.parentNode.style.display="block";
		}
	}
}

addLoadEvent(highlightPage);
//输入验证
function check(){
	var password = document.getElementById("password").value; 
	var repsword = document.getElementById("repsword").value; 
	if(password != repsword) {
		alert("两次密码不同，请重新输入");
		return false;
	} else {
	   return true;
	}
}
//提交表单
function myForm(){
	var form=document.getElementById("myForm");
	form.submit();
}


function change_home_img(){
	var img=document.getElementById("home_img");
	img.src="img/home1.png";
}

function return_home_page(){
	var img=document.getElementById("home_img");
	img.src="img/home.png";
}
//搜索
function show_search_text(){
	var text=document.getElementById("search_text");
	var search_all=document.getElementById("search_all");
	if(text.style.display == ""){
		text.style.display="inline-block";
	}else{
		search_all.submit();
	}
}

function preparenavshow(){
	var nav=document.getElementById("nav");
	var navs=nav.getElementsByClassName("fnav");
	for(var i=0;i<navs.length;i++){
		navs[i].onclick=function(){
			var sub_nav=this.parentNode.getElementsByTagName("ul");
			if(sub_nav[0].style.display==""){
				sub_nav[0].style.display="block";
			}else{
				sub_nav[0].style.display="";
			}
			return false;
		}
	}
}


addLoadEvent(preparenavshow);
