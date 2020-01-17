import React from 'react'
import {getLesson, editLesson} from '../../../redux/reducers/lessonReducer'
import { connect } from 'react-redux'

class RescheduleLessonTeacher extends React.Component{
    constructor(){
        super()
        this.state={
            lesson_type: '',
            lesson_time: '',
            lesson_length: null,
            lesson_notes: ''
        }
    }

    componentDidMount(){
        this.props.getLesson(this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.props.getLesson(this.props.match.params.id)
        }

        if(prevProps.lesson !== this.props.lesson){

            this.setState({
                lesson_type: this.props.lesson.lesson_type,
                lesson_time: this.props.lesson.lesson_time,
                lesson_length: this.props.lesson.lesson_length,
                lesson_notes: this.props.lesson.lesson_notes
            })

        }

    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    saveChanges = () => {
        const {lesson_type, lesson_time, lesson_length, lesson_notes} = this.state
        let updatedLesson = {
            lesson_type,
            lesson_time,
            lesson_length: +lesson_length,
            lesson_notes
        }

        this.props.editLesson(this.props.match.params.id, updatedLesson)

        this.props.history.push('/teacher/lessons')



        
    }



    render(){

        return(
            <div>
                <div>Reschedule lesson {this.props.match.params.id} </div>
                <input name='lesson_time' placeholder='Date and Time' value={this.state.lesson_time} onChange={this.handelInputChange}/>
                <input name='lesson_length' placeholder='Length in Minutes' value={this.state.lesson_length} onChange={this.handelInputChange}/>
                <input name='lesson_type' placeholder='Lesson Type' value={this.state.lesson_type} onChange={this.handelInputChange}/>
                <input name='lesson_notes' placeholder='Notes' value={this.state.lesson_notes} onChange={this.handelInputChange}/>
                <button onClick={this.saveChanges}>Save Changes</button>

                <div>
                    <div>
                        <p>{this.state.lesson_type} Lesson:</p>
                        <p> {this.state.lesson_time}</p>
                    </div>
                    <div>
                        <p>Length: {this.state.lesson_length} mins</p>
                        <p>Notes: {this.state.lesson_notes} </p>
                    </div>
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

export default connect (mapStateToProps, {getLesson, editLesson})(RescheduleLessonTeacher)