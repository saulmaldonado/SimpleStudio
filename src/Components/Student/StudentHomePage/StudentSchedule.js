import React from 'react'
import LessonBlockForStudents from '../../LessonBlock/LessonBlockForStudents'
import {connect} from 'react-redux'
import {getAllLessons} from '../../../redux/reducers/studentReducer'
import { withRouter } from 'react-router-dom'

class StudentSchedule extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }

    componentDidMount(){
            this.props.getAllLessons(this.props.student.student_id)
        }

    

    render(){
        return(
            <div>
                <div>StudentSchedule</div>
                {!this.props.lessons.length ? <div>You have no lessons scheduled</div> : this.props.lessons.map((ele, i) => {
                    return <LessonBlockForStudents key={i} lessonType={ele.lesson_type} lessonDate={ele.lesson_time} lessonLength={ele.lesson_length} lessonNotes={ele.lesson_notes ? ele.lesson_notes : 'none.'}/>
                })}
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        student: reduxState.studentAuthReducer,
        lessons: reduxState.studentReducer.lessons
    }
}


export default withRouter(connect(mapStateToProps, {getAllLessons})(StudentSchedule))
