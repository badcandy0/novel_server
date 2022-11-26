/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-13 11:07:49
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-23 13:44:51
 * @FilePath: \novel_server\routes\comment.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var express = require('express');
var router = express.Router();

const comments = require('../controllers/comment');
// 获取当前书籍当前章节的评论
router.get('/',comments.getComment);
// 获取当前用户的评论
router.get('/userComment', comments.getUserComments);
// 新增评论
router.post('/', comments.addComment);
// 删除评论
router.delete('/', comments.removeComment);

module.exports = router;