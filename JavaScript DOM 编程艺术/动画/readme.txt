position属性的合法值有：static fixed relative absolute.
当某个元素的position值为absolute时，我们可以将其摆放在容纳它的“容器”的任何位置，这个容器要么是文档本身，要么是
一个有着fixed或absolute属性的父元素。它的显示位置由top,left,right,bottom决定，与它在原始标记里出现的位置无关。

var variable=setTimeout("function",interval)能使函数function在经过interval时间后才开始执行。可以用clearTimeout(variable)来
取消“等待队列”里的某个函数。

动画逻辑：
（特定版）
1、获得当前元素位置
2、若元素已到目的地，则退出函数
3、若未到目的地，则将其向目的地移动一点
4、经过一段时间后重新回到步骤1

元素属性： element.property=value;
element.foo="bar"; 为element创建一个名为foo的属性，值为bar。

Math.ceil(number)返回大于浮点数最接近的整数
Math.floor(number)返回小于浮点数最接近的整数
Math.round(number)返回最接近浮点数的整数