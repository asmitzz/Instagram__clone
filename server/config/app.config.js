const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("../routes/auth.routes");
const postRoutes = require("../routes/post.routes");
const profileRoutes = require("../routes/profile.routes");
const savedpostRoutes = require("../routes/savedpost.routes");
const connectionRoutes = require("../routes/connection.routes");
const activityRoutes = require("../routes/activity.routes");
const userRoutes = require("../routes/user.routes");
const chatsRoutes = require("../routes/chat.routes");

const verifyToken = require("../custom-middlewares/verifyToken.middleware");
const multer = require("multer");

const App = (app) => {

    const upload = multer({
        dest:"uploads/",
        limits:100*1024*1024,
    });

    // middlewares
    app.use(upload.single("file"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    // routes
    app.get("/",(req, res) => {
        res.send("server is running")
    });

    app.get("/protected",verifyToken,(req,res) => {
        const { user,token } = req;
        res.status(200).json({ login:true,token,user })
    })

    app.use(authRoutes);
    app.use("/posts",verifyToken,postRoutes);
    app.use("/profile",verifyToken,profileRoutes);
    app.use("/savedposts",verifyToken,savedpostRoutes);
    app.use("/connections",verifyToken,connectionRoutes);
    app.use("/activities",verifyToken,activityRoutes);
    app.use("/users",verifyToken,userRoutes);
    app.use("/chats",verifyToken,chatsRoutes);

    app.use("*",(req, res, next) => {
        res.status(404).json({ message:"route not found" })
    })

    app.use((err,req, res, next) => {
        console.log(err.stack);
        res.status(500).json({ message:"Internal server error" })
    })
}

module.exports = App; 
