const express=require('express')

const{handleGetAllUrls,handleCreateShortUrl,handleGetAnalytics} = require('../Controllers/urlcontrollers.js')

const router=express.Router()

router.get('/',handleGetAllUrls)

router.post('/',handleCreateShortUrl)

router.get('/getanalytics/:shortUrl',handleGetAnalytics)

module.exports=router