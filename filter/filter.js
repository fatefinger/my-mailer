const mailFilter = (data) => {
    if (data.name && data.name !== null && data.name !== undefined) {
        if (data.address && data.address !== null && data.address !== undefined){
            return true
        }else {
            return false
        }
    }else {
        return false
    }
}
module.exports = {
    mail: mailFilter
}