import React from 'react'

import TeacherLessonForm from './TeacherLessonsForm'
import TeacherAgenda from '../TeacherHomePage/TeacherAgenda'
import LessonDisplay from './LessonDisplay'
import { Route, Switch } from 'react-router-dom'
import RescheduleLessonTeacher from './RescheduleLessonTeacher'
import TeacherCalendar from './TeacherCalendar'
export default function TeacherLessons(){
    return(
        <div>
            <div>TeacherLessons</div>

            <Switch>
                <Route path='/teacher/lessons/edit/:id' component={RescheduleLessonTeacher} />
            </Switch>

            <Switch>
                <Route path='/teacher/lessons/:id'  component={LessonDisplay}/>
                <Route path='/teacher/lessons' component={TeacherCalendar} />
            </Switch>
            
            <TeacherAgenda />
        </div>
    )
}