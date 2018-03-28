---
title: App Links和Universal Links的配置和使用
copyright: true
date: 2018-03-28 22:39:31
tags: React-Native
categories: React-Native
---

之前的有一篇博文介绍了Scheme的方式来实现App之间的跳转，但是这种方式有一个问题，就是当我们的移动设备上没有安装该App时，它不能做其他的处理，比如跳转到我们公司的网站里面。所以在2015年，Google和App分别提出了和Universal Links（只支持Android M及以上系统）和App Links（只支持IOS9及以上系统）这两个新特性。这两种方式，可以通过访问HTTP/HTTPS链接直接唤起APP进入具体页面，不需要其他额外判断；如果未安装App，访问此链接时，可以展示你网站的内容。这两种方式有一个要求，你需要有一个域名和自己的服务器，下面分别介绍这两种方式：

### Universal Links

