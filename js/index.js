$(function(){	
	/*var	result= {
			"status" : true ,
	        "data":{
	        	"house_info":{
		            "title":"大运河孔雀城",
		            "seTitle":"大运河孔雀城温莎郡",
		            "images":[
		                {
		                    "id":1,
		                    "image_path":"https://image1.ljcdn.com/hdic-resblock/df800b5f-4430-4767-a5d4-4b07e547b988.jpg.1000x.jpg"
		                },
		                {
		                    "id":2,
		                    "image_path":"https://image1.ljcdn.com/hdic-resblock/c5715294-179e-40aa-938b-5f91ce5c1f48.jpg.1000x.jpg"
		                },
		                {
		                    "id":3,
		                    "image_path":"https://image1.ljcdn.com/hdic-resblock/ba1250ad-8d72-4633-8e1b-7e08e13dccc1.jpg.1000x.jpg"
		                }
		           	],
		            "price":"630",
		            "type":"2室1厅",
		            "area":"90.34",
		            "open_time":"预计五月开盘",
		            "address":"顺义新城第二十一街区",
		            "status":1
	       	 	},
		        "typs_conditions":[
		            {
		                "id":1,
		                "name":"四室"
		            },
		            {
		                "id":2,
		                "name":"三室"
		            },
		            {
		                "id":3,
		                "name":"二室"
		            }
		        ],
		        "comments":{
		            "tab_score":[
		                {
		                    "name":"周围配套",
		                    "score":3.6
		                },
		                {
		                    "name":"交通方便",
		                    "score":3.7
		                },
		                {
		                    "name":"交通方便",
		                    "score":4.2
		                }
		            ],
		            "comment":[
		                {
		                    "user_id":11,
		                    "user_name":"王晓易",
		                    "user_image":"https://image1.ljcdn.com/hdic-resblock/ba1250ad-8d72-4633-8e1b-7e08e13dccc1.jpg.1000x.jpg",
		                    "user_score":[
		                        {
		                            "name":"配套",
		                            "score":3
		                        },
		                        {
		                            "name":"交通",
		                            "score":3
		                        },
		                        {
		                            "name":"交通",
		                            "score":3
		                        }
		                    ],
		                    "user_comment":"离市区比较远，周边设施还在建设中，配套环境什么的也算还好，户型特别方正。平常逛街方便.......",
		                    "create_time":"2017年07月26日"
	               		 },
		                {
		                    "user_id":22,
		                    "user_name":"马大哈",
		                    "user_image":"https://image1.ljcdn.com/hdic-resblock/ba1250ad-8d72-4633-8e1b-7e08e13dccc1.jpg.1000x.jpg",
		                    "user_score":[
		                        {
		                            "name":"配套",
		                            "score":3.9
		                        },
		                        {
		                            "name":"交通",
		                            "score":3.9
		                        },
		                        {
		                            "name":"交通",
		                            "score":3.9
		                        }
		                    ],
		                    "user_comment":"离市区比较远，周边设施还在建设中，配套环境什么的也算还好，户型特别方正。平常逛街方便.......",
		                    "create_time":"2018年08月28日"
		                }
	            	]
	        	},
		        "questions":[
		            {
		                "id":200,
		                "question":"房子好看不？",
		                "attention_num":1982,
		                "answer_num":98
		            },
		            {
		                "id":201,
		                "question":"小区绿化多吗？",
		                "attention_num":1982,
		                "answer_num":98
		            },
		            {
		                "id":202,
		                "question":"窗户大不大？",
		                "attention_num":1982,
		                "answer_num":98
		            }
			    ],
		        "hotlists":[
		            {
		                "id":1,
		                "title":"西山甲一号山甲",
		                "image":"https://image1.ljcdn.com/hdic-resblock/ba1250ad-8d72-4633-8e1b-7e08e13dccc1.jpg.1000x.jpg",
		                "address":"朝阳 孙河板块",
		                "uprice":87152
		            },
		            {
		                "id":2,
		                "title":"霞公府",
		                "image":"https://image1.ljcdn.com/hdic-resblock/ba1250ad-8d72-4633-8e1b-7e08e13dccc1.jpg.1000x.jpg",
		                "address":"东城北京饭店",
		                "uprice":62317
		            }
		        ]
	        }
		}  */
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