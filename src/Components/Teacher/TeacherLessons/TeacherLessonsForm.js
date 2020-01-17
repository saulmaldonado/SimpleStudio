import React from 'react'
import { connect } from 'react-redux'
import {getStudentsForTeacher} from '../../../redux/reducers/teacherReducer'
import {createLesson} from '../../../redux/reducers/lessonReducer'

class TeacherLessonForm extends React.Component{
    constructor(){
        super()
        this.state={
            studentId: null,
            lessonDate: '',
            lessonLength:'',
            lessonType:'',
            lessonNotes:''

        }
    }

    componentDidMount(){
        this.props.getStudentsForTeacher(this.props.teacher.teacher_id)
    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    createNewLesson = () => {
        const { studentId, lessonType, lessonDate, lessonLength, lessonNotes } = this.state

        let newLesson = {
            student_id: +studentId,
            lesson_type: lessonType,
            lesson_time: lessonDate,
            lesson_length: lessonLength,
            lesson_notes: lessonNotes
        }

        this.props.createLesson(newLesson)

        this.setState({
            lessonDate: '',
            lessonLength:'',
            lessonType:'',
            lessonNotes:''
        })

        alert('Lesson has been created')


    }


    render(){

        const {lessonDate, lessonLength, lessonType, lessonNotes} = this.state
        return(
            <div>
                <p>TeacherLessonForm</p>

                <div>
                    <select name='studentId' onChange={this.handelInputChange}>
                        <option></option>
                        {this.props.students.map((ele, i) => <option  key={i} value={ele.id}> {ele.first_name} {ele.last_name} </option>)}  
                    </select>

                    <input name='lessonDate' placeholder='Lesson Date and Time' value={lessonDate} onChange={this.handelInputChange}/>
                    <input name='lessonLength' placeholder='Length in minutes' value={lessonLength} onChange={this.handelInputChange}/>
                    <input name='lessonType' placeholder='Lesson Type' value={lessonType} onChange={this.handelInputChange}/>
                    <input name='lessonNotes' placeholder='Notes' value={lessonNotes} onChange={this.handelInputChange}/>
                    <button onClick={this.createNewLesson}>Create New Lesson</button>
                </div>
                

            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {

        students: reduxState.teacherReducer.students,
        teacher: reduxState.teacherAuthReducer
        
    }
}

export default connect(mapStateToProps, {getStudentsForTeacher, createLesson})(TeacherLessonForm)
