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
                <p>Invoice ID: {this.props.paymentId}</p>
                <p>Invoice Date: {this.props.paymentDate} </p>
                <p>NOT PAID</p>
                <p>Due Date: {this.props.paymentDueDate}</p>
                <p>Amount: ${this.props.paymentAmount}</p>
            </div>
        )
    }
}