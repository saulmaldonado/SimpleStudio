import React from 'react'
import PaymentBlockStudent from '../../Payments/PaymentBlockStudent'
import {getAllPayments} from '../../../redux/reducers/studentReducer'
import { connect } from 'react-redux'

class StudentInvoiceHistory extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAllPayments(this.props.student.student_id)
    }

    render(){
        return(
            <div>
                <div>Unpaid Invoices</div>
                {this.props.payments.map((ele, i) => {
                    return <PaymentBlockStudent key={i} paymentId={ele.payment_id} paymentDate={ele.payment_date} paymentDueDate={ele.payment_duedate} paymentAmount={ele.payment_amount} />
                })}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        payments: reduxState.studentReducer.payments       
    }
}

export default connect (mapStateToProps, {getAllPayments})(StudentInvoiceHistory)