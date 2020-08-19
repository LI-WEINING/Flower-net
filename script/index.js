
// 轮播图-------------------------------------------------------
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // 水平切换选项
    loop: true, // 循环模式选项
    autoplay:true, //自动切换
    effect : 'fade',
    speed:800,
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,//开启点击换页
      bulletActiveClass: 'my-bullet-active', //设置当前页颜色
    },
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});
// 鼠标滑过pagination控制swiper切换页
for(var i=0 ; i<mySwiper.pagination.bullets.length;i++){
    mySwiper.pagination.bullets[i].onmouseover=function(){
      this.click();
    };
} 
//鼠标覆盖停止自动切换
mySwiper.el.onmouseover = function(){
    mySwiper.autoplay.stop();
}
//鼠标离开开始自动切换
mySwiper.el.onmouseout = function(){
    mySwiper.autoplay.start();
}
//鼠标移入显示隐藏导航按钮
$('.banner').mouseenter(function(){
    $('.swiper-button-box').show();
});

$('.banner').mouseleave(function(){
    $('.swiper-button-box').hide()
});


// 判断是否登入--------------------------------------------------------------------
if (getCookie('username')) {
  var  newA = `<a href="#">欢迎您，${getCookie('username')}</a><a href="#" class="quit-user">退出</a>`;
  $('.login').html(newA);
};

// 退出判断-------------------------------------------------------------------------
$('.quit-user').click(function(){
  delCookie('username');
  delCookie('password');
  $(location).attr('href', './index.html');
});



// 活动商品json数据------------------------------------------------------------------
!(function(){
  var activity_list = document.querySelector('.activity-commodity-list');
  $.ajax({
    type:'get',
    url:'../other/qixiactivity.json',
    dataType:'json',
    success:function (json){
      for(var i = 0 , long= json.length; i < long; i++){
        var qixiCommodity = `
              <li>
                <a href="./goods.html?goodscode=${json[i].ItemCode}"}>
                    <img src="${json[i].Img}">
                    <p class="festival-item-name">${json[i].PageCpmc}</p>
                    <p class="festival-item-desc">${json[i].Activity}</p>
                    <p class="festival-item-price">¥${json[i].Price[0]}</p>
                </a>
              </li>
        `;
        activity_list.innerHTML += qixiCommodity ;
      };
    },
    error:function (){
      alert('七夕活动商品json请求失败');
    }
  });

})();

// json商品数据插入------------------------------------------------------------------
!(function(){
  var fl_products = document.querySelectorAll('.fl-products');
  $.ajax({
    type:'get',
    url:'../other/hua.json',
    dataType:'json',
    success:function (json){
      for(var i = 0 , long= json.length; i < long; i++) {
        var newCommodity =`
          <li class="hua-commodity-item">
              <a href="#">
                  <div class="img-box">
                      <img src="${json[i].Imag}" alt="">
                  </div>
                  <div class="product-content">
                      <p class="product-title">${json[i].Cpmc}</p>
                      <p class="product-price">
                          <span class="price-sign">¥</span><span class="price-num" data-pp="9012450">${json[i].Price}</span>
                      </p>
                      <p class="product-sell">已售 ${json[i].Sales} 件</p>
                  </div>
              </a>
          </li>
        `;
        if(i<8){
          fl_products[0].innerHTML += newCommodity;
        }else if(i<16){
          fl_products[1].innerHTML += newCommodity;
        }else if(i<24){
          fl_products[2].innerHTML += newCommodity;
        }else if(i<29){
          fl_products[3].innerHTML += newCommodity;
        }else{
          fl_products[4].innerHTML += newCommodity;
        }
      };
    },
    error:function (){
        alert('网页商品json请求失败');
    }
  });
})();
