import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {CreateNotificationForStudent} from '../../../redux/reducers/studentReducer'

class AddStudentForm extends React.Component{
    constructor(){
        super()
        this.state={
            student_email: ''
        }
    }

    addStudent =  () => {
        const {student_email} = this.state

         axios.get(`/auth/student?student_email=${student_email}`)
                    .then(res => {
                        const studentFound = res.data

                        if(studentFound.teacher_id){
                           return alert('Student already has teacher')
                        }

                        const newNotification = {
                            notification_type: 'Assign student to Teacher',
                            notification_title: `${this.props.teacher.teacher_first_name} ${this.props.teacher.teacher_last_name} would like to add you as their student`,
                            notification_body: `${this.props.teacher.teacher_first_name} ${this.props.teacher.teacher_last_name} has requested to add you as their student. Confirm this request to begin scheduling lessons, receive assignment, and make payments online`,
                            teacher_id: this.props.teacher.teacher_id
                        }

                        console.log(studentFound.student_id, newNotification)
                
                        if(window.confirm(`Are you sure you want to request to add ${studentFound.student_first_name} ${studentFound.student_last_name} as a student`) === true){
                            this.props.CreateNotificationForStudent(studentFound.student_id, newNotification)
                        }
                    })

                    .catch(res => {alert (res.response.data)})

    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }




    render(){

        return(
            <div>
                <div>Add Student</div>
                
                <div>
                    <input name='student_email' placeholder={`Enter Student's email`} value={this.state.student_email} onChange={this.handelInputChange}/>
                    <button onClick={this.addStudent}>Invite</button>
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

export default connect(mapStateToProps, {CreateNotificationForStudent})(AddStudentForm)