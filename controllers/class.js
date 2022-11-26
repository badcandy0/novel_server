/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-09 14:51:53
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-19 14:37:20
 * @FilePath: \novel_server\controllers\class.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
const db = require('../db')

// 获取全部分类信息
const getClass = (req, res) => {
    db.query('SELECT * FROM class', (err, results) => {
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
        }
    })
}
// 获取分类的分组信息
const getClassGroups = (req, res) => {
    const class_name = req.query.class_name;
    db.query('SELECT bl.auth_name,bl.book_name,bl.book_id,bl.cover_url,bl.detials,bl.love,bl.click_count FROM class_group cg LEFT JOIN book_lib bl ON cg.book_id=bl.book_id WHERE class_name = ?', [class_name], (err, results) => {
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
        }
    })
}
// 新增分类
const addClass = (req, res) => {
    const class_name = req.body.class_name;
    const count = 0;

    if (class_name) {
        db.query('SELECT * FROM class WHERE class_name =?', [class_name], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    code: 500,
                    msg: '服务端问题,请联系管理员',
                    data: null
                })
            }

            if (results.length > 0) {
                return res.status(500).json({
                    code: 500,
                    msg: '类名重复,请重新输入',
                    data: null
                })
            }

            db.query('INSERT INTO class (class_name,count) VALUES (?,?)', [class_name, count], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        msg: '服务端问题,请联系管理员',
                        data: null
                    })
                }

                res.status(200).json({
                    code: 200,
                    msg: '新增分类成功',
                    data: null
                });
            })
        })
    } else {
        return res.status(500).json({
            code: 500,
            msg: '请输入类名',
            data: null
        })
    }
}
// 新增分类分组信息
const addClassGroups = (req, res) => {
    const class_id = req.query.class_id;
    const class_name = req.query.class_name;
    const book_id = req.body.book_id;
    const book_name = req.body.book_name;

    if (book_id && book_name) {

        db.query('SELECT * FROM class_group WHERE book_name = ? AND class_id = ?', [book_name, class_id], (err, results) => {
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
                    msg: '添加失败,分类里已经有这本书了',
                    data: null
                })
            }
            db.query('INSERT INTO class_group (class_id,class_name,book_id,book_name) VALUES (?,?,?,?)', [class_id, class_name, book_id, book_name], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        msg: '服务端问题,请联系管理员',
                        data: null
                    })
                }
                // console.log(results)
                if (results.affectedRows > 0) {
                    db.query('UPDATE class SET count=count+1 WHERE class_id=?', [class_id], (err, results) => {
                        if (err) {
                            console.log(err)
                            return res.status(500).json({
                                code: 500,
                                msg: '服务端问题,请联系管理员',
                                data: null
                            })
                        }
                        // console.log(results)
                        if (results.changedRows > 0) {
                            res.status(200).json({
                                code: 200,
                                msg: '添加成功',
                                data: null
                            });
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
        })
    } else {
        return res.status(500).json({
            code: 500,
            msg: '请输入书籍信息',
            data: null
        })
    }
}
// 删除分类信息
const removeClass=(req, res)=>{
    const class_id = req.query.class_id;
    db.query('DELETE FROM class_group WHERE class_id = ?',[class_id], (err, results)=>{
        if (err) {
            console.log(err)
            return res.status(500).json({
                code: 500,
                msg: '服务端问题,请联系管理员',
                data: null
            })
        }
        // console.log(results)
        if (results.affectedRows>0){
            db.query('DELETE FROM class WHERE class_id = ?', [class_id], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        msg: '服务端问题,请联系管理员',
                        data: null
                    })
                }
                if (results.affectedRows > 0){
                    return res.status(200).json({
                        code: 200,
                        msg: '删除成功',
                        data: null
                    })
                }else{
                    return res.status(200).json({
                        code: 500,
                        msg: '删除失败',
                        data: null
                    })
                }
            })
        }else{
            return es.status(500).json({
                code: 500,
                msg: '删除失败',
                data: null
            })
        }
    })
}
module.exports = { getClass, getClassGroups, addClass, addClassGroups,removeClass }