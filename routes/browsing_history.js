/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-14 09:25:26
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-23 21:59:06
 * @FilePath: \novel_server\routes\browsing_history.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var express = require('express');
var router = express.Router();

var browseController= require('../controllers/browsing_history')

// 获取当前用户的历史记录
router.get('/', browseController.getBrowseHistory)
// 新增浏览历史记录
router.post('/', browseController.addBrowse)

module.exports = router;