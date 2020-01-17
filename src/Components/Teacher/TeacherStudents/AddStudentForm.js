import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class AddStudentForm extends React.Component{
    constructor(){
        super()
        this.state={
            studentID: null
        }
    }

    addStudent = () => {
        const {studentID} = this.state

        if(!studentID){
            return alert('invalid id')
        }
        axios.post(`/api/teacher/${this.props.teacher.teacher_id}/student/${+this.state.studentID}`)
                    .then(res => alert(res.data))

        this.props.updateStudentList()
    }

    handelInputChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value 
      })
    }




    render(){

        return(
            <div>
                <div>Add Student</div>
                
                <div>
                    <input name='studentID' placeholder='Enter Student ID' onChange={this.handelInputChange}/>
                    <button onClick={this.addStudent}>Invite</button>
                </div>

            </div>
        
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        teacher: reduxState.teacherAuthReducer       
    }
}

export default connect(mapStateToProps)(AddStudentForm)