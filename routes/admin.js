/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-03 20:23:22
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-04 10:31:40
 * @FilePath: \badcandy\novel_server\routes\admin.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admin')

// 获取管理员列表
router.get('/',adminController.getAdmin )

// 登录
router.post('/login', adminController.login)



module.exports = router;