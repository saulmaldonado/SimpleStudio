import React from 'react'
import { connect } from 'react-redux'
import { editPayment, getPayment } from '../../../redux/reducers/paymentReducer'
import {getAllPaidPaymentsForTeacher, getAllUnpaidPaymentsForTeacher} from '../../../redux/reducers/teacherReducer'
import { DatePicker } from 'antd'

import './styles/NewInvoice.css'

const moment = require('moment')


class EditInvoice extends React.Component{
    constructor(){
        super()
        this.state={
            payment_amount: '',
            payment_duedate: '',
            payment_ispaid: ''
        }
    }

    async componentDidMount(){
        await this.props.getPayment(this.props.match.params.id)

        this.setState({
            payment_amount: this.props.payment.payment_amount,
            payment_duedate: this.props.payment.payment_duedate,
            payment_ispaid: this.props.payment.payment_ispaid
        })    }

    async componentDidUpdate(prevProps){
        if (prevProps.match.params.id !== this.props.match.params.id){

            await this.props.getPayment(this.props.match.params.id)

            this.setState({
                payment_amount: this.props.payment.payment_amount,
                payment_duedate: this.props.payment.payment_duedate,
                payment_ispaid: this.props.payment.payment_ispaid
            })
        }


    }

    saveChanges = () => {

        const {
            payment_amount,
            payment_duedate,
            payment_ispaid
            } = this.state

        let editedPayment = {
            payment_amount,
            payment_duedate,
            payment_ispaid: payment_ispaid === 'true' ? true : false
        }

        this.props.editPayment(this.props.match.params.id, editedPayment)

        alert('Payment has been edited')

        this.setState({
            payment_amount: '',
            payment_duedate: '',
            payment_ispaid: ''
        })

        this.props.getAllUnpaidPaymentsForTeacher(this.props.teacher.teacher_id)
        this.props.getAllPaidPaymentsForTeacher(this.props.teacher.teacher_id)



        this.props.history.push('/teacher/payments')
    }

    discardChanges = () => {
        this.props.history.push('/teacher/payments')
    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    onChange = (date) => {
        this.setState({
            payment_duedate: date
        })
    }

    render(){
        const {
        payment_amount,
        payment_duedate,
        payment_ispaid
        } = this.state

        console.log(this.state)
        console.log(this.props)

        return(
            <div className='new-invoice-form' >
                    <div>Edit Invoice</div>
                    <input name='payment_amount' value={payment_amount || ''} type='number' min='0' onChange={this.handelInputChange} placeholder='Amount' />
                    <DatePicker value={moment(payment_duedate)|| null} format="MMM Do" name='payment_duedate' onChange={this.onChange}/>
                    <select name='payment_ispaid' value={payment_ispaid || ''} onChange={this.handelInputChange}>
                        <option value={false}>Not Paid</option>
                        <option value={true}>Paid</option>
                    </select>
                    <div>
                        <button onClick={this.saveChanges}>Save Changes</button>
                        <button onClick={ this.discardChanges } >Discard Changes</button>
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        payment: reduxState.paymentReducer.paymentSelected      
    }
}

export default connect(mapStateToProps, {getPayment, editPayment, getAllUnpaidPaymentsForTeacher, getAllPaidPaymentsForTeacher})(EditInvoice)