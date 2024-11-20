const user=require('../Models/users')
const {getUser,setUser}=require('../Services/auth')
const {v4:uuidv4}=require('uuid')

async function handleUserSignUp(req,res){
    const {uname,email,password}=req.body;
    await user.create({
        uname,
        email,
        password
    })

    return res.status(200).redirect('/Login')
}

async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const User=await user.findOne({
        email,
        password,
    });

    if (!User){
        return res.render('login',{error_msg:'email or password is incorrect'})
    }
    else{
        const token=setUser(User)
        res.cookie('token',token);
        return res.status(200).redirect('/')//.json({token})

    }
}

module.exports={handleUserSignUp,handleUserLogin}