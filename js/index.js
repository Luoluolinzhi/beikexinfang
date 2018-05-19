$(function(){	
	
	$.ajax({
		"url": "http://47.93.220.17/Home/Bk/xinfang",
		"type": "get",
		"dataType": "json",
		success: function(res){
			if(res.error_code == 0){
				//页面标题
				var pagetitle = "";
				pagetitle += "<h3>"+res.data.house_info.title+"</h3>";
				$(".pagetitle").html(pagetitle);

				//评论
				var pageComment = "";
				var c = res.data.comments.comment;
				for(i=0; i<c.length; i++){	
					var tagStr="";
					var d=res.data.comments.comment[i].user_score;
					for(j=0;j<d.length;j++){
						tagStr +="<i>"+d[j].name+""+d[j].score+"</i>";
					}
					pageComment += "<div class='comment_A'><div class='person_a'><img src="+c[i].user_image+" class='person_img'><div class='person_name'><h6>"+c[i].user_name+"</h6><img src='./image/Star_big_act@2x.png'><img src='./image/Star_big_act@2x.png'><img src='./image/Star_big_act@2x.png'><img src='./image/Star_big_act@2x.png'><img src='./image/Star_big_nor@2x.png'>"+tagStr+"</div></div><div class='comment_content'><p>"+c[i].user_comment+"</p><i>全文</i><i>"+c[i].create_time+"</i></div></div>"
						
				}
				$(".comments").html(pageComment);
			}else{
				alert(res.message);
			}
		},
		error: function(res){
			alert("网络错误");
			
		}
	});

})
