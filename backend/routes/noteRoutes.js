const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteControllers');

router.get('/', noteController.getNotes);
router.get('/:id', noteController.viewNote);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
