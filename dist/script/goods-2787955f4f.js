"use strict";var newA;localStorage.getItem("user")&&(newA='<a href="#">欢迎您，'.concat(localStorage.getItem("user"),'</a><a href="#" class="quit-user">退出</a>'),$(".login").html(newA)),$(".quit-user").click(function(){localStorage.clear(),$(location).attr("href","./index.html")}),function(){var n,e=window.location.href;-1==e.indexOf("file")&&(n=parseInt(e.split("?")[1].split("=")[1]));var c="",o="",a="",l=0;$.ajax({type:"get",url:"../other/qixiactivity.json",dataType:"json",success:function(t){$.each(t,function(e,i){t[e].ItemCode==n&&($(".flanguage").text(i.Flanguage),$(".send").text(i.Send),$(".select-box")[0].innerHTML=o,$(".myId").text(i.ItemCode),$("title").text(i.Cpmc+":"+i.Materials+"_鲜花-中国鲜花礼品网"),$(".commodity-name").text(i.Cpmc[0]),$(".title-name").text(i.Cpmc[0]),$(".title-desc").text(i.Instro[0]),$(".title-point").text(i.Property[0]),$(".s-price").text(i.Price[0]),$(".fixed-price span").text(i.Price[0]),$(".originalPrice").text(i.LinePrice[0]),$(".sale-count span").text(i.Sales[0]),$(".materials").text(i.Materials[0]),$(".max-picture").html('<img src="'+i.Bigimg[0]+'" alt="">'),$.each(i.Minimg[0],function(e,t){c+='\n                            <li>\n                                <img src="'.concat(t,'" alt="">\n                            </li>\n                            ')}),$(".min-picture")[0].innerHTML=c,$.each(i.detailsFigure[0],function(e,t){a+='<img src="'.concat(t,'" alt="">')}),$(".detailsFigure")[0].innerHTML=a,$.each(i.Select,function(e,t){o+='<li><img src="../image/'.concat(t.simg,'" alt=""><span class="my-like">').concat(t.stitle,'</span><span class="icon-chosen"></span></li>')}),$(".select-box")[0].innerHTML=o,$($(".select-box li")[0]).addClass("li-active"),$.each($(".select-box li"),function(e,t){$($(".select-box li")[e]).on("click",function(){$($(".select-box li")[l])[0].className="",$($(".select-box li")[e])[0].className="li-active",l=e,$(".commodity-name").text(i.Cpmc[e]),$(".title-name").text(i.Cpmc[e]),$(".title-desc").text(i.Instro[e]),$(".title-point").text(i.Property[e]),$(".s-price").text(i.Price[e]),$(".fixed-price span").text(i.Price[e]),$(".originalPrice").text(i.LinePrice[e]),$(".sale-count span").text(i.Sales[e]),$(".materials").text(i.Materials[e]),$(".max-picture").html('<img src="'+i.Bigimg[e]+'" alt="">'),c="",$.each(i.Minimg[e],function(e,t){c+='\n                                    <li>\n                                        <img src="'.concat(t,'" alt="">\n                                    </li>\n                                    ')}),$(".min-picture")[0].innerHTML=c,a="",$.each(i.detailsFigure[e],function(e,t){a+='<img src="'.concat(t,'" alt="">')}),$(".detailsFigure")[0].innerHTML=a})}))})},error:function(){alert("商品数据请求失败")}})}(),$(".min-picture").on("mouseenter","li img",function(){$(".max-picture").html(""),$(this).clone(!0).appendTo(".max-picture")}),$.ajax({type:"get",url:"../other/qixiactivity.json",dataType:"json",success:function(e){for(var t=0,i=e.length;t<i;t++){var n='\n            <li class="clear-all">\n                <a href="./goods.html?goodscode='.concat(e[t].ItemCode,'">\n                    <div class="like-img">\n                        <img src="').concat(e[t].Img,'" alt="">\n                    </div>\n                    <div class="like-text clear-all">\n                        <p class="p-title no-wrap">').concat(e[t].Instro[0],'</p>\n                        <p class="p-price">¥').concat(e[t].Price[0],"</p>\n                    </div>\n                </a>\n            </li>\n          ");$(".doyoulike")[0].innerHTML+=n}},error:function(){alert("猜你喜欢数据请求失败")}}),window.onload=function(){$(document).on("scroll",function(){var e=$(".mydetails").offset().top,t=e+$(".mydetails").height()-$(".pro-nav1").height(),i=$(".myestimate").offset().top,n=i+$(".myestimate").height()-$(".pro-nav2").height(),c=$(".mysafeguard").offset().top,o=c+$(".mysafeguard").height()-$(".pro-nav3").height();$(document).scrollTop()>=e&&$(document).scrollTop()<=t?($(".pro-nav1").css({position:"sticky",top:0}),$(".pro-nav1-mn").show()):($(".pro-nav1").css({position:"relative"}),$(".pro-nav1-mn").hide()),$(document).scrollTop()+5>=i&&$(document).scrollTop()<=n?($(".pro-nav2").css({position:"sticky",top:0,"z-index":999}),$(".pro-nav2-mn").show()):($(".pro-nav2").css({position:"relative"}),$(".pro-nav2-mn").hide()),$(document).scrollTop()+5>=c&&$(document).scrollTop()<=o?$(".pro-nav3-mn").show():$(".pro-nav3-mn").hide()})},function(){for(var t=document.querySelectorAll(".tab-item"),i=document.querySelectorAll(".conImg"),n=document.querySelectorAll(".tab-item span"),c=0,e=0;e<t.length;e++)!function(e){$(t[e]).mouseenter(function(){$(i[c]).hide(),$(i[e]).show(),$(n[c]).removeClass("activeImg"),$(n[e]).addClass("activeImg"),c=e})}(e)}();