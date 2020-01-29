import React from 'react'
import { connect } from 'react-redux'
import {addAssignment} from '../../../redux/reducers/assignmentReducer'
import {getStudentsForTeacher} from '../../../redux/reducers/teacherReducer'
import {CreateNotificationForStudent, getAllAssignments} from '../../../redux/reducers/studentReducer'

import './styles/TeacherAssignmentForms.css'
import { DatePicker } from 'antd'

const moment = require('moment')


class TeacherAssignmentForms extends React.Component{
    constructor(){
        super()
        this.state={ 
            assignment_title: '', 
            assignment_composer: '', 
            assignment_source: '', 
            assignment_page: '', 
            assignment_requirements: '',
            assignment_duedate: '',
            student_id: null 
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

    createNewAssignment = async() => {
        const { 
            assignment_title, 
            assignment_composer, 
            assignment_source, 
            assignment_page, 
            assignment_requirements,
            assignment_duedate,
            student_id 
            } = this.state

        let newAssignment = {
            student_id: +student_id,
            assignment_title,
            assignment_composer,
            assignment_source,
            assignment_page,
            assignment_requirements,
            assignment_duedate
        }

        await this.props.addAssignment(newAssignment)

        let newNotification = {
            notification_type: 'new_assignment' ,
            notification_title: 'You have a new assignment' ,
            notification_body: `You have a new assignment to ${assignment_title}. It is due on ${moment(assignment_duedate).format('MMM Do')}. `,
            teacher_id: this.props.teacher.teacher_id
        }

        await this.props.CreateNotificationForStudent(student_id, newNotification)

        this.setState({
            assignment_title: '', 
            assignment_composer: '', 
            assignment_source: '', 
            assignment_page: '', 
            assignment_requirements: '',
            assignment_duedate: ''
        })

        alert('Assignment has been created')

        this.props.getAllAssignments(student_id)

    }

    onChange = (date) => {
        this.setState({
            assignment_duedate: date
        })
    }

    


    render(){

        console.log(this.state)

        const { 
            assignment_title, 
            assignment_composer, 
            assignment_source, 
            assignment_page, 
            assignment_requirements,
            assignment_duedate
            } = this.state

        return(
            <div className='new-assignment-form-container' >
                <h3 style={{textAlign:"center"}} >Add Assignment</h3>
                <div className='new-assignment-form' >
                    <select name='student_id' onChange={this.handelInputChange}>
                            <option>Select a Student</option>
                            {this.props.students.map((ele, i) => <option  key={i} value={ele.id}> {ele.first_name} {ele.last_name} </option>)}  
                    </select>

                    <input name='assignment_title' value={assignment_title} placeholder='Title' onChange={this.handelInputChange}/>
                    <input name='assignment_composer' value={assignment_composer} placeholder='Composer' onChange={this.handelInputChange}/>
                    <input name='assignment_source' value={assignment_source} placeholder='Source'  onChange={this.handelInputChange}/>
                    <input name='assignment_page' value={assignment_page} placeholder='Page Number' onChange={this.handelInputChange}/>
                    <textarea name='assignment_requirements' value={assignment_requirements} placeholder='Assignment Requirements ' onChange={this.handelInputChange}/>
                    <label for='assignment_duedate'>Due Date:</label>
                    <DatePicker value={assignment_duedate|| null} format="MMM Do" name='assignment_duedate' onChange={this.onChange}/>
                    <button onClick={this.createNewAssignment}>Create New Assignment</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer,
        students: reduxState.teacherReducer.students
    }
}

export default connect(mapStateToProps, {addAssignment, getStudentsForTeacher, CreateNotificationForStudent, getAllAssignments})(TeacherAssignmentForms)