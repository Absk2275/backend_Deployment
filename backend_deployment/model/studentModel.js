
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {type:String, required:true},
    email: {type:String, unique:true},
    contact: {type:String, required:true},
    pdfPath: {type:String, required:true},
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;