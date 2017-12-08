
const myModule = (function MyModule (){
    const childClass1 = function () {
        const priVal = 'childClass1 priVal'
        const getPrivateVal = function () {
            return priVal
        }
        return {
            getVal: getPrivateVal
        }
    }
    const childClass2 = function () {
        const priVal = 'childClass2 priVal'
        const getPrivateVal = function () {
            return priVal
        }
        return {
            getVal: getPrivateVal
        }
    }

    return {
        child1: childClass1,
        child2: childClass2
    }
})()