const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    name: {
     type: String,
     trim:true
    },
    email: {
     type: String,
     trim: true,
     lowercase: true,
     unique: true,
    },
    gender: {
     type: String,
    },
    age: {
     type: Number,
    },
    hobby: {
    type: String,
    },
    passport: {
     type: String
    }
});

module.exports = mongoose.model('structure', studentSchema )
