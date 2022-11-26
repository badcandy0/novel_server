/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-03 16:09:11
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-21 20:00:21
 * @FilePath: \novel_server\app.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const auth = require('./controllers/auth')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var book_libRouter = require('./routes/book_lib');
var classRouter = require('./routes/class');
var rankRouter = require('./routes/rank');
var commentRouter = require('./routes/comment');
var collectRouter = require('./routes/collect');
var browseRouter = require('./routes/browsing_history');
var searchRouter = require('./routes/search');
// 引入cors模块
const cors = require('cors')


const port = 4000

var app = express();

// 注册cors模块
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 过滤器
// app.use((req, res, next) => {
//   // 判断当前请求路径是否需要认证
//   const list = ['/login', '/register']

//   const filterList = list.filter(item => req.path.endsWith(item))
//   if (filterList.length === 0) {
//     const token = req.headers.token
//     // console.log(token)
//     try {
//       const payload = auth.verifyToken(token)
//       // console.log(payload)
//       if (!payload) {
//         return res.status(200).json({
//           code: 500,
//           msg: '登录失效,请重新登录',
//           data: null
//         })
//       }
//     } catch(err) {
//       console.log(err);
//       return res.status(200).json({
//         code: 500,
//         msg: '登录失效',
//         data: null
//       })
//     }
//   }

//   // 让当前请求继续被后续处理
//   next()
// })

app.use('/v1', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/admin', adminRouter);
app.use('/v1/book_lib',book_libRouter);
app.use('/v1/class',classRouter);
app.use('/v1/rank',rankRouter);
app.use('/v1/comment',commentRouter);
app.use('/v1/collect',collectRouter);
app.use('/v1/browsing_history',browseRouter);
app.use('/v1/search',searchRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})

module.exports = app;
