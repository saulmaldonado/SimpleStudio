require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {CONNECTION_STRING, SESSION_SECRET, PORT_NUMBER} = process.env
const app = express()

//Controllers
const ac = require('./Controllers/authController')
const t = require('./Controllers/teacherController')

//middleware
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 1000*60*60*24*7
  }
}))

//db connection
massive(CONNECTION_STRING)
.then(db => {
      app.set('db', db)
      console.log('db connected')
})

//endpoints

//authController

//GET
app.get('/auth/teacher/:id', ac.getTeacher)
app.get('/auth/student/:id', ac.getStudent)
app.get('/auth/logout', ac.logout)

//POST
app.post('/auth/teacher', ac.registerTeacher)
app.post('/auth/student', ac.registerStudent)
app.post('/auth/teacher/login', ac.teacherLogin)
app.post('/auth/student/login', ac.studentLogin)

//PUT
app.put('/auth/student/:id', ac.editStudent)
app.put('/auth/teacher/:id', ac.editTeacher)

// //DELETE
app.delete('/auth/student/:id', ac.deleteStudent)
app.delete('/auth/teacher/:id', ac.deleteTeacher)

// //teacherController

// //GET
app.get('/api/teacher/:teacher_id/students', t.getStudentsForTeacher)
app.get('/api/teacher/:teacher_id/lessons', t.getAllLessonsForTeacher)
app.get('/api/teacher/:teacher_id/logs', t.getAllLogsForTeacher)
app.get('/api/teacher/:teacher_id/assignments', t.getAllAssignmentsForTeacher )
app.get('/api/teacher/:teacher_id/payments', t.getAllPaymentsForTeacher )

// //POST
// app.post('/api/teacher/:teacher_id/student/:student_id', assignStudent)

// //DELETE
// app.delete('/api/teacher/:teacher_id/student/:student_id', unassignStudent)

// //studentController

// //GET
// app.get('/api/student/:student_id/teacher', getTeacherForStudent)
// app.get('/api/student/:student_id/lessons', getAllLessons)
// app.get('/api/student/:student_id/assignments', getAllAssignments)
// app.get('/api/student/:student_id/logs', getAllLogs)
// app.get('/api/student/:student_id/payments', getAllPayments)

// //lessonController

// //POST
// app.post('/api/lesson', createLesson)

// //PUT
// app.post('/api/lesson/:id', editLesson)

// //DELETE
// app.post('/api/lesson/:id', deleteLesson)

// //logController

// //POST
// app.post('/api/log', createLog)

// //PUT
// app.put('/api/log/:id', editLog)

// //DELETE
// app.delete('/api/lod/:id', deleteLog)


// //paymentController

// //POST
// app.post('/api/payment', createPayment)

// //PUT
// app.put('/api/payment/:id', editPayment)

// //DELETE
// app.delete('/api/payment/:id', deletePayment)




app.listen(PORT_NUMBER, () => console.log(`listening on port ${ PORT_NUMBER }...`))