// Variables
let express = require('express');
let router = express.Router();
// Import StudentInfo model:
let StudentInfo = require('../models/student_info');
let SubjectInfo = require('../models/subject_info');
let Grade = require('../models/subject_grade_info');

//====== Auth function for user login ===========================================================================
router.post('/auth', function (req, res) {
    StudentInfo.auth(req.body.student_id, req.body.student_pin, function (err, data) {
        if (err) res.send(err);
        console.log(data);
        //Complete! sendback
        res.send(data);
    });
});

// ====== START STUDENT_INFO ROUTES ==============================================================================
/**
 * @title GET REQUEST, getAllStudentInfo()
 * @desc gets all students info from the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
router.get('/students', function (req, res) {
    StudentInfo.getAllStudentsInfo(function (err, data) {
        if (err) res.send(err);
        console.log(data);
        //Complete! sendback
        res.send(data);
    });
}); // End GET REQUEST

/**
 * @title CREATE STUDENT REQUEST.
 * @desc posts the created student object to the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
router.post('/students', function (req, res) {
    //New student object created from values passed in the body of the URL POST Request
    let new_student = new StudentInfo({
        student_id: req.body.student_id,
        student_first_name: req.body.student_first_name,
        student_last_name: req.body.student_last_name,
        student_pin: req.body.student_pin
    });

    // Handle for null errors if any
    if (!new_student.student_id || !new_student.student_first_name || !new_student.student_last_name) {
        res.status(400).send({error: true, message: 'Please provide all criteria!'});
    } else {
        StudentInfo.createStudent(new_student, function (err, data) {
            if (err) res.send(err);
            //Complete!
            res.json(data); //sendback request
        });
    }// End if else
});//End POST REQUEST function

/**
 * @title DELETE REQUEST
 * @desc deletes a student by its id number from the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
router.delete('/students/:id', function (req, res) {
    StudentInfo.delete(req.params.student_id, function (err, data) {
        if (err) res.send(err);
        //Complete!
        res.json({message: 'Student successfully deleted'}, data);
    });
});//End DELETE REQUEST

// ====== END STUDENT_INFO ROUTES ================================================================================

/**
 * @title GET ALL SUBJECTS REQUEST, getAllSubjectInfo()
 * @desc gets all students info from the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
router.get('/students/subjects/:student_id', function (req, res) {
    SubjectInfo.getAllSubjectInfo(req.params.student_id, function (err, data) {
        if (err) res.send(err);
        console.log(data);
        //Complete! sendback
        res.send(data);
    });
}); // End GET REQUEST

/**
 * @title GET SUBJECT REQUEST, getSubject()
 * @desc gets a subject from a students records by the subject ID
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
router.get('/students/subjects/subject/:student_id&:id', function (req, res) {
    console.log(req.body.student_id, req.params.id);
    SubjectInfo.getSubject(req.params.student_id, req.params.id, function (err, data) {
        if (err) res.send(err);
        console.log(data);
        //Complete! sendback
        res.send(data);
    });
}); // End GET REQUEST


/**
 * @title CREATE NEW SUBJECT REQUEST.
 * @desc posts the created student object to the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
router.post('/students/subjects/', function (req, res) {
    //New student object created from values passed in the body of the URL POST Request
    let new_subject = new SubjectInfo({
        student_id: req.body.student_id,
        subject_name: req.body.subject_name,
        subject_desc: req.body.subject_desc
    });

    console.log(req.body.student_id, req.body.subject_name, req.body.subject_desc);

    // Handle for null errors if any
    if (!new_subject.student_id || !new_subject.subject_name) {
        res.status(400).send({error: true, message: 'Please provide all criteria!'});
    } else {
        SubjectInfo.createSubject(new_subject, function (err, data) {
            if (err) res.send(err);
            //Complete!
            res.json(data); //sendback request
        });
    }// End if else
});//End POST REQUEST function


router.put('/students/subjects/subject/:id', function (req, res) {
    //New student object created from values passed in the body of the URL POST Request
    let updatedSubject={
        subject_name: req.body.subject_name,
        subject_desc: req.body.subject_desc
    };

    console.log(updatedSubject);
    // Handle for null errors if any
    if (!updatedSubject.subject_name) {
        res.status(400).send({error: true, message: 'Please provide a subject name'});
    } else {
        SubjectInfo.update(updatedSubject, req.params.id, function (err, data) {
            if (err) res.send(err);
            //Complete!
            res.json(data); //sendback request
        });
    }// End if else
});//End POST REQUEST function


/**
 * @title DELETE REQUEST
 * @desc deletes a subject by its id number from the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
router.delete('/students/subjects/:id', function (req, res) {
    SubjectInfo.delete(req.params.id, function (err, data) {
        if (err) res.send(err);
        //Complete!
        res.json(data);
    });
});//End DELETE REQUEST

// ====== END SUBJECT_INFO ROUTES ================================================================================

/**
 * @title GET REQUEST, getAllSubjectInfo()
 * @desc gets all students info from the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
router.get('/students/subjects/grades', function (req, res) {
    Grade.getAllGrades(function (err, data) {
        if (err) res.send(err);
        console.log(data);
        //Complete! sendback
        res.send(data);
    });
}); // End GET REQUEST

/**
 * @title CREATE SUBJECT REQUEST.
 * @desc posts the created student object to the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
router.post('/students/subject/grades', function (req, res) {
    //New student object created from values passed in the body of the URL POST Request
    let new_grade = new Grade({
        student_id: req.body.student_id,
        subject_name: req.body.subject_name,
        grade_type: req.body.grade_type,
        grade_weight: req.body.grade_weight,
        curr_grade: req.body.curr_grade
    });

    // Handle for null errors if any
    if (!new_grade.student_id || !new_grade.subject_name || !new_grade.grade_type || !new_grade.grade_weight || !new_grade.curr_grade) {
        res.status(400).send({error: true, message: 'Please provide all criteria!'});
    } else {
        SubjectInfo.createSubject(new_grade, function (err, data) {
            if (err) res.send(err);
            //Complete!
            res.json(data); //sendback request
        });
    }// End if else
});//End POST REQUEST function

/**
 * @title DELETE REQUEST
 * @desc deletes a subject by its id number from the database.
 * @note executes immediately, passing results to callback. Logs the data to the server console.
 */
router.delete('/students/subjects/grades/:id', function (req, res) {
    StudentInfo.delete(req.params.student_id, function (err, data) {
        if (err) res.send(err);
        //Complete!
        res.json({message: 'Grade successfully deleted'}, data);
    });
});//End DELETE REQUEST

// Export router as a module.
module.exports = router;

