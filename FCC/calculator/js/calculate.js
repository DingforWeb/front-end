var ans="0";
var calc="0";
$(document).ready(function(){
	
	var $result=$("#result"),
		$caling=$("#caling");
	$("button").click(function(){
		var text=$(this).attr("value");
		
		if(text=="clear"){
			calc="0";
			ans="0";
		}else if(text=="back"){
			calc=calc.slice(0,-1);
		}else if(text=="="){
			ans=eval(calc);
		}else{
			calc += text;
		}
		
		$caling.val(calc);
		$result.html(ans);
	});
});