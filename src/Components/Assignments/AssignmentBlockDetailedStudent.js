import React from 'react'
import { connect } from 'react-redux'

import './styles/AssignmentBlockDetailed.css'

class AssignmentBlockDetailed extends React.Component{
    constructor(){
        super()
        this.state={

        }
    }




    render(){
        return(
            <div>
                <div>
                    <div>Assignment #{this.props.assignmentCount} </div>
                </div>
                <div>
                    <p> {this.props.assignmentTitle} </p>
                    <p> Source: {this.props.assignmentSource} </p>
                    {!this.props.assignmentComposer ? null : <p>Composer: {this.props.assignmentComposer} </p>}
                    <p> {this.props.assignmentPage} </p>
                    <p> Requirements: {this.props.assignmentRequirements} </p>
                    <p> Due Date: {this.props.assignmentDueDate} </p>
                    <p> {!this.props.assignmentCompleted ? 'Incomplete ❌' : 'Completed ✅'} </p>
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