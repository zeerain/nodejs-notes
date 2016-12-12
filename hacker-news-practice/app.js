var http = require('http')
var router = require('./router')

// 1. 创建服务器，得到 Server 实例对象
var server = http.createServer()

// 2. 监听请求事件，设置请求处理函数
//    Server 端的请求入口，所有的请求都会触发 request 请求事件，然后执行对应的请求处理函数
server.on('request', function (req, res) {
  // 所有请求都先进入 router 中进行匹配分发处理处理函数
  router(req, res)
})

// 3. 绑定端口，启动服务器
server.listen(3000, function () {
  console.log('Server is running at port 3000...')
})
