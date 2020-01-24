import React from 'react'
import AssignmentBlock from '../../Assignments/AssignmentBlock'
import { connect } from 'react-redux'
import {getAllAssignments} from '../../../redux/reducers/studentReducer'

class NewAssignments extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }


    componentDidMount(){
        this.props.getAllAssignments(this.props.student.student_id)
    }
    render(){
        return(
            <div>
                <div>NewAssignments</div>
                {!this.props.assignments.length ?<div>You have no assignments.</div> : this.props.assignments.map((ele, i) => {
                    return <AssignmentBlock key={i} assignmentTitle={ele.assignment_title} assignmentDueDate={ele.assignment_duedate} assignmentRequirements={ele.assignment_requirements}/>
                })}
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

export default connect(mapStateToProps, {getAllAssignments})(NewAssignments)


