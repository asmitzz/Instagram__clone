const Connections = require("../models/connection.model");
const Activities = require("../models/activity.model");

const getUserActivity = async(req, res) => {
    const { user:{ _id } } = req;
    
    const activities = await Activities.findById(_id).select({ __v:0,createdAt:0,updatedAt:0 })
    .populate([{ path:"requests",select:"username pic" },{path:"activity.user",select:"pic username"}])
    .lean();

    res.status(200).json({ activities })
}

const confirmFollowRequest = async (req, res) => {
    const { userId } = req.params;
    const {
        user: { _id }
    } = req;

    try {
        let [yourconnections,userconnections,youractivities,useractivities] = await Promise.all(
            [
                Connections.findById(_id),
                Connections.findById(userId),
                Activities.findById(_id),
                Activities.findById(userId),
            ]);

        // update user followers and senders following
        yourconnections.followers.push(userId);
        userconnections.following.push(_id);

        // delete request from activities
        youractivities.requests.remove(userId);

        // push notification
        youractivities.activity.push({
             user: userId,
             text: "started following you.",
        });

        useractivities.activity.push({ 
            user:_id,
            text:"accepted your request"
        })

        // save all data
        await Promise.all([yourconnections.save(),userconnections.save(),youractivities.save(),useractivities.save()])
        await youractivities.populate([{ path:"requests",select:"username pic" },{path:"activity.user",select:"pic username"}]).execPopulate()
        return res.status(200).json({ activities:youractivities,connections:yourconnections});
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteFollowRequest = async (req, res) => {
    const { userId } = req.params;
    const { user: { _id } } = req;

    try {
        // get user activities
        let activities = await Activities.findById(_id);

        if (userId) {
            // delete request from activities
            activities.requests.remove(userId);
            await activities.save(async(err,activities) => {
                if(activities){
                   await activities.populate([{ path:"requests",select:"username pic" },{path:"activity.user",select:"pic username"}]).execPopulate()
                   return res.status(200).json({ activities });
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { getUserActivity,confirmFollowRequest,deleteFollowRequest }