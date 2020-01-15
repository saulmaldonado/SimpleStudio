const bcrypt = require('bcryptjs')

module.exports = {
    registerTeacher: async(req, res) => {
        const {email, password, firstName, lastName, phone} = req.body

        const db = req.app.get('db')

        const result = db.auth.check_for_teacher_email(email)
        const existingEmail = result[0]

        if(existingEmail){
            res.status(400).json('email is already in use')
        } else {

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const registeredUser = await db.auth.register_teacher(firstName, lastName, email, hash, phone)

            const user = registeredUser[0]

            req.session.user = {
                user_id: user.teacher_id,
                email: user.teacher_email,
                first_name:user.teacher_first_name,
                last_name: user.teacher_last_name,
                phone: user.teacher_phone,
                account_type: 'teacher'
            }

            console.log(req.session.user)


            res.status(200).json(req.session.user)
        }

    },

    registerStudent: async(req, res) => {
        const {email, password, firstName, lastName, phone} = req.body

        const db = req.app.get('db')

        const result = db.auth.check_for_student_email(email)
        const existingEmail = result[0]

        if(existingEmail){
            res.status(400).json('email is already in use')
        } else {

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const registeredUser = await db.auth.register_student(firstName, lastName, email, hash, phone)

            const user = registeredUser[0]

            req.session.user = {
                user_id: user.student_id,
                email: user.student_email,
                first_name:user.student_first_name,
                last_name: user.student_last_name,
                phone: user.student_phone,
                account_type: 'student'

            }

            console.log(req.session.user)

            res.status(200).json(req.session.user)
        }

    },

    teacherLogin: async(req, res) => {
        const {email, password} = req.body
        const db = req.app.get('db')

        const result = await db.auth.check_for_teacher_email(email)
        const user = result[0]

        if(!user){
            res.status(400).json('email or password is incorrect')
        } else {
            const passwordCorrect = bcrypt.compareSync(password, user.teacher_hash)

            
            if(!passwordCorrect){
                res.status(400).json('Password is incorrect')
            } else {
                req.session.user = {
                    user_id: user.teacher_id,
                    email: user.teacher_email,
                    first_name:user.teacher_first_name,
                    last_name: user.teacher_last_name,
                    account_type: 'teacher'
                }
            }

            console.log(req.session.user)


            res.status(200).json(req.session.user)


        }
    },

    studentLogin: async(req, res) => {
        const {email, password} = req.body
        const db = req.app.get('db')

        const result = await db.auth.check_for_student_email(email)
        const user = result[0]

        console.log(user)

        if(!user){
            res.status(400).json('email or password is incorrect')
        } else {
            const passwordCorrect = bcrypt.compareSync(password, user.student_hash)
            
            if(!passwordCorrect){
                res.status(400).json('Password is incorrect')
            } else {
                req.session.user = {
                    user_id: user.student_id,
                    email: user.student_email,
                    first_name: user.student_first_name,
                    last_name: user.student_last_name,
                    phone: user.student_phone,
                    account_type: 'student'

                }
            }

            console.log(req.session.user)

            res.status(200).json(req.session.user)
        }
    },

    logout: async(req, res) => {
        req.session.destroy()
        console.log(req.session)

        res.sendStatus(200)
    },

    getTeacher: async(req, res) => {
        const { id } = req.params

        const db = req.app.get('db')

        const result = await db.auth.get_teacher(id)
        const user = result[0]

        if(!user){
            res.status(400).json('teacher does not exist')
        } else {
            res.status(200).json({
                first_name: user.teacher_first_name,
                last_name: user.teacher_last_name,
                email: user.teacher_email,
                phone: user.teacher_phone
            })
        }

    },

    getStudent: async(req, res) => {
        const { id } = req.params

        const db = req.app.get('db')

        const result = await db.auth.get_student(id)
        const user = result[0]

        if(!user){
            res.status(400).json('student does not exist')
        } else {
            res.status(200).json({
                id: user.student_id,
                first_name: user.student_first_name,
                last_name: user.student_last_name,
                email: user.student_email,
                phone: user.student_phone
            })
        }
    },
    editTeacher: async(req, res) => {
        const { id } = req.params
        const {firstName, lastName, email, phone} = req.body

        const db = req.app.get('db')

        const result = await db.auth.edit_teacher(firstName, lastName, email, phone, id)

        const user = result[0]

        res.status(200).json(user)
    },
    editStudent: async(req, res) => {
        const { id } = req.params
        const {firstName, lastName, email, phone} = req.body

        const db = req.app.get('db')

        const result = await db.auth.edit_student(firstName, lastName, email, phone, id)

        const user = result[0]

        res.status(200).json(user)
    },
    deleteStudent: async(req, res) => {
        const { id } = req.params

        const db = req.app.get('db')

        await db.auth.delete_student(id)

        res.status(200).json('student deleted')
    },
    deleteTeacher: async(req, res) => {
        const { id } = req.params

        const db = req.app.get('db')

        await db.auth.delete_teacher(id)

        res.status(200).json('teacher deleted')
    }
}