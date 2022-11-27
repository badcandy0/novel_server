/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-09 10:10:08
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-27 14:00:21
 * @FilePath: \novel_server\controllers\book_lib.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
const db = require('../db')

const moment = require('./moment');

const fs = require('fs');

var path = require('path');

// 获取全部信息书籍信息
const getBookList = (req, res) => {
    db.query('SELECT * FROM book_lib', (err, results) => {
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
// 获取当前书籍的详情
const getBook= (req, res)=>{
    const book_id=req.query.book_id;
    db.query('SELECT * FROM book_lib WHERE book_id=?',[book_id], (err, results)=>{
        if(err) {
            return res.status(500).json({
                code: 500,
                msg: '服务端问题,请联系管理员',
                data: null
            })
        }

        if (results.length > 0){
            res.status(200).json({
                code: 200,
                msg: 'successfully',
                data: results[0]
            });
        }else{
            return res.status(500).json({
                code: 500,
                msg: '查询失败',
                data: null
            })
        }
    })
}
// 获取当前书籍的全部章节信息
const getBookChapters = (req, res) => {

    const book_id = req.query.book_id;


    db.query('SELECT chapter_id,chapter_name FROM book_chapters WHERE book_id = ?', [book_id], (err, results) => {
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
// 获取当前书籍的指定章节信息
const getBookInChapter = (req, res) => {
    const book_id = req.query.book_id;
    const chapter_id = req.query.chapter_id;

    db.query('SELECT * FROM book_chapters WHERE book_id=? AND chapter_id=?', [book_id, chapter_id], (err, results) => {
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
                data: results[0]
            });
        }
    })
}
// 上传小说
const upBook = (req, res) => {
    // res.json({
    //     code: 200,
    //     msg: '上传成功',
    //     data: {
    //       url: req.file,
    //     }
    //   })
    const book_name = req.body.book_name;
    const detials = req.body.detials;
    const auth_name = req.body.auth_name;
    const cover_url = req.body.cover_url;

    let contents = fs.readFileSync(path.resolve(__dirname, '../public/uploads/' + req.file.filename), 'utf-8', function (error, data) {
        if (error) {
            console.log(error)
            return res.status(500).json({
                code: 500,
                msg: '用户名重复,请重新输入',
                data: null
            })
        };
        console.log(data);
    })
    // console.log(contents)

    if (book_name && detials && auth_name) {
        db.query('SELECT book_id FROM book_lib WHERE book_name=? AND detials=? AND auth_name=?', [book_name, detials, auth_name], (err, results) => {
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
                    msg: '重复,请重新输入',
                    data: null
                })
            } else {
                const created_time = moment.formatDate;
                const last_updated_time = moment.formatDate;
                const status = 1;
                const love = 0;
                const click_count = 0;


                db.query('INSERT INTO book_lib (book_name,cover_url,detials,auth_name,created_time,last_update_time,status,love,click_count) VALUES (?,?,?,?,?,?,?,?,?)', [book_name, cover_url, detials, auth_name, created_time, last_updated_time, status, love, click_count], (err, results) => {
                    if (err) {
                        return res.status(500).json({
                            code: 500,
                            msg: '服务端问题,请联系管理员',
                            data: null
                        })
                    }
                    if (results.affectedRows > 0) {
                        db.query('SELECT book_id FROM book_lib WHERE book_name=?', [book_name], (err, results) => {
                            if (err) {
                                return res.status(500).json({
                                    code: 500,
                                    msg: '用户名重复,请重新输入',
                                    data: null
                                })
                            }
                            if (results.length > 0) {
                                const book_id = results[0].book_id;

                                const chapter_name = req.body.chapter_name;


                                db.query('INSERT INTO book_chapters(book_id,chapter_id,chapter_name,contents) VALUES (?,1,?,?)', [book_id, chapter_name, contents], (err, results) => {
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
                                            data: req.file
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
            msg: '有空内容，请输入',
            data: null
        })
    }
}
// 更新小说
const updateBook = (req, res) => {
    const book_id = req.body.book_id;
    const chapter_id = req.body.chapter_id;
    const chapter_name = req.body.chapter_name;

    let contents = fs.readFileSync(path.resolve(__dirname, '../public/uploads/' + req.file.filename), 'utf-8', function (error, data) {
        if (error) {
            console.log(error)
            return res.status(500).json({
                code: 500,
                msg: '用户名重复,请重新输入',
                data: null
            })
        };
    })

    if (chapter_id && chapter_name) {
        db.query('SELECT * FROM book_chapters WHERE chapter_id = ? AND book_id = ?', [chapter_id, book_id], (err, results) => {
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
                    msg: '添加失败,章节号重复',
                    data: null
                })
            } else {
                db.query('INSERT INTO book_chapters(book_id, chapter_id, chapter_name, contents) VALUES (?,?,?,?)', [book_id, chapter_id, chapter_name, contents], (err, results) => {
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
                            data: req.file
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
    } else {
        return res.status(500).json({
            code: 500,
            msg: '有空内容，请输入',
            data: null
        })
    }

}
module.exports = { getBookList, getBookChapters, getBookInChapter, upBook, updateBook, getBook }