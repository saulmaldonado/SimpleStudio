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
                    <p>{this.props.lessonType} Lesson</p>
                    <p> <b>{this.props.lessonTime}</b></p>
                </div>
                <div>
                    <p>Student: <b>{this.props.studentName}</b></p>
                    <p>Length: <b>{this.props.lessonLength}</b> minutes</p>
                </div>
            </div>
        )
    }
}