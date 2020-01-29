import React from 'react'

import './styles/LessonBlockForStudents.css'

const moment = require('moment')

export default class LessonBlockForStudents extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div className='lesson-block-for-students'>
                <div>
                    <div className='student-lesson-title' >
                        <p>{this.props.lessonType} Lesson:</p>
                    </div>
                    <p> {moment(this.props.lessonDate).format('llll')}</p>
                </div>
                <div>
                    <p>Length: {this.props.lessonLength} mins</p>
                    <p>Notes: <br/>{this.props.lessonNotes} </p>
                </div>
            </div>
        )
    }
}