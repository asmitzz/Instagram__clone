const { check } = require("express-validator");
const USERS = require("../models/user.model");

module.exports = [
    check("emailOrUsername", "email or username is required").isLength({min:5}).custom( async(emailOrUsername) => {
        const user = await USERS.findOne({$or:[ {email: emailOrUsername},{username: emailOrUsername} ]});

        if(!user){
            return Promise.reject(`The username you entered doesn't belong to an account. Please check your username and try again.`);
        }
    }),
    check("password", "password field is required").isLength({ min: 8 })
]