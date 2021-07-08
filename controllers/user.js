

const User = require('../models/user');

module.exports = {
      login,
      signUp,
      allUsers
};


async function login(req, res) {
    try {
        const user = await User.findOne({firebaseUid: req.user.uid });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

async function signUp(req, res) {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    } 
}

async function allUsers(req, res) {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error.message);
    }
}