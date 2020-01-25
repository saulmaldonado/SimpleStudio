import React from 'react'

export default class LessonBlockDetailed extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }
    render(){
        return(
            <div>
                <div>Lesson Details:</div>
                <div>
                    <p> {this.props.lessonType} Lesson </p>
                    <p> Time: {this.props.lessonTime} </p>
                    <p> Length: {this.props.lessonLength} minutes </p>
                    <p> Notes: {this.props.lessonNotes} </p>
                </div>
            </div>
        )
    }
}