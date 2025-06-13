const mongoose = require('mongoose');
const Note = require('../models/Note');

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // sort by created time in reverse
    res.status(200).json({ success: true, message: notes });
  } catch (error) {
    console.log('cannot retrieve notes', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const viewNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
    res.status(200).json({ success: true, message: note });
  } catch (error) {
    console.log('cannot view note', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    await note.save();
    res.status(201).json({ success: true, message: 'Note created successfully' });
  } catch (error) {
    console.log('cannot create note', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const newNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!newNote) return res.status(404).json({ success: false, message: 'Note not found' });
    res.status(200).json({ success: true, message: 'Updated note successfully' });
  } catch (error) {
    console.log('cannot update note', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(404).json({ success: false, message: 'Note not found' });
    await Note.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'note deleted successfully' });
  } catch (error) {
    console.log('cannot delete note', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { getNotes, viewNote, createNote, updateNote, deleteNote };
