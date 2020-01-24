import React from 'react'
import { connect } from 'react-redux'
import {getStudentsForTeacher} from '../../../redux/reducers/teacherReducer'
import {createLesson} from '../../../redux/reducers/lessonReducer'

class TeacherLessonForm extends React.Component{
    constructor(){
        super()
        this.state={
            student_id: null,
            lesson_time: '',
            lesson_length:'',
            lesson_type:'',
            lesson_notes:''
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
        const { student_id, lesson_type, lesson_time, lesson_length, lesson_notes } = this.state

        let newLesson = {
            student_id: +student_id,
            lesson_type: lesson_type,
            lesson_time: lesson_time,
            lesson_length: lesson_length,
            lesson_notes: lesson_notes
        }

        this.props.createLesson(newLesson)

        this.setState({
            lesson_time: '',
            lesson_length:'',
            lesson_type:'',
            lesson_notes:''
        })

        alert('Lesson has been created')


    }


    render(){

        const {lesson_time, lesson_length, lesson_type, lesson_notes} = this.state
        return(
            <div>
                <p>TeacherLessonForm</p>

                <div>
                    <select name='student_id' onChange={this.handelInputChange}>
                        <option></option>
                        {this.props.students.map((ele, i) => <option  key={i} value={ele.id}> {ele.first_name} {ele.last_name} </option>)}  
                    </select>

                    <input name='lesson_time' placeholder='Lesson Date and Time' value={lesson_time} onChange={this.handelInputChange}/>
                    <input name='lesson_length' placeholder='Length in minutes' value={lesson_length} onChange={this.handelInputChange}/>
                    <input name='lesson_type' placeholder='Lesson Type' value={lesson_type} onChange={this.handelInputChange}/>
                    <input name='lesson_notes' placeholder='Notes' value={lesson_notes} onChange={this.handelInputChange}/>
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
