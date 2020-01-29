import React from 'react'
import StudentProfile from './StudentProfile'
import StudentSelector from './StudentSelector'
import { Route, Switch } from 'react-router-dom'

import './styles/TeacherStudents.css'

export default class TeacherStudents extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    render(){
        return(
            <div className='teacher-students'>
                <div className='left-container-student-selector' >
                    <h3 className='teacher-students-title' >Student Profiles</h3>
                    <StudentSelector />
                </div>
                <div className='right-container-student-selector' > 

                    <Switch>
                        <Route path={'/teacher/students/:id'} component={StudentProfile}/>
                    </Switch>

                </div>
            </div>
        )
    }
}

