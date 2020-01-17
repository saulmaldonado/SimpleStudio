import React from 'react'

import TeacherLessonForm from './TeacherLessonsForm'
import TeacherAgenda from '../TeacherHomePage/TeacherAgenda'
import LessonDisplay from './LessonDisplay'
import { Route, Switch } from 'react-router-dom'
export default function TeacherLessons(){
    return(
        <div>
            <div>TeacherLessons</div>
            <TeacherLessonForm /> 
            <Switch>
                <Route path='/teacher/lessons/:id'  component={LessonDisplay}/>
                <Route path='/teacher/lessons' render={() => {return(<div>Calendar</div>)} }/>
            </Switch>
            <TeacherAgenda />
        </div>
    )
}