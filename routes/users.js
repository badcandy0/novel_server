/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-03 16:09:11
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-13 15:24:31
 * @FilePath: \novel_server\routes\users.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var express = require('express');
var router = express.Router();

// 导入userController
const userController = require('../controllers/user')

/* GET users listing. */

// 获取用户信息
router.get('/',userController.getUser)
// 获取全部用户信息
router.get('/allUsers',userController.getAllUsers)
// 登录
router.post('/login', userController.login)
// 注册
router.post('/register', userController.register)

module.exports = router;
