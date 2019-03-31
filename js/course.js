/*
 *课件
 */
var hasNextpage, hasPrevpage; //用于判断是否有上下页
var pagenum = 1;//当前页数

//毫秒数转化为日期
Date.prototype.toLocaleString = function() {
   //return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() ;
        function addZero(num){
          if(num<10)
              return "0" + num;
          return num;
      }
      // 按自定义拼接格式返回
      return this.getFullYear() + "/" + addZero(this.getMonth() + 1) + "/" + addZero(this.getDate());

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
    var course_data = {
      'pageNum': number,
      'pageSize': 12,
      'param':{'userId':localStorage.getItem('userId')}
    }
    // 'startDate': prevday,'endDate': nowday
    console.log(JSON.stringify(course_data));
    $.ajax({
        crossDomain:true,
        xhrFields: {  withCredentials: true  },
        async:true,
        type:'post',
        url:'http://139.199.158.210:8010/getVideoInfoList',
        data:JSON.stringify(course_data),
        contentType:'application/json; charset=utf-8',
        dataType:'json',
        success:function(data){  
        // userCount = data.data.total;
        console.log(data);
        hasPrevpage = data.data.hasPreviousPage;
        hasNextpage = data.data.hasNextPage;
        //清空列表
        $('#userRow').empty();
        var $row='';
        //var Aniu = '<button type="button" class="layui-btn">'+'轮播图'+'</button>'
        for( var i=0; i < data.data.list.length; i++ ){
          var n = data.data.list[i];
					var dateobj = new Date(n.uploadTime);
					var submit_time = dateobj.toLocaleString();
          $row += '<tr>'
          +'<td>'+n.vedioId+'</td>'
          +'<td>'+n.title+'</td>'
          +'<td>'+n.userName+'</td>'
          +'<td>'+n.description+'</td>'
          +'<td>'+submit_time+'</td>'
          +'<td>'+n.cost+'</td>'
          +'<td>'+n.visit+'</td>'
          //+'<td>'+Aniu+'</td>'
        //   +'<td>'+
        // '<button class="layui-btn layui-btn-sm layui-btn-warm" name="add">'+"增加"+'</button>'+'</td>'
        //+'<td>'+
        //'<button class="layui-btn layui-btn-sm layui-btn-normal" name="revise">'+"轮播图"+'</button>'+
        // '<button class="layui-btn layui-btn-sm layui-btn-danger" name="delete">'+"删除"+'</button>'+
        //'</td>'
          // +'<td>'+'<button class="layui-btn" type="button" style="background-color: #5FB878;">'+"确认"+'</button>'+'</td>'
        	//+'<td>'+'<button type="button" class="checkpower">'+$bool+'</button>'
          +'</tr>';
          }
          // var $jump = '<div style="position: absolute; bottom: 0;">'+
          // '<button class="layui-btn layui-btn-primary layui-btn-sm" id="prev">'+'上一页'+'</button>'+
          // '<button class="layui-btn layui-btn-primary layui-btn-sm" id="next">'+'下一页'+'</button>'+
          // '</div>';
          $('#userRow').append($row);
          //$('.center').append($jump);
          },
          error:function(data){
              //苦瓜
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

  //上传课件
  layui.use('upload', function(){
    var $ = layui.jquery
    ,upload = layui.upload;
    
    //拖拽上传
    upload.render({
      elem: '#video'
      ,url: '/upload/'
      ,done: function(res){
        console.log(res)
      }
    });
    upload.render({
      elem: '#test5'
      ,url: '/upload/'
      ,accept: 'video' //视频
      ,done: function(res){
        console.log(res)
      }
    });
});

