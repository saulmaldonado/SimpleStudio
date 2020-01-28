import React from 'react'

import './styles/LessonBlock.css'

export default class LessonBlock extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='lesson-block'>
                <div>
                    <p>{this.props.lessonType} Lesson:</p>
                    <p> {this.props.lessonTime}</p>
                </div>
                <div>
                    <p>Student: {this.props.studentName}</p>
                    <p>Length: {this.props.lessonLength} minutes</p>
                </div>
            </div>
        )
    }
}