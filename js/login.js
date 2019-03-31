$(function(){
	$(".login").keypress(function(){
		var keynum = event.keyCode? event.keyCode : event.which;
		if(13 == keynum){
			var username = document.getElementsByClassName('userName')[0];
			var password = document.getElementsByClassName('userPsd')[0];
			var Name = username.value;
			var Word = password.value;
			if(Name == undefined || Word == undefined){
				alert("错误！");
				return;
			}
			// var jsonData = {
			//     'name': userName,
			//     'password': passWord
			// // 	}
			// console.log(Name);
			// console.log(Word);
			//数据提交
			$.ajax({
				asyns: true,
				//dataType: 'json',
				type: 'get',
				url:'http://139.199.158.210:8010/loginByAccount?name='+Name+'&password='+Word,
				// data: jsonData,
				//xhrFields:{withCredentials:true},
				contentType:'application/json;charset=utf-8',
				success: function(data){
					console.log(data);
					localStorage.setItem("userId", data.data.id);
					if(data.msg == "账号或密码错误"){
						alert("账号或密码错误！请重新输入！");
						return;
					}
					if(data.data.role.name == 'manager'){
						//普通管理员页面
						window.location.href='common-controller.html';
					}
					else if(data.data.role.name == 'admin'){
						//超级管理员页面
						window.location.href='index.html';
					}
					},
				error: function(){
					alert('login wrong');
				}
			});
		}
	});
});


$('#btn').click(function(){
    
	var username = document.getElementsByClassName('userName')[0];
	var password = document.getElementsByClassName('userPsd')[0];
	var Name = username.value;
	var Word = password.value;
	// $.cookie('author_name', Name, {
	// 	expires: 7,
	// 	path: '/',
	// 	domain: '139.199.158.210',
	// 	secure: true
	// });
    if(Name == undefined || Word == undefined){
        alert("错误！");
        return;
    }
    // var jsonData = {
    //     'name': userName,
    //     'password': passWord
	// // 	}
	// console.log(Name);
	// console.log(Word);
	//数据提交
    $.ajax({
        asyns: true,
        type: 'get',
        //dataType: 'json',
		url:'http://139.199.158.210:8010/loginByAccount?name='+Name+'&password='+Word,
		// data: jsonData,
		//xhrFields:{withCredentials:true},
		contentType:'application/json;charset=utf-8',
		success: function(data){
			console.log(data);
			localStorage.setItem("userName", Name);
			localStorage.setItem("userId", data.data.id);
			if(data.msg == "账号或密码错误"){
				alert("账号或密码错误！请重新输入！");
				return;
			}
			if(data.data.role.name == 'manager'){
				//普通管理员页面
				window.location.href='common-controller.html';
			}
			else if(data.data.role.name == 'admin'){
				//超级管理员页面
				window.location.href='index.html';
			}
			},
		error: function(){
			alert('login wrong');
		}
    });
});
// function addName(){
// 	var cName = localStorage.getItem("author_name");
// 	alert(cName);
// 	$(".author_name").text(cName);
// }
// window.onload = addName();