/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-10 15:18:26
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-18 09:50:10
 * @FilePath: \novel_server\controllers\rank.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
const db = require('../db')

// 获取全部榜单数据
const getRank = (req, res) => {
    db.query('SELECT * FROM `rank`', (err, results) => {
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
                msg: '获取榜单数据失败',
                data: null
            })
        }
    })
}
// 获取当前榜单的数据(综合)
const getRankGroup = (req, res) => {
    const rank_name = req.query.rank_name;
    db.query('SELECT bl.book_name,bl.cover_url,bl.detials,bl.book_id,bl.love,bl.click_count,rank_id FROM book_lib bl RIGHT JOIN rank_group rg ON bl.book_id = rg.book_id WHERE rank_name=? ORDER BY love,click_count DESC', [rank_name], (err, results) => {
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
                msg: '抱歉当前榜单没有数据呢',
                data: null
            })
        }
    })
}
// 获取当前榜单的数据(喜欢数)
const getRankGroupLove = (req, res) => {
    const rank_name = req.query.rank_name;
    db.query('SELECT bl.book_name,bl.cover_url,bl.detials,bl.book_id,bl.love,bl.click_count,rank_id FROM book_lib bl RIGHT JOIN rank_group rg ON bl.book_id = rg.book_id WHERE rank_name=? ORDER BY love DESC', [rank_name], (err, results) => {
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
                msg: '抱歉当前榜单没有数据呢',
                data: null
            })
        }
    })
}
// 获取当前榜单的数据(点击量)
const getRankGroupClick = (req, res) => {
    const rank_name = req.query.rank_name;
    db.query('SELECT bl.book_name,bl.cover_url,bl.detials,bl.book_id,bl.love,bl.click_count,rank_id FROM book_lib bl RIGHT JOIN rank_group rg ON bl.book_id = rg.book_id WHERE rank_name=? ORDER BY click_count DESC', [rank_name], (err, results) => {
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
                msg: '抱歉当前榜单没有数据呢',
                data: null
            })
        }
    })
}
// 为当前榜单新增书籍
const addRankBook = (req, res) => {
    const rank_id = req.query.rank_id;
    const rank_name = req.query.rank_name;
    const book_id = req.body.book_id;
    const book_name = req.body.book_name;

    if (book_id && book_name) {
        db.query('SELECT * FROM rank_group WHERE book_name=? AND rank_id = ?', [book_name, rank_id], (err, results) => {
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
                    msg: '添加失败,榜单里已经有这本书了',
                    data: null
                })
            }
            db.query('INSERT INTO rank_group (rank_id,rank_name,book_id,book_name) VALUES (?,?,?,?)', [rank_id, rank_name, book_id, book_name], (err, results) => {
                if (err) {
                    console.log(err);
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
// 删除当前榜单的指定书籍
const removeRankGroupBook = (req, res) => {
    const rank_id = req.query.rank_id;
    // const rank_name = req.query.rank_name;
    const book_name = req.body.book_name;
    db.query('SELECT * FROM rank_group WHERE rank_id = ? AND book_name=?',[rank_id, book_name], (err, results)=>{
        if(err){
            return res.status(500).json({
                code: 500,
                msg: '服务端问题,请联系管理员',
                data: null
            })
        }
        if(results.length > 0){
            db.query('DELETE FROM rank_group WHERE book_name=? AND rank_id=?',[book_name, rank_id], (err, results)=>{
                if(err){
                    return res.status(500).json({
                        code: 500,
                        msg: '服务端问题,请联系管理员',
                        data: null
                    })
                }
                if (results.affectedRows>0){
                    return res.status(200).json({
                        code: 200,
                        msg: '删除成功',
                        data: null
                    })
                }else{
                    return res.status(500).json({
                        code: 500,
                        msg: '删除失败',
                        data: null
                    })
                }
            })
        }else{
            return res.status(500).json({
                code: 500,
                msg: '删除失败，当前榜单没有指定书籍',
                data: null
            })
        }
    })
}
module.exports = { getRank, getRankGroup, addRankBook, getRankGroupLove, getRankGroupClick, removeRankGroupBook }