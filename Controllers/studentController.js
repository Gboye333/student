const structure = require('../model/studentModel')
const nodemailer = require('nodemailer')
const joi = require('joi');
const path = require('path');
const SMTPConnection = require('nodemailer/lib/smtp-connection');



const studentSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  age:  joi.number().integer().min(0).max(21).required(),
  gender: joi.string().valid('male','female','other').required(),
  hobby:joi.string().required(),
})


const createStudent = async (req,res) =>{
  
    try {
      // // Validate the student data against the schema
      const { error, value } = studentSchema.validate(req.body);
      if (error) {
        // If the data does not meet the validation criteria, respond with a 400 Bad Request status
        return res.status(400).json({ message: error.details[0].message });
      }
      // The data is valid, create a new student using the validated data
      const newStudent = new structure({
        name: value.name,
        email: value.email,
        gender: value.gender,
        age: value.age,
        hobby: value.hobby,
        //passport: imagePath,
      });
  
      const savedStudent = await newStudent.save();
     const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'gboyes333@gmail.com',
            pass: "ktszymbkbdmqjghm",
          }
     });
     const message = {
      from: 'gboyes333@gmail.com',
      to : value.email,
      subject: 'Welcome to our student portal',
      text: `Dear ${value.name},\n\nWelcome to our Student Portal! We are excited to have you as a new student.\n\nRegards,\nYour School Team`,
    };
    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
      res.json(savedStudent);
    } catch (error) {
      // If any error occurs during the creation process, respond with a 500 Internal Server Error status
      
      console.error('Error creating student:', error);
      res.status(500).json({ message: 'An error occurred while creating the student.' });
    }

  };
  
  // const sendEmail = async (to, messageContent) =>{
  //     try {
  //       const transporter = nodemailer.createTransport({
  //         host: 'smtp.gmail.com',
  //         port: 587,
  //         secure: false,
  //         auth: {
  //           user: 'gboyes333@gmail.com',
  //           pass: "ktszymbkbdmqjghm" 
  //         }
  //       })
  //       // message object
  //       const message = {
  //         to,
  //         subject : ' New Message From Nodemailer App',
  //         html: `<h1>You have received a new message from nodeMailer apk</h1>
  //         <p>${messageContent}</p>`
  //       }
  //       // send the email
  //        const info =    await transporter.sendMail(message)
  //        console.log('Message sent', info.messageId)
  //     } catch (error) {
  //        console.log(error)
  //        throw new Error('Email could not send')
  //     }
  // }
 

const getSingle =  async (req,res) =>{

  try {
    const studentId = req.params.id
    const specificStudent = await structure.findById(studentId);
    res.json(specificStudent)
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
}

const getAll = async (req,res) => {
try {
    const student = await structure.find();
    res.status(200).json(student)
} catch (error) {
    res.status(404).json({ message:error.mesage }); 
}
}
const update = async(req,res) => {
   try {
    const {passport:imagePath, ...studentBody} = req.body
    const studentId = req.params.id
    
    //if there is an image, then save it into the database
    if(req.files && req.files.image){
      const imagePath = path.join(__dirname, 'public', 'images', req.files.image.name);
      studentBody.passport = imagePath
    }
    const updatedStudent = await structure.findByIdAndUpdate(studentId, studentBody);
    res.status(200).json(updatedStudent)
   } catch (error) {
    res.status(404).json({ message:error.mesage }); 
   }  
}

const deleteS = async(req,res) => {
  try {
    const studentId = req.params.id
    const student = await structure.deleteOne({ _id: studentId });
    res.status(200).json(student)
  } catch (error) {
    res.status(404).json({ message:error.message})
  }
}

module.exports = {
  createStudent, getSingle, getAll, update, deleteS
}

