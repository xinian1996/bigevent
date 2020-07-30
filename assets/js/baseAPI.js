//  设置路径  测试
var baseURL = 'http://ajax.frontend.itheima.net'
// 生产
// var baseURL = 'http://www.itcast.cn';


//  拦截/过滤 每一次ajax请求，配置每次请求需要的参数
$.ajaxPrefilter(function(options){
    options.url = baseURL + options.url;
})