import React from 'react'
import PaymentBlock from '../../Payments/PaymentBlock'

export default class StudentInvoiceHistory extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>StudentInvoiceHistory</div>
                <PaymentBlock />
            </div>
        )
    }
}