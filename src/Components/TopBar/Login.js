import React from 'react'

export default class Name extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>Login</div>
                <input placeholder='Email' name='email'/>
                <input placeholder='Password' name='password'/>
                <input type='radio' name='account-type' value='student'/> Student
                <input type='radio' name='account-type' value='teacher'/> Teacher
                <button>Login</button>
            </div>
            
        )
    }
}