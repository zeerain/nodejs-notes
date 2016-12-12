var fs = require('fs')

// 加载下载的第三方包，不需要指定路径
var template = require('art-template')

// 这里只是将原来写死的模板字符串，放到了文件中
// 然后通过读文件的形式拿到模板字符串
fs.readFile('./a.html', 'utf8', function (err, data) {
  if (err) {
    throw err
  }
  var render = template.compile(data)
  console.log(render({
    title: 'hello world',
    gender: 0,
    fruits: [
      '苹果',
      '香蕉',
      '橘子'
    ]
  }))
})
