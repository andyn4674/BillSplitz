const router = require("express").Router();
const auth = require('../../middleware/auth');
const controller = require("./group.controller")

router.get("/", auth, controller.getGroups);
router.post("/", auth, controller.createGroup);
router.delete("/:id", auth, controller.deleteGroup);
router.post("/:id/members", auth, controller.addMember);
router.delete("/:id/members/:friendId", auth, controller.removeMember);

module.exports = router;