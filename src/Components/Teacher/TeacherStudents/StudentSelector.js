import React from 'react'
import AddStudentForm from './AddStudentForm'
import StudentBlock from './StudentBlock'
import { connect } from 'react-redux'
import {getStudentsForTeacher} from '../../../redux/reducers/teacherReducer'

class StudentSelector extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getStudentsForTeacher(this.props.teacher.teacher_id)
    }



    render(){

        return(
            <div>
                <div>StudentSelector</div>

                {this.props.students.map((ele, i) => {
                    return <StudentBlock studentName={`${ele.first_name} ${ele.last_name}`} studentId={ele.id} key={i}/>
                })}

                <AddStudentForm updateStudentList={() => this.props.getStudentsForTeacher(this.props.teacher.teacher_id)}/>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        students: reduxState.teacherReducer.students
    }
}

export default connect(mapStateToProps, {getStudentsForTeacher})(StudentSelector)