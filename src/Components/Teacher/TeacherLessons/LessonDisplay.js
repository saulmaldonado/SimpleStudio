import React from 'react'
import { connect } from 'react-redux'
import {getLesson} from '../../../redux/reducers/lessonReducer'

class LessonDisplay extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getLesson(this.props.match.params.id)
    }


    render(){
        console.log(this.props)
        return(
            <div>
                <p>LessonDisplay</p>

                <div>
                    {/* <p> {this.props.lessons.lesson_type} Lesson: </p>
                    <p> Student: {`${this.props.lessons.student_first_name} ${this.props.lessons.student_last_name}`} </p>
                    <p> {this.props.lessons.lesson_time} </p>
                    <p> {this.props.lessons.lesson_length} minutes </p>
                    <p> {this.props.lessons.lesson_notes} </p> */}
                </div>

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        lesson: reduxState.lessonReducer.lessons
    }
}

export default connect(mapStateToProps, {getLesson})(LessonDisplay)