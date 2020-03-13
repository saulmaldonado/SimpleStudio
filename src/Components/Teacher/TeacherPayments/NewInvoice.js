import React from 'react'
import { connect } from 'react-redux'
import {createPayment} from '../../../redux/reducers/paymentReducer'
import {getAllLessonsForTeacher, getAllUnpaidPaymentsForTeacher} from '../../../redux/reducers/teacherReducer'
import {CreateNotificationForStudent} from '../../../redux//reducers/studentReducer'
import { DatePicker } from 'antd'

import './styles/NewInvoice.css'

const moment = require('moment')

class NewInvoice extends React.Component{
    constructor(){
        super()
        this.state={
            payment_amount: null,
            payment_duedate: '',
            payment_date: '',
            lesson_id: null
        }
    }

    componentDidMount(){
        this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)
    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    createNewPayment = async() => {
        const { payment_amount,
            payment_duedate,
            lesson_id } = this.state
            
            let lesson_date = this.props.lessons.find(ele => ele.lesson_id === +lesson_id).lesson_time
            
            console.log(lesson_date)

        let newPayment = {
            payment_amount: +payment_amount,
            payment_duedate,
            payment_date: lesson_date,
            lesson_id: +lesson_id
        }


        let student_name = `${this.props.lessons.find(ele => ele.lesson_id === +lesson_id).student_first_name} ${this.props.lessons.find(ele => ele.lesson_id === +lesson_id).student_last_name}`
        
        let student_id = this.props.lessons.find(ele => ele.lesson_id === +lesson_id).student_id

        console.log(student_name)

        if(window.confirm(`Are you want to send an invoice for $${payment_amount} to ${student_name}?`) === true){

            await this.props.createPayment(newPayment)
    
            alert('Invoice has been sent.')

            let newNotification = {
                notification_type: 'invoice_sent',
                notification_title: 'You have a new invoice due.',
                notification_body: `Your teacher has sent you a new invoice for $${payment_amount} due on ${moment(payment_duedate).format('ll')}.`,
                teacher_id: this.props.teacher.teacher_id
            }

            await this.props.CreateNotificationForStudent(student_id, newNotification)

            this.setState({
                payment_amount: '',
                payment_duedate: '',
                payment_date: null,
                lesson_id: ''
            })

            this.props.getAllUnpaidPaymentsForTeacher(this.props.teacher.teacher_id)
        }
    }

    onChange = (date) => {
        this.setState({
            payment_duedate: date
        })
    }

    render(){
        console.log(this.state)
        console.log(this.props)
        const { payment_amount,
            payment_duedate,
            lesson_id } = this.state
        return(
            <div className='new-invoice-form' >
                <h3>Create Invoice</h3>
                <input placeholder='Amount' type='number' min='0' name='payment_amount' value={payment_amount || ''} onChange={this.handelInputChange} />
                <DatePicker value={payment_duedate|| null} format="MMM Do" name='payment_duedate' onChange={this.onChange}/>
                <select name='lesson_id' value={lesson_id||''} onChange={this.handelInputChange}>
                    <option>Select a Lesson</option>
                    {this.props.lessons.map((ele, i) => {
                        return <option key={i} value={ele.lesson_id}> {moment(ele.lesson_time).format('MM/DD h:mm a ')}{`${ele.student_first_name} ${ele.student_last_name}`} </option>
                    })}

                </select>
                <button onClick={this.createNewPayment} >Send Invoice</button>
            </div>
        )
    }
}
const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        lessons: reduxState.teacherReducer.lessons
    }
}

export default connect (mapStateToProps, {createPayment , getAllLessonsForTeacher, CreateNotificationForStudent, getAllUnpaidPaymentsForTeacher})(NewInvoice)