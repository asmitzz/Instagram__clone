const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    try {
       if(token){
          const decoded = jwt.verify(token,process.env.SECRET_KEY);
          req.user = decoded;
          req.token = token;
          next();
       }
    } catch (error) {
       return res.status(401).json({message:"Auth failed"})
    }
}

module.exports =  verifyToken;   