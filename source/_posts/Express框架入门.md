---
title: Express框架入门
copyright: true
date: 2018-12-08 20:16:56
tags: Express
categories: Express
---

### Express 简介

[Express](http://www.expressjs.com.cn)是一基于Node的一个框架，用来快速创建Web服务的一个工具，为什么要使用Express呢，因为创建Web服务如果从Node开始有很多繁琐的工作要做，而Express为你解放了很多工作，从而让你更加关注于逻辑业务开发。举个例子：

创建一个很简单的网站：

1. 使用Node来开发：

```javascript
var http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World')
}).listen(3000)
```

这是一个简单的 Hello World，但实际上真正的网站要比这个复杂很多，主要有：

（1） 多个页面的路由功能

（2） 对请求的逻辑处理

那么使用node原生写法就要进行以下处理

```javascript
var http = require('http')
var url = require('url')

var app = http.createServer(function (req, rep) {
  //req.url: 访问路径
  var urlObj = url.parse(req.url);
  switch (urlObj.pathname) {
    case '/':
      //首页
      rep.writeHead(200, {
        'content-type': 'text/html;charset=utf-8'
      })
      rep.end('<h1>这是首页</h1>');
      break;
    case '/user':
      //个人中心
      rep.writeHead(200, {
        'content-type': 'text/html;charset=utf-8'
      })
      rep.end('<h1>这是个人中心</h1>');
      break;
     default:
     //处理其他情况
     rep.writeHead(404, {
        'content-type': 'text/html;charset=utf-8'
     })
     rep.end('<h1>页面不见了</h1>');
     break;
  }
})

app.listen(3000, 'localhost')
```

代码里在createServer函数里传递一个回调函数用来处理http请求并返回结果，在这个函数里有两个工作要做：

（1）路由分析，对于不同的路径需要进行分别处理

（2）逻辑处理和返回，对某个路径进行特别的逻辑处理

如果一个大型网站拥有海量的页面，每个页面的处理逻辑也是交错复杂，那这里的写法会非常混乱，没法维护，为了解决这个问题，TJ提出了Connect的概念，把Java里面的中间件概念第一次进入到JS的世界，Web请求将一个一个经过中间件，并通过其中一个中间件返回，大大提高了代码的可维护性和开发效率。

```javascript
// 引入connect模块
var connect = require("connect");
var http = require("http");
 
// 建立app
var app = connect();
 
// 添加中间件
app.use(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello world!");
});

启动应用 http.createServer(app).listen(3000);
```

但是TJ认为还应该更好一点，于是Express诞生了，通过Express开发以上的例子：

2. 使用Express来开发：

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/about', function (req, res) {
  res.send('About');
});

var server = app.listen(3000, function () { 
  var host = server.address().address; 
  var port = server.address().port; 
  console.log('Example app listening at http://%s:%s', host, port); 
});
```

从Express例子可以看出，使用Express大大减少了代码，而且逻辑更为简洁，所以使用Express可以提高开发效率并降低项目维护成本。

### Express 安装使用

1.手动安装

```bash
npm init 
npm install express || yarn add express
```

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
```

2.通过express-generator生成express项目

```bash
npm install express-generator -g
express --ejs express_demo || .  // .代表在当前目录生成项目
cd express_demo
npm install || yarn

#运行项目
npm start || node ./bin/www
```

### Express 源码结构

在 Express4.x 的版本中，已经移除了connect模块，Express内部自己实现了connect的模块，并进行的一些增强处理。这里对Express 源码进行一些简单的说明。

首先我们看一下Express的源码结构：

![mark](http://img.gongyz.cn/blog/20190228/L86HlXsRhwYH.png?imageslim)

```
#Middleware:中间件

init.js 初始化request，response

query.js 格式化url，将url中的rquest参数剥离, 储存到req.query中

#Router:路由相关

index.js  Router类，用于存储中间件数组

layer.js  中间件实体类

route.js  Route类，用于处理不同Method

Application.js 对外API

Express.js 入口

Request.js 请求增强

Response.js 返回增强

Utils.js 工具函数

View.js 模版相关
```

Express中的中间件和connect中不太一样，因为Express有两种中间件，**普通中间件、路由中间件**。

![mark](http://img.gongyz.cn/blog/20190228/rDIlTM3D79hu.png?imageslim)

**router对象的主要作用是创建一个普通中间件或者路由中间件然后将其保存到自己的stack数组中去。**

**route对象的主要作用是创建一个路由中间件，并且创建多个方法的layer保存到自己的stack数组中去。**

### Express 运行原理

![mark](http://img.gongyz.cn/blog/181030/gJbi318Jci.png)

### Express使用

示例代码： https://gitee.com/gongyz/expess_app.git

#### 路由

##### 1、创建路由对象

```javascript
// 默认路由配置
app.set('strict routing', true) // 精确匹配
app.set('case sensitive routing', true) // 区分大小写

/**
 * 路由：创建路由对象
 */

app.use('/',function (res,rep,next) {
  rep.send('Hello World!')
})

//  默认路由，基础路径为 '/'
app.get('/', function (req,rep,next) {
  rep.send('Hello World!')
})

app.get('/user/:name/:group', function (req,rep,next) {
  console.log(rep.params)
  next() // 匹配到路径后，调用next，继续执行子路由
})

// 创建子路由，并且对子路由进行配置
var router = express.Router({
  mergeParams: true, 
  caseSensitive: true,
  strict: true
});

app.use('/user/:name/:group', router)

// 子路由，基础路径为/user:name:group
router.get('/', function (req, rep, next) {
  rep.send(req.params)
})

router.get('/test', function (req, rep, next) {
  rep.send('router test')
})
```

##### 2、路由适配器快捷写法

```javascript
var router = express.Router()
app.use('/', router)
router.route('/test').get(function (req, res, next) {
  console.log('get1')
  next()
}).get(function (req, res, next) {
  console.log('get2')
  res.send('test finish')
}).post(function (req, res, next) {
  console.log('post1')
  next()
}).post(function (req, res, next) {
  console.log('post2')
  res.send('test finish')
})
```

##### 3、路由参数处理器

```javascript
// 普通写法对请求参数进行处理
 app.get('/user/:id', function (req, res, next) {
  if (req.params.id !== '1') {
    res.send(404)
  } else {
    res.send('success')
  }
 })

// 使用app.param添加一个拦截器，对请求参数进行处理，下面的路由用来处理正确的请求
app.param('id', function (req, res, next, id) {
  if (req.params.id !== '1') {
    res.send(404)
  } else {
    next()
  }
})

app.get('/user/:id', function (req, res, next) {
  res.send('success')
})

// 多个参数时的写法
app.param(['id', 'name'], function (req, res, next, value) {
  console.log(value) // 回调函数会执行两次，等同于下面的写法，建议采用下面的写法分开写
  next()
})
// 第一次
app.param('id', function (req, res, next, id) {
  console.log(id)
  next()
})
// 第二次
app.param('name', function (req, res, next, name) {
  console.log(name)
  next()
})

app.get('/user/:id/:name', function (req, res, next) {
  res.send('success')
})

// router.param用法和app.param一样，不同的是router.param不支持['id', 'name']接收参数
```

##### 4、路由处理器链

```javascript
//  基本用法
app.get('/', 
  function (req, res, next){
    console.log(1)
    next()
  },
  function (req, res, next){
    console.log(2)
    next()
  },
  function (req, res, next){
    console.log(3)
    res.send('finish')
  }
)

// 根据路由参数查找用户
var userRepo = {
  '01': {name: 'user01'},
  '02': {name: 'user02'},
}

app.get('/user/:id', function (req, res, next) {
  var id = req.params.id
  var user = userRepo[id]
  if(user) {
    res.send(user)
  } else {
    res.send(404)
  }
})

// 使用路由处理链实现路由和数据库分离
app.get('/user/:id', function (req, res, next) {db.getUserById(req, res, next)}, function (req, res, next) {
    res.send(req.user)
  }
)
```
##### 5、use与http动词方法的区别

```javascript
/**
 * (1) user适用于为当前路由器加入中间件和子路由
 */

// 给默认路由添加中间件，会匹配 '/' 开头的所有路径，不指定路径，默认 '/'
app.use('/', function (req,res,next) {
  res.send('Hello World')
})
// var router = express.Router()

// 给默认路由添加子路由
// app.use('/test', router)

// 给子路由添加中间件，会匹配 '/test' 开头的所有路径
// router.use('/', function (req,res,next){
//   res.send('children router')
// })

/**
 * (2) http动词方法适用于为当前路由器添加路径处理器
 */
// 只会匹配 '/' 开头的所有路径，不指定路径，会报404
app.get('/index', function (req,res) {
  res.send(200, 'Hello World!')
})
```

##### 6、路由路径模式

```javascript
// /abc?d  0次或1次
// /abc+d  1次或多次
// /abc\*d c~d之间任意字符
// /a(bc)?d
// /a(bc)+d
// /\/ab[1,2]\/cd/ 正则匹配
// [/abc?d, /a(bc)?d] //  多个匹配

app.get(/\/ab[1,2]\/cd/,function (req,res,next) {
  res.send('finish')
})
```

##### 7、静态资源访问

```javascript
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public', {
    index: 'index.html', // ['index.html', 'index.htm'] 指定默认的首页
    dotfiles: 'allow', // 是否.XXX
    extensions:['html', 'htm'] // 配置扩展名
}))
app.use(express.static('static'))
```

#### 获取客户端请求数据

##### 1、获取URL数据

```javascript
app.get('/index/:id', function (req,res,next) {
  res.send(`
    <ul>
      <li>req.methed = ${req.method}</li>
      <li>req.hostnam = ${req.hostname}</li>
      <li>req.originalUrl = ${req.originalUrl}</li>
      <li>req.path = ${req.path}</li>
      <li>req.protocol = ${req.protocol}</li>
      <li>req.query = ${JSON.stringify(req.query)}</li>
      <li>req.params= ${JSON.stringify(req.params)}</li>
    </ul>
  `)
})
```

##### 2、获取请求头数据

```javascript
// app.get('/index', function (req,res) {
//   res.send(`
//     <ul>
//       <li>req.headers= ${JSON.stringify(req.headers)}</li>
//     </ul>
//   `)
// })

// 自定义 'etag' 字段处理浏览器是否直接使用缓存数据
// req.fresh  // 浏览器缓存是否是最新的 默认false
// req.stale // 浏览器缓存是否是过时的

// var version = 100

// app.get('/index', function (req,res) {
//   res.set('etag', version)
//   if (req.fresh) {
//     res.send()
//   } else {
//     res.send('version:' + version)
//   }
// })

// app.get('/update', function (req,res) {
//   ++version
//   res.send()
// })

// 实际开发时一般利用中间件来处理
// function freshHandle (req,res,next) {
//   res.set('etag', version)
//   if (req.fresh) {
//     res.send()
//   } else {
//     next()
//   }
// }

// app.get('/index', freshHandle, function (req,res) {
//   res.send('version:' + version)
// })


// 判断是否为ajax请求，处理是返回部分信息还是渲染整个页面
app.get('/test/ajax', function (req,res) {
  // 请求头中需设置 X-Requested-With = XMLHttpRequest字段
  if (req.xhr) {
    res.send(req.xhr)
  } else {
    res.render()
  }
}) 
```

##### 3、获取主体信息

```javascript
// 引入body-parse模块，express支持json、urlencoded方法
app.use(bodyParser.urlencoded())  //  application/x-www-form-urlencoded
app.use(bodyParser.text());      //   text/plain
app.use(bodyParser.json());  //   xhr.setRequestHeader('Content-Type','application/json')

// 表单提交编码方式
// application/x-www-form-urlencoded   默认
// text/plain
// multipart/form-data  

/**
 * 获取客户端请求数据，解析主体信息
 */

app.post('/submit', function (req,res) {
  console.log(req.body)
  res.send(req.body)
})
```

##### 4、获取文件上传数据

```javascript
/**
 * 获取客户端请求数据，获取上传文件的数据 
 * https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
 */

// 创建上传中间件对请求进行拦截，处理上传的文件

// 磁盘存储
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'cupload')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })

// 设置一个函数来控制什么文件可以上传以及什么文件应该跳过
function fileFilter (req, file, cb) {
  // 这个函数应该调用 `cb` 用boolean值来指示是否应接受该文件
  if (file.mimetype === 'image/png') {
    // 接受这个文件，使用`true`
    // cb(null, true)
    
  } else {
    // 拒绝这个文件，使用false
    // cb(null, false)

    // 拒绝同时抛出错误给express处理
    cb(new Error('file type illeg'),false)
  }
}

// 内存存储
var storage = multer.memoryStorage()

var upload = multer({ storage: storage, fileFilter: fileFilter })

// var upload = multer({ dest: 'uploads/' })

// 处理单个以 fieldname 命名的文件
// app.use(upload.single('file'))

// 处理多个以 fieldname 命名的文件，文件fieldname相同 	Field name 由表单指定
// app.use(upload.array('file', 3))

// 处理不同 fieldname 命名的文件
// app.use(upload.fields([
//   { name: 'file', maxCount: 1 },
//   { name: 'file2', maxCount: 2 }
// ]))

// app.use(upload.none()) // 只接受文本域

app.use(upload.any()) // 接受一切上传的文件

app.post('/upload', function (req,res) {
  console.log(req.body)
  console.log(req.file)
  console.log(req.files)

  res.send('上传成功')
})
```

#### 响应

##### 1、基本方式的响应

```javascript
/**
 * 响应—基本方式的响应
 * https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
 */

 app.get('/download',function (req,res) {
   res.download('download.txt');
 })

 app.get('/download',function (req,res) {
  res.download('download.txt');
})

app.get('/redirect',function (req,res) {
  // res.redirect('http://www.guangeryi.com')
  res.redirect('/txt')
})

app.get('/txt',function (req,res) {
  res.send('my name is gongyz');
})

app.get('/json',function (req,res) {
  res.send({name: 'gongyz', age: 23});
})

app.get('/html', function(req,res) {
  res.send('<p style="color: red">Hello World</p>')
})

// 静态资源访问
app.get('/file/:name', function (req, res, next) {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  }
  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent:', fileName)
    }
  })
})
```

##### 2、动态页面渲染

```javascript
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


app.use('/' ,indexRouter)
app.use('/user' ,usersRouter)

/* GET home page. */
// router.get('/', function(req, res, next) {
//   var arr =[1,2,3,4,5,6,7,8]
//   res.render('index', { title: 'index', arr });
// });


// 实际项目中的做法
var db = {
  getData (req,res,next) {
    var arr =[1,2,3,4,5,6,7,8]
    res.locals = {title: 'index', arr}
    next()
  }
}

router.get('/',db.getData,function(req, res, next) {
  res.render('index');
});
```

#### Cookie & Session

```javascript
/**
 * Cookie && Session
 */

//  (1) cookie
// app.get('/', function (req, res) {
//   res.send(req.cookies)
// })

// app.get('/add', function (req, res) {
//   var name = req.query.name
//   var value = req.query.value
//   res.cookie(name, value)
//   res.redirect('/')
// })

// app.get('/clear', function (req,res) {
//   var name = req.query.name
//   var value = req.query.value
//   res.clearCookie(name, value);
//   res.redirect('/')
// })


// (2) session  http 无状态，session是基于cookie的
// client  ->  server
// c <- s (SID cookie)
// c -> s (SID get session data)
app.use(session({
  name: 'JSESSIONID',
  secret: 'gongyz'  //secret的值建议使用随机字符串
}))

app.get('/login', function (req, res) {

  var user = req.query.user
  var pwd  = req.query.pwd

  var userInfo = {
    name:"Chen-xy",
    age:"22",
    address:"bj"
  }

  if (user === 'gongyz' && pwd === '123') {
    req.session.sign = true
    req.session.userInfo = userInfo
    res.redirect('/')
  } else {
    req.session.sign = false
    res.send('账号密码错误，请重新输入')
  }
});

app.get('/', function(req, res) {
  if (req.session.sign) {
    res.send(req.session.userInfo)
  } else {
    res.send('请登录')
  }
})
```
