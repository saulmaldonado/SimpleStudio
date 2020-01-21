import React from 'react'
import { connect } from 'react-redux'
import {addAssignment} from '../../../redux/reducers/assignmentReducer'
import {getStudentsForTeacher} from '../../../redux/reducers/teacherReducer'

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

    createNewAssignment = () => {
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

        this.props.addAssignment(newAssignment)

        this.setState({
            assignment_title: '', 
            assignment_composer: '', 
            assignment_source: '', 
            assignment_page: '', 
            assignment_requirements: '',
            assignment_duedate: ''
        })

        alert('Assignment has been created')
    }

    


    render(){

        const { 
            assignment_title, 
            assignment_composer, 
            assignment_source, 
            assignment_page, 
            assignment_requirements,
            assignment_duedate
            } = this.state

        return(
            <div>
                <div>Add Assignment</div>

                <div>
                    <select name='student_id' onChange={this.handelInputChange}>
                            <option></option>
                            {this.props.students.map((ele, i) => <option  key={i} value={ele.id}> {ele.first_name} {ele.last_name} </option>)}  
                    </select>

                    <input name='assignment_title' value={assignment_title} placeholder='Title' onChange={this.handelInputChange}/>
                    <input name='assignment_composer' value={assignment_composer} placeholder='Composer' onChange={this.handelInputChange}/>
                    <input name='assignment_source' value={assignment_source} placeholder='Source'  onChange={this.handelInputChange}/>
                    <input name='assignment_page' value={assignment_page} placeholder='Page Number' onChange={this.handelInputChange}/>
                    <input name='assignment_requirements' value={assignment_requirements} placeholder='Assignment Requirements ' onChange={this.handelInputChange}/>
                    <input name='assignment_duedate' value={assignment_duedate} placeholder='Due Date' onChange={this.handelInputChange}/>
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

export default connect(mapStateToProps, {addAssignment, getStudentsForTeacher})(TeacherAssignmentForms)