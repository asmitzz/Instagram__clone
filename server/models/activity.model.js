const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     text:{
         type:String,
         required:true
     },
     file:{
        type:String,
        required:false
     },
     createdAt:{
        type:Number,
        default:Date.now
     }
},{ timestamps:true })

const ActivitySchema = new mongoose.Schema({
      _id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
      },
      requests:[
          {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
          }
      ],
      activity:[activitySchema]
},{ timestamps:true });

const Activities = new mongoose.model("Activity",ActivitySchema);

module.exports = Activities;