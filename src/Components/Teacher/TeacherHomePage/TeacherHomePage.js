import React from 'react'
import NavBarTeacher from '../../NavBar/NavBarTeacher'
import TeacherAgenda from './TeacherAgenda'
import TeacherNewLogs from './TeacherNewLogs'
import TeacherLessons from '../TeacherLessons/TeacherLessons'
import TeacherLogs from '../TeacherLogs/TeacherLogs'
import TeacherPayments from '../TeacherPayments/TeacherPayments'
import TeacherStudents from '../TeacherStudents/TeacherStudents'
import TeacherAssignments from '../TeacherAssignments/TeacherAssignments'
import {getAllLessonsForTeacher, getStudentsForTeacher, getAllPaymentsForTeacher} from '../../../redux/reducers/teacherReducer'
import TeacherNewPayments from './TeacherNewPayments'
import { Route, Switch } from 'react-router-dom'
import {connect} from 'react-redux'

import './styles/TeacherHomePage.css'

const moment = require('moment')
 

class TeacherHomePage extends React.Component{

    componentDidMount(){
        this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)
        this.props.getStudentsForTeacher(this.props.teacher.teacher_id)
        this.props.getAllPaymentsForTeacher(this.props.teacher.teacher_id)
        
    }

    lessonsThisWeek = () => {
        const startOfWeek = moment().startOf('isoWeek')
        const endOfWeek = moment().endOf('isoWeek')
 
        let lessonsThisWeek = this.props.lessons.filter(ele => {
            return moment(ele.lesson_time).isBetween(startOfWeek, endOfWeek)
        })
 
        return lessonsThisWeek.length
     }

     revThisWeek = () => {
        const startOfWeek = moment().startOf('isoWeek')
        const endOfWeek = moment().endOf('isoWeek')

  

            let paymentsThisWeek = this.props.payments.filter(ele => {
                return moment(ele.payment_duedate).isBetween(startOfWeek, endOfWeek)
            })
    
            let totalRev = paymentsThisWeek.reduce((acc, current) => {
                return acc + current.payment_amount
           }, 0)
    
           return totalRev


        

     }



    render(){
        return(
            <div>
                <NavBarTeacher />
                <Switch>
                    <Route exact path='/teacher' render={() => {
                        return(
                            <div className='TeacherHomePage' >
                            <h1>Welcome, {`${this.props.teacher.teacher_first_name} ${this.props.teacher.teacher_last_name}! `} </h1>
                                <div className='teacherHP-box-1' >
                                    <TeacherAgenda />
                                    <div className='weekly-data'>
                                        <p>Lessons this week: <b>{this.lessonsThisWeek()}</b></p>
                                        <p>Active Students: <b>{this.props.students.length}</b></p>
                                        <p>This weeks estimated revenue: <b>${this.revThisWeek()}</b></p>
                                    </div>
                                </div>
                                {/* <div className='teacherHP-box-2' >
                                    <TeacherNewLogs />
                                    <TeacherNewPayments />
                                </div> */}
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
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        lessons: reduxState.teacherReducer.lessons,
        students: reduxState.teacherReducer.students,
        payments: reduxState.teacherReducer.payments
    }
}

export default connect(mapStateToProps , {getAllLessonsForTeacher, getStudentsForTeacher, getAllPaymentsForTeacher})(TeacherHomePage)