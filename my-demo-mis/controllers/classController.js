const Class = require('../models/Class');

exports.createClass = async (req, res) => {
  try {
    const { className, subject, teacherId, studentIds } = req.body;
    
    const newClass = new Class({
      className,
      subject,
      teacher: teacherId,
      students: studentIds 
    });

    await newClass.save();
    res.status(201).json({ success: true, data: newClass });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getTeacherStudents = async (req, res) => {
  try {
    const classes = await Class.find({ teacher: req.user.id }).populate('students');
    res.status(200).json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};