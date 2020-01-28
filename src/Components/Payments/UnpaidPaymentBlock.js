import React from 'react'
const moment = require('moment')

export default class UnpaidPaymentBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <p>Invoice ID: {this.props.paymentId}</p>
                <p>Invoice Date: {moment(this.props.paymentDate).format('llll')} </p>
                <p>NOT PAID</p>
                <p>Due Date: {moment(this.props.paymentDueDate).format('ll')}</p>
                <p>Amount: ${this.props.paymentAmount}</p>
            </div>
        )
    }
}