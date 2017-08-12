const express = require('express')
const path = require('path')
const router = express.Router()
const mail = require('../service/mail/mail')
const conf = require('../conf/conf')
const multer = require('multer')
const format = require('../utils/format')

const upload = multer({dest: 'upload/'});

/* GET home page. */
// 配置页预留
router.get('/', function (req, res, next) {
    res.sendfile('public\\index.html')
})

router.post('/mail', function (req, res, next) {
    let data = req.body
    format.formatOption(data)
        .then((_) => {
            let task = new mail(_)
            task.send()
        })
        .then(
            () => res.send(200)
        )
        .catch((err) => {
                res.send(500)
                console.log(err)
            }
        )
})

router.get('/mail', function (req, res, next) {

})

router.post('/upload', upload.single('file'), function (req, res, next) {
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
