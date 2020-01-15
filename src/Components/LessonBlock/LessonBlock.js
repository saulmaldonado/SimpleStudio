import React from 'react'

export default class LessonBlock extends React.Component{
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
                    <p> {this.props.lessonTime} min </p>
                </div>
                <div>
                    <p>Student: {this.props.studentName}</p>
                    <p>Length: {this.props.lessonLength}</p>
                </div>
            </div>
        )
    }
}