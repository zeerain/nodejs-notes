var fs = require('fs')
var url = require('url')
var template = require('art-template')
var handler = require('./handler')
var path = require('path')

module.exports = function(req, res) {
    // url 模块中的 parse 方法可以将一个路径解析为一个对象
    // 可以得到一个路径中的 请求路径部分、查询字符串部分、端口号 等信息
    // 可以通过指定第二个参数为 true，自动将解析到的查询字符串 
    // query: { u: 'a', pwd: 'b' }解析为一个对象
    /*var urlObj = url.parse(req.url, true)

    // 拿到请求路径中的查询字符串对象
    var queryObj = urlObj.query

    // 将解析出来的查询字符串对象挂载给 req 请求对象
    req.query = queryObj

    // 只拿到请求路径中的路径部分（不包含查询字符串）
    var pathname = urlObj.pathname
    req.pathname = pathname

    // 给 res 响应对象挂载一个 json 函数，可以直接调用该函数，传入一个对象，帮你自动将对象转为字符串发送响应
    res.json = function (obj) {
      res.end(JSON.stringify(obj))
    }

    // 将不同的请求路径分发的具体的处理函数
    if (pathname === '/') {
      handler.showIndex(req, res)
    } else if (pathname.startsWith('/static/')) {
      handler.handleStatic(req, res)
    } else if (pathname === '/favicon.ico') {
      handler.handleFavicon(req, res)
    } else if (pathname === '/submit') {
      handler.showSubmit(req, res)
    } else if (pathname === '/add_submit') {
      handler.doSubmit(req, res)
    } else if (pathname === '/item') {
      handler.showItem(req, res)
    } else {
      res.end('404 Not Found.')
    }*/
    console.log('=====================')
    console.dir(req);
    console.log('=====================')
        // console.log(res);
    res.end('hello');
}