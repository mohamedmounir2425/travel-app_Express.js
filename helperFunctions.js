function resData(res,statusCode,apiStatus,data,mes=''){
    res.status(statusCode).json({
        status:apiStatus,
        data:data,
        message:mes
    })
}

module.exports = resData