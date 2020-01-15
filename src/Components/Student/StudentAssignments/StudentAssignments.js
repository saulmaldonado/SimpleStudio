import React from 'react'
import StudentAssignmentsContainer from './StudentAssignmentsContainer'


export default class StudentAssignments extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>

                <div>StudentAssignments</div>
                <StudentAssignmentsContainer /> 
            </div>
        )
    }
}