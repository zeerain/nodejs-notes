var fs = require('fs')
var path = require('path')
var template = require('art-template') // https://www.npmjs.com/package/art-template
var mime = require('mime') // https://www.npmjs.com/package/mime
var moment = require('moment') // http://momentjs.com/

// 设置时间语言
moment.locale('zh-cn')

// /favicon.ico
exports.handleFavicon = function (req, res) {
  fs.readFile(path.join(__dirname, 'static/img/favicon.ico'), function (err, data) {
    if (err) {
      throw err
    }
    res.writeHead(200, {
      'Content-Type': 'image/x-icon'
    })
    res.end(data)
  })
}

// /static/**/*
exports.handleStatic = function (req, res) {
  // http://127.0.0.1:3000/static/css/main.css
  // http://127.0.0.1:3000/static/img/logo.gif
  // 如果读取 /static/css/main.css 那这里的第一个 / 就是盘符根路径
  // 如果读取 ./static/css/main.css ，这里相对路径 ./ 受 执行 node 命令影响
  // 操作文件的相对路径受 执行 node 命令所处目录影响
  // 所以为了避免出现这个问题，把相对变成绝对就可以了
  // 通过使用模块内部的 __dirname 和 要读取的文件路径拼接起来就把相对转为绝对了
  // 注意：只有文件路径才会受 node 执行路径影响，加载模块的相对路径标识不受响应
  fs.readFile(path.join(__dirname, req.pathname), function (err, data) {
    if (err) {
      return res.end('404 Not Found')
    }
    res.writeHead(200, {
      'Content-Type': mime.lookup(req.pathname)
    })
    res.end(data)
  })
}

// /
exports.showIndex = function (req, res) {
  fs.readFile(path.join(__dirname, 'views/index.html'), function (err, tplData) {
    if (err) {
      throw err
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', function (err, data) {
      if (err) {
        throw err
      }
      data = JSON.parse(data)

      // 使用 moment 处理相对时间
      data.news.forEach(function (item) {
        item.time = moment(item.time).startOf('second').fromNow()
      })
      
      // 根据数组中每一项的 id 倒叙排序
      data.news.sort(function(a, b){
        return a.id < b.id
      })
      var htmlStr = template.compile(tplData.toString())(data)
      res.end(htmlStr)
    })
  })
}

// /submit
exports.showSubmit = function (req, res) {
  fs.readFile(path.join(__dirname, 'views/submit.html'), function (err, data) {
    if (err) {
      throw err
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })
    res.end(data)
  })
}

// /add_submit
exports.doSubmit = function (req, res) {
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    data = JSON.parse(data)

    // 找到最大项 id，存的时候让 id+1 存，保证存储的数据的身份证号 id 绝对不重复
    var id = 0
    data.news.forEach(function (item) {
      if (item.id > id) {
        id = item.id
      }
    })
    data.news.push({
      id: id + 1,
      title: req.query.title,
      time: new Date().getTime(),
      text: req.query.text
    })
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data), function (err) {
      if (err) {
        throw err
      }
      // 告诉客户端，你去请求这个路径吧
      // 302 状态码就表示重定向的意思
      // 浏览器看到 302 状态码之后，会自动去 响应报文头中找 Location 属性
      res.writeHead(302, {
          'Location': '/'
        })
        // 注意：即便了发送了一个响应头，也要记得结束响应
      res.end()
    })
  })
}

exports.showItem = function (req, res) {
  var id = parseInt(req.query.id)
    // 根据 id 查找到 data.json 中的记录项（模板数据）
    // 读取模板字符串，然后将模板数据和模板字符串解析替换到一起
    // 发送给请求客户端
  fs.readFile(path.join(__dirname, 'data.json'), 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    data = JSON.parse(data)
    var dataItem = {}
    data.news.forEach(function (item) {
      if (item.id === id) {
        dataItem = item
      }
    })
    fs.readFile(path.join(__dirname, 'views/item.html'),'utf8', function (err, data) {
      if (err) {
        throw err
      }
      var htmlStr = template.compile(data)({
        item: dataItem
      })
      res.end(htmlStr)
    })
  })
}
