const Following = require("../models/following.model");
const Posts = require("../models/post.model");

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

module.exports = { getPosts };