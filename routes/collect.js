/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-13 15:28:00
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-13 16:29:42
 * @FilePath: \novel_server\routes\collect.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var express = require('express');
var router = express.Router();

var collectController = require('../controllers/collect')
// 获取当前用户的收藏
router.get('/',collectController.getCollect)
// 为当前用户添加书籍收藏
router.put('/',collectController.addCollect)
// 为当前用户取消收藏书籍
router.delete('/',collectController.removeCollect);
module.exports = router;