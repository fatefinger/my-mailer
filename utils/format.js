/**
 * Created by yangfan on 2017/8/12.
 */
const formatOption = function (obj) {
    return new Promise((resolve,reject) =>{
        let option = {
            mailOptions:{
                to: '',
            },
            attachments: []
        }
        let mailAddress = `"${obj.name}"<${obj.address}>`
        option.mailOptions.to = mailAddress
        while (obj.images.length > 0){
            option.attachments.push(obj.images[0].path)
            obj.images.shift()
        }
        resolve(option)
    })
}

module.exports = {
    formatOption: formatOption
}