const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
});

const CommentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    replies:[ReplySchema]
});

const PostSchema = new mongoose.Schema({
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
         ref:"User"
     }],
     comments:[CommentSchema]
},{ timestamps:true });

const Posts = new mongoose.model("Post",PostSchema);

module.exports = Posts;