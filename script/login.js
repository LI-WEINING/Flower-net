// 点击切换登入模式------------------------------------------
!(function(){
    $('.user-log').click(function(){
        $('.login-wx').removeClass("fo-active");
        $('.login-zh').addClass("fo-active");
        $('.weixin-log').removeClass("active-log");
        $('.user-log').addClass("active-log");
    });
    $('.weixin-log').click(function(){
        $('.login-wx').addClass("fo-active");
        $('.login-zh').removeClass("fo-active");
        $('.weixin-log').addClass("active-log");
        $('.user-log').removeClass("active-log");
    })
})();



// 判断是有否保存密码-------------------------------------------
if(getCookie('username')){
    $("#username").val(getCookie('username'));
}
if(getCookie('password')){
    $("#password").val(getCookie('password'));
    $('#rememberme').prop('checked',true);
}

// 实现网页登入成功跳转首页---------------------------------------
$(".gogogo").click(function(){
    $.ajax({
        type:"get",
        url:"../other/login.php",
        dataType:'json',
        data:{
            "name":$("#username").val(),
            "password":$("#password").val()
        },
        success:function (json){
            alert(json.msg);
            delCookie('username');
            delCookie('password');
            if(json.err === 1){
                if($('#rememberme').prop('checked')){
                    setCookie({
                        key: 'username',
                        val: $("#username").val(),
                        days:7
                    })
                    localStorage.setItem('user',$("#username").val());
                    setCookie({
                        key: 'password',
                        val: $("#password").val(),
                        days:7
                    })
                }else{
                    setCookie({
                        key: 'username',
                        val: $("#username").val(),
                        days:1
                    })
                    localStorage.setItem('user',$("#username").val());
                    delCookie('password');
                }
                $(location).attr('href', './index.html');
            }
        },
        error:function (){
            alert('数据库请求失败');
        }
    });
})
