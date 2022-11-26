/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-10 15:18:01
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-10 20:58:02
 * @FilePath: \novel_server\routes\rank.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var express = require('express');
var router = express.Router();

var rankController = require('../controllers/rank');

// 获取全部榜单数据
router.get('/',rankController.getRank)
// 获取当前榜单数据(综合)
router.get('/rank_group',rankController.getRankGroup);
// 获取当前榜单数据(喜欢量)
router.get('/rank_group_love',rankController.getRankGroupLove);
// 获取当前榜单数据(点击量)
router.get('/rank_group_click',rankController.getRankGroupClick);
// 为当前榜单新增书籍
router.put('/rank_group',rankController.addRankBook);
// 删除当前榜单中的指定书籍
router.delete('/',rankController.removeRankGroupBook);
module.exports = router;