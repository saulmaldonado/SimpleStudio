import React from 'react'

const moment = require('moment')

export default class LessonBlockForStudents extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>
                    <p>{this.props.lessonType} Lesson:</p>
                    <p> {moment(this.props.lessonDate).format('llll')}</p>
                </div>
                <div>
                    <p>Length: {this.props.lessonLength} mins</p>
                    <p>Notes: {this.props.lessonNotes} </p>
                </div>
            </div>
        )
    }
}