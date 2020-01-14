import React from 'react'
import {connect} from 'react-redux'
import {loginTeacher} from '../../redux/reducers/teacherAuthReducer'
import {loginStudent} from '../../redux/reducers/studentAuthReducer'

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

        loginTeacher({email, password})

        this.setState({
            email: '',
            password: '',
            accountType: ''
        })
    }
    handleLoginStudent = (e) => {
        const {loginStudent} = this.props
        const {email, password} = this.state

        loginStudent({email, password})

        this.setState({
            email: '',
            password: '',
            accountType: ''
        })
    }
    
    
    render(){
        const {email, password} = this.state
        console.log(this.state)
        return(
            <div>
                <div>Login</div>
                <input placeholder='Email' name='email' onChange={this.handleInputChange} value={email}/>
                <input placeholder='Password' name='password' type='password' onChange={this.handleInputChange} value={password}/>
                <input type='radio' name='accountType' value='Student' onChange={this.handleInputChange}/> Student
                <input type='radio' name='accountType' value='Teacher' onChange={this.handleInputChange}/> Teacher
                <button onClick={this.state.accountType === 'Teacher' ? this.handleLoginTeacher : this.handleLoginStudent}>Login</button>
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

export default connect(mapStateToProps, {loginTeacher, loginStudent})(Name)