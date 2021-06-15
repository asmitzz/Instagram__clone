const mongoose = require("mongoose");

const initializeDB = async (uri) => {
  await mongoose
    .connect(uri, { useCreateIndex: true,useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify:false })
    .then(() => console.log("DB connected"))
    .catch((err) => console.error(err));
};

module.exports = { initializeDB };