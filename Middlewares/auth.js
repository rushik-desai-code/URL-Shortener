const {getUser}=require('../Services/auth')

function checkForAuthentication(req,res,next){
    const tokenCookie=req.cookies?.token;
    const token=getUser(tokenCookie)
    req.user=token
    return next()
}

function restrictTo(roles){
    return function(req,res,next){
        if (!req.user) return res.redirect('/Login')
        if (!roles.includes(req.user.role)) return res.end('UnAuthorized')
        return next()
    }
}

module.exports={checkForAuthentication,restrictTo}