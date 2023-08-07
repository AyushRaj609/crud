const mongoose= require('mongoose')
const uri= process.env.DATABASE_URL;

function Connect(){

    mongoose.connect(
        uri,
        {
            useUnifiedTopology:true,
            useNewUrlParser:true,
        }
    ).then(()=>{
        console.log("Connect To DB");
    }).catch((e)=>{
        Connect();
        console.log("Error:: "+e)
    })
}

Connect()