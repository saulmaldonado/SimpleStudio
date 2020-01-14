import React from 'react'
import AssignmentBlock from '../../Assignments/AssignmentBlock'

export default class TeacherAssignmentsContainer extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>TeacherAssignmentsContainer</div>
                <AssignmentBlock /> 
            </div>
        )
    }
}