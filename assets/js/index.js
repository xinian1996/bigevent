$(function(){
    // 调用getUserInfo获取用户基本信息
    getUserInfo()

    $('#btnLogout').on('click',function(){
        // console.log('ok');
        var layer = layui.layer
        // 提示用户是否确认退出
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, 
        function(index){
            //do something
            // console.log('ok');
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            // 2.重新跳转到登录页面
            location.href = '/code/login.html'
            // 关闭confirm询问框
            layer.close(index);
          });
    })
})

// 获取用户基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // hearers 就是请求头 (添加到API里了)
        // headers:{
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success:function(res){
            // console.log(res);
             if(res.status !== 0){
                 return layui.layer.msg('获取用户信息失败！')
             }
            //  重新渲染用户头像
             renderAvatar(res.data);
        },

        // 禁止不登录直接访问页面
        // 不论成功还是失败都会执行这个回调函数
        // complete: function(res){
        //     console.log('执行了complete回调：');
        //     console.log(res);
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转到登录页面
        //         location.href = '/code/login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user){
    // 1.获取用户的名称
    var name = user.nickname || user.username;
    // 2.渲染用户头像
    $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)
    // 3.1 按需渲染用户头像
    if(user.user_pic !== null){
        // 3.2渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        // 3.3 新建的头像隐藏
        $('.text-avatar').hide()
    }else{
        // 3.4 渲染文本头像
        $('.layui-nav-img').hide()
        // 3.5 获取第一个字符
        var first = name[0].toUpperCase();
        // 3.6 展示用户自己的头像
        $('.text-avatar').html(first).show()

    }
}