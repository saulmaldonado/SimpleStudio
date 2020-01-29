import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {deletePayment} from '../../redux/reducers/paymentReducer'
import {getAllUnpaidPaymentsForTeacher, getAllPaidPaymentsForTeacher} from '../../redux/reducers/teacherReducer'

import './styles/UnpaidPaymentBlockTeacher.css'

const moment = require('moment')

class UnpaidPaymentBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    deleteInvoice = async() => {
        if(window.confirm('Are you sure you want to delete this invoice?') === true){
            await this.props.deletePayment(this.props.paymentId)

            alert(` Invoice ID# ${this.props.paymentId} has been deleted.`)

            this.props.getAllUnpaidPaymentsForTeacher(this.props.teacher.teacher_id)

            this.props.history.push('/teacher/payments')
        }
    }
    render(){
        console.log(this.state)
        console.log(this.props)
        return(
            <div className='unpaid-payment-block-teacher' >
                <div className='unpaid-payment-block-teacher-info' >
                    <div className='unpaid-payment-block-teacher-info-div1' >
                        <p>Invoice ID: <b>{this.props.paymentId}</b></p>
                        <p>Student Name: <b> {this.props.studentName}</b> </p>
                        <p>Invoice Date: <br/><b>{moment(this.props.paymentDate).format('llll')}</b> </p>
                    </div>
                    <div>
                        <p><b>NOT PAID ❌</b></p>
                        <p>Due Date: <b>{moment(this.props.paymentDueDate).format('ll')}</b></p>
                        <p>Amount: <b>${this.props.paymentAmount}</b></p>
                    </div>
                </div>
                <div className='unpaid-payment-block-teacher-buttons' >
                    <Link to={`/teacher/payments/edit/${this.props.paymentId}`}><button className='unpaid-payment-block-teacher-buttons-edit' >Edit Invoice</button></Link>
                    <button onClick={this.deleteInvoice} >Delete Invoice</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer       
    }
}

export default withRouter(connect(mapStateToProps, {deletePayment, getAllUnpaidPaymentsForTeacher, getAllPaidPaymentsForTeacher})(UnpaidPaymentBlock))