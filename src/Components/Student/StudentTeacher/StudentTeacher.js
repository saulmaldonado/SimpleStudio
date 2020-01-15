import React from 'react'
import TeacherProfile from './TeacherProfile'
import {connect} from 'react-redux'
import {getTeacherForStudent} from '../../../redux/reducers/studentReducer'


class StudentTeacher extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getTeacherForStudent(this.props.student.student_id)
    }

    render(){
        console.log(this.props)
        const {teacher_first_name, teacher_last_name, teacher_email, teacher_phone} = this.props.teacher
        return(
            <div>
                <div>Your Teacher's Profile:</div>
                <TeacherProfile teacherName={`${teacher_first_name} ${teacher_last_name}`} teacherEmail={teacher_email} teacherPhone={teacher_phone}/>
                <div>Calendar</div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        teacher: reduxState.studentReducer.teacher       
    }
}

export default connect(mapStateToProps, {getTeacherForStudent})(StudentTeacher)