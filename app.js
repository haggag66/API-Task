const express = require("express");
const app = express();
const PORT = 8080;

let students = []
let doctors = []

app.use(express.json())

app.post("/student/hardcoded", (req, res) => {
    const newStudent = {
        name: "Ahmed",
        age: 20,
        level: "Sophomore",
        address: "Nowhere" 
    };

    students.push(newStudent);
    console.log(students);
    
    // 201 Created 
    res.status(201).json({
        message: 'Student added successfully!',
        data: newStudent
    });
}) 

app.post("/student", (req, res) => {
    newStudent = req.body
    const expectedFields = ["name", "age", "level", "address"];

    const extraFields = Object.keys(newStudent)
                              .filter(key => !expectedFields.includes(key))

    if (extraFields.length > 0) {
        // 400 Bad Request
        return res.status(400).json({
            message: 'Error: Unexpected fields found',
            data: newStudent
        });
    }

    if (!newStudent.name || !newStudent.age ||
        !newStudent.level || !newStudent.address) {

        // 400 Bad Request
        return res.status(400).json({
            message: 'Error: All fields are required',
            data: newStudent
        });
    }
    
    students.push(newStudent)
    console.log(students);

    // 201 Created 
    res.status(201).json({
        message: 'Student added successfully!',
        data: newStudent
    })
});

app.post("/doctor", (req, res) => {
    const newDoctor = req.query;
    const expectedFields = ["name", "age", "phone"];

    const extraFields = Object.keys(newDoctor)
                              .filter(key => !expectedFields.includes(key))

    if (extraFields.length > 0) {
        // 400 Bad Request
        return res.status(400).json({
            message: 'Error: Unexpected fields found',
            data: newDoctor 
        });
    }

    if (!newDoctor.name || !newDoctor.age || !newDoctor.phone) {
        // 400 Bad Request
        return res.status(400).json({
            message: 'Error: All fields are required',
            data:newDoctor 
        });
    }
    
    doctors.push(newDoctor)
    console.log(doctors);

    // 201 Created 
    res.status(201).json({
        message: 'Doctor added successfully!',
        data: newDoctor 
    });
});

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
