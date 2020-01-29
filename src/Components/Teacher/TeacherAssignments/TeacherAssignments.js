import React from 'react'

import StudentSelectorAssignments from './StudentSelectorAssignments'
import TeacherAssignmentsContainer from './TeacherAssignmentsContainer'
import { Route, Switch } from 'react-router-dom'

import './styles/TeacherAssignments.css'

export default class TeacherAssignments extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <h1 className='teacher-assignments-title' >Assignments</h1>
                <div className='teacher-assignments' >
                    <Switch>
                        <Route path='/teacher/assignments/:id' component={TeacherAssignmentsContainer} />
                        <Route path='/teacher/assignments' render={()=>{
                            return(
                                <div>Select student to view assignments</div>
                                )
                            }}/>                    
                    </Switch>

                    <StudentSelectorAssignments /> 
                </div>
            </div>
        )
    }
}