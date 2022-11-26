/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-14 09:25:42
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-24 00:31:24
 * @FilePath: \novel_server\controllers\browsing_history.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
const db = require('../db')

var moment = require('moment');
// 获取当前用户的历史记录
const getBrowseHistory = (req, res) => {
    const user_id = req.query.user_id;

    db.query('SELECT bh.chapter_id,bh.book_id,bh.last_browse_time,bl.book_name,bl.cover_url,bl.detials,bl.auth_name FROM browsing_history bh LEFT JOIN book_lib bl ON bh.book_id = bl.book_id WHERE bh.user_id = ? ORDER BY bh.last_browse_time DESC', [user_id], (err, results) => {
        console.log(`output->`,user_id,)
        if (err) {
            console.log(err)
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
                msg: '抱歉，你还没有阅读书籍哟',
                data: null
            })
        }
    })
}
// 新增浏览历史记录
const addBrowse = (req, res) => {
    const user_id = req.query.user_id;
    const book_id = req.query.book_id;
    const chapter_id = req.query.chapter_id;
    

    db.query('SELECT * FROM browsing_history WHERE user_id = ? AND book_id = ? ', [user_id, book_id], (err, results) => {
        
         
        if (err) {
            return res.status(500).json({
                code: 500,
                msg: '服务端问题,请联系管理员',
                data: null
            })
        }
        if (results.length > 0) {
            db.query('UPDATE browsing_history SET chapter_id=?, last_browse_time=? WHERE user_id=? AND book_id = ?', [chapter_id, moment().format(), user_id, book_id], (err, results) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        code: 500,
                        msg: '服务端问题,请联系管理员',
                        data: null
                    })
                }
                if (results.changedRows > 0) {
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
            db.query('INSERT INTO browsing_history (user_id, book_id, chapter_id,last_browse_time) VALUES (?, ?, ?, ?)', [user_id, book_id, chapter_id, moment().format()], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        msg: '服务端问题,请联系管理员',
                        data: null
                    })
                }
                if (results.affectedRows > 0) {
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
        }
    })
}
module.exports = { getBrowseHistory, addBrowse }