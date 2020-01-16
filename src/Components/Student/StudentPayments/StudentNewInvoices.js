import React from 'react'
import UnpaidPaymentBlock from '../../Payments/UnpaidPaymentBlock'
import {getAllPaymentsDue} from '../../../redux/reducers/studentReducer'
import { connect } from 'react-redux'

class StudentNewInvoices extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        getAllPaymentsDue(this.props.student.student_id)
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <div>StudentNewInvoices</div>
                {this.props.payments.map((ele, i) => {
                    return <UnpaidPaymentBlock key={i} paymentId={ele.payment_id} paymentDueDate={ele.payment_duedate} paymentAmount={ele.payment_amount} />
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