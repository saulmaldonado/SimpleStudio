import React from 'react'
import NewInvoice from './NewInvoice'
import EditInvoice from './EditInvoice'

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
                <NewInvoice />
                <EditInvoice />
            </div>
        )
    }
}