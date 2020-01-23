import React from 'react'
import { connect } from 'react-redux'
import {registerTeacher} from '../../redux/reducers/teacherAuthReducer'
import {registerStudent} from '../../redux/reducers/studentAuthReducer'


    class RegisterForm extends React.Component{
    constructor(){
        super()
        this.state={
            firstName: '',
            lastName: '',
            email: '',
            password:'',
            phone:'',
            accountType:''
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
            <div>
                <h1>Welcome!</h1>
                <h2>New User? Register!</h2>
                <form onSubmit={this.state.accountType === 'Teacher' ? this.handleRegisterTeacher : this.handleRegisterStudent} >
                    <input placeholder='First Name' name='firstName' onChange={this.handleInputChange} value={firstName} required />
                    <input placeholder='Last Name' name='lastName' onChange={this.handleInputChange} value={lastName} required/>
                    <input placeholder='Email' name='email' onChange={this.handleInputChange} value={email} required/>
                    <input placeholder='Phone' name='phone' onChange={this.handleInputChange} value={phone} />
                    <input placeholder='Password' name='password' onChange={this.handleInputChange} type='password' value={password} required/>
                    <h3>I am a :</h3>
                    <input name='accountType' type='radio' value='Student' onChange={this.handleInputChange} required />Student
                    <input name='accountType' type='radio' value='Teacher' onChange={this.handleInputChange} />Teacher
                    <input type='submit' value='Login' />
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