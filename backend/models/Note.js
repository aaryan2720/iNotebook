// models/Note.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tag: { type: String, default: "General" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Assuming 'User' is the name of your user model
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
