import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import { connect } from 'react-redux'
import {getPayment, payPayment} from '../../redux/reducers/paymentReducer'
import {getAllPaymentsDue} from '../../redux/reducers/studentReducer'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import {CreateNotificationForTeacher} from '../../redux/reducers/teacherReducer'


class PaymentPage extends React.Component{
    constructor(){
        super()
        this.state={

        }
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
                notification_body: `${this.props.student.student_first_name} has paid off invoice #${this.props.payment_id}`,
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
                <p>Would you like to payoff this invoice?</p>
                <CardElement />
                <button onClick={this.submit}>Submit Payment</button>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        payment: reduxState.paymentReducer.paymentSelected
    }
}

export default withRouter(injectStripe(connect(mapStateToProps, {getPayment, payPayment, getAllPaymentsDue, CreateNotificationForTeacher})(PaymentPage)))