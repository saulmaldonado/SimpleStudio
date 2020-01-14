import React from 'react'

import TeacherLessonForm from './TeacherLessonsForm'
import TeacherAgenda from '../TeacherHomePage/TeacherAgenda'
export default function TeacherLessons(){
    return(
        <div>
            <div>TeacherLessons</div>
            <TeacherLessonForm /> 
            <div>Calendar</div>
            <TeacherAgenda />
        </div>
    )
}