const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("../routes/auth.routes");
const jwt = require("jsonwebtoken");

const App = (app) => {

    // Middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    const checkAuth = (req,res,next) => {
        const token = req.headers.authorization.split(" ")[1];
        try {
           if(token){
              const decoded = jwt.verify(token,process.env.SECRET_KEY);
              req.user = decoded;
              req.token = token;
              next()
           }
        } catch (error) {
           return res.status(401).json({message:"Auth failed"})
        }
    }

    // Routes
    app.get("/",(req, res) => {
        res.send("server is running")
    });

    app.get("/protected",checkAuth,(req,res) => {
        const { user,token } = req;
        const { _id } = user;
        res.status(200).json({ login:true,token,user:{_id} })
    })

    app.use(authRoutes);

}

module.exports = App; 
