
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = {
     showPost,
     deletePost,
     createPost, 
     addLikes,
     updateLikes, 
     addComments
};


// POST INDEX ROUTE
async function showPost(req, res) {
   // const query = req.query.uid ? {createdBy: req.query.uid} : {};
     try {
        res.json(await Post.find({}).populate('createdBy'));
     } catch (error) {
        console.log(error)
         res.status(400).json(error);
     }
};


// POST DELETE ROUTE
async function deletePost(req, res) {
     try {
        res.json(await Post.findByIdAndRemove(req.params.id));
     } catch (err) {
        res.status(400).json(err);
     }
};

// POST CREATE ROUTE
// POST CREATE ROUTE
async function createPost(req, res) {
   try {
     const user = await User.findOne({firebaseUid: req.user.uid })
     req.body.createdBy = user._id
     res.json(await Post.create(req.body));
   } catch (err) {
     res.status(400).json(err);
   }
}

// LIKES
async function addLikes(req, res) {
   try {
      const post = await Post.findOne({_id: req.params.id}); 
      const user = await User.findOne({firebaseUid: req.user.uid }); 
      post.likes.push(user._id); 
      await post.save(); // save changes to database
      res.json({msg: "success" }); // generic message back 
   } catch (err) {
      res.status(400).json(err);
   }
}

// UPDATE DisLIKES
async function updateLikes(req, res) {
   try {
      const post = await Post.findOne({_id: req.params.id}); 
      const user = await User.findOne({firebaseUid: req.user.uid }); 
      post.likes.pull(user._id); 
      await post.save(); // save changes to database
      res.json({msg: "success" }); // send a generic message back 
   } catch (err) {
      res.status(400).json(err);
   }
}

async function addComments(req, res) {
   try {
      const post = await Post.findOne({_id: req.params.id});
      post.comments.push(req.body);
      await post.save();
      res.json({msg: "success"});
   } catch (err) {
      res.status(400).json(err);
   }
}