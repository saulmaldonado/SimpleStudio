import React from 'react'

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
                    <p> {this.props.lessonDate}</p>
                </div>
                <div>
                    <p>Length: {this.props.lessonLength} mins</p>
                </div>
            </div>
        )
    }
}