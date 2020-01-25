import React from 'react'
import {getLesson, editLesson} from '../../../redux/reducers/lessonReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {CreateNotificationForTeacher} from '../../../redux/reducers/teacherReducer'
import { DatePicker } from 'antd'

const moment = require('moment')

class RescheduleLessonStudent extends React.Component{
    constructor(){
        super()
        this.state={
            lesson_type: '',
            lesson_time: '',
            lesson_length: null,
            lesson_notes: ''
        }
    }

    componentDidMount(){
        this.props.getLesson(this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.props.getLesson(this.props.match.params.id)
        }

        if(prevProps.lesson !== this.props.lesson){

            this.setState({
                lesson_type: this.props.lesson.lesson_type,
                lesson_time: this.props.lesson.lesson_time,
                lesson_length: this.props.lesson.lesson_length,
                lesson_notes: this.props.lesson.lesson_notes
            })

        }

    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    saveChanges = async() => {
        const {lesson_type, lesson_time, lesson_length, lesson_notes} = this.state

        let newNotification = {
            notification_type: 'request_to_reschedule_lesson',
            notification_title: 'Student has requested to reschedule lesson',
            notification_body: `${this.props.student.student_first_name} has requested to reschedule their lesson on ${moment(this.props.lesson.lesson_time).format('llll')} - ${moment(this.props.lesson.lesson_time).add(this.props.lesson.lesson_length, 'm').format('h:mm A')} to ${moment(lesson_time).format('llll')} - ${moment(lesson_time).add(lesson_length, 'm').format('h:mm A')}`,
            lesson_id: this.props.lesson.lesson_id,
            lesson_time: lesson_time,
            lesson_length: +lesson_length,
            student_id: this.props.student.student_id
        }

        
        if(window.confirm('Are you sure you want to reschedule this lesson?') === true){
            await this.props.CreateNotificationForTeacher(this.props.student.teacher_id, newNotification)
            

            alert('A request to reschedule this lesson has been sent to your teacher for approval')
            
            this.props.history.push('/student/lessons')
        }        
    }

    onChange = (date, dateString) => {
        this.setState({
            lesson_time: date
        })
     }




    render(){

        return(
            <div>
                <div>Reschedule lesson {this.props.match.params.id} </div>
                <DatePicker value={moment(this.state.lesson_time)} format="MMM Do, h:mm a" name='lesson_time' showTime={{ format: 'HH:mm', minuteStep: 15, use12Hours:true}} onChange={this.onChange} />
                <input name='lesson_length' placeholder='Length in Minutes' value={this.state.lesson_length} onChange={this.handelInputChange}/>
                <button onClick={this.saveChanges}>Save Changes</button>
                <Link to='/student/lessons'> <button>Discard Changes</button> </Link>

                <div>
                    <div>
                        <p>{this.state.lesson_type} Lesson:</p>
                        <p> {moment(this.state.lesson_time).format('MMM Do, h:mm a')}</p>
                    </div>
                    <div>
                        <p>Length: {this.state.lesson_length} mins</p>
                        <p>Notes: {!this.state.lesson_notes ? 'none.' : this.state.lesson_notes} </p>
                    </div>
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

export default connect (mapStateToProps, {getLesson, editLesson, CreateNotificationForTeacher})(RescheduleLessonStudent)