// import { User } from '../DB';
const {JWT_SECRET} = require('../config');
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message:'Invaild Authorization'
        })
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        if(payload.userId){
            req.userId = payload.userId;
            next();
        }
        else{
            return res.status(403).json({})
        }
        
    }
    catch(e){
        return res.status(403).json({})
    }
}
module.exports = {authMiddleware}