// 加载下载的第三方包，不需要指定路径
var template = require('art-template')

// 1. 调用 template.compile 函数，传入模板字符串
//     调用该函数之后会得到一个 render 渲染函数
var render = template.compile('<h1>{{ title }}</h1>')

// 2. 调用 render 渲染函数，传入一个数据对象
//    返回解析替换过后的字符串
console.log(render({
  title: 'hello world'
}))
