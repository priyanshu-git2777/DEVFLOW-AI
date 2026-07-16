import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createChat,
  deleteChat,
  getChat,
  getChats,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", protect, createChat);

router.get("/", protect, getChats);

router.get("/:id", protect, getChat);

router.delete("/:id", protect, deleteChat);

export default router;