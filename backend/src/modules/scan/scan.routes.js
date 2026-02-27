const router = require("express").Router();
const controller = require("./scan.controller");
const auth = require("../../middleware/auth");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { filesize: 10 * 1024 * 1024 }, // 10mb max
});

router.post("/", auth, upload.single('image'), controller.scanReceipt);

module.exports = router;