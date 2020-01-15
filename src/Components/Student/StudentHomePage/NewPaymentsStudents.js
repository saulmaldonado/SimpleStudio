import React from 'react'
import { connect } from 'react-redux'
import {getAllPaymentsDue} from '../../../redux/reducers/studentReducer'
import UnpaidPaymentBlock from '../../Payments/UnpaidPaymentBlock'

class NewPaymentsStudents extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getAllPaymentsDue(this.props.student.student_id)
    }


    render(){
        return(
            <div>
                <div>Payments Due</div>
                    {typeof this.props.payments === 'string' ? <div>{this.props.payments}</div> : this.props.payments.map((ele, i) => {
                         return <UnpaidPaymentBlock key={i} paymentId={ele.payment_id} paymentDueDate={ele.payment_duedate} paymentAmount={ele.payment_amount}/>
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

export default connect(mapStateToProps, {getAllPaymentsDue})(NewPaymentsStudents)
