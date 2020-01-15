import React from 'react'
import { connect } from 'react-redux'
import {registerTeacher} from '../../redux/reducers/teacherAuthReducer'
import {registerStudent} from '../../redux/reducers/studentAuthReducer'
import { Redirect } from 'react-router-dom'


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

        // if(this.props.student.student_id){
        //     return (
        //     <div>
        //         <button onClick={this.handleStudentLogout}>Logout</button>
        //         <Redirect to='/student' />
        //     </div>)
        // } else if(this.props.teacher.teacher_id){
        //     return (
        //         <div>
        //             <button onClick={this.handleTeacherLogout}>Logout</button>
        //             <Redirect to='/teacher' />
        //         </div>
        //     )
        // }

        console.log(this.props)
        return(
            <div>
                {/* <Redirect to='/' /> */}
                <h1>Welcome!</h1>
                <h2>New User? Register!</h2>
                <input placeholder='First Name' name='firstName' onChange={this.handleInputChange} value={firstName} />
                <input placeholder='Last Name' name='lastName' onChange={this.handleInputChange} value={lastName}/>
                <input placeholder='Email' name='email' onChange={this.handleInputChange} value={email}/>
                <input placeholder='Phone' name='phone' onChange={this.handleInputChange} value={phone}/>
                <input placeholder='Password' name='password' onChange={this.handleInputChange} type='password' value={password}/>
                <h3>I am a :</h3>
                <input name='accountType' type='radio' value='Student' onChange={this.handleInputChange} />Student
                <input name='accountType' type='radio' value='Teacher' onChange={this.handleInputChange} />Teacher
                <button onClick={this.state.accountType === 'Teacher' ? this.handleRegisterTeacher : this.handleRegisterStudent}>Register</button>
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