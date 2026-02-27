const router = require('express').Router();
const auth = require('../../middleware/auth');
const controller = require('./friends.controller');

router.get('/', auth, controller.getFriends);
router.post('/', auth, controller.addFriend);
router.delete('/', auth, controller.deleteFriend);

module.exports = router;