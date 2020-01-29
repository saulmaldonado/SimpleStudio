import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import './styles/AssignmentBlockDetailed.css'

const moment = require('moment')

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
            <div className='assignment-block-detailed'>
                        <div>
                                <div>Assignment <b>#{this.props.assignmentCount}:</b> </div>
                            <div>
                                <p> <b>{this.props.assignmentTitle}</b> </p>
                                <p> Source: <b>{this.props.assignmentSource}</b> </p>
                                {!this.props.assignmentComposer ? null : <p>Composer: <b>{this.props.assignmentComposer}</b> </p>}
                                <p> Page: <b>{this.props.assignmentPage}</b> </p>
                                <p className='assignment-block-detailed-span' > Requirements: <br/> <b>{this.props.assignmentRequirements}</b> </p>
                                <p> Due Date: <b>{moment(this.props.assignmentDueDate).format('ll')}</b> </p>
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