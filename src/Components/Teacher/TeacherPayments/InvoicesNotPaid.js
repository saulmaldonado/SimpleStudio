import React from 'react'
import UnpaidPaymentBlockTeacher from '../../Payments/UnpaidPaymentBlockTeacher'
import { connect } from 'react-redux'
import {getAllUnpaidPaymentsForTeacher} from '../../../redux/reducers/teacherReducer'
import { withRouter } from 'react-router-dom'


class InvoicesNotPaid extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAllUnpaidPaymentsForTeacher(this.props.teacher.teacher_id)
    }

    // shouldComponentUpdate(nextProps){
    //     if(nextProps.payments.length === this.props.payments.length){
    //         this.props.getAllUnpaidPaymentsForTeacher(this.props.teacher.teacher_id)
    //     }
    // }

    // componentDidUpdate(prevProps){
    //     if(prevProps.payments.length !== this.props.payments.length){
    //         this.props.getAllUnpaidPaymentsForTeacher(this.props.teacher.teacher_id)
    //     }
    // }


    render(){
        return(
            <div>
                <div>InvoicesNotPaid</div>

                <div>
                    {typeof this.props.payments === 'string' ? <div>Teacher has no unpaid invoices</div> : this.props.payments.map((ele, i) => {
                        return <UnpaidPaymentBlockTeacher key={i} paymentId={ele.payment_id} paymentDueDate={ele.payment_duedate} studentName={`${ele.student_first_name} ${ele.student_last_name}`} paymentDate={ele.payment_date} paymentAmount={ele.payment_amount} />
                    })}
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        payments: reduxState.teacherReducer.paymentsUnpaid
    }
}   

export default withRouter(connect (mapStateToProps, {getAllUnpaidPaymentsForTeacher})(InvoicesNotPaid))