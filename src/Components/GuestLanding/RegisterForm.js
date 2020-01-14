import React from 'react'

export default class RegisterForm extends React.Component{
    constructor(){
        super()
        this.state={
            firstName: '',
            lastName: '',
            email: '',
            password:'',
            accountType:''
        }
    }

    handleInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }


    handleButton = (e) => {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password:'',
            accountType:''
        })
    }

    render(){
        const {firstName, lastName, email, password, accountType} = this.state
        console.log(this.state);
        return(
            <div>
                <h1>RegisterForm</h1>
                <input placeholder='First Name' name='firstName' onChange={this.handleInputChange} value={firstName} />
                <input placeholder='Last Name' name='lastName' onChange={this.handleInputChange} value={lastName}/>
                <input placeholder='Email' name='email' onChange={this.handleInputChange} value={email}/>
                <input placeholder='Password' name='password' onChange={this.handleInputChange} type='password' value={password}/>
                <input name='accountType' type='radio' value='Student' onChange={this.handleInputChange} />Student
                <input name='accountType' type='radio' value='Teacher' onChange={this.handleInputChange} />Teacher
                <button onClick={this.handleButton}>Register</button>
            </div>
        )
    }
}