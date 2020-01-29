import React from 'react'
import { connect } from 'react-redux'
import {editAssignment, getAssignment} from '../../../redux/reducers/assignmentReducer'
import {CreateNotificationForStudent} from '../../../redux/reducers/studentReducer'

import './styles/AssignmentEditBlock.css'
import { DatePicker } from 'antd'

const moment = require('moment')

class AssignmentEditBlock extends React.Component{
    constructor(){
        super()
        this.state={
            assignment_title: '', 
            assignment_composer: '', 
            assignment_source: '', 
            assignment_page: '', 
            assignment_requirements: '',
            assignment_duedate: '',
            assignment_completed: null
        }
    }

    componentDidMount(){
        this.props.getAssignment(+this.props.match.params.id)
    }

    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.props.getAssignment(this.props.match.params.id)
        }

        if(prevProps.assignment !== this.props.assignment){

            this.setState({
                assignment_title: this.props.assignment.assignment_title, 
                assignment_composer: this.props.assignment.assignment_composer, 
                assignment_source: this.props.assignment.assignment_source, 
                assignment_page: this.props.assignment.assignment_page, 
                assignment_requirements: this.props.assignment.assignment_requirements,
                assignment_duedate: this.props.assignment.assignment_duedate,
                assignment_completed: this.props.assignment.assignment_completed
            })

        }

    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }

    saveChanges = async() => {
        const {
            assignment_title, 
            assignment_composer, 
            assignment_source, 
            assignment_page, 
            assignment_requirements,
            assignment_duedate,
            assignment_completed
                } = this.state

        let editedAssignment = {
            assignment_title, 
            assignment_composer, 
            assignment_source, 
            assignment_page, 
            assignment_requirements,
            assignment_duedate,
            assignment_completed: assignment_completed === 'true' ? true : false
        }

        await this.props.editAssignment(this.props.match.params.id, editedAssignment)

        let newNotification = {
                notification_type: 'edited_assignment' ,
                notification_title: 'An assignment has been edited' ,
                notification_body: `An assignment due on ${moment(assignment_duedate).format('MMM Do')} has been edited. `,
                teacher_id: this.props.teacher.teacher_id
        }

        await this.props.CreateNotificationForStudent(this.props.assignment[0].student_id, newNotification)

        alert('Assignment has been edited')

        this.setState({
            assignment_title: '', 
            assignment_composer: '', 
            assignment_source: '', 
            assignment_page: '', 
            assignment_requirements: '',
            assignment_duedate: '',
            assignment_completed: false
        })

        this.props.history.push(`/teacher/assignments/${this.props.match.params.id}`)
    }

    onChange = (date) => {
        this.setState({
            assignment_duedate: date
        })
    }


    render(){
            const {
            assignment_title, 
            assignment_composer, 
            assignment_source, 
            assignment_page, 
            assignment_requirements,
            assignment_duedate,
            assignment_completed
                } = this.state

                console.log(this.props)


        return(                    
            <div className='assignment-edit-form'>
                <h3>Edit Assignment</h3>
                <input name='assignment_title' value={assignment_title} placeholder='Title' onChange={this.handelInputChange}/>
                <input name='assignment_composer' value={assignment_composer} placeholder='Composer' onChange={this.handelInputChange}/>
                <input name='assignment_source' value={assignment_source} placeholder='Source'  onChange={this.handelInputChange}/>
                <input name='assignment_page' value={assignment_page} placeholder='Page Number' onChange={this.handelInputChange}/>
                <textarea name='assignment_requirements' value={assignment_requirements} placeholder='Assignment Requirements ' onChange={this.handelInputChange}/>
                <DatePicker value={moment(assignment_duedate)|| null} format="MMM Do" name='assignment_duedate' onChange={this.onChange}/>
                <select name='assignment_completed' value={assignment_completed} onChange={this.handelInputChange}>
                    <option value={true}>Complete</option>
                    <option value={false}>Incomplete</option>
                </select>

                <button onClick={this.saveChanges}>Save Changes</button>


            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        assignment: reduxState.assignmentReducer.assignments,
        teacher: reduxState.teacherAuthReducer
    }
}

export default connect(mapStateToProps, {editAssignment, getAssignment, CreateNotificationForStudent})(AssignmentEditBlock)