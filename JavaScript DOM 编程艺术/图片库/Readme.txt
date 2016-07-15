
（一）共享onload事件
网页加载完毕时会触发onload事件，这个事件与window对象相关联。当一个函数必须在网页加载完后执行时，例如prepareGallery函数，可以使用：
window.onload=prepareGallery;
当有多个函数都在页面加载时得到执行，如：
window.onload=firstFunction;
window.onload=secondFunction;
secondFunction将取代firstFunction，每个事件处理函数只能绑定一条指令。
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
参数func：打算在页面加载完毕时执行的函数的名字
1.把现有的window.onload事件处理函数的指存入变量oldonload
2.如果在这个处理函数上还没有绑定任何函数，则将新函数添加给它
3.如果这个处理函数上已经绑定了一些函数，则将新函数追加到指令的末尾。

（二）平稳退化
当浏览器不支持javascript时，即使某些功能不能使用，但最基本的操作仍然可以运行。
慎用“javascript:”伪协议与#标记。

（三）结构与行为分离
文档的结构与行为应该分开，将onclick写入函数中，而不是html文件中
