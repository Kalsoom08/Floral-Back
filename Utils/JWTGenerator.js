require('dotenv').config()
const jwt = require('jsonwebtoken')
const Key = process.env.JWT_KEY
const ExpireIn = process.env.JWT_EXPIRE

if(!Key) throw new Error('Missing JWT Key in env')

const signToken = (payload)=>{
   return jwt.sign(payload, Key, {expiresIn: ExpireIn})
}

const verifyToken = (token)=>{
 try {
       return jwt.verify(token, Key)
 } catch (error) {
    throw new Error('Invalid Token')
 }
}

module.exports = {signToken, verifyToken}