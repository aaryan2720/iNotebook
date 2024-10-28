const express = require('express');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// ROUTE1: fetching notes from the user who is already logged in using GET method, /api/notes/fetchallnotes. Login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes); // Return the array of notes directly
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// ROUTE2: Adding a note from the user who is already logged in using POST method, /api/notes/addnotes. Login required.
router.post('/addnotes', fetchuser, [
  body("title").isLength({ min: 3 }),
  body("description").isLength({ min: 5 })
], async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id
    });
    const savedNote = await note.save();
    res.json(savedNote); // Return the saved note directly
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
// ROUTE3: Updating an existing  note of the user who is already logged in using PUT method, /api/notes/updatenotes. Login required.
router.put('/updatenotes/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Create a new note object
  const newNote = {};
  if (title) { newNote.title = title; }
  if (description) { newNote.description = description; }
  if (tag) { newNote.tag = tag; }

  try {
    // Find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Check if the user is authorized to update the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ error: "Not authorized to update this note" });
    }

    // Update the note
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

    if (!note) {
      return res.status(404).json({ error: "Note not found after update" });
    }

    res.json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ROUTE4: Deleting an existing  note of the user who is already logged in using DELETE method, /api/notes/deletenotes. Login required.
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    

    try {
        // Find the note to be delete 
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        // Check if the user is authorized to delete the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // delete the note
        note = await Note.findByIdAndDelete(req.params.id);

        res.json({ "Success": "Your note has been deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
