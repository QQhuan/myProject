/*
*支出列表
*/
var hasNextpage, hasPrevpage; //用于判断是否有上下页
var pagenum = 1;//当前页数

//毫秒数转化为日期
Date.prototype.toLocaleString = function() {
	 return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() ;
};
function addzero(p){
	return p > 10? p : '0'+p;
}

function load(number){
    var mydate = new Date();
    var year = mydate.getFullYear(),
    month = mydate.getMonth()+1,
    day = mydate.getDate();
		month = addzero(month);
		day = addzero(day);
		var nowday = year+'-'+month+'-'+day,
		prevday = year+'-'+month+'-'+'01';
    var outputdata = {
      'pageNum': number,
      'pageSize': 12,
      'param':{'lower': prevday,'upper': nowday}
    }
    console.log(JSON.stringify(outputdata));
    $.ajax({
          crossDomain:true,
          xhrFields: {  withCredentials: true  },
          async:true,
          type:'post',
          url:'http://139.199.158.210:8010/getExpenditureList',
          data:JSON.stringify(outputdata),
          contentType:'application/json; charset=utf-8',
          dataType:'json',
          success:function(data){
        // userCount = data.data.total;
				// console.log(userdata);
        hasPrevpage = data.data.hasPreviousPage;
        hasNextpage = data.data.hasNextPage;
        //清空列表
        $('#userRow').empty();
        var $row='', fee_total = 0;
        for( var i=0, rownum = data.data.list.length; i < data.data.list.length; i++ ){
					var n = data.data.list[i];
					fee_total += n.fee;
          var $bool = '';
          middle = n.isReview;
          if(middle == "n"){
            $bool = "未通过";
          }
          else{
            $bool = "已通过";
					}
					var dateobj = new Date(n.date);
					var submit_time = dateobj.toLocaleString();
          $row += '<tr>'
          +'<td>'+n.id+'</td>'
          +'<td>'+n.name+'</td>'
          +'<td>'+n.nickName+'</td>'
          +'<td>'+n.weixinId+'</td>'
          +'<td>'+n.fee+'</td>'
          +'<td>'+n.type+'</td>'
          +'<td>'+n.cardType+'</td>'
          +'<td>'+n.cardId+'</td>'
          +'<td>'+n.author+'</td>'
					+'<td>'+submit_time+'</td>'
					+'<td>'+$bool+'</td>'
          +'<td>'+n.fee+'</td>'
          // +'<td>'+'<button type="button" class="layui-btn layui-btn-sm layui-btn-primary layui-btn-radius" name="change">'+$bool+'</button>'
          +'<td>'+
          // '<button class="layui-btn layui-btn-sm layui-btn-warm" name="add">'+"增加"+'</button>'+
          '<button class="layui-btn layui-btn-sm layui-btn-normal" name="revise">'+"修改"+'</button>'+
          '<button class="layui-btn layui-btn-sm layui-btn-danger" name="delete">'+"删除"+'</button>'+
          '</td>'
        	// +'<td>'+'<button type="button" class="layui-btn">'+"删除"+'</button>'
          +'</tr>';
					}
					$row += '<tr>'
          +'<td>'+'</td>'
          +'<td>'+'</td>'
          +'<td>'+'</td>'
          +'<td>'+'</td>'
          +'<td>'+'</td>'
          +'<td>'+'</td>'
          +'<td>'+'</td>'
          +'<td>'+'</td>'
          +'<td>'+'</td>'
					+'<td>'+'</td>'
					+'<td>'+"小计"+'</td>'
					+'<td>'+fee_total+'</td>'
          +'</tr>';
          $('#userRow').append($row);
          },
          error:function(data){
              alert("hahahha");
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

//删除操作
$(function(){
  $(document).on('click', '.layui-btn-danger', function(){
        var review_id = $(this).parent().parent().find("td:first").html();
        console.log(review_id);
        $.ajax({
          crossDomain:true,
          xhrFields: {  withCredentials: true  },
          async:true,
          type:'get',
          url:'http://139.199.158.210:8010/removeExpenditure?id='+review_id,
          contentType:'application/json; charset=utf-8',
          dataType:'json',
          success:function(data){
         console.log(data);
         // alert("successful");
            load(pagenum);
          },
          error:function(data){
            alert("hahahha");
          }
        });
    });
});
    
  
/*
*提交支出
*/
 var confirm_data;
$("#output_submit").click(function(){
  var author = localStorage.getItem('author_name');
  var outdata = document.getElementsByClassName("layui-input");
  var oname = $("#oname").val()
  , onname = $("#onname").val()
  , oweixinId = $("#oweixinId").val()
  , ocardtype = $("#ocardtype").val()
  , ocardid = $("#ocardid").val()
  , ofee = $("#ofee").val()
  , otype = $("#otype").val();
  var output_data = 
    [{
    'name': oname,
    'nickName': onname,
    'weixinId': oweixinId,
    'cardType': ocardtype,
    'cardId': ocardid,
    'author': author,
    'fee': ofee,
    'type': otype
    }]
  
  confirm_data = output_data;
  console.log(JSON.stringify(output_data));
  $.ajax({
    async: true,
    crossDomain: true,
    xhrFields: { withCredentials: true },
    dataType: 'json',
    type: 'post',
    url:'http://139.199.158.210:8010/insertExpenditure',
    data: JSON.stringify(output_data),
    contentType:'application/json; charset=utf-8',
    success: function(data){
      // alert(data);
      layui.use('layer', function(){ //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        
        //触发事件
      var active = {
        confirmTrans: function(){
          //配置一个透明的询问框
          layer.msg('提交成功', {
            time: 1000, //20s后自动关闭
            btn: ['明白了', '知道了', '哦']
          });
        }
      };
      layer.ready(function(){
        var othis = $(this);
        active['confirmTrans'] ? active['confirmTrans'].call(this, othis) : '';
      });
      
      });
    },
    error: function(){
      alert("wrong!");
    }
  });
});
layui.use(['form', 'layedit', 'laydate'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate;
  //监听提交
  form.on('submit(demo1)', function(data){
    layer.alert(JSON.stringify(confirm_data), {
      title: '数据'
    })
    return false;
  });
});

//修改
