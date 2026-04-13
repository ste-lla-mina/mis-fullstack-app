const Student = require('../models/Student');
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ success: true, data: student });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getStudentById = async(req,res)=>{
    try{
        const student = await Student.findById(req.params.id);
        if(!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json({success: true, data: student });
    }
    catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteStudent = async (req,res) =>{
    try{
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message: "Student deleted" });
    }
    catch(error){
        res.status(500).json({success:false, error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};