// 验证输入是否合法-------------------------------------------------------------
!(function(){
    // 判断条件是否都输入成功
    var flag1=0,flag2=0,count=2;

    // 用户名验证
    $("#username").focus(function(){
        $(".user-tips").text("请输入2到16位（中文，字母，数字，下划线）");
    });
    $("#username").blur(function(){
        var user_val = $("#username").val();
        if(/^[\u4e00-\u9fff\w]{2,16}$/.test(user_val)){
            $(".user-tips").text("输入成功");
            flag1 = 1;
        }else if(!$("#username").val()){
            $(".user-tips").text("请输入用户名称");
        }else{
            $(".user-tips").text("您的输入有误");
        }
    });

    // 密码验证
    $('#password').keyup(function() {
        var chinese = new RegExp("[\\u4E00-\\u9FFF]+","g");
        if(/\s/.test($('#password').val())){
            $('.pass-tips').text('输入不能含有空格');
            flag2=0;
        }else if(chinese.test($('#password').val())){
            $('.pass-tips').text('输入不能含有中文');
            flag2=0;
        }else{
            // 密码强求判断
            var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
            var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
            var enoughRegex = new RegExp("(?=.{6,}).*", "g");
            if (false == enoughRegex.test($('#password').val())) {
            $('.pass-tips').text('请输入大于6位数的密码');
            }else if($("#username").val() == $("#password").val()){
                $('.pass-tips').text('密码不能与账号相同');
                flag2=0;
            }else if (strongRegex.test($('#password').val())) {
                $('.pass-tips').text('强');
                flag2=1;
            }else if (mediumRegex.test($('#password').val())) {
                $('.pass-tips').text('中');
                flag2=1;
            }else {
                $('.pass-tips').text('弱');
                flag2=1;
            }
        }
    });

    // 点击注册
    $(".gogogo").click(function(){
        if(count == flag1 + flag2){
            $.ajax({
                type:"get",
                url:"../other/register.php",
                dataType:'json',
                data:{
                    "name":$("#username").val(),
                    "password":$("#password").val()
                },
                success:function (json){
                    console.log(json);
                    alert(json.msg);
                    if(json.msg === "注册成功"){
                        $(location).attr('href', './login.html');
                    }
                },
                error:function (){
                    alert('数据库请求失败');
                }
            });
        }else{
            alert("您的输入有误,请重新输入");
            $("#username").val("");
            $("#password").val("");
        }
    })

})();
