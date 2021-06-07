const Connections = require("../models/connection.model");
const Activities = require("../models/activity.model");
const Posts = require("../models/post.model");
const cloudinary = require("../config/cloudinery.config");
const {validationResult} = require("express-validator");

const getPosts = async(req, res) => {
    const { user:{ _id } } = req;

    const connections = await Connections.findById(_id).lean();

    if(connections){
        const posts = await Posts.find({
            "postedBy": {
                $in:[...connections.following,_id]
            }
        }).select({__v:0,updatedAt:0}).lean().populate({ path:"postedBy",select:"pic username fullname" })
        return res.status(201).json({ posts })
    }
    
    const posts = await Posts.find({ _id }).lean()
    return res.status(201).json({ posts })

}

const checkPost = async(req,res,next,postId) => {
    const post = await Posts.findById(postId).select({__v:0,updatedAt:0});

    if(!post){
        return res.status(404).json({message:"post not found"})
    }

    req.post = post;
    next()
}

const getCommentsOfPost = async(req, res) => {
    let { post } = req;

    await post.execPopulate([{ path:"postedBy",select:"pic username createdAt" },{path:"comments.user",select:"pic username createdAt"},{path:"comments.replies.user",select:"pic username"}])
    res.status(200).json({ post })
}

const uploadPost = async(req,res) => {
    const {file,user:{ _id }} = req;
    const {caption} = req.body;
    const extension = file.originalname.split('.').pop();
    const isVideo = extension === "mp3" || extension === "mp4"

    try {
        const uploadResponse = await cloudinary.uploader.upload(file.path,{
            resource_type: isVideo ? "video" : "image"
        });
        
        await Posts({ postedBy:_id,file:uploadResponse.secure_url,caption }).save(async(err,post) => {
          if(err){
              return res.status(422).json({ message:"Not able to save in DB" })
          }
          if(post){
              await post.execPopulate({ path:"postedBy",select:"pic username fullname" })
              return res.status(200).json({ post,message:"Post uploaded succesfully" })
          }
        });
    } catch (error) {
        res.status(500).json({ message:"something went wrong" })
    }
}

const updateLikesOnPost = async(req,res) => {
   let { post,user:{ _id } } = req;

   // update likes on post
   const isUserAlreadyLiked = post.likes.some(uid => uid == _id);
   isUserAlreadyLiked ? post.likes.remove(_id) : post.likes.push(_id);

   // send the like notification to user
   if( _id != post.postedBy ){
      let activities = await Activities.findById(post.postedBy);
      if(!isUserAlreadyLiked){
         activities.activity.push({ user:_id,text:"liked your post",file:post.file });
      }
      else{
         let removeItem = activities.activity.find(act => act.user == _id && act.file == post.file);
         if(removeItem){
            activities.activity = activities.activity.filter(act => act._id != removeItem._id)
         }
      }
      await activities.save();
   }
   
   await post.save(async(err,post) => {
       if(err){
          return res.status(422).json({ message:err.message})
       }
       if(post){
          await post.execPopulate({path:"postedBy",select:"pic username fullname"})
          return res.status(200).json({ post,message:"Post likes updated successfully" })
       }
   });
   
}

const updateCommentsOnPost = async(req,res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errors.array()[0].msg,
      });
    }
    let { post,user:{ _id } } = req;
    const { comment } = req.body;

   // send the like notification to user

    if( _id != post.postedBy ){
        let activities = await Activities.findById(post.postedBy);
        activities.activity.push({ user:_id,text:`commented: ${comment}`,file:post.file });
        await activities.save();
    }

    // update comments on post
    post.comments.push({ text:comment,user:_id })

    await post.save(async(err,post) => {
        if(err){
           return res.status(422).json({ message:err.message})
        }
        if(post){
           await post.execPopulate({path:"postedBy",select:"pic username"})
           return res.status(200).json({ post,message:"Post comments updated successfully" })
        }
    });
    
}

module.exports = { checkPost,getPosts,getCommentsOfPost,uploadPost,updateLikesOnPost,updateCommentsOnPost };