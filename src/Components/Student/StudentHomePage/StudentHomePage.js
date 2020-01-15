import React from 'react'
import NavBarStudent from '../../NavBar/NavBarStudent'
import StudentSchedule from './StudentSchedule'
import NewAssignments from './NewAssignments'
import StudentLessons from '../StudentLessons/StudentLessons'
import StudentLogs from '../StudentsLogs/StudentLogs'
import StudentPayments from '../StudentPayments/StudentPayments'
import StudentTeacher from '../StudentTeacher/StudentTeacher'
import StudentAssignments from '../StudentAssignments/StudentAssignments'
import { Switch, Route } from 'react-router-dom'
import NewPaymentsStudents from './NewPaymentsStudents'

export default function StudentHomePage(){
    return(
        <div>
            <NavBarStudent />
            <Switch>
                <Route exact path='/student' render={() =>{
                    return(
                        <div>
                            <div>StudentHomePage</div>
                            <StudentSchedule />
                            <NewAssignments />
                            <NewPaymentsStudents /> 
                        </div>
                    )
                }}/>
                <Route path='/student/lessons' component={StudentLessons}/>
                <Route path='/student/logs' component={StudentLogs}/>
                <Route path='/student/payments' component={StudentPayments}/>
                <Route path='/student/teacher' component={StudentTeacher}/>
                <Route path='/student/assignments' component={StudentAssignments}/>

            </Switch>

        </div>
    )
}