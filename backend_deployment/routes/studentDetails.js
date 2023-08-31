const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Student = require('../model/studentModel');


const storage = multer.diskStorage({
  destination: path.join(__dirname, './uploads'), 
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });


router.post('/create', upload.single('pdf'), async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const pdfPath = req.file ? req.file.path : '';

    const user = await Student.findOne({email:email});
    if(user){
      return res.status(409).json({
          error:"User Already Exists"
      })
     }
     else{
    const newUser = new Student({
      name,
      email,
      contact,
      pdfPath,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } 
}catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;