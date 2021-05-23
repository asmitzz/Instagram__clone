const { check } = require("express-validator");
const USERS = require("../models/user.model");

module.exports = [
    check("emailOrUsername", "email or username is required").isLength({min:5}).custom( async(emailOrUsername) => {
        const user = await USERS.findOne({$or:[ {email: emailOrUsername},{username: emailOrUsername} ]});

        if(!user){
            return Promise.reject('User is not registered with us');
        }
    }),
    check("password", "password field is required").isLength({ min: 8 })
]