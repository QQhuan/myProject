$(function(){
    function is_weixn(){
        var ua = navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i)=="micromessenger") {
            return true;
        } else {
            return false;
        }
    }
    if(is_weixn()){
        layui.use('layer', function(){ 
            var $ = layui.jquery, layer = layui.layer; 
            var active = {
            confirmTrans: function(){
                layer.msg('请点击右上角按钮，选择在浏览器中打开，安装软件', {
                time: 3000, //3s后自动关闭
                });
            }
            };
            layer.ready(function(){
            var othis = $(this);
            active['confirmTrans'] ? active['confirmTrans'].call(this, othis) : '';
            });
            });
            return;
    }
    $(".layui-btn-normal").click(function (e) { 
        //alert("click!");
        window.location.href="https://madongyu.ml/download/test.apk";
    });
    $(".layui-btn-warm").click(function (e) { 
        //alert("click2!");
        window.location.href="https://madongyu.ml/download/test.apk";
    });
});

    
    