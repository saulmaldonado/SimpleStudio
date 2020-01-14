module.exports = {
    isTeacher:  async(req, res, next) => {
        if(!req.session.user.account_type === 'teacher'){
            res.status(401).json('You are not a teacher')
        } else {
            next()
        }
    },

    isStudent: async(req, res, next) => {
        if(!req.session.user.account_type === 'student'){
            res.status(401).json('You are not a student')
        } else {
            next()
        }
    }
}