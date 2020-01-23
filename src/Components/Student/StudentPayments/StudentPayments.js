import React from 'react'
import StudentInvoiceHistory from './StudentInvoiceHistory'
import StudentNewInvoices from './StudentNewInvoices'
import { Route } from 'react-router-dom'
import Checkout from '../../Payments/Checkout'


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
                <Route path='/student/payments/pay/:id' component={Checkout} />
                <Route path='/student/payments'>
                    <StudentInvoiceHistory />
                    <StudentNewInvoices />
                </Route>
            </div>
        )
    }
}