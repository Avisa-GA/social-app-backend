const router = require('express').Router()
const postCtrl = require('../controllers/post')

// Check if user has been authenticated
function isAuthenticated(req, res, next) {
    if(!req.user) {
        return res.status(401).json({error: 'authentication required'});
    } else {
        next();
    }
  }
// Get - home
router.get('/post', postCtrl.showPost);

// Delete / post/:id
router.delete('/post/:id',isAuthenticated, postCtrl.deletePost)

// Post / post
router.post('/post',isAuthenticated, postCtrl.createPost);

// Post / comments
// router.post('/posts/:id/comments', postCtrl.addComments)

// Post / likes
router.post('/post/:id/like',isAuthenticated, postCtrl.addLikes);

// Post / disLike
router.post('/post/:id/dislike',isAuthenticated, postCtrl.updateLikes);

module.exports = router