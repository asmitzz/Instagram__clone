const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("../routes/auth.routes");
const postRoutes = require("../routes/post.routes");
const profileRoutes = require("../routes/profile.routes");
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
        const { _id } = user;
        res.status(200).json({ login:true,token,user:{_id} })
    })

    app.use(authRoutes);
    app.use(verifyToken,postRoutes)
    app.use(verifyToken,profileRoutes);

    app.use("*",(req, res, next) => {
        res.status(404).json({ message:"route not found" })
    })
}

module.exports = App; 
