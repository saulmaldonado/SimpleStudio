import React from 'react'
import StudentBlock from './StudentBlock'
import { connect } from 'react-redux'
import {getStudentsForTeacher} from '../../../redux/reducers/teacherReducer'
import TeacherAssignmentForms from './TeacherAssignmentForms'

import './styles/StudentSelectorAssignments.css'



class StudentSelectorLogs extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getStudentsForTeacher(this.props.teacher.teacher_id)
    }

    render(){
        console.log(this.props)
        return(
            <div className='student-selector-assignments' >
                <h3 className='current-students-assignments' >Current Students:</h3>
                <div className= 'student-selector-assignments-name' >
                    {this.props.students.map((ele, i) => {
                        return <StudentBlock key={i} studentName={`${ele.first_name} ${ele.last_name}`} studentId={ele.id}  />
                    })}
                </div>
                <TeacherAssignmentForms />
            </div>

            
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        students: reduxState.teacherReducer.students,
        teacher: reduxState.teacherAuthReducer
    }
}

export default connect(mapStateToProps, {getStudentsForTeacher})(StudentSelectorLogs)