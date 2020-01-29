import React from 'react'

import './styles/LessonBlockDetailed.css'

export default class LessonBlockDetailed extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='LessonBlockDetailed' >
                <div className='lesson-info'>
                <div>Lesson Details:</div>
                    <p> <b>{this.props.lessonType} Lesson</b> </p>
                    <p> <b>Time: {this.props.lessonTime}</b> </p>
                    <p> <b>Length: {this.props.lessonLength}</b> minutes </p>
                    <p> <b>Notes: {this.props.lessonNotes}</b> </p>
                </div>
            </div>
        )
    }
}