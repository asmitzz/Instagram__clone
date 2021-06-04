const Posts = require("../models/post.model");
const Connections = require("../models/connection.model");

const getUserProfile = async(req, res) => {
    const { user:{ _id } } = req;
   
    const userposts = await Posts.find({ postedBy:_id }).lean();
    const connections = await Connections.findById(_id).lean().populate([{path:"followers",select:"pic username"},{path:"following",select:"pic username"}]);
    
    if(!connections){
       const connections = await Connections({ _id }).save();
       await connections.populate([{path:"followers",select:"pic username"},{path:"following",select:"pic username"}]);
       return res.status(200).json({ userposts,connections })
    }
    
    res.status(200).json({ userposts,connections })
};

module.exports = { getUserProfile };