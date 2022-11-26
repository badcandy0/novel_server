/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-20 14:26:18
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-21 20:01:40
 * @FilePath: \novel_server\routes\search.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var express = require('express');
var router = express.Router();

var searchController = require('../controllers/search')

router.get('/', searchController.search)

module.exports = router;