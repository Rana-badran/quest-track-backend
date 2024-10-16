 const express = require("express");
 const router = express.Router();
 const questController = require('../controllers/quest-controller');
const { authorize } = require("../middleware/auth");
 
// GET / gets all quests
router.get('/', questController.getAllQuests);

// POST /create a new quest 
router.post('/', authorize, questController.createQuest);

// PUT /update a quest 
router.put('/:id', questController.updateQuestById);

// DELETE /delete a quest 
router.delete('/:id', questController.deleteQuestById);

module.exports = router;