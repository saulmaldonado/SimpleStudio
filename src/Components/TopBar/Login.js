import React from 'react'
import {connect} from 'react-redux'
import {loginTeacher, logoutTeacher} from '../../redux/reducers/teacherAuthReducer'
import {loginStudent, logoutStudent} from '../../redux/reducers/studentAuthReducer'
import { Redirect } from 'react-router-dom'
import NotificationFeedStudent from './NotificationFeedStudent'
import NotificationFeedTeacher from './NotificationFeedTeacher'
import './styles/Login.css'
import { Modal } from 'antd'


class Name extends React.Component{
    constructor(){
        super()
        this.state={
            email: '',
            password: '',
            accountType: '',
            showModal: false

        }
    }

    showModal = () => {
        console.log('clicked')
        this.setState({
            showModal: !this.state.showModal
        })
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
            <div className='logout'>
                <button onClick={this.handleStudentLogout}>Logout</button>
                <NotificationFeedStudent />
                <Redirect to='/student' />
            </div>)
        } else if(this.props.teacher.teacher_id){
            return (
                <div className='logout'>
                    <h1>Welcome, {this.props.teacher.teacher_first_name}!</h1>
                    <button onClick={this.handleTeacherLogout}>Logout</button>
                    <NotificationFeedTeacher />
                    <Redirect to='/teacher' />
                </div>
            )
        }

        return(
            <div id='login' >
                <Redirect to='/' />
                <div id='hamburger' >
                    <i onClick={this.showModal} className="fas fa-bars"></i>
                    <div>
                        <Modal onCancel={this.showModal} visible={this.state.showModal} footer={null} title='Login' >
                            <form id='login-form-mini' autoComplete='on' onSubmit={this.state.accountType === 'Teacher' ? this.handleLoginTeacher : this.handleLoginStudent} >
                                <div id='login-forms' >
                                    <input  type='email'  label='Email' autoComplete='on' placeholder='Email' name='email' onChange={this.handleInputChange} value={email} required/>
                                    <input   placeholder='Password' type='login-password' label='Password' autoComplete='on' name='password' type='password'  onChange={this.handleInputChange} value={password} required/>
                                </div>
                                <span id='login-radio' >
                                    <input className='radio-button' id='radio-teacher'  type='radio' name='accountType' value='Student' onChange={this.handleInputChange} required/> 
                                    <label  > Student </label>
                                    <input className='radio-button' id='radio-student' type='radio' name='accountType' value='Teacher' onChange={this.handleInputChange}/> 
                                    <label  > Teacher </label>
                                </span>
                                <input id='login-button' type='submit' value='Login'  />
                            </form>
                        </Modal>
                    </div>
                </div>
                <form id='login-form' autoComplete='on' onSubmit={this.state.accountType === 'Teacher' ? this.handleLoginTeacher : this.handleLoginStudent} >
                    <div id='login-forms' >
                        <input  type='email'  label='Email' autoComplete='on' placeholder='Email' name='email' onChange={this.handleInputChange} value={email} required/>
                        <input   placeholder='Password' type='login-password' label='Password' autoComplete='on' name='password' type='password'  onChange={this.handleInputChange} value={password} required/>
                    </div>
                    <span id='login-radio' >
                        <input className='radio-button' id='radio-teacher'  type='radio' name='accountType' value='Student' onChange={this.handleInputChange} required/> 
                        <label  > Student </label>
                        <input className='radio-button' id='radio-student' type='radio' name='accountType' value='Teacher' onChange={this.handleInputChange}/> 
                        <label  > Teacher </label>
                    </span>
                    <input id='login-button' type='submit' value='Login'  />
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