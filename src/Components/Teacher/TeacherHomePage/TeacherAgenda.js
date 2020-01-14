import React from 'react'
import LessonBlock from '../../LessonBlock/LessonBlock'

export default class TeacherAgenda extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>TeacherAgenda</div>
                <LessonBlock />
            </div>
        )
    }
}