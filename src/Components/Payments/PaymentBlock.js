import React from 'react'
const moment = require('moment')

export default class PaymentBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='payment-block' >
                <div>
                    <p>Invoice ID: <b>{this.props.paymentId}</b></p>
                    <p>Student Name: <b>{this.props.studentName}</b></p>
                </div>
                <div>
                    <p>Invoice Date: <b>{moment(this.props.paymentDate).format('llll')}</b></p>
                    <p>Invoice Total: <b>${this.props.paymentAmount}</b></p>
                </div>
            </div>
        )
    }
}