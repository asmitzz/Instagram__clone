const Users = require("../models/user.model");
const Posts = require("../models/post.model");
const Connections = require("../models/connection.model");

const getUserProfile = async(req, res) => {
    const { user:{ _id } } = req;
   
    try {

        let [userposts, connections] = await Promise.all(
            [
                Posts.find({ postedBy:_id }).select({ file:1,postedBy:1 }).lean(),
                Connections.findById(_id).select({ __v:0,createdAt:0,updatedAt:0 }).lean()
            ])
    
        if(!connections){
           const connections = await Connections({ _id }).save();
           connections.__v = undefined;
           connections.createdAt = undefined;
           connections.updatedAt = undefined;
           return res.status(200).json({ userposts,connections })
        }
    
        res.status(200).json({ userposts,connections })
    } catch (error) {
        res.status(500).json({ message:"Something went wrong" })
    }
};

const getViewProfile = async(req,res) => {
    const { userId } = req.params;

    try {
    
        let [userposts,connections,profile] = await Promise.all(
            [
                Posts.find({ postedBy:userId }).select({ file:1,postedBy:1 }).lean(),
                Connections.findById(userId).select({ __v:0,createdAt:0,updatedAt:0 }).lean(),
                Users.findById(userId).select({ gender:0,email:0,__v:0,createdAt:0,updatedAt:0 }).lean()
            ]);

        if(!connections){
           const connections = await Connections({ _id:userId }).save();
           connections.__v = undefined;
           connections.createdAt = undefined;
           connections.updatedAt = undefined;
           return res.status(200).json({ posts,profile,connections })
        }

        res.status(200).json({ userposts,profile,connections })
    } catch (error) {
        res.status(500).json({ message:"Something went wrong" })
    }
}

module.exports = { getUserProfile,getViewProfile };