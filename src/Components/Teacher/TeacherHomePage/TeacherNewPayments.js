import React from 'react'
import PaymentBlock from '../../Payments/PaymentBlock'
import {connect} from 'react-redux'
import {getAllPaymentsForTeacher} from '../../../redux/reducers/teacherReducer'

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
        
        <div>
            <div>Recently Submitted Payments</div>
            {this.props.teacherInfo.map((ele, i ) => {
                return <PaymentBlock key={i} paymentId={ele.payment_id} paymentDate={ele.payment_date} paymentAmount={ele.payment_amount} studentName={`${ele.student_first_name} ${ele.student_last_name}`}/>
            })}
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

