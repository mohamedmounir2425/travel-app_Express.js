function resData(res,statusCode,apiStatus,data,mes=''){
    res.status(statusCode).json({
        status:apiStatus,
        data:data,
        message:mes
    })
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

module.exports = {resData, shuffleArray}