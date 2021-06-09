const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    text:{
        type:String,
        required:true
    }
},{ timestamps:true });

const ChatsSchema = new mongoose.Schema({
    users:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    }],
    messages:[messageSchema],
    updatedAt:{
       type:Number,
       default:Date.now
    }
},{ timestamps:true });

ChatsSchema.index({ users:1 })

const Chats = new mongoose.model("Chat",ChatsSchema);

module.exports = Chats;