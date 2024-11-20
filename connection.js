const mongoose=require('mongoose')

async function mongooseConnect(connectionString){
    return mongoose.connect(connectionString)
}

module.exports={mongooseConnect}
