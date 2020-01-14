module.exports = {
    createLesson: async(req, res) => {
        const {student_id, lesson_type, lesson_time, lesson_length, lesson_notes} = req.body

        const db = req.app.get('db')

        const result = await db.lesson.add_lesson(student_id, lesson_type, lesson_time, lesson_length, lesson_notes)

        res.status(200).json(result)
    },

    editLesson: async(req, res) => {
        const {lesson_type, lesson_time, lesson_length, lesson_notes} = req.body
        const {lesson_id} = req.params

        const db = req.app.get('db')

        const result = await db.lesson.edit_lesson(lesson_type, lesson_time, lesson_length, lesson_notes, lesson_id)

        res.status(200).json(result)
    },

    deleteLesson: async(req, res) => {
        const {lesson_id} = req.params

        const db = req.app.get('db')

        await db.lesson.delete_lesson(lesson_id)

        res.sendStatus(200)

    }
}