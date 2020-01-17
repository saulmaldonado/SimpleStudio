require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {CONNECTION_STRING, SESSION_SECRET, PORT_NUMBER} = process.env
const app = express()

//Controllers
const ac = require('./Controllers/authController')
const t = require('./Controllers/teacherController')
const s = require('./Controllers/studentController')
const le = require('./Controllers/lessonController')
const lo = require('./Controllers/logsController')
const as = require('./Controllers/assignmentController')
const p = require('./Controllers/paymentController')

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
app.get('/api/teacher/:teacher_id/payments/paid', t.getAllPaymentsPaid)
app.get('/api/teacher/:teacher_id/payments/unpaid', t.getAllPaymentsUnpaid)

// //POST
app.post('/api/teacher/:teacher_id/student/:student_id', t.assignStudent)

// //DELETE
app.delete('/api/teacher/student/:student_id', t.unassignStudent)

// //studentController

// //GET
app.get('/api/student/:student_id/teacher', s.getTeacherforStudent)
app.get('/api/student/:student_id/lessons', s.getAllLessons)
app.get('/api/student/:student_id/assignments', s.getAllAssignments)
app.get('/api/student/:student_id/logs', s.getAllLogs)
app.get('/api/student/:student_id/payments', s.getAllPayments)
app.get('/api/student/:student_id/payments/due', s.getAllPaymentsDue)

// //lessonController
//GET
app.get('/api/lesson/:lesson_id', le.getLesson)

// //POST
app.post('/api/lesson', le.createLesson)

// //PUT
app.put('/api/lesson/:lesson_id', le.editLesson)

// //DELETE
app.delete('/api/lesson/:lesson_id', le.deleteLesson)

// //logController

//GET
app.get('/api/log/:log_id', lo.getLog)

// //POST
app.post('/api/log', lo.createLog)

// //PUT
app.put('/api/log/:log_id', lo.editLog)

// //DELETE
app.delete('/api/log/:log_id', lo.deleteLog)

//assignmentController

//GET
app.get('/api/assignment/:assignment_id', as.getAssignment)

//POST
app.post('/api/assignment', as.createAssignment)

//PUT
app.put('/api/assignment/:assignment_id', as.editAssignment)

//DELETE
app.delete('/api/assignment/:assignment_id', as.deleteAssignment)


// //paymentController
//GET
app.get('/api/payment/:payment_id', p.getPayment)

// //POST
app.post('/api/payment', p.createPayment)

// //PUT
app.put('/api/payment/:payment_id', p.editPayment)

// //DELETE
app.delete('/api/payment/:payment_id', p.deletePayment)




app.listen(PORT_NUMBER, () => console.log(`listening on port ${ PORT_NUMBER }...`))