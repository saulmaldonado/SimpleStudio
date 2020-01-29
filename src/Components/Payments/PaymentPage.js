import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import { connect } from 'react-redux'
import {getPayment, payPayment} from '../../redux/reducers/paymentReducer'
import {getAllPaymentsDue} from '../../redux/reducers/studentReducer'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {CreateNotificationForTeacher} from '../../redux/reducers/teacherReducer'
import {getLesson} from '../../redux/reducers/lessonReducer'

import './styles/PaymentPage.css'

const moment = require('moment')

class PaymentPage extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    async componentDidMount(){
        await this.props.getPayment(this.props.payment_id)
        this.props.getLesson(this.props.payment.lesson_id)
    }


    submit = async (req, res) => {
        let {token} = await this.props.stripe.createToken({name: `${this.props.student.student_first_name} ${this.props.student.student_last_name}`})

        const {payment_amount} = this.props.payment

        let response = await axios.post('/charge', {token, payment_amount})

        if (response.status === 200){

            await this.props.payPayment(this.props.payment_id)

            let newNotification = {
                notification_type: 'payment_made',
                notification_title: 'An invoice has been paid',
                notification_body: `${this.props.student.student_first_name} ${this.props.student_last_name} has paid off invoice ID #${this.props.payment_id}`,
                student_id: this.props.student.student_id
            }

            await this.props.CreateNotificationForTeacher(this.props.student.teacher_id, newNotification)

            await this.props.getAllPaymentsDue(this.props.student.student_id)

            this.setState({complete: true})

            this.props.history.push('/student/payments')
        } else {
            alert('There was an error processing your payment.')
        }
    }

    render(){
        console.log(this.props)

        return(
            <div className='checkout'>
                <div>
                    <p>Invoice ID #: {this.props.payment_id}</p>
                    <p>Lesson Date: {moment(this.props.lesson.lesson_time).format('lll')}</p>
             

                </div>
                <CardElement />
                <button className='paymentpagebuttonsubmit' onClick={this.submit}>Pay ${this.props.payment.payment_amount}</button>
                <button className='paymentpagebuttonback'  onClick={() => this.props.history.push('/student/payments')} >Back</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        payment: reduxState.paymentReducer.paymentSelected,
        lesson: reduxState.lessonReducer.lessons
    }
}

export default withRouter(injectStripe(connect(mapStateToProps, {getPayment, payPayment, getAllPaymentsDue, CreateNotificationForTeacher, getLesson})(PaymentPage)))