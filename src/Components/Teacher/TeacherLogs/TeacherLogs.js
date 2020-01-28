import React from 'react'

import StudentSelectorLogs from './StudentSelectorLogs'
import TeacherLogsContainer from './TeacherLogsContainer'
import { Switch, Route } from 'react-router-dom'

import './styles/TeacherLogs.css'

export default class TeacherLogs extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <h2>Practice Logs</h2>
                <div className='teacher-logs' >
                    <Switch>
                        <Route path='/teacher/logs/:id/' component={TeacherLogsContainer}/>
                        <Route path='/teacher/logs' render={()=>{
                            return(
                                <div>Select student to view logs</div>
                            )
                        }}/>
                    </Switch>
                    <StudentSelectorLogs />
                </div>
            </div>
        )
    }
}