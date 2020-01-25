const moment = require('moment')


module.exports = {
    getNotificationsForStudent: async(req, res) => {
        const {student_id} = req.params

        const db = req.app.get('db')

        const result = await db.notifications.get_notifications_for_student(student_id)

        if(!result[0]){
            res.status(400).json('You currently have any notifications')
        } else {
            res.status(200).json(result)
        }
    },

    CreateNotificationForStudent: async(req, res) => {

        const {notification_type, notification_title, notification_body, teacher_id} = req.body
        const {student_id} = req.params
        const notification_time = moment().format(moment.HTML5_FMT.DATETIME_LOCAL)


        const db = req.app.get('db')

        const result = await db.notifications.new_notification_for_student(notification_type, notification_title, notification_body, notification_time, teacher_id, student_id)

            console.log(result)

        if(!result[0]){
            res.status(400).json('You currently have any notifications')
        } else {
            res.status(200).json(result)
        }
    },

    getNotificationsForTeacher: async(req, res) => {
        const {teacher_id} = req.params

        const db = req.app.get('db')

        const result = await db.notifications.get_notifications_for_teacher(teacher_id)

        if(!result[0]){
            res.status(400).json('You currently have any notifications')
        } else {
            res.status(200).json(result)
        }
    },

    CreateNotificationForTeacher: async(req, res) => {

        const {notification_type, notification_title, notification_body, student_id, lesson_id, lesson_time, lesson_length} = req.body
        const {teacher_id} = req.params
        const notification_time = moment().format(moment.HTML5_FMT.DATETIME_LOCAL)


        const db = req.app.get('db')

        const result = await db.notifications.new_notification_for_teacher(notification_type, notification_title, notification_body, notification_time, teacher_id, student_id, lesson_id, lesson_time, lesson_length)

        if(!result[0]){
            res.status(400).json('You currently have any notifications')
        } else {
            res.status(200).json(result)
        }

    },

    deleteNotificationForTeacher: async(req, res) => {
        const {notification_id} = req.params

        const db = req.app.get('db')

        const result = await db.notifications.delete_notification_for_teacher(notification_id)

        if(!result[0]){
            res.status(200).json('You currently have any notifications')
        } else {
            res.status(200).json(result)
        }
    },

    deleteNotificationForStudent: async(req, res) => {
        const {notification_id} = req.params

        const db = req.app.get('db')

        const result = await db.notifications.delete_notification_for_student(notification_id)

        if(!result[0]){
            res.status(200).json('You currently have any notifications')
        } else {
            res.status(200).json(result)
        }
    }
}