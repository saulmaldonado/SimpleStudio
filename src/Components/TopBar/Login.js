import React from 'react'
import {connect} from 'react-redux'
import {loginTeacher, logoutTeacher} from '../../redux/reducers/teacherAuthReducer'
import {loginStudent, logoutStudent} from '../../redux/reducers/studentAuthReducer'
import { Redirect } from 'react-router-dom'
import NotificationFeedStudent from './NotificationFeedStudent'

class Name extends React.Component{
    constructor(){
        super()
        this.state={
            email: '',
            password: '',
            accountType: ''
        }
    }

    handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    handleLoginTeacher = (e) => {
        const {loginTeacher} = this.props
        const {email, password} = this.state

        e.preventDefault()

        loginTeacher({email, password})

        this.setState({
            email: '',
            password: ''
        })
    }
    handleLoginStudent = (e) => {
        const {loginStudent} = this.props
        const {email, password} = this.state

        e.preventDefault()

        loginStudent({email, password})

        this.setState({
            email: '',
            password: ''
        })
    }

    handleStudentLogout = (e) => {
        const {logoutStudent} = this.props
        
        logoutStudent()


    }

    handleTeacherLogout = (e) => {

        const {logoutTeacher} = this.props

        logoutTeacher()


    }
    
    
    render(){
        const {email, password} = this.state

        if(this.props.student.student_id){
            return (
            <div>
                <button onClick={this.handleStudentLogout}>Logout</button>
                <NotificationFeedStudent />
                <Redirect to='/student' />
            </div>)
        } else if(this.props.teacher.teacher_id){
            return (
                <div>
                    <button onClick={this.handleTeacherLogout}>Logout</button>
                    <Redirect to='/teacher' />
                </div>
            )
        }

        return(
            <div>
                <Redirect to='/' />
                <div>Login</div>
                <form autoComplete='on' onSubmit={this.state.accountType === 'Teacher' ? this.handleLoginTeacher : this.handleLoginStudent} >
                    <input type='email' label='Email' autoComplete='on' placeholder='Email' name='email' onChange={this.handleInputChange} value={email} required/>
                    <input placeholder='Password' label='Password' autoComplete='on' name='password' type='password'  onChange={this.handleInputChange} value={password} required/>
                    <input type='radio' name='accountType' value='Student' onChange={this.handleInputChange} required/> Student
                    <input type='radio' name='accountType' value='Teacher' onChange={this.handleInputChange}/> Teacher
                    <input  type='submit' value='Login' />
                </form>
            </div>
            
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        teacher: reduxState.teacherAuthReducer,
        student: reduxState.studentAuthReducer
    }
}

export default connect(mapStateToProps, {loginTeacher, loginStudent, logoutTeacher, logoutStudent})(Name)