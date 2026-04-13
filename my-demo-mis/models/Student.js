const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  grade: { type: String }
}, { timestamps: true }); 

module.exports = mongoose.model('Student', studentSchema);