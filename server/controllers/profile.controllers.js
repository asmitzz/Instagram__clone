const Users = require("../models/user.model");
const Posts = require("../models/post.model");
const Connections = require("../models/connection.model");
const Activities = require("../models/activity.model");

const getUserProfile = async(req, res) => {
    const { user:{ _id } } = req;
   
    try {

        let [userposts, connections] = await Promise.all(
            [
                Posts.find({ postedBy:_id }).select({ file:1,postedBy:1 }).sort({createdAt:-1}).lean(),
                Connections.findById(_id).select({ __v:0,createdAt:0,updatedAt:0 }).lean()
            ])
    
        res.status(200).json({ userposts,connections })
    } catch (error) {
        res.status(500).json({ message:"Something went wrong" })
    }
};

const getViewProfile = async(req,res) => {
    const {user:{ _id }} = req;
    const { userId } = req.params;

    try {
    
        let [userposts,connections,profile,activities] = await Promise.all(
            [
                Posts.find({ postedBy:userId }).select({ file:1,postedBy:1 }).sort({createdAt:-1}).lean(),
                Connections.findById(userId).select({ __v:0,createdAt:0,updatedAt:0 }).lean(),
                Users.findById(userId).select({ gender:0,email:0,__v:0,createdAt:0,updatedAt:0 }).lean(),
                Activities.findById(userId).select({ requests:1 }).lean(),
            ]);

        if(!profile){
           return res.status(404).json({ message:"user not found" })
        }

        if(!connections.followers.find(uid => uid == _id) && profile.private) {
           return res.status(200).json({ userposts:[],profile,connections,activities })
        }

         res.status(200).json({ userposts,profile,connections,activities })
    } catch (error) {
        res.status(500).json({ message:"Something went wrong" })
    }
}

module.exports = { getUserProfile,getViewProfile };