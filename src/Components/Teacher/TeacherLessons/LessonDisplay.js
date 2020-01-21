import React from 'react'
import { connect } from 'react-redux'
import {getLesson} from '../../../redux/reducers/lessonReducer'

var moment = require('moment')




class LessonDisplay extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getLesson(this.props.match.params.id)
        }


    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.props.getLesson(this.props.match.params.id)
        }
    }


    render(){
        console.log(this.props)
        return(
            <div>
                <p>LessonDisplay</p>

                {this.props.lesson === 'error' ? 'Lesson does not exist': <div>
                    <p> {this.props.lesson.lesson_type} Lesson: </p>
                    <p> Student: {`${this.props.lesson.student_first_name} ${this.props.lesson.student_last_name}`} </p>
                    <p> {moment(this.props.lesson.lesson_time).format('llll')} </p>
                    <p> {this.props.lesson.lesson_length} minutes </p>
                    <p> Notes: {this.props.lesson.lesson_notes ? this.props.lesson.lesson_notes : 'none.' } </p>
                </div>}

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