const router = require('express').Router();
const controller = require('./auth.controller');

router.post("/verify", controller.verify);

module.exports = router;