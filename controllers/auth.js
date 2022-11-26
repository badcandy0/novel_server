/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-03 16:33:20
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-04 10:55:36
 * @FilePath: \badcandy\novel_server\controllers\auth.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
const jwt = require('jsonwebtoken')

const secret = 'badcandy_0215'

module.exports = {
// 登陆成功之后生成token
    generateToken(payload) {
        return jwt.sign(payload, secret, { expiresIn: '7d' })
    },
    // 访问需要权限的接口,需要验证token
    verifyToken(token) {
        return jwt.verify(token, secret)
    }
}