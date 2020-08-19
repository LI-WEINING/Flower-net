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

    $sql = "insert into user (name,password) values ('$name','$password')";

    // 执行修改sql语句
    $res = mysqli_query($link,$sql);


    // 给与提示
    if(!$res){
        echo '{"err":0,"msg":"注册失败"}';
        die();
    }
    echo '{"err":1,"msg":"注册成功"}';

    // 关关闭连接
    mysqli_close($link);



