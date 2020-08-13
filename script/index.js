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
})
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
    $('.swiper-button-box').show()
})

$('.banner').mouseleave(function(){
    $('.swiper-button-box').hide()
})