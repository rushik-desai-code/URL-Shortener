const express=require('express')
const Url=require('../Models/url')
const{restrictTo}=require('../Middlewares/auth')

const router=express.Router()

router.get('/admin/urls',restrictTo(['ADMIN']),async(req,res)=>{
    const allURLs= await Url.find({
    })
    return res.render('homepage.ejs',{
        urls:allURLs
    })
})

router.get('/',restrictTo(['NORMAL','ADMIN']),async(req,res)=>{
    
    const allURLs= await Url.find({
        createdBy:req.user._id
    })
    return res.render('homepage.ejs',{
        urls:allURLs
    })
})

router.get('/Signup',async(req,res)=>{
    return res.render('signup.ejs')
})

router.get('/Login',async(req,res)=>{
    return res.render('login.ejs')
})
module.exports=router