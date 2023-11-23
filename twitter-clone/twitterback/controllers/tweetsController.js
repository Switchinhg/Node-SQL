const tweetsModel = require("../models/tweetsModel");

const getAll = (req, res) => {
    tweetsModel.getAll(res)
};
const newTweet = (req, res) => {
    let user = req.body 
    tweetsModel.newTweet(res, user)
};



module.exports = {
    getAll,
    newTweet
};
