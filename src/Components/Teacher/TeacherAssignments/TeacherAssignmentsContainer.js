import React from 'react'
import AssignmentBlockDetailed from '../../Assignments/AssignmentBlockDetailed'
import {getAllAssignments}  from '../../../redux/reducers/studentReducer'
import {getStudent} from '../../../redux/reducers/teacherReducer'
import AssignmentEditBlock from './AssignmentEditBlock'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import './styles/TeacherAssignmentsContainer.css'

class TeacherAssignmentsContainer extends React.Component{
        constructor(){
            super()
            this.state={

            }
        }

        componentDidMount(){
            this.props.getAllAssignments(this.props.match.params.id)
            this.props.getStudent(this.props.match.params.id)
        }

        updateAssignments = () =>{
            this.props.getAllAssignments(this.props.match.params.id)
        }

        async componentDidUpdate(prevProps){
            if(prevProps.match.params.id !== this.props.match.params.id){
                await this.props.getAllAssignments(this.props.match.params.id)
                this.props.getStudent(this.props.match.params.id)

            }
        }
    
        render(){
            console.log(this.props)
            return(
                <div>
                    <Switch>
                        <Route path='/teacher/assignments/edit/:id' component={AssignmentEditBlock} />
                        <Route path={'/teacher/assignments/:id'} render={() => {
                            return (
                                <div className='individual-teacher-assignment-container' >
                                    <h3> {this.props.student.first_name} {this.props.student.last_name}'s Assignments: </h3>

                                    <div>
                                        {!this.props.assignments.length ? <div>Students has no assignments</div> : this.props.assignments.map((ele, i, arr) => {
                                            return <AssignmentBlockDetailed updateAssignments={this.updateAssignments} id={ele.assignment_id} key={i} assignmentCount={arr.length - i} assignmentTitle={ele.assignment_title} assignmentSource={ele.assignment_source} assignmentComposer={ele.assignment_composer} assignmentPage={ele.assignment_page} assignmentRequirements={ele.assignment_requirements} assignmentDueDate={ele.assignment_duedate} assignmentCompleted={ele.assignment_completed}  /> 
                
                                        })}
                                    </div>
                                </div>
                            )
                        }}/>
                    </Switch>
                </div>
            )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        assignments: reduxState.studentReducer.assignments,
        student: reduxState.teacherReducer.selectedStudent 

    }
}


export default connect(mapStateToProps, {getAllAssignments, getStudent})(TeacherAssignmentsContainer)
