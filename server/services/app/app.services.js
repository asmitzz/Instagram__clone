const bodyParser = require("body-parser");
const cors = require("cors");

const App = (app) => {

    // Middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());

    // Routes
    app.get("/",(req, res) => {
        res.send("server is running")
    });

}

module.exports = App; 
