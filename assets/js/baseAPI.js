//  设置路径  测试
var baseURL = 'http://ajax.frontend.itheima.net'
// 生产
// var baseURL = 'http://www.itcast.cn';


//  拦截/过滤 每一次ajax请求，配置每次请求需要的参数
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;

    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete = function (res) {
        // console.log('执行了complete回调：');
        // console.log(res);
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/code/login.html'
        }
    }
})