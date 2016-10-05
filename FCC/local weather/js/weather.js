

$(function(){
	var apikey="a0d581c91a3f73c0d36d6b143e321802";
	
	//获得当地地址
	$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js',function(){
	   getWeather(remote_ip_info.city);
	});
	
	var $city=$("#city"),
		$num=$("#num"),
		$description=$("#des"),
		$wind=$("#wind"),
		$wr=$("#weather_range"),
		$time=$("#time"),
		$search=$("#search"),
		$button=$("#button"),
		$icon=$("#icon"),
		$forecast=$("#forecast"),
		$body=$("body"),
		$searchbar=$("#search"),
		$form=$("form");
	
	$form.submit(function(event){
		if($search.val()){
			getWeather($search.val());
		}
		event.preventDefault();
	})
	
	
	function getWeather(city){
		//将城市名换为编号
		var cityNum=$.ajax({
			dataType:"json",
			url:" http://apis.baidu.com/apistore/weatherservice/cityinfo",
			headers:{"apikey":apikey},
			data:{
				cityname:city
			}
		}).then(function(data){
			var cityID= data.retData.cityCode;
			showWeather(cityID);
		});
		
		function showWeather(cityID){
//			var todayWeather=$.ajax({
//				dataType:"json",
//				url:"http://apis.baidu.com/apistore/weatherservice/cityid",
//				headers : {"apikey":apikey},
//				data:{
//					cityid:cityID
//				}
//			});

			var weather=$.ajax({
				dataType:"json",
				url:" http://apis.baidu.com/apistore/weatherservice/recentweathers",
				headers : {"apikey":apikey},
				data:{
					cityid:cityID
				}
			});
			
//			//查询当日天气
//			todayWeather.done(function(data){
//				if(data.errMsg==="success"){
//					var result=data.retData;
//					$city.html(result.city);
//					$num.html(result.temp+"&deg;");
//					$description.html(result.weather);
//					$wr.html(result.l_tmp+"&deg;  ~  "+result.h_tmp+"&deg;");
//					$wind.html(result.WD+" "+result.WS);
//					$time.html("更新时间 "+result.date+" "+result.time);
//					$icon.attr("src",setImg(result.weather));
//					setBackground(result.weather);
//				}else{
//					$city.html("查询出错！");
//					$(".group").display="none";
//					$(".forecast").display="none";
//				}
//			});
			
			//查询天气预报
			weather.done(function(data){
				if(data.errMsg==="success"){
					var result=data.retData;
					$city.html(result.city);
					$num.html(result.today.curTemp+"&deg;");
					$description.html(result.today.type);
					$wr.html(result.today.lowtemp+"&deg;  ~  "+result.today.hightemp+"&deg;");
					$wind.html(result.today.fengxiang+" "+result.today.fengli);
					$time.html("更新时间 "+result.today.date);
					$icon.attr("src",setImg(result.today.type));
					setBackground(result.today.type);
					var forecast=data.retData.forecast;
					console.log(forecast[1].date);
					var str='<h2 class="fore">天气预报</h2>';
					for(var i=0;i<3;i++){
						str+='<div class="feature"><p>'+forecast[i].date+
							'</p><img src="'+setImg(forecast[i].type)+'" /><p>'+
							forecast[i].lowtemp+"&deg;~"+forecast[i].hightemp+
							"&deg;  "+forecast[i].type+'</p></div>';
							
					}
					$forecast.html(str);
				}else{
					$city.html("查询出错");
					$(".group").display="none";
					$(".forecast").display="none";
				}
			});
		}
		
		
		
	}
	
	//天气图标
	function setImg(weather){
		var src="";
		if(weather.indexOf("晴")!=-1){
			src="img/icon/0.png";
		}else if(weather.indexOf("雨")!=-1){
			src="img/icon/10.png";
		}else if(weather.indexOf("云")!=-1){
			src="img/icon/4.png";
		}else if(weather.indexOf("风")!=-1){
			src="img/icon/32.png";
		}else if(weather.indexOf("雪")!=-1){
			src="img/icon/21.png"
		}else{
			src="img/icon/26.png";
		}
		return src;
	}
	//设置背景色
	function setBackground(str){
		if(str.indexOf("晴")!=-1){
			$body.animate({
				"background-color": "#EEAD0E",
		      }, 1000);
			$search.animate({
				"background-color": "#EEAD0E",
		      }, 1000);
	      	$button.animate({
				"background-color": "#EEAD0E",
	      	}, 1000);
		}else if(str.indexOf("雨")!=-1){
			$body.animate({
				"background-color": "#6495ED",
		      }, 1000);
			$search.animate({
				"background-color": "#6495ED",
		      }, 1000);
	     	$button.animate({
				"background-color": "#6495ED",
	      	}, 1000);
		}else if(str.indexOf("云")!=-1){
			$body.animate({
				"background-color": "#B4EEB4",
		      }, 1000);
			$search.animate({
				"background-color": "#B4EEB4",
		      }, 1000);
		    $button.animate({
				"background-color": "#B4EEB4",
	      	}, 1000);
		}else if(str.indexOf("风")!=-1){
			$body.animate({
				"background-color": "#00EE00",
		      }, 1000);
			$search.animate({
				"background-color": "#00EE00",
		      }, 1000);
		    $button.animate({
				"background-color": "#00EE00",
	      	}, 1000);
		}else if(str.indexOf("雪")!=-1){
			$body.animate({
				"background-color": "#27408B",
		      }, 1000);
			$search.animate({
				"background-color": "#27408B",
		      }, 1000);
		    $button.animate({
				"background-color": "#27408B",
	      	}, 1000);
		}else{
			$body.animate({
				"background-color": "#B23AEE",
		      }, 1000);
			$search.animate({
				"background-color": "#B23AEE",
		      }, 1000);
		    $button.animate({
				"background-color": "#B23AEE",
	      	}, 1000);
		}
	}
	
});
