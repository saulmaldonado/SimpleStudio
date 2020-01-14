import React from 'react'
import TopBar from '../../TopBar/TopBar'
import NavBarTeacher from '../../NavBar/NavBarTeacher'
import StudentSelectorLogs from './StudentSelectorLogs'

export default class TeacherLogs extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>TeacherLogs</div>
                <StudentSelectorLogs />
            </div>
        )
    }
}