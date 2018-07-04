---
title: 使用gulp对博文进行压缩
copyright: true
date: 2018-02-14 22:06:23
tags: Hexo
categories: Hexo
---

默认情况下，使用hexo generate命令生成的静态文件没有经过压缩，代码之间会有很多空白行和注释，可以通过gulp对 public 目录中的静态资源文件进行压缩，减少网站整体尺寸大小。下面是具体的步骤：

#### 安装npm

安装完后替换为淘宝镜像源避免因网速问题导致文件下载不全：

```
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
```

#### 安装gulp

安装gulp需要全局安装一次，再本地环境安装一次，参见[gulp入门指南](http://www.gulpjs.com.cn/docs/getting-started/)

```
npm install gulp -g
npm install gulp --save-dev

```

#### 安装gulp相关插件

需要用到以下插件

> del
> gulp-clean-css
> gulp-htmlclean
> gulp-htmlmin
> gulp-imagemin
> gulp-uglify
> run-sequence

```
npm install del --save-dev
npm install gulp-clean-css --save-dev
npm install gulp-htmlclean --save-dev
npm install gulp-htmlmin --save-dev
npm install gulp-imagemin --save-dev
npm install gulp-uglify --save-dev
npm install run-sequence --save-dev
```

#### 编写gulpfile.js文件

在hexo项目根目录下（node_modules同目录），新增gulpfile.js文件，内容如下

```
var gulp = require('gulp');
var minifycss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var Hexo = require('hexo');
// 清除public文件夹
gulp.task('clean', function() {
    return del(['public/**/*']);
});
// 利用Hexo API 来生成博客内容， 效果和在命令行运行： hexo g 一样
var hexo = new Hexo(process.cwd(), {});
gulp.task('generate', function(cb) {
    hexo.init().then(function() {
        return hexo.call('generate', {
            watch: false
        });
    }).then(function() {
        return hexo.exit();
    }).then(function() {
        return cb()
    }).catch(function(err) {
        console.log(err);
        hexo.exit(err);
        return cb(err);
    })
})
// 压缩public目录下的所有css
gulp.task('minify-css', function() {
    return gulp.src('./public/**/*.css')
        .pipe(minifycss({
            compatibility: 'ie8',
			rebase: false,
        }))
        .pipe(gulp.dest('./public'));
});
// 压缩public目录下的所有html
gulp.task('minify-html', function() {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'))
});
// 压缩public目录下的所有js
gulp.task('minify-js', function() {
    return gulp.src('./public/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public'));
});
// 压缩public目录下的所有img： 这个采用默认配置
gulp.task('minify-img', function() {
    return gulp.src('./public/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'))
})
// 同上，压缩图片，这里采用了： 最大化压缩效果。
gulp.task('minify-img-aggressive', function() {
    return gulp.src('./public/images/**/*.*')
        .pipe(imagemin(
        [imagemin.gifsicle({'optimizationLevel': 3}), 
        imagemin.jpegtran({'progressive': true}), 
        imagemin.optipng({'optimizationLevel': 7}), 
        imagemin.svgo()],
        {'verbose': true}))
        .pipe(gulp.dest('./public/images'))
})
// 用run-sequence并发执行，同时处理html，css，js，img
gulp.task('compress', function(cb) {
    runSequence(['minify-html', 'minify-css', 'minify-js', 'minify-img-aggressive'], cb);
});
// 执行顺序： 清除public目录 -> 产生原始博客内容 -> 执行压缩混淆
gulp.task('build', function(cb) {
    runSequence('clean', 'generate', 'compress', cb)
});
gulp.task('default', ['build'])

```

#### 执行gulp压缩再部署

```
gulp build
hexo d
```