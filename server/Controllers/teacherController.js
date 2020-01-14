module.exports = {
    getStudentsForTeacher: async(req, res) => {
        const {teacher_id} = req.params

        const db = req.app.get('db')

        const result = await db.teacher.get_all_students(teacher_id)

        if(!result){
            res.status(400).json('Teacher has no students')
        } else {

            let students = result.map(ele => {
                return {
                    id: ele.student_id,
                    first_name: ele.student_first_name,
                    last_name: ele.student_last_name,
                    email: ele.student_email,
                    phone: ele.student_phone
                }
            })

            res.status(200).json(students)
        }

    },

    getAllLessonsForTeacher: async(req, res) => {
        const {teacher_id} = req.params

        const db = req.app.get('db')
        
        const result = await db.teacher.get_all_lessons(teacher_id)

        if(!result){
            res.status(400).json('teacher has no lessons scheduled')
        } else {
            res.status(200).json(result)
        }
    },

    getAllLogsForTeacher: async(req, res) => {
        const {teacher_id} = req.params   

        const db = req.app.get('db')

        const result = await db.teacher.get_all_logs(teacher_id)

        if(!result){
            res.status(400).json('Teacher has no logs submitted')
        } else {
            res.status(200).json(result)
        }
     },

     getAllAssignmentsForTeacher: async(req, res) => {
        const {teacher_id} = req.params   

        const db = req.app.get('db')

        const result = await db.teacher.get_all_assignments(teacher_id)

        if(!result){
            res.status(400).json('Teacher has not assigned anything')
        } else {
            res.status(200).json(result)
        }
     },
     getAllPaymentsForTeacher: async(req, res) => {
         const {teacher_id} = req.params
         const db = req.app.get('db')

         const result = await db.teacher.get_all_payments(teacher_id)

         if(!result){
             res.status(400).json('Teacher has not payments')
         } else {
             res.status(200).json(result)
         }
     },

     assignStudent: async(req, res) => {
         const {teacher_id, student_id} = req.params

         const db = req.app.get('db')

         const result = await db.teacher.assign_student(teacher_id, student_id)

         if(!result){
             res.status(400).json('Student does not exist')
         } else {
            let students = result.map(ele => {
                return {
                    id: ele.student_id,
                    first_name: ele.student_first_name,
                    last_name: ele.student_last_name,
                    email: ele.student_email,
                    phone: ele.student_phone,
                    teacher_id: ele.teacher_id
                }
            })
    
            res.status(200).json(students)
         }
     },
     unassignStudent: async(req, res) => {
        const {student_id} = req.params

        const db = req.app.get('db')
        
        const result = await db.teacher.unassign_student(student_id)

        let students = result.map(ele => {
            return {
                id: ele.student_id,
                first_name: ele.student_first_name,
                last_name: ele.student_last_name,
                email: ele.student_email,
                phone: ele.student_phone,
                teacher_id: ele.teacher_id
            }
        })

        res.status(200).json(students)
     }
}