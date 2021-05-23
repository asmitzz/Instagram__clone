const { check } = require("express-validator");
const USERS = require("../models/user.model");

module.exports = [
    check("email","email is required").isEmail().custom( async(email) => {
        const user = await USERS.findOne({email});
        if(user){
            return Promise.reject('E-mail already in use');
        }
    }),
    check("username","username should be at least 5 characters").isLength({ min:5 }).custom( async(username) => {
        const user = await USERS.findOne({username});
        if(user){
            return Promise.reject('Username already in use');
        }
    }),
    check("password","password should be at least 8 characters").isLength({ min:8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/),
    check("fullname","fullname should be at least 3 characters").isLength({ min:3 })
]