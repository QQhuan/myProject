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
      'param':{'lower': prevday,'upper': nowday, 'isReview': 'n'},
    }
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
          +'<td>'+n.fee+'</td>'
          +'<td>'+'<button class="layui-btn" type="button" style="background-color: #5FB878;">'+"确认"+'</button>'+'</td>'
        	//+'<td>'+'<button type="button" class="checkpower">'+$bool+'</button>'
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
  $(function(){
    $(document).on('click', '.layui-btn', function(){
        var review_id = $(this).parent().parent().children("td")[0].innerText;
        $.ajax({
          crossDomain:true,
          xhrFields: {  withCredentials: true  },
          async:true,
          type:'get',
          url:'http://139.199.158.210:8010/reviewExpenditure?id='+review_id+'&isReview='+'y',
          // data:JSON.stringify(checkdata),
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