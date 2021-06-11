const Users = require("../models/user.model");
const Posts = require("../models/post.model");
const Connections = require("../models/connection.model");
const Activities = require("../models/activity.model");
const cloudinary = require("../config/cloudinery.config");

const getUserProfile = async(req, res) => {
    const { user:{ _id } } = req;
   
    try {

        let [profile,userposts, connections] = await Promise.all(
            [
                Users.findById(_id).select({ __v:0,createdAt:0,updatedAt:0 }).lean(),
                Posts.find({ postedBy:_id }).select({ file:1,postedBy:1 }).sort({createdAt:-1}).lean(),
                Connections.findById(_id).select({ __v:0,createdAt:0,updatedAt:0 }).lean()
            ])
    
        res.status(200).json({ profile,userposts,connections })
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
};

const updateProfile = async(req, res) => {
    const { user:{ _id },file } = req;
    const { username,fullname,email,bio,pic,private,website,gender } = JSON.parse(req.body.data);
    let userToBeUpdate = await Users.findById(_id);
 
    if(file){
        const extension = file.originalname.split('.').pop();
        const isValidExtension = extension == "jpg" || extension == "jpeg" || extension == "png";

        if(!isValidExtension){
            return res.status(400).json({ message:"Invalid Image Type" })
        }
        const uploadResponse = await cloudinary.uploader.upload(file.path,{
            resource_type: "image"
        });

        userToBeUpdate.username = username;
        userToBeUpdate.fullname = fullname;
        userToBeUpdate.email = email;
        userToBeUpdate.bio = bio;
        userToBeUpdate.pic = uploadResponse.secure_url;
        userToBeUpdate.private = private;
        userToBeUpdate.website = website;
        userToBeUpdate.gender = gender;
    }
    else{
        userToBeUpdate.username = username;
        userToBeUpdate.fullname = fullname;
        userToBeUpdate.email = email;
        userToBeUpdate.bio = bio;
        userToBeUpdate.private = private;
        userToBeUpdate.website = website;
        userToBeUpdate.gender = gender;
    }

    await userToBeUpdate.save((err,user) => {
      if(err){
        res.status(422).json({
            message:`${Object.keys(err.keyValue)[0]} is alreay in use`,
        });
      }
      if(user){
        const { _id,pic,username,fullname,private,website,bio,gender,email } = user;
        res.status(200).json({profile:{ _id,pic,username,fullname,private,website,bio,gender,email }})
      }
    })
 }

module.exports = { getUserProfile,getViewProfile,updateProfile };