//通知模块
Date.prototype.toLocaleString = function() {
	 return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() ;
};
function load_inform(){
	$('#inform').empty();
	$.ajax({
	asyns: true,
	dataType: 'json',
	type: 'get',
	url:'http://139.199.158.210:8010/getInformList',
	// data: jsonData,
	//xhrFields:{withCredentials:true},
	contentType:'application/json;charset=utf-8',
	success: function(data){
		console.log(data)
		$('#inform').empty();
			var $row='';
      for( var i=0; i < data.data.length && i < 10; i++ ){
			var n = data.data[i];
			var dateobj = new Date(n.date);
			var time = dateobj.toLocaleString(); 
				$row += '<div class="line">'
				+'<dl>'+"序号："
				+'<dt>'+n.id+'</dt>'
				+'<dd>'+"作者："+n.author+'</dd>'
				+'<dd>'+"发布日期："+time+'</dd>'
				+'<dd>'+"通知内容："+'<p style="width: 50%; text-indent: 2em; word-break: break-all;word-wrap: break-word;">'+n.content+'</p>'+'</dd>'
				+'<br/>'
				+'<a style="color: blue;" class="informdelete">'+"删除"+'</a>'
				+'<br/>'+'<hr style="color=grey;"/>'
				+'</dl>'
				+'</div>';
        }
        $('#inform').append($row);
		},
	error: function(){
		alert('login wrong');
	}
	});
}
window.onload = load_inform();
$(document).on('click', '.informdelete', function() { 
	var deleteid = $(this).parent().children("dt")[0].innerText;
	// console.log(deleteid);
	$.ajax({
		asyns: true,
		dataType: 'json',
		type: 'get',
		url:'http://139.199.158.210:8010/removeInform?id='+deleteid,
		contentType:'application/json;charset=utf-8',
		success: function(data){
			load_inform();
			},
		error: function(){
			alert('wrong');
		}
		});
});


//发布通知
layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;
});
// $(function(){
// 	$("#reset").click(function(){
// 		$("#text-content").empty();
// 	});
// });
  //监听提交
$(function(){
	$("#submit-btn").click(function(){
		$.ajax({
			asyns: true,
			dataType: 'json',
			type: 'get',
			url:'http://139.199.158.210:8010/getInformList',
			// data: jsonData,
			//xhrFields:{withCredentials:true},
			contentType:'application/json;charset=utf-8',
			success: function(data){
				console.log(data)
				localStorage['informNum'] = data.data.length;
				},
			error: function(){
				alert('wrong');
			}
		});
		console.log(localStorage.informNum)
		if(localStorage.informNum >= 10){
			alert("通知数量太多啦！请先删除再发新通知！");
			return;
		}
		var $content = $("#text-content").val();
		// console.log($content);
		var author = localStorage.getItem('author_name');
		// console.log(author);
		var textdata = {
			'author': author,
			'content': $content
		}
		$.ajax({
			crossDomain:true,
			xhrFields: {  withCredentials: true  },
			async:true,
			type:'post',
			url:'http://139.199.158.210:8010/createInform',
			data:JSON.stringify(textdata),
			contentType:'application/json; charset=utf-8',
			dataType:'json',
			success:function(data){
				alert("success!");
			},
			error:function(data){
				alert("wrong");
			}
		});
	});
});

//清空文本内容
$("#reset").click(function(){
	$("#text-content").val("");
});