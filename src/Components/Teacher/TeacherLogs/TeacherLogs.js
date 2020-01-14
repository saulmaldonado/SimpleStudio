import React from 'react'
import TopBar from '../../TopBar/TopBar'
import NavBarTeacher from '../../NavBar/NavBarTeacher'

export default class TeacherLogs extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <TopBar />
                <NavBarTeacher />
                <div>TeacherLogs</div>
                <StudentSelector />
                
            </div>
        )
    }
}