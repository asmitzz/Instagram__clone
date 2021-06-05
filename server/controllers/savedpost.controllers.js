const SavedPosts = require("../models/savedpost.model");
const Posts = require("../models/post.model");

const checkSavedPost = async(req,res,next) => {
    const { user:{ _id } } = req;
    const savedposts = await SavedPosts.findById(_id);

    req.savedposts = savedposts;
    next();
}

const getSavedPosts = async(req,res) => {
    const { savedposts } = req;
    if(savedposts){
        const posts = await Posts.find({
            "_id": {
                $in:savedposts.posts
            }
        },{ updatedAt:0,__v:0 }).lean().populate({ path:"postedBy",select:"pic username" });
        return res.status(200).json({ posts })
    }
    return res.status(404).json({ message:"no savedposts found" })
}

const updatePostsInSavedPost = async(req,res) => {
     const { user:{ _id },savedposts } = req;
     const { postId } = req.params;

     if(savedposts){
         const checkUserAlreadySavedOrNot = savedposts.posts.find(pid => pid == postId)
         checkUserAlreadySavedOrNot ? savedposts.posts.remove(postId) : savedposts.posts.push(postId);

         await savedposts.save(async(err,savedposts) => {
            if(err){
                return res.status(422).json({ message:"not able to save in db" });
            }
            if(savedposts){
                const posts = await Posts.find({
                    "_id": {
                        $in:savedposts.posts
                    }
                },{ updatedAt:0,__v:0 }).lean().populate({ path:"postedBy",select:"pic username" });
                return res.status(200).json({ posts })
            }
         });
        return;
     }
     
     await SavedPosts({ _id,posts:[postId] }).save(async(err,savedposts) => {
        if(err){
            return res.status(422).json({ message:"not able to save in db" });
        }
        if(savedposts){
            const posts = await Posts.find({
                "_id": {
                    $in:savedposts.posts
                }
            },{ updatedAt:0,__v:0 }).lean().populate({ path:"postedBy",select:"pic username" });
            return res.status(200).json({ posts })
        }
     });

}

module.exports = { getSavedPosts,checkSavedPost,updatePostsInSavedPost };