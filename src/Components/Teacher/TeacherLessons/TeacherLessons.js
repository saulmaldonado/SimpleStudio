import React from 'react'
import TopBar from '../../TopBar/TopBar'
import NavBarTeacher from '../../NavBar/NavBarTeacher'
import TeacherLessonForm from './TeacherLessonsForm'
import TeacherAgenda from '../TeacherHomePage/TeacherAgenda'
export default function TeacherLessons(){
    return(
        <div>
            <TopBar />
            <NavBarTeacher /> 
            <div>TeacherLessons</div>
            <TeacherLessonForm /> 
            <div>Calendar</div>
            <TeacherAgenda />
        </div>
    )
}