import React from 'react'
import StudentInvoiceHistory from './StudentInvoiceHistory'
import StudentNewInvoices from './StudentNewInvoices'


export default class StudentPayments extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>StudentPayments</div>
                <StudentInvoiceHistory />
                <StudentNewInvoices />
            </div>
        )
    }
}