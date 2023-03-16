const { getAllMessages, addMessage } = require("../controllers/messagesController");
const { route } = require("./userRoutes");

const router = require("express").Router();

router.post("/add-msg", addMessage);
router.post("/get-all-msg", getAllMessages);

module.exports = router;