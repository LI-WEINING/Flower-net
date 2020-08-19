// 判断是否登入--------------------------------------------------------------------
if (localStorage.getItem('user')) {
    var  newA = `<a href="#">欢迎您，${localStorage.getItem('user')}</a><a href="#" class="quit-user">退出</a>`;
    $('.login').html(newA);
  };
  
  // 退出判断-------------------------------------------------------------------------
  $('.quit-user').click(function(){
    localStorage.clear();
    $(location).attr('href', './index.html');
  });

// 获取点击的商品json数据------------------------------------------------------------
!(function(){
    var url = window.location.href;
    // 判断是否使用服务器，还是本地文件
    if(url.indexOf('file') == -1){
        var goodsCode= parseInt(url.split("?")[1].split("=")[1]);
    }
    var newImg="",newLi="",BigImg="",pre=0;
    $.ajax({
        type:'get',
        url:'../other/qixiactivity.json',
        dataType:"json",
        success:function(json){
            $.each(json,function(index,item){
                if(json[index].ItemCode == goodsCode){
                    // 不变的元素---------------------------
                    // 花语
                     $('.flanguage').text(item.Flanguage);
                    // 配送范围
                    $(".send").text(item.Send);
                    $('.select-box')[0].innerHTML=newLi;
                    // 商品代码：
                    $('.myId').text(item.ItemCode);
                    // 头部标题
                    $('title').text(item.Cpmc+":"+item.Materials+"_鲜花-中国鲜花礼品网");
                    
                    //  变的元素---------------------------
                    // 路径
                    $('.commodity-name').text(item.Cpmc[0]);
                    // 标题
                    $('.title-name').text(item.Cpmc[0]);
                    // 副标题
                    $('.title-desc').text(item.Instro[0]);
                    // 表意
                    $('.title-point').text(item.Property[0]);
                    // 现价：
                    $('.s-price').text(item.Price[0]);
                    $('.fixed-price span').text(item.Price[0]);
                    // 市场价：
                    $('.originalPrice').text(item.LinePrice[0]);
                    // 已销售数量
                    $('.sale-count span').text(item.Sales[0]);
                    // 材料
                    $('.materials').text(item.Materials[0]);
                    // 渲染大图
                    $('.max-picture').html('<img src="'+item.Bigimg[0]+'" alt="">');
                    // 渲染小图
                    $.each(item.Minimg[0],function(index,it){
                        newImg += `
                            <li>
                                <img src="${it}" alt="">
                            </li>
                            `;
                    });
                    $('.min-picture')[0].innerHTML = newImg;
                    // 详情图片渲染
                    $.each(item.detailsFigure[0],function(index,it){
                            BigImg += `<img src="${it}" alt="">`;
                    });
                    $(".detailsFigure")[0].innerHTML=BigImg;

                    // 动态变换-----------------------------------------------
                    // 规格选择
                    $.each(item.Select,function(index,it){
                        newLi+=`<li><img src="../image/${it.simg}" alt=""><span class="my-like">${it.stitle}</span><span class="icon-chosen"></span></li>`;
                    });
                    $('.select-box')[0].innerHTML=newLi;

                    // 默认选中第一个
                    $($('.select-box li')[0]).addClass("li-active");

                    // 点击切换样式
                    $.each($('.select-box li'),(j,ita)=>{
                        $($('.select-box li')[j]).on('click',()=>{
                            // 添加删除类名
                            $($('.select-box li')[pre])[0].className='';
                            $($('.select-box li')[j])[0].className="li-active";
                            pre = j;
                            //  变的元素---------------------------
                            // 路径
                            $('.commodity-name').text(item.Cpmc[j]);
                            // 标题
                            $('.title-name').text(item.Cpmc[j]);
                            // 副标题
                            $('.title-desc').text(item.Instro[j]);
                            // 表意
                            $('.title-point').text(item.Property[j]);
                            // 现价：
                            $('.s-price').text(item.Price[j]);
                            $('.fixed-price span').text(item.Price[j]);
                            // 市场价：
                            $('.originalPrice').text(item.LinePrice[j]);
                            // 已销售数量
                            $('.sale-count span').text(item.Sales[j]);
                            // 材料
                            $('.materials').text(item.Materials[j]);
                            // 渲染大图
                            $('.max-picture').html('<img src="'+item.Bigimg[j]+'" alt="">');
                            // 渲染小图
                            newImg='';
                            $.each(item.Minimg[j],function(n,itb){
                                newImg += `
                                    <li>
                                        <img src="${itb}" alt="">
                                    </li>
                                    `;
                            });
                            $('.min-picture')[0].innerHTML = newImg;
                            // 详情图片渲染
                            BigImg="";
                            $.each(item.detailsFigure[j],function(k,itc){
                                    BigImg += `<img src="${itc}" alt="">`;
                            });
                            $(".detailsFigure")[0].innerHTML=BigImg;
                        })
                    })
                };
            })
            
        },
        error:function(){
            alert('商品数据请求失败');
        }
    });
})();

// 移动鼠标切换图片------------------------------------------------------------------
!(function(){
    $(".min-picture").on("mouseenter","li img",function(){
        $('.max-picture').html("");
        $(this).clone(true).appendTo('.max-picture');
    });
})();

// 猜你喜欢------------------------------------------------------------------
!(function(){
    $.ajax({
      type:'get',
      url:'../other/qixiactivity.json',
      dataType:'json',
      success:function (json){
        for(var i = 0 , long= json.length; i < long; i++){
          var qixiCommodity = `
            <li class="clear-all">
                <a href="./goods.html?goodscode=${json[i].ItemCode}">
                    <div class="like-img">
                        <img src="${json[i].Img}" alt="">
                    </div>
                    <div class="like-text clear-all">
                        <p class="p-title no-wrap">${json[i].Instro[0]}</p>
                        <p class="p-price">¥${json[i].Price[0]}</p>
                    </div>
                </a>
            </li>
          `;
          $('.doyoulike')[0].innerHTML += qixiCommodity ;
        };
      },
      error:function (){
        alert('猜你喜欢数据请求失败');
      }
    });
  })();

// 详情内容导航栏固定顶部------------------------------------------------------------
!(function(){
    window.onload=function(){
        $(document).on("scroll",function(){
            // 商品详情
            var details = $(".mydetails").offset().top;
            var details_h = details + $(".mydetails").height() - $(".pro-nav1").height();
            // 用户评价
            var stimate = $(".myestimate").offset().top;
            var stimate_h = stimate + $(".myestimate").height()- $(".pro-nav2").height();
            // 购物保障
            var safeguard = $(".mysafeguard").offset().top;
            var safeguard_h = safeguard + $(".mysafeguard").height()- $(".pro-nav3").height();
            // 商品详情nav
            if($(document).scrollTop() >= details && $(document).scrollTop() <= details_h) {
                $(".pro-nav1").css({
                    "position":"sticky",
                    "top":0,
                });
                $(".pro-nav1-mn").show();
            }else{
                $(".pro-nav1").css({
                    "position":"relative",
                });
                $(".pro-nav1-mn").hide();
            }
            // 用户评价nav
            if($(document).scrollTop() + 5 >= stimate  && $(document).scrollTop() <= stimate_h){
                $(".pro-nav2").css({
                    "position":"sticky",
                    "top":0,
                    "z-index": 999,
                });
                $(".pro-nav2-mn").show();
            }else{
                $(".pro-nav2").css({
                    "position":"relative",
                });
                $(".pro-nav2-mn").hide();
            }
            // 购物保障nav
            if($(document).scrollTop()+ 5 >= safeguard   && $(document).scrollTop() <= safeguard_h){
                $(".pro-nav3-mn").show();
            }else{
                $(".pro-nav3-mn").hide();
            }
        });
    };
    
})();

// 保障内容------------------------------------------------------------------
!(function(){
    var tab_items = document.querySelectorAll('.tab-item');
    var conImgs = document.querySelectorAll('.conImg');
    var span_icon = document.querySelectorAll('.tab-item span');
    var pre = 0;
    for (let i = 0; i < tab_items.length; i++) {
        $(tab_items[i]).mouseenter(()=>{
            $(conImgs[pre]).hide();
            $(conImgs[i]).show();
            $(span_icon[pre]).removeClass('activeImg');
            $(span_icon[i]).addClass('activeImg');
            pre = i;
        });
    }
})();