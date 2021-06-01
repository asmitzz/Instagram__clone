const Users = require("../models/user.model");
const Followers = require("../models/follower.model");
const Following = require("../models/following.model");

const checkUserProfile = async(req,res,next,userId) => {
    const userprofile = await Users.findOne({ _id:userId},{ _id:0,pic:1,private:1,posts:1,fullname:1,username:1 }).lean();
    const followers = await Followers.findById(userId);
    const followings = await Following.findById(userId);

    if(!userprofile){
        return res.status(404).json({ message:"User not found" });
    }
    
    req.userprofile = userprofile;
    req.followers = followers;
    req.followings = followings;
    next();
}

const getUserProfile = (req, res) => {
    const { userprofile,followers,followings } = req;
    res.status(201).json({ userprofile,followers,followings })
}

module.exports = { checkUserProfile,getUserProfile }