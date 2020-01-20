import React from 'react'
import NewInvoice from './NewInvoice'
import EditInvoice from './EditInvoice'
import { Switch, Route } from 'react-router-dom'

export default class TeacherPaymentInvoiceForm extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                    <div>TeacherPaymentInvoiceForm</div>
                <Switch>
                    <Route path='/teacher/payments/edit/:id' component={EditInvoice} />
                    <Route path='/teacher/payments' component={NewInvoice} />
                    <NewInvoice />
                    <EditInvoice />
                </Switch>
            </div>
        )
    }
}