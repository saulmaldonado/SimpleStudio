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
            <div>
                <div>
                    <p>Payment ID: {this.props.paymentId}</p>
                    <p>Student Name: {this.props.studentName}</p>
                </div>
                <div>
                    <p>Invoice Date: {moment(this.props.paymentDate).format('llll')}</p>
                    <p>Invoice Total: {this.props.paymentAmount}</p>
                </div>
            </div>
        )
    }
}