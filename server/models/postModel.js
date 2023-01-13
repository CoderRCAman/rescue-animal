const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
   
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    type : {
        type : String  ,
        required : true 
    }, 
    user_info : {
        type : mongoose.Schema.Types.ObjectId
    }
    
}, {
    timestamps: true
})

module.exports=  mongoose.model('Post', postSchema)
