/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-09 10:09:23
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-18 14:11:16
 * @FilePath: \novel_server\routes\book_lib.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 100)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

const book_lib = require('../controllers/book_lib')
// 获取全部书籍信息
router.get('/',book_lib.getBookList)
// 获取当前小说的详情
router.get('/details',book_lib.getBook)
// 获取书籍全部章节信息
router.get('/all_chapters',book_lib.getBookChapters)
// 获取指定章节信息
router.get('/chapter',book_lib.getBookInChapter)
// 上传小说
router.post('/upload',upload.single('novel'),book_lib.upBook)
// 更新小说
router.post('/update',upload.single('chapter'),book_lib.updateBook)
module.exports = router;