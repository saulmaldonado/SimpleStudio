import React from 'react'
import NavBarTeacher from '../../NavBar/NavBarTeacher'
import TeacherAgenda from './TeacherAgenda'
import TeacherNewLogs from './TeacherNewLogs'
import TeacherLessons from '../TeacherLessons/TeacherLessons'
import TeacherLogs from '../TeacherLogs/TeacherLogs'
import TeacherPayments from '../TeacherPayments/TeacherPayments'
import TeacherStudents from '../TeacherStudents/TeacherStudents'
import TeacherAssignments from '../TeacherAssignments/TeacherAssignments'
import TeacherNewPayments from './TeacherNewPayments'
import { Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'

import './styles/TeacherHomePage.css'
 

function TeacherHomePage (props){
    return(
        <div>
            <NavBarTeacher />
            <Switch>
                <Route exact path='/teacher' render={() => {
                    return(
                        <div className='TeacherHomePage' >
                        <h1>Welcome! {`${props.teacher.teacher_first_name} ${props.teacher.teacher_last_name}`} </h1>
                            <div className='teacherHP-box-1' >
                                <TeacherAgenda />
                                <div className='weekly-data'>
                                    <p>Lessons this week:</p>
                                    <p>Active Students</p>
                                    <p>This weeks estimated revenue:</p>
                                </div>
                            </div>
                            <div className='teacherHP-box-2' >
                                <TeacherNewLogs />
                                <TeacherNewPayments />
                            </div>
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

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer
    }
}

export default connect(mapStateToProps)(TeacherHomePage)