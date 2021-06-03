const Following = require("../models/following.model");
const Posts = require("../models/post.model");
const cloudinary = require("../config/cloudinery.config");

const checkPost = async(req,res,next,postId) => {
    const post = await Posts.findById(postId);

    if(!post){
        return res.status(404).json({message:"post not found"})
    }

    req.post = post;
    next()
}

const getPosts = async(req, res) => {
    const { user:{ _id } } = req;

    const following = await Following.findById(_id).lean();

    if(following && following.users){
        const posts = await Posts.find({
            "postedBy": {
                $in:[...following.users,_id]
            }
        }).lean().populate({ path:"postedBy",select:"pic username" }).populate({ path:"comments.user", select:"username" })
        return res.status(201).json({ posts })
    }
    
    const posts = await Posts.find({ _id }).lean().populate({ path:"comments.user", select:"username" })
    return res.status(201).json({ posts })

}

const uploadPost = async(req,res) => {
    const {file,user:{ _id }} = req;
    const {caption} = req.body;

    try {
        const uploadResponse = await cloudinary.uploader.upload(file.path);

        await Posts({ postedBy:_id,file:uploadResponse.secure_url,caption }).save(async(err,post) => {
          if(err){
              return res.status(422).json({ message:"Not able to save in DB" })
          }
          if(post){
              await post.populate({ path:"postedBy",select:"pic username" })
              return res.status(200).json({ post,message:"Post uploaded succesfully" })
          }
        });
    } catch (error) {
        res.status(500).json({ message:"something went wrong" })
    }
}

const updateLikesOnPost = async(req,res) => {
   let { post } = req;
   const { userId } = req.params;

   const checkUserAlreadyLikedOrNot = post.likes.find(uid => uid == userId)
   checkUserAlreadyLikedOrNot ? post.likes.remove(userId) : post.likes.push(userId)
   await post.save((err,post) => {
       if(err){
          return res.status(422).json({ message:err.message})
       }
       if(post){
          return res.status(200).json({ post,message:"Post likes updated successfully" })
       }
   });
   
}

module.exports = { checkPost,getPosts,uploadPost,updateLikesOnPost };