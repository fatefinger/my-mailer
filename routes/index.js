const express = require('express')
const path = require('path')
const router = express.Router()
const mail = require('../service/mail')

// 创建定时发送任务
mail.timingSend()
/* GET home page. */
// 配置页预留
router.get('/', function (req, res, next) {
    res.sendfile('views\\index.html')
})

module.exports = router;
