import React from 'react'
import UnpaidPaymentBlock from '../../Payments/UnpaidPaymentBlock'
import {getAllPaymentsDue} from '../../../redux/reducers/studentReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class StudentNewInvoices extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAllPaymentsDue(this.props.student.student_id)
    }

    updateList = () => {
        this.props.getAllPaymentsDue(this.props.student.student_id)
    }



    render(){
        console.log(this.props)
        return(
            <div>
                <div>StudentNewInvoices</div>
                { typeof this.props.payments === 'string' ? <div>No payments are due</div> : this.props.payments.map((ele, i) => {
                    return <Link key={i} to={`/student/payments/pay/${ele.payment_id}`} ><UnpaidPaymentBlock key={i} paymentId={ele.payment_id} paymentDueDate={ele.payment_duedate} paymentAmount={ele.payment_amount}/></Link>
                })}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        payments: reduxState.studentReducer.paymentsDue 
    }
}

export default connect(mapStateToProps, {getAllPaymentsDue})(StudentNewInvoices)