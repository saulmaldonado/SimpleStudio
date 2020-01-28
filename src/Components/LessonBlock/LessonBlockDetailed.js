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
                <div>Lesson Details:</div>
                <div className='lesson-info'>
                    <p> {this.props.lessonType} Lesson </p>
                    <p> Time: {this.props.lessonTime} </p>
                    <p> Length: {this.props.lessonLength} minutes </p>
                    <p> Notes: {this.props.lessonNotes} </p>
                </div>
            </div>
        )
    }
}