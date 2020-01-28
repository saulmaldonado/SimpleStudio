import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {deletePayment} from '../../redux/reducers/paymentReducer'
import {getAllUnpaidPaymentsForTeacher, getAllPaidPaymentsForTeacher} from '../../redux/reducers/teacherReducer'

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
            <div>
                <p>Invoice ID: {this.props.paymentId}</p>
                <p>Student Name: {this.props.studentName} </p>
                <p>Invoice Date: {moment(this.props.paymentDate).format('llll')} </p>
                <p>NOT PAID</p>
                <p>Due Date: {moment(this.props.paymentDueDate).format('ll')}</p>
                <p>Amount: ${this.props.paymentAmount}</p>
                <Link to={`/teacher/payments/edit/${this.props.paymentId}`}><button>Edit Invoice</button></Link>
                <button onClick={this.deleteInvoice} >Delete Invoice</button>
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