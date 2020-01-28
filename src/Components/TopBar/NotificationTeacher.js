import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {deleteNotificationForTeacher} from '../../redux/reducers/teacherReducer'
import {getLesson, editLesson} from '../../redux/reducers/lessonReducer'
import {getAllLessonsForTeacher} from '../../redux/reducers/teacherReducer'
import {CreateNotificationForStudent} from '../../redux/reducers/studentReducer'

const moment = require('moment')


class Notification extends React.Component{

    acceptTeacher = async (teacher_id, student_id, notification_id) => {

        await axios.post(`/api/teacher/${teacher_id}/student/${student_id}`)
                            .then(res => {
                                alert('You have been assigned a teacher!')
                                this.props.deleteNotificationForTeacher(notification_id)
                            })
    }

    closeNotification = (notification_id) => {
        this.props.deleteNotificationForTeacher(notification_id)
    }


    acceptLessonReschedule = async() => {

        await this.props.getLesson(this.props.lesson_id)

        const {lesson_type, lesson_notes} = this.props.lesson
        const { lesson_time, lesson_length } = this.props
        
        let updatedLesson = {
            lesson_type, 
            lesson_time, 
            lesson_length, 
            lesson_notes
        }

        await this.props.editLesson(this.props.lesson_id, updatedLesson)

        await this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)

        let newNotification = {
            notification_type: 'lesson_reschedule_request_accepted', 
            notification_title: `Lesson Rescheduled`, 
            notification_body: `Your request to reschedule a lesson has been accepted. Your lesson on ${moment(this.props.lesson.lesson_time).format('llll')} has been changed to ${moment(lesson_time).format('llll')} - ${moment(lesson_time).add(lesson_length, 'm').format('h:mm A')} `, 
            teacher_id: this.props.teacher.teacher_id
        } 


        await this.props.CreateNotificationForStudent(this.props.student_id, newNotification)

        alert('Lesson has been rescheduled')

        
            this.props.deleteNotificationForTeacher(this.props.notification_id)
    }

    

    render(){
        const {notification_type, notification_title, notification_body, teacher_id, student_id, notification_time, notification_id} = this.props
        if(notification_type === 'Assign student to Teacher'){
            return(
                <div>
                    <p>{notification_title}</p>
                    <p>{notification_body}</p>
                    <div>
                        <button onClick={() => this.acceptTeacher(teacher_id, student_id, notification_id)}>Accept</button>
                        <button onClick={() => this.closeNotification(notification_id)}>Decline</button>
                    </div>
                    <p>{moment(notification_time).format('llll')}</p>
                </div>
            )
        } else if(notification_type === 'request_to_reschedule_lesson'){
            return (
            <div>
                <p>{notification_title}</p>
                <p>{notification_body}</p>
                <div>
                    <button onClick={() => this.closeNotification(notification_id)}>Close</button>
                    <button onClick={this.acceptLessonReschedule} >Accept</button>
                    <button onClick={() => this.closeNotification(notification_id)} >Decline</button>
                </div>
                <p>{moment(notification_time).fromNow()}</p>
            </div>
            )


        } else {
            return (
                <div>
                    <p>{notification_title}</p>
                    <p>{notification_body}</p>
                    <div>
                        <button onClick={() => this.closeNotification(notification_id)}>Close</button>
                    </div>
                    <p>{moment(notification_time).fromNow()}</p>
                </div>
            )
        }
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        lesson: reduxState.lessonReducer.lessons,
        allLessons: reduxState.teacherReducer.lessons
    }
}

export default connect(mapStateToProps, {deleteNotificationForTeacher, editLesson, getLesson, getAllLessonsForTeacher, CreateNotificationForStudent})(Notification)