$(function(){	
	
	$.ajax({
		"url": "http://47.93.220.17/Home/Bk/xinfang",
		"type": "get",
		"dataType": "json",
		success: function(res){
			if(res.error_code == 0){
				//房子信息
				var p = res.data.house_info;
				var pageTop = "";
				var norpagetype="";
				pageTop += "<div class='pagetitle'><h3>贝壳新房</h3></div><div class='title'><h6>"+p.title+"</h6><i class='i_a'>商铺</i><i class='i_b'>在售</i></div><div class='anothername'><p>"+p.seTitle+"</p></div><div class='house_img'><img src='./image/d.png'></div><div class='house_info'><ul class='clearfix'><li><div><h6>售价</h6><p>"+p.price+"</p></div><div class='ul_boder'></div></li><li><div><h6>房型</h6><p>"+p.type+"</p></div><div class='ul_boder'></div></li><li><h6>建筑面积</h6><p>"+p.area+"</p></li></ul><p class='clearfix'>开盘时间：<i>"+p.open_time+"</i><span>></span></p><p class='clearfix'>地址：<i>"+p.address+"</i><span>></span></p></div><div class='house_disc clearfix'><img src='./image/Coupon_icon@2x.png'><p>全款9.8折，贷款9.9折</p><div>领优惠</div></div><div class='house_more'><p>更多房源信息</p></div>"
				$(".top").html(pageTop);

				//户型切换
				var t = res.data.typs_conditions;
				var pagetype = "";
				for(x=0; x<t.length; x++){
					//当x=0，即当前默认户型
					if(x == 0){
						pagetype += "<li class='selected'>"+t[x].name+"</li>";
					}else{
						//其他的
						norpagetype += "<li>"+t[x].name+"</li>";
					}
					
				}
				//显示当前默认的户型
				$(".type_all").append(pagetype);
				//显示其余的
				$(".type_all").append(norpagetype);

				//评论
				var pageComment = "";
				var c = res.data.comments.comment;
				for(i=0; i<c.length; i++){	
					var tagStr="";
					var d=res.data.comments.comment[i].user_score;
					for(j=0; j<d.length; j++){
						tagStr +="<i>"+d[j].name+""+d[j].score+"</i>";
					}
					pageComment += "<div class='comment_A'><div class='person_a'><img src="+c[i].user_image+" class='person_img'><div class='person_name'><h6>"+c[i].user_name+"</h6><img src='./image/Star_big_act@2x.png'><img src='./image/Star_big_act@2x.png'><img src='./image/Star_big_act@2x.png'><img src='./image/Star_big_act@2x.png'><img src='./image/Star_big_nor@2x.png'>"+tagStr+"</div></div><div class='comment_content'><p>"+c[i].user_comment+"</p><i>全文</i><i>"+c[i].create_time+"</i></div></div>";
						
				}
				$(".comments").html(pageComment);

				//问大家
				var q = res.data.questions;
				var pageQuestion = "";
				for(m=0; m<q.length; m++){
					pageQuestion += "<div class='question_content'><img src='./image/ask@2x.png'><div><h6>"+q[m].question+"</h6><p>"+q[m].attention_num+"人关注 | "+q[m].answer_num+"个回答</p></div></div>";
				}
				$(".question_all").html(pageQuestion);
				
				//周边推荐
				var r = res.data.hotlists;
				var pageRecommend = "";
				for (n=0; n<r.length; n++) {
					pageRecommend += "<div class='recommend_a'><img src='"+r[n].image+"'><h6>"+r[n].title+"</h6><i>住宅</i><p>"+r[n].address+"</p><strong>均价"+r[n].uprice+"元/平 </strong></div>";
				}
				$(".recommend_all").html(pageRecommend);

			}else{
				alert(res.message);
			}
		},
		error: function(res){
			alert("网络错误");
			
		}
	});
	//调用房子信息的接口，先渲染数据
	$.ajax({
		"url": "http://47.93.220.17/Home/Bk/getListsByType",
		"type": "get",
		"dataType": "json",
		success: function(res){
			if (res.error_code == 0) {
				var houseInfo = "";
				var h = res.data.house_lists;
				for(var i=0;i<h.length;i++){
					for(var j=0; j<h[i].tabs.length; j++){
						var tabs="";
						tabs += "<i class='house_detail_info_c'>"+h[i].tabs[j]+"</i>"
					}
					houseInfo += "<div class='house_detail_all'><div class='house_detail'><img src='"+h[i].image+"'><div class='house_detail_info'><h6>"+h[i].title+"</h6><i class='house_detail_info_a'>在售</i><i class='house_detail_info_b'>热门</i><p>建面191㎡/南北向</p>"+tabs+"<strong>约"+h[i].price+"万一套</strong></div></div></div>";
				}
				$(".houese_info").html(houseInfo);
			}else{
				alert(res.message);
			}
		},
		error: function(res){
			alert("网络错误");
		}
	});

	//房子信息。点击户型，调用接口改变房子信息，
	$("body").on("click",".type_all li",function(){
		//改变户型被选择的样式
		$(this).addClass("selected").siblings().removeClass("selected");
		$.ajax({
			"url": "http://47.93.220.17/Home/Bk/getListsByType",
			"type": "get",
			"dataType": "json",
			"data": {
				//向后端传type_id值，当前户型索引值＋1
				 "type_id": $(this).index()+1,
			},
			success: function(res){
				if (res.error_code == 0) {
					var houseInfo = "";
					var h = res.data.house_lists;
					for(var i=0;i<h.length;i++){
						for(var j=0; j<h[i].tabs.length; j++){
							var tabs="";
							tabs += "<i class='house_detail_info_c'>"+h[i].tabs[j]+"</i>"
						}
						houseInfo += "<div class='house_detail_all'><div class='house_detail'><img src='"+h[i].image+"'><div class='house_detail_info'><h6>"+h[i].title+"</h6><i class='house_detail_info_a'>在售</i><i class='house_detail_info_b'>热门</i><p>建面191㎡/南北向</p>"+tabs+"<strong>约"+h[i].price+"万一套</strong></div></div></div>";
					}
					$(".houese_info").html(houseInfo);
				}else{
					alert(res.message);
				}
			},
			error: function(res){
				alert("网络错误");
			}
		});
			
	});
})