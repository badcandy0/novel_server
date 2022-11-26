/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-13 11:08:04
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-23 20:34:15
 * @FilePath: \novel_server\controllers\comment.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
const db = require('../db')

var moment = require('moment');
// 获取当前书籍当前章节的评论
const getComment = (req, res) => {
    const book_id = req.query.book_id;
    const chapter_id = req.query.chapter_id;

    db.query('SELECT u.user_name,u.avatar_url,c.* FROM `user` u LEFT JOIN `comment` c ON u.user_id=c.user_id WHERE c.book_id=? AND c.chapter_id=?', [book_id, chapter_id], (err, results) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                msg: '服务端问题,请联系管理员',
                data: null
            })
        }
        if (results.length > 0) {
            res.status(200).json({
                code: 200,
                msg: 'successfully',
                data: results
            });
        } else {
            return res.status(200).json({
                code: 200,
                msg: '获取评论数据失败',
                data: null
            })
        }
    })
}
// 获取当前用户评论
const getUserComments = (req, res) => {
    const user_id = req.query.user_id;

    db.query('SELECT * FROM comment WHERE user_id = ?', [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                msg: '服务端问题,请联系管理员',
                data: null
            })
        }

        if (results.length > 0) {
            res.status(200).json({
                code: 200,
                msg: 'successfully',
                data: results
            });
        } else {
            return res.status(500).json({
                code: 500,
                msg: '获取全部用户数据失败',
                data: null
            })
        }
    })
}
// 新增评论
const addComment = (req, res) => {
    const user_id = req.query.user_id;
    const book_id = req.query.book_id;
    const chapter_id = req.query.chapter_id;
    const content = req.body.content;
    
    if (content) {
         
        db.query('INSERT INTO comment (user_id,content, book_id, chapter_id,created_time ) VALUES (?,?,?,?,?)', [user_id, content, book_id, chapter_id, moment().format('YYYY-MM-DD HH:mm:ss')], (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    code: 500,
                    msg: '服务端问题,请联系管理员',
                    data: null
                })
            }
            if (results.affectedRows > 0) {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        code: 500,
                        msg: '服务端问题,请联系管理员',
                        data: null
                    })
                }
                res.status(200).json({
                    code: 200,
                    msg: '添加成功',
                    data: null
                });
            } else {
                return res.status(500).json({
                    code: 500,
                    msg: '添加失败',
                    data: null
                })
            }
        })
    } else {
        return res.status(500).json({
            code: 500,
            msg: '添加失败,内容不能为空',
            data: null
        })
    }
}
// 删除评论
const removeComment = (req, res) => {
    const comment_id = req.query.comment_id;

    if (comment_id) {
        db.query('DELETE FROM comment WHERE comment_id =?', [comment_id], (err, results) => {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    msg: '服务端问题,请联系管理员',
                    data: null
                })
            }

            if (results.affectedRows > 0) {
                return res.status(200).json({
                    code: 200,
                    msg: '删除成功',
                    data: null
                })
            } else {
                return res.status(200).json({
                    code: 500,
                    msg: '删除失败',
                    data: null
                })
            }
        })
    } else {
        return res.status(500).json({
            code: 500,
            msg: '删除失败，请检查数据库',
            data: null
        })
    }
}
module.exports = { getComment, getUserComments, addComment, removeComment }