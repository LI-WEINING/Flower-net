// 封装Cookie函数 ---------------------------- 设置Cookie
function setCookie(opt){
    if(!opt.key || !opt.val){
        alert('设置失败，缺少必要的参数');
    }
    opt.path = opt.path || '';
    opt.domain = opt.domain || ''; 
    opt.days = opt.days || 0;
    if(opt.days === 0 ){
        document.cookie = opt.key +'='+ escape(opt.val) +'; domain='+opt.domain+'; path='+opt.path;
    }else{
        var d = new Date()
        d.setDate(d.getDate()+opt.days);
        document.cookie = opt.key +'='+ escape(opt.val) +'; domain='+opt.domain+'; path='+opt.path+'; expires='+d;
    }
}

// 封装Cookie函数 ---------------------------- 获取Cookie
function getCookie(key){
    var arr1 = document.cookie.split('; ');
    for (var i = 0 , n= arr1.length; i < n; i++) {
        var arr2 = arr1[i].split('=');
        if(arr2[0] === key){
            return  unescape(arr2[1]);
        }
    };
    return null;
};

// 封装Cookie函数 ---------------------------- 删除Cookie
function delCookie(key){
    setCookie({
        key:key,
        val:'1',
        days:-1
    })
}
