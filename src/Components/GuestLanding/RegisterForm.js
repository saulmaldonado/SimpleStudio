import React from 'react'
import { connect } from 'react-redux'
import {registerTeacher} from '../../redux/reducers/teacherAuthReducer'
import {registerStudent} from '../../redux/reducers/studentAuthReducer'

import './styles/RegisterForm.css'


    class RegisterForm extends React.Component{
    constructor(){
        super()
        this.state={
            firstName: '',
            lastName: '',
            email: '',
            password:'',
            phone:'',
            accountType:'',
            smallLogin: false
        }
    }

    handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }



    handleRegisterTeacher = (e) => {
        const {registerTeacher} = this.props
        const {firstName, lastName, email, password, phone} = this.state

        e.preventDefault()


        registerTeacher({firstName, lastName, email, password, phone})

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password:'',
            phone: '',
            accountType: ''
        })
    }

    handleRegisterStudent = (e) => {
        const {registerStudent} = this.props
        const {firstName, lastName, email, phone, password} = this.state

        e.preventDefault()


        registerStudent({firstName, lastName, email, password, phone})

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password:'',
            phone: '',
            accountType: ''
        })
    }

    render(){
        const {firstName, lastName, email, password, phone} = this.state


        return(
            <div className='register'>
                <h1>Simple Studio</h1>
                <h2>Stop wasting time managing your studio and start teaching </h2>
                <h3> The one app that manages your students, scheduling, assignments and billing </h3>
                <h2> Register And Start Today!</h2>
                <form onSubmit={this.state.accountType === 'Teacher' ? this.handleRegisterTeacher : this.handleRegisterStudent} >
                    <input placeholder='First Name' className='input' name='firstName' onChange={this.handleInputChange} value={firstName} required />
                    <input placeholder='Last Name' className='input'  name='lastName' onChange={this.handleInputChange} value={lastName} required/>
                    <input placeholder='Email' className='input'  name='email' onChange={this.handleInputChange} value={email} required/>
                    <input placeholder='Phone' className='input'  name='phone' onChange={this.handleInputChange} value={phone} />
                    <input autoComplete='on' className='input'  placeholder='Password' name='password' onChange={this.handleInputChange} type='password' value={password} required/>
                    <h3>I am a :</h3>
                    <div className='register-radio'>
                        <input name='accountType' type='radio' value='Student' onChange={this.handleInputChange} required />Student
                        <input name='accountType' type='radio' value='Teacher' onChange={this.handleInputChange} />Teacher
                    </div>
                    <input type='submit' value='Register' />
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

export default connect(mapStateToProps, {registerTeacher, registerStudent})(RegisterForm)