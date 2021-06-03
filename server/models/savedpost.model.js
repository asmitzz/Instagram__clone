const mongoose = require("mongoose");

const SavedPostsSchema = new mongoose.Schema({
    _id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }]
},{ timestamps:true });

const SavedPosts = new mongoose.model("SavedPost",SavedPostsSchema);

module.exports = SavedPosts;