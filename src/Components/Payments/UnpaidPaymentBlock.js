import React from 'react'

export default class UnpaidPaymentBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <p>Payment ID: {this.props.paymentId}</p>
                <p>NOT PAID</p>
                <p>Due Date: {this.props.paymentDueDate}</p>
                <p>Amount: ${this.props.paymentAmount}</p>
            </div>
        )
    }
}