module.exports = {
    createAssignment: async (req, res) => {
        const { assignment_title, 
            assignment_composer, 
            assignment_source, 
            assignment_page, 
            assignment_requirements,
             assignment_duedate,
              student_id } = req.body
        
        const db = req.app.get('db')

        const result = await db.assignment.add_assignment(student_id, assignment_title, assignment_source, assignment_page, assignment_requirements, assignment_duedate, assignment_composer)

        res.status(200).json(result)

    },
    editAssignment: async (req, res) => {
        const { assignment_title, 
            assignment_composer, 
            assignment_source, 
            assignment_page, 
            assignment_requirements,
            assignment_duedate,
            assignment_completed
            } = req.body

        const {assignment_id} = req.params

        const db = req.app.get('db')

        const result = await db.assignment.edit_assignment(assignment_title, assignment_source, assignment_page, assignment_requirements, assignment_duedate, assignment_completed, assignment_id, assignment_composer)

        res.status(200).json(result)
    },
    deleteAssignment: async (req, res) => {
        const {assignment_id} = req.params

        const db = req.app.get('db')

        await db.assignment.delete_assignment(assignment_id)
        
        res.sendStatus(200)
    
    },
    getAssignment: async (req, res) => {
        const {assignment_id} = req.params

        const db = req.app.get('db')

        const result = await db.assignment.get_assignment(assignment_id)

        if(!result[0]){
            res.status(400).json('Assignment does not exist')
        } else {
            res.status(200).json(result[0])
        }
    },
    markAssignmentAsComplete: async (req, res) => {
        const {assignment_id} = req.params
        const db = req.app.get('db')

        await db.assignment.complete_assignment(assignment_id)

        res.sendStatus(200)
    }
}