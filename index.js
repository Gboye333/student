const express = require('express');
const fileUpload = require('express-fileupload');
const app = express()
const mongoose = require('mongoose');
const path = require('path')


mongoose.connect('mongodb+srv://gboyes333:gboyega@cluster0.usifpw0.mongodb.net/studentschema', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentRouter = require('./Routes/studentRoutes')

app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(fileUpload());

//Routes
app.use(studentRouter)

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`)
})