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
（灵活版）
1、设置打算移动的元素id，目的地左位置，目的地右位置，停顿时间