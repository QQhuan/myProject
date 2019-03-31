//页面加载完提示
layui.use('layer', function(){ //独立版的layer无需执行这一句
  var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
  
  //触发事件
var active = {
	confirmTrans: function(){
		//配置一个透明的询问框
		layer.msg('请先填写视频信息再上传视频哦', {
			time: 2000, //20s后自动关闭
			btn: ['明白了', '知道了', '哦']
		});
	}
};
layer.ready(function(){
	var othis = $(this);
	active['confirmTrans'] ? active['confirmTrans'].call(this, othis) : '';
});

});
// layui.use('layer', function(){
// 	var $ = layui.jquery, layer = layui.layer;
//   layer.ready(function(){
// 		layer.msg("请先填写视频信息再上传视频哦");
// 	});
// });              

function show(){
	var mydate = new Date();
	var str = "" + mydate.getFullYear() + "-";
	str += (mydate.getMonth()+1) + "-";
	str += mydate.getDate() + "-";
	return str;
}

//加载分类
loadCategory();
var $ccid, $ccintro, $ischecked, $cclabel, $ccfee, radioVal, $ccposition, $ccCate, $tag;
$(function(){
	$("select").bind("change", function(){
		if(this.value == "内科学")
			$tag = "内科学";
		else if(this.value == "外科学")
			$tag = "外科学";
		else if(this.value == "护理学")
			$tag = "护理学";
		else if(this.value == "儿科学")
			$tag = "儿科学";
		else if(this.value == "妇产科学")
			$tag = "妇产科学";
		else if(this.value == "急诊学")
			$tag = "急诊学";
		else if(this.value == "其他科学")	
			$tag = "其他科学";
	});
	$("#vintro").bind("blur", function(){
		$ccintro = $(this).val();
	});
	$("#vfee").bind("blur", function(){
		$ccfee = $(this).val();
		if($ccfee == 0)
			$ccfee = -1;
	});
	$("input:radio").each(function(){
		if(this.checked){
			$ischecked = $(this).val();
		}
	});
	$("#vlabel").bind("blur", function(){
		$cclabel = $(this).val();
	});
	$("#vPosition").bind("blur", function(){
		$ccposition = $(this).val();
	});
	$("#selectCategoryInput").bind("blur", function(){
		$ccCate = $(this).attr("title");
	});
});
$("#btnSubmit").click(function(){
	radioVal = $('input:radio[name="yn"]:checked').val();
});

var uploader = new CCH5Uploader(
		{
			timeout : 180000, // 设置超时处理时间 超时时间3分钟 超时会重试
			maxChunkSize : 1024 * 1024, // 1M 最大不超过4M
			limitConcurrentUploads : 3, //并发上传文件数
			createInfoRetries:5,//调用用户创建视频信息接口重试次数,默认为5次
			maxRetries : 10, // 文件上传失败重试次数,默认10次
			retryTimeout : 500, //重试延迟时间（毫秒）
			autoUpload : true, //是否添加文件后自动上传
			fileInput : $("#fileupload").find("input[type='file']"), //文件输入组件，必需要有的配置,可以是多个
			filesContainer : $('.files'), //上传文件记录显示的容器
			
			// 重写获取分类名的方法,没有分类时不需要配置或者返回null
			getCategoryName : function() {
				var hasCategory = $("#uploadCategory").length > 0;
				if (!hasCategory) {
					return null;
				}
				return $("#selectCategoryInput").attr("title");
			},
			
			//上传失败重试指定次数后依然失败后的回调
			uploadFail : function(recordNode, fileName, failMsg) {
				console.log(failMsg);
				if (recordNode.find('.rate').length > 0) {
					// 有暂停操作的示例
					recordNode.find('.rate').html('<div class="tc" style="margin-top:6px;color:red;">上传失败</div>');
					recordNode.find("#pause").click();
				} else {
					// 无暂停操作的示例
					recordNode.find('.start').parent().append('<span style="color:red;">上传失败</span>');
				}
				var videoID = localStorage.getItem("videoid");
				$.ajax({
					type: "post",
					asyns: true,
					data: JSON.stringify(videoID),
					url:  "http://139.199.158.210:8010/deleteVideoInfoById",
					dataType: json,
					contentType: "application/json;charset=UTF-8",
					success: function(data){
						console.log(data)
					},
					error: function(){
						alert("error!");
					}
				});
			},
			
			//上传成功回调
			uploadSuccess : function(recordNode, fileName, ccvid) {
				console.log(fileName + '上传成功');
				console.log("对应的视频id为：" + ccvid);
				console.log(recordNode);
				localStorage.setItem('$cccvid', ccvid);				
				//视频上传成功之后上传视频封面
				layui.use('layer', function(){ //独立版的layer无需执行这一句
					var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
					
					//触发事件
				var active = {
					setTop: function(){
						var that = this; 
						//多窗口模式，层叠置顶
						layer.open({
							type: 2 //iframe类型
							,title: '上传图片'
							,shade: 0
							,area: ['500px', '400px']
							,maxmin: true
							,offset: 'auto'
							,content: 'http://139.199.158.210:8010/html/updata-image.html'
						});
					}
				};
				layer.ready(function(){
					var othis = $(this);
					active['setTop'] ? active['setTop'].call(this, othis) : '';
				});
				
				});
				var p = {
					"videoId": localStorage.getItem("videoid"),
					"position": $ccposition,
					"category": $ccCate
				}
				$.ajax({
					url : "http://139.199.158.210:8010/setChosenVideo",
					async : true, //必须以同步的方式执行，否则后续操作拿不到接口返回的数据
					type : "post",
					data : JSON.stringify(p),
					cache : false,
					dataType : "json",
					contentType : "application/json;charset=UTF-8",
					error : function() {
						alert("error");
					},
					success : function(data) {
						console.log(p)
						console.log(data)
		    	}
				});

			},
			
			// 生成视频信息
			createuploadinfo: function(fileName, fileSize){
				var video = {};
				var NowTime = new Date();

				var $tag = localStorage.getItem("sname");
				var d = {
					"filename" : fileName,
					"filesize" : fileSize,
					"title" : fileName, 
					"userName" : localStorage.getItem('userName'),
					"userId": localStorage.getItem('userId'),
					"description" : $ccintro,
					"cost" : $ccfee,
					"tag" : $cclabel,
					"duration" : $ischecked,
					"uploadTime": NowTime,
					"categoryId" : $tag
				};
				var c = $("#uploadCategory").val();
				//默认分类时不传分类id参数
				if (!!c && c != 0) {
					d.categoryid = c;
				}
				$.ajax({
					url : "http://139.199.158.210:8010/createUploadInfo/",
					async : false, //必须以同步的方式执行，否则后续操作拿不到接口返回的数据
					type : "post",
					data : JSON.stringify(d),
					cache : false,
					dataType : "json",
					contentType : "application/json;charset=UTF-8",
					error : function() {
						video = {
							"errMsg" : "获取视频文件vid出错",
							"errorType" : "network"
						};
					},
					success : function(data) {
						console.log(d)
						console.log(data)
						if(data.errMsg){
							video.errMsg = "获取视频文件vid出错";
							return;
						}
						video.success = true;
						video.uid = data.uploadinfo.userid;
						video.ccvid = data.uploadinfo.videoid;
						video.servicetype = data.uploadinfo.servicetype;
						video.name = fileName;
						video.uri = data.uploadinfo.chunkurl;
						video.metauri = data.uploadinfo.metaurl;
						video.size = fileSize;
						localStorage.setItem("videoid", data.uploadinfo.videoid);
					}
				});
		        return video;
		    }
		});


/*******************************************************************************
 * 加载分类
 */
function loadCategory() {
	$.getJSON('http://139.199.158.210:8010/getCategory', function(data) {
		if (data.error) {
			errorMsgHandler('加载分类失败');
			return;
		}
		var categoryDatas = data.video.category;
		// 构造分类树
		var categoryTree = initCategoryTree({
			datas : categoryDatas,
			inputId : 'selectCategoryInput',
			outerBox : $("#selectCategoryInput").parent(),
			needEnsure : false,
			hasDefault : true,
			defaultName : '默认分类',
			defaultVal : $("#uploadCategory").val(),
			selectItem : function(categoryId, name, shortName) {
				$("#uploadCategory").val(categoryId);
			},
			setDeaultName : function(name, shortName) {
				$("#selectCategoryInput").val(shortName);
			}
		});
	});
}

window.onbeforeunload = function(e) {
	if ($('.progress.progress-striped.active.mb0.tc_rel').length) {
		return '视频上传中，离开页面将无法继续上传？';
	} else {
		if (!window.event) {
			return null;
		}
	}
};

function errorMsgHandler(msg) {
	alert(msg);
}
