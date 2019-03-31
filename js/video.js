window.onload = function(){ 
    // 加载上传flash -------------start 
    var swfobj = new SWFObject('http://union.bokecc.com/flash/api/uploader.swf', 'uploadswf', '500', '75', '8'); 
    swfobj.addVariable( "progress_interval" , 1); // 上传进度通知间隔时长（单位：s） 
    swfobj.addVariable( "notify_url" , "/ccsdk/notify.php"); // 上传视频后回调接口 
    swfobj.addParam('allowFullscreen','true'); 
    swfobj.addParam('allowScriptAccess','always'); 
    swfobj.addParam('wmode','transparent'); 
    swfobj.write('swfDiv'); 
    // 加载上传flash ------------- end 
}
//------------------- 
//调用者：flash 
//功能：选中上传文件，获取文件名函数 
//时间：2010-12-22 
//说明：用户可以加入相应逻辑 
//------------------- 
function on_spark_selected_file(file_name,file_size) { 
    document.getElementById('videoLoad').style.display = 'block'; 
    document.getElementById("videoFile").value = file_name; 
    document.getElementById("videotitle").innerText = file_name; 
    document.getElementById("videofileSize").innerText = bytesToSize(file_size); 
    submitVideo(); 
}
//-------------------
 //调用者：flash 
 //功能：验证上传是否正常进行函数
  //时间：2010-12-22 
  //说明：用户可以加入相应逻辑 
  //------------------- 
  function on_spark_upload_validated(status, videoid) { 
    if (status == "OK") { 
        document.getElementById("videoId").value = videoid; 
    }else if (status == "NETWORK_ERROR") { 
        alert("网络错误"); 
    }else{ 
        alert("api错误码：" + status); 
    }
}
//-------------------
 //调用者：flash 
 //功能：通知
  //时间：2010-12-22 上传进度函数
  //说明：用户可以加入相应逻辑 
  //-------------------
function on_spark_upload_progress(progress) { 
    var uploadProgress = document.getElementById("progressed");
    var uploadProgressTxt = document.querySelector(".progressTxt"); 
    if (progress == -1) { 
        uploadProgress.style.width = '0%'; 
        uploadProgressTxt.innerText = "上传出错"; 
        document.getElementById('swfDiv').style.display = 'none'; 
    } else { 
        uploadProgress.style.width = progress + '%';
        uploadProgressTxt.innerText = progress == 100 ? '上传完成' : "正在上传"; 
        if(progress == 100){ 
            document.getElementById('swfDiv').style.display = 'none'; 
        } 
    } 
}
function getAjax() { 
    var oHttpReq = null; 
    if (window.XMLHttpRequest) { 
        oHttpReq = new XMLHttpRequest; 
        if (oHttpReq.overrideMimeType) { 
            oHttpReq.overrideMimeType("text/xml");
        } 
    } else if (window.ActiveXObject) { 
        try { 
            oHttpReq = new ActiveXObject("Msxml2.XMLHTTP"); 
        }
        catch (e) { 
            oHttpReq = new ActiveXObject("Microsoft.XMLHTTP"); 
        } 
    } else if (window.createRequest) { 
        oHttpReq = window.createRequest(); 
    } else { 
        oHttpReq = new XMLHttpRequest();
    } 
    return oHttpReq; 
} 

//文件大小转换 
function bytesToSize(bytes) { 
    if (bytes === 0) return '0 B'; 
    var k = 1000, // or 1024 
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], 
    i = Math.floor(Math.log(bytes) / Math.log(k)); 
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]; 
}