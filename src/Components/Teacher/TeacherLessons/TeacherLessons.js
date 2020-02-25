import React from 'react'

import LessonDisplay from './LessonDisplay'
import { Route, Switch } from 'react-router-dom'
import RescheduleLessonTeacher from './RescheduleLessonTeacher'
import TeacherCalendar from './TeacherCalendar'
import TeacherAgendaForCalendar from '../TeacherHomePage/TeacherAgendaForCalendar'

import './styles/TeacherLessons.css'
export default function TeacherLessons(){
    return(
        <div className='TeacherLessons'>

            <Switch>
                <Route path='/teacher/lessons/edit/:id' component={RescheduleLessonTeacher} />
            </Switch>

            <Switch>
                <Route path='/teacher/lessons/:id'  component={LessonDisplay}/>
                <Route path='/teacher/lessons' component={TeacherCalendar} />
            </Switch>
            
            <TeacherAgendaForCalendar />
        </div>
    )
}