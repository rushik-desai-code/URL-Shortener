//const sessionIdtoUser= new Map()
const jwt=require('jsonwebtoken')
const secret='Rushik@123'

function getUser(token){

    try{
        return jwt.verify(token,secret)
    }
    catch{
        return null
    }
}

function setUser(user){

    return jwt.sign({
        _id:user._id,
        name: user.uname,
        email: user.email,
        role:user.role,
    },secret)
}

module.exports={getUser,setUser}