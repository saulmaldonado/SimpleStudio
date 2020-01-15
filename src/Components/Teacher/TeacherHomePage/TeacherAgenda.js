import React from 'react'
import LessonBlock from '../../LessonBlock/LessonBlock'
import {getAllLessonsForTeacher, getStudentsForTeacher} from '../../../redux/reducers/teacherReducer'
import {connect} from 'react-redux'

class TeacherAgenda extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)
        this.props.getStudentsForTeacher(this.props.teacher.teacher_id)
    }



    render(){
        let today = new Date()
        console.log(this.props)
        return(
            <div>
                <div>Your Agenda:</div>
                <div> 
                {today.getMonth() + 1}-{today.getDate()}-{today.getFullYear()}
                </div>
                {this.props.teacherInfo.lessons.map((ele, i) => {
                    return <LessonBlock key={i} lessonType={ele.lesson_type} lessonTime={ele.lesson_time} lessonLength={ele.lesson_length} studentName={`${ele.student_first_name} ${ele.student_last_name}`} /> 
                })}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        teacherInfo: reduxState.teacherReducer
    }
}

export default connect(mapStateToProps, {getAllLessonsForTeacher, getStudentsForTeacher})(TeacherAgenda)