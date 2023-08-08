const express = require('express');
const router = express.Router();
//const upload = require('express-fileupload');

const {
    createStudent,
    getSingle,
    getAll,
    update,
    deleteS,
} = require('../Controllers/studentController')

// router.use(upload());

router.post("/createStudent",createStudent)
//router.post("/sendEmail", sendEmail)
router.get("/getSingleStudent/:id", getSingle)
router.get("/getAllStudent", getAll)
router.put("/updateStudent/:id",  update)
router.delete("/deleteStudent/:id", deleteS)

module.exports = router

