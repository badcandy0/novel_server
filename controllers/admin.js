/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-03 20:26:25
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-25 15:52:10
 * @FilePath: \novel_server\controllers\admin.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
const db = require('../db')
const auth = require('./auth')
var moment = require('moment');

// 获取管理员信息
const getAdmin = (req,res) => {
    db.query('SELECT * FROM admin',(err,results) => {
        if(err){
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
                data: results
            });
        }
    })
}
// 管理员登录
const login =(req, res)=>{
    const user_name = req.body.user_name
    const password = req.body.password
    

    if (user_name && password) {
        db.query('SELECT * FROM admin WHERE user_name = ?', [user_name], (err, results) => {

            if (err) {
                return res.status(500).json({
                    code: 500,
                    msg: '服务端问题,请联系管理员',
                    data: null
                })
            }

            if (results.length > 0) {
                if (results[0].password === password) {

                    
                    const id = results[0].id
                    // console.log(last_login_time)
                    db.query('UPDATE admin SET last_login_time=? WHERE id=?',[moment().format(),id])

                    // 生成token
                    const token = auth.generateToken({ id: results[0].id })

                    res.status(200).json({
                        code: 200,
                        msg: 'successfully',
                        data: {
                            id: results[0].id,
                            user_name: results[0].user_name,
                            last_login_time: results[0].last_login_time,
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
            }else{
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

module.exports = {login,getAdmin}