module.exports = {
    getTeacherforStudent: async(req, res) => {
        const {student_id} = req.params
        const db = req.app.get('db')

        const result = await db.student.get_teacher(student_id)

        if(!result){
            res.status(400).json('Student does not have a teacher')
        } else {
            res.status(200).json(result[0])
        }
    },

    
}