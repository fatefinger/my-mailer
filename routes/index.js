const express = require('express')
const path = require('path')
const router = express.Router()
const mail = require('../service/mail')
const conf = require('../conf/conf')

const mailTask01 = new mail({ to: '"杨帆" <532357944@qq.com>'})
console.log(mailTask01.options)
mailTask01.send()

/* GET home page. */
// 配置页预留
router.get('/', function (req, res, next) {
    res.sendfile('public\\index.html')
})

router.post('/task', function (req, res, next) {
    let data = req.body.options
    const task = new mail(data)
    task.send()
})

router.get('/list',function (req, res, next) {

})

module.exports = router;
