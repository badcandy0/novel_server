/*
 * @Author: Badcandy 568197314@qq.com
 * @Date: 2022-11-04 09:09:39
 * @LastEditors: Badcandy 568197314@qq.com
 * @LastEditTime: 2022-11-04 09:14:49
 * @FilePath: \badcandy\novel_server\controllers\moment.js
 * @Description: 
 * 
 * Copyright (c) 2022 by Badcandy 568197314@qq.com, All Rights Reserved. 
 */
var moment = require('moment');

moment.locale('zh-cn');
  var today = {};
  var _today = moment();
  today.year = _today.format('yyyy'); /*现在的年*/
  today.date = _today.format('YYYY-MM-DD'); /*现在的时间*/
  today.yesterday = _today.subtract(1, 'days').format('YYYY-MM-DD'); /*前一天的时间*/
 
  var formatDate = moment().format('YYYY-MM-DD HH:mm:ss'); /*格式化时间*/

module.exports = {
    today,
    _today,
    formatDate
}