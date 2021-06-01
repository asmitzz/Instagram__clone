const mongoose = require("mongoose");

const followingSchema = new mongoose.Schema({
      _id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
      },
      users:[
          {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
          }
      ]
},{ timestamps:true });

const Followings = new mongoose.model("Following",followingSchema);

module.exports = Followings;