import React from 'react'
import { connect } from 'react-redux'
import {editAssignment, getAssignment} from '../../../redux/reducers/assignmentReducer'

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
        this.props.getAssignment(this.props.match.params.id)
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

    saveChanges = () => {
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

        this.props.editAssignment(this.props.match.params.id, editedAssignment)

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
            <div>
                <input name='assignment_title' value={assignment_title} placeholder='Title' onChange={this.handelInputChange}/>
                <input name='assignment_composer' value={assignment_composer} placeholder='Composer' onChange={this.handelInputChange}/>
                <input name='assignment_source' value={assignment_source} placeholder='Source'  onChange={this.handelInputChange}/>
                <input name='assignment_page' value={assignment_page} placeholder='Page Number' onChange={this.handelInputChange}/>
                <input name='assignment_requirements' value={assignment_requirements} placeholder='Assignment Requirements ' onChange={this.handelInputChange}/>
                <input name='assignment_duedate' value={assignment_duedate} placeholder='Due Date' onChange={this.handelInputChange}/>
                <select name='assignment_completed' value={assignment_completed} onChange={this.handelInputChange}>
                    <option value={true}>Complete</option>
                    <option value={false}>Incomplete</option>
                </select>
                <input name='assignment_completed' value={assignment_duedate} placeholder='Due Date' onChange={this.handelInputChange}/>

                <button onClick={this.saveChanges}>Save Changes</button>


            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        assignment: reduxState.assignmentReducer.assignments
    }
}

export default connect(mapStateToProps, {editAssignment, getAssignment})(AssignmentEditBlock)