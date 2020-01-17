import React from 'react'
import {getLesson} from '../../../redux/reducers/lessonReducer'
import { connect } from 'react-redux'
import LessonBlockDetailed from '../../LessonBlock/LessonBlockDetailed'

class StudentShowLesson extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
        this.props.getLesson(this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.id !== prevProps.match.params.id){
            this.props.getLesson(this.props.match.params.id)
        }
    }

    render(){
        console.log(this.props.lesson)
        return(
            <div>
                <div>Showing lesson </div>
                <LessonBlockDetailed  lessonType={this.props.lesson.lesson_type} lessonTime={this.props.lesson.lesson_time} lessonLength={this.props.lesson.lesson_length} lessonNotes={!this.props.lesson.lesson_notes ? 'none.' : this.props.lesson.lesson_notes} />
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        lesson: reduxState.lessonReducer.lessons
    
    }
}

export default connect(mapStateToProps, {getLesson})(StudentShowLesson)