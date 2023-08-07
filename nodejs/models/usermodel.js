const mongoose= require('mongoose')
require('../dbconnection/connection')

const UserSchema= mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone_number:{
        type:Number,
        require:true,
    },
    age:{
        type:Number,
        require:true
    }
})

const DataModel= mongoose.model('CSV',UserSchema);

module.exports= DataModel;