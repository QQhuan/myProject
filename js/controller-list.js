//数据总数
var hasNextpage, hasPrevpage; //用于判断是否有上下页
var pagenum = 1;
function load(number){
  var userdata = {
    'pageNum': number,
    'pageSize': 12,
    'param':{'roleName':'manager'}
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
      console.log(data)
      userCount = data.data.total;
      hasPrevpage = data.data.hasPreviousPage;
      hasNextpage = data.data.hasNextPage;
      //清空列表
      $('#userRow').empty();
      var $row='';
      for( var i=0, rownum = data.data.list.length; i < data.data.list.length; i++ ){
				var n = data.data.list[i];
        // console.log(n); 
        var $bool = '', 
        middle = n.role.permission;
        if(middle.length == 0 || middle[middle.length-1] == 0){
          $bool = "X";
        }
        else{
          $bool = "授权";
        }
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
        +'<td>'+'<button type="button" class="layui-btn layui-btn-sm layui-btn-primary layui-btn-radius" name="change">'+$bool+'</button>'
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
			alert("hahahha");
		}
	});
}
window.onload = load(pagenum);


//审核权限设置
$(function(){
  $(document).on('click', '.layui-btn-primary', function(){
    // alert("success!");
    // return;
    var textValues = $(this).text();
    // console.log(textValues);
    if(textValues == "授权"){
      $(this).text("X");
      // var trValue; = $(this).parent().parent();
      // console.log(trValue);
      // var review_ids = trValue.children("td")[0];
      var review_id = $(this).parent().parent().children("td")[0].innerText;
      var checkdata = {
        'userId': review_id,
        'permission': 'review',
        'addOrDel': 0
      }
      $.ajax({
        crossDomain:true,
        xhrFields: {  withCredentials: true  },
        async:true,
        type:'get',
        url:'http://139.199.158.210:8010/updatePermission?userId='+review_id+'&permission='+"review"+'&addOrDel=0',
        // data:JSON.stringify(checkdata),
        contentType:'application/json; charset=utf-8',
        dataType:'json',
        success:function(data){
          // console.log(data);
          // alert("successful");
          layui.use('layer', function(){ //独立版的layer无需执行这一句
            var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
            
            //触发事件
          var active = {
            confirmTrans: function(){
              //配置一个透明的询问框
              layer.msg('修改成功', {
                time: 1000, //1s后自动关闭
              });
            }
          };
          layer.ready(function(){
            var othis = $(this);
            active['confirmTrans'] ? active['confirmTrans'].call(this, othis) : '';
          });
          
          });
        },
        error:function(data){
          alert("wrong");
        }
      });
    }
    else{
      $(this).text("授权");
      // var trValue2 = $(this).parent();
      // console.log(trValue2);
      var review_id2 = $(this).parent().parent().children("td")[0].innerText;
      var checkdata2 = {
        'userId': review_id2,
        'permission': 'review',
        'addOrDel': 1
      }
      $.ajax({
        crossDomain:true,
        xhrFields: {  withCredentials: true  },
        async:true,
        type:'get',
        url:'http://139.199.158.210:8010/updatePermission?userId='+review_id2+'&permission='+"review"+'&addOrDel=1',
        // data:JSON.stringify(checkdata2),
        contentType:'application/json; charset=utf-8',
        dataType:'json',
        success:function(data){
          // console.log(data);
          layui.use('layer', function(){ //独立版的layer无需执行这一句
            var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
            
            //触发事件
          var active = {
            confirmTrans: function(){
              //配置一个透明的询问框
              layer.msg('修改成功', {
                time: 1000, //1s后自动关闭
              });
            }
          };
          layer.ready(function(){
            var othis = $(this);
            active['confirmTrans'] ? active['confirmTrans'].call(this, othis) : '';
          });
          
          });
        },
        error:function(data){
          alert("wrong");
        }
      });
    }
  });
});

//翻页
$(function(){
  $("#prev").click(function(){
    if(hasPrevpage){
      pagenum--;
      load(pagenum);
    }
    else{
      alert("没有上一页了！");
    }
  });
  $("#next").click(function(){
    if(hasNextpage){
      pagenum++;
      load(pagenum);
    }
    else{
      alert("没有下一页！");
    }
  });
});