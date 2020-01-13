require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const {CONNECTION_STRING, SESSION_SECRET, PORT_NUMBER} = process.env
const app = express()

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
app.get('/auth/teacher/:id', getTeacher)
app.get('/auth/student/:id', getStudent)
app.get('/auth/logout', logout)

//POST
app.post('/auth/teacher', registerTeacher)
app.post('/auth/student', registerStudent)
app.post('/auth/teacher/login', teacherLogin)
app.post('/auth/student/login', studentLogin)

//PUT
app.put('/auth/student/:id', editStudent)
app.put('/auth/teacher/:id', editTeacher)

//DELETE
app.delete('/auth/student/:id', deleteStudent)
app.delete('/auth/teacher/:id', deleteTeacher)

//teacherController

//GET
app.get('/api/teacher/:teacher_id/students', getStudentsForTeacher)
app.get('/api/teacher/:teacher_id/lessons', getAllLessonsForTeacher )
app.get('/api/teacher/:teacher_id/logs', getAllLogsForTeacher )
app.get('/api/teacher/:teacher_id/assignments', getAllAssignmentsByTeacher )
app.get('/api/teacher/:teacher_id/payments', getAllPaymentsByTeacher )

//POST
app.post('/api/teacher/:teacher_id/student/:student_id', assignStudent)

//DELETE
app.delete('/api/teacher/:teacher_id/student/:student_id', unassignStudent)

//studentController

//GET
app.get('/api/student/:student_id/teacher', getTeacherForStudent)
app.get('/api/student/:student_id/lessons', getAllLessons)
app.get('/api/student/:student_id/assignments', getAllAssignments)
app.get('/api/student/:student_id/logs', getAllLogs)
app.get('/api/student/:student_id/payments', getAllPayments)

//lessonController

//POST
app.post('/api/lesson', createLesson)

//PUT
app.post('/api/lesson/:id', editLesson)

//DELETE
app.post('/api/lesson/:id', deleteLesson)

//logController

//POST
app.post('/api/log', createLog)

//PUT
app.put('/api/log/:id', editLog)

//DELETE
app.delete('/api/lod/:id', deleteLog)


//paymentController

//POST
app.post('/api/payment', createPayment)

//PUT
app.put('/api/payment/:id', editPayment)

//DELETE
app.delete('/api/payment/:id', deletePayment)




app.listen(PORT_NUMBER, () => console.log(`listening on port ${ PORT_NUMBER }...`))