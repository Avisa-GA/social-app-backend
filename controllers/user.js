

const User = require('../models/user');

module.exports = {
      login,
      signUp,
      allUsers, 
      followUser, 
      unfollowUser, 
      callFollowers
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

async function followUser(req, res) {
    try {
        const user = await User.findOne({_id: req.params.id}); 
        const userToFollow = await User.findOne({firebaseUid: req.user.uid }); 
        user.following.push(userToFollow._id);
        await user.save();
        console.log("I am a user from backend: ", user)
        res.json({message: "success"})
    } catch (error) {
        res.status(400).json(error.message)
    }
}

// unfollow users
async function unfollowUser(req, res) {
    try {
       const userToUnfollow = await User.findOne({_id: req.params.id}); 
       const user = await User.findOne({firebaseUid: req.user.uid }); 
       user.following.pull(userToUnfollow._id); 
       await user.save(); // save changes to database
       res.json({msg: "success" }); // send a generic message back 
    } catch (err) {
       res.status(400).json(err);
    }
 }

//  call all followers
async function callFollowers(req, res) {
    try {
        const allUsers = await User.findOne({"following._id": req.params.id});
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(400).json(err.message);
    }
}