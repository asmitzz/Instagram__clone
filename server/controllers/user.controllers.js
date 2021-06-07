const Users = require("../models/user.model");

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

module.exports = { getUsers }