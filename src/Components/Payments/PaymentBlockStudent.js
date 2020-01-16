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
                    <p>Lesson Date: {this.props.paymentDate}</p>
                </div>
                <div>
                    <p>Due Date: {this.props.paymentDueDate}</p>
                    <p>Payment Total: ${this.props.paymentAmount}</p>
                </div>
            </div>
        )
    }
}