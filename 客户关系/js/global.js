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
		}
	}
}

addLoadEvent(highlightPage);

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

function myForm(){
	var form=document.getElementById("myForm");
	form.submit();
}

addLoadEvent(check);
addLoadEvent(myForm);
