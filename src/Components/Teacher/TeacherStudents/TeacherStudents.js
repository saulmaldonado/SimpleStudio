import React from 'react'
import StudentProfile from './StudentProfile'

export default class TeacherStudents extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>TeacherStudents</div>

                <StudentProfile /> 
            </div>
        )
    }
}