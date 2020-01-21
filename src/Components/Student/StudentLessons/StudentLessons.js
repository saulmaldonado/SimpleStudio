import React from 'react'

import StudentSchedule from '../StudentHomePage/StudentSchedule'
import RescheduleLessonStudent from './RescheduleLessonStudent'
import { Switch, Route } from 'react-router-dom'
import StudentShowLesson from './StudentShowLesson'
import StudentCalendar from './StudentCalendar'

export default class StudentLessons extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }


    render(){
        return(
            <div>
                <div>StudentLessons</div>
                <Switch>
                    <Route path='/student/lessons/edit/:id' component={RescheduleLessonStudent}/>
                    <Route path='/student/lessons/:id' component={StudentShowLesson}/>
                    <Route path='/student/lessons' component={StudentSchedule} /> />
                </Switch>

                <StudentCalendar />
            </div>
        )
    }
}