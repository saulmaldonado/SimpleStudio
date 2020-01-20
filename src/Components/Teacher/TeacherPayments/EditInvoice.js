import React from 'react'
import { connect } from 'react-redux'
import { editPayment, getPayment } from '../../../redux/reducers/paymentReducer'
import {getAllPaidPaymentsForTeacher, getAllUnpaidPaymentsForTeacher} from '../../../redux/reducers/teacherReducer'


class EditInvoice extends React.Component{
    constructor(){
        super()
        this.state={
            payment_amount: '',
            payment_duedate: '',
            payment_ispaid: ''
        }
    }

    componentDidMount(){
        this.props.getPayment(this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if (prevProps.payment.payment_id !== this.props.payment.payment_id){
            this.props.getPayment(this.props.match.params.id)
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

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }


    render(){
        console.log(this.props)
        console.log(this.state)
        const {
        payment_amount,
        payment_duedate,
        payment_ispaid
        } = this.state

        return(
            <div>
                <div>Edit Invoice</div>
                <div>
                    <input name='payment_amount' value={payment_amount || ''} onChange={this.handelInputChange} placeholder='Amount' />
                    <input name='payment_duedate' value={payment_duedate || ''} onChange={this.handelInputChange} placeholder='Due Date' />
                    <select name='payment_ispaid' value={payment_ispaid || ''} onChange={this.handelInputChange}>
                        <option value={false}>Not Paid</option>
                        <option value={true}>Paid</option>
                    </select>
                    <button onClick={this.saveChanges}>Save Changes</button>
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