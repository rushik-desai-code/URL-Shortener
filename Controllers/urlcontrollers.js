const Url=require('../Models/url')
const shorturl=require('shortid')

async function handleGetAllUrls(req,res){
    const allUrls = await Url.find()
    return res.json(allUrls)
}

async function handleRedirectShortUrl(req,res){
    const shortId=req.params.shortUrl
    const redirectUrl=await Url.findOneAndUpdate(
        {
            shortnedUrl:shortId,
        },

        {
            $push:{
                visitHistory:{
                    timestamp:Date.now()
                },
            },
        },
    )

    res.redirect(redirectUrl.actualUrl)

}

async function handleCreateShortUrl(req,res){
    const body=req.body
    if (!body.url) return res.status(400).json({error: 'url is required'})
    const shortId=shorturl();
    await Url.create({
        shortnedUrl:shortId,
        actualUrl:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    })
    //const allURLs= await Url.find({})
    res.status(201).render('homepage',{shortid:shortId})//,{urls:allURLs})
    //res.status(201).json({id:shortId})
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortUrl

    const result= await Url.findOne({
        shortnedUrl:shortId
    })
    return res.json({
        TotalClicks:result.visitHistory.length,
        analytics:result.visitHistory
    })
}

module.exports={handleGetAllUrls,handleRedirectShortUrl,handleCreateShortUrl,handleGetAnalytics}