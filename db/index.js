/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-03 16:18:22
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-03 16:19:24
 * @FilePath: \badcandy\novel_server\db\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var mysql = require('mysql')
const config = require('../config')

const pool = mysql.createPool({
    database: config.database,
    user: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
})

module.exports = pool