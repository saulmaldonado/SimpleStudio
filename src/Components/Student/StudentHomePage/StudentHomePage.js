import React from 'react'
import TopBar from '../../TopBar/TopBar'
import NavBarStudent from '../../NavBar/NavBarStudent'
import StudentSchedule from './StudentSchedule'
import NewAssignments from './NewAssignments'

export default function StudentHomePage(){
    return(
        <div>
            <div>StudentHomePage</div>
            <TopBar />
            <NavBarStudent />
            <StudentSchedule />
            <NewAssignments />
            <div>Stats</div>
        </div>
    )
}