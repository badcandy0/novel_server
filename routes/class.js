/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-09 14:52:01
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-10 14:26:13
 * @FilePath: \novel_server\routes\class.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var express = require('express');
var router = express.Router();

const classController = require('../controllers/class')

// 获取全部的分类信息
router.get('/', classController.getClass)
// 获取分类的分组信息
router.get('/class_group',classController.getClassGroups)
// 新增分类
router.put('/',classController.addClass)
// 新增分类分组
router.put('/class_group',classController.addClassGroups)
// 删除分类信息
router.delete('/',classController.removeClass)
module.exports = router;