import React from 'react'
import UnpaidPaymentBlock from '../../Payments/UnpaidPaymentBlock'

export default class StudentNewInvoices extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>StudentNewInvoices</div>
                <UnpaidPaymentBlock />
            </div>
        )
    }
}