const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("../routes/auth.routes");
const feedRoutes = require("../routes/feed.routes");
const profileRoutes = require("../routes/profile.routes");
const verifyToken = require("../custom-middlewares/verifyToken.middleware");

const App = (app) => {

    // middlewares
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
    app.use(verifyToken,feedRoutes)
    app.use(verifyToken,profileRoutes)

    app.use("*",(req, res, next) => {
        res.status(404).json({ message:"route not found" })
    })
}

module.exports = App; 
