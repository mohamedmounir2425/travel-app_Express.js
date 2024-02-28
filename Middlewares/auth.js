const jwt = require('jsonwebtoken');
const userModel = require('../Models/user.model');
const resData = require('../helperFunctions');
const auth = async (req, res, next) => {
    try {
            const token = req.header("Authorization").replace("Bearer ", "");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userData = await userModel.findOne({
                _id: decoded._id,
                "tokens.token": token
            })
            if (!userData) throw new Error("Invalid token")
            req.token = token
            req.user = userData
        next()
    }
    catch (e) {
        resData(res, 500, false, e.message, "unauthorized")
    }
}
const authAdmen = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await userModel.findOne({
            _id: decoded._id,
            isAdmin: "true",
            "tokens.token": token
        })
        if (!userData) throw new Error("Invalid token")
        req.token = token
        req.user = userData
        next()
    }
    catch (e) {
        resData(res, 500, false, e.message, "unauthorized")
    }
}
module.exports = {
    auth,
    authAdmen
}