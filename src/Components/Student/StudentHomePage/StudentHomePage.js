import React from 'react'
import NavBarStudent from '../../NavBar/NavBarStudent'
import NewAssignments from './NewAssignments'
import StudentLessons from '../StudentLessons/StudentLessons'
import StudentLogs from '../StudentsLogs/StudentLogs'
import StudentPayments from '../StudentPayments/StudentPayments'
import StudentTeacher from '../StudentTeacher/StudentTeacher'
import StudentAssignments from '../StudentAssignments/StudentAssignments'
import { Switch, Route } from 'react-router-dom'
import NewPaymentsStudents from './NewPaymentsStudents'
import {getAllLogsForStudent} from '../../../redux/reducers/studentReducer'

import './styles/StudentHomePage.css'
import { connect } from 'react-redux'
import StudentScheduleForHP from './StudentScheduleForHP'

const moment = require('moment')

class StudentHomePage extends React.Component{

    componentDidMount(){
        this.props.getAllLogsForStudent(this.props.student.student_id)
    }


        render(){
            return(
                <div>
                <NavBarStudent />
                <Switch>
                    <Route exact path='/student' render={() =>{
                        return(
                            <div className='student-homepage'>
                                <h1 className='student-schedule-title' >Welcome, {this.props.student.student_first_name} {this.props.student.student_last_name}!</h1>
                                <h3 className='student-hp-date' >{moment().format('llll')}</h3>
                                <div className='box-1'>
                                    <StudentScheduleForHP />
                                    <div className='student-stats'>
                                        <div>
                                        </div>
                                        <div>
                                            <NewPaymentsStudents /> 
                                        </div>
                                    </div>
                                </div>
                                <div className='box-2'>
                                    <NewAssignments />
                                </div>
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
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        logs: reduxState.studentReducer.logs       
    }
}

export default connect (mapStateToProps, {getAllLogsForStudent})(StudentHomePage)