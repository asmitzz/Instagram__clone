const Connections = require("../models/connection.model");

const checkConnections = async(req, res, next,userId) => {
    const connections = await Connections.findById(userId);
    req.connections = connections;
    next();
}

const getFollowers = async(req,res) => {
    const { connections } = req;
    if(connections){
       await connections.execPopulate({ path:"followers",model:"User",select:"username pic fullname" })
       return res.status(200).json({ followers:connections.followers })
    }
    res.status(404).json({ message:"Followers not found" })
}

const getFollowing = async(req,res) => {
    const { connections } = req;
    if(connections){
        await connections.execPopulate({ path:"following",model:"User",select:"username pic fullname" })
        return res.status(200).json({ following:connections.following })
    }
    res.status(404).json({ message:"Following not found" })
}

module.exports = { checkConnections,getFollowers,getFollowing }