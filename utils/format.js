/**
 * Created by yangfan on 2017/8/12.
 */
const formatOption = function (obj) {
    return new Promise((resolve,reject) =>{
        let option = {
            mailOptions:{
                to: '',
            },
            attachments: [],
            time: {}
        }
        option.time = timeFormat(obj.time)
        let mailAddress = `"${obj.name}"<${obj.address}>`
        option.mailOptions.to = mailAddress
        if (obj.images) {
            while (obj.images.length > 0) {
                option.attachments.push(obj.images[0].path)
                obj.images.shift()
            }
        }
        resolve(option)
    })
}

const timeFormat = function (date) {
    let time = new Date(Date.parse(date))
    let hour = time.getHours()
    let minute = time.getMinutes()
    let second = time.getSeconds()
    let result = {}
    result['hour'] = hour
    result['minute'] = minute
    result['second'] = second
    return result
}
module.exports = {
    formatOption: formatOption,
}