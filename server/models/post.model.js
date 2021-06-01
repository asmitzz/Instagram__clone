const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    replies:[replySchema]
});

const postSchema = new mongoose.Schema({
     postedBy:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true,
         index:1
     },
     file:{
         type:String,
         required:true
     },
     caption:{
         type:String,
         required:true
     },
     likes:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:true
     }],
     comments:[commentSchema]
},{ timestamps:true });

const Posts = new mongoose.model("Post",postSchema);

module.exports = Posts;