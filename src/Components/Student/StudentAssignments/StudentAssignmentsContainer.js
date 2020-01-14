import React from 'react'
import AssignmentBlock from '../../Assignments/AssignmentBlock'

export default class StudentAssignmentsContainer extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>StudentAssignmentsContainer</div>
                <AssignmentBlock />
            </div>
        )
    }
}