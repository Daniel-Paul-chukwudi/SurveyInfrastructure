const DB = require('../dummyData.json')
const jwt = require('jsonwebtoken')

exports.checkLogin = async (req,res,next)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Please login again to continue'
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    
        const user = await userModel.findByPk(decoded.id);

        if (user === null) {
            return res.status(404).json({
                message: 'Authentication Failed: User not found'
            })
        }
        req.user = decoded;
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Session expired, Please login again to continue'
            })
        }
        res.status(500).json({
            message:"internal server error",
            error: error.message
        })
    }
}