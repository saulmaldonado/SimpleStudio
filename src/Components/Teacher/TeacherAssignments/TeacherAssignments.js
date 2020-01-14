import React from 'react'

import StudentSelectorAssignments from './StudentSelectorAssignments'
import TeacherAssignmentsContainer from './TeacherAssignmentsContainer'

export default class TeacherAssignments extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>TeacherAssignments</div>
                <StudentSelectorAssignments /> 
                <TeacherAssignmentsContainer />
                

            </div>
        )
    }
}