import React from 'react'
import { connect } from 'react-redux'
import {addLog} from '../../../redux/reducers/logsReducer'
import {getAllLogsForStudent} from '../../../redux/reducers/studentReducer'
import {CreateNotificationForTeacher} from '../../../redux/reducers/teacherReducer'

import './styles/NewPracticeLog.css'
import { DatePicker } from 'antd'

const moment = require('moment')

class NewPracticeLog extends React.Component{
    constructor(){
        super()
        this.state={
            log_date: moment(),
            log_time: '',
            log_material: ''
        }
    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    submitLog = (e) => {
        const {log_date, log_time, log_material} = this.state

        e.preventDefault()


        if(+log_time < 0 || !+log_time){
           return alert('Minutes practiced must be number greater then 0')
        }

        let newLog = {
            log_date,
            log_time: +log_time,
            log_material,
            student_id: this.props.student.student_id
        }

        if(window.confirm('Are you sure you want to submit this practice log?') === true){
            this.props.addLog(newLog)
    
            this.setState({
                log_date: '',
                log_time: '',
                log_material: ''
            })
            alert('Practice Log Submitted!')

            this.props.getAllLogsForStudent(this.props.student.student_id)

            this.props.CreateNotificationForTeacher(this.props.student.teacher_id, {
                notification_type: 'new_practice_log',
                notification_title: `New practice log`,
                notification_body: `${this.props.student.student_first_name} ${this.props.student.student_last_name} has submitted a new practice log and has practiced for ${newLog.log_time} minutes.`,
                student_id: this.props.student.student_id
            })
        }
    }

    onChange = (date) => {
        this.setState({
            log_date: date
        })
    }

    render(){
        return(
            <div className='NewPracticeLog' >
                <div>New Practice Log</div>
                <form className='new-log-form' onChange={this.handelInputChange} onSubmit={this.submitLog}>
                    <DatePicker value={this.state.log_date || null} format="MMM Do, h:mm a" name='log_date' showTime={{ format: 'HH:mm', minuteStep: 15, use12Hours:true}} onChange={this.onChange} />

                    {/* <input name='log_date' value={this.state.log_date} onChange={this.handelInputChange} type='datetime-local' placeholder='Date' require='true'/> */}
                    <input type='number' name='log_time' min='5' step='5' value={this.state.log_time} onChange={this.handelInputChange} placeholder='Minutes Practiced' require='true'/>
                    <textarea name='log_material' value={this.state.log_material} onChange={this.handelInputChange} placeholder='What did you practice?' require='true'/>
                    <input className='submit-practice-log' type='submit' value='Submit Practice Log'/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        logs: reduxState.logsReducer.logs       
    }
}

export default connect(mapStateToProps, {addLog, getAllLogsForStudent, CreateNotificationForTeacher})(NewPracticeLog)