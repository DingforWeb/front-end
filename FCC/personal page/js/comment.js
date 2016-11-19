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

addLoadEvent(run);

function doComment(){
	//创建实例
	var config = {
	syncURL: "https://commentding.wilddogio.com" //输入节点 URL
	};
	wilddog.initializeApp(config);
	var ref = wilddog.sync().ref();

	
	//写入数据
	var sendBtn=document.getElementById("c-send");
	var textInput=document.getElementById("c-text");
	var nameInput=document.getElementById("c-name");
	
	function sendComment(){
		var text=textInput.value;
		var name=nameInput.value;
		var currentTime=new Date();
		var cTime=(currentTime.getMonth()+1)+"."+currentTime.getDate();
		ref.push({
			content:text,
			writer:name,
			time:cTime
		}).then(function(){
			textInput.value="";
			nameInput.value="";
		});
		
	}
	
	sendBtn.addEventListener("click",function(){
		var cInfo=document.getElementById("c-info");
		if(textInput.value.length>23||nameInput.value.length>5){
			cInfo.textContent="字符数过多*";
//			textInput.value="";
//			nameInput.value="";
		}else if(!textInput.value){
			cInfo.textContent="请填写评论*";
		}else if(!nameInput.value){
			cInfo.textContent="请填写昵称*";
		}else{
			sendComment();
		}
	});
	
	//显示数据
	function showComment(content,writer,time){
		var cItem=document.createElement("div");
		cItem.className="c-item";
		var spanText=document.createElement("span");
		spanText.className="c-content";
		var spanName=document.createElement("span");
		spanName.className="c-writer";
		var cTime=document.createElement("small");
		
		cItem.appendChild(spanText);
		cItem.appendChild(spanName);
		
		cTime.textContent=time;
		spanText.textContent=content;
		spanName.textContent=writer;
		//防止small被覆盖
		spanName.appendChild(cTime);
		
		
		var cBox=document.getElementById("c-box");
		cBox.appendChild(cItem);
	}
	
	//监听数据
	ref.on("child_added",function(snap){
		var val=snap.val();
		showComment(val.content,val.writer,val.time);
	})

	
}
//监听结束后进行分页
function endComment(){
	var cItem=document.getElementsByClassName("c-item");
	var num=cItem.length;//评论总数
	if(!num){
		setTimeout(endComment,1000);
	}else{
		goPage(1);
	}
}

//分页
function goPage(pNum){
	var cItem=document.getElementsByClassName("c-item");
	var num=cItem.length;//评论总数
	var pageNum=6;//每页显示行数
	var totlePage=Math.ceil(num/pageNum);
	
	var nav=document.getElementById("pageNav");//翻页菜单
	var prev=document.getElementById("c-prev").parentNode;//上一页
	var next=document.getElementById("c-next").parentNode;//下一页
	
	if(nav.getElementsByClassName("disabled").length>0){
		var attr=nav.getElementsByClassName("disabled")[0].getAttribute("class");
		if(attr.length){
			attr=attr.replace(" disabled","");
			nav.getElementsByClassName("disabled")[0].setAttribute("class",attr);
		}
	}
	
	//判断页码,并添加disabled类
	if(pNum==1){
		var attrP=prev.getAttribute("class");
		attrP+=" disabled";
		prev.setAttribute("class",attrP);
	}else if(pNum==totlePage){
		var attrN=next.getAttribute("class");
		attrN+=" disabled";
		next.setAttribute("class",attrN);
	}
	//评论显示
	var startItem=(pNum-1)*pageNum;//要显示的评论的第一个
	var endItem=pNum*pageNum-1>num?num:pNum*pageNum-1;//结束显示的行
	
	for(var i=0;i<num;i++){
		if(i<startItem||i>endItem){
			cItem[i].style.display="none";
		}else{
			cItem[i].style.display="block";
		}
	}
	//改变当前页页码
	var currentPage=document.getElementById("c-current");
	currentPage.innerHTML=pNum;
	
}
//上一页
function prevPage(){
	var current=document.getElementById("c-current");//当前页
	current=parseInt(current.innerHTML);
	goPage(current-1);
	return false;
}
//下一页
function nextPage(){
	var current=document.getElementById("c-current");//当前页
	current=parseInt(current.innerHTML);
	goPage(current+1);
	return false;
}



function run(){
	doComment();
	endComment();
//	conPage();
	
}
//addLoadEvent(conPage);

