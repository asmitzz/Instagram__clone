const express = require("express");
const dotenv = require("dotenv");
const http = require("http");

const { initializeDB } = require("./config/db.config"); 

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

require("./config/app.config")(app);
const server = http.createServer(app);

initializeDB(process.env.URI);

// initialize io
const io = require("socket.io")(server,{
    cors:{
        origin:"*",
        method:["GET","POST"]
    }
});

// connect to socket
io.on("connection",(socket) => {
    console.log("connected",socket);
})

server.listen(PORT,() => console.log(`listening on port ${PORT}`));