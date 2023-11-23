const userModel = require("../models/userModel");

const register = (req, res) => {
        let user = req.body
         userModel.register(res, user)
};
const login = (req, res) => {
        let user = req.body
         userModel.login(res, user)
};



module.exports = {
    register,
    login
};
