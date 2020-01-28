import React from 'react'
import {getAllLessons} from '../../../redux/reducers/studentReducer'
import { connect } from 'react-redux'

import './styles/StudentAssignmentsContainer.css'
import AssignmentBlockDetailedStudent from '../../Assignments/AssignmentBlockDetailedStudent'

class StudentAssignmentsContainer extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    

    componentDidMount(){
        this.props.getAllLessons(this.props.student.student_id)
    }

    render(){
        console.log(this.props)
        return(
            <div className='StudentAssignmentsContainer' >
                <p> {this.props.student.student_first_name}'s Assignments </p>
                <div>
                    {!this.props.assignments.length ? <div>You do not have any assignments.</div> : this.props.assignments.map((ele, i) => {
                        return <AssignmentBlockDetailedStudent key={i} assignmentCount={i + 1} assignmentTitle={ele.assignment_title} assignmentSource={ele.assignment_source} assignmentComposer={ele.assignment_composer} assignmentPage={ele.assignment_page} assignmentRequirements={ele.assignment_requirements} assignmentDueDate={ele.assignment_duedate} assignmentCompleted={ele.assignment_completed}  />
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        assignments: reduxState.studentReducer.assignments       
    }
}

export default connect(mapStateToProps, {getAllLessons})(StudentAssignmentsContainer)