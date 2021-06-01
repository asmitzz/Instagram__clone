const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
      _id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
      },
      users:[
          {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
          }
      ]
},{ timestamps:true });

const Followers = new mongoose.model("Follower",followerSchema);

module.exports = Followers;