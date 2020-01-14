import React from 'react'
import TopBar from '../../TopBar/TopBar'
import NavBarStudent from '../../NavBar/NavBarStudent'
import StudentSchedule from '../StudentHomePage/StudentSchedule'

export default class StudentLessons extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <TopBar /> 
                <NavBarStudent />
                <div>StudentLessons</div>
                <div>Calendar</div>
                <StudentSchedule />
            </div>
        )
    }
}