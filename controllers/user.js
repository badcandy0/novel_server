/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-03 16:28:55
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-17 11:28:46
 * @FilePath: \novel_server\controllers\user.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
const db = require('../db')

const auth = require('./auth')

// 获取全部用户信息
const getAllUsers = (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
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
// 获取当前用户所有信息
const getUser = (req, res) => {
    const user_id = req.query.user_id;
    const user_name = req.query.user_name;

    db.query('SELECT * FROM user WHERE user_id=? OR user_name=?', [user_id, user_name], (err, results) => {
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
                msg: '当前用户不存在',
                data: null
            })
        }

    })
}
// 登录接口
const login = (req, res) => {
    console.log('====================================');
    console.log(1111);
    console.log('====================================');
    const user_name = req.body.user_name
    const password = req.body.password

    if (user_name && password) {
        db.query('SELECT * FROM user WHERE user_name = ?', [user_name], (err, results) => {

            if (err) {
                return res.status(500).json({
                    code: 500,
                    msg: '服务端问题,请联系管理员',
                    data: null
                })
            }

            if (results.length > 0) {
                if (results[0].password === password) {

                    // 生成token
                    const token = auth.generateToken({ id: results[0].id })

                    res.status(200).json({
                        code: 200,
                        msg: 'successfully',
                        data: {
                            user_id: results[0].user_id,
                            user_name: results[0].user_name,
                            avatar_url: results[0].avatar_url,
                            token: token
                        }
                    });
                } else {
                    res.status(200).json({
                        code: 404,
                        msg: 'failed',
                        data: null
                    });
                }
            } else {
                res.status(200).json({
                    code: 404,
                    msg: '用户名不存在',
                    data: null
                });
            }
        })
    } else {
        res.status(200).json({
            code: 404,
            msg: '请输入账号密码',
            data: null
        });
    }

}
// 注册
const register = (req, res) => {

    const user_name = req.body.user_name
    const password = req.body.password

    if (user_name && password) {
        db.query('SELECT * FROM user WHERE user_name = ?', [user_name], (err, results) => {

            if (results.length > 0) {
                return res.status(500).json({
                    code: 500,
                    msg: '用户名重复,请重新输入',
                    data: null
                })
            }

            db.query('INSERT INTO user (user_name,password) VALUES (?, ?)', [user_name, password], (err, results) => {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        msg: '服务端问题,请联系管理员',
                        data: null
                    })
                }
                // console.log(results)
                res.status(200).json({
                    code: 200,
                    msg: '注册成功',
                    data: null
                });

            })
        })
    } else {
        return res.status(500).json({
            code: 500,
            msg: '用户名或密码为空，请输入',
            data: null
        })
    }
    // res.send('PUT request to register')
}

module.exports = { login, register, getUser, getAllUsers }