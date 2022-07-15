function _ (len) {
    let res = ""
    let a = [1, 2, 3, 4, 5, 6, 7, ,8 ,9];
    for(let i = 0; i < len; i++){
        res += Math.floor(Math.random() * a.length)
    }
    return parseInt(res)
}

module.exports = _