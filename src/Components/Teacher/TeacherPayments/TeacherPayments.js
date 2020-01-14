import React from 'react'
import TopBar from '../../TopBar/TopBar'
import NavBarTeacher from '../../NavBar/NavBarTeacher'
import TeacherPaymentInvoiceForm from './TeacherPaymentInvoiceForm'
import InvoicesNotPaid from './InvoicesNotPaid'
import InvoicesPaid from './InvoicesPaid'

export default function TeacherPayments(){
    return(
        <div>
            <div>TeacherPayments</div>
            <TeacherPaymentInvoiceForm />
            <InvoicesPaid />
            <InvoicesNotPaid />
        </div>
    )
}