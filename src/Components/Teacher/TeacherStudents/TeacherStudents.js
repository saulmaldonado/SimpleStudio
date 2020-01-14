import React from 'react'
import TopBar from '../../TopBar/TopBar'
import NavBarTeacher from '../../NavBar/NavBarTeacher'
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