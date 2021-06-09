const Chats = require("../models/chat.model");

const checkChat = async(req,res,next,userId) => {
    const { user:{ _id } } = req;

    if(_id == userId){
      return res.status(400).json({ message:"Bad request" })
    }
    
    let chat = await Chats.findOne({ $or: [{ users:[_id,userId] }, { users:[userId,_id] }] }).select({ messages:1 }).lean();
    if(!chat){
        let creatChat = await Chats({ users:[_id,userId] }).save()
        req.chat = creatChat;
        next();
        return
    }
    req.chat = chat;
    next();
}

const accessChat = async(req,res) => {
    const { chat } = req;
    res.status(200).json({ chat })
}

const getAllChats = async(req, res) => {
    const { user:{ _id } } = req;
    const chats = await Chats.find({
        "users":{
            $in:[_id]
        }
    }).populate({path:"messages.user",select:"pic"}).populate({ path:"users",select:"pic username" }).lean().select({ messages:1,users:1,updatedAt:1 }).sort({ updatedAt:-1});
    res.status(200).json({ chats })
}

const sendmessage = async(req, res) => {
    const { user:{ _id } } = req;
    const { chatId } = req.params;
    const { text } = req.body;
    let chat = await Chats.findById(chatId).select({ createdAt:0 });
    chat.messages.push({ text,user:_id });
    await chat.save(async(err,chat) => {
        if(chat){
            await chat.populate({path:"messages.user",select:"pic"}).populate({ path:"users",select:"pic username" }).execPopulate();
            res.status(200).json({ chat })
        }
    });
}

module.exports = { checkChat,accessChat,getAllChats,sendmessage }