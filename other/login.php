<?php
    header("Content-Type:text/html;charset=utf-8");
    header("Access-Control-Allow-Origin: *");
    $name = $_REQUEST['name'];
    $password = $_REQUEST['password'];
    $link=mysqli_connect('localhost','root','123456','flower');
    if(!$link){
        die('连接失败：'.mysqli_connect_error());
    }
    mysqli_set_charset($link,'utf-8');

    $login_sql = "select * from user where name='$name' and password='$password'"; //查询账号密码
    $login_res = mysqli_query($link, $login_sql);//执行语句，返回资源语句
    $login_arr = mysqli_fetch_all($login_res);//解析资源语句，返回数组
    if (count($login_arr) > 0) {
        echo '{"err":1,"msg":"登录成功"}';
    } else {
        echo '{"err":0,"msg":"账号或密码错误"}';
    }

    // 关关闭连接
    mysqli_close($link);