const messagesModel = require("../models/chatModel");
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messagesModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added Successfully!!" });
    return res.json({ msg: "Failed to add messages to the database!!" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messagesModel
      .find({
        users: {
          $all: [from, to],
        },
      })
      .sort({ updatedAt: 1 });
    const projectedMessages = messages.map((message) => {
      return {
        fromSelf: message.sender.toString() === from,
        message: message.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    next(error);
  }
};
