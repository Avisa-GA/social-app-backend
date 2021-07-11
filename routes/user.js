const router = require('express').Router();
const userCtrl = require('../controllers/user');

// Check if user has been authenticated
function isAuthenticated(req, res, next) {
    if(!req.user) {
        return res.status(401).json({error: 'authentication required'});
    } else {
        next();
    }
  }

// login user
router.get('/api/users/login',isAuthenticated ,userCtrl.login);

// get all users
router.get('/api/users', userCtrl.allUsers);

// get all followers
router.get('/api/users/:id/followers',isAuthenticated, userCtrl.callFollowers);

// create a user
router.post('/api/users/signup',isAuthenticated, userCtrl.signUp);

// Following user
router.post('/api/users/:id/follow', isAuthenticated, userCtrl.followUser);

// UnFollow user 
router.post('/api/users/:id/unfollow', isAuthenticated, userCtrl.unfollowUser);



module.exports = router;