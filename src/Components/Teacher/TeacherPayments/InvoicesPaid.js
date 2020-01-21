import React from 'react'
import PaymentBlock from '../../Payments/PaymentBlock'
import { connect } from 'react-redux'
import {getAllPaidPaymentsForTeacher} from '../../../redux/reducers/teacherReducer'
import { withRouter } from 'react-router-dom'


class InvoicesPaid extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAllPaidPaymentsForTeacher(this.props.teacher.teacher_id)
    }

    // shouldComponentUpdate(nextProps){
    //     if(nextProps.payments.length === this.props.payments.length){
    //         this.props.getAllPaidPaymentsForTeacher(this.props.teacher.teacher_id)
    //     }
    // }

    // componentDidUpdate(prevProps){
    //     console.log(prevProps.payments.length)
    //     console.log(this.props.payments.length)
    //     if(prevProps.payments.length !== this.props.payments.length){
    //         this.props.getAllPaidPaymentsForTeacher(this.props.teacher.teacher_id)
    //     }
    // }


    render(){
        return(
            <div>
                <div>Invoices Paid</div>
                <div>
                    {typeof this.props.payments === 'string' ? <div>Teacher has no payments</div> : this.props.payments.map((ele, i) => {
                        return <PaymentBlock key={i} paymentId={ele.payment_id} studentName={`${ele.student_first_name} ${ele.student_last_name} `} paymentDate={ele.payment_date} paymentAmount={ele.payment_amount} />
                    })}
                    

                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        payments: reduxState.teacherReducer.paymentsPaid
    }
}   

export default withRouter(connect (mapStateToProps, {getAllPaidPaymentsForTeacher})(InvoicesPaid))