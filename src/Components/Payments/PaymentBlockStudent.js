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
                    <p>Lesson Date: {moment(this.props.paymentDate).format('llll')}</p>
                </div>
                <div>
                    <p>Due Date: {moment(this.props.paymentDueDate).format('ll')}</p>
                    <p>Payment Total: ${this.props.paymentAmount}</p>
                </div>
            </div>
        )
    }
}