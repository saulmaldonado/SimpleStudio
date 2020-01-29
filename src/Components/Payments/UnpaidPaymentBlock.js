import React from 'react'
import './styles/UnpaidPaymentBlockTeacher.css'
import { Link } from 'react-router-dom'
const moment = require('moment')


export default class UnpaidPaymentBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='unpaid-payment-block-teacher' >
                <div className='unpaid-payment-block-teacher-info' >
                    <div className='unpaid-payment-block-teacher-info-div1' >
                        <p>Invoice ID: <b>{this.props.paymentId}</b></p>
                        <p>Invoice Date: <br/><b>{moment(this.props.paymentDate).format('llll')}</b> </p>
                    </div>
                    <div>
                        <p><b>NOT PAID ❌ </b></p>
                        <p>Due Date: <b>{moment(this.props.paymentDueDate).format('ll')}</b></p>
                        <p>Amount: <b>${this.props.paymentAmount}</b></p>
                        <Link  key={this.props.paymentId} to={`/student/payments/pay/${this.props.paymentId}`} ><button className='unpaidpaymentstudent'>Pay Now</button></Link> 
                    </div>
                </div>
            </div>
        )
    }
}