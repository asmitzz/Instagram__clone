const mongoose = require("mongoose");

const ConnectionSchema = new mongoose.Schema({
      _id:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
      },
      followers:[
          {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
          }
      ],
      following:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
        }
      ]
},{ timestamps:true });

const Connections = new mongoose.model("Connection",ConnectionSchema);

module.exports = Connections;