module.exports = {
    createLog: async(req, res) => {
        const {log_date, log_time, log_material, student_id} = req.body

        const db = req.app.get('db')

        const result = await db.logs.create_log(student_id, log_date, log_time, log_material)

        res.status(200).json(result)
    },

    editLog: async(req, res) => {
        const {log_date, log_time, log_material} = req.body
        const {log_id} = req.params

        const db = req.app.get('db')

        const result = await db.logs.edit_log(log_date, log_time, log_material, log_id)

        res.status(200).json(result)
    },
    deleteLog: async(req, res) => {
        const {log_id} = req.params

        const db = req.app.get('db')

        const result = await db.logs.delete_log(log_id)

        res.sendStatus(200)
    },
    getLog: async(req, res) => {
        const {log_id} = req.params

        const db = req.app.get('db')

        const result = await db.logs.get_log(log_id)

        if(!result[0]){
            res.status(400).json('practice log does not exist')
        } else {
            res.status(200).json(result)
        }
    }



}