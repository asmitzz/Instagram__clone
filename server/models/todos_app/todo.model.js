const mongoose = require("mongoose");

const singleTodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    completedBy:{
        type:Date,
        required:true,
        trim:true,
    },
    isComplete:{
        type:Boolean,
        default:false
    },
    saveAsAlarm:{
        type:Boolean,
        default:false
    },
    saveAsNotifications:{
        type:Boolean,
        default:false
    },
});

const TodosSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    todos:[singleTodoSchema]
    
},{ timestamps:true })

const Todos = new mongoose.model("Todo",TodosSchema);

module.exports = Todos;