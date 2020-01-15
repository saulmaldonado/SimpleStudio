import React from 'react'

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
                    <p>Payment Requested: {this.props.paymentDate}</p>
                    <p>Payment Total: {this.props.paymentAmount}</p>
                </div>
            </div>
        )
    }
}