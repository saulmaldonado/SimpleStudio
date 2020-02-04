import React from 'react'

import './styles/UnpaidPaymentBlockTeacher.css'

const moment = require('moment')


export default class PaymentBlock extends React.Component{
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
                        <p><b></b></p>
                        <p>Due Date: <b>{moment(this.props.paymentDueDate).format('ll')}</b></p>
                        <p>Amount: <b>${this.props.paymentAmount}</b></p>
                    </div>
                </div>
            </div>
        )
    }
}