import React from 'react'
import NavBarTeacher from '../../NavBar/NavBarTeacher'
import TeacherAgenda from './TeacherAgenda'
import TeacherNewLogs from './TeacherNewLogs'
import TeacherLessons from '../TeacherLessons/TeacherLessons'
import TeacherLogs from '../TeacherLogs/TeacherLogs'
import TeacherPayments from '../TeacherPayments/TeacherPayments'
import TeacherStudents from '../TeacherStudents/TeacherStudents'
import TeacherAssignments from '../TeacherAssignments/TeacherAssignments'
import { Route, Switch } from 'react-router-dom'
 

export default function TeacherHomePage(){
    return(
        <div>
            <NavBarTeacher />
            <Switch>
                <Route exact path='/teacher' render={() => {
                    return(
                        <div>
                            <div>TeacherHomePage</div>
                            <TeacherAgenda />
                            <TeacherNewLogs />
                        </div>
                    )
                }} />
                <Route path='/teacher/lessons' component={TeacherLessons} />
                <Route path='/teacher/logs' component={TeacherLogs} />
                <Route path='/teacher/payments' component={TeacherPayments} />
                <Route path='/teacher/students' component={TeacherStudents} />
                <Route path='/teacher/assignments' component={TeacherAssignments} />

            </Switch>
        </div>
    )
}