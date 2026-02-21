const express = require('express');
const router = express.Router();
const Conversation = require('../Models/ConversationSchema')

// Create a new conversation
router.post('/addConversation', async (req, res) => {
    const { participants } = req.body;
    try {
      const newConversation = new Conversation({ participants });
      const savedConversation = await newConversation.save();
      res.status(201).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });