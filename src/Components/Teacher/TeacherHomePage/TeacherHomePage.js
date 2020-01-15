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
 

function TeacherHomePage (props){
    return(
        <div>
            <NavBarTeacher />
            <Switch>
                <Route exact path='/teacher' render={() => {
                    return(
                        <div>
                            <h1>Welcome! {`${props.teacher.teacher_first_name} ${props.teacher.teacher_last_name}`} </h1>
                            <TeacherAgenda />
                            <TeacherNewLogs />
                            <TeacherNewPayments />
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