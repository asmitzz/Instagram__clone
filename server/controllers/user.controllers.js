const Users = require("../models/user.model");
const jwt = require("jsonwebtoken");

const getUsers = async(req, res) =>{
   const { search } = req.params;
   const regex = new RegExp(search,"i")
   const users = await Users.find({
       $or:[
         { fullname:{ $regex: regex} },
         { username:{ $regex: regex} },
         { email:{ $regex: regex} }
       ]
   }).select({ fullname:1,pic:1,username:1 }).lean();

   res.status(200).json({ users });
}

const updateUser = async(req, res) => {
   const { user:{ _id } } = req;
   const { username,fullname,email,bio,pic,private,website,gender } = req.body;

   let userToBeUpdate = await Users.findById(_id)
   userToBeUpdate.username = username;
   userToBeUpdate.fullname = fullname;
   userToBeUpdate.email = email;
   userToBeUpdate.bio = bio;
   userToBeUpdate.private = private;
   userToBeUpdate.pic = pic;
   userToBeUpdate.website = website;
   userToBeUpdate.gender = gender;

   await userToBeUpdate.save((err,user) => {
     if(err){
       res.status(500).json({ message: err.message });
     }
     if(user){
      const { _id,pic,username,fullname,private,website,bio,gender,email } = user;
      // create token
      const token = jwt.sign({ _id,pic,username,fullname,private,website,bio,gender,email },process.env.SECRET_KEY,{ expiresIn:"30d" });
      // send response to frontend
      res.status(200).json({token,login:true,user:{ _id,pic,username,fullname,private,website,bio,gender,email }})
     }
   })
}

module.exports = { getUsers,updateUser }