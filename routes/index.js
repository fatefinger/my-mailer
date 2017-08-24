const express = require('express')
const path = require('path')
const router = express.Router()
const mail = require('../service/mail/index')
const conf = require('../conf/conf')
const multer = require('multer')
const format = require('../utils/format')
const filter = require('../filter/filter')
const recipient = require('../model/model/recipientModel')

const upload = multer({dest: 'upload/'});
let data = {name: '陈琪', address: 'chen_qi@kedacom.com'}


let id = 0
/* GET home page. */
// 操作台
router.get('/', function (req, res, next) {
    res.sendfile('public\\index.html')
})
// 建立定时发送任务
router.post('/v1/mail', function (req, res, next) {
    let data = req.body
    let entity = recipient(data)
    entity.save()
    filter.mail(data) ?
        format.formatOption(data)
            .then((_) => {
                let option = _.mailOptions
                let attachments = _.attachments
                let time = _.time
                let task = new mail(option, attachments, time)
                task.send()
            })
            .then(
                () => {
                    id++
                    res.send({id: id, status: 'success'})
                }
            )
            .catch((err) => {
                    res.status(405).send({status: 'failed'})
                    console.log(err)
                }
            )
        : res.status(405).send({status: 'failed'})
})
// TODO:数据持久化
router.get('/v1/mail', function (req, res, next) {

})
// 上传图片
router.post('/v1/upload', upload.single('file'), function (req, res, next) {
    let file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.send({
        state: 'success',
        type: file.mimetype,
        name: file.originalname,
        path: file.path,
        size: file.size
    })
})


module.exports = router;
