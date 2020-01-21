import React from 'react'
import StudentProfile from './StudentProfile'
import StudentSelector from './StudentSelector'
import { Route, Switch } from 'react-router-dom'

export default class TeacherStudents extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    render(){
        return(
            <div>
                <div>
                    <p>TeacherStudents</p>
                    <StudentSelector />
                </div>
                <div>

                    <Switch>
                        <Route path={'/teacher/students/:id'} component={StudentProfile}/>
                    </Switch>

                </div>
            </div>
        )
    }
}

