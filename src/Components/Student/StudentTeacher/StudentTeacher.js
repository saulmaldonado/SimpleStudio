import React from 'react'
import TeacherProfile from './TeacherProfile'
import {connect} from 'react-redux'
import {getTeacherForStudent} from '../../../redux/reducers/studentReducer'
import {getAllLessonsForTeacher, getStudentsForTeacher} from '../../../redux/reducers/teacherReducer'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import '../../../../node_modules/@fullcalendar/core/main.css'
import'../../../../node_modules/@fullcalendar/daygrid/main.css'
import '../../../../node_modules/@fullcalendar/timegrid/main.css'

import './styles/StudentTeacher.css'

const moment = require('moment')


class StudentTeacher extends React.Component{
    constructor(){
        super()
        this.state={
            lessons: []
        }
    }

    async componentDidMount(){
        await this.props.getTeacherForStudent(this.props.student.student_id)
        await this.props.getStudentsForTeacher(this.props.teacher.teacher_id)
        await this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)
        this.parseLessons()
    }

    parseLessons = () => {
        
        let lessons = this.props.lessons.map((ele, i) => {
            return {title: `${ele.lesson_type} Lesson with ${ele.student_first_name}`, id: ele.lesson_id, start: moment(ele.lesson_time).format(), end: moment(ele.lesson_time).add(ele.lesson_length, 'minutes').format(), lesson_type: ele.lesson_type, lesson_notes: ele.lesson_notes, student_id: ele.student_id }
        })
        
        this.setState({lessons: lessons})
    }


    render(){
        console.log(this.props)
        const {teacher_first_name, teacher_last_name, teacher_email, teacher_phone} = this.props.teacher
        return(
            <div className='StudentTeacher'>
                <div className='teacher-view'>
                    {typeof this.props.teacher === 'string' ? <div>{this.props.teacher}</div> : <TeacherProfile teacherName={`${teacher_first_name} ${teacher_last_name}`} 
                                                                                                                teacherEmail={teacher_email} 
                                                                                                                teacherPhone={teacher_phone}/>}
                    <FullCalendar className='teacher-calendar-for-student'   defaultView='timeGridWeek' 
                        header={{left: 'prev,next today' , center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay'}} 
                        plugins={[ dayGridPlugin, timeGridPlugin ]} 
                        events={[...this.state.lessons]}
                        // eventRender={this.buttonPressed}
                        slotDuration={'00:15'}
                        minTime={'05:00:00'}
                        maxTime={'23:00:00'}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        lessons: reduxState.teacherReducer.lessons,
        teacher: reduxState.studentReducer.teacher,
        students: reduxState.teacherReducer.students,
     
    }
}

export default connect(mapStateToProps, {getTeacherForStudent, getAllLessonsForTeacher, getStudentsForTeacher})(StudentTeacher)