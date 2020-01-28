import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import './styles/AssignmentBlockDetailed.css'

class AssignmentBlockDetailed extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }


    markCompleted = async(id) => {

        if(window.confirm('Are you sure you want to mark this assignment as completed?') === true){
            
            await axios.put(`/api/assignment/complete/${id}`)
    
            this.props.updateAssignments()
        }
    }


    render(){
        console.log(this.props)
        return(
            <div>
                        <div>
                                <div>Assignment #{this.props.assignmentCount} </div>
                            <div>
                                <p> {this.props.assignmentTitle} </p>
                                <p> Source: {this.props.assignmentSource} </p>
                                {!this.props.assignmentComposer ? null : <p>Composer: {this.props.assignmentComposer} </p>}
                                <p> {this.props.assignmentPage} </p>
                                <p> Requirements: {this.props.assignmentRequirements} </p>
                                <p> Due Date: {this.props.assignmentDueDate} </p>
                                <p> {!this.props.assignmentCompleted ? 'Incomplete ❌' : 'Completed ✅'} </p>
                            </div> 
                            <Link to={`/teacher/assignments/edit/${this.props.id}`}> <button>Edit Lesson</button> </Link>
                            <button onClick={() => this.markCompleted(this.props.id)} >Mark as complete</button>
                        </div>


            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {

    }
}

export default connect(mapStateToProps)(AssignmentBlockDetailed)