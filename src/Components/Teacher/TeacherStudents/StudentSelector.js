import React from 'react'
import AddStudentForm from './AddStudentForm'

export default class StudentSelector extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>StudentSelector</div>
                <AddStudentForm />
            </div>
        )
    }
}