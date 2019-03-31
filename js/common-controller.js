
//数据总数
var hasNextpage, hasPrevpage; //用于判断是否有上下页

var pagenum = 1;
function load(number){
  var userdata = {
    'pageNum': number,
    'pageSize': 12,
    'param':{'roleName':'normal'}
  }
  $.ajax({
		crossDomain:true,
		xhrFields: {  withCredentials: true  },
		async:true,
		type:'post',
		url:'http://139.199.158.210:8010/getUserList',
		data:JSON.stringify(userdata),
		contentType:'application/json; charset=utf-8',
		dataType:'json',
		success:function(data){
      // userCount = data.data.total;
      // console.log(JSON.stringify(userdata));
      // console.log(data.data);
      hasPrevpage = data.data.hasPreviousPage;
      hasNextpage = data.data.hasNextPage;

      //清空列表
      $('#userRow').empty();
      var $row='';
      for( var i=0, rownum = data.data.list.length; i < data.data.list.length; i++ ){
				var n = data.data.list[i];
        // console.log(n); 
        $row += '<tr>'
        +'<td>'+n.id+'</td>'
        +'<td>'+n.info.phone+'</td>'
        +'<td>'+n.info.idCard+'</td>'
        +'<td>'+n.info.weixinId+'</td>'
        +'<td>'+n.name+'</td>'
        +'<td>'+n.unitName+'</td>'
        +'<td>'+n.info.sectionName+'</td>'
        +'<td>'+n.info.job+'</td>'
        +'<td>'+n.info.email+'</td>'
        +'<td>'+n.info.sex+'</td>'
        +'<td>'+n.info.address+'</td>'
        +'<td>'+
        '<button class="layui-btn layui-btn-sm layui-btn-warm" name="add">'+"增加"+'</button>'+
        '<button class="layui-btn layui-btn-sm layui-btn-normal" name="revise">'+"修改"+'</button>'+
        '<button class="layui-btn layui-btn-sm layui-btn-danger" name="delete">'+"删除"+'</button>'+
        '</td>'
        +'</tr>';
        }
        $('#userRow').append($row);
		},
		error:function(data){
			alert("shenqing");
		}
	});
}
window.onload = load(pagenum);

//翻页
$(function(){
  $("#prev").click(function(){
    if(hasPrevpage){
      pagenum--;
      load(pagenum);
    }
    else{
      alert("没有上一页");
    }
  });
  $("#next").click(function(){
    if(hasNextpage){
      pagenum++;
      load(pagenum);
    }
    else{
      alert("没有下一页");
    }
  });
});

//角色设置
$(function(){
  $("#storge").click(function(){
    var userId1 = document.getElementsByClassName('set-userName')[0];
    var Id = userId1.value;
    var role;
    if($("#r1").is(":checked")){
      role = "normal";
    }else{
      role = "manager";
    }
    if(Id == undefined){
        alert("错误！");
        return;
    }
    var setdata = {
      'userId': Id,
      'roleName': role
    }
    // console.log(JSON.stringify(setdata));
    $.ajax({
        crossDomain:true,
        xhrFields: {  withCredentials: true  },
        async:true,
        type:'get',
        url:'http://139.199.158.210:8010/updateRole?userId='+Id+'&roleName='+role,
        // data:JSON.stringify(setdata),
        contentType:'application/json; charset=utf-8',
        dataType:'json',
        success: function(data){
        // console.log(data);
        alert("success!");
        },
        error: function(){
        //暂时没有处理
        }
    });
  });
});

//iframe页面局部刷新
$(function(){
  $(".jumping").click(function(){
    // alert("我先");
    var jump_link = $(this).attr("href");
    $("#myiframe").attr("src", jump_link);
  });
});

