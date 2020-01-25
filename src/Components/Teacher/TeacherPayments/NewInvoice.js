import React from 'react'
import { connect } from 'react-redux'
import {createPayment} from '../../../redux/reducers/paymentReducer'
import {getAllLessonsForTeacher} from '../../../redux/reducers/teacherReducer'
import {CreateNotificationForStudent} from '../../../redux//reducers/studentReducer'

class NewInvoice extends React.Component{
    constructor(){
        super()
        this.state={
            payment_amount: null,
            payment_duedate: '',
            payment_date: '',
            lesson_id: null
        }
    }

    componentDidMount(){
        this.props.getAllLessonsForTeacher(this.props.teacher.teacher_id)
    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    createNewPayment = async() => {
        const { payment_amount,
            payment_duedate,
            payment_date,
            lesson_id } = this.state

        let newPayment = {
            payment_amount: +payment_amount,
            payment_duedate,
            payment_date,
            lesson_id: +lesson_id
        }

        await this.props.createPayment(newPayment)

        alert('Invoice has been created')

        this.setState({
            payment_amount: '',
            payment_duedate: '',
            payment_date: '',
            lesson_id: ''
        })
    }

    render(){
        const { payment_amount,
            payment_duedate,
            payment_date,
            lesson_id } = this.state
        return(
            <div>
                <div>NewInvoice</div>
                <div>
                    <input placeholder='Amount' name='payment_amount' value={payment_amount || ''} onChange={this.handelInputChange} />
                    <input placeholder='Due Date' name='payment_duedate' value={payment_duedate || ''} onChange={this.handelInputChange} />
                    <input placeholder='Invoice Date' name='payment_date' value={payment_date || ''} onChange={this.handelInputChange} />
                    <select name='lesson_id' value={lesson_id||''} onChange={this.handelInputChange}>
                        <option>Select a Lesson</option>
                        {this.props.lessons.map((ele, i) => {
                            return <option key={i} value={ele.lesson_id}> {ele.lesson_time} </option>
                        })}

                    </select>
                    <button onClick={this.createNewPayment} >New Invoice</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        lessons: reduxState.teacherReducer.lessons
    }
}

export default connect (mapStateToProps, {createPayment , getAllLessonsForTeacher, CreateNotificationForStudent})(NewInvoice)