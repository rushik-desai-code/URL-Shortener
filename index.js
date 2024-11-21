const express=require('express')
const {mongooseConnect} = require('./connection')

const router=require('./Routes/routes')
const staticRouter=require('./Routes/static_routes')
const userRouter=require('./Routes/user_routes')
const cookieParser=require('cookie-parser')
const {checkForAuthentication,restrictTo}=require('./Middlewares/auth')

const path=require('path')
const {handleRedirectShortUrl}=require('./Controllers/urlcontrollers')
const PORT=8000

const app=express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(checkForAuthentication)

mongooseConnect("mongodb://localhost:27017/UrlMap")

app.set("view engine",'ejs')
app.set('views',path.resolve('./Views'))

app.use('/user',userRouter)
app.use('/',staticRouter)
app.use('/url',restrictTo(['NORMAL','ADMIN']),router)

app.get('/url/:shortUrl',handleRedirectShortUrl)

app.listen(PORT,() => console.log(`Server Started at PORT:${PORT}`))



