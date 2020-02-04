import React from 'react'
import PaymentBlock from '../../Payments/PaymentBlock'
import {connect} from 'react-redux'
import {getAllPaymentsForTeacher} from '../../../redux/reducers/teacherReducer'

import './styles/TeacherNewPayments.css'

class TeacherNewPayments extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAllPaymentsForTeacher(this.props.teacher.teacher_id)
    }

    render(){
        console.log(this.props)
        return(
        
        <div className='newly-submitted-payments-container' >
            <h3>Recently Submitted Payments</h3>
            <div className='newly-submitted-payments' >
                {this.props.teacherInfo.map((ele, i ) => {
                    return <PaymentBlock key={i} paymentId={ele.payment_id} paymentDate={ele.payment_date} paymentAmount={ele.payment_amount} studentName={`${ele.student_first_name} ${ele.student_last_name}`}/>
                })}
            </div>
        </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    
    return {
        teacher: reduxState.teacherAuthReducer,
        teacherInfo: reduxState.teacherReducer.payments
    }   
}

export default connect(mapStateToProps, {getAllPaymentsForTeacher})(TeacherNewPayments)

