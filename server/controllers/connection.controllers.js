const Connections = require("../models/connection.model");
const Users = require("../models/user.model");
const Activities = require("../models/activity.model");

const checkConnections = async (req, res, next, userId) => {
    const connections = await Connections.findById(userId);
    req.connections = connections;
    next();
};

const getFollowers = async (req, res) => {
    const { userId } = req.params;
    const connections = await Connections.findById(userId);
    
    if (connections) {
        await connections.populate({
            path: "followers",
            select: "username pic fullname",
        }).execPopulate();

        return res.status(200).json({
            followers: connections.followers,
        });
    }
    res.status(404).json({
        message: "Followers not found",
    });
};

const getFollowing = async (req, res) => {
    const { connections } = req;
    if (connections) {

        await connections.populate({
            path: "following",
            select: "username pic fullname",
        }).execPopulate();

        return res.status(200).json({
            following: connections.following,
        });
    }
    res.status(404).json({
        message: "Following not found",
    });
};

const updateConnections = async (req, res) => {
    const {
        user: { _id }
    } = req;
    const { userId } = req.params;

    try {
        let [user, useractivities, userconnections, senderconnections] =
            await Promise.all([
                Users.findById(userId),
                Activities.findById(userId),
                Connections.findById(userId),
                Connections.findById(_id),
            ]);

        const isUserAlreadyFollowed = userconnections.followers.some(_id);

        if(isUserAlreadyFollowed){
            userconnections.followers.remove(_id);
            senderconnections.following.remove(userId);
            await Promise.all([ userconnections.save(),senderconnections.save() ])
            return res.status(200).json({ message:"unfollowed user successfully" })
        }

        // if user account is private
        if (user.private) {          
            useractivities.requests.push(_id);
            return res.status(200).json({
                message: "follow request sent successfully",
            });
        }

        // send notification to user
        useractivities.activity.push({
            user: userId,
            text: "started following you.",
        });

        // update user followers and sender following
        userconnections.followers.push(_id);
        senderconnections.following.push(userId);

        // save updated data
        await Promise.all([ userconnections.save(),senderconnections.save(),useractivities.save() ])

        res.status(200).json({
            connections: senderconnections
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};



module.exports = {
    checkConnections,
    getFollowers,
    getFollowing,
    updateConnections,
};
