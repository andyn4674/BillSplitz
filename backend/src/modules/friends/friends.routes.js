const router = require('express').Router();
const auth = require('../../middleware/auth');
const controller = require('./friends.controller');

// auth is a middleware if passed auth 
// if passed the middleware then go on the controller
router.get('/', auth, controller.getFriends);
router.post('/', auth, controller.addFriend);
router.delete('/', auth, controller.deleteFriend);

module.exports = router;