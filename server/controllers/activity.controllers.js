const Activities = require("../models/activity.model");

const getUserActivity = async(req, res) => {
    const { user:{ _id } } = req;
    const activities = await Activities.findById(_id).select({ __v:0,createdAt:0,updatedAt:0 })
    .populate([{ path:"requests",select:"username pic" },{ path:"activity.user",select:"pic username" }])
    .lean();

    if(!activities){
       const createActivities = await Activities({ _id }).save();
       await createActivities.execPopulate([{ path:"requests",select:"username pic" },{ path:"activity",populate:"user",select:"pic username" }])
       return res.status(200).json({ activities:createActivities })
    }
    res.status(200).json({ activities })
}

module.exports = { getUserActivity }