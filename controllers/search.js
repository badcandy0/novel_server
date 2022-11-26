/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-20 14:27:10
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-22 15:37:07
 * @FilePath: \novel_server\controllers\search.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
const db = require('../db')

const search = (req, res)=>{
    const words = req.query.words

    if(words){

        db.query('SELECT book_id,book_name,detials,cover_url,auth_name,love,click_count,`status` FROM book_lib WHERE book_name LIKE \'\%'+words+'\%\' OR auth_name LIKE \'\%'+words+'\%\' OR detials LIKE \'\%'+words+'\%\'  ',(err, results)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    code: 500,
                    msg: '服务端问题,请联系管理员',
                    data: null
                })
            }

            if(results.length > 0){
                res.status(200).json({
                    code: 200,
                    msg: 'successfully',
                    data: results
                });
            }else{
                return res.status(200).json({
                    code: 200,
                    msg: '抱歉，没有找到呢',
                    data: null
                })
            }
        })

    }else{
        return res.status(500).json({
            code:500,
            msg: '请输入内容',
            data:null
        })
    } 
}

module.exports ={search}