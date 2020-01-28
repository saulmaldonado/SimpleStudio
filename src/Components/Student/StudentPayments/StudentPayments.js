import React from 'react'
import StudentInvoiceHistory from './StudentInvoiceHistory'
import StudentNewInvoices from './StudentNewInvoices'
import { Route, Switch } from 'react-router-dom'
import Checkout from '../../Payments/Checkout'

import './styles/StudentPayments.css'

export default class StudentPayments extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='StudentPayments' >
                <Switch>
                    <Route path='/student/payments/pay/:id' component={Checkout} />
                    <Route path='/student/payments'>
                        <StudentInvoiceHistory />
                        <StudentNewInvoices />
                    </Route>
                </Switch>
            </div>
        )
    }
}