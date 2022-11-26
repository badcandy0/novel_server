/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-13 15:28:19
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-24 01:15:23
 * @FilePath: \novel_server\controllers\collect.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
const db = require('../db')

// 获取当前用户的收藏
const getCollect = (req, res) => {
    const user_id = req.query.user_id;

    db.query('SELECT * FROM user WHERE user_id = ?', [user_id], (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                code: 500,
                msg: '服务端问题,请联系管理员',
                data: null
            })
        }
        if (results.length > 0) {
            db.query('SELECT c.user_id,c.book_id,bl.book_name,bl.cover_url FROM collect c LEFT JOIN book_lib bl ON c.book_id = bl.book_id WHERE user_id = ?', [user_id], (err, results) => {
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
                        msg: '尚未收藏',
                        data: null
                    })
                }
            })
        } else {
            return res.status(500).json({
                code: 500,
                msg: '抱歉当前用户不存在',
                data: null
            })
        }
    })
}
// 为当前用户收藏书籍
const addCollect = (req, res) => {
    const user_id = req.query.user_id;
    const book_id = req.query.book_id;

    if (book_id && user_id) {
        db.query('SELECT * FROM collect WHERE user_id = ? AND book_id = ?', [user_id, book_id], (err, results) => {
            if (err) {
                return res.status(500).json({
                    code: 500,
                    msg: '服务端问题,请联系管理员',
                    data: null
                })
            }
            if (results.length > 0) {
                return res.status(500).json({
                    code: 500,
                    msg: '添加失败,你已经收藏此书了',
                    data: null
                })
            } else {
                db.query('INSERT INTO collect (user_id, book_id) VALUES (?, ?)', [user_id, book_id], (err, results) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            code: 500,
                            msg: '服务端问题,请联系管理员',
                            data: null
                        })
                    }

                    if (results.affectedRows > 0) {
                        db.query('UPDATE book_lib SET love = love+1 WHERE book_id = ?', [book_id], (err, results) => {

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
                        return res.status(500).json({
                            code: 500,
                            msg: '添加失败',
                            data: null
                        })
                    }
                })
            }
        })
    } else {
        return res.status(500).json({
            code: 500,
            msg: '服务端问题,请联系管理员',
            data: null
        })
    }
}
// 为当前用户取消收藏书籍
const removeCollect = (req, res) => {
    const user_id = req.query.user_id;
    const book_id = req.query.book_id;

    db.query('SELECT * FROM collect WHERE user_id = ? AND book_id = ?', [user_id, book_id], (err, results) => {
        if (err) {
            return res.status(500).json({
                code: 500,
                msg: '服务端问题,请联系管理员',
                data: null
            })
        }

        if (results.length > 0) {
            db.query('DELETE FROM collect WHERE user_id = ? AND book_id = ?', [user_id, book_id], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        msg: '服务端问题,请联系管理员',
                        data: null
                    })
                }

                if (results.affectedRows > 0) {
                    db.query('UPDATE book_lib SET love=love-1 WHERE book_id = ?', [book_id], (err, results) => {
                        if (err) {
                            return res.status(500).json({
                                code: 500,
                                msg: '服务端问题,请联系管理员',
                                data: null
                            })
                        }
                        if (results.changedRows > 0) {
                            res.status(200).json({
                                code: 200,
                                msg: '删除成功',
                                data: null
                            });
                        } else {
                            return res.status(500).json({
                                code: 500,
                                msg: '删除失败',
                                data: null
                            })
                        }
                    })
                }
            })
        } else {
            return res.status(500).json({
                code: 500,
                msg: '不存在此收藏',
                data: null
            })
        }
    })
}
module.exports = { getCollect, addCollect, removeCollect }