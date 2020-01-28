import React from 'react'
import {getLesson} from '../../../redux/reducers/lessonReducer'
import { connect } from 'react-redux'
import LessonBlockDetailed from '../../LessonBlock/LessonBlockDetailed'
import {CreateNotificationForTeacher} from '../../../redux/reducers/teacherReducer'
import { Link } from 'react-router-dom'

import './styles/StudentShowLesson.css'

const moment = require('moment')

class StudentShowLesson extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getLesson(this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.props.getLesson(this.props.match.params.id)
        }
    }

    cancelLesson = () => {

        let newNotification = {
            notification_type: 'request_cancel_lesson',
            notification_title: 'Student requested to cancel lesson.',
            notification_body: `${this.props.student.student_first_name} has requested to cancel their lesson on ${moment(this.props.lesson.lesson_time).format('llll')}`,
            student_id: this.props.student.student_id
        }

        if(window.confirm('Are you sure you want to cancel this lesson?') === true){
            this.props.CreateNotificationForTeacher(this.props.student.teacher_id, newNotification)
            alert('Request to cancel lesson has been sent to your teacher for approval.')
        }
    }

    render(){
        console.log(this.props.lesson)
        return(
            <div className='StudentShowLesson'>
                <LessonBlockDetailed  lessonType={this.props.lesson.lesson_type} lessonTime={moment(this.props.lesson.lesson_time ).format('MMM Do, h:mm a')} lessonLength={this.props.lesson.lesson_length} lessonNotes={!this.props.lesson.lesson_notes ? 'none.' : this.props.lesson.lesson_notes} />
                <div className='buttons '>
                    <Link to={`/student/lessons/edit/${this.props.match.params.id}`} ><button>Edit Lesson</button></Link>
                    <button onClick={this.cancelLesson}>Cancel Lesson</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        lesson: reduxState.lessonReducer.lessons
    
    }
}

export default connect(mapStateToProps, {getLesson, CreateNotificationForTeacher})(StudentShowLesson)