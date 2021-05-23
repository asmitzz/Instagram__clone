const mongoose = require("mongoose");

const initializeDB = async (uri) => {
  await mongoose
    .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DB connected"))
    .catch((err) => console.error(err));
};

module.exports = { initializeDB };
