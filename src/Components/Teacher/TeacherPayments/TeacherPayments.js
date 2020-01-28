import React from 'react'
import TeacherPaymentInvoiceForm from './TeacherPaymentInvoiceForm'
import InvoicesNotPaid from './InvoicesNotPaid'
import InvoicesPaid from './InvoicesPaid'

import './styles/TeacherPayments.css' 

export default function TeacherPayments(){
    return(
        <div className= 'teacher-payments-container' >
            <h2>TeacherPayments</h2>
            <div className='invoice-container' >
                <TeacherPaymentInvoiceForm />
                <InvoicesPaid />
                <InvoicesNotPaid />
            </div>
        </div>
    )
}