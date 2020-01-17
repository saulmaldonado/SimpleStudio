import React from 'react'
import PaymentBlock from '../../Payments/PaymentBlock'
import { connect } from 'react-redux'
import {getAllPaidPaymentsForTeacher} from '../../../redux/reducers/teacherReducer'


class InvoicesPaid extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAllPaidPaymentsForTeacher(this.props.teacher.teacher_id)
    }


    render(){
        console.log(this.props)
        return(
            <div>
                <div>InvoicesNotPaid</div>
                <div>
                    {this.props.payments.map((ele, i) => {
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

export default connect (mapStateToProps, {getAllPaidPaymentsForTeacher})(InvoicesPaid)