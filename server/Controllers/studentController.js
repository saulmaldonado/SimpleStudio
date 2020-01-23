module.exports = {
    getTeacherforStudent: async(req, res) => {
        const {student_id} = req.params
        const db = req.app.get('db')

        const result = await db.student.get_teacher(student_id)

        if(!result[0]){
            res.status(400).json('You have not been assigned to a teacher')
        } else {
            res.status(200).json(result[0])
        }
    },
    getAllLessons: async(req, res) => {
        const {student_id} = req.params
        const db = req.app.get('db')

        const result = await db.student.get_all_lessons(student_id)

        if(!result){
            res.status(400).json('You have no lessons scheduled')
        } else {

            res.status(200).json(result)
        }
    },
    getAllAssignments: async(req, res) => {
        console.log('getAllAssignments')
        const {student_id} = req.params
        const db = req.app.get('db')

        const result = await db.student.get_all_assignments(student_id)

        if(!result){
            res.status(400).json('Student has no assignments.')
        } else {
            console.log(result)
            res.status(200).json(result)
        }
    },
    getAllLogs: async(req, res) => {
        const {student_id} = req.params
        const db = req.app.get('db')

        const result = await db.student.get_all_logs(student_id)

        if(!result[0]){
            res.status(400).json('You have not submitted a Practice Log.')
        } else {
            res.status(200).json(result)
        }
    },
    getAllPayments: async(req, res) => {
        const {student_id} = req.params
        const db = req.app.get('db')

        const result = await db.student.get_all_payments(student_id)

        if(!result){
            res.status(400).json('You have no payment history.')
        } else {
            res.status(200).json(result)
        }
    },
    getAllPaymentsDue: async(req, res) => {
        const {student_id} = req.params

        const db = req.app.get('db')

        const result = await db.student.get_all_payments_due(student_id)

        if(!result[0]){
            res.status(400).json('You have no payments due.')
        } else {
            res.status(200).json(result)
        }
    }
}