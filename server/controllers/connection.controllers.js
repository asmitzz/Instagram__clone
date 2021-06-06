const Connections = require("../models/connection.model");

const checkConnections = (req, res, next,userId) => {
    const connections = await Connections.findById(userId);
    req.followers = connections.followers;
    req.followings = connections.following;
    next();
}

const getFollowers = (req,res) => {
    const { followers } = req;
    if(followers){
       await followers.execPopulate({ path:"followers",model:"User",select:"username pic fullname" })
       return res.status(200).json({ followers })
    }
    res.status(404).json({ message:"Followers not found" })
}

const getFollowing = (req,res) => {
    const { following } = req;
    if(following){
        await following.execPopulate({ path:"followers",model:"User",select:"username pic fullname" })
        return res.status(200).json({ following })
    }
    res.status(404).json({ message:"Followers not found" })
}

module.exports = { checkConnections,getFollowers,getFollowing }