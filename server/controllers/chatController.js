import Chat from "../models/Chat.js";

export async function createChat(req, res) {
  try {
    const { title } = req.body;

    const chat = await Chat.create({
      user: req.user._id,
      title: title || "New Chat",
      messages: [],
    });

    res.status(201).json({
      success: true,
      chat,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getChats(req, res) {
  try {
    const chats = await Chat.find({
      user: req.user._id,
    }).sort({
      updatedAt: -1,
    });

    res.json({
      success: true,
      chats,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function getChat(req, res) {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chat)
      return res.status(404).json({
        success: false,
      });

    res.json({
      success: true,
      chat,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

export async function deleteChat(req, res) {
  try {
    await Chat.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}